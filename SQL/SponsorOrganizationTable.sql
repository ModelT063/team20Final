CREATE TABLE `SponsorOrganizations` (
  `Sponsor_Org_ID` int NOT NULL AUTO_INCREMENT,
  `Organization_Name` varchar(45) DEFAULT NULL,
  `Points_Ratio` decimal(3,2) DEFAULT NULL,
  `Address` varchar(45) DEFAULT NULL,
  `Organization_Status` int DEFAULT NULL,
  `Catalog_ID` int DEFAULT NULL,
  PRIMARY KEY (`Sponsor_Org_ID`),
  KEY `fk_sponsor_org_catalog_id_idx` (`Catalog_ID`),
  CONSTRAINT `fk_sponsor_org_catalog_id` FOREIGN KEY (`Catalog_ID`) REFERENCES `CatalogSettings` (`Catalog_ID`)
)