-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-06-2025 a las 17:35:52
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
-- Estructura de tabla para la tabla `test_casm83`
--

CREATE TABLE `test_casm83` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `categoria` varchar(10) NOT NULL,
  `total` int(11) NOT NULL,
  `count_a` int(11) NOT NULL,
  `count_b` int(11) NOT NULL,
  `sexo` enum('Masculino','Femenino') NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test_casm83`
--

INSERT INTO `test_casm83` (`id`, `id_usuario`, `categoria`, `total`, `count_a`, `count_b`, `sexo`, `fecha`) VALUES
(326, 8, 'CCFM', 0, 0, 0, 'Masculino', '2025-06-22'),
(327, 8, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-22'),
(328, 8, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-22'),
(329, 8, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-22'),
(330, 8, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-22'),
(331, 8, 'BURO', 0, 0, 0, 'Masculino', '2025-06-22'),
(332, 8, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-22'),
(333, 8, 'HAA', 0, 0, 0, 'Masculino', '2025-06-22'),
(334, 8, 'FINA', 0, 0, 0, 'Masculino', '2025-06-22'),
(335, 8, 'LING', 0, 0, 0, 'Masculino', '2025-06-22'),
(336, 8, 'JURI', 0, 0, 0, 'Masculino', '2025-06-22'),
(337, 8, 'VERA', 0, 0, 0, 'Masculino', '2025-06-22'),
(338, 8, 'CONS', 0, 0, 0, 'Masculino', '2025-06-22'),
(339, 3, 'CCFM', 16, 10, 6, 'Masculino', '2025-06-25'),
(340, 3, 'CCSS', 19, 8, 11, 'Masculino', '2025-06-25'),
(341, 3, 'CCNA', 15, 6, 9, 'Masculino', '2025-06-25'),
(342, 3, 'CCCO', 14, 7, 7, 'Masculino', '2025-06-25'),
(343, 3, 'ARTE', 10, 6, 4, 'Masculino', '2025-06-25'),
(344, 3, 'BURO', 11, 3, 8, 'Masculino', '2025-06-25'),
(345, 3, 'CCEP', 15, 8, 7, 'Masculino', '2025-06-25'),
(346, 3, 'HAA', 13, 7, 6, 'Masculino', '2025-06-25'),
(347, 3, 'FINA', 15, 8, 7, 'Masculino', '2025-06-25'),
(348, 3, 'LING', 12, 5, 7, 'Masculino', '2025-06-25'),
(349, 3, 'JURI', 5, 5, 0, 'Masculino', '2025-06-25'),
(350, 3, 'VERA', 5, 5, 0, 'Masculino', '2025-06-25'),
(351, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-25'),
(352, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-06-25'),
(353, 3, 'CCSS', 1, 1, 0, 'Masculino', '2025-06-25'),
(354, 3, 'CCNA', 1, 0, 1, 'Masculino', '2025-06-25'),
(355, 3, 'CCCO', 1, 0, 1, 'Masculino', '2025-06-25'),
(356, 3, 'ARTE', 1, 0, 1, 'Masculino', '2025-06-25'),
(357, 3, 'BURO', 1, 0, 1, 'Masculino', '2025-06-25'),
(358, 3, 'CCEP', 1, 0, 1, 'Masculino', '2025-06-25'),
(359, 3, 'HAA', 1, 0, 1, 'Masculino', '2025-06-25'),
(360, 3, 'FINA', 1, 0, 1, 'Masculino', '2025-06-25'),
(361, 3, 'LING', 1, 0, 1, 'Masculino', '2025-06-25'),
(362, 3, 'JURI', 1, 0, 1, 'Masculino', '2025-06-25'),
(363, 3, 'VERA', 2, 2, 0, 'Masculino', '2025-06-25'),
(364, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-25');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `test_casm83`
--
ALTER TABLE `test_casm83`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `test_casm83`
--
ALTER TABLE `test_casm83`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=365;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `test_casm83`
--
ALTER TABLE `test_casm83`
  ADD CONSTRAINT `test_casm83_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
