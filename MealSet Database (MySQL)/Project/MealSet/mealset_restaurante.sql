-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mealset
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `restaurante`
--

DROP TABLE IF EXISTS `restaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurante` (
  `idRestaurante` int(11) NOT NULL,
  `nome` varchar(45) NOT NULL,
  `descrição` varchar(500) DEFAULT NULL,
  `estacionamento` tinyint(4) NOT NULL,
  `coverFoto` blob,
  `gps` varchar(300) DEFAULT NULL,
  `morada` varchar(300) DEFAULT NULL,
  `Codigo_postal` int(11) NOT NULL,
  PRIMARY KEY (`idRestaurante`,`Codigo_postal`),
  KEY `fk_Restaurante_Localidade1_idx` (`Codigo_postal`),
  CONSTRAINT `fk_Restaurante_Localidade1` FOREIGN KEY (`Codigo_postal`) REFERENCES `localidade` (`Codigo_postal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurante`
--

LOCK TABLES `restaurante` WRITE;
/*!40000 ALTER TABLE `restaurante` DISABLE KEYS */;
INSERT INTO `restaurante` VALUES (0,'Chimarrão','Chimarrão é mesmo bão',1,NULL,NULL,NULL,4480),(1,'Cascata','Cascata é mesmo barata',0,NULL,NULL,NULL,4480),(2,'Rochedo','Rochedo, sabe bem!',0,NULL,NULL,NULL,4480),(3,'Dona Maria','Dona Maria, comer lá quem não queria!',0,NULL,NULL,NULL,4480),(4,'ESHT','Tão bom como o nome sugere',0,NULL,NULL,NULL,4480),(5,'Su','Sempre Unidos',0,NULL,NULL,NULL,4480);
/*!40000 ALTER TABLE `restaurante` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-30 16:27:55
