-- Users table to store user information
CREATE TABLE Users (
user_id SERIAL PRIMARY KEY,
email VARCHAR(255) UNIQUE NOT NULL,
full_name VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
bio TEXT, -- Optional
user_image VARCHAR(255) -- Optional
);

-- Comments table to store comments on posts
CREATE TABLE Comments (
comment_id SERIAL PRIMARY KEY,
post_id INT NOT NULL,
user_id INT NOT NULL,
content TEXT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES Posts(post_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Likes table to store likes on posts
CREATE TABLE Likes (
like_id SERIAL PRIMARY KEY,
post_id INT NOT NULL,
user_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (post_id) REFERENCES Posts(post_id),
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Follows table to manage user follow relationships
CREATE TABLE Follows (
follow_id SERIAL PRIMARY KEY,
follower_id INT NOT NULL,
followed_id INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (follower_id) REFERENCES Users(user_id),
FOREIGN KEY (followed_id) REFERENCES Users(user_id),
UNIQUE (follower_id, followed_id) -- Prevent duplicate follows
);

CREATE TABLE Posts (
post_id SERIAL PRIMARY KEY,
user_id INT NOT NULL,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL, -- Supports multiple paragraphs
images TEXT[], -- Array of image URLs or paths
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
views INT DEFAULT 0,
FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
