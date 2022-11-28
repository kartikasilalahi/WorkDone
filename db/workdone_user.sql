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
  `idlevel` int NOT NULL,
  `jk` varchar(45) DEFAULT NULL,
  `tempat_lahir` varchar(45) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `no_hp` varchar(45) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `photo_profil` varchar(45) DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_1_idx` (`idrole`),
  KEY `fk_user_2_idx` (`idjabatan`),
  KEY `fk_user_3_idx` (`iddepartement`),
  KEY `fk_user_4_idx` (`idlevel`),
  CONSTRAINT `fk_user_1` FOREIGN KEY (`idrole`) REFERENCES `role` (`id`),
  CONSTRAINT `fk_user_2` FOREIGN KEY (`idjabatan`) REFERENCES `jabatan` (`id`),
  CONSTRAINT `fk_user_3` FOREIGN KEY (`iddepartement`) REFERENCES `departemen` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'admin@workdone.com','admin','Admin',NULL,1,1,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),(2,2,'kartika@mail.com','kartika','Kartika','Silalahi',11,2,2,'Perempuan','Indonesia','1997-01-16','09486348','Mampang Prapatan VI','2020-12-01',NULL,1),(3,2,'john@mail.com','johny','John','Mayer',12,2,1,'Laki-laki','Jakarta','1986-05-20','0934734','Grogol','2018-01-05',NULL,1),(4,2,'chris@mail.com','cris','cris','morgan',13,2,2,'Laki-laki','Bogor','1993-04-05','89400954','Bekasi','2018-02-01',NULL,1),(5,2,'dian','dian@mail.com','Dian',NULL,11,4,2,'Perempuan','Bandung','1996-09-20','093427642','Jakarta','2021-04-01',NULL,1),(6,2,'alfan@mail.com','alfan','Alfan','Batista',17,3,2,'Laki=laki','Malang','1996-10-10','009877853','Setiabudi, Jakarta Selatan','2020-07-01',NULL,1),(7,2,'ads@mail.com','12345','asj','asjshk',18,1,1,'Laki-laki','','1990-10-10','089675684','','2021-10-10',NULL,1),(8,2,'niko@mail.com','12345','Niko','Sihite',1,1,1,'Laki-laki','','1996-10-30','09876546345354','','2020-10-10',NULL,1),(9,2,'a@mail.com','123','as','as',19,1,1,'Perempuan','','1990-01-01','0876757657','sjhdkkkkkkkkkkkkk','2020-10-10',NULL,1),(10,2,'tes@gmail.com','123456','tes','tes',16,2,1,'Laki-laki','','1981-12-31','12344577','jakarta','2022-01-01',NULL,3),(11,2,'new@mail.com','123456','New User','New',15,2,1,'Laki-laki','','1987-01-28','12345677','Jakarta','2022-01-20',NULL,1);
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

-- Dump completed on 2022-11-28 12:04:48
