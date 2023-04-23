CREATE TABLE `Orders` (
  `Order_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` varchar(45) NOT NULL,
  `Point_Change_ID` int DEFAULT NULL,
  `Order_Status` int DEFAULT NULL,
  `Product` varchar(45) DEFAULT NULL,
  `Order_Time` datetime DEFAULT NULL,
  PRIMARY KEY (`Order_ID`),
  KEY `fk_order_user_id_idx` (`User_ID`),
  KEY `fk_orders_points_id_idx` (`Point_Change_ID`),
  CONSTRAINT `fk_order_user_id` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`User_ID`),
  CONSTRAINT `fk_orders_points_id` FOREIGN KEY (`Point_Change_ID`) REFERENCES `PointChanges` (`Point_Change_ID`)
)