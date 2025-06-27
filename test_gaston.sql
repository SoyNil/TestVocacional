-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2025 a las 18:01:56
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
-- Estructura de tabla para la tabla `test_gaston`
--

CREATE TABLE `test_gaston` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `emotividad` int(11) NOT NULL,
  `actividad` int(11) NOT NULL,
  `resonancia` int(11) NOT NULL,
  `tipo_caracterologico` varchar(50) NOT NULL,
  `formula_caracterologica` varchar(10) NOT NULL,
  `fecha` date NOT NULL,
  `sexo` char(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test_gaston`
--

INSERT INTO `test_gaston` (`id`, `id_usuario`, `emotividad`, `actividad`, `resonancia`, `tipo_caracterologico`, `formula_caracterologica`, `fecha`, `sexo`) VALUES
(1, 3, 34, 90, 10, 'Sanguíneo', 'NEAP', '2025-06-26', ''),
(2, 3, 50, 42, 38, 'Amorfo', 'NENAP', '2025-06-26', ''),
(3, 3, 58, 34, 42, 'Nervioso', 'ENAP', '2025-06-26', ''),
(4, 3, 58, 26, 10, 'Nervioso', 'ENAP', '2025-06-26', ''),
(5, 3, 58, 34, 38, 'Nervioso', 'ENAP', '2025-06-26', 'Masculino');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `test_gaston`
--
ALTER TABLE `test_gaston`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `test_gaston`
--
ALTER TABLE `test_gaston`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `test_gaston`
--
ALTER TABLE `test_gaston`
  ADD CONSTRAINT `test_gaston_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
