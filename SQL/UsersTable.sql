CREATE TABLE `Users` (
  `User_ID` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `User_Status` int NOT NULL,
  `User_Type` int NOT NULL,
  `F_Name` varchar(45) DEFAULT NULL,
  `L_Name` varchar(45) DEFAULT NULL,
  `Points` int DEFAULT NULL,
  `Cart` json DEFAULT NULL,
  PRIMARY KEY (`User_ID`)
)

