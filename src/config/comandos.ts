/*

Lembrete do uso de instruções mais usadas:

  Criar projeto:
    npx @nestjs/cli new <nome do projeto>

  Criar módulo:
    npx @nestjs/cli generate module <nome do módulo>

  Criar Controller:
    npx @nestjs/cli generate controller <nome do controller>

  Criar Serviço:
    npx @nestjs/cli generate service <nome do service>

Validadores de DTO (Data Transfer Object)

  > class-validator

  > class-trnsformer

  Instalação

    npm i <validador dto>

    Exemplo:

      npm i class-validator class-transformer

Partial Type

  Instalação:
  
    npm i @nestjs/mapped-types

ORM e NestJS

  Os ORMs que são mais facilmente integrados com o NestJS e são citados atualmente na
  documentação do Nest são:
    >>  MikroORM
    >>  Squelize
    >>  TypeORM         (Maior suporte e estrelas)
    >>  Knex.js
    >>  Prisma

  Prisma
    Instalação do Prisma:

      Modo Desenvolvimento:
        npm i -D prisma

    Iniciando um banco de dados em Prisma:
      npx prisma init

    Carregando automaticamente as tabelas do banco de dados via Prisma:
      npx prisma db pull

    A instrução abaixo é responsável por observar o arquivo schema.prisma e gerar as apis:

      npx prisma generate

    A instrução abaixo atualiza a coluna de banco de dados a partir do schema.prisma.

      npx prisma migrate dev --name Add<nome do campo>

      Exemplo:
        npx prisma migrate dev --name AddBirthAt
    
      Realizando um alter table:

        npx prisma migrate dev --name birthAtIsNull

    A instrução abaixo atualiza o schema no banco de dados a partir do schema.prisma. (Bastante Útil)

      npx prisma migrate dev

  JWT

    Instalação

      npm i @nestjs/jwt

    Instalação a partir de uma versão específica

      npm i @nestjs/jwt@9.0.0

  Password Generator

    Links para gerar senhas

      https://passwords-generator.org/
      https://www.lastpass.com/pt/features/password-generator
      https://passwordsgenerator.net/


Últimas instruções executadas:
  
  npx prisma migrate dev --name AddColumnRole
  npx prisma generate                           //Atualiza o prisma client

  Armazenamento de senha de forma segura - Hash

    npm i bcrypt

    ou
    
    npm i bcrypt@5.1.1

    @types/bcrypt

    Instalando os tipos da biblioteca bcrypt, uma vez que a mesma não é escrita em type script.
    Entretanto, a comunidade já disponibilizou os tipos em type script. Para isso, basta
    instalar o pacote abaixo:

      npm i -D @types/bcrypt

    Controlador de quantidade de acessos ao app
    (Não vem com NestJS, mas é reconhecido oficialmente pelo NestJS).

      Instalação

        npm i @nestjs/throttler

    Biblioteca oficial do NestJS para acessar as variáveis de ambiente (env)

      Instalação

        npm i @nestjs/config

    Upload de arquivos

      Instalação

        npm i -D @types/multer
*/
