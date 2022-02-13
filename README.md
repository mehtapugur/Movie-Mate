<p align="center">
  <a href="#calling-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#gear-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sparkles-main-features">Features</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#camera_flash-screenshots">Screenshots</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-setup">Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
  <a href="#file_folder-project-folder-structure">Structure</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
  <a href="#rocket-project-history">History</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
  <a href="#movie_camera-project-video">Video</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
  <a href="#memo-license">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/24686636/153736179-fd34a29e-b994-4f8e-9233-4eead35bd720.png" alt="title" />
</div>

## :calling: About
Movie Mate is a platform where registered users can add, share, delete, update their favorite movies and actors, like and comment on other users' posts.

## :gear: Technologies

- [HTML](https://www.w3schools.com/html/)
- [CSS](https://www.w3schools.com/css/)
- [Bootstrap](https://getbootstrap.com/docs/)
- [TypeScript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/#/)
- [JWT](https://jwt.io/)
- [Google Sign-In](https://developers.google.com/identity/sign-in/web/sign-in)
- [EJS](https://ejs.co/)
- [Font Awesome](https://fontawesome.com/icons)
- [Heroku](https://www.heroku.com/)


Database operations of this application were designed with MySQL and TypeORM.<br/>
EJS was used for front-end design.<br/>
Font Awesome was used for the icons used.
TypeScript and Node.js were used for background processes.<br/>
CSS and Bootstrap were used for styling.
<br/>

## :sparkles: Main Features

  - Cargo information is kept in Firebase and updated dynamically.
  - Users must register to use the application.
  - Cargoes in the database are listed.
  - Users can change the status of cargoes and delete them.
  - Cargo locations are shown on the map.
  - The markers of the cargoes with a "true" send value are deleted from the map.
  - Users can save a cargo address to the database by clicking on the map. A marker is created at the clicked place on the map.
  - The shortest path is drawn for the first two cargo locations in the database.

## :camera_flash: Screenshots

| Home | 
| --- | 
| <img src="https://user-images.githubusercontent.com/24686636/139913804-64b32830-c50c-4efb-928f-6ba8e8c8e1b3.png" width="600px"> |

  - The application has home page for login.
  - Users can register to the application with **Signup** button.
  - Registered users can login to the application with **Login** button.
  - When the users logs in, they will see the **Cargo** page with address, status and logout options.
  - **Note**: Password must be at least 8 characters.<br/><br/>

| Cargo | Logout | 
| --- | --- | 
| ![Preview](https://user-images.githubusercontent.com/24686636/139920166-1bac2ecd-4526-49e8-a8d6-3d74a50a01bc.png) | ![Preview](https://media.giphy.com/media/0BdQhGuevErtCfVVJ3/giphy.gif) |

  - Users can go to the **Address Page** with the address button.
  - Users can go to the **Status Page** with the status button.
  - Users can log out by pressing the **Logout** button.<br/><br/>

| Address | Map | 
| --- | --- | 
| ![Preview](https://user-images.githubusercontent.com/24686636/139924222-8ce09c47-771f-442b-9c70-ecdbd9ecca48.png) | ![Preview](https://media.giphy.com/media/TuFP8wtAsy8qo4YoKN/giphy.gif) |

  - The latitude and longitude information of the cargoes in the database are listed on the **Address Page**.
  - Users can open the Map page with the **Open Map** button.<br/><br/>

| Status | Map | 
| --- | --- | 
| ![Preview](https://user-images.githubusercontent.com/24686636/139925533-34187488-d284-47bb-9120-e8e6de5fcd51.png) | <img src="https://media.giphy.com/media/1J0KMKTZJiy94kiR2d/giphy.gif" width="720px"> |

  - The latitude and longitude information of the cargoes in the database are listed on the **Status Page**.
  - The status of the cargoes is shown, if the **send** information is "true", that is, if it has been sent, it checks the checkbox.
  - The cargo location with "true" send information is deleted from the map, the marker is deleted.
  - Users can delete the cargoes by pressing the **X** button.
  - Users can **Save** cargo with the latitude and longitude values they type.
  - Users can open the Map page with the **Open Map** button.
  - The shortest path is drawn for the first two cargo locations in the database.<br/><br/>

| Firebase Realtime Database | 
| --- | 
| <img src="https://user-images.githubusercontent.com/24686636/140101981-9c7e16b6-7831-4daa-bbc3-304b21ff2819.png" width="600px"> |

  - A **key** is generated for each user.
  - There are **users** and **locations**.
  - A key is created for each location under **locations**.
  - **latitude**, **longitude** and **send** information of each location is stored. <br/><br/>


## :computer: Setup
  
  - To run the project, NodeJS must be installed on your computer. After completing these installations, we open the git terminal. We write the following expression ``git clone https://github.com/mehtapugur/Cargo-Delivery-System.git`` and press the enter button. After opening the downloaded project in the code editor, we download the project dependencies by typing ``npm install`` in the terminal. After this process is finished, we run the project by typing ``npm start`` in the terminal. <br/><br/>
   
## :file_folder: Project Folder Structure
    
    Cargo-Delivery-System
    .
    │
    ├── src
    │    └── cargo
    │       └── address
    │          └── address.css
    │          └── address.html
    │          └── address.js
    │       └── map
    │          └── map.html
    │          └── map.js
    │       └── status  
    │          └── status.css
    │          └── status.html
    │          └── status.js
    │       └── cargo.css     
    │       └── cargo.html
    │       └── cargo.js
    │    └── main.css 
    │    └── main.html
    │    └── main.js
    │
    ├── index.js
    │
    ├── project-diary.md
    │                 
    ├── readme.md    
    │
<br/>

## :rocket: Project History

<a href="https://github.com/mehtapugur/Cargo-Delivery-System/blob/main/project-diary.md">Here<a/>, the project has a 15-day development period in Turkish. You can read if you want.<br/><br/>

## :movie_camera: Project Video
  - video

## :memo: License
This project is under the terms of the MIT license.
<br/>
<br/>
Contact: [LinkedIn](https://www.linkedin.com/in/mehtapugur)
