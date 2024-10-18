-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 10.11.25.76    Database: stock_manager
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.20.04.1

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`email`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'sktt1kennet@gmail.com','321546','Hung','Le'),(2,'jack','123456','jack','san'),(4,'admin','123456','pyramid','vn');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Thiết bị văn phòng','Thiết bị công ty'),(2,'Thiết bị điện tử','Đồ điện tử, mainboard, ...'),(6,'Thiết bị gia dụng','Đồ gia dụng');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electric_categories`
--

DROP TABLE IF EXISTS `electric_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electric_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electric_categories`
--

LOCK TABLES `electric_categories` WRITE;
/*!40000 ALTER TABLE `electric_categories` DISABLE KEYS */;
INSERT INTO `electric_categories` VALUES (1,'Thiết bị hàn và lắp ráp',NULL),(2,'Thiết bị đo lường',NULL),(3,'Linh kiện điện tử',NULL),(7,'Thiết bị nguồn',''),(8,'Thiết bị chuyển đổi',''),(9,'Thiết bị mạng','');
/*!40000 ALTER TABLE `electric_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electric_item_types`
--

DROP TABLE IF EXISTS `electric_item_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electric_item_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electric_item_types`
--

LOCK TABLES `electric_item_types` WRITE;
/*!40000 ALTER TABLE `electric_item_types` DISABLE KEYS */;
INSERT INTO `electric_item_types` VALUES (1,'Keithley','2','cái',''),(2,'Dây HDMI','8','cái',''),(3,'Router','9','cái',''),(4,'Beaglebone','3','cái',''),(5,'Đồng hồ vạn năng','2','cái','');
/*!40000 ALTER TABLE `electric_item_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electric_items`
--

DROP TABLE IF EXISTS `electric_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electric_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `input_time` datetime DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electric_items`
--

LOCK TABLES `electric_items` WRITE;
/*!40000 ALTER TABLE `electric_items` DISABLE KEYS */;
INSERT INTO `electric_items` VALUES (14,'123sdc','Router1',3,'2024-07-18 00:00:00',1,'Tủ 1',''),(15,'324sss','Đồng hồ 1',5,'2024-07-17 00:00:00',1,'Tủ 2',''),(24,'321aad','Beaglebone 1',4,'2024-07-20 00:00:00',10,'Tủ 3',''),(27,'234sss','Router 2',3,'2024-07-19 00:00:00',14,'Tủ 1',''),(28,'221sas','Đồng hồ 2',5,'2024-07-19 00:00:00',1,'Tủ 5',''),(36,'334sss','Keithley 2',1,'2024-07-19 00:00:00',1,'Tủ 10',''),(38,'789sss','Keithley 1',1,'2024-07-25 00:00:00',1,'Tủ 1',''),(39,'234mmm','Keithley 3',1,'2024-07-25 00:00:00',1,'Tủ 5',''),(41,'234qww','Đồng hồ 3',5,'2024-07-25 00:00:00',111,'Tủ 2','');
/*!40000 ALTER TABLE `electric_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_types`
--

DROP TABLE IF EXISTS `item_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `category` int NOT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_types`
--

LOCK TABLES `item_types` WRITE;
/*!40000 ALTER TABLE `item_types` DISABLE KEYS */;
INSERT INTO `item_types` VALUES (1,'TV',2,'cái',''),(3,'Rèm cửa',1,'cái',''),(13,'Camera',2,'cái',''),(15,'Máy pha cà phê',6,'cái',''),(17,'Tủ lạnh',6,'cái',''),(22,'Quạt',1,'cái',''),(23,'bếp gas',6,'cái','');
/*!40000 ALTER TABLE `item_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `stock_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `person_in_charge` varchar(45) DEFAULT NULL,
  `input_time` datetime DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `itemscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (34,'343212dgf','Camera 3Mp',13,3,1,1,'Huy','2024-07-08 00:00:00','Tầng 2',NULL),(56,'345687sss','TV sony',1,1,1,2,'Trân','2024-07-09 00:00:00','Phòng họp, loại Samsung',NULL),(57,'456756ssd','Máy pha cà phê Expreso',15,1,4,3,'Trân','2024-07-17 00:00:00','',NULL),(58,'123978aaa','Tủ lạnh Samsung',17,1,4,1,'Trân','2024-07-12 00:00:00','',NULL),(59,'354145vbn','Camera 2MP',13,1,4,2,'Ngân','2024-07-17 00:00:00','Tầng 1',NULL),(60,'444222sss','TV OLED',1,3,1,3,'Dung','2024-07-09 00:00:00','',NULL),(64,'123456abc','Gas mini',23,1,4,1,'Trân','2023-11-16 00:00:00','',NULL),(68,'234254tvv','TV 360',1,1,1,2,'Hòa','2024-07-23 00:00:00','',NULL),(72,'123123xxx','TV LCD',1,1,1,3,'Di','2024-07-24 00:00:00','',NULL),(74,'444522hhh','Quạt đứng',22,1,1,1,'Hợi','2024-07-17 00:00:00','',NULL),(75,'xxxx123','TV123',1,3,2,2,'ss','2024-10-18 00:00:00','',NULL);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mechanical_categories`
--

DROP TABLE IF EXISTS `mechanical_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mechanical_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mechanical_categories`
--

LOCK TABLES `mechanical_categories` WRITE;
/*!40000 ALTER TABLE `mechanical_categories` DISABLE KEYS */;
INSERT INTO `mechanical_categories` VALUES (1,'Cơ khí 1',''),(2,'Cơ khí 2','');
/*!40000 ALTER TABLE `mechanical_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mechanical_item_types`
--

DROP TABLE IF EXISTS `mechanical_item_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mechanical_item_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mechanical_item_types`
--

LOCK TABLES `mechanical_item_types` WRITE;
/*!40000 ALTER TABLE `mechanical_item_types` DISABLE KEYS */;
INSERT INTO `mechanical_item_types` VALUES (1,'Loại 1','1','',''),(2,'Loại 2','1','',''),(3,'Loại 3','2','','');
/*!40000 ALTER TABLE `mechanical_item_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mechanical_items`
--

DROP TABLE IF EXISTS `mechanical_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mechanical_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `input_time` datetime DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `position` varchar(100) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mechanical_items`
--

LOCK TABLES `mechanical_items` WRITE;
/*!40000 ALTER TABLE `mechanical_items` DISABLE KEYS */;
INSERT INTO `mechanical_items` VALUES (4,'123aaa','Cờ lê',1,'2024-07-18 00:00:00',10,'Tủ 1','1'),(5,'456ssd','Tua vít',1,'2024-07-26 00:00:00',15,'Tủ 2',''),(6,'345bbb','Kéo',2,'2024-07-17 00:00:00',1,'Tủ 3','');
/*!40000 ALTER TABLE `mechanical_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'Thủ kho'),(2,'Nhân viên sửa chữa');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_requests`
--

DROP TABLE IF EXISTS `staff_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `staff_id` int NOT NULL,
  `date_time` datetime DEFAULT NULL,
  `item_id` int NOT NULL,
  `detail` varchar(500) DEFAULT NULL,
  `current_status` int NOT NULL,
  `updated_status` int NOT NULL,
  `update_address` varchar(500) NOT NULL,
  `status` varchar(45) DEFAULT 'waiting',
  `current_stock` varchar(45) NOT NULL,
  `updated_stock` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_requests`
--

LOCK TABLES `staff_requests` WRITE;
/*!40000 ALTER TABLE `staff_requests` DISABLE KEYS */;
INSERT INTO `staff_requests` VALUES (1,1,'2021-01-01 00:00:00',1,'het han',1,2,'noi chuyen','approved','1','2'),(2,3,'2021-08-22 00:00:00',2,'xuat kho',1,3,'phong b01','approved','1','2'),(3,3,'2021-08-22 00:00:00',26,'',1,3,'Phong b6.12','approved','1','2'),(4,3,'2021-08-22 00:00:00',2,'chi tiet',1,5,'dia chi','approved','1','4'),(5,1,'2021-08-23 00:00:00',1,'hư hỏng',2,5,'cơ sở E','not_approved','2','4'),(6,1,'2024-07-10 00:00:00',34,'',3,2,'','not_approved','1','1'),(7,25,'2024-07-10 00:00:00',37,'',2,4,'','not_approved','1','');
/*!40000 ALTER TABLE `staff_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statuses`
--

DROP TABLE IF EXISTS `statuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statuses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `permission` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statuses`
--

LOCK TABLES `statuses` WRITE;
/*!40000 ALTER TABLE `statuses` DISABLE KEYS */;
INSERT INTO `statuses` VALUES (1,'Đang sử dụng',NULL),(2,'Dự phòng',NULL),(3,'Bảo trì',NULL),(4,'Bị hỏng',NULL);
/*!40000 ALTER TABLE `statuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock_types`
--

DROP TABLE IF EXISTS `stock_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock_types`
--

LOCK TABLES `stock_types` WRITE;
/*!40000 ALTER TABLE `stock_types` DISABLE KEYS */;
INSERT INTO `stock_types` VALUES (1,'Lưu trữ'),(2,'Đang dùng'),(3,'Thanh lý'),(4,'Đã thanh lý');
/*!40000 ALTER TABLE `stock_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `type` int NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `permission` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,'R&D',1,'adress kho 1',NULL),(2,'QA',2,'adress kho 2',NULL),(3,'Marketing',3,'address kho 3',NULL),(4,'Chung',4,'address kho đã thanh lý','admin');
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `stocks_id` int NOT NULL,
  `permission` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'nhathuy97ars@gmail.com','123456','Đoàn','Huy',3,'1','active'),(2,'hoale@gmail.com','123456','Lê','Hòa',2,'1','active'),(3,'trandao@gmail.com','123456','dao','tran',1,'1','active');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-18 17:42:34
