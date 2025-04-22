-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: localhost    Database: dao_db_fortest
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'admin wallet address',
  `alias` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'admin alias name',
  `isActive` int DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `controls` int DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `creates` int DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `accounts` int DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `requests` int DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `DAOs` int DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `datetime` datetime NOT NULL COMMENT 'date and time log',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'0xbae9CC93f66D7789124b16f61cA547b29d49E409','Danny',1,1,1,1,1,1,'2023-01-13 10:17:12'),(2,'0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','Gio',1,1,1,1,1,1,'2023-01-13 11:36:51');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatars` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID''s',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Users wallet address',
  `contract` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT contract address',
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Vote contract address',
  `nft_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT ID',
  `nft_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT Name',
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Avatar image link or locations',
  `nft_uri` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT URI',
  `nft_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT description',
  `datetime` datetime NOT NULL COMMENT 'Date time avatar added',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `claimers`
--

DROP TABLE IF EXISTS `claimers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claimers` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'claimers wallet address',
  `inviter` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'inviters wallet address',
  `owner` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'dao owner',
  `editionDrop_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'edition drop address',
  `daoCreation_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'dao creation ID',
  `status` int DEFAULT NULL COMMENT 'claimers status | 1 = claimed / 0 =pending',
  `datetime` datetime DEFAULT NULL COMMENT 'date time log',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claimers`
--

LOCK TABLES `claimers` WRITE;
/*!40000 ALTER TABLE `claimers` DISABLE KEYS */;
INSERT INTO `claimers` VALUES (1,'0x1a3A4e2754Bea7CaD5843790121589FE3b917D20',NULL,'0x844f66cA390CE21F40FE00bCe4777e4672Df2F18','0x0871d9F285bffb74E67D8aC73597602F811D4a22','1',1,'2023-01-13 05:16:41'),(2,'0x1a3A4e2754Bea7CaD5843790121589FE3b917D20',NULL,'0x844f66cA390CE21F40FE00bCe4777e4672Df2F18','0x19fac8Bf550B2D8086a84BDdc0369f48d13E15FB','2',1,'2023-01-13 05:23:49'),(3,'0xbae9CC93f66D7789124b16f61cA547b29d49E409',NULL,'0xbae9CC93f66D7789124b16f61cA547b29d49E409','0xE043a885c7C37E8F3aeCC5d904769b44718529DB','4',1,'2023-01-23 06:23:50'),(4,'0xbae9CC93f66D7789124b16f61cA547b29d49E409',NULL,'0x844f66cA390CE21F40FE00bCe4777e4672Df2F18','0x0871d9F285bffb74E67D8aC73597602F811D4a22','1',1,'2025-04-22 18:41:58');
/*!40000 ALTER TABLE `claimers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `proposal_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'the proposal ID',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'user comments',
  `user_wallet_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'user wallet address',
  `status` int NOT NULL COMMENT '0 active / 1 deleted',
  `isEdited` int NOT NULL COMMENT '0 = Non Edited / 1 = Edited',
  `datetime` datetime DEFAULT NULL COMMENT 'Date and Time the comment created',
  `datetime_edited` datetime DEFAULT NULL COMMENT 'Date and Time when the comment was edited',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments_updated`
--

DROP TABLE IF EXISTS `comments_updated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments_updated` (
  `id` int NOT NULL COMMENT 'unique ID for this comment log',
  `proposal_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'the proposal ID',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'user comments',
  `user_wallet_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'user wallet address',
  `status` int NOT NULL COMMENT '0 active / 1 deleted',
  `isEdited` int NOT NULL COMMENT '0 = Non Edited / 1 = Edited',
  `datetime` datetime DEFAULT NULL COMMENT 'Date and Time the comment created',
  `datetime_edited` datetime DEFAULT NULL COMMENT 'Date and Time when the comment was edited'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments_updated`
--

LOCK TABLES `comments_updated` WRITE;
/*!40000 ALTER TABLE `comments_updated` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments_updated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config`
--

DROP TABLE IF EXISTS `config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `config` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique IDs',
  `ImREAL_RPC` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ImREAL Quick Node',
  `ImREAL_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ImREAL business wallet address',
  `ImREAL_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'ImREAL Token Address',
  `ImREAL_claimVal` double(12,2) DEFAULT NULL COMMENT 'How much cost when cliaming an Entrance NFT',
  `ImREAL_execVal` double(12,2) DEFAULT NULL COMMENT 'How much cost when executing a proposal',
  `ImREAL_blocks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'This blocks is for "Token Transaction" histories',
  `execVal_status` int DEFAULT NULL COMMENT '1 = on / 0 = off',
  `key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Encryption key',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config`
--

LOCK TABLES `config` WRITE;
/*!40000 ALTER TABLE `config` DISABLE KEYS */;
INSERT INTO `config` VALUES (1,'https://polygon-mainnet.g.alchemy.com/v2/QsbKvF4d5B1qeTdHCwKzmRnob-17x2AD','0xbae9CC93f66D7789124b16f61cA547b29d49E409','0x1b13c33CF2E679AA38984Dc055C926Aff903c153',1.00,0.10,'50000000',1,'ae101919REAL');
/*!40000 ALTER TABLE `config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dao`
--

DROP TABLE IF EXISTS `dao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dao` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'owners wallet address',
  `privatekey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'PrivateKey',
  `editiondrop` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Edition Drop Contract Address',
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token Contract Address',
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Vote Contract Address',
  `dao_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'DAO name',
  `dao_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Dao image',
  `dao_link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'DAO link name',
  `link_created` datetime DEFAULT NULL COMMENT 'Link was created',
  `creation_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Dao creation ID',
  `progress` int NOT NULL COMMENT 'Created DAO Progress ',
  `datetime` datetime DEFAULT NULL COMMENT 'Date Time created',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dao`
--

LOCK TABLES `dao` WRITE;
/*!40000 ALTER TABLE `dao` DISABLE KEYS */;
INSERT INTO `dao` VALUES (1,'0x844f66cA390CE21F40FE00bCe4777e4672Df2F18','ea10191966f9db5a56e8c9031fa908995f9607963a029d811c553656e5101919','0x0871d9F285bffb74E67D8aC73597602F811D4a22','0xde6073aeBdBFb1eaDf727E907b9341BD44a88aA4','0xc04c3D530930A9e6Cd9e08AC217d5D1286a4c680','Bear','1669959001.png','W6iS5vtFNLCv7V5swf9X','2025-04-28 18:51:42','1',6,'2022-12-02 09:15:20'),(2,'0x844f66cA390CE21F40FE00bCe4777e4672Df2F18','ea1019196eefa62b111970be2e7e48417025c384084647d86b714c4979101919','0x19fac8Bf550B2D8086a84BDdc0369f48d13E15FB','0x46641667aB6d850234C45c34dA736dFD2206862B','0x4795340d50Fa3f85246C4dc2526a2263C39E36a7','Moon','1672648134.png','02c42MZAkEK7L32ntppl','2025-04-28 18:53:39','2',6,'2023-01-02 08:41:54'),(3,'0xbae9CC93f66D7789124b16f61cA547b29d49E409','ea101919577e1c448744586b904a314e493166b133d16109d449840cc4101919','0xE043a885c7C37E8F3aeCC5d904769b44718529DB','0xA040f8587D78116e19070E4CD1dFDf5de7a3D934','0x4024F33A40AA61867Fd8CA99910325af916C1a8B','Mothers and the Family Court','1674442527.png','P2OzU1HpLE2t4Xm8DvTg','2025-04-28 18:50:22','4',6,'2023-01-23 03:50:40');
/*!40000 ALTER TABLE `dao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dao_creation`
--

DROP TABLE IF EXISTS `dao_creation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dao_creation` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `sdk_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Initialized wallet from private key.',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'DAO owners wallet address.',
  `privatekey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Private key used when creating the DAO.',
  `drop_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Edition Drop Name.',
  `drop_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Edition Drop Description.',
  `drop_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Edition Drop Image name.',
  `nft_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT name',
  `nft_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT Description',
  `nft_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT Image name',
  `token_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token name',
  `token_symbol` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token symbol',
  `token_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token image its metadata',
  `token_amount` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token amount',
  `vote_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Vote Contract Name',
  `vote_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Vote image',
  `vote_delay` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Voting Delay',
  `vote_period` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Voting Period',
  `vote_quorum` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Voting Quorum',
  `token_threshhold` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token Threshhold',
  `token_transfer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token amount that will be transfered to the vote contract',
  `status` int NOT NULL COMMENT 'Creation of DAO status',
  `datetime` datetime DEFAULT NULL COMMENT 'Date and Time this DAO created',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dao_creation`
--

LOCK TABLES `dao_creation` WRITE;
/*!40000 ALTER TABLE `dao_creation` DISABLE KEYS */;
INSERT INTO `dao_creation` VALUES (1,'0x8F8189433CB44ec88c9539f29b3fAa8D0493eD0E','0x844f66cA390CE21F40FE00bCe4777e4672Df2F18','ea10191966f9db5a56e8c9031fa908995f9607963a029d811c553656e5101919','BEAR','This is a BEAR edition','1669958859.png','Wild','This NFT is exclusive only for BEAR DAO','1669958899.png','Bear Coin','BRC','1669958949.png','1000','Bear','1669959001.png','0','180','20','100','800',4,'2022-12-02 05:27:39'),(2,'0x3620E5D9bdFb8Da500208EF1fC7B5004D584453f','0x844f66cA390CE21F40FE00bCe4777e4672Df2F18','ea1019196eefa62b111970be2e7e48417025c384084647d86b714c4979101919','Moon Edition','This is a moon edition and it is exclusive only to Moon DAO.','1672647837.png','Lunar','This NFT represents as the \"LUNAR\" this NFT is exclusive only to Moon DAO','1672647949.png','Moon Coin','MNC','1672648057.png','1000','Moon','1672648134.png','0','180','20','100','800',4,'2023-01-02 08:23:58'),(3,'0x4463cB85a144BB92BFa97C50468D9a192445b80d','0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','ea101919f83033f12244505e6b3ba3735621e656783f3d552cc77dc521101919','Panda','This panda edition is exclusive only to Panda DAO','1673235542.png','Panda Key','Who hold this key has access to Panda DAO','1673235616.png','Panda Coin','PNDC','1673235645.png','1000','Panda','1673235726.png','0','180','18','100','820',5,'2023-01-09 03:39:03'),(4,'0xbC3fc79c59Ffd34e32a4FeE13a1260E9dd218322','0xbae9CC93f66D7789124b16f61cA547b29d49E409','ea101919577e1c448744586b904a314e493166b133d16109d449840cc4101919','Mothers and the Family Court','Mothers and the Family Court is a community of Mothers sharing experiences in the Family Court of Australia with members including Lawyers, Mediators, Councellors, Mentors  all collaborating with DAO members to help them navigate the quagmire that is Australian Family Law.  Providing information and access to community resources that foster a better understanding of the law.','1674441918.png','Mothers and the Family Court','Mothers and the Family Court is a community of Mothers sharing experiences in the Family Court of Australia with members including Lawyers, Mediators, Councellors, Mentors  all collaborating with DAO members to help them navigate the quagmire that is Australian Family Law.  Providing information and access to community resources that foster a better understanding of the law.','1674441956.png','Mothers and the','MIRL','1674442024.png','100000','Mothers and the Family Court','1674442527.png','1000','604800','51','10','49000',4,'2023-01-23 02:45:18');
/*!40000 ALTER TABLE `dao_creation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dao_creation_deactivated`
--

DROP TABLE IF EXISTS `dao_creation_deactivated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dao_creation_deactivated` (
  `id` int NOT NULL COMMENT 'Unique ID',
  `sdk_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Initialized wallet from private key.',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'DAO owners wallet address.',
  `privatekey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Private key used when creating the DAO.',
  `drop_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Edition Drop Name.',
  `drop_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Edition Drop Description.',
  `drop_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Edition Drop Image name.',
  `nft_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT name',
  `nft_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT Description',
  `nft_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'NFT Image name',
  `token_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token name',
  `token_symbol` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token symbol',
  `token_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token image its metadata',
  `token_amount` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token amount',
  `vote_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Vote Contract Name',
  `vote_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Vote image',
  `vote_delay` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Voting Delay',
  `vote_period` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Voting Period',
  `vote_quorum` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Voting Quorum',
  `token_threshhold` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token Threshhold',
  `token_transfer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token amount that will be transfered to the vote contract',
  `status` int NOT NULL COMMENT 'Creation of DAO status',
  `datetime` datetime DEFAULT NULL COMMENT 'Date and Time this DAO created'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dao_creation_deactivated`
--

LOCK TABLES `dao_creation_deactivated` WRITE;
/*!40000 ALTER TABLE `dao_creation_deactivated` DISABLE KEYS */;
/*!40000 ALTER TABLE `dao_creation_deactivated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dao_deactivated`
--

DROP TABLE IF EXISTS `dao_deactivated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dao_deactivated` (
  `id` int NOT NULL COMMENT 'unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'owners wallet address',
  `privatekey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'PrivateKey',
  `editiondrop` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Edition Drop Contract Address',
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Token Contract Address',
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Vote Contract Address',
  `dao_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'DAO name',
  `dao_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Dao image',
  `dao_link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'DAO link name',
  `link_created` datetime DEFAULT NULL COMMENT 'Link was created',
  `creation_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Dao creation ID',
  `progress` int NOT NULL COMMENT 'Created DAO Progress ',
  `datetime` datetime DEFAULT NULL COMMENT 'Date Time created'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dao_deactivated`
--

LOCK TABLES `dao_deactivated` WRITE;
/*!40000 ALTER TABLE `dao_deactivated` DISABLE KEYS */;
/*!40000 ALTER TABLE `dao_deactivated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `members`
--

DROP TABLE IF EXISTS `members`;
/*!50001 DROP VIEW IF EXISTS `members`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `members` AS SELECT 
 1 AS `members`,
 1 AS `daoCreation_id`,
 1 AS `editionDrop_address`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `notif_kind` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'Notification kind',
  `notif_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'Notification name',
  `notif_for_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'Notification is for',
  `notif_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'Notification display image',
  `notif_short_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'Notification Short Message',
  `notif_long_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'Notification Long Message',
  `notif_link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci COMMENT 'Notification Link to',
  `notif_status` int NOT NULL COMMENT 'Notification status',
  `notif_created` datetime DEFAULT NULL COMMENT 'Notification created',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'test','Test Notification','0xbae9CC93f66D7789124b16f61cA547b29d49E409','','Short message','Long message','',1,'2025-04-21 17:58:46');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Users Wallet',
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Vote contract address',
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Users name',
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Avatar image link or location',
  `name_change_log` datetime DEFAULT NULL COMMENT 'Data time name changed',
  `avatar_change_log` datetime DEFAULT NULL COMMENT 'Data time avatar changed',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','0x4795340d50Fa3f85246C4dc2526a2263C39E36a7','D0enotME','/uploads/default/NotME.png','2023-01-14 05:24:34','2023-01-14 05:24:23'),(2,'0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','0xc04c3D530930A9e6Cd9e08AC217d5D1286a4c680','Gio','/uploads/default/NotME.png','2023-01-14 05:25:43','2023-01-14 05:25:35'),(3,'0xbae9CC93f66D7789124b16f61cA547b29d49E409','0x4024F33A40AA61867Fd8CA99910325af916C1a8B',NULL,'/uploads/default/NotME.png',NULL,'2023-01-26 03:17:04');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Uniques keys',
  `request_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Requesters wallet address',
  `request_dao_id` int DEFAULT NULL COMMENT 'The DAO ID',
  `request_creation_id` int DEFAULT NULL COMMENT 'The DAO Creation ID',
  `request_email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Requesters email address',
  `request_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'Requesters explaination message',
  `request_status` int DEFAULT NULL COMMENT 'Request status 1 = Read / 1 = Unread',
  `request_expiration` datetime DEFAULT NULL COMMENT 'Date Time with interval of 1 day.',
  `request_created` datetime DEFAULT NULL COMMENT 'Date and time this request created',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `views` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proposal_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `wallet_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `view` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `isMember` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '1 = true / 0 = false',
  `isHolder` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'holders token amount!',
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `views`
--

LOCK TABLES `views` WRITE;
/*!40000 ALTER TABLE `views` DISABLE KEYS */;
INSERT INTO `views` VALUES (1,'0x0cffce8b34ac9baee8e5443760e31e366526e56a0780d18a595ea6571a173ba5','0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','1','1','150.0','2023-01-13 05:26:15'),(2,'0x0cffce8b34ac9baee8e5443760e31e366526e56a0780d18a595ea6571a173ba5','0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','1','1','150.0','2023-01-15 03:40:39'),(3,'0x0cffce8b34ac9baee8e5443760e31e366526e56a0780d18a595ea6571a173ba5','0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','1','1','150.0','2023-01-16 06:03:19'),(4,'0x0cffce8b34ac9baee8e5443760e31e366526e56a0780d18a595ea6571a173ba5','0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','1','1','150.0','2023-01-20 10:20:42'),(5,'0x0cb8508aec5ea04e96f00ffa2e7e916cf9486239974e7c8ae42fd9340ca6a55b','0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','1','1','150.0','2023-01-20 10:22:18');
/*!40000 ALTER TABLE `views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `proposal_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `wallet_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `isMember` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '1 = true / 0 = false',
  `isHolder` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'holders token amount!',
  `datetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (1,'0x0cffce8b34ac9baee8e5443760e31e366526e56a0780d18a595ea6571a173ba5','0x1a3A4e2754Bea7CaD5843790121589FE3b917D20','1','1','150.0','2023-01-13 05:26:16');
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `members`
--

/*!50001 DROP VIEW IF EXISTS `members`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`imreal_user`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `members` AS select count(`claimers`.`id`) AS `members`,`claimers`.`daoCreation_id` AS `daoCreation_id`,`claimers`.`editionDrop_address` AS `editionDrop_address` from `claimers` group by `claimers`.`editionDrop_address`,`claimers`.`daoCreation_id` order by `members` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-22 18:46:04
