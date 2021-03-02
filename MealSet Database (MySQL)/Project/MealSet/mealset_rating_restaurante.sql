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
-- Table structure for table `rating_restaurante`
--

DROP TABLE IF EXISTS `rating_restaurante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating_restaurante` (
  `Restaurante_idRestaurante` int(11) NOT NULL,
  `Cliente_idCliente` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `Comentário` varchar(300) NOT NULL,
  `data_hora` datetime NOT NULL,
  PRIMARY KEY (`Restaurante_idRestaurante`,`Cliente_idCliente`),
  KEY `fk_Rating_Restaurante_Restaurante1_idx` (`Restaurante_idRestaurante`),
  KEY `fk_Rating_Restaurante_Cliente1_idx` (`Cliente_idCliente`),
  CONSTRAINT `fk_Rating_Restaurante_Cliente1` FOREIGN KEY (`Cliente_idCliente`) REFERENCES `cliente` (`idCliente`),
  CONSTRAINT `fk_Rating_Restaurante_Restaurante1` FOREIGN KEY (`Restaurante_idRestaurante`) REFERENCES `restaurante` (`idRestaurante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating_restaurante`
--

LOCK TABLES `rating_restaurante` WRITE;
/*!40000 ALTER TABLE `rating_restaurante` DISABLE KEYS */;
INSERT INTO `rating_restaurante` VALUES (0,0,3,'Mediocre','2020-01-24 18:09:00'),(1,1,4,'Quase muito bom','2020-01-20 08:30:00'),(2,2,5,'Uau, muito bom!','2019-10-12 12:00:00'),(3,0,1,'Horrível!','2018-09-08 14:00:00'),(4,1,2,'Só um bocadinho Horrível','2019-07-18 13:00:00'),(5,2,3,'Mais mediocre que o outro','2020-01-06 20:30:00');
/*!40000 ALTER TABLE `rating_restaurante` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-30 16:27:56
