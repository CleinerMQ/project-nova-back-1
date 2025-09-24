<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Logo de Nest" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Un framework progresivo de <a href="http://nodejs.org" target="_blank">Node.js</a> para construir aplicaciones del lado del servidor eficientes y escalables.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="Versión NPM" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Licencia del Paquete" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="Descargas NPM" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Patrocinadores en Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors en Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Dónanos"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Apóyanos"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Síguenos en Twitter"></a>
</p>

## Descripción

Repositorio inicial de [Nest](https://github.com/nestjs/nest) framework con TypeScript.

## Configuración del proyecto

### 1. Instalar dependencias
```bash
$ npm install
```

### 2. Configurar variables de entorno
Renombra el archivo `.env.template` a `.env`:
```bash
$ cp .env.template .env
```

Luego edita el archivo `.env` con tus configuraciones específicas.

### 3. Generar cliente de Prisma
```bash
$ npx prisma generate
```

### 4. Levantar servicios con Docker Compose
```bash
$ docker-compose up -d
```

## Compilar y ejecutar el proyecto

```bash
# desarrollo
$ npm run start

# modo watch (recarga automática)
$ npm run start:dev

# modo producción
$ npm run start:prod
```

## Ejecutar pruebas

```bash
# pruebas unitarias
$ npm run test

# pruebas e2e
$ npm run test:e2e

# cobertura de pruebas
$ npm run test:cov
```

## Despliegue

Cuando estés listo para desplegar tu aplicación NestJS a producción, hay algunos pasos clave que puedes seguir para asegurar que funcione de la manera más eficiente posible. Consulta la [documentación de despliegue](https://docs.nestjs.com/deployment) para más información.

Si buscas una plataforma basada en la nube para desplegar tu aplicación NestJS, echa un vistazo a [Mau](https://mau.nestjs.com), nuestra plataforma oficial para desplegar aplicaciones NestJS en AWS. Mau hace que el despliegue sea sencillo y rápido, requiriendo solo unos pocos pasos simples:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

Con Mau, puedes desplegar tu aplicación en solo unos clics, permitiéndote enfocarte en construir funcionalidades en lugar de gestionar infraestructura.

## Recursos

Consulta algunos recursos que pueden ser útiles cuando trabajas con NestJS:

- Visita la [Documentación de NestJS](https://docs.nestjs.com) para aprender más sobre el framework.
- Para preguntas y soporte, por favor visita nuestro [canal de Discord](https://discord.gg/G7Qnnhy).
- Para profundizar y obtener más experiencia práctica, consulta nuestros [cursos](https://courses.nestjs.com/) oficiales en video.
- Despliega tu aplicación en AWS con la ayuda de [NestJS Mau](https://mau.nestjs.com) en solo unos clics.
- Visualiza el gráfico de tu aplicación e interactúa con la aplicación NestJS en tiempo real usando [NestJS Devtools](https://devtools.nestjs.com).
- ¿Necesitas ayuda con tu proyecto (medio tiempo o tiempo completo)? Consulta nuestro [soporte empresarial](https://enterprise.nestjs.com) oficial.
- Para mantenerte al día y recibir actualizaciones, síguenos en [X](https://x.com/nestframework) y [LinkedIn](https://linkedin.com/company/nestjs).
- ¿Buscas trabajo o tienes una oferta de trabajo? Consulta nuestro [tablero de empleos](https://jobs.nestjs.com) oficial.

## Soporte

Nest es un proyecto de código abierto con licencia MIT. Puede crecer gracias a los patrocinadores y el apoyo de increíbles colaboradores. Si te gustaría unirte a ellos, por favor [lee más aquí](https://docs.nestjs.com/support).

## Mantente en contacto

- Autor - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Sitio web - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## Licencia

Nest tiene [licencia MIT](https://github.com/nestjs/nest/blob/master/LICENSE).