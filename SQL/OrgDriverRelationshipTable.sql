CREATE TABLE `OrgDriverRelationship` (
  `SD_Relationship_ID` int NOT NULL AUTO_INCREMENT,
  `Relationship_Status` int NOT NULL,
  `User_ID` varchar(45) NOT NULL,
  `Sponsor_Org_ID` int DEFAULT NULL,
  `Application_Time_Submitted` datetime DEFAULT NULL,
  `Application_Document` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`SD_Relationship_ID`),
  KEY `fk_user_id_relationship_idx` (`User_ID`),
  KEY `fk_org_id_relationship_idx` (`Sponsor_Org_ID`),
  CONSTRAINT `fk_org_id_relationship` FOREIGN KEY (`Sponsor_Org_ID`) REFERENCES `SponsorOrganizations` (`Sponsor_Org_ID`),
  CONSTRAINT `fk_user_id_relationship` FOREIGN KEY (`User_ID`) REFERENCES `Users` (`User_ID`)
)