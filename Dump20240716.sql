-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: stock_manager
-- ------------------------------------------------------
-- Server version	8.0.38

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'sktt1kennet@gmail.com','321546','Hung','Le'),(2,'jack@gmail.com','123456','jack','san');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electric_categories`
--

LOCK TABLES `electric_categories` WRITE;
/*!40000 ALTER TABLE `electric_categories` DISABLE KEYS */;
INSERT INTO `electric_categories` VALUES (1,'Thiết bị hàn và lắp ráp',NULL),(2,'Thiết bị đo lường',NULL),(3,'Linh kiện điện tử',NULL);
/*!40000 ALTER TABLE `electric_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `electric_item_types`
--

DROP TABLE IF EXISTS `electric_item_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `electric_item_types` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `unit` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electric_item_types`
--

LOCK TABLES `electric_item_types` WRITE;
/*!40000 ALTER TABLE `electric_item_types` DISABLE KEYS */;
INSERT INTO `electric_item_types` VALUES (1,'máy hàn','lớn','cái','hàn'),(2,'điện trở','nhỏ','cái','hàn');
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
  `type` int DEFAULT NULL,
  `input_time` datetime DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `electric_items`
--

LOCK TABLES `electric_items` WRITE;
/*!40000 ALTER TABLE `electric_items` DISABLE KEYS */;
INSERT INTO `electric_items` VALUES (1,1,'2024-07-12 00:00:00',1,'mạch'),(2,2,'2024-07-10 00:00:00',3,'mạch'),(3,1,'2024-07-16 14:30:00',24,'Haiphong');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_types`
--

LOCK TABLES `item_types` WRITE;
/*!40000 ALTER TABLE `item_types` DISABLE KEYS */;
INSERT INTO `item_types` VALUES (1,'Công tắc đồng hồ pana',2,'cái','Công tắc bật tắt bóng đèn'),(2,'Ống nước dẻo 40m',1,'cái','Ống nước'),(3,'Main gigabite B360 Pro',2,'cái','Main máy tính'),(13,'Beagle bone',2,'cái',''),(14,'Mạch Điện',2,'cái',''),(15,'Cờ lê',6,'',''),(16,'Máy pha cà phê',1,'',''),(17,'Tủ lạnh',1,'','');
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
  `type` int DEFAULT NULL,
  `input_time` datetime DEFAULT NULL,
  `output_time` datetime DEFAULT NULL,
  `expiry_time` datetime DEFAULT NULL,
  `status` int DEFAULT NULL,
  `stock_id` int DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (33,2,'2021-09-01 00:00:00',NULL,'2021-09-02 00:00:00',1,1,'ống nước'),(34,13,'2024-07-08 00:00:00',NULL,NULL,3,1,'Beaglebone 1'),(44,3,'2024-07-16 00:00:00',NULL,NULL,1,1,''),(45,2,'2024-07-16 00:00:00',NULL,NULL,1,1,''),(46,1,'2024-07-16 00:00:00',NULL,NULL,1,1,''),(48,17,'2024-07-16 00:00:00',NULL,NULL,1,1,''),(54,14,'2024-07-16 00:00:00',NULL,NULL,1,1,''),(55,15,'2024-07-16 00:00:00',NULL,NULL,1,1,'');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
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
INSERT INTO `statuses` VALUES (1,'Mới',NULL),(2,'Đã sử dụng',NULL),(3,'Đang sử dụng',NULL),(4,'Cần thanh lý',NULL),(5,'Đã thanh lý','admin');
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
INSERT INTO `stocks` VALUES (1,'Kho lưu trữ',1,'adress kho 1',NULL),(2,'Đang dùng',2,'adress kho 2',NULL),(3,'Kho thanh lý',3,'address kho 3',NULL),(4,'Đã xuất kho (thanh lý)',4,'address kho đã thanh lý','admin');
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
  `permission` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT 'active',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'plusight1@gmail.com','stock.111','Van Quy','Nguyen','1','active'),(3,'sktt1kennet@gmail.com','DZ2CBd5rz2','Le','Hung','2','active'),(24,'hungcan1998965@gmail.com','123123123','Le','hoa','2','active'),(25,'nhathuy97ars@gmail.com','vDsoSxFxWK','Đoàn','Huy','1','active');
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

-- Dump completed on 2024-07-16 16:00:30
