-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: votingsystem
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  `is_person` tinyint(1) NOT NULL,
  `clerkId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (1,'John Doe','Πρώτος υποψήφιος','https://via.placeholder.com/150',1,NULL),(2,'Admin User','Αυτόματος υποψήφιος','https://via.placeholder.com/150',1,'d14aedfb-a53a-4de3-920f-16929840c2b8'),(3,'Chain Scriptor','Αυτόματος υποψήφιος','https://via.placeholder.com/150',1,'user_2x0Iti5bjxpLXzeenSDane4OUIE'),(4,'admin@gmail.com','Αυτόματος υποψήφιος','https://via.placeholder.com/150',1,'user_2vzVTYVTtWqmxiO13mrneTPYd8i'),(5,'Στάθης Μαυρίδης','Αυτόματος υποψήφιος','https://via.placeholder.com/150',1,'user_2vUeNr8EuxC8Hzlok4Et4vxmYV0');
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `election`
--

DROP TABLE IF EXISTS `election`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `election` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(191) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `start_date` datetime(3) NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `target_occupation` varchar(191) DEFAULT NULL,
  `target_location` varchar(191) DEFAULT NULL,
  `birthdate_min` datetime(3) DEFAULT NULL,
  `birthdate_max` datetime(3) DEFAULT NULL,
  `target_gender` varchar(191) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Election_userId_fkey` (`userId`),
  CONSTRAINT `Election_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `election`
--

LOCK TABLES `election` WRITE;
/*!40000 ALTER TABLE `election` DISABLE KEYS */;
INSERT INTO `election` VALUES (1,'Demo Εκλογές','Αυτή είναι μια δοκιμαστική εκλογική διαδικασία','2025-01-01 00:00:00.000','2025-01-10 00:00:00.000',1,'Developer','Athens','1980-01-01 00:00:00.000','2005-01-01 00:00:00.000','male',1),(2,'Εκλογές Άνοιξης 2025','Ψηφοφορία για την επιλογή της καλύτερης άνοιξης δραστηριότητας','2025-04-15 00:00:00.000','2025-04-30 00:00:00.000',1,'Student','Thessaloniki','1998-01-01 00:00:00.000','2006-12-31 00:00:00.000','all',1),(4,'Δοκιμαστική Ψηφοφορία','Δοκιμαστική Ψηφοφορία','2025-05-26 00:00:00.000','2025-05-30 00:00:00.000',1,'developer','athens','2025-05-04 00:00:00.000','2025-05-31 00:00:00.000','male',1),(5,'Δευτερη Δοκιμαστική Ψηφοφορία ','Δευτερη Δοκιμαστική Ψηφοφορία ','2024-06-01 00:00:00.000','2024-10-15 00:00:00.000',1,'developer','athens','2025-04-28 00:00:00.000','2025-06-07 00:00:00.000','female',1),(9,'Δοκιμή3','Δοκιμή3','2025-05-27 00:00:00.000','2025-05-31 00:00:00.000',1,'salesperson','drama','2005-06-10 00:00:00.000','2007-10-09 00:00:00.000','male',1),(10,'ElectionΓιαΧρήστηchainscriptor','ElectionΓιαΧρήστηchainscriptor','2025-12-04 00:00:00.000','2025-05-31 00:00:00.000',1,'doctor','heraklion','1998-12-04 00:00:00.000','2025-05-31 00:00:00.000','female',1),(11,'ElectionΓιαΧρήστηchainscriptor2','ElectionΓιαΧρήστηchainscriptor2','1998-12-04 00:00:00.000','2025-05-31 00:00:00.000',1,'doctor','heraklion','1998-08-04 00:00:00.000','2025-05-31 00:00:00.000','female',1),(12,'ElectionΓιαΧρήστηΣτάθηΜαυρίδη','ElectionΓιαΧρήστηΣτάθηΜαυρίδη','2025-05-30 00:00:00.000','2025-06-07 00:00:00.000',1,'programmer','thessaloniki','1997-05-03 00:00:00.000','2025-05-31 00:00:00.000','male',1),(14,'Δοκιμή 16','dokimi16','2025-06-06 00:00:00.000','2025-06-21 00:00:00.000',1,'developer','Thessaloniki','2008-01-04 00:00:00.000','2018-05-05 00:00:00.000','male',1),(15,'ΨηφοφορίαΔημιουργούAdmin','ΨηφοφορίαΔημιουργούAdmin','1998-02-02 00:00:00.000','2005-02-02 00:00:00.000',1,'programmer','Athens','2025-06-04 00:00:00.000','2025-06-26 00:00:00.000','female',1),(21,'συνεδρειο γιατρων στο ηρακλειο','συνεδρειο γιατρων στο ηρακλειο','2025-05-06 00:00:00.000','2025-12-06 00:00:00.000',1,'doctor','Heraklion','1999-02-02 00:00:00.000','2021-02-02 00:00:00.000','female',1),(22,'Election2giaStathi','Electionl2giastathi','2025-06-05 00:00:00.000','2025-06-08 00:00:00.000',1,'programmer','thessaloniki','1998-08-04 00:00:00.000','2007-08-04 00:00:00.000','male',1),(23,'ElectionΓιαΧρήστηChainScriptor3','ElectionΓιαΧρήστηChainScriptor3','2025-06-05 00:00:00.000','2025-06-09 00:00:00.000',1,'doctor','heraklion','1998-02-03 00:00:00.000','2010-02-02 00:00:00.000','female',1),(24,'electionΓιαΧρήστηChainScriptor4','electionΓιαΧρήστηChainScriptor4','2025-06-05 00:00:00.000','2025-06-12 00:00:00.000',1,'doctor','heraklion','2024-01-05 00:00:00.000','2025-06-28 00:00:00.000','female',1);
/*!40000 ALTER TABLE `election` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll_candidates`
--

DROP TABLE IF EXISTS `poll_candidates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `poll_candidates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `poll_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `invited_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_poll` (`poll_id`),
  KEY `idx_user` (`user_id`),
  CONSTRAINT `fk_pc_poll` FOREIGN KEY (`poll_id`) REFERENCES `election` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_pc_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_candidates`
--

LOCK TABLES `poll_candidates` WRITE;
/*!40000 ALTER TABLE `poll_candidates` DISABLE KEYS */;
INSERT INTO `poll_candidates` VALUES (2,4,4,'2025-05-27 20:27:58'),(3,1,2,'2025-05-27 20:29:06'),(4,10,2,'2025-06-02 12:43:37'),(5,10,1,'2025-06-02 12:43:39'),(6,10,4,'2025-06-02 13:27:55'),(7,12,3,'2025-06-03 14:46:48'),(8,12,2,'2025-06-03 14:46:53'),(9,11,1,'2025-06-03 19:44:29'),(10,10,3,'2025-06-04 08:46:01'),(15,22,1,'2025-06-05 17:52:15'),(16,22,2,'2025-06-05 17:52:19'),(17,23,2,'2025-06-05 18:41:45'),(18,23,1,'2025-06-05 18:41:47'),(24,23,4,'2025-06-05 20:02:23'),(25,24,1,'2025-06-05 20:47:24'),(26,24,4,'2025-06-05 20:47:27'),(27,14,1,'2025-06-09 17:05:01');
/*!40000 ALTER TABLE `poll_candidates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `takepart`
--

DROP TABLE IF EXISTS `takepart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `takepart` (
  `electionId` int(11) NOT NULL,
  `candidateId` int(11) NOT NULL,
  `numberOfVotes` int(11) NOT NULL,
  PRIMARY KEY (`electionId`,`candidateId`),
  KEY `TakePart_candidateId_fkey` (`candidateId`),
  CONSTRAINT `TakePart_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `candidate` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `TakePart_electionId_fkey` FOREIGN KEY (`electionId`) REFERENCES `election` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `takepart`
--

LOCK TABLES `takepart` WRITE;
/*!40000 ALTER TABLE `takepart` DISABLE KEYS */;
INSERT INTO `takepart` VALUES (1,1,0),(2,1,0),(10,4,1),(10,5,3),(11,2,1),(12,3,1),(24,2,1),(24,5,1);
/*!40000 ALTER TABLE `takepart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `clerkId` varchar(191) NOT NULL,
  `fullName` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `gender` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `birthdate` datetime(3) DEFAULT NULL,
  `occupation` varchar(191) DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_clerkId_key` (`clerkId`),
  UNIQUE KEY `User_username_key` (`username`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'d14aedfb-a53a-4de3-920f-16929840c2b8','Admin User','admin3@gmail.com','admin123',1,'male','admin@example.com','1990-01-01 00:00:00.000','Developer','Athens'),(2,'user_2x0Iti5bjxpLXzeenSDane4OUIE','Chain Scriptor','cryptictiger39@gmail.com','CLERK_OAUTH',1,'female','cryptictiger39@gmail.com','2025-05-12 00:00:00.000','doctor','heraklion'),(3,'user_2vzVTYVTtWqmxiO13mrneTPYd8i','admin@gmail.com','admin@gmail.com','CLERK_OAU',0,NULL,'admin@gmail.com',NULL,NULL,NULL),(4,'user_2vUeNr8EuxC8Hzlok4Et4vxmYV0','Στάθης Μαυρίδης','sefeaamav@gmail.com','CLERK_OAUTH',0,'male','sefeaamav@gmail.com','1998-08-04 00:00:00.000','programmer','thessaloniki'),(5,'user_2yHIJNGoxcHoE9EdVa2RwXBzcng','','','',0,'female','','2025-05-11 00:00:00.000','doctor','heraklion');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `electionId` int(11) NOT NULL,
  `candidateId` int(11) NOT NULL,
  `votedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_per_election` (`userId`,`electionId`),
  KEY `fk_vote_election` (`electionId`),
  KEY `fk_vote_candidate` (`candidateId`),
  CONSTRAINT `fk_vote_candidate` FOREIGN KEY (`candidateId`) REFERENCES `candidate` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vote_election` FOREIGN KEY (`electionId`) REFERENCES `election` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_vote_user` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (1,2,10,5,'2025-06-03 14:30:27'),(12,2,11,2,'2025-06-03 20:06:27'),(13,4,12,3,'2025-06-03 20:09:25'),(14,2,24,2,'2025-06-09 14:11:46'),(15,5,24,5,'2025-06-09 16:55:56');
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 14:36:36
