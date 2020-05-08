-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema cocodoc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cocodoc
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `cocodoc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;

use `cocodoc`;
-- -----------------------------------------------------
-- Table `cocodoc`.`folders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocodoc`.`folders` (
  `id_folder` VARCHAR(45) NOT NULL,
  `name_folder` VARCHAR(1000) NULL DEFAULT NULL,
  `cod_folder` VARCHAR(100) NULL DEFAULT NULL,
  `path_system_folder` VARCHAR(1000) NULL DEFAULT NULL,
  `path_user_folder` VARCHAR(1000) NULL DEFAULT NULL,
  `is_root` INT NULL DEFAULT '0',
  PRIMARY KEY (`id_folder`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cocodoc`.`rol_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocodoc`.`rol_user` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `type_rol` VARCHAR(45) NULL DEFAULT NULL,
  `key` VARCHAR(256) NULL DEFAULT NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cocodoc`.`user_cocodoc`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocodoc`.`user_cocodoc` (
  `id_user` INT NOT NULL AUTO_INCREMENT COMMENT '2',
  `ci_user` VARCHAR(45) NULL DEFAULT NULL,
  `p_name` VARCHAR(45) NULL DEFAULT NULL,
  `s_name` VARCHAR(45) NULL DEFAULT NULL,
  `p_lastname` VARCHAR(45) NULL DEFAULT NULL,
  `s_lastname` VARCHAR(45) NULL DEFAULT NULL,
  `id_rol` INT NULL DEFAULT NULL,
  `id_key` INT NULL DEFAULT NULL,
  `is_delete` INT NULL DEFAULT '0',
  PRIMARY KEY (`id_user`),
  INDEX `id_rol_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `id_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `cocodoc`.`rol_user` (`id_rol`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cocodoc`.`documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocodoc`.`documents` (
  `id_doc` VARCHAR(45) NOT NULL,
  `name_doc` VARCHAR(100) NULL DEFAULT NULL,
  `registration_date_doc` DATETIME NULL DEFAULT NULL,
  `last_modification_doc` DATETIME NULL DEFAULT NULL,
  `id_folder` VARCHAR(45) NULL DEFAULT NULL,
  `id_user` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_doc`),
  INDEX `id_folder_idx` (`id_folder` ASC) VISIBLE,
  INDEX `id_user_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `id_folder`
    FOREIGN KEY (`id_folder`)
    REFERENCES `cocodoc`.`folders` (`id_folder`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `cocodoc`.`user_cocodoc` (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cocodoc`.`key_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocodoc`.`key_user` (
  `id_key` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(256) NULL DEFAULT NULL,
  `new_user` TINYINT NULL DEFAULT NULL,
  `state` TINYINT NULL DEFAULT NULL,
  `tokenExpirationDate` DATETIME NULL DEFAULT NULL,
  `activeToken` VARCHAR(1000) NULL DEFAULT NULL,
  PRIMARY KEY (`id_key`))
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `cocodoc`.`scopes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cocodoc`.`scopes` (
  `id_scope` INT NOT NULL AUTO_INCREMENT,
  `scope` VARCHAR(45) NULL DEFAULT NULL,
  `id_rol` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_scope`),
  INDEX `id_rol_roles` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `id_rol_roles`
    FOREIGN KEY (`id_rol`)
    REFERENCES `cocodoc`.`rol_user` (`id_rol`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 70
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- procedure sp_actulizar_usuario
-- -----------------------------------------------------

drop procedure if exists sp_actulizar_usuario;
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
end;



-- -----------------------------------------------------
-- procedure sp_autenticar_usuario
-- -----------------------------------------------------


drop procedure if exists sp_autenticar_usuario;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_autenticar_usuario`(
in _user varchar(30), 
in _password varchar(30)
)
begin 
		if(SELECT key_user.id_key FROM key_user WHERE key_user.user = _user and key_user.password = sha2(_password,256)) then
			begin
				set @_id = (SELECT key_user.id_key FROM key_user WHERE key_user.user = _user and key_user.password = sha2(_password,256));
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
	end;



-- -----------------------------------------------------
-- procedure sp_buscar_coincidencias
-- -----------------------------------------------------

drop procedure if exists sp_buscar_coincidencias;
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
	end;


-- -----------------------------------------------------
-- procedure sp_cambiar_password
-- -----------------------------------------------------

drop procedure if exists sp_cambiar_password;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cambiar_password`(
in _idKey int,
in _newPassword varchar(30)
)
begin 
		if(SELECT key_user.id_key FROM key_user WHERE key_user.id_key = _idKey) then
			begin
				UPDATE key_user SET password = sha2(_newPassword,256),new_user = false,key_user.state = false,key_user.tokenExpirationDate = null, key_user.activeToken = null WHERE id_key = _idKey;
			end;
		end if;
	end;



-- -----------------------------------------------------
-- procedure sp_eliminar_usuario
-- -----------------------------------------------------


drop procedure if exists sp_eliminar_usuario;
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
end;


-- -----------------------------------------------------
-- procedure sp_ingresar_documento
-- -----------------------------------------------------

drop procedure if exists sp_ingresar_documento;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ingresar_documento`(
in _idDocument varchar(30),
in _nameDocument varchar(100),
in _registrationDate timestamp,
in _lastModification timestamp,
in _idFolder varchar(30),
in _idUser varchar(30)
)
begin 
		if(SELECT documents.id_doc FROM documents WHERE documents.name_doc = lower(_nameDocument)) then
			begin
				set @id_document = (SELECT documents.id_doc FROM documents WHERE documents.name_doc = lower(_nameDocument));
				select 'ya existe un documento con el mismo nombre' as `message`, @id_document as `existingDocumentId`;
			end;
		else
			begin
				if(select folders.id_folder from folders where folders.id_folder = _idFolder)then
					begin
						if(select user_cocodoc.id_user from user_cocodoc where user_cocodoc.id_user = _idUser)then
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
	end;

-- -----------------------------------------------------
-- procedure sp_ingresar_scope
-- -----------------------------------------------------


drop procedure if exists sp_ingresar_scope;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ingresar_scope`(
in _nameScope varchar(30),
in _key varchar(256)
)
begin 
		if(SELECT rol_user.id_rol FROM rol_user WHERE rol_user.key = _key) then
			begin
				set @_idRol = (SELECT rol_user.id_rol FROM rol_user WHERE rol_user.key = _key);
				if(SELECT scopes.id_scope FROM scopes where scopes.scope = lower(_nameScope) and scopes.id_rol = @_idRol)then
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
	end;


-- -----------------------------------------------------
-- procedure sp_ingreso_usuario
-- -----------------------------------------------------

drop procedure if exists sp_ingreso_usuario;
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
				UPDATE `cocodoc`.`user_cocodoc`
				SET `is_delete` = 0
				WHERE `ci_user` = cedula;

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
end;

-- -----------------------------------------------------
-- procedure sp_listar_roles_scopes
-- -----------------------------------------------------

drop procedure if exists sp_listar_roles_scopes;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_listar_roles_scopes`()
begin 
		if(SELECT key_user.id_key FROM key_user WHERE key_user.id_key = _idKey) then
			begin
				UPDATE key_user SET password = sha2(_newPassword,256),new_user = false,key_user.state = false,key_user.tokenExpirationDate = null, key_user.activeToken = null WHERE id_key = _idKey;
			end;
		end if;
	end;

-- -----------------------------------------------------
-- procedure sp_listar_usuarios
-- -----------------------------------------------------

drop procedure if exists sp_listar_usuarios;
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
end;

-- -----------------------------------------------------
-- procedure sp_obtener_usuario
-- -----------------------------------------------------

drop procedure if exists sp_obtener_usuario;
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
	end;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
