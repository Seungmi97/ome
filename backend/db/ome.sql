DROP DATABASE IF EXISTS ome;
CREATE DATABASE IF NOT EXISTS ome DEFAULT CHARACTER SET utf8mb4;
USE ome;

DROP TABLE IF EXISTS answer;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS report;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS bookmark;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS node;
DROP TABLE IF EXISTS payment;
DROP TABLE IF EXISTS membership;
DROP TABLE IF EXISTS users;

-- Users
CREATE TABLE users (
  user_id       BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  login_id      VARCHAR(50)  NOT NULL UNIQUE,
  password      VARCHAR(255) NOT NULL,
  email         VARCHAR(100) NOT NULL,
  name          VARCHAR(50)  NOT NULL,
  nickname      VARCHAR(50)  NOT NULL,
  role          VARCHAR(20)  NOT NULL DEFAULT 'USER',
  status        VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE',
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Membership
CREATE TABLE membership (
  member_id     BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id       BIGINT       NOT NULL,
  start_date    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expired_at    DATETIME     DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Payment
CREATE TABLE payment (
  payment_id    BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id       BIGINT       NOT NULL,
  method        VARCHAR(20)  NOT NULL,
  price         INT          NOT NULL,
  is_paid       BOOLEAN      NOT NULL DEFAULT FALSE,
  paid_at       DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Node
CREATE TABLE node (
  node_id       BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id       BIGINT       NOT NULL,
  title         VARCHAR(255) NOT NULL,
  content       TEXT         NOT NULL,
  keywords      TEXT,
  type          VARCHAR(30),
  is_public     BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Review
CREATE TABLE review (
  review_id     BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  node_id       BIGINT       NOT NULL,
  user_id       BIGINT       NOT NULL,
  content       TEXT         NOT NULL,
  score         INT,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (node_id) REFERENCES node(node_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Comment
CREATE TABLE comment (
  comment_id    BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  node_id       BIGINT       NOT NULL,
  user_id       BIGINT       NOT NULL,
  content       TEXT         NOT NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (node_id) REFERENCES node(node_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bookmark
CREATE TABLE bookmark (
  bookmark_id   BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id       BIGINT       NOT NULL,
  node_id       BIGINT       NOT NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (node_id) REFERENCES node(node_id) ON DELETE CASCADE
);

-- Media
CREATE TABLE media (
  media_id      BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  node_id       BIGINT       NOT NULL,
  file_path     VARCHAR(255) NOT NULL,
  type          VARCHAR(50),
  uploaded_at   DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (node_id) REFERENCES node(node_id) ON DELETE CASCADE
);

-- Report
CREATE TABLE report (
  report_id     BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  reporter_id   BIGINT       NOT NULL,
  target_id     BIGINT       NOT NULL,
  target_type   VARCHAR(50)  NOT NULL,
  reason        TEXT,
  created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reporter_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Question
CREATE TABLE question (
  question_id   BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id       BIGINT       NOT NULL,
  title         VARCHAR(255) NOT NULL,
  content       TEXT         NOT NULL,
  is_private    BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Answer
CREATE TABLE answer (
  answer_id     BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question_id   BIGINT       NOT NULL,
  user_id       BIGINT       NOT NULL,
  content       TEXT         NOT NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES question(question_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
