-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2015 a las 13:50:18
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `tesla`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_ins_facturadetalle_servicio`(IN `pFactura` INT, IN `pServicio` INT, IN `pCantidad` INT, IN `pPrecio` FLOAT, IN `pNombre` VARCHAR(30), IN `pTecnico` BIT(1))
    NO SQL
BEGIN 
DECLARE pNumeroSerial INT( 11 ) ; 
update servicio
 set numeroserial = numeroserial+1
WHERE idservicio = pServicio;

INSERT INTO facturaDetalle( idFactura, idServicio, cantidad, precio, nombre, numeroserial, tecnico ) 
select pfactura, pservicio, pcantidad, pprecio,ptecnico, pnombre, numeroserial
  from servicio where idservicio = pservicio;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sel_reporte_facturas`(IN `pfecha1` DATE, IN `pfecha2` DATE)
    READS SQL DATA
    DETERMINISTIC
select f1.idFactura, f1.nombre,f1.serie, f1.numero,f1.nit, f1.direccion,f1.fecha,f1.monto,f1.paciente,f1.formaPago,f2.idServicio,f2.cantidad,f2.precio,f2.numeroserial,f2.nombre  as nombreServicio from factura f1, facturadetalle f2, formapago fp where f1.idFactura =  f2.idFactura and fp.idFormaPago = f1.formaPago and fp.nombre = 'contado'
and fecha between pfecha1 and pfecha2 order by formaPago, fecha$$

--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `sp_ins_factura_servicio`(`pserie` VARCHAR(30), `pnumero` INT(11), `pnombre` VARCHAR(30), `pedad` INT(3), `ptel` INT(8), `pnit` VARCHAR(30), `pdir` VARCHAR(30), `pmonto` FLOAT(10,2), `ppaciente` VARCHAR(30), `pfpago` INT(11)) RETURNS int(11)
    MODIFIES SQL DATA
    DETERMINISTIC
begin
insert into factura ( serie, numero, nombre,edad,telefono, nit,direccion,fecha,monto,paciente, formaPago )
values ( pserie, pnumero, pnombre, pedad, ptel,
        pnit, pdir, now(), pmonto, ppaciente, pfpago );
return last_insert_id();     
end$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `config`
--

CREATE TABLE IF NOT EXISTS `config` (
  `nombre` varchar(20) NOT NULL,
  `dato` varchar(200) NOT NULL,
  `idConfig` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` text NOT NULL,
  `titulo` varchar(100) NOT NULL,
  PRIMARY KEY (`idConfig`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE IF NOT EXISTS `factura` (
  `idFactura` int(11) NOT NULL AUTO_INCREMENT,
  `serie` varchar(30) NOT NULL,
  `numero` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `nit` varchar(30) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `monto` float NOT NULL,
  `paciente` varchar(30) NOT NULL,
  `formaPago` int(11) NOT NULL,
  `edad` int(11) NOT NULL,
  `telefono` int(11) NOT NULL,
  PRIMARY KEY (`idFactura`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=240 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturadetalle`
--

CREATE TABLE IF NOT EXISTS `facturadetalle` (
  `idFacturaDetalle` int(11) NOT NULL AUTO_INCREMENT,
  `idFactura` int(11) NOT NULL,
  `idServicio` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` float NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `numeroserial` int(11) NOT NULL,
  `estado` bit(1) NOT NULL,
  `tecnico` bit(1) NOT NULL,
  PRIMARY KEY (`idFacturaDetalle`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=243 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formapago`
--

CREATE TABLE IF NOT EXISTS `formapago` (
  `idFormaPago` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`idFormaPago`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaprecio`
--

CREATE TABLE IF NOT EXISTS `listaprecio` (
  `idLista` int(11) NOT NULL AUTO_INCREMENT,
  `lista` varchar(30) NOT NULL,
  PRIMARY KEY (`idLista`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precioservicio`
--

CREATE TABLE IF NOT EXISTS `precioservicio` (
  `idPrecioServicio` int(11) NOT NULL AUTO_INCREMENT,
  `idServicio` int(11) NOT NULL,
  `idLista` int(11) NOT NULL,
  `precio` float NOT NULL,
  PRIMARY KEY (`idPrecioServicio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=104 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE IF NOT EXISTS `servicio` (
  `idServicio` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `precio` float NOT NULL,
  `numeroserial` int(11) NOT NULL,
  `tecnico` bit(1) NOT NULL,
  PRIMARY KEY (`idServicio`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=29 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `idUsuarios` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `rol` varchar(20) NOT NULL,
  `pass` varchar(20) NOT NULL,
  `usuario` varchar(20) NOT NULL,
  PRIMARY KEY (`idUsuarios`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
