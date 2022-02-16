<p align="center">
  <a href="#calling-about">About</a>&nbsp;&nbsp;|&nbsp;
  <a href="#gear-technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;
  <a href="#sparkles-main-features">Features</a>&nbsp;&nbsp;|&nbsp;
  <a href="#camera_flash-screenshots">Screenshots</a>&nbsp;&nbsp;|&nbsp;
  <a href="#ballot_box-mysql-database">Database</a>&nbsp;&nbsp;|&nbsp;
  <a href="#computer-setup">Setup</a>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#file_folder-project-folder-structure">Structure</a>&nbsp;&nbsp;|&nbsp;
  <a href="#rocket-project-history">History</a>&nbsp;&nbsp;|&nbsp;
  <a href="#memo-license">License</a>
</p>

<div align="center">
  <img src="https://user-images.githubusercontent.com/24686636/153765773-23271b47-8464-4985-b0e9-4d1e2181667b.png" alt="title" />
</div>

## :calling: About
Movie Mate is a platform where registered users can add, share, delete, update their favorite movies and actors, like and comment on other users' posts.

## 🌏 <a href="https://mmoviemate.herokuapp.com" target="_blank">DEMO LINK</a> 🌏

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

| Login | Signup | 
| --- | --- | 
| ![loginn](https://user-images.githubusercontent.com/24686636/153781594-e91840f5-b192-4584-8971-37638ebd8e7c.png) | ![sign](https://user-images.githubusercontent.com/24686636/153781605-03eaf773-3580-4b83-99fa-2826fb527206.png) |

  - Users must first register to be able to login to the application.
  - Registered users can login with their email and password.
  - To register, the password must be a minimum of 8 characters.
  - Users can log into the app with their Google or Facebook account. These users are also registered in the database.
  - Unfortunately, Google broke my design as the login button is used by default. **:)** <br/><br/>

| Google Auth | Facebook Auth | 
| --- | --- | 
| ![2022-02-14 at 05-52-55](https://user-images.githubusercontent.com/24686636/153794150-12401129-9131-44aa-b5cf-4895a289c9ae.gif) | ![ff](https://user-images.githubusercontent.com/24686636/153794402-fb8ca936-f91d-4814-be42-bfb045479068.gif) |

  - Users can log in with their Google or Facebook accounts.
  - User information is saved in the database.<br/><br/>

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

| Add Movie | Add Actor | 
| --- | --- | 
| ![adda](https://user-images.githubusercontent.com/24686636/153768057-beb1919a-bb03-4671-961e-d242ecdf207d.png) | ![addm](https://user-images.githubusercontent.com/24686636/153768075-fd0f3540-636b-483e-87bb-cbfea00090ae.png) |

  - Users can add their favorite movies and actors through these pages.
  - The **name** must be a maximum of `50 characters` and the **description** a maximum of `500 characters`.<br/><br/>

| Edit | Post Page | 
| --- | --- | 
| ![edit](https://user-images.githubusercontent.com/24686636/153768415-24d3cb06-050b-4754-985f-84d0bde40952.png) | <img src="https://user-images.githubusercontent.com/24686636/153793849-55ca9c3e-bd84-4406-ae1a-d6d4b5a56171.gif" width="750px"> |

  - Users can update their saved posts. If the updated post has been shared before, it will also be updated on the Dashboard page.
  - All content is displayed on posts specific pages.
  - Users can comment on the post and the comments are displayed in order.
  - Next to the comment is the author of the comment.<br/><br/>

| JWT | 
| --- | 
| ![jwttall](https://user-images.githubusercontent.com/24686636/153793122-c689cf53-ea4e-48cb-99a1-7ddf108fb633.png) |

  - **Json Web Token** is created for logged-in users.
  - The token is deleted when the user logs out.<br/><br/>

## :ballot_box: MySQL Database

| User Table |  Comments Table |
| --- | --- |
| ![2022-02-14 at 06-21-37](https://user-images.githubusercontent.com/24686636/153795454-0b3bf19b-6a32-4f90-9e2b-0c254bcb5e7d.png) | ![2022-02-14 at 06-22-27](https://user-images.githubusercontent.com/24686636/153795661-05bdebd6-0316-49c6-83e9-87ac9abb5871.png) |

| Data Table | Likes Table |
| --- | --- | 
| ![2022-02-14 at 06-22-00](https://user-images.githubusercontent.com/24686636/153795515-a4eecd0e-91b9-454f-a64f-8e07ca51af51.png) | ![2022-02-14 at 06-24-35](https://user-images.githubusercontent.com/24686636/153795684-3f11e86d-115f-4021-9427-436d45375d01.png) |

| Shared Table | 
| --- | 
| ![2022-02-14 at 06-24-48](https://user-images.githubusercontent.com/24686636/153795577-c8c46896-7515-417c-9dfc-896e0bb496f7.png) |

 - **5 tables** were used for the project.<br/><br/>
  
## :computer: Setup

  - To download this project, **Git** must be installed on your computer (or you can download zip file). And you must use **MySQL Workbench**. After these installations open the git terminal. And write the following expression:
```makefile
git clone https://github.com/Kodluyoruz-NodeJs-Bootcamp/final-project-mehtapugur
cd final-project-mehtapugur
npm install

```
  - Create an **.env** file for parameters and create database for datas. And run these comment on comment line:
 ```makefile
npm start
```
  - Then open http://localhost:5000/ on your browser.
   
## :file_folder: Project Folder Structure
    
    Movie Mate
    .
    │
    ├── src
    │    └── controllers
    │       └── pageController.ts
    │       └── userController.ts
    │    └── entity
    │       └── comments.entity.ts
    │       └── data.entity.ts
    │       └── likes.entity.ts
    │       └── shared.entity.ts
    │       └── user.entity.ts
    │    └── middlewares
    │       └── authMiddleware.ts
    │    └── routes
    │       └── pageRoute.ts
    │       └── userRoute.ts
    │    └── types
    │       └── global.type.ts
    │    └── app.ts
    │
    ├── views
    │    └── partials
    │       └── _footer.ejs
    │       └── _header.ejs
    │       └── _navigation.ejs
    │    └── actors.ejs
    │    └── add_actor.ejs
    │    └── add_movie.ejs
    │    └── dashboard.ejs
    │    └── data.ejs
    │    └── edit.ejs
    │    └── index.ejs
    │    └── login.ejs
    │    └── movies.ejs
    │    └── signup.ejs
    │
    ├── .env
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── project-diary.md                
    ├── README.md 
    ├── tsconfig.json   
    │
<br/>

## :rocket: Project History

<a href="https://github.com/Kodluyoruz-NodeJs-Bootcamp/final-project-mehtapugur/blob/main/project-diary.md">Here<a/>, the project has a development period in Turkish. You can read if you want.<br/><br/>

## :memo: License
This project is under the terms of the MIT license.
<br/>
<br/>
Contact: [LinkedIn](https://www.linkedin.com/in/mehtapugur)
  
```js
/**
 * Gusto & RemoteTeam Node.js Bootcamp
 * Final Project
 * Mehtap Ugur
 */  
```
