# Welcome to my backend app
<div align="center">
  <img src="./src/images/logo_tattoo_studio.png" alt="imagen-db" width="300" height="300" />
</div>
<br></br>
<div>
<a href = "antonioinsa@tutanota.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/antonioinsa/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a> 
</p>
</div>
<br></br>
<details>
  <summary>Contenido 📝</summary>
  <ol>
    <li><a href="#objetivo">Objetivo</a></li>
    <li><a href="#sobre-el-proyecto">Sobre el proyecto</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#diagrama-bd">Diagrama</a></li>
    <li><a href="#instalación-en-local">Instalación</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#database">DataBase (accesos y registros)</a></li>
    <a></li>
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
    
  </ol>
</details>

## Objetivo
Este proyecto requería una API funcional conectada a una base de datos con al menos una relación de uno a muchos y una relación de muchos a muchos.

## Sobre el proyecto
Se ha creado una aplicación web para una empresa de tatuajes, en la que los clientes puedan registrarse, logearse, modificar su perfil y acceder a este.
Por otra parte, a traves de su login; crear, editar o eliminar la cita o citas solicitadas con uno o varios tatuadores, ademas de poder consultar todas sus citas.

Como toda empresa, ademas de clientes, son indispensables sus trabajadores. Los cuales podran logearse para acceder a la visualizacion de sus citas con los clientes y despues de una valoracion de los requisitos para el boceto requerido por el cliente, realizar en dicha cita una actualizacion para fijar el precio del trabajo ha realizar.

En esta API, cualquier persona registrada o no, podra ver los tatuadores en plantilla, mostrando unicamente su primer nombre, ultimo nombre y nacionalidad, ya que son tatuaderes de alto prestigio los cuales a lo largo de su trayectoria han ido ganando seguidores a traves de sus trabajos.
Por ello se permite el acceso a estos trabajadores, pero unicamente se podran ver sus trabajos si eres un usuario registrado.

La supervision de la API la realizara el superAdmin, el cual podra ver todos los clientes y trabajadores de su estudio de tatuajes, al igual que dar de alta o baja sus trabajadores y cambiar de "role" a los usuarios.

## Stack
Tecnologías utilizadas:
<div align="center">

<a href="https://www.expressjs.com/">
    <img src= "https://img.shields.io/badge/-Express.js-000"/>
</a>
<a href="https://nodejs.org/es/">
    <img src= "https://img.shields.io/badge/-Node.js-000?&logo=node.js"/>
</a>
<a href="https://www.typescriptlang.org/">
    <img src= "https://img.shields.io/badge/-TypeScript-000?&logo=TypeScript&logoColor=007ACC"/>
</a>
<a href="https://www.postman.com/">
    <img src= "https://img.shields.io/badge/-Postman-000?&logo=Postman"/>
</a>
<a href="https://www.mysql.com/">
    <img src= "https://img.shields.io/badge/-MySQL-000?&logo=mysql&logoColor=FFFFFF"/>
</a>
<a href="https://git-scm.com/">
    <img src= "https://img.shields.io/badge/-Git-000?&logo=git"/>
</a>
<a href="https://www.github.com/">
    <img src= "https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github"/>
</a>
<a href="https://jwt.io/">
    <img src= "https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
</a>
 </div>


## Diagrama BD
!['imagen-db'](./src/images/tattoo_studio.png)

## Instalación en local
1. Clonar el repositorio
2. ` $ npm install `
3. Conectamos nuestro repositorio con la base de datos 
4. ```$ npx typeorm-ts-node-commonjs migration:run -d ./src/db.ts ```
5. ``` $ Utilizamos archivos SQL (insertamos los registros en las diferentes tablas de nuestra DB) ``` 
6. ``` $ npm run dev ``` 


## Endpoints
<details>
<summary>Endpoints</summary>


- OPEN

    - Workers list (all people)

            GET http://localhost:3000/worker/current

-AUTH

  - CLIENTES

    - Register new (client)

            POST http://localhost:3000/client/register
        body:
        ``` js
            {
                "first_name": "David",
                "last_name": "Perez Ruiz",
                "phone": "666666888",
                "email": "david@david.com",
                "password": "123456789"
            }
        ```
    - Login (Clients)

            POST http://localhost:3000/client/login  
        body:
        ``` js
            {
                "email": "david@david.com",
                "password": "123456789"
            }
        ```
    - Account client (personal profile)

            GET http://localhost:3000/client/account  
        
    - Update profile (client)

            PUT http://localhost:3000/client/account/modifyAccount 

    - Products (customers consult the products)

            GET http://localhost:3000/client/products          
       
    - Delete client (superAdmin)

            DELETE http://localhost:3000/client/delete
        body:
        ``` js
            {
                "id": 3
            }
        ```

  - TRABAJADORES

    -  Login (superAdmin)

            POST http://localhost:3000/worker/login 
        body:
        ``` js
            {
                "email": "akingaby4@dailymotion.com",
                "password": "123456789"
            }
        ```
    - All clients profiles (superAdmin)

            GET http://localhost:3000/client/clients 

    - Register workers (superAdmin)

            POST http://localhost:3000/worker/register
        body:
        ``` js
            {
                "first_name": "Odin",
                "last_name": "Marandi",
                "phone": "987425699",
                "email": "odin@odin.com",
                "nationality": "Latvia",
                "password": "123456789"
            }
        ```
    -  Login (workers)

            POST http://localhost:3000/worker/login 
        body:
        ``` js
            {
                "email": "pgirvan0@delicious.com",
                "password": "123456789"
            }
        ```
    - Delete workers (superAdmin)

            DELETE http://localhost:3000/worker/delete
        body:
        ``` js
            {
                "id": 2
            }
        ```

    - Update profile worker (superAdmin) - Dato/s ha actualizar 
      ("first_name", "last_name", "phone", "email", "nationality", "password")

            PUT http://localhost:3000/worker/update
        body:
        ``` js
            {
                "phone": "987444444",
                "email": "pgi@delicious.com"
            }
        ```
    - Change Role (superAdmin)

            PUT http://localhost:3000/worker/changeRole
        body:
        ``` js
            {
                "id": 3,
                "role": "superAdmin"
            }
        ```   

- GESTION DE CITAS

    -  Create appointment (client)

            POST http://localhost:3000/appointment/create 
        body:
        ``` js
            {
                "date": "2024-11-06T16:20:20.130Z",
                "article": 1,
            }
        ``` 
    -  Update appointment (client)

            PUT http://localhost:3000/appointment/update 
        body:
        ``` js
            {
                "date": "2024-12-06T16:20:20.130Z"
            }
        ```
    -  Delete appointment (client)

            DELETE http://localhost:3000/appointment/delete 
        body:
        ``` js
            {
                "id": 1
            }
        ```      
    -  Add price Client  appointment (tattoo_artist)

            PUT http://localhost:3000/appointment/workerupdate 
        body:
        ``` js
            {
                "price": "150"
            }
        ```

  - CONSULTAR CITAS

      - Appointment client/tatto_artist (client)

            GET http://localhost:3000/appointment/clientAppointment 

      - Appointment tattoo_artist/client (worker)

            GET http://localhost:3000/appointment/tattooArtistAppointment 

     ...
</details>

## DataBase
En este apartado se adjuntan las tablas en formato SQL para  insertar los registros en la base de datos.

Tanto clients como workers estan creados con una password generica "123456789", para una mayor sencillez a la hora de probar la APP.

<u>Accesos =></u>

**user (login clients)**

{
  "email": "bradki9@shareasale.com",
  "password": "123456789"
}

**admin (login workers)**

{
  "email": "pgirvan0@delicious.com",
  "password": "123456789"
}

**superAdmin (login workers)**

{
  "email": "akingaby4@dailymotion.com",
  "password": "123456789"
}

<u>Registros =></u>
<div>
<p><a href="./src/DataBase/clients.sql">Click aqui para acceder clients.sql</a></p>
<p><a href="./src/DataBase/workers.sql">Click aqui para acceder workers.sql</a></p>
<p><a href="./src/DataBase/products.sql">Click aqui para acceder products.sql</a></p>
<p><a href="./src/DataBase/portfolio.sql">Click aqui para acceder portfolio.sql</a></p>
</div>

## Licencia
Proyecto desarrollado por Antonio Insa Benavent, bajo licencia MIT.

Consulta el archivo <a href="./LICENSE">`LICENSE`</a> para más información.

## Agradecimientos:

Agradezco a mis compañeros el tiempo dedicado a resolver mis dudas y bloqueos.

