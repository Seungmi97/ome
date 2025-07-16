DROP DATABASE IF EXISTS OME;
CREATE DATABASE OME;
USE OME;


-- 사용자 정보
CREATE TABLE Users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    role ENUM('ADMIN','CREATOR','USER') NOT NULL DEFAULT 'USER',
    approved BOOLEAN DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 레시피
CREATE TABLE Recipe (
    recipe_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    creator_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    content TEXT,
    is_premium ENUM('free','premium') NOT NULL,
    category ENUM('korean','western','japanese','chineses','dessert','vegan','etc') NOT NULL,
    ingredients TEXT,
    reported BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 미디어 정보
CREATE TABLE Media (
    media_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    target_id BIGINT NOT NULL,
    target_type ENUM('RECIPE','REVIEW') NOT NULL,
    url VARCHAR(255) NOT NULL,
    seq BIGINT,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 댓글
CREATE TABLE Comment (
    comment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    parent_id BIGINT DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES Comment(comment_id) ON DELETE CASCADE
);

-- 구독 정보
CREATE TABLE Subscription (
    sub_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    creator_id BIGINT NOT NULL,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 멤버십 정보
CREATE TABLE Membership (
    mem_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    member_state ENUM('premium','free') NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expired_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 결제
CREATE TABLE Payment (
    payment_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    creator_id BIGINT NOT NULL,
    amount INT NOT NULL,
    method VARCHAR(50) NOT NULL,
    status ENUM('PAID','FAILED','CANCELLED') NOT NULL,
    pg_tid VARCHAR(100),
    paid_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 질문
CREATE TABLE Question (
	question_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    recipe_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    title VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    is_secret BOOLEAN DEFAULT FALSE,
    status ENUM('WAITING','ANSWERED') DEFAULT 'WAITING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 답변
CREATE TABLE Answer (
    answer_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    creator_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES Question(question_id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 신고
CREATE TABLE Report (
    report_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    target_id BIGINT NOT NULL,
    target_type ENUM('RECIPE','COMMENT','USER') NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- 찜 (북마크)
CREATE TABLE Bookmark (
    bookmark_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE
);

-- 후기
CREATE TABLE Review (
    review_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    recipe_id BIGINT NOT NULL,
    creator_id BIGINT NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (creator_id) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id) ON DELETE CASCADE
);
