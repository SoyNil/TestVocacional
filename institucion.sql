-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2025 a las 19:14:35
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
-- Estructura de tabla para la tabla `institucion`
--

CREATE TABLE `institucion` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Apellido` varchar(100) NOT NULL,
  `DNI` varchar(8) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  `Sexo` enum('Masculino','Femenino','Otro') NOT NULL,
  `Institucion` varchar(100) NOT NULL,
  `Nombre_Apoderado` varchar(100) NOT NULL,
  `Telefono_Apoderado` varchar(9) NOT NULL,
  `Correo_Apoderado` varchar(100) NOT NULL
) ;

--
-- Volcado de datos para la tabla `institucion`
--

INSERT INTO `institucion` (`id`, `nombre_usuario`, `Nombre`, `Apellido`, `DNI`, `contraseña`, `Fecha_Nacimiento`, `Sexo`, `Institucion`, `Nombre_Apoderado`, `Telefono_Apoderado`, `Correo_Apoderado`) VALUES
(8, 'Nilton_Tolentino', 'Nilton', 'Tolentino', '12345678', '$2y$10$TrbrdOsPqjpHwWztWHbKPumy7T4Be6moy48kjOLd5wUUbIeyOBa1a', '2000-01-15', 'Masculino', 'Colegio San Marcos', 'María Gómez', '987654321', 'maria@example.com'),
(9, 'Ana_Lopez', 'Ana', 'Lopez', '87654321', '$2y$10$.43yKlenDLGT3sTLKh6eLuYuA0GyPskDGwtZP0OoLlm8kjehkRQB6', '1999-05-20', 'Femenino', 'Colegio Santa Rosa', 'Carlos López', '912345678', 'carlos@example.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `DNI` (`DNI`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `institucion`
--
ALTER TABLE `institucion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
