<p align="center">
  <a href="#calling-about" style="color:#d8d18f;">About</a>&nbsp;&nbsp;|&nbsp;
  <a href="#gear-technologies" style="color:#cfcba5;">Technologies</a>&nbsp;&nbsp;|&nbsp;
  <a href="#sparkles-main-features" style="color:#e1e1c4;">Features</a>&nbsp;&nbsp;|&nbsp;
  <a href="#camera_flash-screenshots" style="color:#e1e1c4;">Screenshots</a>&nbsp;&nbsp;|&nbsp;
  <a href="#camera_flash-screenshots" style="color:rgba(216, 209, 143, 0.7);">Database</a>&nbsp;&nbsp;|&nbsp;
  <a href="#computer-setup">Setup</a>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#file_folder-project-folder-structure">Structure</a>&nbsp;&nbsp;|&nbsp;
  <a href="#rocket-project-history">History</a>&nbsp;&nbsp;|&nbsp;
  <a href="#movie_camera-project-video">Video</a>&nbsp;&nbsp;|&nbsp;
  <a href="#memo-license">License</a>
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/24686636/153765773-23271b47-8464-4985-b0e9-4d1e2181667b.png" alt="title" />
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

  - Data informations were kept in MySQL database and updated dynamically.
  - Users must register to use the application.
  - The data in the Shared table is listed on the Dashboard page.
  - Users can change and delete the information of the post they have saved.
  - The user cannot share the same post twice.
  - If the user makes a change to the post they shared, this change will also be shown on the Dashboard page.
  - The user cannot register more than once with the same email.
  - The post that the user deleted is also deleted on the Dashboard page if it has been shared before.
  - Movies and actors saved by the user are displayed on the user-specific Movies and Actors pages.
  - Users can delete, update, share the movie or player they recorded.
  - Users can like and comment on shared posts.
  - The same user cannot like a post more than once, but can comment more than once.

## :camera_flash: Screenshots

| Movie Mate | 
| --- | 
| ![main](https://user-images.githubusercontent.com/24686636/153762096-d3cbc4a8-d0cf-475c-a47b-4f4d2a30c73c.png) |

  - The application has home page for login.
  - Users can register to the application with **signup** button.
  - Registered users can login to the application with **login** button.
  - When users log in, they will see the **Dashboard** page with shared posts.<br/><br/>

| Dashboard | 
| --- | 
| ![dashboard](https://user-images.githubusercontent.com/24686636/153763067-5ee4b3cc-d2a9-4be8-afff-7146e4fbc20b.png) |

  - It is the first page the user sees after logging in.
  - Posts shared by users are listed here, with the most recent post at the top.
  - The information that the user who presses the like button likes the post is saved and directed to the post page.
  - The user who presses the comment button is directed to the post page.
  - Information that the added post is a movie or an actor is displayed next to the post's name.
  - When users click on the post name, they are directed to the post specific page.
  - The person who shared the post is shown at the bottom right.
  - **Note**: The first 200 characters of the descriptions of the posts are displayed on the Dashboard page.<br/><br/>

| Movies | Actors | 
| --- | --- | 
| ![movies](https://user-images.githubusercontent.com/24686636/153766617-e2966505-e641-4d87-825f-a98d89be5bd2.png) | ![actor](https://user-images.githubusercontent.com/24686636/153766651-e87a5c32-0481-4110-adbc-b386f8e9c668.png) |

  - Users can go to the **Movies** page with the movies button.
  - Users can go to the **Actors** page with the actors button.
  - Users can log out by pressing the **Logout** button.
  - Users can go to the **Dashboard** page by clicking the **Movie Mate (M)** icon.
  - Favorite movies and actors saved by users are listed on these pages.
  - Users can delete posts they have saved. If the deleted post has been shared before, it will be removed from the Dashboard page.
  - Users can update their saved posts. If the updated post has been shared before, it will also be updated on the Dashboard page.
  - Users can share their saved posts. The same post cannot be shared more than once.
  - These pages also show the number of the user's favorite movies or actors.<br/><br/>

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



| <img src="https://user-images.githubusercontent.com/24686636/139913804-64b32830-c50c-4efb-928f-6ba8e8c8e1b3.png" width="600px"> |
  - **Note**: Password must be at least 8 characters.
  
  
  
## :computer: Setup
  
  - To run the project, NodeJS must be installed on your computer. After completing these installations, we open the git terminal. We write the following expression ``git clone https://github.com/mehtapugur/Cargo-Delivery-System.git`` and press the enter button. After opening the downloaded project in the code editor, we download the project dependencies by typing ``npm install`` in the terminal. After this process is finished, we run the project by typing ``npm start`` in the terminal. <br/><br/>
   
## :file_folder: Project Folder Structure
    
    Movie Mate
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
  
  :ballot_box:
:toolbox:
:ice_cube:

  
```js
/**
 * Gusto & RemoteTeam Node.js Bootcamp
 * Final Project
 * Mehtap Ugur
 */  
```
