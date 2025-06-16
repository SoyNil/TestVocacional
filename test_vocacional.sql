-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-06-2025 a las 08:10:14
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
-- Estructura de tabla para la tabla `analisis_casm83`
--

CREATE TABLE `analisis_casm83` (
  `id` bigint(20) NOT NULL,
  `grupo_hash` varchar(255) NOT NULL,
  `analisis` text NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `analisis_casm83`
--

INSERT INTO `analisis_casm83` (`id`, `grupo_hash`, `analisis`, `fecha_creacion`) VALUES
(18, '61fabc68bbd2e4170b461ce337b5ba36a290fba137325c765d420253bf6917d7', 'Los resultados del Test CASM-83 indican una notable ausencia de intereses vocacionales definidos en las 13 categorías evaluadas. Con un puntaje de 2 en CCFM y 0 en todas las demás categorías, se observa un desinterés generalizado en áreas como ciencias, arte, oficios y profesiones. Este patrón sugiere que el participante masculino podría estar en una etapa de exploración o indecisión respecto a sus intereses y objetivos profesionales. Es importante destacar que la falta de intereses definidos no implica una falta de capacidad o potencial, sino más bien una oportunidad para explorar y descubrir nuevas áreas de interés. Se recomienda que el participante se involucre en actividades y experiencias que le permitan descubrir sus fortalezas y pasiones, y que busque orientación vocacional para encontrar carreras y campos que se alineen con sus habilidades y valores.', '2025-06-15 23:40:41'),
(19, '360b45143e92ba75a0032a239ce0519d3caa8b9628f993153ee12186d81bdfa7', 'Los resultados del Test CASM-83 indican que el participante masculino muestra un patrón de desinterés generalizado en todas las 13 categorías evaluadas. Con puntajes muy bajos en cada área, desde CCFM hasta CONS, y niveles clasificados como \"Desinterés\" en todas ellas, se sugiere que el individuo no tiene preferencias vocacionales claras o destacadas en ninguno de los campos evaluados. Esto podría indicar una falta de exploración de intereses o una indecisión significativa en cuanto a la orientación vocacional. Es importante destacar que la ausencia de intereses destacados no necesariamente implica una falta de capacidad, sino más bien la necesidad de una mayor exploración y reflexión sobre las propias inclinaciones y pasiones. Se recomienda al participante involucrarse en actividades de exploración vocacional, buscar mentorías o asesoramiento profesional para descubrir áreas de interés y potencial que aún no han sido identificadas.', '2025-06-15 23:43:23'),
(24, '209a0f6b4bcaf09ee5e343fc2d4343a39d223e9810a09d5288068684ad560183', 'Los resultados del Test CASM-83 indican una ausencia total de intereses vocacionales en todas las categorías evaluadas, lo que sugiere una falta de dirección o pasión clara en el ámbito profesional. Con puntajes de 0 en todas las áreas, desde CCFM hasta CONS, y un nivel de desinterés en cada una, se puede inferir que el participante no ha encontrado una área que lo motive o atraiga significativamente. Esto puede ser un indicador de que es necesario explorar más a fondo las preferencias y habilidades del individuo para identificar posibles intereses ocultos o áreas que podrían ser desarrolladas con mayor exposición o experiencia. Es importante considerar que esta falta de interés puede deberse a una variedad de factores, incluyendo la falta de exposición a diferentes campos o la necesidad de una mayor exploración personal. Se recomienda una evaluación más profunda y una guía vocacional para ayudar al participante a découvrir sus verdaderas pasiones y fortalezas, y así poder orientarse hacia un camino profesional que sea más satisfactorio y acorde a sus capacidades y deseos.', '2025-06-16 01:09:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis_casm85`
--

CREATE TABLE `analisis_casm85` (
  `id` int(11) NOT NULL,
  `grupo_hash` varchar(64) NOT NULL,
  `analisis_texto` text NOT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `analisis_casm85`
--

INSERT INTO `analisis_casm85` (`id`, `grupo_hash`, `analisis_texto`, `fecha_creacion`) VALUES
(11, 'e5d8cf45a9267b4c3c93eb6f134fac18e20dfa4d23a996c2aa0bff1ed7d53a42', 'Los resultados del test CASM85 revelan un patrón preocupante en los hábitos de estudio, con una tendencia generalizada hacia categorías negativas. En particular, las áreas de \"¿Cómo hace Ud. sus tareas?\", \"¿Cómo prepara sus exámenes?\", \"¿Cómo escucha las clases?\" y \"¿Qué acompaña sus momentos de estudio?\" obtuvieron un puntaje de 0, clasificándose como \"MUY NEGATIVO\", lo que sugiere una gran debilidad en la capacidad de gestionar y realizar tareas de manera efectiva, preparar y enfrentar exámenes con confianza, prestar atención en clase y crear un ambiente de estudio propicio. La única área que presenta un puntaje ligeramente superior es \"¿Cómo estudia Ud?\", con un puntaje de 1 y una categoría de \"NEGATIVO\", indicando que, aunque no es tan crítica como las demás, todavía hay un margen significativo de mejora. En resumen, estos resultados destacan la necessityad de trabajar en la construcción de hábitos de estudio más efectivos y enfocados, y recomendamos buscar apoyo y estrategias para mejorar la gestión del tiempo, la concentración y la motivación para el estudio.', '2025-06-15 01:27:43'),
(12, 'a18ee40c37de6dd07fc31443a91e9c2c95a06a99ae5c9cc12b39bfdb505ee2ad', 'Los resultados del test CASM85 revelan un panorama mixto en cuanto a los hábitos de estudio. Por un lado, se destaca una tendencia muy positiva en la forma en que se aborda el estudio en general, con un puntaje perfecto de 5, lo que sugiere una actitud proactiva y efectiva hacia el aprendizaje. Sin embargo, esta fortaleza se ve contrastada por debilidades significativas en áreas específicas como la preparación de tareas, exámenes, la escucha en clase y el entorno de estudio, todas ellas calificadas como \"MUY NEGATIVO\" con un puntaje de 0. Esto indica una necesidad urgente de mejorar la gestión del tiempo, la organización y las estrategias de estudio en estas áreas. Se recomienda trabajar en el desarrollo de habilidades para la planificación y ejecución de tareas, la preparación efectiva para exámenes, mejorar la atención y participación en clase, y crear un ambiente de estudio propicio para el aprendizaje. Al abordar estas debilidades, se puede potenciar la tendencia positiva general hacia el estudio, llevando a un desempeño académico más equilibrado y exitoso.', '2025-06-15 14:34:46'),
(13, 'd1b2d20e131488cc70e764ba1dc55325529cb1021164904f4c22e4953ad56635', 'Los resultados del test CASM85 indican un patrón de hábitos de estudio muy negativos en todas las áreas evaluadas. Con puntajes de 0 en cada categoría, se sugiere que el individuo enfrenta desafíos significativos en acompañar sus momentos de estudio de manera efectiva, en la forma en que estudia, realiza tareas, se prepara para exámenes y escucha las clases. Esta consistencia en resultados muy negativos sugiere una necesidad urgente de revisar y ajustar los hábitos de estudio en general. Se recomienda buscar apoyo para desarrollar estrategias de estudio más efectivas, mejorar la gestión del tiempo y las técnicas de aprendizaje, así como trabajar en la motivación y el compromiso con el propio aprendizaje. Al abordar estas debilidades de manera integral, el individuo puede mejorar significativamente su desempeño académico y desarrollar hábitos de estudio más positivos y productivos.', '2025-06-15 23:47:38'),
(14, 'a9fc34cf217d8e230d828cf63fb6a315a57ab957a27fc51aed1c1b1514a9fbf7', 'Los resultados del test CASM85 revelan un panorama desafiante en cuanto a los hábitos de estudio. En todas las áreas evaluadas, el puntaje es cero y la categoría es MUY NEGATIVO, lo que indica una gran debilidad en los hábitos de estudio y aprendizaje. Esto sugiere que es necesario abordar de manera integral y urgente los patrones y comportamientos asociados con el estudio, desde el acompañamiento durante los momentos de estudio hasta la forma en que se preparan los exámenes y se escuchan las clases. La repetición de resultados MUY NEGATIVOS en todas las áreas destaca una necesidad crítica de intervenir y mejorar estos aspectos para fomentar un enfoque más efectivo y positivo hacia el estudio. Se recomienda buscar apoyo y recursos para desarrollar estrategias de estudio más adecuadas y mejorar la motivación y el compromiso con el aprendizaje, lo que podría incluir la búsqueda de orientación académica o el desarrollo de habilidades de gestión del tiempo y organización.', '2025-06-15 23:47:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `codigos_invitacion`
--

CREATE TABLE `codigos_invitacion` (
  `id` int(11) NOT NULL,
  `codigo_hash` varchar(255) NOT NULL,
  `codigo_visible` varchar(12) NOT NULL,
  `id_creador` int(11) NOT NULL,
  `usado` tinyint(1) DEFAULT 0,
  `id_usuario_usado` int(11) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_uso` timestamp NULL DEFAULT NULL,
  `fecha_expiracion` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `codigos_invitacion`
--

INSERT INTO `codigos_invitacion` (`id`, `codigo_hash`, `codigo_visible`, `id_creador`, `usado`, `id_usuario_usado`, `fecha_creacion`, `fecha_uso`, `fecha_expiracion`) VALUES
(6, '$2y$10$Ia7BxkIYzjRs5PcVhwK2Ru7DIacjq8SdBTubSP4LYwzzXyRF1aF1S', 'BEUMJ6BC5YPH', 2, 0, NULL, '2025-06-14 00:22:56', NULL, '2025-06-21 07:22:56'),
(7, '$2y$10$OCj9s/gzqPltsZ2hbi9ks.q1ezA2.5NQfzBZCvhVEvqCN9w/XZQ.K', '2CAS4JS44ATN', 2, 0, NULL, '2025-06-15 01:36:03', NULL, '2025-06-22 08:36:03'),
(8, '$2y$10$rWjcc9G6rFpMvxeLX.uVyuCzQCGcioRd/WqlsJ.L.xoKZZbYV0hdC', 'WYQKDPBMHJJA', 2, 0, NULL, '2025-06-15 01:36:46', NULL, '2025-06-22 08:36:46'),
(9, '$2y$10$kb5buhWuUU.AbQptG9ZhU.ygGdmqLPXQHcXYL3r61oawbXx.6v6zS', 'EN2RP3G7938F', 2, 0, NULL, '2025-06-15 01:37:10', NULL, '2025-06-22 08:37:10'),
(10, '$2y$10$1pQiECm1/8IBIio/mmCcr.f9p9tRRbtX95OWfejxQSP6922aNd9Fq', 'E63U6GG3K8JB', 1, 0, NULL, '2025-06-15 01:51:58', NULL, '2025-06-22 08:51:58'),
(11, '$2y$10$0ITWQsvrzrPNoCDBJH/bq.Rkb6cFEUNzbZrtnbQI//y6GCjsXINtC', 'M7PX8B2MLYZ2', 2, 0, NULL, '2025-06-15 18:42:42', NULL, '2025-06-23 01:42:42'),
(12, '$2y$10$IPvbazMC99qearJQoq.by.q0Pv8e5nGx8ZbEvWhMY1ZcZXfpVAtmW', 'JYF7MFXX3TDX', 2, 0, NULL, '2025-06-16 04:20:10', NULL, '2025-06-23 11:20:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `psicologos`
--

CREATE TABLE `psicologos` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `sexo` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `jerarquia` enum('admin','psicologo') NOT NULL DEFAULT 'psicologo',
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `foto_perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `psicologos`
--

INSERT INTO `psicologos` (`id`, `nombre_usuario`, `nombre`, `apellido`, `sexo`, `fecha_nacimiento`, `correo`, `contraseña`, `jerarquia`, `fecha_creacion`, `foto_perfil`) VALUES
(1, 'admin_illa', 'Admin', 'General', 'Otro', '1985-01-01', 'admin@psicoilla.com', '$2y$10$EvWWfZurw42DEVw1s4gqeeliT4GV.q1Lmulzy0Q8WSE8hhbn3OL8m', 'psicologo', '2025-06-13 04:41:20', '/TestVocacional/Modelo/img/perfiles/perfil_684bcd59c805a.png'),
(2, 'admin_jefe', 'Nilton', 'Rojas', 'Masculino', '1999-05-20', 'admin@centropsico.com', '$2y$10$TUpk9aDnNKbTdhzadDuWYeVPXsZWm1qzNuRwAyrbcUEEXdGb1ii/S', 'admin', '2025-06-13 19:26:50', '/TestVocacional/Modelo/img/perfiles/perfil_684ca608dfed8.jpg');

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
(157, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-06-15'),
(158, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-15'),
(159, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-15'),
(160, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-15'),
(161, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-15'),
(162, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-15'),
(163, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-15'),
(164, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-15'),
(165, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-06-15'),
(166, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-15'),
(167, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-06-15'),
(168, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-15'),
(169, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-15'),
(170, 3, 'CCFM', 2, 0, 2, 'Masculino', '2025-06-15'),
(171, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-15'),
(172, 3, 'CCNA', 1, 1, 0, 'Masculino', '2025-06-15'),
(173, 3, 'CCCO', 1, 1, 0, 'Masculino', '2025-06-15'),
(174, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-15'),
(175, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-15'),
(176, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-15'),
(177, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-15'),
(178, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-06-15'),
(179, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-15'),
(180, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-06-15'),
(181, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-15'),
(182, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-15'),
(183, 3, 'CCFM', 2, 1, 1, 'Masculino', '2025-06-15'),
(184, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-15'),
(185, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-15'),
(186, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-15'),
(187, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-15'),
(188, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-15'),
(189, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-15'),
(190, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-15'),
(191, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-06-15'),
(192, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-15'),
(193, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-06-15'),
(194, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-15'),
(195, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-15');

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
(10, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-04-23'),
(42, 3, '¿CÓMO ESTUDIA USTED?', 1, 'NEGATIVO', '2025-06-15'),
(43, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-15'),
(44, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-15'),
(45, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-15'),
(46, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-15'),
(47, 3, '¿CÓMO ESTUDIA USTED?', 0, 'MUY NEGATIVO', '2025-06-15'),
(48, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-15'),
(49, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-15'),
(50, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-15'),
(51, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-15'),
(52, 3, '¿CÓMO ESTUDIA USTED?', 0, 'MUY NEGATIVO', '2025-06-15'),
(53, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-15'),
(54, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-15'),
(55, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-15'),
(56, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-15'),
(57, 3, '¿CÓMO ESTUDIA USTED?', 0, 'MUY NEGATIVO', '2025-06-16'),
(58, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-16'),
(59, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-16'),
(60, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-16'),
(61, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-16');

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
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `tipo_cuenta` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre_usuario`, `nombre`, `sexo`, `fecha_nacimiento`, `apellido`, `correo`, `contraseña`, `fecha_creacion`, `tipo_cuenta`) VALUES
(3, 'Nil_14', 'Nilton Fernando', 'Masculino', '2004-04-14', 'Tolentino Rojas', 'nilton@gmail.com', '$2y$10$i5Rk2VtDeODcKx7YNtz0Je0/bSum1bEJuzMyNUp24HJ4buqzb7.eC', '2025-04-22 21:51:12', 'Libre'),
(8, 'Luis_1', 'Luis', 'Masculino', '2025-06-04', 'Carlos', 'luis@gmail.com', '$2y$10$omfjMMZdTIItVX1Xu/lDeejoZ/yHOphIb5CiFWTXfvr4bLTMAUS1S', '2025-06-16 05:25:24', 'Libre');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `analisis_casm83`
--
ALTER TABLE `analisis_casm83`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grupo_hash` (`grupo_hash`),
  ADD KEY `idx_grupo_hash` (`grupo_hash`);

--
-- Indices de la tabla `analisis_casm85`
--
ALTER TABLE `analisis_casm85`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `grupo_hash` (`grupo_hash`),
  ADD KEY `idx_grupo_hash` (`grupo_hash`);

--
-- Indices de la tabla `codigos_invitacion`
--
ALTER TABLE `codigos_invitacion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_hash` (`codigo_hash`),
  ADD KEY `id_creador` (`id_creador`),
  ADD KEY `id_usuario_usado` (`id_usuario_usado`);

--
-- Indices de la tabla `psicologos`
--
ALTER TABLE `psicologos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- Indices de la tabla `test_casm83`
--
ALTER TABLE `test_casm83`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

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
-- AUTO_INCREMENT de la tabla `analisis_casm83`
--
ALTER TABLE `analisis_casm83`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `analisis_casm85`
--
ALTER TABLE `analisis_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `codigos_invitacion`
--
ALTER TABLE `codigos_invitacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `psicologos`
--
ALTER TABLE `psicologos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `test_casm83`
--
ALTER TABLE `test_casm83`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=248;

--
-- AUTO_INCREMENT de la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `codigos_invitacion`
--
ALTER TABLE `codigos_invitacion`
  ADD CONSTRAINT `codigos_invitacion_ibfk_1` FOREIGN KEY (`id_creador`) REFERENCES `psicologos` (`id`),
  ADD CONSTRAINT `codigos_invitacion_ibfk_2` FOREIGN KEY (`id_usuario_usado`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `test_casm83`
--
ALTER TABLE `test_casm83`
  ADD CONSTRAINT `test_casm83_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  ADD CONSTRAINT `test_casm85_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
