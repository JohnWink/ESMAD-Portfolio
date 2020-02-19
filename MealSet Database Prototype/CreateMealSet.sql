-- MySQL Script generated by MySQL Workbench
-- Thu Jan 23 18:27:35 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Localidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Localidade` (
  `Codigo_postal` INT NOT NULL,
  `Localidade` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Codigo_postal`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Restaurante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Restaurante` (
  `idRestaurante` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `descrição` VARCHAR(45) NOT NULL,
  `coverFoto` BLOB NOT NULL,
  `estacionamento` TINYINT NOT NULL,
  `Codigo_postal` INT NOT NULL,
  PRIMARY KEY (`idRestaurante`, `Codigo_postal`),
  INDEX `fk_Restaurante_Localidade1_idx` (`Codigo_postal` ASC) VISIBLE,
  CONSTRAINT `fk_Restaurante_Localidade1`
    FOREIGN KEY (`Codigo_postal`)
    REFERENCES `mydb`.`Localidade` (`Codigo_postal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Prato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Prato` (
  `idPrato` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `descrição` VARCHAR(45) NOT NULL,
  `preço` VARCHAR(45) NOT NULL,
  `foto` BLOB NOT NULL,
  `idRestaurante` INT NOT NULL,
  PRIMARY KEY (`idPrato`, `idRestaurante`),
  INDEX `fk_Prato_Restaurante_idx` (`idRestaurante` ASC) VISIBLE,
  CONSTRAINT `fk_Prato_Restaurante`
    FOREIGN KEY (`idRestaurante`)
    REFERENCES `mydb`.`Restaurante` (`idRestaurante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cliente` (
  `idCliente` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `contacto` VARCHAR(45) NOT NULL,
  `avatar` BLOB NULL,
  `password` VARCHAR(45) NOT NULL,
  `dieta` VARCHAR(45) NULL,
  `Codigo_postal` INT NOT NULL,
  PRIMARY KEY (`idCliente`, `Codigo_postal`),
  INDEX `fk_Cliente_Localidade1_idx` (`Codigo_postal` ASC) VISIBLE,
  CONSTRAINT `fk_Cliente_Localidade1`
    FOREIGN KEY (`Codigo_postal`)
    REFERENCES `mydb`.`Localidade` (`Codigo_postal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Prato_Rating`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Prato_Rating` (
  `idPrato` INT NOT NULL,
  `idCliente` INT NOT NULL,
  `Estrelas` INT NOT NULL,
  PRIMARY KEY (`idPrato`, `idCliente`),
  INDEX `idCliente_idx` (`idCliente` ASC) VISIBLE,
  CONSTRAINT `idPrato`
    FOREIGN KEY (`idPrato`)
    REFERENCES `mydb`.`Prato` (`idPrato`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `idCliente`
    FOREIGN KEY (`idCliente`)
    REFERENCES `mydb`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Reserva` (
  `idCliente` INT NOT NULL,
  `idRestaurante` INT NOT NULL,
  `horário` DATETIME NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `n_pessoas` INT NOT NULL,
  PRIMARY KEY (`idCliente`, `idRestaurante`),
  INDEX `fk_Reserva_Cliente1_idx` (`idCliente` ASC) VISIBLE,
  INDEX `fk_Reserva_Restaurante1_idx` (`idRestaurante` ASC) VISIBLE,
  CONSTRAINT `fk_Reserva_Cliente1`
    FOREIGN KEY (`idCliente`)
    REFERENCES `mydb`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reserva_Restaurante1`
    FOREIGN KEY (`idRestaurante`)
    REFERENCES `mydb`.`Restaurante` (`idRestaurante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Mesa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Mesa` (
  `idMesa` INT NOT NULL,
  `idRestaurante` INT NOT NULL,
  `tamanho` INT NOT NULL,
  `descrição` VARCHAR(45) NOT NULL,
  `fumadores` TINYINT NOT NULL,
  `esplanada` TINYINT NOT NULL,
  `morada` VARCHAR(300) NOT NULL,
  `gps` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`idMesa`, `idRestaurante`),
  INDEX `fk_Mesa_Restaurante1_idx` (`idRestaurante` ASC) VISIBLE,
  CONSTRAINT `fk_Mesa_Restaurante1`
    FOREIGN KEY (`idRestaurante`)
    REFERENCES `mydb`.`Restaurante` (`idRestaurante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Composição`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Composição` (
  `idComposição` INT NOT NULL,
  `ingrediante` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idComposição`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Patro_Composição`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Patro_Composição` (
  `idPrato` INT NOT NULL,
  `idComposição` INT NOT NULL,
  PRIMARY KEY (`idPrato`, `idComposição`),
  INDEX `fk_Patro_Composição_Composição1_idx` (`idComposição` ASC) VISIBLE,
  INDEX `fk_Patro_Composição_Prato1_idx` (`idPrato` ASC) VISIBLE,
  CONSTRAINT `fk_Patro_Composição_Composição1`
    FOREIGN KEY (`idComposição`)
    REFERENCES `mydb`.`Composição` (`idComposição`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Patro_Composição_Prato1`
    FOREIGN KEY (`idPrato`)
    REFERENCES `mydb`.`Prato` (`idPrato`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Preferência_Personalizada`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Preferência_Personalizada` (
  `idCliente` INT NOT NULL,
  `idComposição` INT NOT NULL,
  PRIMARY KEY (`idCliente`, `idComposição`),
  INDEX `fk_Preferência_Personalizada_Cliente1_idx` (`idCliente` ASC) VISIBLE,
  INDEX `fk_Preferência_Personalizada_Composição1_idx` (`idComposição` ASC) VISIBLE,
  CONSTRAINT `fk_Preferência_Personalizada_Cliente1`
    FOREIGN KEY (`idCliente`)
    REFERENCES `mydb`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Preferência_Personalizada_Composição1`
    FOREIGN KEY (`idComposição`)
    REFERENCES `mydb`.`Composição` (`idComposição`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Acesso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Acesso` (
  `idRestaurante` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `contacto` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRestaurante`, `username`),
  CONSTRAINT `idRestaurante`
    FOREIGN KEY (`idRestaurante`)
    REFERENCES `mydb`.`Restaurante` (`idRestaurante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Rating_Restaurante`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Rating_Restaurante` (
  `Restaurante_idRestaurante` INT NOT NULL,
  `Cliente_idCliente` INT NOT NULL,
  `rating` INT NOT NULL,
  `Comentário` VARCHAR(300) NOT NULL,
  `data_hora` DATETIME NOT NULL,
  `data_prato_do_dia` DATETIME NULL,
  PRIMARY KEY (`Restaurante_idRestaurante`, `Cliente_idCliente`),
  INDEX `fk_Rating_Restaurante_Restaurante1_idx` (`Restaurante_idRestaurante` ASC) VISIBLE,
  INDEX `fk_Rating_Restaurante_Cliente1_idx` (`Cliente_idCliente` ASC) VISIBLE,
  CONSTRAINT `fk_Rating_Restaurante_Restaurante1`
    FOREIGN KEY (`Restaurante_idRestaurante`)
    REFERENCES `mydb`.`Restaurante` (`idRestaurante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rating_Restaurante_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `mydb`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Mesa_Reserva`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Mesa_Reserva` (
  `idCliente` INT NOT NULL,
  `idMesa` INT NOT NULL,
  `idRestaurante` INT NOT NULL,
  `horario` DATETIME NOT NULL,
  `vaga` TINYINT(1) NOT NULL,
  PRIMARY KEY (`idCliente`, `idMesa`, `idRestaurante`),
  INDEX `idMesa_idx` (`idMesa` ASC) VISIBLE,
  INDEX `fk_Mesa_Reserva_idRestaurante_idx` (`idRestaurante` ASC) VISIBLE,
  CONSTRAINT `fk_Mesa_Reserva_Cliente`
    FOREIGN KEY (`idCliente`)
    REFERENCES `mydb`.`Reserva` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mesa_Reserva_idMesa`
    FOREIGN KEY (`idMesa`)
    REFERENCES `mydb`.`Mesa` (`idMesa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mesa_Reserva_idRestaurante`
    FOREIGN KEY (`idRestaurante`)
    REFERENCES `mydb`.`Restaurante` (`idRestaurante`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;