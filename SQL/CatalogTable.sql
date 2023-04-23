CREATE TABLE `CatalogSettings` (
  `Catalog_ID` int NOT NULL AUTO_INCREMENT,
  `Catalog_Name` varchar(45) DEFAULT NULL,
  `ITunes_Endpoint` json DEFAULT NULL,
  PRIMARY KEY (`Catalog_ID`)
)