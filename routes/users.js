const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Required for password hashing

/**
 * @desc Display a page with a form for user registration
 */
router.get('/register', (req, res) => {
  res.render('register', { error: null }); // Initialize error to null
});

/**
 * @desc Register a new user with hashed password
 */
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.render('register', { error: "Please provide both username and password" });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      return res.render('register', { error: "An error occurred during registration." });
    }

    // Use prepared statements to prevent SQL injection
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const query_parameters = [username, hash];

    global.db.run(query, query_parameters, function (err) {
      if (err) {
        if (err.errno === 19) { // SQLITE_CONSTRAINT error (likely duplicate username)
          return res.render('register', { error: "Username already exists." });
        }
        console.error(err);
        return res.render('register', { error: "An error occurred during registration." });
      }
      res.redirect('/login'); // Redirect after successful registration
    });
  });
});

/**
 * @desc Display a page with a form for user login
 */
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

/**
 * @desc Login a user and store them in session
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';

  global.db.get(query, [username], (err, row) => {
    if (err) {
      console.error(err);
      return res.render('login', { error: "An error occurred during login." });
    }
    if (!row) {
      return res.render('login', { error: "Invalid username or password." });
    }

    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        console.error(err);
        return res.render('login', { error: "An error occurred during login." });
      }
      if (result) {
        req.session.user = row; // Store user object in session
        return res.redirect('/events'); // Redirect after successful login
      } else {
        return res.render('login', { error: "Invalid username or password." });
      }
    });
  });
});

/**
 * @desc Logout user and destroy session
 */
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Error logging out.");
    }
    res.redirect('/login');
  });
});

// Removed the commented-out "list-users" route for now (consider authorization before implementing)

// Export the router object so index.js can access it
module.exports = router;