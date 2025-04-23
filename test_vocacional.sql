-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2025 a las 07:11:07
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
-- Estructura de tabla para la tabla `test_casm85`
--

CREATE TABLE `test_casm85` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `area` varchar(100) DEFAULT NULL,
  `puntaje` int(11) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test_casm85`
--

INSERT INTO `test_casm85` (`id`, `id_usuario`, `area`, `puntaje`, `categoria`, `fecha`) VALUES
(1, 3, '¿CÓMO ESTUDIA USTED?', 1, 'NEGATIVO', '2025-04-23'),
(2, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-04-23'),
(3, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-04-23'),
(4, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-04-23'),
(5, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-04-23'),
(6, 3, '¿CÓMO ESTUDIA USTED?', 5, 'TENDENCIA POSITIVA', '2025-04-23'),
(7, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-04-23'),
(8, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-04-23'),
(9, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-04-23'),
(10, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-04-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `sexo` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre_usuario`, `nombre`, `sexo`, `fecha_nacimiento`, `apellido`, `correo`, `contraseña`, `fecha_creacion`) VALUES
(3, 'Nil_14', 'Nilton', 'Masculino', '2004-04-14', 'Tolentino Rojas', 'nilton@gmail.com', '$2y$10$xhAA37vR0JI5ufzr.sAZROgJv4etKWTqhQ22c7sgoPhowpeuoK5fW', '2025-04-22 21:51:12');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  ADD CONSTRAINT `test_casm85_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
