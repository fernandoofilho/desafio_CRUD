CREATE TABLE users (
    "userEmail" VARCHAR(100) PRIMARY KEY,
    "userName" VARCHAR(50) NOT NULL,
    "userSurname" VARCHAR(100) NOT NULL,
    "userKey" VARCHAR(160) NOT NULL,
    "userLevelAccess" INT NOT NULL
);

CREATE TABLE user_history (
    "userEmail" VARCHAR(100) PRIMARY KEY,
    "userStatus" VARCHAR(100) NOT NULL,
    "userLevelAccess" VARCHAR(100) NOT NULL,
    "userCreatedBy" VARCHAR(100) NOT NULL,
    "creationDate" DATE NOT NULL,
    "deleteDate" DATE
);