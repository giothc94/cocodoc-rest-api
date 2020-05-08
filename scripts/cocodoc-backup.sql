-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: cocodoc
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documents` (
  `id_doc` varchar(45) NOT NULL,
  `name_doc` varchar(100) DEFAULT NULL,
  `registration_date_doc` datetime DEFAULT NULL,
  `last_modification_doc` datetime DEFAULT NULL,
  `id_folder` varchar(45) DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_doc`),
  KEY `id_folder_idx` (`id_folder`),
  KEY `id_user_idx` (`id_user`),
  CONSTRAINT `id_folder` FOREIGN KEY (`id_folder`) REFERENCES `folders` (`id_folder`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `id_user` FOREIGN KEY (`id_user`) REFERENCES `user_cocodoc` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES ('1583600340693','test.pdf','2020-03-07 11:59:01','2020-03-07 11:59:01','1583600276709',2),('1584918391814','para_descarga.pdf','2020-03-22 18:06:32','2020-03-22 18:06:32','1583600276709',2),('1584923503282','otro_test.pdf','2020-03-22 19:31:44','2020-03-22 19:31:44','1583600276709',2),('1584923712911','anidado.pdf','2020-03-22 19:35:13','2020-03-22 19:35:13','1584923620502',2);
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `folders`
--

DROP TABLE IF EXISTS `folders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `folders` (
  `id_folder` varchar(45) NOT NULL,
  `name_folder` varchar(1000) DEFAULT NULL,
  `cod_folder` varchar(100) DEFAULT NULL,
  `path_system_folder` varchar(1000) DEFAULT NULL,
  `path_user_folder` varchar(1000) DEFAULT NULL,
  `is_root` int DEFAULT '0',
  PRIMARY KEY (`id_folder`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `folders`
--

LOCK TABLES `folders` WRITE;
/*!40000 ALTER TABLE `folders` DISABLE KEYS */;
INSERT INTO `folders` VALUES ('1583528817508','cocodoc','1583528817508','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc','/cocodoc',1),('1583600266378','alcantarillado','1583600266378','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc/1583600266378-alcantarillado','/cocodoc/alcantarillado',0),('1583600276709','2020','1583600276709','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc/1583600266378-alcantarillado/1583600276709-2020','/cocodoc/alcantarillado/2020',0),('1584923562866','2019','1584923562866','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc/1583600266378-alcantarillado/1584923562866-2019','/cocodoc/alcantarillado/2019',0),('1584923620502','2021','1584923620502','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc/1583600266378-alcantarillado/1583600276709-2020/1584923620502-2021','/cocodoc/alcantarillado/2020/2021',0),('1586139275074','distrito','1586139275074','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc/1586139275074-distrito','/cocodoc/distrito',0),('1586139282432','1940','1586139282432','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc/1586139275074-distrito/1586139282432-1940','/cocodoc/distrito/1940',0),('1586139285705','1941','1586139285705','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc/1586139275074-distrito/1586139285705-1941','/cocodoc/distrito/1941',0),('1586139288704','1942','1586139288704','/home/giothcode/Projects/COCOTOG/cocodocREST/public/documentos/1583528817508-cocodoc/1586139275074-distrito/1586139288704-1942','/cocodoc/distrito/1942',0);
/*!40000 ALTER TABLE `folders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `key_user`
--

DROP TABLE IF EXISTS `key_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `key_user` (
  `id_key` int NOT NULL AUTO_INCREMENT,
  `user` varchar(45) DEFAULT NULL,
  `password` varchar(256) DEFAULT NULL,
  `new_user` tinyint DEFAULT NULL,
  `state` tinyint DEFAULT NULL,
  `tokenExpirationDate` datetime DEFAULT NULL,
  `activeToken` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id_key`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `key_user`
--

LOCK TABLES `key_user` WRITE;
/*!40000 ALTER TABLE `key_user` DISABLE KEYS */;
INSERT INTO `key_user` VALUES (12,'geoarg','775e8fd02a770679b8872c659ae692a5b9a7464bbe1e303cb2dd26819e77b8d9',0,1,'2020-05-06 16:12:41','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsIm5hbWUiOiJHaW92YW5ueSBHYWJyaWVsIEFyZ3VlbGxvIENvc3R0YSIsInNjb3BlcyI6WyJjcmVhdGU6ZGlyZWN0b3J5IiwiY3JlYXRlOmZpbGVzIiwiY3JlYXRlOnNjb3BlIiwiY3JlYXRlOnVzZXJzIiwiZGVsZXRlOmRpcmVjdG9yeSIsImRlbGV0ZTpmaWxlcyIsImRlbGV0ZTpzY29wZSIsImRlbGV0ZTp1c2VycyIsInJlYWQ6ZGlyZWN0b3J5IiwicmVhZDpmaWxlcyIsInJlYWQ6cm9sZXMiLCJyZWFkOnNjb3BlcyIsInJlYWQ6dXNlcnMiLCJ1cGRhdGU6ZGlyZWN0b3J5IiwidXBkYXRlOnVzZXJzIl0sImV4cGlyZXNJbiI6MTU4ODc5OTU2MDc4NywiaWF0IjoxNTg4NzkyMzYwLCJleHAiOjE1ODg3OTk1NjB9.xVaq_gGNw4orfA3Mu24RGiOVdFtfwiebQLryzni5GcM'),(13,'dayarg','d9e3b4f1b53f7052b0f347314104bff3b6b7be28f11cac35674aa5746a10b426',0,1,'2020-03-05 05:13:19','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsIm5hbWUiOiJEYXlhbmEgUGFtZWxhIEFyZ3VlbGxvIENvc3R0YSIsInNjb3BlcyI6WyJjcmVhdGU6ZGlyZWN0b3J5IiwiY3JlYXRlOmZpbGVzIiwiZGVsZXRlOmZpbGVzIiwicmVhZDpkaXJlY3RvcnkiLCJyZWFkOmZpbGVzIiwicmVhZDp1c2VycyIsInVwZGF0ZTpkaXJlY3RvcnkiXSwiZXhwaXJlc0luIjoxNTgzNDAzMTk4ODc1LCJpYXQiOjE1ODMzOTU5OTgsImV4cCI6MTU4MzQwMzE5OH0.OaDKpApozc0PJ7VI5X_5KuSzxYma104jkyr_EfsJH_o'),(14,'dylarg','a8dc364aae797fbde05f54bc4bb04c4c457fb886ac3a96f01b32ab309b52db32',0,1,'2020-03-13 18:28:24','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsIm5hbWUiOiJEeWxhbiBBbmRyZXMgQXJndWVsbG8gQ29zdHRhIiwic2NvcGVzIjpbImNyZWF0ZTpkaXJlY3RvcnkiLCJjcmVhdGU6ZmlsZXMiLCJkZWxldGU6ZGlyZWN0b3J5IiwiZGVsZXRlOmZpbGVzIiwicmVhZDpkaXJlY3RvcnkiLCJyZWFkOmZpbGVzIiwicmVhZDp1c2VycyIsInVwZGF0ZTpkaXJlY3RvcnkiXSwiZXhwaXJlc0luIjoxNTg0MTQyMTA0MjM4LCJpYXQiOjE1ODQxMzQ5MDQsImV4cCI6MTU4NDE0MjEwNH0.qNiNjtbbabnLzUi-k5s5BdywVKnwpap-SNTkVE6ql00');
/*!40000 ALTER TABLE `key_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_user`
--

DROP TABLE IF EXISTS `rol_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_user` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `type_rol` varchar(45) DEFAULT NULL,
  `key` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_user`
--

LOCK TABLES `rol_user` WRITE;
/*!40000 ALTER TABLE `rol_user` DISABLE KEYS */;
INSERT INTO `rol_user` VALUES (1,'admin','88662d60bc1428bf7d7e86c9f389d49025335b9cd3b70f6ca5b6c5e35b44946a'),(2,'secretary','75d6c468aa70c0b824808c9e86f7261f0edefefb76667b28e28d51056c3792d7'),(3,'intern','56fe5e488af143480911cf178fa325a2a78ee85df7e38e65c509db34db9fcf54');
/*!40000 ALTER TABLE `rol_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scopes`
--

DROP TABLE IF EXISTS `scopes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scopes` (
  `id_scope` int NOT NULL AUTO_INCREMENT,
  `scope` varchar(45) DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  PRIMARY KEY (`id_scope`),
  KEY `id_rol_roles` (`id_rol`),
  CONSTRAINT `id_rol_roles` FOREIGN KEY (`id_rol`) REFERENCES `rol_user` (`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scopes`
--

LOCK TABLES `scopes` WRITE;
/*!40000 ALTER TABLE `scopes` DISABLE KEYS */;
INSERT INTO `scopes` VALUES (35,'read:directory',1),(36,'create:directory',1),(37,'update:directory',1),(38,'delete:directory',1),(39,'create:files',1),(40,'delete:files',1),(41,'read:files',1),(42,'read:roles',1),(43,'read:scopes',1),(44,'create:scope',1),(45,'delete:scope',1),(46,'read:users',1),(47,'create:users',1),(48,'update:users',1),(49,'delete:users',1),(50,'read:directory',2),(51,'create:directory',2),(52,'update:directory',2),(53,'delete:directory',2),(54,'create:files',2),(55,'delete:files',2),(56,'read:files',2),(57,'read:roles',2),(58,'read:scopes',2),(59,'read:users',2),(60,'create:users',2),(61,'update:users',2),(62,'read:directory',3),(63,'create:directory',3),(64,'update:directory',3),(65,'create:files',3),(66,'read:files',3),(67,'delete:files',3),(68,'read:users',3),(69,'delete:directory',3);
/*!40000 ALTER TABLE `scopes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_cocodoc`
--

DROP TABLE IF EXISTS `user_cocodoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_cocodoc` (
  `id_user` int NOT NULL AUTO_INCREMENT COMMENT '2',
  `ci_user` varchar(45) DEFAULT NULL,
  `p_name` varchar(45) DEFAULT NULL,
  `s_name` varchar(45) DEFAULT NULL,
  `p_lastname` varchar(45) DEFAULT NULL,
  `s_lastname` varchar(45) DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  `id_key` int DEFAULT NULL,
  `is_delete` int DEFAULT '0',
  PRIMARY KEY (`id_user`),
  KEY `id_rol_idx` (`id_rol`),
  CONSTRAINT `id_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol_user` (`id_rol`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_cocodoc`
--

LOCK TABLES `user_cocodoc` WRITE;
/*!40000 ALTER TABLE `user_cocodoc` DISABLE KEYS */;
INSERT INTO `user_cocodoc` VALUES (2,'1716715972','giovanny','gabriel','arguello','costta',1,12,0),(3,'1716715973','dayana','pamela','arguello','costta',3,13,1),(4,'1716715974','dylan','andres','arguello','costta',3,14,0);
/*!40000 ALTER TABLE `user_cocodoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cocodoc'
--

--
-- Dumping routines for database 'cocodoc'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_actulizar_usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_actulizar_usuario`(
in _id int,
in cedula varchar(13),
in _p_nombre varchar(45),
in _s_nombre varchar(45),
in _p_apellido varchar(45),
in _s_apellido varchar(45),
in _id_rol int
)
begin 
        if(select id_user from user_cocodoc where id_user = _id) then
			begin
				if(select ci_user from user_cocodoc where ci_user = cedula and id_user != _id)then
					begin 
						select 'La cedula que intenta registrar ya existe' as `MESSAGE_ERROR`;
                    end;
				else
					begin
						update user_cocodoc set ci_user = cedula, p_name = _p_nombre, s_name = _s_nombre, p_lastname = _p_apellido, s_lastname = _s_apellido, id_rol = _id_rol where id_user = _id;
						select cedula as `CédulaUser`, _id as `IdUser`;
                    end;
				end if;
            end;
		else
			begin
				select 'ID no encontrada, verifique los datos ingresado' as `MESSAGE_ERROR`;
            end;
        end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_autenticar_usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_autenticar_usuario`(
in _user varchar(30), 
in _password varchar(30)
)
begin 
		if(SELECT key_user.id_key FROM cocodoc.key_user WHERE key_user.user = _user and key_user.password = sha2(_password,256)) then
			begin
				set @_id = (SELECT key_user.id_key FROM cocodoc.key_user WHERE key_user.user = _user and key_user.password = sha2(_password,256));
				select 
					u.id_user as `ID`,
					u.ci_user as `CEDULA`,
					u.p_name as `PRIMER_NOMBRE`,
					u.s_name as `SEGUNDO_NOMBRE`,
					u.p_lastname as `PRIMER_APELLIDO`,
					u.s_lastname as `SEGUNDO_APELLIDO`, 
					ru.type_rol AS `TIPO_USUARIO`,
					ru.id_rol as `ID_ROL`,
                    ku.id_key as `KEY`,
					ku.new_user as `IS_NEW`,
					ku.state as `STATE`,
					ku.tokenExpirationDate as `TOKEN_EXPIRATION_DATE`,
					ku.activeToken as `ACTIVE_TOKEN`
				from 
					user_cocodoc u 
				inner join rol_user ru 
					on u.id_rol = ru.id_rol 
				inner join key_user ku
					on ku.id_key = u.id_key
				where u.id_key = @_id and u.is_delete = 0;
			end;
		else
			begin
				select 'no autorizado' as `message`;
            end;
		end if;
	end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_buscar_coincidencias` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_buscar_coincidencias`(
in _keyword varchar(30)
)
begin
		select 
			u.id_user as `Id`,
            u.ci_user as `Cédula`,
			u.p_name as `PrimerNombre`,
			u.s_name as `SegundoNombre`,
			u.p_lastname as `PrimerApellido`,
			u.s_lastname as `SegundoApellido`, 
			ru.type_rol AS `TipoUsuario`,
            ru.id_rol as `IdRol`
		from 
			user_cocodoc u 
		inner join 
			rol_user ru 
		on u.id_rol = ru.id_rol
        where u.is_delete = 0 
        and (u.p_lastname like concat('%',_keyword,'%') 
        or u.s_lastname like concat('%',_keyword,'%')
        or u.p_name like concat('%',_keyword,'%') 
        or u.s_name like concat('%',_keyword,'%') 
        or u.ci_user like concat('%',_keyword,'%'));
	end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_cambiar_password` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cambiar_password`(
in _idKey int,
in _newPassword varchar(30)
)
begin 
		if(SELECT key_user.id_key FROM cocodoc.key_user WHERE key_user.id_key = _idKey) then
			begin
				UPDATE cocodoc.key_user SET password = sha2(_newPassword,256),new_user = false,key_user.state = false,key_user.tokenExpirationDate = null, key_user.activeToken = null WHERE id_key = _idKey;
			end;
		end if;
	end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_eliminar_usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_eliminar_usuario`(in _id int)
begin 
        if(select id_user from user_cocodoc where id_user = _id) then
			begin
				declare keys_user int;
                set keys_user = (select id_key from user_cocodoc where id_user = _id );
				-- delete from user_cocodoc u where u.id_user = _id;
				-- delete from key_user k where k.id_key = keys_user;
                UPDATE `cocodoc`.`user_cocodoc`
				SET `is_delete` = 1
				WHERE `id_user` = _id;
				select true as `Usuario eliminado`;
            end;
		else
			begin
				select 'No se encontro ningun registro con esa ID' as `MESSAGE_ERROR`;
            end;
        end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_ingresar_documento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ingresar_documento`(
in _idDocument varchar(30),
in _nameDocument varchar(100),
in _registrationDate timestamp,
in _lastModification timestamp,
in _idFolder varchar(30),
in _idUser varchar(30)
)
begin 
		if(SELECT documents.id_doc FROM cocodoc.documents WHERE documents.name_doc = lower(_nameDocument)) then
			begin
				set @id_document = (SELECT documents.id_doc FROM cocodoc.documents WHERE documents.name_doc = lower(_nameDocument));
				select 'ya existe un documento con el mismo nombre' as `message`, @id_document as `existingDocumentId`;
			end;
		else
			begin
				if(select folders.id_folder from cocodoc.folders where folders.id_folder = _idFolder)then
					begin
						if(select user_cocodoc.id_user from cocodoc.user_cocodoc where user_cocodoc.id_user = _idUser)then
							begin
								INSERT INTO `cocodoc`.`documents`
									(`id_doc`,`name_doc`,`registration_date_doc`,`last_modification_doc`,`id_folder`,`id_user`) 
								VALUES 
									(_idDocument,lower(_nameDocument),_registrationDate,_lastModification,_idFolder,_idUser);
                                select true as `created`, _idDocument as `ID`;
                            end;
                        else
							begin
								select 'usuario no autorizado' as `message`;
                            end;
                        end if;

                    end;
				else
					begin
						select 'la carpeta de destino no existe' as `message`;
                    end;
                end if;
            end;
		end if;
	end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_ingresar_scope` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ingresar_scope`(
in _nameScope varchar(30),
in _key varchar(256)
)
begin 
		if(SELECT rol_user.id_rol FROM cocodoc.rol_user WHERE rol_user.key = _key) then
			begin
				set @_idRol = (SELECT rol_user.id_rol FROM cocodoc.rol_user WHERE rol_user.key = _key);
				if(SELECT scopes.id_scope FROM cocodoc.scopes where scopes.scope = lower(_nameScope) and scopes.id_rol = @_idRol)then
					begin
						select 'ya existe el scope' as `message`;
                    end;
				else
					begin
						INSERT INTO `cocodoc`.`scopes` (`scope`,`id_rol`) VALUES (lower(_nameScope),@_idRol);
						select lower(_nameScope) as `Scope`, _key as `For`;
                    end;
				end if;
			end;
		else
			begin
                SELECT 'no existe el rol' as `message`;
            end;
		end if;
	end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_ingreso_usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ingreso_usuario`(
in cedula varchar(13),
in _p_nombre varchar(45),
in _s_nombre varchar(45),
in _p_apellido varchar(45),
in _s_apellido varchar(45),
in _id_rol int
)
begin 
        declare idKey int;
        declare idUser int;
        if(select ci_user from user_cocodoc where ci_user = cedula) then
			begin 
				select true as `existe`, cedula as `ci`;
			end;
		else 
			begin 
				if(select id_rol from rol_user where id_rol = _id_rol) then
					begin
						INSERT INTO key_user (`user`,`password`,`new_user`,`state`) VALUES (concat(substring(_p_nombre,1,3),substring(_p_apellido,1,3)),sha2(cedula,256),true,false);
						set idKey = last_insert_id();
                        INSERT INTO user_cocodoc (`ci_user`,`p_name`,`s_name`,`p_lastname`,`s_lastname`,`id_rol`,`id_key`,`is_delete`) VALUES (cedula,_p_nombre,_s_nombre,_p_apellido,_s_apellido,_id_rol,idKey,0);
						set idUser = last_insert_id();
                        select idUser as `IdUsuario`, idKey as `IdKeyUser`, cedula as `CédulaUser` ;
					end;
				else
					begin
						select 'No se pudo registrar al usuario' as `ERROR`;
					end;
				end if;
			end;
		end if;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_listar_roles_scopes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listar_roles_scopes`()
begin 
		if(SELECT key_user.id_key FROM cocodoc.key_user WHERE key_user.id_key = _idKey) then
			begin
				UPDATE cocodoc.key_user SET password = sha2(_newPassword,256),new_user = false,key_user.state = false,key_user.tokenExpirationDate = null, key_user.activeToken = null WHERE id_key = _idKey;
			end;
		end if;
	end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_listar_usuarios` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listar_usuarios`()
begin 
        select 
			u.id_user as `Id`,
            u.ci_user as `Cédula`,
			u.p_name as `PrimerNombre`,
			u.s_name as `SegundoNombre`,
			u.p_lastname as `PrimerApellido`,
			u.s_lastname as `SegundoApellido`, 
			ru.type_rol AS `TipoUsuario`,
            ru.id_rol as `IdRol`
		from 
			user_cocodoc u 
		inner join 
			rol_user ru 
		on u.id_rol = ru.id_rol 
        where u.is_delete = 0;
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_obtener_usuario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_obtener_usuario`(in _id int)
begin 
		if(select ci_user from user_cocodoc where id_user = _id) then
			begin
				set @_id = (select user_cocodoc.id_key from user_cocodoc where id_user = _id);
				select 
					u.id_user as `ID`,
					u.ci_user as `CEDULA`,
					u.p_name as `PRIMER_NOMBRE`,
					u.s_name as `SEGUNDO_NOMBRE`,
					u.p_lastname as `PRIMER_APELLIDO`,
					u.s_lastname as `SEGUNDO_APELLIDO`, 
					ru.type_rol AS `TIPO_USUARIO`,
					ru.id_rol as `ID_ROL`,
                    ku.id_key as `KEY`,
					ku.new_user as `IS_NEW`,
					ku.state as `STATE`,
					ku.tokenExpirationDate as `TOKEN_EXPIRATION_DATE`,
					ku.activeToken as `ACTIVE_TOKEN`
				from 
					user_cocodoc u 
				inner join rol_user ru 
					on u.id_rol = ru.id_rol 
				inner join key_user ku
					on ku.id_key = u.id_key
				where u.id_key = @_id and u.is_delete = 0;
			end;
		end if;
	end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-06 14:52:25
