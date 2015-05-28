DROP PROCEDURE `sp_sel_reporte_facturas`; CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sel_reporte_facturas`(IN `pfecha1` DATE, IN `pfecha2` DATE) DETERMINISTIC READS SQL DATA SQL SECURITY DEFINER select f1.idFactura, f1.nombre,f1.serie, f1.numero,f1.nit, f1.direccion,f1.fecha,f1.monto,f1.paciente,f1.formaPago,f2.idServicio,f2.cantidad,f2.precio,f2.numeroserial,f2.nombre as nombreServicio from factura f1, facturadetalle f2, formapago fp where f1.idFactura = f2.idFactura and fp.idFormaPago = f1.formaPago and LOWER(fp.nombre) = 'contado' and fecha between pfecha1 and pfecha2 order by formaPago, fecha

DROP PROCEDURE `sp_sel_reporte_serv_no_fact`; CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_sel_reporte_serv_no_fact`() DETERMINISTIC NO SQL SQL SECURITY DEFINER SELECT s.nombre , f.precio,f.nombre, f.cantidad , f.numeroserial FROM factura fa, facturadetalle f , servicio s, formapago fp where f.idServicio = s.idServicio and fa.idFactura = f.idFactura and fp.idFormaPago = fa.formaPago and LOWER(fa.formaPago) <> 'contado'