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
-- Table structure for table `menu_do_dia`
--

DROP TABLE IF EXISTS `menu_do_dia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_do_dia` (
  `Dia` varchar(60) NOT NULL,
  `idPrato` int(11) NOT NULL,
  `idRestaurante` int(11) NOT NULL,
  PRIMARY KEY (`Dia`,`idPrato`,`idRestaurante`),
  KEY `fk_Prato_MenuDoDia_idx` (`idPrato`),
  KEY `fk_Restaurante_MenuDoDia_idx` (`idRestaurante`),
  CONSTRAINT `fk_Prato_MenuDoDia` FOREIGN KEY (`idPrato`) REFERENCES `prato` (`idPrato`),
  CONSTRAINT `fk_Restaurante_MenuDoDia` FOREIGN KEY (`idRestaurante`) REFERENCES `restaurante` (`idRestaurante`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_do_dia`
--

LOCK TABLES `menu_do_dia` WRITE;
/*!40000 ALTER TABLE `menu_do_dia` DISABLE KEYS */;
INSERT INTO `menu_do_dia` VALUES ('Domingo',0,0),('Quarta',0,0),('Quinta',0,0),('Sábado',0,0),('Segunda',0,0),('Sexta',0,0),('Terça',0,0),('Domingo',1,1),('Quarta',1,1),('Quinta',1,1),('Sábado',1,1),('Segunda',1,1),('Sexta',1,1),('Terça',1,1),('Domingo',2,2),('Quarta',2,2),('Quinta',2,2),('Sábado',2,2),('Segunda',2,2),('Sexta',2,2),('Terça',2,2),('Domingo',3,3),('Quarta',3,3),('Quinta',3,3),('Sábado',3,3),('Segunda',3,3),('Sexta',3,3),('Terça',3,3),('Domingo',4,4),('Quarta',4,4),('Quinta',4,4),('Sábado',4,4),('Segunda',4,4),('Sexta',4,4),('Terça',4,4),('Domingo',5,5),('Quarta',5,5),('Quinta',5,5),('Sábado',5,5),('Segunda',5,5),('Sexta',5,5),('Terça',5,5);
/*!40000 ALTER TABLE `menu_do_dia` ENABLE KEYS */;
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
