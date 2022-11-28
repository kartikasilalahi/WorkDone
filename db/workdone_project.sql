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
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(50) NOT NULL,
  `departemen_id` int NOT NULL,
  `project_description` longtext,
  PRIMARY KEY (`id`),
  KEY `fk_project_1_idx` (`departemen_id`),
  CONSTRAINT `fk_project_1` FOREIGN KEY (`departemen_id`) REFERENCES `departemen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,'web eventories',2,'Eventories.com adalah layanan yang disediakan, dikelola dan dimiliki oleh PT. Exel Integrasi Solusindo untuk Anda Event creator/organizer berupa penyediaan platform untuk menunjang Event yang memberikan kemudahan dengan penggunaan teknologi untuk Event creator/organizer guna membuat, memasarkan, menjual, dan/atau mendistribusikan Event secara mandiri, dimana layanan tersebut dapat berubah dari waktu ke waktu berdasarkan kebijakan kami sendiri.'),(2,'media publisher',2,NULL),(3,'Mediacartz',2,'Mediacartz adalah layanan otomatisasi periklanan yang membantu Anda untuk mengelola kampanye iklan Anda dengan mudah dan efektif. Anda dapat menetapkan target market sesuai kebutuhan, seperti lokasi, tempat tinggal, usia, jenis kelamin, dan pendapatan mereka hingga mengatur kapan iklan tersebut tayang secara bersamaan maupun berkala.'),(4,'Test New Project',2,'<p><strong>Tes New Project</strong></p><p>ini tes new project, dubat hari ininih, semoga berhasil ya!!!!</p><p><br></p><p><strong><u>anggota:</u></strong></p><p><em>kartika as front end developer</em></p><p><em>dian as ui/ux designer</em></p><p><em>alfan as QA tester</em></p><p><em>cris as back end developer</em></p>');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
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
