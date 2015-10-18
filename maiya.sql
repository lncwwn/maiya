# ************************************************************
# Sequel Pro SQL dump
# Version 4499
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.6.26)
# Database: maiya
# Generation Time: 2015-10-18 08:08:17 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '类目名称',
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `name`, `created`)
VALUES
	(1,'山花椒','2015-10-17 15:52:26'),
	(2,'南肠','2015-10-17 15:52:26'),
	(3,'野菜','2015-10-17 15:52:26'),
	(4,'粗粮','2015-10-17 15:52:26'),
	(5,'山禽蛋类','2015-10-17 15:52:26');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table member
# ------------------------------------------------------------

DROP TABLE IF EXISTS `member`;

CREATE TABLE `member` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `nick` varchar(50) NOT NULL COMMENT '用户昵称',
  `password` varchar(255) NOT NULL,
  `created` datetime DEFAULT NULL,
  `updated` varchar(45) DEFAULT NULL,
  `user_id` int(9) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `nick_UNIQUE` (`nick`),
  KEY `fk_member_user1_idx` (`user_id`),
  CONSTRAINT `fk_member_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table product
# ------------------------------------------------------------

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '产品名称',
  `inventory` int(6) NOT NULL DEFAULT '0' COMMENT '库存',
  `title` varchar(200) NOT NULL COMMENT '标题，用于销售',
  `active` bit(1) DEFAULT b'1' COMMENT '是否在售',
  `created` datetime NOT NULL COMMENT '产品创建时间',
  `category_id` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `title_UNIQUE` (`title`),
  KEY `fk_product_category_idx` (`category_id`),
  CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;

INSERT INTO `product` (`id`, `name`, `inventory`, `title`, `active`, `created`, `category_id`)
VALUES
	(1,'鲜花椒',100,'当季新鲜花椒，绿色无公害，限量88元包邮',00000000,'2015-10-17 15:52:26',1),
	(2,'南肠',20,'正宗南肠预定，精品猪肉，限量20件',00000000,'2015-10-17 15:52:26',2);

/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table recommendation
# ------------------------------------------------------------

DROP TABLE IF EXISTS `recommendation`;

CREATE TABLE `recommendation` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL COMMENT '推广产品名称',
  `inventory` int(6) NOT NULL DEFAULT '0' COMMENT '库存',
  `active` varchar(45) NOT NULL DEFAULT '0' COMMENT '是否在售',
  `created` datetime DEFAULT NULL,
  `category_id` int(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  KEY `fk_recommendation_category1_idx` (`category_id`),
  CONSTRAINT `fk_recommendation_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `gender` bit(1) DEFAULT b'0' COMMENT '0：男，1:女',
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
