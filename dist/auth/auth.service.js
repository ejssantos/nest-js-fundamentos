"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const dist_1 = require("@nestjs-modules/mailer/dist");
let AuthService = class AuthService {
    constructor(jwtService, prismaService, userService, mailer) {
        this.jwtService = jwtService;
        this.prismaService = prismaService;
        this.userService = userService;
        this.mailer = mailer;
        this.audience = 'users';
        this.issuer = 'login';
    }
    createToken(user) {
        return {
            accessToken: this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email,
            }, {
                expiresIn: '30 minutes',
                subject: String(user.id),
                issuer: this.issuer,
                audience: this.audience,
            }),
        };
    }
    checkToken(token) {
        try {
            const data = this.jwtService.verify(token, {
                audience: this.audience,
                issuer: this.issuer,
            });
            return data;
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async login(email, password) {
        console.log(process.env);
        const user = await this.prismaService.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(`Usuário ${email} não autorizado.`);
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            throw new common_1.UnauthorizedException('Senha inválida!');
        }
        return this.createToken(user);
    }
    async forget(email) {
        const user = await this.prismaService.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException(`E-mail ${email} não autorizado.`);
        }
        const token = this.jwtService.sign({
            id: user.id,
        }, {
            expiresIn: '30 minutes',
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users',
        });
        await this.mailer.sendMail({
            subject: 'Recuperação de Senha',
            to: 'ejssantos@hotmail.com',
            template: 'forget',
            context: {
                name: user.name,
                token: token,
            },
        });
        return true;
    }
    async reset(password, token) {
        try {
            const data = this.jwtService.verify(token, {
                audience: 'users',
                issuer: 'forget',
            });
            if (isNaN(Number(data.id))) {
                throw new common_1.BadRequestException('Token inválido.');
            }
            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            const user = await this.prismaService.user.update({
                where: {
                    id: Number(data.id),
                },
                data: {
                    password,
                },
            });
            return this.createToken(user);
        }
        catch (e) {
            throw new common_1.BadRequestException(e);
        }
    }
    async register(data) {
        const user = await this.userService.create(data);
        return this.createToken(user);
    }
    isValidToken(token) {
        try {
            this.checkToken(token);
            return true;
        }
        catch (e) {
            return false;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        user_service_1.UserService,
        dist_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map