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
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data` longtext NOT NULL,
  `iddepartemen` int NOT NULL,
  `iduser` int NOT NULL,
  `datetime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_report_1_idx` (`iddepartemen`),
  KEY `fk_report_2_idx` (`iduser`),
  CONSTRAINT `fk_report_1` FOREIGN KEY (`iddepartemen`) REFERENCES `departemen` (`id`),
  CONSTRAINT `fk_report_2` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,'<ul><li><em>Data flow diagram&nbsp;</em>atau DFD adalah sistem diagram alir data yang dibuat untuk membantu perancangan perangkat lunak untuk kebutuhan personal, bisnis, maupun organisasi.</li><li>Terdapat empat macam notasi diagram yang digunakan, yaitu&nbsp;<em>data store, data flow, process,</em>&nbsp;dan&nbsp;<em>external entity.</em></li><li>Untuk jenis dari DFD sendiri terdiri atas tiga jenis, yaitu diagram level 0 (konteks), level 1, dan level 2.</li><li>Untuk membuat diagram alir data yang baik, anda perlu untuk menambahkan&nbsp;<em>data store&nbsp;</em>dan mendefinisikan jumlah&nbsp;<em>input&nbsp;</em>dan&nbsp;<em>output</em>&nbsp;secara eksplisit dengan proses relasi yang sesuai dengan kebutuhan produk anda.</li></ul><p><br></p>',2,2,'2021-11-22 16:24:54'),(2,'<p>tesssssssssss</p>',2,2,'2021-11-22 16:28:03'),(3,'<p>asddd</p>',2,2,'2021-11-22 16:30:00'),(4,'<p><strong>Weekly Report W3 November 2021</strong></p><ol><li>integrate api get token</li><li>slicing notification component</li><li>show notif if today is friday</li></ol>',2,2,'2021-11-22 17:13:19'),(5,'',2,2,'2022-01-19 08:28:43');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-28 12:04:49
