# Event Manager Web Application

This is a web application for managing events, built using Node.js, Express.js, EJS templating, and SQLite. It provides separate interfaces for organizers (to create and manage events) and attendees (to view and book events).

## Features

*   **User Authentication:** Secure user registration and login with password hashing using bcrypt.
*   **Event Management:** Organizers can create, view, and (in future implementations) edit and delete events.
*   **Event Listing:** Attendees can view a list of upcoming events.
*   **Persistent Sessions:** User login sessions are persisted using SQLite, so users remain logged in across server restarts.

## Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **EJS (Embedded JavaScript):** Templating engine for generating dynamic HTML.
*   **SQLite:** Lightweight, file-based database.
*   **bcrypt:** Library for secure password hashing.
*   **express-session:** Middleware for managing user sessions.
*   **connect-sqlite3:** Session store for persisting sessions in SQLite.

## Requirements

*   **Node.js:**
*   **npm (Node Package Manager):** 
*   **SQLite:** 

## Setup and Installation

1.  
copy to your computer

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

    This command installs all the required Node.js modules listed in `package.json`.

3.  **Create the Database and Tables:**

    ```bash
    sqlite3 database.db < db_schema.sql
    ```

    This command creates a new SQLite database file named `database.db` (if it doesn't exist) and executes the SQL commands in `db_schema.sql` to create the necessary tables (`users`, `events`, and `bookings`).

4.  **Set the Session Secret (Important for Production):**



    *   **Linux/macOS:**

        ```bash
        export SESSION_SECRET="your_very_strong_random_secret"
        ```

    *   **Windows (PowerShell):**

        ```powershell
        $env:SESSION_SECRET = "your_very_strong_random_secret"
        ```


5.  **Start the Server:**

    ```bash
    npm start
    ```

    This will start the Node.js server.

## Usage

Open your web browser and navigate to `http://localhost:3000`.

*   **Registration:** If you don't have an account, click the "Register" link to create one.
*   **Login:** After registering or if you already have an account, use the login form to access the application.
*   **Event Listing/Creation:** Once logged in, you'll be redirected to the events page (`/events`), where you can view existing events and create new ones (if you are logged in as an organizer).
*   **Logout:** Click the "Logout" link to end your session.

## File Structure
web-manager/
├── public/
│   └── main.css       # CSS stylesheet
├── routes/
│   ├── users.js       # User authentication routes
│   └── events.js      # Event management routes
├── views/
│   ├── register.ejs   # Registration form
│   ├── login.ejs      # Login form
│   └── events/
│       └── index.ejs  # Event list and creation form
├── db_schema.sql      # Database schema definition
├── index.js           # Main application entry point
├── package.json       # Project dependencies
├── package-lock.json  # Dependency lock file
└── README.md          # This file

