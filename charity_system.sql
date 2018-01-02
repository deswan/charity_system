-- MySQL dump 10.13  Distrib 5.6.36, for osx10.12 (x86_64)
--
-- Host: localhost    Database: gdut_db_project
-- ------------------------------------------------------
-- Server version	5.6.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `start_time` date NOT NULL,
  `location` varchar(50) NOT NULL,
  `recipient_number` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `img` text,
  `create_time` datetime NOT NULL,
  `end_time` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,1,'name123','2017-12-19','4354ftdg',234,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFo2B79pY0K6tIgXEcKtPV73Ubaxb8XRZOmgW5iOH4hKK-j-U','2017-12-21 00:14:14','2017-12-30'),(2,1,'12222','2017-12-19','54',6,3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFo2B79pY0K6tIgXEcKtPV73Ubaxb8XRZOmgW5iOH4hKK-j-U','2017-12-29 00:14:17','2017-12-30'),(3,1,'333','2017-12-21','453543',423,3,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCFo2B79pY0K6tIgXEcKtPV73Ubaxb8XRZOmgW5iOH4hKK-j-U','2017-12-21 00:46:24','2017-12-30');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_tag`
--

DROP TABLE IF EXISTS `activity_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) DEFAULT NULL,
  `activity_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_tag`
--

LOCK TABLES `activity_tag` WRITE;
/*!40000 ALTER TABLE `activity_tag` DISABLE KEYS */;
INSERT INTO `activity_tag` VALUES (1,1,1),(2,2,1),(4,2,2),(5,1,3);
/*!40000 ALTER TABLE `activity_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization`
--

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `creater_volunteer_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `create_time` datetime NOT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `slogan` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization`
--

LOCK TABLES `organization` WRITE;
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
INSERT INTO `organization` VALUES (1,1,'aizhihua','2017-12-19 20:43:31','123','slogan123'),(2,2,'向日葵','2017-12-23 16:51:24','333','555');
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_tag`
--

DROP TABLE IF EXISTS `organization_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_tag`
--

LOCK TABLES `organization_tag` WRITE;
/*!40000 ALTER TABLE `organization_tag` DISABLE KEYS */;
INSERT INTO `organization_tag` VALUES (1,1,1),(2,1,2),(3,2,1);
/*!40000 ALTER TABLE `organization_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sponsor`
--

DROP TABLE IF EXISTS `sponsor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sponsor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `amount` decimal(11,2) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `name` varchar(50) NOT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sponsor`
--

LOCK TABLES `sponsor` WRITE;
/*!40000 ALTER TABLE `sponsor` DISABLE KEYS */;
INSERT INTO `sponsor` VALUES (1,1,'2017-12-30 23:02:56',10000.00,'18565352231','恒大集团','http://brandmark.io/logo-rank/random/beats.png',2);
/*!40000 ALTER TABLE `sponsor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tag_name_uindex` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'tag1'),(2,'tag2'),(3,'tag3');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer`
--

DROP TABLE IF EXISTS `volunteer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volunteer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `portrait` varchar(200) DEFAULT NULL,
  `resume` varchar(200) DEFAULT NULL,
  `id_card` varchar(50) NOT NULL,
  `gender` bit(1) NOT NULL,
  `native` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer`
--

LOCK TABLES `volunteer` WRITE;
/*!40000 ALTER TABLE `volunteer` DISABLE KEYS */;
INSERT INTO `volunteer` VALUES (1,'张三','1233','2017-12-07','3242345 ','231312','324423','23434','654654','\0',''),(2,'李四','432234','2017-12-08','45435','435534','53434543','54534','53445345','',''),(3,'123231','9f09c1b2346d79858f35e5446a3aee1f1df13b246d33fe143b1e11a51d933ee3','1996-10-17','2343434,','1231234@qq.com',NULL,NULL,'1231243','','aaa,bbb'),(4,'123231','c2724a86fcba0c110bf343eddf0fe4a88486b3cd3d9a97b40a33ca4c1182dabf','1996-10-17','2343434,','1231234@qq.com',NULL,NULL,'1231243','\0','aaa,bbb'),(5,'123231','c2724a86fcba0c110bf343eddf0fe4a88486b3cd3d9a97b40a33ca4c1182dabf','1996-10-17','2343434,','1231234@qq.com',NULL,NULL,'1231243','\0','aaa,bbb'),(6,'123231','21cdcfd3ad351c3196ce3802868f002cc2703cfb85edbbbf5b430ff65f030cac','1996-10-17','111111','1231234@qq.com',NULL,NULL,'1231243','','aaa,bbb'),(7,'123231','21cdcfd3ad351c3196ce3802868f002cc2703cfb85edbbbf5b430ff65f030cac','1996-10-17','111111','1231234@qq.com',NULL,NULL,'1231243','','aaa,bbb'),(8,'admin','81216cf9bb1c20272a28d07652524f4e26ac9c6a7d40395232070c38c4a31864','1996-10-17','111111','1231234@qq.com',NULL,NULL,'1231243','','aaa,bbb');
/*!40000 ALTER TABLE `volunteer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_activity`
--

DROP TABLE IF EXISTS `volunteer_activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volunteer_activity` (
  `volunteer_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `create_time` datetime NOT NULL,
  `application_text` text,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `comment` text,
  `score` tinyint(1) DEFAULT NULL,
  `photos` text,
  `score_time` datetime DEFAULT NULL,
  `isScored` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`volunteer_id`,`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_activity`
--

LOCK TABLES `volunteer_activity` WRITE;
/*!40000 ALTER TABLE `volunteer_activity` DISABLE KEYS */;
INSERT INTO `volunteer_activity` VALUES (1,3,'2017-12-23 14:29:19','sdaads',2,NULL,NULL,NULL,NULL,'\0'),(2,1,'2017-12-23 14:29:49','45345',2,NULL,1,'123,234',NULL,'\0'),(8,1,'2017-12-23 14:27:23','nihaoahahahah',2,'',2,'222,333,444',NULL,'\0'),(8,2,'2018-01-01 15:55:57','564456',2,'',NULL,NULL,NULL,'');
/*!40000 ALTER TABLE `volunteer_activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `volunteer_organization`
--

DROP TABLE IF EXISTS `volunteer_organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `volunteer_organization` (
  `volunteer_id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `join_time` datetime DEFAULT NULL,
  `application_text` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`volunteer_id`,`organization_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `volunteer_organization`
--

LOCK TABLES `volunteer_organization` WRITE;
/*!40000 ALTER TABLE `volunteer_organization` DISABLE KEYS */;
INSERT INTO `volunteer_organization` VALUES (1,1,'2017-12-23 15:54:52','我要加入',1,'2017-12-23 15:58:35'),(2,1,'2017-12-23 16:04:13','789',2,'2017-12-23 16:04:16'),(8,1,'2017-12-30 22:09:05','53466',2,'2017-12-30 22:09:10');
/*!40000 ALTER TABLE `volunteer_organization` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-03  0:02:01
