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
   - [Acceso a los datos](#acceso)
   - [Maquetación y CSS](#maqueta)
   - [Comentarios en el código](#comentarios)
4. [Credenciales - .env](#environment)
5. [Instalación en local](#instalacion)
6. [Funcionamiento de la Aplicacion](#funcionamiento)
	- [Arquitectura](#arquitectura)
	- [Estructura de archivos](#estructura)
	- [Filtros y Paginación](#filtros)
	- [Gestión de Productos](#productos)
		- [Vista de Productos](#vistaproductos)
		- [Método GET](#get)
	- [Gestión del Carrito](#carrito)
8. [Contribuyendo](#contribuyendo)
9. [Licencia](#licencia)
10. [Contacto](#contacto)

<hr>

<!-- ABOUT THE PROJECT -->

<a name="introduccion"></a>

## 🔹 INTRODUCCION

Bienvenidos al backend de Notre Dame, tu tienda polirubro online exclusiva. Este repositorio contiene la infraestructura y lógica de negocio que impulsa nuestra plataforma, garantizando una experiencia de compra eficiente, segura y confiable.

Nuestro backend ha sido diseñado para gestionar productos y carritos de compra, asegurando un flujo de datos ágil y seguro. Implementamos las mejores prácticas en desarrollo, seguridad y escalabilidad para ofrecer un servicio robusto y optimizado.

Gracias por visitar nuestro repositorio. ¡Esperamos que disfrutes explorando y contribuyendo a este proyecto!

[Volver al menú](#top)

<hr>

<a name="consturido"></a>

## 🔹 CONSTRUIDO CON

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) como framework de código abierto para crear aplicaciones web y APIs. Está escrito en JavaScript y se ejecuta en el entorno de Node.js

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) (HyperText Markup Language) como lenguaje de marcación de hipertéxto estándar utilizado para crear y diseñar páginas web.

![Handlebars](https://img.shields.io/badge/Handlebars-%23000000?style=for-the-badge&logo=Handlebars.js&logoColor=white) para la vista en el frontend

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) (Cascading Style Sheets, Level 3) como lenguaje de diseño gráfico utilizado para controlar el aspecto visual de las páginas web, separando el contenido (HTML) de la presentación visual (CSS).

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) como lenguaje de programación interpretado, de alto nivel y dinámico. Se ejecuta en el navegador del cliente, lo que permite la creación de páginas web interactivas y dinámicas.

![Static Badge](https://img.shields.io/badge/Sweer%20Alert-green?style=for-the-badge) como biblioteca de JavaScript que facilita la creación de alertas y diálogos personalizados y estéticamente agradables en la aplicacion web.

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) como sistema de gestión de bases de datos (SGBD) no relacional y de código abierto. Se lo ha utilizado para almacenar y procesar los datos de la app. 

![Static Badge](https://img.shields.io/badge/Mongoose-white?style=for-the-badge) como biblioteca de JavaScript que permite modelar y gestionar datos en bases de datos MongoDB. Se lo ha utilizado para: definir esquemas, validar datos, administrar relaciones entre datos, interactuar con MongoDB, traducir entre objetos en código y su representación en MongoDB, simplificar las operaciones de MongoDB y trabajar de forma más ordenada y con menor margen de error

[Volver al menú](#top)

<hr>

<a name="consideraciones"></a>

## 🔹 CONSIDERACIONES IMPORTATES

<a name="persistencia"></a>

### 🟢 PERSISTENCIA DE DATOS EN LA APLICACIÓN

La aplicación implementa la persistencia de datos utilizando MongoDB como sistema de base de datos NoSQL, en combinación con Mongoose como Object Data Modeling (ODM) para Node.js. Esta integración permite una gestión eficiente de las operaciones CRUD (Crear, Leer, Actualizar, Eliminar), proporcionando una interfaz flexible y estructurada para interactuar con la base de datos.

El uso de Mongoose no solo simplifica la manipulación de datos mediante esquemas bien definidos, sino que también mejora la integridad y coherencia de la información almacenada, facilitando la validación y el manejo de relaciones entre documentos.

[Volver al menú](#top)

<hr>

<a name="acceso"></a>

### 🟢 ACCESO A LOS DATOS

El acceso a los datos se gestiona a través de Managers, representados por las clases ProductsMongoManager y CartsMongoManager. Esta arquitectura garantiza una clara separación entre la lógica de persistencia y las rutas que consumen los datos, promoviendo un diseño modular y escalable.

Gracias a esta abstracción, si en el futuro se decide cambiar el sistema de persistencia (por ejemplo, migrar de MongoDB a otro motor de base de datos), solo será necesario implementar nuevos Managers sin afectar la estructura ni la lógica de las rutas existentes. Esto facilita el mantenimiento y la evolución del sistema con mínima intervención en el código.

[Volver al menú](#top)

<hr>

<a name="maqueta"></a>

### 🟢 MAQUETACIÓN Y CSS DE LA PAGINA

Si bien el enfoque principal de la aplicación ha sido el desarrollo del backend, se ha implementado una maquetación básica para ofrecer un entorno visual limpio y funcional que facilite la prueba de sus funcionalidades.

El diseño de la interfaz sigue una estructura sencilla pero organizada, asegurando una navegación clara y una experiencia de usuario intuitiva. Se han aplicado estilos CSS básicos para mejorar la presentación de los datos sin descuidar el rendimiento ni la accesibilidad.

[Volver al menú](#top)

<hr>

<a name="comentarios"></a>

### 🟢 COMENTARIOS EN EL CÓDIGO

Dado que esta aplicación tiene un propósito didáctico, se han incluido comentarios en el código para facilitar su comprensión y estudio. Estos comentarios explican la lógica de implementación y el flujo de datos dentro de la aplicación.

Sin embargo, en un proyecto real, se recomienda minimizar el uso de comentarios innecesarios, priorizando un código limpio y autoexplicativo mediante buenas prácticas de nomenclatura y estructuración.

[Volver al menú](#top)

<hr>

<a name="environment"></a>

## 🔹 CREDENCIALES (archivo .env)

Antes de ejecutar la aplicación, es necesario crear un archivo .env en la carpeta raíz (donde se encuentra el package.json). Este archivo almacenará las variables de entorno necesarias para la configuración del servidor y la conexión a la base de datos.

### 🟢 Contenido del archivo .env:
```
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
```


[Volver al menú](#top)

<hr>

<a name="instalacion"></a>

## 🔹 INSTALACIÓN EN LOCAL

### **Prerequisitos:**  
Antes de instalar la aplicación, asegúrate de contar con:  
- Un editor de código como **Visual Studio Code** o similar.  
- **Node.js** y **npm** instalados en tu sistema.  

### **Pasos para la instalación:**  

1. **Ubicar el directorio de instalación:**  
   En tu terminal o consola, navega hasta la carpeta donde deseas instalar la aplicación.  

2. **Clonar el repositorio:**  
   Ejecuta el siguiente comando para clonar el proyecto:  
   ```
     git clone https://github.com/hmfarias/backend-ecommerce.git
   ```

   Esto creará una carpeta llamada backend-ecommerce con todos los archivos de la aplicación.

3. **Abrir el proyecto en el editor de código:**
Abre Visual Studio Code (o tu editor de preferencia) y selecciona la carpeta backend-ecommerce.

4. **Abrir una terminal en la carpeta del proyecto:**
Asegúrate de estar ubicado dentro de la carpeta backend-ecommerce en la terminal.

5. **Instalar las dependencias:**

	Ejecuta el siguiente comando para instalar las dependencias del proyecto:
   	```
   	npm install
   	```
   
6. **Configurar las variables de entorno:**
Crea un archivo .env en la raíz del proyecto con la configuración de las credenciales (ver sección CREDENCIALES (.env)).
Consulta la configuración de credenciales en la sección [CREDENCIALES (.env)](#environment).
	
8. **Iniciar la aplicación en modo desarrollador:**
	Ejecuta el siguiente comando:
  		<code>
    			npm run dev
  		</code>
	Esto iniciará el servidor y mostrará un mensaje en la terminal indicando que la aplicación está corriendo en el puerto 8080 y conectada a la base de datos.

10.	**Acceder a la aplicación desde el navegador:**
Abre una nueva pestaña en tu navegador y accede a la siguiente dirección:
  http://localhost:8080

✅ ¡Listo! Ya puedes explorar y probar la aplicación en tu entorno local. 🚀

[Volver al menú](#top)

<hr>

<a name="funcionamiento"></a>

## 🔹 FUNCIONAMIENTO DE LA APLICACION

<a name="arquitectura"></a>

### 🟢 Arquitectura

La aplicación está basada en una arquitectura **MVC (Modelo-Vista-Controlador)** y utiliza **MongoDB** como sistema de persistencia, gestionado a través de **Mongoose** como ODM. Esto permite realizar las operaciones CRUD (Crear, Leer, Actualizar y Eliminar) de forma eficiente y simplificada.

Los datos se acceden mediante **Managers** (clases `ProductsMongoManager` y `CartsMongoManager`), lo que permite una separación clara entre la lógica de negocio y el acceso a la base de datos. De esta forma, si se decidiera cambiar el sistema de persistencia, bastaría con modificar o crear nuevos managers sin necesidad de alterar las rutas de la aplicación. Esta estructura proporciona flexibilidad y escalabilidad al proyecto.

[Volver al menú](#top)

<hr>

<a name="estructura"></a>

### 🟢 Estructura de la Aplicación

La aplicación tiene la siguiente estructura básica de archivos y carpetas:

```
|-src/
├── config/
│   └── config.js  // Lógica para manejar las variables de entorno provistas en .env
│
├── managers/
│   └── ProductsMongoManager.js  // Lógica de interacción con la base de datos de productos
│   └── CartsMongoManager.js  // Lógica de interacción con la base de datos de carritos
│   └── CountersMongoManager.js // Lógica de interacción con los contadores para manejar ids personalizados tanto para productos como para carritos
│   └── FileManagerJson.js // Logica de interaccion para persistencia en archivos JSON (version anterior de la aplicacion - queda para ilustrar la separacion entre rutas y acceso a datos)
│
├── models/
│   └── product.model.js  // Modelo de datos de productos en MongoDB
│   └── cart.model.js // Modelo de datos de carritos en MongoDB
│   └── counter.model.js // Modelo de datos de contadores en MongoDB
│
├── public/
│   └── css/
│       └── styles.css // Maneja la maquetación de la aplicacion
│   └── img/
│       └── defect-product.png // archivo png para mostrar el uso de MULTER. Se lo puede utilizar para asignar la foto de producto a la hora de crear uno nuevo
│       └── logo.png // archivo png con el logo de la app
│   └── js/
│       └── cart.js  // Lógica de interacción en el frontend de carritos
│       └── navbar.js  // Lógica de interacción en el frontend para el navbar
│       └── product.js  // Lógica de interacción en el frontend cuando se visualiza un producto individual
│       └── products.js  // Lógica de interacción en el frontend de productos cuando se visualiza la lista
│
├── routes/
│   └── cartRouter.js  // Rutas relacionadas con carritos
│   └── productRouter.js  // Rutas relacionadas con productos
│   └── viewsRouter.js  // Rutas relacionadas con las vistas handlebars
│
├── views/
│   └── layouts/
│       └── main.handlebars // layout base para el frontend
│   └── partials/
│       └── header.handlebars // layout para el header de la app
│   └── cart.handlebars  // Vista del carrito con los productos agregados en la interfaz de usuario
│   └── error.handlebars  // Vista de error para la interfaz de usuario cuando se produce algun tipo de error 
│   └── index.handlebars  // Vista de home para la interfaz de usuario
│   └── newProduct.handlebars  // Vista de carga de nuevo producto para la interfaz de usuario
│   └── product.handlebars  // Vista de un producto individual para la interfaz de usuario
│   └── products.handlebars  // Vista de la lista de productos para la interfaz de usuario
│
├── app.js  // Archivo principal que inicia el servidor
├── utils.js  // crea y exporta una variable __dirname que proporciona la ruta del archivo App.js
├── utilsMulter.js  // configura el manejo de archivos mediante la librería multer para la carga de imágenes en la aplicación.
├── .env  // Variables de entorno
└── package.json  // Dependencias y configuraciones del proyecto
```

[Volver al menú](#top)

<hr>

<a name="filtros"></a>

### 🟢 Filtros y Paginación

### Filtros y Paginación en la Aplicación

La aplicación implementa un sistema de **filtros** y **paginación** para facilitar la visualización de productos en el frontend, mejorando la experiencia del usuario al interactuar con un gran número de productos. A continuación se explica cómo funcionan ambos:

### 🔶 Filtros

Los **filtros** permiten al usuario especificar ciertos criterios para reducir la cantidad de productos que se muestran en la lista. Los filtros disponibles son:

- **Categoría**: Filtra los productos según su categoría.
- **Estado**: Permite seleccionar entre productos disponibles o no disponibles.
- **Orden de precio**: El usuario puede elegir ordenar los productos por precio, ya sea de menor a mayor o de mayor a menor.
- **Límite**: Establece la cantidad de productos a mostrar por página.

El sistema de filtros se implementa utilizando parámetros en la URL, lo que permite que la búsqueda sea dinámica y fácil de manejar tanto en el frontend como en el backend. Los filtros se aplican directamente a las consultas a la base de datos, mejorando la eficiencia de la aplicación.

### 🔶 Paginación

La **paginación** permite dividir la lista de productos en varias páginas, mostrando solo una parte de los productos a la vez. Esto ayuda a optimizar la carga de la página y mejora el rendimiento general de la aplicación.

La paginación se maneja a través de los siguientes parámetros:

- **Página**: Indica qué página de productos se está visualizando.
- **Límite**: Determina cuántos productos se deben mostrar por página.

Cuando el usuario cambia la página, se actualizan los enlaces de paginación (`prevLink`, `nextLink`, `firstLink`, `lastLink`), que permiten navegar entre las páginas de productos.

### 🔶 Implementación de los Filtros y Paginación

1. **En el Backend**: El backend maneja los filtros y la paginación en las consultas a la base de datos. Se utilizan parámetros opcionales en la URL para aplicar los filtros y calcular la página correspondiente. Se implementa con `paginate`.

#### ¿Cómo Funciona `paginate`?

El método `paginate` permite que los resultados de una consulta de MongoDB se dividan en varias páginas, facilitando la visualización de un número limitado de resultados por página. Este método se aplica directamente sobre los modelos de Mongoose y acepta parámetros que indican la página actual, el número de elementos por página y otros filtros de búsqueda.

Los parámetros que se pasan al método `paginate` en la aplicación son:

- **Página (`page`)**: El número de la página que se desea visualizar. 
- **Límite (`limit`)**: El número de documentos que se deben mostrar por página.
- **Filtros**: Los filtros que el usuario aplica, como categoría, estado de disponibilidad, y orden de precio.
   
3. **En el Frontend**: El frontend permite al usuario seleccionar los filtros y navegar entre las páginas de resultados utilizando formularios interactivos.

El código de filtrado y paginación es flexible y permite ajustar los filtros sin necesidad de modificar el código de las rutas principales. Esto asegura que la lógica de los filtros y la paginación se pueda extender fácilmente en el futuro.

Por ejemplo, los parámetros `category`, `status`, `priceOrder`, `limit`, y `page` se envían como parte de la URL y se manejan adecuadamente en las rutas del servidor.

Este sistema permite que los usuarios encuentren los productos que desean de manera más rápida y sencilla, mejorando la eficiencia en la navegación dentro de la tienda online.


[Volver al menú](#top)

<hr>

<a name="productos"></a>

### 🟢 Gestión de Productos

La gestión de productos en esta aplicación se maneja a través del modelo `product.model.js`, que define la estructura de cada producto en la base de datos. Este modelo incluye campos como el nombre del producto, la descripción, el precio y la cantidad en inventario, categoría, status de disponibilidad, thumbnail, entre otros. La interacción con los productos se realiza mediante un conjunto de rutas y métodos que permiten realizar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los productos.

- **Creación de Producto**: Los productos se pueden agregar a la base de datos mediante un formulario en el frontend. Se validan los datos y se cargan en la base de datos, donde se guardan con un identificador único (`_id`).
  
- **Visualización de Productos**: Los productos almacenados en la base de datos se pueden recuperar y mostrar en el frontend. Para la visualización de la lista de productos o de un producto individual, se realizan consultas a la base de datos que recuperan los datos necesarios, y se muestran en las vistas correspondientes. 

- **Actualización de Producto**: Los productos existentes se pueden actualizar a través de un formulario que permite modificar campos como el nombre, precio o descripción del producto. Al actualizar un producto, los cambios se reflejan en la base de datos.

- **Eliminación de Producto**: Un producto puede eliminarse del sistema si ya no es necesario. Para ello, se proporciona una ruta que permite eliminar un producto a partir de su identificador (`_id`), lo que borra el documento correspondiente en la base de datos.

####  🔶 Relación con el Carrito

Cada producto en el carrito se referencia solo por su `_id` en el modelo de carrito, lo que optimiza el almacenamiento. Para obtener los detalles completos de un producto dentro del carrito (como su nombre, precio, etc.), se utiliza el método `populate` de Mongoose. Este permite cargar toda la información del producto en el carrito, sin necesidad de almacenarla duplicada, lo que mejora la eficiencia de la base de datos.

Esta estructura hace que la gestión de productos sea flexible y eficiente, permitiendo agregar, actualizar y eliminar productos con facilidad, y mejorando la experiencia del usuario en la tienda.

<a name="vistaproductos"></a>

### 🟢 Vista de Productos

La vista de productos está diseñada para mostrar una lista de productos disponibles en la tienda, con varias funcionalidades de filtrado, ordenamiento y paginación. 

#### 🔶 Estructura

- ☑️ **Filtros y Ordenamiento**: En la parte izquierda de la página, se encuentra una sección con filtros que permite al usuario:
  - Filtrar productos por **categoría**.
  - Filtrar productos por **estado** (en stock, bajo stock o agotado).
  - Ordenar los productos por **precio** (de menor a mayor o de mayor a menor).
  - Establecer el número de **productos por página** mediante un campo numérico.
  
  El formulario de filtros incluye un botón para restablecer los filtros y otro para aplicarlos.

- ☑️ **Lista de Productos**: A la derecha de la sección de filtros, se muestra la lista de productos en formato de tarjetas. Cada tarjeta de producto incluye:
  - Una **imagen** miniatura del producto.
  - El **título** del producto.
  - El **precio** del producto.
  - Un enlace para ver los detalles del producto individualmente.
  - Un formulario para **eliminar** el producto, el cual se puede activar mediante un botón de eliminación.

  La lista de productos se genera dinámicamente utilizando el motor de plantillas Handlebars, iterando sobre el array `products`.

- ☑️ **Paginación**: La vista incluye controles de paginación que permiten al usuario navegar entre las diferentes páginas de productos. Los controles de paginación incluyen:
  - Enlaces para **ir a la primera** y **última** página.
  - Enlaces para **navegar a la página anterior** o **siguiente**.
  - Un indicador que muestra la página actual y el total de páginas disponibles.

#### 🔶 Funcionalidad

- Los filtros se aplican a la consulta de productos para mostrar solo aquellos que cumplan con los criterios seleccionados (por ejemplo, categoría, estado y rango de precios).
- La paginación es útil para manejar grandes cantidades de productos, permitiendo mostrar un número limitado por página y navegar entre las páginas de manera eficiente.
- La eliminación de productos está vinculada a un endpoint de tipo `DELETE` que permite eliminar un producto de la base de datos mediante un formulario.

#### 🔶 Interactividad

El archivo `products.js` contiene la lógica necesaria para interactuar con los filtros y la paginación, manejando la aplicación de filtros y la actualización de la lista de productos en función de las acciones del usuario.

Esta vista de productos es una parte fundamental de la interfaz de usuario, proporcionando un medio para explorar, filtrar y eliminar productos de manera eficiente.

[Volver al menú](#top)

<hr>
<a name="get"></a>

### 🟢 El método GET de productos:
El método GET en la aplicación está diseñado para recuperar una lista paginada de productos y devolverla en el siguiente formato:
```
{
  "status": "success/error",
  "payload": "Resultado de los productos solicitados",
  "totalPages": "Total de páginas",
  "prevPage": "Página anterior",
  "nextPage": "Página siguiente",
  "page": "Página actual",
  "hasPrevPage": "Indicador para saber si la página previa existe",
  "hasNextPage": "Indicador para saber si la página siguiente existe",
  "prevLink": "Link directo a la página previa (null si hasPrevPage=false)",
  "nextLink": "Link directo a la página siguiente (null si hasNextPage=false)"
  "firstLink": "Link directo a la primera página"
  "lastLink": "Link directo a la última página"
	
}
```
Este formato permite una paginación eficiente y facilita la navegación entre diferentes páginas de resultados en la interfaz de usuario, proporcionando tanto los datos como los enlaces para navegar a las páginas adyacentes de productos.

[Volver al menú](#top)

<hr>

<a name="carrito"></a>

### 🟢 Gestión del Carrito

En la aplicación, la **gestión del carrito** se encarga de permitir a los usuarios agregar, actualizar, eliminar y ver los productos en su carrito de compras. Esta funcionalidad es crucial para una experiencia de compra en línea, ya que permite a los usuarios seleccionar productos antes de proceder con el pago. La gestión del carrito se implementa mediante un conjunto de rutas y lógica de backend que interactúan con la base de datos.

#### 🔶 ¿Cómo Funciona la Gestión del Carrito?

1. **Creación de un Carrito**: 
   Cuando un usuario agrega un producto al carrito, se verifica si ya existe un carrito. Si es la primera vez que el usuario agrega un producto, se crea un carrito vacío y, a continuación, se agrega el producto en la misma operación. Si el carrito ya existe (es decir, no es la primera vez que el usuario agrega productos), se recupera el carrito previamente creado y el producto se agrega a dicho carrito.

2. **Agregar Productos al Carrito**:
   Los usuarios pueden agregar productos uno a uno al carrito mediante la selección de un producto y la elección de la cantidad mediante los botones `+` y `-`. Al agregar un producto, se actualiza el carrito en la base de datos, y se almacena información como el ID del producto, la cantidad, y el precio total del producto.

3. **Actualizar Cantidad de Productos en la vista de carrito**:
   Los usuarios pueden modificar la cantidad de un producto en su carrito desde el mismo carrito. Esta acción actualiza la cantidad de ese producto en el carrito y recalcula el precio total.

4. **Eliminar Productos del Carrito**:
   Los productos pueden ser eliminados completamente del carrito en cualquier momento. Al eliminar un producto, se elimina su entrada en la base de datos correspondiente al carrito.

5. **Visualización del Carrito**:
   El carrito del usuario se puede ver en cualquier momento desde la interfaz de usuario presionando el simbolo del carrito que se ubica a la derecha en el Navbar. Esta vista muestra los productos en el carrito, su cantidad, el precio total por producto y el total a pagar por el carrito. En caso de que todavía no exista un carrito (pues el usuario no ha agregado ningún producto), la aplicación informa sobre esa situación.

6. **Finalización de Compra**:
   El alcance del proyecto no incluye la funcionalidad completa de finalización de compra. Sin embargo, se ha implementado un botón "Eliminar" en el carrito para ilustrar el uso del endpoint `DELETE`, el cual se utilizaría posteriormente para eliminar los productos del carrito luego de procesar la compra. Esta implementación es solo una representación de cómo se gestionaría el proceso de eliminación una vez completada la compra en un sistema real.

#### 🔶 Estructura de la Gestión del Carrito

La gestión del carrito se realiza mediante el uso de un **modelo de carrito** en la base de datos, y las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) se manejan con la ayuda de los **routers** y **managers**.

El flujo básico es el siguiente:

- **Router**: Las rutas para manejar el carrito están definidas en el archivo `cart.router.js`, donde se exponen los endpoints para agregar, eliminar o ver productos del carrito.
  
- **Modelo de Carrito y uso de Populate**: El modelo `cart.model.js` representa la estructura del carrito en la base de datos, incluyendo los productos agregados, su cantidad y el precio. En este modelo, cada producto dentro del carrito solo guarda el `_id` del producto, en lugar de almacenar toda la información del producto directamente. Para obtener los detalles completos de cada producto, se utiliza el método `populate` de Mongoose. Este método permite realizar una consulta de referencia a la colección de productos y traer los datos completos de cada producto, como su nombre, descripción, precio, etc., a partir del `_id` almacenado en el carrito. De esta manera, se optimiza el almacenamiento y se mantiene la relación entre los carritos y los productos en la base de datos.

- **Manager de Carrito**: El manager maneja la lógica para las operaciones del carrito. Incluye métodos para agregar productos, actualizar cantidades, eliminar productos y obtener el carrito completo.


[Volver al menú](#top)

<hr>

<a name="contribuyendo"></a>

## 🔹 CONTRIBUYENDO

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

## 🔹 LICENCIA

Distribuido bajo la licencia MIT. Consulte `LICENSE.txt` para obtener más información.

[Volver al menú](#top)

<hr>

<!-- CONTACT -->

<a name="contacto"></a>

## 🔹 CONTACTO

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
