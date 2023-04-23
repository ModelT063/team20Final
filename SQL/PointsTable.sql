CREATE TABLE `PointChanges` (
  `Point_Change_ID` int NOT NULL AUTO_INCREMENT,
  `Point_Change` int DEFAULT NULL,
  `Change_Reason` varchar(255) DEFAULT NULL,
  `Change_Time` datetime DEFAULT NULL,
  `User_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`Point_Change_ID`),
  KEY `fk_points_user_id_idx` (`User_ID`),
  CONSTRAINT `fk_points_user_id` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`User_ID`)
)