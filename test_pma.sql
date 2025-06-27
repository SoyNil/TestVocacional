-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2025 a las 18:01:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test_vocacional`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test_pma`
--

CREATE TABLE `test_pma` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `factorV` varchar(10) NOT NULL,
  `factorE` varchar(10) NOT NULL,
  `factorR` varchar(10) NOT NULL,
  `factorN` varchar(10) NOT NULL,
  `factorF` varchar(10) NOT NULL,
  `puntajeTotal` decimal(10,2) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test_pma`
--

INSERT INTO `test_pma` (`id`, `id_usuario`, `factorV`, `factorE`, `factorR`, `factorN`, `factorF`, `puntajeTotal`, `fecha`) VALUES
(1, 3, '2', '0', '0', '0', '0', 3.00, '2025-06-21'),
(2, 3, '0', '0', '0', '0', '0', 0.00, '2025-06-21'),
(8, 3, '2', '0', '0', '0', '1', 4.00, '2025-06-22'),
(9, 8, '0', '0', '0', '0', '0', 0.00, '2025-06-22'),
(10, 3, '49', '20', '28', '66', '41', 256.00, '2025-06-25');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `test_pma`
--
ALTER TABLE `test_pma`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `test_pma`
--
ALTER TABLE `test_pma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `test_pma`
--
ALTER TABLE `test_pma`
  ADD CONSTRAINT `test_pma_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
