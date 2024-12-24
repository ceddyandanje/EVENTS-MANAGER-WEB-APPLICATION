const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const app = express();
const port = process.env.PORT || 3000;

// Database Connection
const dbFilePath = './database.sqlite'; // SQLite database file
const db = new sqlite3.Database(dbFilePath, (err) => {
    if (err) {
        console.error("Database connection error:", err.message);
        process.exit(1);
    }
    console.log('Connected to the SQLite database.');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'a_strong_secret_key',
    resave: false,
    saveUninitialized: false,
    store: new SQLiteStore({ db: 'sessions.db' }),
    cookie: {
        maxAge: 3600000, // 1 hour
    }
}));

// Routes
try {
    const usersRoutes = require('./routes/users')(db, bcrypt);
    const eventsRoutes = require('./routes/events')(db);

    app.use('/', usersRoutes);
    app.use('/events', eventsRoutes);
} catch (err) {
    console.error("Error loading routes:", err.message);
    process.exit(1);
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
