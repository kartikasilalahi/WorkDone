CREATE DATABASE  IF NOT EXISTS `workdone` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `workdone`;
-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
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
-- Table structure for table `departemen`
--

DROP TABLE IF EXISTS `departemen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departemen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `idatasan` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departemen`
--

LOCK TABLES `departemen` WRITE;
/*!40000 ALTER TABLE `departemen` DISABLE KEYS */;
INSERT INTO `departemen` VALUES (1,'HR & Finance',0),(2,'IT & Product ',3),(3,'Sales & Operation',0),(4,'Partnership & PMO',0);
/*!40000 ALTER TABLE `departemen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jabatan`
--

DROP TABLE IF EXISTS `jabatan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jabatan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `departemen_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jabatan`
--

LOCK TABLES `jabatan` WRITE;
/*!40000 ALTER TABLE `jabatan` DISABLE KEYS */;
INSERT INTO `jabatan` VALUES (1,'Admin',1),(11,'Frontend Developer',2),(12,'Backend Developer',2),(13,'Fullstack Developer',2),(14,'R&D Lead',2),(15,'Mobile Developer',2),(16,'UI/UX Designer',2),(17,'Quality Assurance',2),(18,'HR Legal',1),(19,'Assisten Personal Director',1);
/*!40000 ALTER TABLE `jabatan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `level`
--

DROP TABLE IF EXISTS `level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `level` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `level`
--

LOCK TABLES `level` WRITE;
/*!40000 ALTER TABLE `level` DISABLE KEYS */;
INSERT INTO `level` VALUES (1,'atasan'),(2,'bawahan');
/*!40000 ALTER TABLE `level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(50) NOT NULL,
  `departemen_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'web eventories',1),(2,'media publisher',1),(3,'Mediacartz',1);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_team`
--

DROP TABLE IF EXISTS `project_team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_team` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_team`
--

LOCK TABLES `project_team` WRITE;
/*!40000 ALTER TABLE `project_team` DISABLE KEYS */;
INSERT INTO `project_team` VALUES (1,1,2),(2,1,6),(3,1,3),(4,2,4),(5,2,6),(6,2,3);
/*!40000 ALTER TABLE `project_team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_user`
--

DROP TABLE IF EXISTS `project_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_user`
--

LOCK TABLES `project_user` WRITE;
/*!40000 ALTER TABLE `project_user` DISABLE KEYS */;
INSERT INTO `project_user` VALUES (1,1,2),(2,2,2),(3,3,2),(4,2,4),(5,1,6);
/*!40000 ALTER TABLE `project_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'slicing login page',1,2,2,'2021-01-19 08:14:07','2021-01-20 08:14:07','2021-01-30 08:14:07',NULL,NULL,'gh','DONE','<p>bjkjk</p>','3',0),(2,'integrate api login',1,2,2,'2021-11-04 10:00:00','2021-11-04 10:00:00','2021-11-10 10:00:00',NULL,NULL,'hu','IN PROGRESS','<p>bjkjk</p>','3',0),(3,'add loading component',2,2,2,'2021-11-10 10:00:00','2021-11-12 10:00:00','2021-11-14 10:00:00',NULL,NULL,'hu','DECLINE','<p>bjkjk</p>','4',0),(4,'add api get project list',2,2,2,'2021-11-09 10:00:00','2021-11-09 10:00:00','2021-11-10 10:00:00',NULL,NULL,'gh','REVIEW','<p>bjkjk</p>','4',0),(5,'as',3,2,2,'2021-11-14 10:18:59','2021-11-14 00:00:00','2021-11-14 00:00:00',NULL,NULL,'Medium','IN PROGRESS','<p>bjkjk</p>','3',0),(6,'as',3,2,2,'2021-11-14 10:27:31','2021-11-14 00:00:00','2021-11-14 00:00:00',NULL,NULL,'Low','REVIEW','<p>asdddddddddddd</p>','3',1),(7,'Task new',1,4,3,'2021-11-14 10:47:23','2021-11-14 00:00:00','2021-11-14 00:00:00',NULL,NULL,'Medium','IN PROGRESS','<p>membuat task baru </p><ul><li>sjs</li></ul>','5',1),(8,'S',1,2,2,'2021-11-14 10:59:51','2021-11-14 00:00:00','2021-11-14 00:00:00',NULL,NULL,'Low','TO DO','<p>ss</p><p>sdko</p><p>sd</p>','3',0),(9,'kartika',1,2,2,'2021-11-14 11:02:48','2021-11-14 00:00:00','2021-11-14 00:00:00',NULL,NULL,'Difficult','IN PROGRESS','<p>sd</p>','2',1),(10,'implement react quill',1,2,2,'2021-11-14 22:12:10','2021-11-14 00:00:00','2021-11-14 00:00:00',NULL,NULL,'Low','IN PROGRESS','<ol><li>aser</li><li>ddcd</li></ol>','6',0),(11,'asdeesaaaaaaaaaaaaaaaaas',2,2,2,'2021-11-14 22:24:28','2021-11-14 00:00:00','2021-11-14 00:00:00',NULL,NULL,'Difficult','TO DO','<p>ashGD EUWQY jskaaaaaaaaaaaasah. n</p><p>asjiasioji</p>','3',1),(12,'s',2,2,2,'2021-11-14 22:26:19','2021-11-14 22:25:41','2021-11-15 22:25:41',NULL,NULL,'Medium','TO DO','<p>s</p>','2',0),(13,'as',3,2,2,'2021-11-14 22:27:26','2021-11-14 22:25:41','2021-11-15 22:25:41',NULL,NULL,'Difficult','TO DO','<p>sa</p>','2',1),(14,'asassssssssa',3,2,2,'2021-11-14 22:28:11','2021-11-14 22:25:41','2021-11-15 22:25:41',NULL,NULL,'Low','TO DO','<p>asa</p>','2',1),(15,'add chart to dahboard page',2,2,2,'2021-11-15 22:03:11','2021-11-16 21:48:06','2021-11-22 21:48:06',NULL,NULL,'Medium','TO DO','<p>chart color description:</p><ul><li>done green,</li><li>rejected red,</li><li>to do gray</li></ul>','3',1);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task_user`
--

DROP TABLE IF EXISTS `task_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `task_id` int NOT NULL,
  `user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_user`
--

LOCK TABLES `task_user` WRITE;
/*!40000 ALTER TABLE `task_user` DISABLE KEYS */;
INSERT INTO `task_user` VALUES (1,1,'2'),(2,2,'2'),(3,3,'2'),(4,4,'2'),(5,5,'2'),(6,6,'2'),(7,7,'4'),(8,8,'2'),(9,9,'2'),(10,10,'2'),(11,11,'2'),(12,12,'2'),(13,13,'2'),(14,14,'2'),(15,15,'2');
/*!40000 ALTER TABLE `task_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idrole` int NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `nama_depan` varchar(45) NOT NULL,
  `nama_belakang` varchar(45) DEFAULT NULL,
  `idjabatan` int NOT NULL,
  `iddepartement` int NOT NULL,
  `idlevel` int DEFAULT NULL,
  `jk` varchar(45) DEFAULT NULL,
  `tempat_lahir` varchar(45) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `no_hp` varchar(45) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `photo_profil` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'admin@workdone.com','Admin12345','Admin',NULL,1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2,2,'kartika@mail.com','kartika','Kartika','Silalahi',11,2,2,'Laki-laki','Indonesia','1997-01-16','09486348','Mampang Prapatan VI','2020-12-01',NULL),(3,2,'john@mail.com','john','John','Mayer',12,2,1,'Perempuan','Jakarta','1986-05-20','0934734','Grogol','2018-01-05',NULL),(4,2,'chris@mail.com','cris','cris','morgan',13,2,2,'Laki-laki','Bogor','1993-04-05','89400954','Bekasi','2018-02-01',NULL),(5,2,'dian','dian@mail.com','Dian',NULL,11,2,2,'Perempuan','Bandung','1996-09-20','093427642','Jakarta','2021-04-01',NULL),(6,2,'alfan@mail.com','alfan','Alfan','Batista',17,2,2,'Laki=laki','Malang','1996-10-10','009877853','Setiabudi, Jakarta Selatan','2020-07-01',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-17 15:35:10
