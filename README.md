-----------------------------------------------
-----------------------------------------------
Name: Haroun Kassouri
Student Number: C21508813
Date: 01/05/2025
Enterprise Application Development Final Assignment

Project Name: HK Gallery - Digital Art Museum
-----------------------------------------------
-----------------------------------------------


-----------------------------------------------
Project Description:
-----------------------------------------------

HK Gallery is an interactive art gallery management web application. The application allows users to browse, search, filter, add, edit, and delete digital artworks from a catalogue of artworks. It also allows users to purchase their favourite artworks and have them added to their own personal collection. It includes a personal experience with a signup and login system.

This app follows a client-server microservice architecture using Node.js, Express, MongoDB, and a frontend built with HTML, Bootstrap, and JavaScript.


-----------------------------------------------
Functionality:
-----------------------------------------------

Below is the functionality that the server provides and what the user can do on the website.

Server:
Loads artwork catalogue from a JSON file.

Stores artworks in MongoDB.

Provides a RESTful API (GET, POST, PUT, 
DELETE) for full artwork management.

Handles user sessions via `express-session`, stored securely in MongoDB.


Users:
Accessed via `http://localhost:8080/index.html`.

View artworks in a paginated grid layout.

Search by title and artist.

Filter by year and department.

Add, edit, and delete artworks using modals.

Mark artworks as favourites (saved in localStorage).

View saved favourites in a dedicated page.

Responsive design using Bootstrap and custom CSS.


-----------------------------------------------
Instructions to Run the Application:
-----------------------------------------------

1. Download
Download the EAD-Project folder inside the zip file and open it in VSC.

2. Install Dependencies
npm install

3. Create a .env File
Place your mongodburl inside this variable:

4. Start the Server
node server.js

5. Access in your broswe
http://localhost:8080/index.html



-----------------------------------------------
Core Features:
-----------------------------------------------

Load catalogue from JSON into MongoDB

Full REST API (GET, POST, PUT, DELETE) for artworks

Paginated artwork gallery (12 per page)

Filter by year and department

Search by title and artist

Add, Edit, Delete artworks using modal forms

Responsive, mobile-friendly UI using Bootstrap

Index.html used to test all server functions


-----------------------------------------------
Added Features: 
-----------------------------------------------

Cart and Purchase System
Users can add artworks to a cart and simulate purchase. Purchased artworks are added to their personal collection.

User Authentication (Login & Logout)
Session-based login/logout system using express-session.

User Profile Page
Editable profile section with save functionality.

Favorites Feature (localStorage)
Users can mark artworks as favorites.

Modal-Based UX
Add/Edit interactions handled through Bootstrap modals for cleaner UI.

Real-Time Cart Updates
Cart badge updates dynamically across pages.

Fully Responsive Design
Clean card layout adaptable to all screen sizes.

-----------------------------------------------
Future Work:
-----------------------------------------------

Add user registration form with password hashing

Track total number of purchases per user

Add category-based browsing (e.g., by style or medium)

Sort artworks by price or popularity

Allow image uploads (currently uses image URLs)

Add admin panel for artwork moderation

Add analytics for user behavior and most viewed pieces

-----------------------------------------------
References:
-----------------------------------------------

Bootstrap Template used - https://themewagon.com/themes/free-museum-website-template/