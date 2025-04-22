/*
 Navicat Premium Data Transfer

 Source Server         : Dev1-Ubuntu(20.04)
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : 103.72.77.246:3306
 Source Schema         : dao_db_fortest

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 11/01/2023 17:22:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'admin wallet address',
  `alias` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'admin alias name',
  `isActive` int NULL DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `controls` int NULL DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `creates` int NULL DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `accounts` int NULL DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `requests` int NULL DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `DAOs` int NULL DEFAULT NULL COMMENT '0 is not active / 1 is active',
  `datetime` datetime NOT NULL COMMENT 'date and time log',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', NULL, 1, 1, 1, 1, 1, 1, '2022-12-07 10:17:12');
INSERT INTO `admin` VALUES (2, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', NULL, 1, 0, 0, 0, 1, 0, '2023-01-02 11:36:51');

-- ----------------------------
-- Table structure for avatars
-- ----------------------------
DROP TABLE IF EXISTS `avatars`;
CREATE TABLE `avatars`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID\'s',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Users wallet address',
  `contract` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT contract address',
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Vote contract address',
  `nft_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT ID',
  `nft_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT Name',
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Avatar image link or locations',
  `nft_uri` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT URI',
  `nft_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT description',
  `datetime` datetime NOT NULL COMMENT 'Date time avatar added',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of avatars
-- ----------------------------

-- ----------------------------
-- Table structure for claimers
-- ----------------------------
DROP TABLE IF EXISTS `claimers`;
CREATE TABLE `claimers`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'claimers wallet address',
  `inviter` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'inviters wallet address',
  `owner` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'dao owner',
  `editionDrop_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'edition drop address',
  `daoCreation_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'dao creation ID',
  `status` int NULL DEFAULT NULL COMMENT 'claimers status | 1 = claimed / 0 =pending',
  `datetime` datetime NULL DEFAULT NULL COMMENT 'date time log',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of claimers
-- ----------------------------
INSERT INTO `claimers` VALUES (1, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', NULL, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x0871d9F285bffb74E67D8aC73597602F811D4a22', '1', 1, '2022-12-12 09:48:46');
INSERT INTO `claimers` VALUES (2, '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x0871d9F285bffb74E67D8aC73597602F811D4a22', '1', 1, '2022-12-12 09:48:46');
INSERT INTO `claimers` VALUES (3, '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x0871d9F285bffb74E67D8aC73597602F811D4a22', '1', 1, '2022-12-12 09:48:46');
INSERT INTO `claimers` VALUES (4, '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x0871d9F285bffb74E67D8aC73597602F811D4a22', '1', 1, '2022-12-12 09:50:32');
INSERT INTO `claimers` VALUES (5, '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x0871d9F285bffb74E67D8aC73597602F811D4a22', '1', 1, '2023-01-10 03:04:46');
INSERT INTO `claimers` VALUES (6, '0x27f92da069B58Db42114Bdb13e1868FAB99d79fc', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x0871d9F285bffb74E67D8aC73597602F811D4a22', '1', 0, '2023-01-10 04:59:12');
INSERT INTO `claimers` VALUES (7, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', NULL, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x19fac8Bf550B2D8086a84BDdc0369f48d13E15FB', '2', 1, '2023-01-10 05:18:25');
INSERT INTO `claimers` VALUES (8, '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x19fac8Bf550B2D8086a84BDdc0369f48d13E15FB', '2', 1, '2023-01-10 07:04:49');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `proposal_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'the proposal ID',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'user comments',
  `user_wallet_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'user wallet address',
  `status` int NOT NULL COMMENT '0 active / 1 deleted',
  `isEdited` int NOT NULL COMMENT '0 = Non Edited / 1 = Edited',
  `datetime` datetime NULL DEFAULT NULL COMMENT 'Date and Time the comment created',
  `datetime_edited` datetime NULL DEFAULT NULL COMMENT 'Date and Time when the comment was edited',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', 'This is a test comment..', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', 0, 1, '2023-01-04 01:26:06', '2023-01-04 01:26:15');
INSERT INTO `comments` VALUES (2, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', 'to be deleted the comment.\n\n\nwhitespace', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', 1, 0, '2023-01-04 01:27:33', NULL);
INSERT INTO `comments` VALUES (3, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', 'LOl hahahahah', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-04 01:30:39', NULL);
INSERT INTO `comments` VALUES (4, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', 'This is another test comment', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', 0, 0, '2023-01-04 01:35:58', NULL);
INSERT INTO `comments` VALUES (5, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', 'This is a test comment with emoji\'s', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-09 04:21:54', NULL);
INSERT INTO `comments` VALUES (6, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1f600', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 1, 0, '2023-01-09 04:33:06', NULL);
INSERT INTO `comments` VALUES (7, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1f600', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 1, 0, '2023-01-09 04:34:07', NULL);
INSERT INTO `comments` VALUES (8, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1f600', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 1, 0, '2023-01-09 05:51:25', NULL);
INSERT INTO `comments` VALUES (9, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1f600', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 1, 0, '2023-01-09 08:21:41', NULL);
INSERT INTO `comments` VALUES (10, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1f600', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 1, 0, '2023-01-09 09:16:09', NULL);
INSERT INTO `comments` VALUES (11, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '😀👍😍😆☺️🥰😊😋😆😍😚👍😜😚', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-09 09:16:51', NULL);
INSERT INTO `comments` VALUES (12, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '😙🤔😋😅', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-09 10:24:53', NULL);
INSERT INTO `comments` VALUES (13, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '🏴‍☠️🏳️‍🌈👝👛👗🥻🩰👠📿', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-09 10:28:21', NULL);
INSERT INTO `comments` VALUES (14, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '😄😅🤣😆😆😇🥰🥰', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-09 10:54:07', NULL);
INSERT INTO `comments` VALUES (15, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '😀😁😂', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 1, '2023-01-09 11:17:49', '2023-01-09 11:42:30');
INSERT INTO `comments` VALUES (16, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '😉😊', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-09 11:48:19', NULL);
INSERT INTO `comments` VALUES (17, '0xfde10a7b99a7198faa6fc2983af1eedb8f92698d553a80cef6ad489303fea06a', 'This is a test comment with a notification.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 0, 0, '2023-01-11 05:01:13', NULL);
INSERT INTO `comments` VALUES (18, '0xfde10a7b99a7198faa6fc2983af1eedb8f92698d553a80cef6ad489303fea06a', 'hahahaha lol', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-11 05:01:39', NULL);
INSERT INTO `comments` VALUES (19, '0xfde10a7b99a7198faa6fc2983af1eedb8f92698d553a80cef6ad489303fea06a', 'yes and ist working. 👍🏻👍🏻👍🏻👍🏻😍', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 0, 0, '2023-01-11 05:02:21', NULL);
INSERT INTO `comments` VALUES (20, '0xfde10a7b99a7198faa6fc2983af1eedb8f92698d553a80cef6ad489303fea06a', 'nice one lol ❤️', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-11 05:03:23', NULL);

-- ----------------------------
-- Table structure for comments_updated
-- ----------------------------
DROP TABLE IF EXISTS `comments_updated`;
CREATE TABLE `comments_updated`  (
  `id` int NOT NULL COMMENT 'unique ID for this comment log',
  `proposal_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'the proposal ID',
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'user comments',
  `user_wallet_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT 'user wallet address',
  `status` int NOT NULL COMMENT '0 active / 1 deleted',
  `isEdited` int NOT NULL COMMENT '0 = Non Edited / 1 = Edited',
  `datetime` datetime NULL DEFAULT NULL COMMENT 'Date and Time the comment created',
  `datetime_edited` datetime NULL DEFAULT NULL COMMENT 'Date and Time when the comment was edited'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comments_updated
-- ----------------------------
INSERT INTO `comments_updated` VALUES (1, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', 'This is a test comment', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', 0, 0, '2023-01-04 01:26:06', NULL);
INSERT INTO `comments_updated` VALUES (15, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '👍😆😅😙😘😚☺️☺️☺️☺️', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 0, '2023-01-09 11:17:49', NULL);
INSERT INTO `comments_updated` VALUES (15, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '👍😆😅😙😘😚', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 1, '2023-01-09 11:17:49', '2023-01-09 11:18:48');
INSERT INTO `comments_updated` VALUES (15, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '👍🏻', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 1, '2023-01-09 11:17:49', '2023-01-09 11:32:27');
INSERT INTO `comments_updated` VALUES (15, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '👍🏻🚕🛺😉😊😋😀😁😃', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 0, 1, '2023-01-09 11:17:49', '2023-01-09 11:42:06');

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique IDs',
  `ImREAL_RPC` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'ImREAL Quick Node',
  `ImREAL_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'ImREAL business wallet address',
  `ImREAL_token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'ImREAL Token Address',
  `ImREAL_claimVal` double(12, 2) NULL DEFAULT NULL COMMENT 'How much cost when cliaming an Entrance NFT',
  `ImREAL_execVal` double(12, 2) NULL DEFAULT NULL COMMENT 'How much cost when executing a proposal',
  `ImREAL_blocks` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'This blocks is for \"Token Transaction\" histories',
  `execVal_status` int NULL DEFAULT NULL COMMENT '1 = on / 0 = off',
  `key` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Encryption key',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES (1, 'https://polygon-mainnet.g.alchemy.com/v2/QEUiH05sCWby8X74F8EDxOjsE1QACYN1', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '0x290EAa0822F63AabD861591Eaf50Cc31aa76b113', 1.00, 0.10, '50000000', 1, 'ae101919REAL');

-- ----------------------------
-- Table structure for dao
-- ----------------------------
DROP TABLE IF EXISTS `dao`;
CREATE TABLE `dao`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'owners wallet address',
  `privatekey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'PrivateKey',
  `editiondrop` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Edition Drop Contract Address',
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token Contract Address',
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Vote Contract Address',
  `dao_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'DAO name',
  `dao_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Dao image',
  `dao_link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'DAO link name',
  `link_created` datetime NULL DEFAULT NULL COMMENT 'Link was created',
  `creation_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Dao creation ID',
  `progress` int NOT NULL COMMENT 'Created DAO Progress ',
  `datetime` datetime NULL DEFAULT NULL COMMENT 'Date Time created',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dao
-- ----------------------------
INSERT INTO `dao` VALUES (1, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 'ea10191966f9db5a56e8c9031fa908995f9607963a029d811c553656e5101919', '0x0871d9F285bffb74E67D8aC73597602F811D4a22', '0xde6073aeBdBFb1eaDf727E907b9341BD44a88aA4', '0xc04c3D530930A9e6Cd9e08AC217d5D1286a4c680', 'Bear', '1669959001.png', '6376RvTGChxwJXx6QPj2', '2023-01-16 03:45:17', '1', 6, '2022-12-02 09:15:20');
INSERT INTO `dao` VALUES (2, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 'ea1019196eefa62b111970be2e7e48417025c384084647d86b714c4979101919', '0x19fac8Bf550B2D8086a84BDdc0369f48d13E15FB', '0x46641667aB6d850234C45c34dA736dFD2206862B', '0x4795340d50Fa3f85246C4dc2526a2263C39E36a7', 'Moon', '1672648134.png', '7dNaUcK629cy6wqH29V3', '2023-01-17 05:13:29', '2', 6, '2023-01-02 08:41:54');

-- ----------------------------
-- Table structure for dao_creation
-- ----------------------------
DROP TABLE IF EXISTS `dao_creation`;
CREATE TABLE `dao_creation`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `sdk_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Initialized wallet from private key.',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'DAO owners wallet address.',
  `privatekey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Private key used when creating the DAO.',
  `drop_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Edition Drop Name.',
  `drop_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Edition Drop Description.',
  `drop_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Edition Drop Image name.',
  `nft_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT name',
  `nft_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT Description',
  `nft_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT Image name',
  `token_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token name',
  `token_symbol` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token symbol',
  `token_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token image its metadata',
  `token_amount` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token amount',
  `vote_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Vote Contract Name',
  `vote_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Vote image',
  `vote_delay` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Voting Delay',
  `vote_period` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Voting Period',
  `vote_quorum` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Voting Quorum',
  `token_threshhold` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token Threshhold',
  `token_transfer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token amount that will be transfered to the vote contract',
  `status` int NOT NULL COMMENT 'Creation of DAO status',
  `datetime` datetime NULL DEFAULT NULL COMMENT 'Date and Time this DAO created',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dao_creation
-- ----------------------------
INSERT INTO `dao_creation` VALUES (1, '0x8F8189433CB44ec88c9539f29b3fAa8D0493eD0E', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 'ea10191966f9db5a56e8c9031fa908995f9607963a029d811c553656e5101919', 'BEAR', 'This is a BEAR edition', '1669958859.png', 'Wild', 'This NFT is exclusive only for BEAR DAO', '1669958899.png', 'Bear Coin', 'BRC', '1669958949.png', '1000', 'Bear', '1669959001.png', '0', '180', '20', '100', '800', 4, '2022-12-02 05:27:39');
INSERT INTO `dao_creation` VALUES (2, '0x3620E5D9bdFb8Da500208EF1fC7B5004D584453f', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 'ea1019196eefa62b111970be2e7e48417025c384084647d86b714c4979101919', 'Moon Edition', 'This is a moon edition and it is exclusive only to Moon DAO.', '1672647837.png', 'Lunar', 'This NFT represents as the \"LUNAR\" this NFT is exclusive only to Moon DAO', '1672647949.png', 'Moon Coin', 'MNC', '1672648057.png', '1000', 'Moon', '1672648134.png', '0', '180', '20', '100', '800', 4, '2023-01-02 08:23:58');
INSERT INTO `dao_creation` VALUES (3, '0x4463cB85a144BB92BFa97C50468D9a192445b80d', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', 'ea101919f83033f12244505e6b3ba3735621e656783f3d552cc77dc521101919', 'Panda', 'This panda edition is exclusive only to Panda DAO', '1673235542.png', 'Panda Key', 'Who hold this key has access to Panda DAO', '1673235616.png', 'Panda Coin', 'PNDC', '1673235645.png', '1000', 'Panda', '1673235726.png', '0', '180', '18', '100', '820', 3, '2023-01-09 03:39:03');

-- ----------------------------
-- Table structure for dao_creation_deactivated
-- ----------------------------
DROP TABLE IF EXISTS `dao_creation_deactivated`;
CREATE TABLE `dao_creation_deactivated`  (
  `id` int NOT NULL COMMENT 'Unique ID',
  `sdk_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Initialized wallet from private key.',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'DAO owners wallet address.',
  `privatekey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Private key used when creating the DAO.',
  `drop_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Edition Drop Name.',
  `drop_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Edition Drop Description.',
  `drop_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Edition Drop Image name.',
  `nft_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT name',
  `nft_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT Description',
  `nft_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'NFT Image name',
  `token_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token name',
  `token_symbol` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token symbol',
  `token_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token image its metadata',
  `token_amount` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token amount',
  `vote_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Vote Contract Name',
  `vote_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Vote image',
  `vote_delay` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Voting Delay',
  `vote_period` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Voting Period',
  `vote_quorum` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Voting Quorum',
  `token_threshhold` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token Threshhold',
  `token_transfer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token amount that will be transfered to the vote contract',
  `status` int NOT NULL COMMENT 'Creation of DAO status',
  `datetime` datetime NULL DEFAULT NULL COMMENT 'Date and Time this DAO created'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dao_creation_deactivated
-- ----------------------------

-- ----------------------------
-- Table structure for dao_deactivated
-- ----------------------------
DROP TABLE IF EXISTS `dao_deactivated`;
CREATE TABLE `dao_deactivated`  (
  `id` int NOT NULL COMMENT 'unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'owners wallet address',
  `privatekey` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'PrivateKey',
  `editiondrop` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Edition Drop Contract Address',
  `token` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Token Contract Address',
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Vote Contract Address',
  `dao_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'DAO name',
  `dao_image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Dao image',
  `dao_link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'DAO link name',
  `link_created` datetime NULL DEFAULT NULL COMMENT 'Link was created',
  `creation_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Dao creation ID',
  `progress` int NOT NULL COMMENT 'Created DAO Progress ',
  `datetime` datetime NULL DEFAULT NULL COMMENT 'Date Time created'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dao_deactivated
-- ----------------------------

-- ----------------------------
-- Table structure for notifications
-- ----------------------------
DROP TABLE IF EXISTS `notifications`;
CREATE TABLE `notifications`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'unique ID',
  `notif_kind` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'Notification kind',
  `notif_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'Notification name',
  `notif_for_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'Notification is for',
  `notif_img` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'Notification display image',
  `notif_short_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'Notification Short Message',
  `notif_long_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'Notification Long Message',
  `notif_link` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'Notification Link to',
  `notif_status` int NOT NULL COMMENT 'Notification status',
  `notif_created` datetime NULL DEFAULT NULL COMMENT 'Notification created',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 81 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notifications
-- ----------------------------
INSERT INTO `notifications` VALUES (1, 'invite', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'Invitation from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 invited you to join their DAO', 'http://localhost:3000/DAO?link=OWFL1FAFZMW1s1lot88S&data=U2FsdGVkX19Oi1XKVUG%2FZwTHwLzS3kJgwzSTd6kO7O3pzMTL7%2Bg6NAr3gTYjEAG5R%2BCThlrDsABz7MGWGbbdpk5UVr3oFnmwleSp9NB1NcXQyMqO5%2FtZK4oRTUOKlV0fWPq8wYIiS6UNP%2FoE%2F19zf5GEf1dOEiIj4MK%2B67vx2Z01pfrzuNJ8XGG5BGwNvoJ8kO%2FzwZ9WulOJlG6HX8NyoA%3D%3D', 0, '2022-12-12 09:50:33');
INSERT INTO `notifications` VALUES (2, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX18qg26Ci0BGhLckDZRAy0zAGip62ffExDnRMyr1CdM066Yr5FbaxBqaGS1YuL5MT3H7Blvaj33I75hzSILyeHCh6%2FMxnh0pwt5U1cJMPNsSFEk9affNVCPX2xz%2FJlSteT1v3Hn42%2FWmcCDfEvAkC1o%2Fr7tmERYataFOtsV32PMOnKBDKCu9GiC59%2BFTSURRtQGszH%2FCz%2FXWAw%3D%3D', 2, '2023-01-02 07:57:25');
INSERT INTO `notifications` VALUES (3, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX18qg26Ci0BGhLckDZRAy0zAGip62ffExDnRMyr1CdM066Yr5FbaxBqaGS1YuL5MT3H7Blvaj33I75hzSILyeHCh6%2FMxnh0pwt5U1cJMPNsSFEk9affNVCPX2xz%2FJlSteT1v3Hn42%2FWmcCDfEvAkC1o%2Fr7tmERYataFOtsV32PMOnKBDKCu9GiC59%2BFTSURRtQGszH%2FCz%2FXWAw%3D%3D', 0, '2023-01-02 07:57:25');
INSERT INTO `notifications` VALUES (4, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX18qg26Ci0BGhLckDZRAy0zAGip62ffExDnRMyr1CdM066Yr5FbaxBqaGS1YuL5MT3H7Blvaj33I75hzSILyeHCh6%2FMxnh0pwt5U1cJMPNsSFEk9affNVCPX2xz%2FJlSteT1v3Hn42%2FWmcCDfEvAkC1o%2Fr7tmERYataFOtsV32PMOnKBDKCu9GiC59%2BFTSURRtQGszH%2FCz%2FXWAw%3D%3D', 0, '2023-01-02 07:57:25');
INSERT INTO `notifications` VALUES (5, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX18qg26Ci0BGhLckDZRAy0zAGip62ffExDnRMyr1CdM066Yr5FbaxBqaGS1YuL5MT3H7Blvaj33I75hzSILyeHCh6%2FMxnh0pwt5U1cJMPNsSFEk9affNVCPX2xz%2FJlSteT1v3Hn42%2FWmcCDfEvAkC1o%2Fr7tmERYataFOtsV32PMOnKBDKCu9GiC59%2BFTSURRtQGszH%2FCz%2FXWAw%3D%3D', 2, '2023-01-02 07:57:25');
INSERT INTO `notifications` VALUES (6, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX19ow8%2FKskIqd6YRXZ4zo8FECNNeDcWFz8km2fVYJTmJi4GtCsAjofLTX65MCR8T6keqeMXaJI4m8OjEhmiwBOjzhaztp4wr2%2FUPtu520QIPbpR6NsVc3irEgXCUOwz1gO3fbjvqZIl3%2FLTEqZbED8c7e7X5ubdSbUsgUa7jO6xSrGE7VNwRmXodDODXdW4dUN2YrD%2F5q5XooA%3D%3D', 0, '2023-01-02 09:47:52');
INSERT INTO `notifications` VALUES (7, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX19ow8%2FKskIqd6YRXZ4zo8FECNNeDcWFz8km2fVYJTmJi4GtCsAjofLTX65MCR8T6keqeMXaJI4m8OjEhmiwBOjzhaztp4wr2%2FUPtu520QIPbpR6NsVc3irEgXCUOwz1gO3fbjvqZIl3%2FLTEqZbED8c7e7X5ubdSbUsgUa7jO6xSrGE7VNwRmXodDODXdW4dUN2YrD%2F5q5XooA%3D%3D', 0, '2023-01-02 09:47:52');
INSERT INTO `notifications` VALUES (8, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX19ow8%2FKskIqd6YRXZ4zo8FECNNeDcWFz8km2fVYJTmJi4GtCsAjofLTX65MCR8T6keqeMXaJI4m8OjEhmiwBOjzhaztp4wr2%2FUPtu520QIPbpR6NsVc3irEgXCUOwz1gO3fbjvqZIl3%2FLTEqZbED8c7e7X5ubdSbUsgUa7jO6xSrGE7VNwRmXodDODXdW4dUN2YrD%2F5q5XooA%3D%3D', 2, '2023-01-02 09:47:52');
INSERT INTO `notifications` VALUES (9, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX19ow8%2FKskIqd6YRXZ4zo8FECNNeDcWFz8km2fVYJTmJi4GtCsAjofLTX65MCR8T6keqeMXaJI4m8OjEhmiwBOjzhaztp4wr2%2FUPtu520QIPbpR6NsVc3irEgXCUOwz1gO3fbjvqZIl3%2FLTEqZbED8c7e7X5ubdSbUsgUa7jO6xSrGE7VNwRmXodDODXdW4dUN2YrD%2F5q5XooA%3D%3D', 2, '2023-01-02 09:47:52');
INSERT INTO `notifications` VALUES (10, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX197otIsW3x%2BAmJ3DpYEKUK7c5c3rN5Pz30SCfgZOh1D7PbdLyrb6cmMpYRHgs5C5DhLzb3iXaksX%2FoEaWMbz1YKL0QPw75lDzq17Dkuf%2FPtHLuH3EmGKW0OBBlIn8SlS0I8e6ExcIekNLIRy%2BOZMGPmiKEyosidgY1uQYD8wtm9Z5%2FtAQIK9OpCl1uCVVvl1IOvJkd%2FR6L1Hw%3D%3D', 0, '2023-01-04 01:20:04');
INSERT INTO `notifications` VALUES (11, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX197otIsW3x%2BAmJ3DpYEKUK7c5c3rN5Pz30SCfgZOh1D7PbdLyrb6cmMpYRHgs5C5DhLzb3iXaksX%2FoEaWMbz1YKL0QPw75lDzq17Dkuf%2FPtHLuH3EmGKW0OBBlIn8SlS0I8e6ExcIekNLIRy%2BOZMGPmiKEyosidgY1uQYD8wtm9Z5%2FtAQIK9OpCl1uCVVvl1IOvJkd%2FR6L1Hw%3D%3D', 2, '2023-01-04 01:20:04');
INSERT INTO `notifications` VALUES (12, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX197otIsW3x%2BAmJ3DpYEKUK7c5c3rN5Pz30SCfgZOh1D7PbdLyrb6cmMpYRHgs5C5DhLzb3iXaksX%2FoEaWMbz1YKL0QPw75lDzq17Dkuf%2FPtHLuH3EmGKW0OBBlIn8SlS0I8e6ExcIekNLIRy%2BOZMGPmiKEyosidgY1uQYD8wtm9Z5%2FtAQIK9OpCl1uCVVvl1IOvJkd%2FR6L1Hw%3D%3D', 2, '2023-01-04 01:20:04');
INSERT INTO `notifications` VALUES (13, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25 has proposed a new proposal', 'http://localhost:3000/DAO?link=M72GuUK3nAHoxzh28aH6&data=U2FsdGVkX197otIsW3x%2BAmJ3DpYEKUK7c5c3rN5Pz30SCfgZOh1D7PbdLyrb6cmMpYRHgs5C5DhLzb3iXaksX%2FoEaWMbz1YKL0QPw75lDzq17Dkuf%2FPtHLuH3EmGKW0OBBlIn8SlS0I8e6ExcIekNLIRy%2BOZMGPmiKEyosidgY1uQYD8wtm9Z5%2FtAQIK9OpCl1uCVVvl1IOvJkd%2FR6L1Hw%3D%3D', 0, '2023-01-04 01:20:04');
INSERT INTO `notifications` VALUES (14, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FBMVoHB%2BBKvxOvSn%2BzF6bo%2FWxo23FR2MQVfSf%2BucxxJEQN4Qs7FoLd13zLfPekB8kOm9wVgdJ%2Ftgq3SZZlvxy7FMQW6aGzQKqdTZOqep69nGpbt8s6tpJO8eIeDNcSDOrPu8iKMDcR3PBJI%2BgUNVSZTjoOueeMnqSIZgpXT86o%2B9sg3rIl9jmL93j6BQZzA%2BUVOMOD8awQoQ%3D%3D', 0, '2023-01-09 11:58:22');
INSERT INTO `notifications` VALUES (15, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FBMVoHB%2BBKvxOvSn%2BzF6bo%2FWxo23FR2MQVfSf%2BucxxJEQN4Qs7FoLd13zLfPekB8kOm9wVgdJ%2Ftgq3SZZlvxy7FMQW6aGzQKqdTZOqep69nGpbt8s6tpJO8eIeDNcSDOrPu8iKMDcR3PBJI%2BgUNVSZTjoOueeMnqSIZgpXT86o%2B9sg3rIl9jmL93j6BQZzA%2BUVOMOD8awQoQ%3D%3D', 2, '2023-01-09 11:58:22');
INSERT INTO `notifications` VALUES (16, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FBMVoHB%2BBKvxOvSn%2BzF6bo%2FWxo23FR2MQVfSf%2BucxxJEQN4Qs7FoLd13zLfPekB8kOm9wVgdJ%2Ftgq3SZZlvxy7FMQW6aGzQKqdTZOqep69nGpbt8s6tpJO8eIeDNcSDOrPu8iKMDcR3PBJI%2BgUNVSZTjoOueeMnqSIZgpXT86o%2B9sg3rIl9jmL93j6BQZzA%2BUVOMOD8awQoQ%3D%3D', 0, '2023-01-09 11:58:22');
INSERT INTO `notifications` VALUES (17, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FBMVoHB%2BBKvxOvSn%2BzF6bo%2FWxo23FR2MQVfSf%2BucxxJEQN4Qs7FoLd13zLfPekB8kOm9wVgdJ%2Ftgq3SZZlvxy7FMQW6aGzQKqdTZOqep69nGpbt8s6tpJO8eIeDNcSDOrPu8iKMDcR3PBJI%2BgUNVSZTjoOueeMnqSIZgpXT86o%2B9sg3rIl9jmL93j6BQZzA%2BUVOMOD8awQoQ%3D%3D', 2, '2023-01-09 11:58:22');
INSERT INTO `notifications` VALUES (18, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX18eskbj5tbNnzoBGMJaR6LY%2B%2FR0PhZx0AcZPH8gd%2FQnuRCORLaK%2FsdsjqJ2V%2BtMbYp8gsuozK066ms8eawg8Q6CMC6pkOjQt4O37Am4qVJt2toJA4clqV85sWaSWC9t92RVmW0Cj2pSbKSRDwG%2BVbzEV%2BIpG0xZcZP4o04OMqiFvkhYmJkEiKZZHHTWkIkPt7K6kkq1BLbBgg%3D%3D', 0, '2023-01-10 02:54:35');
INSERT INTO `notifications` VALUES (19, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX18eskbj5tbNnzoBGMJaR6LY%2B%2FR0PhZx0AcZPH8gd%2FQnuRCORLaK%2FsdsjqJ2V%2BtMbYp8gsuozK066ms8eawg8Q6CMC6pkOjQt4O37Am4qVJt2toJA4clqV85sWaSWC9t92RVmW0Cj2pSbKSRDwG%2BVbzEV%2BIpG0xZcZP4o04OMqiFvkhYmJkEiKZZHHTWkIkPt7K6kkq1BLbBgg%3D%3D', 2, '2023-01-10 02:54:35');
INSERT INTO `notifications` VALUES (20, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX18eskbj5tbNnzoBGMJaR6LY%2B%2FR0PhZx0AcZPH8gd%2FQnuRCORLaK%2FsdsjqJ2V%2BtMbYp8gsuozK066ms8eawg8Q6CMC6pkOjQt4O37Am4qVJt2toJA4clqV85sWaSWC9t92RVmW0Cj2pSbKSRDwG%2BVbzEV%2BIpG0xZcZP4o04OMqiFvkhYmJkEiKZZHHTWkIkPt7K6kkq1BLbBgg%3D%3D', 2, '2023-01-10 02:54:35');
INSERT INTO `notifications` VALUES (21, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX18eskbj5tbNnzoBGMJaR6LY%2B%2FR0PhZx0AcZPH8gd%2FQnuRCORLaK%2FsdsjqJ2V%2BtMbYp8gsuozK066ms8eawg8Q6CMC6pkOjQt4O37Am4qVJt2toJA4clqV85sWaSWC9t92RVmW0Cj2pSbKSRDwG%2BVbzEV%2BIpG0xZcZP4o04OMqiFvkhYmJkEiKZZHHTWkIkPt7K6kkq1BLbBgg%3D%3D', 0, '2023-01-10 02:54:35');
INSERT INTO `notifications` VALUES (22, 'invite', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'Invitation from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 invited you to join their DAO', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 0, '2023-01-10 03:04:46');
INSERT INTO `notifications` VALUES (23, 'joined', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 2, '2023-01-10 04:47:29');
INSERT INTO `notifications` VALUES (24, 'joined', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 0, '2023-01-10 04:47:29');
INSERT INTO `notifications` VALUES (25, 'joined', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 2, '2023-01-10 04:47:29');
INSERT INTO `notifications` VALUES (26, 'joined', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 0, '2023-01-10 04:47:29');
INSERT INTO `notifications` VALUES (27, 'joined', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 2, '2023-01-10 04:55:06');
INSERT INTO `notifications` VALUES (28, 'joined', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 0, '2023-01-10 04:55:06');
INSERT INTO `notifications` VALUES (29, 'joined', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 2, '2023-01-10 04:55:06');
INSERT INTO `notifications` VALUES (30, 'joined', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 0, '2023-01-10 04:55:06');
INSERT INTO `notifications` VALUES (31, 'joined', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New DAO member', '0xea8570C80f9649ac1a22409e43c68C0BC536C283 has joined our DAO!', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FzvFn5xZUBk7zWtQgBnw%2Boa7ef4v2egPQlDENgRM0QZhqbvbDF%2B5KFcPVwuFz%2F4wzIGlZs2ArM5AmR24wfSQtmWxbWhho3zQm04zSmJUMJHZJoXz19nFxdt0E2c2Q3RZqwcTshwF7EzWWEgsbnVVE2A6Ch%2B67G%2B9vOdQmBuVxNJs%2Be7%2FozvRlZRJjVPkwcO2Qx0EGe%2FbGk2g%3D%3D', 0, '2023-01-10 04:55:06');
INSERT INTO `notifications` VALUES (32, 'invite', 'Bear', '0x27f92da069B58Db42114Bdb13e1868FAB99d79fc', '1669959001.png', 'Invitation from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 invited you to join their DAO', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2BpvPR8mVOktJXKQ3B5THPupoQtihypAYiwMqI1GfM6YGTSE6awv1tdyqorizVozylOMggp58gf%2F7hYMPMqdKkiWQPahWA8snWkgBf4KMwdX%2BoruT4WXbtzPrAx3T7%2BZXr7Qawe8l%2FpNyZ3E5UnpXjBgHAgvEAAFc%2BGm2NqNzgGA1fzRBoZ5BmJonlTzkz%2BiwgB1AQp1CkSoA%3D%3D', 0, '2023-01-10 04:59:12');
INSERT INTO `notifications` VALUES (33, 'invite', 'Moon', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1672648134.png', 'Invitation from Moon.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 invited you to join their DAO', 'http://localhost:3000/DAO?link=7dNaUcK629cy6wqH29V3&data=U2FsdGVkX19%2F3NB7zlSlaiSFrc9N%2B0esnVx0kTih8y9aS0O6fKS%2BycSrIDeH8RWTXvKUkO%2FOwa1zKMJi7BqIDvfmgQB%2BMU9g94RybtFgZ95gfnhSzPtTIWm6HdwkoNNl6rN%2FQmCjK0EOJIqbpt3EqqNvpatTwcn0Ca%2FpDulNdYhgwIDXmr3y5Qz9qQK8k9X79A6Z6cvVm5Q0RkEjRj%2FMlg%3D%3D', 2, '2023-01-10 07:04:50');
INSERT INTO `notifications` VALUES (34, 'joined', 'Moon', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1672648134.png', 'New DAO member', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has joined our DAO!', 'http://localhost:3000/DAO?link=7dNaUcK629cy6wqH29V3&data=U2FsdGVkX19%2F3NB7zlSlaiSFrc9N%2B0esnVx0kTih8y9aS0O6fKS%2BycSrIDeH8RWTXvKUkO%2FOwa1zKMJi7BqIDvfmgQB%2BMU9g94RybtFgZ95gfnhSzPtTIWm6HdwkoNNl6rN%2FQmCjK0EOJIqbpt3EqqNvpatTwcn0Ca%2FpDulNdYhgwIDXmr3y5Qz9qQK8k9X79A6Z6cvVm5Q0RkEjRj%2FMlg%3D%3D', 2, '2023-01-10 07:07:21');
INSERT INTO `notifications` VALUES (35, 'proposal', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:42:53');
INSERT INTO `notifications` VALUES (36, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:42:53');
INSERT INTO `notifications` VALUES (37, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:42:53');
INSERT INTO `notifications` VALUES (38, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:42:53');
INSERT INTO `notifications` VALUES (39, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:42:53');
INSERT INTO `notifications` VALUES (40, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:46:22');
INSERT INTO `notifications` VALUES (41, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:46:22');
INSERT INTO `notifications` VALUES (42, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:46:22');
INSERT INTO `notifications` VALUES (43, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:46:22');
INSERT INTO `notifications` VALUES (44, 'proposal', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:46:22');
INSERT INTO `notifications` VALUES (45, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:48:35');
INSERT INTO `notifications` VALUES (46, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:48:35');
INSERT INTO `notifications` VALUES (47, 'proposal', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:48:35');
INSERT INTO `notifications` VALUES (48, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:48:35');
INSERT INTO `notifications` VALUES (49, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:48:35');
INSERT INTO `notifications` VALUES (50, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:51:10');
INSERT INTO `notifications` VALUES (51, 'proposal', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:51:10');
INSERT INTO `notifications` VALUES (52, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:51:10');
INSERT INTO `notifications` VALUES (53, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:51:10');
INSERT INTO `notifications` VALUES (54, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:51:10');
INSERT INTO `notifications` VALUES (55, 'proposal', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:53:17');
INSERT INTO `notifications` VALUES (56, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:53:17');
INSERT INTO `notifications` VALUES (57, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:53:17');
INSERT INTO `notifications` VALUES (58, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:53:17');
INSERT INTO `notifications` VALUES (59, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:53:17');
INSERT INTO `notifications` VALUES (60, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:58:46');
INSERT INTO `notifications` VALUES (61, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:58:46');
INSERT INTO `notifications` VALUES (62, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 2, '2023-01-10 13:58:46');
INSERT INTO `notifications` VALUES (63, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:58:46');
INSERT INTO `notifications` VALUES (64, 'proposal', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX19mEJoqBoFY56i7Ho%2BvwpW3hkLPJYOSin5rNY%2FqEeYwZ%2Bt%2Bn%2F%2FkbjiwfeglrSJRzuaL%2BWr9uuxC8XzlXUwQhj6F84ENOwMH1b4J%2BkF39hEc8MyTZgEFYPXFS5XbfiudHVllNAVsQqgoy1n7fpy2cO3bJdQvaU%2FAul6cdK3cznqYKCmDmI2J6WMbdO4kv4X1EZbuJYebVoOIng%3D%3D', 0, '2023-01-10 13:58:46');
INSERT INTO `notifications` VALUES (65, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2BjHghfKdAU0ublNpQqnft0bYsUy7vKDMUEEQYbFKAy5fv1CzXobOZmPr0iz3FwYR0kiHbCLkMc%2Bj38V%2FL77L51BArFg6gpfvSqnQU5YxowzAb8Y9ckvzOtUFACL9FsHAgQX9C2NI9%2BF%2BZFfVmEiijXQd1P%2Bh%2FeduJ9Apzne2ROKUdDvhajmPwvn9zXpRg7mQeOc67PC7nh%2Fw%3D%3D', 0, '2023-01-11 03:29:46');
INSERT INTO `notifications` VALUES (66, 'proposal', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2BjHghfKdAU0ublNpQqnft0bYsUy7vKDMUEEQYbFKAy5fv1CzXobOZmPr0iz3FwYR0kiHbCLkMc%2Bj38V%2FL77L51BArFg6gpfvSqnQU5YxowzAb8Y9ckvzOtUFACL9FsHAgQX9C2NI9%2BF%2BZFfVmEiijXQd1P%2Bh%2FeduJ9Apzne2ROKUdDvhajmPwvn9zXpRg7mQeOc67PC7nh%2Fw%3D%3D', 0, '2023-01-11 03:29:46');
INSERT INTO `notifications` VALUES (67, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2BjHghfKdAU0ublNpQqnft0bYsUy7vKDMUEEQYbFKAy5fv1CzXobOZmPr0iz3FwYR0kiHbCLkMc%2Bj38V%2FL77L51BArFg6gpfvSqnQU5YxowzAb8Y9ckvzOtUFACL9FsHAgQX9C2NI9%2BF%2BZFfVmEiijXQd1P%2Bh%2FeduJ9Apzne2ROKUdDvhajmPwvn9zXpRg7mQeOc67PC7nh%2Fw%3D%3D', 0, '2023-01-11 03:29:46');
INSERT INTO `notifications` VALUES (68, 'proposal', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal from Bear.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2BjHghfKdAU0ublNpQqnft0bYsUy7vKDMUEEQYbFKAy5fv1CzXobOZmPr0iz3FwYR0kiHbCLkMc%2Bj38V%2FL77L51BArFg6gpfvSqnQU5YxowzAb8Y9ckvzOtUFACL9FsHAgQX9C2NI9%2BF%2BZFfVmEiijXQd1P%2Bh%2FeduJ9Apzne2ROKUdDvhajmPwvn9zXpRg7mQeOc67PC7nh%2Fw%3D%3D', 2, '2023-01-11 03:29:46');
INSERT INTO `notifications` VALUES (69, 'proposal', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2Bx5JWB02sKo9dGisTaz1%2FbbUXxBp0Q2L5gcYMrvIdS7Gcumrb3g3zGXFhckNtyKVRZ%2FvBALN5Jjtw9WjFVQxW0IYx%2BbvSP1q4m%2FZ%2FSpSf0xzsOq%2BdV9JVjAVPayPQlPBDfe2TuuE%2BM2AmMg217F7DvFl2mJK%2FY14BPdivHmDMIf6qRuPEOF6M2JlhflQBmgS57LeMxVjI3dg%3D%3D', 0, '2023-01-11 04:34:20');
INSERT INTO `notifications` VALUES (70, 'proposal', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2Bx5JWB02sKo9dGisTaz1%2FbbUXxBp0Q2L5gcYMrvIdS7Gcumrb3g3zGXFhckNtyKVRZ%2FvBALN5Jjtw9WjFVQxW0IYx%2BbvSP1q4m%2FZ%2FSpSf0xzsOq%2BdV9JVjAVPayPQlPBDfe2TuuE%2BM2AmMg217F7DvFl2mJK%2FY14BPdivHmDMIf6qRuPEOF6M2JlhflQBmgS57LeMxVjI3dg%3D%3D', 2, '2023-01-11 04:34:20');
INSERT INTO `notifications` VALUES (71, 'proposal', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2Bx5JWB02sKo9dGisTaz1%2FbbUXxBp0Q2L5gcYMrvIdS7Gcumrb3g3zGXFhckNtyKVRZ%2FvBALN5Jjtw9WjFVQxW0IYx%2BbvSP1q4m%2FZ%2FSpSf0xzsOq%2BdV9JVjAVPayPQlPBDfe2TuuE%2BM2AmMg217F7DvFl2mJK%2FY14BPdivHmDMIf6qRuPEOF6M2JlhflQBmgS57LeMxVjI3dg%3D%3D', 0, '2023-01-11 04:34:20');
INSERT INTO `notifications` VALUES (72, 'proposal', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal from Bear.', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has proposed a new proposal', 'http://localhost:3000/DAO?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2Bx5JWB02sKo9dGisTaz1%2FbbUXxBp0Q2L5gcYMrvIdS7Gcumrb3g3zGXFhckNtyKVRZ%2FvBALN5Jjtw9WjFVQxW0IYx%2BbvSP1q4m%2FZ%2FSpSf0xzsOq%2BdV9JVjAVPayPQlPBDfe2TuuE%2BM2AmMg217F7DvFl2mJK%2FY14BPdivHmDMIf6qRuPEOF6M2JlhflQBmgS57LeMxVjI3dg%3D%3D', 0, '2023-01-11 04:34:20');
INSERT INTO `notifications` VALUES (73, 'vote', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'A member has voted on a proposal.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has voted to the proposal', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 04:35:20');
INSERT INTO `notifications` VALUES (74, 'vote', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'A member has voted on a proposal.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has voted to the proposal', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 04:35:20');
INSERT INTO `notifications` VALUES (75, 'vote', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'A member has voted on a proposal.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has voted to the proposal', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 2, '2023-01-11 04:35:20');
INSERT INTO `notifications` VALUES (76, 'vote', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'A member has voted on a proposal.', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 has voted to the proposal', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 04:35:20');
INSERT INTO `notifications` VALUES (77, 'vote', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'A new vote on a proposal', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has voted to the proposal.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 04:37:43');
INSERT INTO `notifications` VALUES (78, 'vote', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'A new vote on a proposal', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has voted to the proposal.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 2, '2023-01-11 04:37:43');
INSERT INTO `notifications` VALUES (79, 'vote', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'A new vote on a proposal', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has voted to the proposal.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 04:37:44');
INSERT INTO `notifications` VALUES (80, 'vote', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'A new vote on a proposal', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 has voted to the proposal.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 04:37:44');
INSERT INTO `notifications` VALUES (81, 'comment', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal comment', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:01:14');
INSERT INTO `notifications` VALUES (82, 'comment', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal comment', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:01:14');
INSERT INTO `notifications` VALUES (83, 'comment', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal comment', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:01:14');
INSERT INTO `notifications` VALUES (84, 'comment', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal comment', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 2, '2023-01-11 05:01:14');
INSERT INTO `notifications` VALUES (85, 'comment', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal comment', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:01:39');
INSERT INTO `notifications` VALUES (86, 'comment', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal comment', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:01:39');
INSERT INTO `notifications` VALUES (87, 'comment', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal comment', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 2, '2023-01-11 05:01:39');
INSERT INTO `notifications` VALUES (88, 'comment', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal comment', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:01:40');
INSERT INTO `notifications` VALUES (89, 'comment', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New proposal comment', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 2, '2023-01-11 05:02:22');
INSERT INTO `notifications` VALUES (90, 'comment', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal comment', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:02:22');
INSERT INTO `notifications` VALUES (91, 'comment', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal comment', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:02:22');
INSERT INTO `notifications` VALUES (92, 'comment', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal comment', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:02:22');
INSERT INTO `notifications` VALUES (93, 'comment', 'Bear', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1669959001.png', 'New proposal comment', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:03:24');
INSERT INTO `notifications` VALUES (94, 'comment', 'Bear', '0xbae9CC93f66D7789124b16f61cA547b29d49E409', '1669959001.png', 'New proposal comment', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:03:24');
INSERT INTO `notifications` VALUES (95, 'comment', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New proposal comment', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 2, '2023-01-11 05:03:24');
INSERT INTO `notifications` VALUES (96, 'comment', 'Bear', '0xea8570C80f9649ac1a22409e43c68C0BC536C283', '1669959001.png', 'New proposal comment', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20 commented on a proposal you were in.', 'http://localhost:3000/proposal?link=6376RvTGChxwJXx6QPj2&data=U2FsdGVkX1%2FdEJCekktSNkZa4O1gRCtaqlxQ2G43kh8puECNKg3c%2FNRRVT5gm3za5dhhBgP%2FleT6cmpTRgTByfXrOm39C5q%2Fkh%2BM5pZeCPVYXx4ksVfj9GkFA3OK%2Bi4uWGEVgRid1TiZ3p3wAfYvT3MMadpWqOkRco4lLerpa7xZWt8Q8SBthcGv%2F3bHDG%2BBgv6FtbN%2B%2F%2BH7OKXUl5dPzUD7YO8V30OYtolxvzB%2F136ZtecvEMZ59WyOsPAm4LKEEkyYlaST0n8TnBV2Imw3AP7zN3QiUWCNsdi86%2BZPCy8%3D', 0, '2023-01-11 05:03:24');
INSERT INTO `notifications` VALUES (97, 'request', 'Bear', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1669959001.png', 'New deactivation request', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 requested to deactivate the DAO.', '/adminpanel?tab=request', 2, '2023-01-11 05:24:42');
INSERT INTO `notifications` VALUES (98, 'request', 'Bear', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1669959001.png', 'New deactivation request', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18 requested to deactivate the DAO.', '/adminpanel?tab=request', 2, '2023-01-11 05:24:42');

-- ----------------------------
-- Table structure for profiles
-- ----------------------------
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Unique ID',
  `wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Users Wallet',
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Vote contract address',
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Users name',
  `avatar` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Avatar image link or location',
  `name_change_log` datetime NULL DEFAULT NULL COMMENT 'Data time name changed',
  `avatar_change_log` datetime NULL DEFAULT NULL COMMENT 'Data time avatar changed',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of profiles
-- ----------------------------
INSERT INTO `profiles` VALUES (1, '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '0xc04c3D530930A9e6Cd9e08AC217d5D1286a4c680', 'John D0e', '/uploads/default/D0e.png', '2023-01-05 01:21:33', '2023-01-05 01:21:17');
INSERT INTO `profiles` VALUES (2, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '0x4795340d50Fa3f85246C4dc2526a2263C39E36a7', 'D0enotME', '/uploads/default/NotME.png', '2023-01-11 07:02:55', '2023-01-11 07:03:00');

-- ----------------------------
-- Table structure for request
-- ----------------------------
DROP TABLE IF EXISTS `request`;
CREATE TABLE `request`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Uniques keys',
  `request_wallet` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Requesters wallet address',
  `request_dao_id` int NULL DEFAULT NULL COMMENT 'The DAO ID',
  `request_creation_id` int NULL DEFAULT NULL COMMENT 'The DAO Creation ID',
  `request_email` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Requesters email address',
  `request_message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'Requesters explaination message',
  `request_status` int NULL DEFAULT NULL COMMENT 'Request status 1 = Read / 1 = Unread',
  `request_expiration` datetime NULL DEFAULT NULL COMMENT 'Date Time with interval of 1 day.',
  `request_created` datetime NULL DEFAULT NULL COMMENT 'Date and time this request created',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of request
-- ----------------------------
INSERT INTO `request` VALUES (1, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 1, 1, 'admin@personal.com', 'This is a test request for deactivating the DAO.\n\n\nWhite space.', 1, '2023-01-04 13:39:11', '2023-01-03 13:39:11');
INSERT INTO `request` VALUES (2, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 1, 1, 'admin@personal.com', 'pa request ba atay oi.', 1, '2023-01-06 05:50:35', '2023-01-05 05:50:35');
INSERT INTO `request` VALUES (3, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 2, 2, 'admin@personal.com', '🤔😅😁😘😀😘 This is a test request\n\n\n\nwith whitespace and emojis\n\n\nsaS\nSA\nSA\nSA\nSA\nS\nAS\nA\nSASASA\nS\nASA', 1, '2023-01-11 13:20:08', '2023-01-10 13:20:08');
INSERT INTO `request` VALUES (4, '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', 1, 1, 'admin@personal.com', 'This is my test request', 1, '2023-01-12 05:24:41', '2023-01-11 05:24:41');

-- ----------------------------
-- Table structure for views
-- ----------------------------
DROP TABLE IF EXISTS `views`;
CREATE TABLE `views`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `proposal_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `wallet_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `view` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `isMember` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '1 = true / 0 = false',
  `isHolder` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'holders token amount!',
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of views
-- ----------------------------
INSERT INTO `views` VALUES (1, '0x06cca0ede3cc4ce88c5e32151e88c1311fc79fc72880d307d7c6cec00c034088', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '100.0', '2023-01-02 06:24:20');
INSERT INTO `views` VALUES (2, '0x4ac39c8c8a23e3c7f21214badf86f0d9e33c8132858954c0d865b98876807350', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '100.0', '2023-01-02 06:30:02');
INSERT INTO `views` VALUES (3, '0x06cca0ede3cc4ce88c5e32151e88c1311fc79fc72880d307d7c6cec00c034088', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '100.0', '2023-01-02 06:30:28');
INSERT INTO `views` VALUES (4, '0x75b50f0a5db252504817b63ddb3438d955d1c85bdef676d080b8506fdf017107', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1', '1', '100.0', '2023-01-02 07:58:07');
INSERT INTO `views` VALUES (5, '0x75b50f0a5db252504817b63ddb3438d955d1c85bdef676d080b8506fdf017107', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '100.0', '2023-01-02 08:03:28');
INSERT INTO `views` VALUES (6, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '100.0', '2023-01-02 09:48:35');
INSERT INTO `views` VALUES (7, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1', '1', '100.0', '2023-01-02 14:14:14');
INSERT INTO `views` VALUES (8, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1', '1', '100.0', '2023-01-04 01:04:34');
INSERT INTO `views` VALUES (9, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1', '1', '100.0', '2023-01-04 01:20:13');
INSERT INTO `views` VALUES (10, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1', '1', '100.0', '2023-01-04 01:22:21');
INSERT INTO `views` VALUES (11, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 03:58:42');
INSERT INTO `views` VALUES (12, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 07:40:44');
INSERT INTO `views` VALUES (13, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 07:54:31');
INSERT INTO `views` VALUES (14, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 07:55:17');
INSERT INTO `views` VALUES (15, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 07:55:30');
INSERT INTO `views` VALUES (16, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 07:58:04');
INSERT INTO `views` VALUES (17, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 10:41:16');
INSERT INTO `views` VALUES (18, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 10:53:41');
INSERT INTO `views` VALUES (19, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 10:56:20');
INSERT INTO `views` VALUES (20, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-09 11:16:49');
INSERT INTO `views` VALUES (21, '0xa56b9f556879a6d7199e6fabbe56d4c0204c4e0d497914baaa4f0fd5b5e6f5ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-10 02:02:16');
INSERT INTO `views` VALUES (22, '0xa56b9f556879a6d7199e6fabbe56d4c0204c4e0d497914baaa4f0fd5b5e6f5ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-10 02:47:06');
INSERT INTO `views` VALUES (23, '0x41e65a0735085b6b8857e84815047ef4ebb91ba259ff3587060a7fe33c2b44e3', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1', '1', '300.0', '2023-01-10 13:36:29');
INSERT INTO `views` VALUES (24, '0xb3687e990b03957ce057f676a2503f25f6e4e1d1d372d8bf0949e77c3c6ca895', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-11 03:30:38');
INSERT INTO `views` VALUES (25, '0xb3687e990b03957ce057f676a2503f25f6e4e1d1d372d8bf0949e77c3c6ca895', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1', '1', '300.0', '2023-01-11 03:49:06');
INSERT INTO `views` VALUES (26, '0xfde10a7b99a7198faa6fc2983af1eedb8f92698d553a80cef6ad489303fea06a', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1', '1', '300.0', '2023-01-11 04:34:44');

-- ----------------------------
-- Table structure for votes
-- ----------------------------
DROP TABLE IF EXISTS `votes`;
CREATE TABLE `votes`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `proposal_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `wallet_address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `vote` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `isMember` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT '1 = true / 0 = false',
  `isHolder` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL COMMENT 'holders token amount!',
  `datetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of votes
-- ----------------------------
INSERT INTO `votes` VALUES (1, '0x06cca0ede3cc4ce88c5e32151e88c1311fc79fc72880d307d7c6cec00c034088', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '100.0', '2023-01-02 06:24:22');
INSERT INTO `votes` VALUES (2, '0x75b50f0a5db252504817b63ddb3438d955d1c85bdef676d080b8506fdf017107', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1', '1', '300.0', '2023-01-02 07:58:41');
INSERT INTO `votes` VALUES (3, '0x75b50f0a5db252504817b63ddb3438d955d1c85bdef676d080b8506fdf017107', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '100.0', '2023-01-02 07:59:50');
INSERT INTO `votes` VALUES (4, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '100.0', '2023-01-02 09:49:11');
INSERT INTO `votes` VALUES (5, '0x849d5703df85495e1a7b8635faf1fa0b0f3206f9b4b19139bd724dd91da1a4ea', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1', '1', '300.0', '2023-01-02 09:50:07');
INSERT INTO `votes` VALUES (6, '0x1bb46cdfd4d2ffaba9d5a06955523a2cf6dc074c9f3bc2bbb8ac3ad537258019', '0x6912314E6ac921cAC8eED7C856541c5B895D0A25', '1', '1', '100.0', '2023-01-04 01:20:50');
INSERT INTO `votes` VALUES (7, '0xfde10a7b99a7198faa6fc2983af1eedb8f92698d553a80cef6ad489303fea06a', '0x844f66cA390CE21F40FE00bCe4777e4672Df2F18', '1', '1', '300.0', '2023-01-11 04:35:20');
INSERT INTO `votes` VALUES (8, '0xfde10a7b99a7198faa6fc2983af1eedb8f92698d553a80cef6ad489303fea06a', '0x1a3A4e2754Bea7CaD5843790121589FE3b917D20', '1', '1', '150.0', '2023-01-11 04:37:43');

-- ----------------------------
-- View structure for members
-- ----------------------------
DROP VIEW IF EXISTS `members`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `members` AS select count(`claimers`.`id`) AS `members`,`claimers`.`daoCreation_id` AS `daoCreation_id`,`claimers`.`editionDrop_address` AS `editionDrop_address` from `claimers` group by `claimers`.`editionDrop_address`,`claimers`.`daoCreation_id` order by `members` desc;

SET FOREIGN_KEY_CHECKS = 1;
