-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: workdone
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_name` varchar(45) NOT NULL,
  `project_id` int NOT NULL,
  `assignee` int NOT NULL,
  `created_by` int NOT NULL,
  `created_on` datetime NOT NULL,
  `start_datetime` datetime NOT NULL,
  `end_datetime` datetime DEFAULT NULL,
  `last_update` datetime DEFAULT NULL,
  `finish_datetime` datetime DEFAULT NULL,
  `level` varchar(45) DEFAULT NULL,
  `progress` varchar(45) NOT NULL,
  `description` longtext,
  `reviewer` varchar(45) DEFAULT NULL,
  `isread` int DEFAULT NULL,
  `isreadbyreviewer` int DEFAULT NULL,
  `priorityValue` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_task_1_idx` (`project_id`),
  KEY `fk_task_2_idx` (`assignee`),
  CONSTRAINT `fk_task_1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `fk_task_2` FOREIGN KEY (`assignee`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (52,'add login page',1,2,2,'2022-01-17 20:19:42','2022-01-18 08:00:00','2022-01-20 10:00:00','2022-01-18 08:25:20',NULL,'Medium','IN PROGRESS','<p><strong>acceptance criteria:</strong></p><ol><li>validation the correct email format</li><li>maximum 3 times failed to login</li><li>show a popup if the email or username is wrong</li></ol>','3',0,1,0.0000000049749),(53,'add Header Navigation',1,2,2,'2022-01-18 08:23:43','2022-01-18 08:21:56','2022-01-21 08:21:56','2022-11-28 11:17:03',NULL,'Low','IN PROGRESS','<p>add header navigation with 3 menus: home, profile, contact</p>','3',1,0,0.00000000192941),(54,'slicing Home Page',1,2,2,'2022-01-18 08:24:33','2022-01-19 08:23:44','2022-01-20 08:23:44','2022-01-19 14:29:51',NULL,'Low','IN PROGRESS','<p>slicing Home Page </p>','3',1,0,0.00000000385875),(55,'Disabled clevertaps',1,2,3,'2022-01-18 17:46:37','2022-01-19 17:45:28','2022-01-20 08:00:00','2022-01-19 14:36:00',NULL,'Low','DONE','<p>Disabled clevertap</p><p>testing</p>','3',1,0,0.00000000529453),(56,'implement API get Company',1,2,2,'2022-01-19 14:31:35','2022-01-20 14:28:06','2022-01-21 14:28:06','2022-01-19 14:37:09',NULL,'Medium','TO DO','<p>description:</p><p>implement API</p><p>asas</p>','3',1,0,0.00000000772228);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-28 12:04:48
