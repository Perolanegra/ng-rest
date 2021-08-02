-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: ng_ba
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `ngCoins` bigint NOT NULL DEFAULT '5',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,1,5,'2021-03-21 15:22:43',NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue`
--

DROP TABLE IF EXISTS `issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `title` varchar(75) NOT NULL,
  `subtitle` varchar(150) NOT NULL,
  `author` varchar(25) NOT NULL,
  `stars` int NOT NULL DEFAULT '0',
  `pplVoted` int NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `tags` varchar(400) NOT NULL DEFAULT '',
  `tag_colors` varchar(455) NOT NULL DEFAULT '',
  `posts_number` int NOT NULL DEFAULT '1',
  `typeSurveyContent` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue`
--

LOCK TABLES `issue` WRITE;
/*!40000 ALTER TABLE `issue` DISABLE KEYS */;
INSERT INTO `issue` VALUES (1,1,'Can we just talk','Talk about where we going','perolanegra',0,0,0,'IMPLEMENTATION,REOPEN,ERROR','#22262e,#178ab4,#ff4444',1,0,'2021-03-21 15:40:22',NULL,NULL),(2,1,'I want it, i got it','I want it, i got it','perolanegra',0,0,0,'IMPLEMENTATION,CLOSED','#22262e,#a6a6a6',1,0,'2021-03-21 15:44:48',NULL,NULL),(3,1,'I want it, i got it','I want it, i got it','perolanegra',0,0,0,'IMPLEMENTATION,CLOSED','#22262e,#a6a6a6',1,0,'2021-03-21 15:45:02',NULL,NULL),(4,1,'I want it, i got it','I want it, i got it','perolanegra',0,0,0,'IMPLEMENTATION,CLOSED','#22262e,#a6a6a6',1,0,'2021-03-21 15:45:05',NULL,NULL),(5,1,'I want it, i got it','I want it, i got it','perolanegra',0,0,0,'IMPLEMENTATION,CLOSED','#22262e,#a6a6a6',1,0,'2021-03-21 15:45:05',NULL,NULL),(6,1,'I want it, i got it','I want it, i got it','perolanegra',0,0,0,'IMPLEMENTATION,CLOSED','#22262e,#a6a6a6',1,0,'2021-03-21 15:45:06',NULL,NULL),(7,1,'I want it, i got it','I want it, i got it','perolanegra',0,0,0,'IMPLEMENTATION,CLOSED','#22262e,#a6a6a6',1,0,'2021-03-21 15:45:12',NULL,NULL),(8,1,'Um novo Issue','Tstando o comportamento apos criar o Issue','perolanegra',0,0,0,'BUG,IMPLEMENTATION,QUESTION','crimson,#22262e,yellow',1,1,'2021-03-21 15:54:14',NULL,NULL),(9,1,'Titutlo GrandeTitutlo GrandeTitutlo GrandeTitutlo GrandeTitutlo GrandeTitut','SubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo Gra','perolanegra',0,0,0,'IMPLEMENTATION,CLOSED,ERROR','#22262e,#a6a6a6,#ff4444',1,0,'2021-03-21 18:37:13',NULL,NULL);
/*!40000 ALTER TABLE `issue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_poll`
--

DROP TABLE IF EXISTS `issue_poll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_poll` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_post` int NOT NULL,
  `id_issue` int NOT NULL,
  `closingDate` varchar(255) NOT NULL DEFAULT '',
  `closingTime` varchar(255) NOT NULL DEFAULT '',
  `hasMultipleChoice` tinyint NOT NULL DEFAULT '0',
  `displayWhoVoted` tinyint NOT NULL DEFAULT '0',
  `question` varchar(150) NOT NULL,
  `title` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_poll`
--

LOCK TABLES `issue_poll` WRITE;
/*!40000 ALTER TABLE `issue_poll` DISABLE KEYS */;
INSERT INTO `issue_poll` VALUES (1,8,8,'2021-03-31T00:00:00.000Z','5:00 AM',0,1,'Tá Batendo a aplicação?','Primeira Enquete ?','2021-03-21 15:54:14',NULL,NULL);
/*!40000 ALTER TABLE `issue_poll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_poll_response`
--

DROP TABLE IF EXISTS `issue_poll_response`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_poll_response` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_poll` int NOT NULL,
  `answer` varchar(250) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_poll_response`
--

LOCK TABLES `issue_poll_response` WRITE;
/*!40000 ALTER TABLE `issue_poll_response` DISABLE KEYS */;
INSERT INTO `issue_poll_response` VALUES (1,1,'Sim','2021-03-21 15:54:14',NULL,NULL),(2,1,'Nem','2021-03-21 15:54:14',NULL,NULL),(3,1,'Meio Pog mas taá tendo','2021-03-21 15:54:14',NULL,NULL);
/*!40000 ALTER TABLE `issue_poll_response` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_text_content`
--

DROP TABLE IF EXISTS `issue_text_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_text_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_post` int NOT NULL,
  `id_issue` int NOT NULL,
  `context` text NOT NULL,
  `enableNotifications` tinyint NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) NOT NULL DEFAULT '',
  `updated_at` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_text_content`
--

LOCK TABLES `issue_text_content` WRITE;
/*!40000 ALTER TABLE `issue_text_content` DISABLE KEYS */;
INSERT INTO `issue_text_content` VALUES (1,1,1,'<h2>Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...</h2>\n',1,'2021-03-21 15:40:22','',''),(2,2,2,'<h2>Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...</h2>\n',1,'2021-03-21 15:44:48','',''),(3,3,3,'<h2>Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...</h2>\n',1,'2021-03-21 15:45:02','',''),(4,4,4,'<h2>Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...</h2>\n',1,'2021-03-21 15:45:05','',''),(5,5,5,'<h2>Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...</h2>\n',1,'2021-03-21 15:45:05','',''),(6,6,6,'<h2>Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...</h2>\n',1,'2021-03-21 15:45:06','',''),(7,7,7,'<h2>Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...Descreva seu Issue...</h2>\n',1,'2021-03-21 15:45:12','',''),(8,9,9,'<h2>SubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo GrandeSubTitutlo Grande</h2>\n',0,'2021-03-21 18:37:13','','');
/*!40000 ALTER TABLE `issue_text_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_issue` int NOT NULL,
  `id_author` int NOT NULL,
  `author` varchar(255) NOT NULL,
  `stars` int NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) NOT NULL DEFAULT '',
  `updated_at` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,1,'perolanegra',0,'2021-03-21 15:40:22','',''),(2,2,1,'perolanegra',0,'2021-03-21 15:44:48','',''),(3,3,1,'perolanegra',0,'2021-03-21 15:45:02','',''),(4,4,1,'perolanegra',0,'2021-03-21 15:45:05','',''),(5,5,1,'perolanegra',0,'2021-03-21 15:45:05','',''),(6,6,1,'perolanegra',0,'2021-03-21 15:45:06','',''),(7,7,1,'perolanegra',0,'2021-03-21 15:45:12','',''),(8,8,1,'perolanegra',0,'2021-03-21 15:54:14','',''),(9,9,1,'perolanegra',0,'2021-03-21 18:37:13','','');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(125) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` varchar(255) DEFAULT NULL,
  `deleted_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','Permissão para administrar o sistema','2021-03-20 16:55:03',NULL,NULL),(2,'Noob','\'newbie\' kkkkk','2021-03-20 16:55:03',NULL,NULL),(3,'Moderador','Staff moderação. Gestão da escalabilidade e organização de dados.\nTais como poder de fechamentos, edições, e bloqueios de visualização de Issues que violem \na política do fórum, com base no bem estar de todos.','2021-03-20 16:55:03',NULL,NULL),(4,'Membro','Membro Comum','2021-03-20 16:55:03',NULL,NULL),(5,'Membro Antigo','Issues e posts são vistos com mais frequência.','2021-03-20 16:55:03',NULL,NULL),(6,'Criador','Posts mais vistos. Capacidade de criar roles e permissões,\ndentre outras features. Tags únicas. Maior taxa de recebimento de ngCoins.','2021-03-20 16:55:03',NULL,NULL),(7,'Ancião','É brother do Moderador, um Anciã(o) inclusive é um pré-mod. É aquele \nvelho(a) postador assíduo, que hoje mais gerencia junto com o seu respectivo mod.','2021-03-20 16:55:03',NULL,NULL),(8,'A Putinha do ADM','KKKKKKKK FAZ TUDO QUE O ADM MANDAR, MAS PODE TE BANIR KKKKKKKKK','2021-03-20 16:55:03',NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value` enum('BUG','IMPLEMENTATION','CLOSED','REOPEN','ERROR','RESOLVED','QUESTION','HOT','DEPRECATED') NOT NULL,
  `color` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d090e09fe86ebe2ec0aec27b45` (`value`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'BUG','crimson','2021-03-20 16:54:35','',''),(2,'IMPLEMENTATION','#22262e','2021-03-20 16:54:35','',''),(3,'CLOSED','#a6a6a6','2021-03-20 16:54:35','',''),(4,'REOPEN','#178ab4','2021-03-20 16:54:35','',''),(5,'ERROR','#ff4444','2021-03-20 16:54:35','',''),(6,'RESOLVED','#00C851','2021-03-20 16:54:35','',''),(7,'QUESTION','yellow','2021-03-20 16:54:35','',''),(8,'HOT','#cc6633','2021-03-20 16:54:35','',''),(9,'DEPRECATED','#ffbb33','2021-03-20 16:54:35','','');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `titles`
--

DROP TABLE IF EXISTS `titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `titles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `titles`
--

LOCK TABLES `titles` WRITE;
/*!40000 ALTER TABLE `titles` DISABLE KEYS */;
INSERT INTO `titles` VALUES (1,'MVP','Most Valuable Professional','2021-03-20 16:57:19',NULL,NULL),(2,'GDE','Google Developer Expert','2021-03-20 16:57:19',NULL,NULL);
/*!40000 ALTER TABLE `titles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `token` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwZXJvbGFuZWdyYSIsImlkX3JvbGUiOjIsIm5hbWUiOiJJZ29yIiwibGFzdE5hbWUiOiIiLCJzdGF0dXNNc2ciOiIiLCJkZGQiOiIiLCJwaG9uZSI6IiIsImVtYWlsIjoicGVkcmF0dG8zQGdtYWlsLmNvbSIsInBob3RvVVJMIjoiIiwiYmlydGhEYXRlIjoiIiwidHdpdHRlciI6IiIsImZhY2Vib29rIjoiIiwiaW5zdGFncmFtIjoiIiwic3RhcnMiOjAsImNyZWF0ZWRfYXQiOiIyMDIxLTAzLTIxVDE1OjIyOjQzLjAwMFoiLCJkZWxldGVkX2F0IjpudWxsLCJ1cGRhdGVkX2F0IjpudWxsLCJpYXQiOjE2MTYzNDAzNjMsImV4cCI6MTYxNjM2NTU2M30.ZVUt5Y1GX1-OQlKhO8Yi9MbthQVY1vu4e_du52gh-H0','2021-03-21 15:26:03',NULL,NULL),(2,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwZXJvbGFuZWdyYSIsImlkX3JvbGUiOjIsIm5hbWUiOiJJZ29yIiwibGFzdE5hbWUiOiIiLCJzdGF0dXNNc2ciOiIiLCJkZGQiOiIiLCJwaG9uZSI6IiIsImVtYWlsIjoicGVkcmF0dG8zQGdtYWlsLmNvbSIsInBob3RvVVJMIjoiIiwiYmlydGhEYXRlIjoiIiwidHdpdHRlciI6IiIsImZhY2Vib29rIjoiIiwiaW5zdGFncmFtIjoiIiwic3RhcnMiOjAsImNyZWF0ZWRfYXQiOiIyMDIxLTAzLTIxVDE1OjIyOjQzLjAwMFoiLCJkZWxldGVkX2F0IjpudWxsLCJ1cGRhdGVkX2F0IjpudWxsLCJpYXQiOjE2MTY3OTg4NTQsImV4cCI6MTYxNjgyNDA1NH0.txtMS2YJDxHYsZukFQ2i0RYBl08nUz68uzrql0TG6dM','2021-03-26 22:47:34',NULL,NULL),(3,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwZXJvbGFuZWdyYSIsImlkX3JvbGUiOjIsIm5hbWUiOiJJZ29yIiwibGFzdE5hbWUiOiIiLCJzdGF0dXNNc2ciOiIiLCJkZGQiOiIiLCJwaG9uZSI6IiIsImVtYWlsIjoicGVkcmF0dG8zQGdtYWlsLmNvbSIsInBob3RvVVJMIjoiIiwiYmlydGhEYXRlIjoiIiwidHdpdHRlciI6IiIsImZhY2Vib29rIjoiIiwiaW5zdGFncmFtIjoiIiwic3RhcnMiOjAsImNyZWF0ZWRfYXQiOiIyMDIxLTAzLTIxVDE1OjIyOjQzLjAwMFoiLCJkZWxldGVkX2F0IjpudWxsLCJ1cGRhdGVkX2F0IjpudWxsLCJpYXQiOjE2MTY4MDE3NDIsImV4cCI6MTYxNjgyNjk0Mn0.o4DNU6xGahBw2JZZKyNM9Uoq0aTN3MxUHA5VtwViq3U','2021-03-26 23:35:42',NULL,NULL),(4,1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwZXJvbGFuZWdyYSIsImlkX3JvbGUiOjIsIm5hbWUiOiJJZ29yIiwibGFzdE5hbWUiOiIiLCJzdGF0dXNNc2ciOiIiLCJkZGQiOiIiLCJwaG9uZSI6IiIsImVtYWlsIjoicGVkcmF0dG8zQGdtYWlsLmNvbSIsInBob3RvVVJMIjoiIiwiYmlydGhEYXRlIjoiIiwidHdpdHRlciI6IiIsImZhY2Vib29rIjoiIiwiaW5zdGFncmFtIjoiIiwic3RhcnMiOjAsImNyZWF0ZWRfYXQiOiIyMDIxLTAzLTIxVDE1OjIyOjQzLjAwMFoiLCJkZWxldGVkX2F0IjpudWxsLCJ1cGRhdGVkX2F0IjpudWxsLCJpYXQiOjE2MTY4NTM2NDcsImV4cCI6MTYxNjg3ODg0N30.8PjcSMJHdlGHF1fxuU6IzWv2k12DkXybrAjXD-ayURs','2021-03-27 14:00:47',NULL,NULL);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `id_role` int NOT NULL DEFAULT '2',
  `name` varchar(25) NOT NULL,
  `lastName` varchar(255) NOT NULL DEFAULT '',
  `statusMsg` varchar(255) NOT NULL DEFAULT '',
  `ddd` varchar(255) NOT NULL DEFAULT '',
  `phone` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `photoURL` varchar(255) NOT NULL DEFAULT '',
  `birthDate` varchar(255) NOT NULL DEFAULT '',
  `twitter` varchar(255) NOT NULL DEFAULT '',
  `facebook` varchar(255) NOT NULL DEFAULT '',
  `instagram` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  `stars` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'perolanegra','$2a$10$5Xu2AX8O5/0Pokn5lRlM1u38cOFR3tussvIdwraz3aFlbPC0bT266',2,'Igor','','','','','pedratto3@gmail.com','','','','','','2021-03-21 15:22:43',NULL,NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_titles`
--

DROP TABLE IF EXISTS `user_titles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_titles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_title` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_titles`
--

LOCK TABLES `user_titles` WRITE;
/*!40000 ALTER TABLE `user_titles` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_titles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-27 11:03:41
