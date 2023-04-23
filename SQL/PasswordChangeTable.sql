CREATE TABLE `PasswordChanges` (
  `Password_Change_ID` int NOT NULL AUTO_INCREMENT,
  `Change_Time` datetime DEFAULT NULL,
  `Change_Type` int DEFAULT NULL,
  `User_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`Password_Change_ID`),
  KEY `fk_password_user_id_idx` (`User_ID`),
  CONSTRAINT `fk_password_user_id` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`User_ID`)
)
