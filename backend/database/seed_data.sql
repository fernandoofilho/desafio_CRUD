
INSERT INTO user_history ("userEmail", "userStatus", "userLevelAccess", "userCreatedBy", "creationDate", "deleteDate")
VALUES 
    ('admin@example.com', 'active', '2', 'self', '2023-01-01', NULL),
    ('user2@example.com', 'active', '1', 'self', '2023-01-02', NULL),
    ('user3@example.com', 'active', '1', 'self', '2023-01-20', NULL),
    ('user4@example.com', 'active', '1', 'self', '2023-01-20', NULL),
    ('user5@example.com', 'active', '1', 'self', '2023-01-20', NULL),
    ('user6@example.com', 'active', '1', 'self', '2023-01-20', NULL),
    ('user7@example.com', 'active', '1', 'self', '2023-01-20', NULL),
    ('user8@example.com', 'active', '1', 'self', '2023-01-20', NULL),
    ('user9@example.com', 'active', '1', 'self', '2023-01-20', NULL),
    ('user10@example.com', 'active', '1', 'self', '2023-01-20', NULL);

INSERT INTO users ("userEmail", "userName", "userSurname", "userKey", "userLevelAccess")
VALUES 
    ('admin@example.com', 'admin', 'usr', '@ValidKey123', 2),
    ('user2@example.com', 'User2', 'Surname2', '@ValidKey123', 1),
    ('user3@example.com', 'User3', 'Surname3', '@ValidKey123', 1),
    ('user4@example.com', 'User4', 'Surname4', '@ValidKey123', 1),
    ('user5@example.com', 'User5', 'Surname5', '@ValidKey123', 1),
    ('user6@example.com', 'User6', 'Surname6', '@ValidKey123', 1),
    ('user7@example.com', 'User7', 'Surname7', '@ValidKey123', 1),
    ('user8@example.com', 'User8', 'Surname8', '@ValidKey123', 1),
    ('user9@example.com', 'User9', 'Surname9', '@ValidKey123', 1),
    ('user10@example.com', 'User10', 'Surname10', '@ValidKey123', 1);
