CREATE TABLE `LoginAttempts` (
  `Login_ID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(45) DEFAULT NULL,
  `Login_Status` int DEFAULT NULL,
  `Login_Time` datetime DEFAULT NULL,
  `User_ID` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Login_ID`),
  KEY `fk_login_attempts_user_id_idx` (`User_ID`),
  CONSTRAINT `fk_user_id_login` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`User_ID`)
)