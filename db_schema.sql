-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Create the users table
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Create the events table
CREATE TABLE IF NOT EXISTS events (
  event_id INTEGER PRIMARY KEY AUTOINCREMENT,
  organizer_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date DATETIME NOT NULL,
  location TEXT,
  capacity INTEGER,
  FOREIGN KEY (organizer_id) REFERENCES users(user_id)
);

-- Create the bookings table (if you plan to implement booking functionality)
CREATE TABLE IF NOT EXISTS bookings (  -- Commented out for now
  booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(event_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert some sample users (optional)
-- You can replace these with your own user creation logic
-- INSERT INTO users (username, password) VALUES ('user1', 'hashed_password1');
-- INSERT INTO users (username, password) VALUES ('user2', 'hashed_password2');