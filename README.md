<h1 align="center">Cocodoc API</h1>

Cocodoc API es el backend de la aplicación Cocodoc para la comunidad de San José de Cocotog.

## Requisitos

Para que el aplicación funcione debe tener [MongoDB](https://www.mongodb.com/), [MySQL 8.0.20](https://dev.mysql.com/downloads/mysql/), [Node.js](https://nodejs.org/en/) y [Git](https://git-scm.com/) instalado.

## Instalacion

Use `git clone` para clonar el repositorio

```bash
> git clone https://github.com/giothc94/cocodoc-rest-api.git CocodocAPI
```

Ingrese a `CocodocAPI` para empezar la instalación.
```bash
> cd CocodocAPI
```

Antes de la instalación debe asegurarse de que exista la siguiente estructura de carpetas dentro de la carpeta public.
```
- public
  |_ documentos
  |    |_ papelera
  |    |_ reportes
  |    |_ temp-img
  |
  |_ img (Esta carpeta ya existe)
```

Use el administrador de paquetes `npm` de [Node.js](https://nodejs.org/en/) para instalar las dependencias.

```bash
> npm install
```
Después de instalar las dependencias, debe configurar el archivo `.env` ubicado en la carpeta raíz del sistema. (Puede renombrar el archivo `.env.example` por `.env`).

Finalmente, ejecute el script `init` para crear la base de datos con los datos iniciales

```bash
> npm run init
```

## Uso
Para ejecutar, puede chequear el `package.json` para ver los scripts disponibles.

Para desarrollo puede ejecutar:
```bash
npm run dev
```

Para producción puede ejecutar:
```bash
npm run prod
```

El datos predefinidos para el primer acceso son:
```
User: admadm
Password: 0123456789
```
