-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2015 a las 13:49:31
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

--
-- Volcado de datos para la tabla `config`
--

INSERT INTO `config` (`nombre`, `dato`, `idConfig`, `tipo`, `titulo`) VALUES
('maxServiceFac', '5', 1, 'number', 'Numero Max de Servicos'),
('cambioNombre', 'false', 2, 'checkbox', 'Cambiar nombre en factura'),
('cambioPrecio', 'false', 3, 'checkbox', 'Cambiar precio en factura'),
('tituloVentana', 'Tesla', 4, 'text', 'Titulo Ventana');

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

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idFactura`, `serie`, `numero`, `nombre`, `nit`, `direccion`, `fecha`, `monto`, `paciente`, `formaPago`, `edad`, `telefono`) VALUES
(45, 'a', 1223, 'noasd', 'adf', 'pruba', '2015-03-14', 0.65, 'adfer', 1, 0, 0),
(46, 'a', 1223, 'noasd', 'adf', 'pruba', '2015-03-14', 0.65, 'adfer', 1, 0, 0),
(199, 'a', 12, 'jose', '1234', 'guatemala', '2015-04-14', 1.03, 'jose', 1, 18, 50086682),
(200, 'a', 13, 'jose', '2345', 'guatema', '2015-04-14', 1, 'jose', 1, 18, 50086682),
(201, '', 0, '', '', '', '0000-00-00', 324, 'jose', 4, 15, 50086672),
(202, '', 0, '', '', '', '0000-00-00', 4, 'jose', 4, 14, 50086682),
(203, '', 0, '', '', '', '0000-00-00', 4, 'jose', 4, 15, 50086682),
(204, '', 0, '', '', '', '0000-00-00', 32, 'dane', 4, 13, 23456789),
(205, 'q', 234567, 'jose', '876543', 'gut', '2015-04-15', 3, 'jose', 17, 12, 50086682),
(206, 'a', 1, 'jose', '3456', 'guate', '2015-04-15', 1, 'jose', 17, 18, 55085588),
(207, 'a', 2, 'jose', 'wert34', 'guatmal', '2015-04-15', 1, 'jose', 17, 16, 50065432),
(208, 'e', 1, 'jose', 'wer', 'guateama', '2015-04-15', 1, 'jose', 17, 29, 44499321),
(209, 'a', 123, 'jose', '2345er', 'guatemala', '2015-04-16', 8, 'jose', 17, 15, 50086682),
(210, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(211, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(212, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(213, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(214, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(215, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(216, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(217, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(218, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(219, 's', 4, 'prueba', 'w3456', 'guate', '2015-04-16', 1, 'prueba', 17, 23, 12345678),
(220, 'e', 33, 'test', '234', 'guatemala', '2015-04-16', 1, 'test', 17, 15, 12345678),
(221, 'q123', 234, 'pruebas', 'qw', 'guatema', '2015-04-16', 1, 'pruebas', 17, 18, 12345678),
(222, 'a', 3, 'lel', '234569', 'guateala', '2015-04-16', 1, 'lel', 17, 123, 12345678),
(223, 'j', 3, 'lilo', '234055', 'guatemala', '2015-04-16', 1, 'lilo', 17, 14, 12345678),
(224, '2345', 34, 'olo', 'e', 'guatem', '2015-04-16', 1, 'olo', 17, 12, 12345678),
(225, 'e', 35, 'asdf', '2345', 'guatemala', '2015-04-16', 1, 'asdf', 17, 12, 12345678),
(226, '', 0, '', '', '', '2015-04-16', 4, 'pedro', 18, 3, 87654321),
(227, 'a', 12345, 'jose', '12345', 'guatemaa', '2015-04-19', 4, 'jose', 17, 12, 12345678),
(228, 'a', 12345, 'jose', '12345', 'guatemaa', '2015-04-19', 4, 'jose', 17, 12, 12345678),
(229, 'a', 12345, 'jose', '12345', 'guatemaa', '2015-04-19', 4, 'jose', 17, 12, 12345678),
(230, 'a', 234, 'jose', 's', 'guatemal', '2015-04-19', 4, 'jose', 17, 12, 12345678),
(231, 'a', 234, 'jose', 's', 'guatemal', '2015-04-19', 4, 'jose', 17, 12, 12345678),
(232, 'a', 234, 'jose', 's', 'guatemal', '2015-04-19', 4, 'jose', 17, 12, 12345678),
(233, 'a', 234, 'jose', 's', 'guatemal', '2015-04-19', 4, 'jose', 17, 12, 12345678),
(234, 'w', 234, 'jose', 'e', 'guateala', '2015-04-19', 4, 'jose', 17, 13, 12345678),
(235, '1234', 3, 'jose', 'nit', 'gua', '2015-04-19', 4, 'jose', 17, 12, 12345678),
(236, 'w', 35, 'jose', 'w', 'jose', '2015-04-19', 4, 'jose', 17, 13, 12345678),
(237, 'prr', 2345, 'jose', 'prue', 'guateala', '2015-04-19', 3, 'jose', 17, 13, 12345678),
(238, 'prr', 2345, 'jose', 'prue', 'guateala', '2015-04-19', 3, 'jose', 17, 13, 12345678),
(239, 'prr', 2345, 'jose', 'prue', 'guateala', '2015-04-19', 3, 'jose', 17, 13, 12345678);

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

--
-- Volcado de datos para la tabla `facturadetalle`
--

INSERT INTO `facturadetalle` (`idFacturaDetalle`, `idFactura`, `idServicio`, `cantidad`, `precio`, `nombre`, `numeroserial`, `estado`, `tecnico`) VALUES
(240, 236, 27, 1, 3, 'te', 9, b'0', b'0'),
(241, 236, 28, 1, 1, 'la', 9, b'0', b'0'),
(242, 239, 27, 1, 3, '1', 0, b'0', b'1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formapago`
--

CREATE TABLE IF NOT EXISTS `formapago` (
  `idFormaPago` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  PRIMARY KEY (`idFormaPago`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `formapago`
--

INSERT INTO `formapago` (`idFormaPago`, `nombre`) VALUES
(17, 'contado'),
(18, 'pruebas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaprecio`
--

CREATE TABLE IF NOT EXISTS `listaprecio` (
  `idLista` int(11) NOT NULL AUTO_INCREMENT,
  `lista` varchar(30) NOT NULL,
  PRIMARY KEY (`idLista`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Volcado de datos para la tabla `listaprecio`
--

INSERT INTO `listaprecio` (`idLista`, `lista`) VALUES
(17, 'contado'),
(18, 'prueba');

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

--
-- Volcado de datos para la tabla `precioservicio`
--

INSERT INTO `precioservicio` (`idPrecioServicio`, `idServicio`, `idLista`, `precio`) VALUES
(4, 11, 4, 4),
(9, 12, 4, 7),
(13, 13, 4, 1),
(17, 14, 4, 15),
(21, 15, 4, 324),
(29, 17, 4, 1),
(33, 18, 4, 1),
(34, 11, 7, 0),
(35, 12, 7, 0),
(36, 13, 7, 0),
(37, 14, 7, 0),
(38, 15, 7, 0),
(39, 16, 7, 0),
(40, 17, 7, 0),
(41, 18, 7, 0),
(42, 11, 8, 0),
(43, 12, 8, 0),
(44, 13, 8, 0),
(45, 14, 8, 0),
(46, 15, 8, 0),
(47, 16, 8, 0),
(48, 17, 8, 0),
(49, 18, 8, 0),
(50, 11, 9, 0),
(51, 12, 9, 0),
(52, 13, 9, 0),
(53, 14, 9, 0),
(54, 15, 9, 0),
(55, 16, 9, 0),
(56, 17, 9, 0),
(57, 18, 9, 0),
(58, 11, 10, 0),
(59, 12, 10, 0),
(60, 13, 10, 0),
(61, 14, 10, 0),
(62, 15, 10, 0),
(63, 16, 10, 0),
(64, 17, 10, 0),
(65, 18, 10, 0),
(66, 11, 11, 0),
(67, 12, 11, 0),
(68, 13, 11, 0),
(69, 14, 11, 0),
(70, 15, 11, 0),
(71, 16, 11, 0),
(72, 17, 11, 0),
(73, 18, 11, 0),
(74, 11, 12, 0),
(75, 12, 12, 0),
(76, 13, 12, 0),
(77, 14, 12, 0),
(78, 15, 12, 0),
(79, 16, 12, 0),
(80, 17, 12, 0),
(81, 18, 12, 0),
(82, 11, 14, 0),
(83, 12, 14, 0),
(84, 13, 14, 0),
(85, 14, 14, 0),
(86, 15, 14, 0),
(87, 16, 14, 0),
(88, 17, 14, 0),
(89, 18, 14, 0),
(90, 22, 17, 1),
(91, 22, 18, 4),
(92, 23, 17, 1.03),
(93, 23, 18, 1.03),
(94, 24, 17, 3),
(95, 24, 18, 3),
(96, 25, 17, 1),
(97, 25, 18, 1),
(98, 26, 17, 3),
(99, 26, 18, 3),
(100, 27, 17, 3),
(101, 27, 18, 3),
(102, 28, 17, 1),
(103, 28, 18, 1);

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

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`idServicio`, `nombre`, `precio`, `numeroserial`, `tecnico`) VALUES
(25, 'as', 0, 3, b'1'),
(26, 'tes', 0, 3, b'1'),
(27, 'te', 0, 10, b'1'),
(28, 'la', 0, 9, b'0');

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

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuarios`, `nombre`, `rol`, `pass`, `usuario`) VALUES
(1, 'root', 'root', 'root', 'root'),
(20, 'usuario14', 'cajero', '123', 'usuario14'),
(21, 'usuario150', 'cajero', '1230', 'usuario150'),
(23, 'prueba', 'cajero', '123', 'return'),
(28, '1', 'cajero', '1', '1'),
(29, '2', 'tecnico', '2', '2'),
(30, 'a', 'cajero', 'a', 'a');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
