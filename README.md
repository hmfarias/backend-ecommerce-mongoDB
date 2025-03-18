[![Status][statuss-shield]][statuss-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/hmfarias/backend-ecommerce">
    <img src="https://github.com/hmfarias/backend-ecommerce/blob/main/src/public/logo.png" alt="Logo" width="350" height="auto">
  </a>
  <h1 align="center">BACKEND</h1>

  <p align="center">
    Polirubro online
    <br />
    <a href="" target="_blank" ><strong>»</strong></a>
    <br />
    <br />
    <a href="https://github.com/hmfarias/backend-ecommerce">Ver repositorio</a>
    ·
    <a href="https://github.com/hmfarias/backend-ecommerce/issues">Reportar un error</a>
    ·
    <a href="https://github.com/hmfarias/backend-ecommerce/issues">Solicitar función</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<a name="top"></a>

### Tabla de contenidos

1. [Introducción](#introduccion)
2. [Construido con](#consturido)
3. [Consideraciones Importantes](#consideraciones)
   - [Persistencia](#persistencia)
   - [Maquetación y CSS](#maqueta)
   - [Comentarios en el código](#comentarios)
4. [Credenciales - .env](#environment)
5. [Instalación en local](#instalacion)
6. [Contribuyendo](#contribuyendo)
7. [Licencia](#licencia)
8. [Contacto](#contacto)

<hr>

<!-- ABOUT THE PROJECT -->

<a name="introduccion"></a>

## INTRODUCCION

Bienvenidos al backend de Notre Dame, tu tienda polirubro online exclusiva. Este repositorio contiene la infraestructura y lógica de negocio que impulsa nuestra plataforma, garantizando una experiencia de compra eficiente, segura y confiable.

Nuestro backend ha sido diseñado para gestionar productos y carritos de compra, asegurando un flujo de datos ágil y seguro. Implementamos las mejores prácticas en desarrollo, seguridad y escalabilidad para ofrecer un servicio robusto y optimizado.

Gracias por visitar nuestro repositorio. ¡Esperamos que disfrutes explorando y contribuyendo a este proyecto!

[Volver al menú](#top)

<hr>

<a name="consturido"></a>

### CONSTRUIDO CON

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) como framework de código abierto para crear aplicaciones web y APIs. Está escrito en JavaScript y se ejecuta en el entorno de Node.js

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) como lenguaje de programación interpretado, de alto nivel y dinámico. Se ejecuta en el navegador del cliente, lo que permite la creación de páginas web interactivas y dinámicas.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) (HyperText Markup Language) como lenguaje de marcación de hipertéxto estándar utilizado para crear y diseñar páginas web.

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) (Cascading Style Sheets, Level 3) como lenguaje de diseño gráfico utilizado para controlar el aspecto visual de las páginas web, separando el contenido (HTML) de la presentación visual (CSS).

![Static Badge](https://img.shields.io/badge/Sweer%20Alert-green?style=for-the-badge) como biblioteca de JavaScript que facilita la creación de alertas y diálogos personalizados y estéticamente agradables en la aplicacion web.

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) como sistema de gestión de bases de datos (SGBD) no relacional y de código abierto. Se lo ha utilizado para almacenar y procesar los datos de la app. 

![Static Badge](https://img.shields.io/badge/Mongoose-white?style=for-the-badge) como biblioteca de JavaScript que permite modelar y gestionar datos en bases de datos MongoDB. Se lo ha utilizado para: definir esquemas, validar datos, administrar relaciones entre datos, interactuar con MongoDB, traducir entre objetos en código y su representación en MongoDB, simplificar las operaciones de MongoDB y trabajar de forma más ordenada y con menor margen de error

[Volver al menú](#top)

<hr>

<a name="consideraciones"></a>

## CONSIDERACIONES IMPORTATES

Los datos se acceden mediante "Managers" (clases ProductsMongoManager y CartsMongoManager) de modo que se encuentra perfectamente separado el acceso directo a los datos y las rutas desde donde se llama a esos datos. Esto permite que si eventualmente se decidiera cambiar el sistema de persistencia, bastará con realizar o construir los nuevos managers sin necesidad de modificar las rutas. 

[Volver al menú](#top)

<a name="persistencia"></a>

### PERSISTENCIA DE DATOS EN LA APLICACIÓN

En esta aplicación, la persistencia de datos se ha logrado integrando MongoDB como sistema de gestión de bases de datos NoSQL, junto con Mongoose como Object Data Modeling (ODM) para Node.js. Esta combinación permite gestionar de manera eficiente las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y facilita la interacción con la base de datos.

[Volver al menú](#top)

<a name="maqueta"></a>

### MAQUETACIÓN Y CSS DE LA PAGINA

Se destaca que se ha hecho foco en el BACKEND de la aplicación. No obstante ello se ha tratado de lograr mediante una maquetación BASICA, un entorno de front end agradable para poder probar las funcionalidades del backend.

[Volver al menú](#top)

<hr>

<a name="comentarios"></a>

### COMENTARIOS EN EL CÓDIGO

Tratándose de una aplicación de índole DIDACTICO, se han dejado en el código comentarios útiles para su estudio. Pero se destaca que en un proyecto real, los mismos deben ser utilizados lo menos posible.

[Volver al menú](#top)

<hr>

<a name="environment"></a>

## CREDENCIALES (archivo .env)

Antes de ejecutar la aplicación, deberá crear en la carpeta raíz (a nivel del archivo package.json) el archivo .env con el siguiente contenido:

<code>
/**
* Environment variables
    PORT: Port of application
    MONGODB_URI: URI of the database  
*/
/* Server Configuration
PORT=8080

/* Database Configuration
DB_USER=hmfarias
DB_PASSWORD=QQATDs4SdAAWYa23
DB_HOST=cluster0.fergg.mongodb.net
DB_NAME=Backend-ecommerce  
</code>


[Volver al menú](#top)

<hr>

<a name="instalacion"></a>

## INSTALACIÓN EN LOCAL

Prerequisitos de instalación:
Debes contar con un editor de código como Visual Estudio Code o similar.

1- En tu árbol de directorios sitúate en la carpeta donde deseas instalar la app.

2- Clona el repositorio escribiendo en la terminal o consola de tu pc el siguiente código:
<code>
git clone https://github.com/hmfarias/backend-ecommerce.git
</code>

Esto creará la carpeta "backend-ecommerce" y en su interior los archivos de aplicación.

3- Ejecuta tu editor de código y sitúate dentro de la carpeta backend-ecommerce. Podrás ver el código de la aplicación.

4- Abre una terminal y asegurate de estar ubicado dentro de la carpeta backend-ecommerce

5- Ejecuta:
<code>
npm install
</code>

Esto instalará la aplicación de manera local.

6- Ejecuta:
<code>
npm run dev
</code>

Esto iniciará la aplicación en modo desarrrollador, y mostrará un mensaje en la terminal indicando que el servidor está corriendo en el puerto 8080 y se ha conectado la Base de Datos.

En el navegador web, abre una nueva pestaña y coloca la dirección http://localhost:8080. Aparecerá en la pantalla del navegador la página de inicio de la aplicación.

[Volver al menú](#top)

<hr>

<a name="contribuyendo"></a>

## CONTRIBUYENDO

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que haga es **muy apreciada**.

Si tiene una sugerencia para mejorar este proyecto, por favor haga un "fork" al repositorio y cree un "pull request". También puede simplemente abrir un "issue" con la etiqueta "mejora".
¡No olvide darle una estrella al proyecto! ¡Gracias de nuevo!

1. Fork al Proyecto
2. Cree una nueva rama para su característica (`git checkout -b feature/newFeature`)
3. Commit para los cambios (`git commit -m 'Add some newFeature'`)
4. Push a la nueva rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

[Volver al menú](#top)

<hr>

<!-- LICENSE -->

<a name="licencia"></a>

## LICENCIA

Distribuido bajo la licencia MIT. Consulte `LICENSE.txt` para obtener más información.

[Volver al menú](#top)

<hr>

<!-- CONTACT -->

<a name="contacto"></a>

## CONTACTO

Marcelo Farias - [+54 9 3512601888] - hmfarias7@gmail.com

[Volver al menú](#top)

<hr>

<!-- ACKNOWLEDGMENTS -->

<!-- MARKDOWN LINKS & IMAGES -->

<!-- [statuss-shield]: https://img.shields.io/badge/STATUS-Developing-green -->

[statuss-shield]: https://img.shields.io/badge/STATUSS-finished-green
[statuss-url]: https://https://github.com/hmfarias/NotreDame#readme
[forks-shield]: https://img.shields.io/github/forks/hmfarias/NotreDame
[forks-url]: https://github.com/hmfarias/NotreDame/network/members
[stars-shield]: https://img.shields.io/github/stars/hmfarias/NotreDame
[stars-url]: https://github.com/hmfarias/NotreDame/stargazers
[issues-shield]: https://img.shields.io/github/issues/hmfarias/NotreDame
[issues-url]: https://github.com/hmfarias/NotreDame/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg
[license-url]: https://github.com/hmfarias/NotreDame/blob/master/LICENSE.txt
[product-screenshot]: https://github.com/hmfarias/NotreDame/blob/main/assets/images/screenShot.webp
[product-screenshot-navbar]: https://github.com/hmfarias/NotreDame/blob/main/assets/images/navbar.webp
[others-url]: https://github.com/hmfarias/NotreDame
