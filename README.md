# Activity of researchers at ACADEMY OF SCIENCES OF THE REPUBLIC OF SAKHA (YAKUTIA)
## Nginx config
```
server {
listen 80;
server_name academy.abrikos.pro;
index index.html index.html;

root <PATH_TO_PARENT>/academy-aor/frontend/dist;
location / {
try_files $uri $uri/ /index.html;
}
location ~ ^/api {
keepalive_timeout 0;
access_log  off;
proxy_read_timeout 120s;
proxy_pass http://127.0.0.1:<PORT>;
proxy_set_header Host $host;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Real-IP $remote_addr;
}
}
```

## Env setup
add environment in .env at root of project
```
API_PORT=<PORT>
MONGODB_URI=mongodb://localhost:27017/<DB-NAME>

MAIL_USER=<sender email>
MAIL_PASSWORD=<sender password>

```
## Build Setup

```bash
# install dependencies
$ yarn install
#or
$ npm install

# serve with hot reload at localhost:3000 and localhost:process.env.API_PORT 
$ yarn front
$ yarn backend:dev

# build for production and launch server
$yarn generate
$ pm2 start pm2.config.js
```

## Update and reload
```bash
$./restart.sh
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
