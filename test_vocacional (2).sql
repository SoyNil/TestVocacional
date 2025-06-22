-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2025 a las 04:31:43
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
(27, '209a0f6b4bcaf09ee5e343fc2d4343a39d223e9810a09d5288068684ad560183', 'Los resultados del Test CASM-83 indican una falta de interés significativa en todas las categorías vocacionales evaluadas, lo que sugiere una ausencia de inclinaciones claras hacia áreas específicas. Con puntajes de 0 en cada categoría, el individuo no muestra preferencia por ninguna de las áreas evaluadas, lo que puede indicar una fase de exploración o indecisión en cuanto a sus intereses vocacionales. Es importante destacar que esta falta de interés generalizado puede ser un punto de partida para una exploración más profunda de las propias inclinaciones y habilidades, permitiendo al individuo descubrir áreas que realmente le apasionen y en las que pueda desarrollar sus fortalezas. Se recomienda una evaluación más detallada y una búsqueda activa de experiencias que puedan ayudar a revelar intereses y talentos ocultos, permitiendo al individuo encontrar un camino vocacional que se alinee con sus verdaderas pasiones y habilidades.', '2025-06-18 11:48:44'),
(28, '8fe2c2e3ace36b9e942d25dcd4f1d665f3530f1c7bfb725634642118dbdc11a9', 'Los resultados del Test CASM-83 indican que el participante masculino muestra un perfil de desinterés generalizado en todas las categorías vocacionales evaluadas. Con puntajes muy bajos en todas las áreas, desde CCFM hasta CONS, y niveles clasificados como \"Desinterés\" en cada una de ellas, se sugiere que el individuo no ha desarrollado intereses vocacionales claros en ninguna de las 13 categorías evaluadas. Este patrón sugiere una falta de dirección o pasión específica hacia campos como las ciencias, las artes, la administración, o cualquier otro área evaluada. Es importante destacar que este perfil puede indicar una necesidad de exploración adicional para descubrir intereses y talentos ocultos, o puede reflejar una fase de indecisión en la vida del participante. Se recomienda una evaluación más profunda y un proceso de orientación vocacional para ayudar al individuo a identificar posibles áreas de interés y fortaleza que puedan no haber sido capturadas por este test.', '2025-06-18 12:05:05'),
(29, '2ef0b360695477043292fe0c43e02ffbc32887e1c35074d696843037f6909fc8', 'Los resultados del Test CASM-83 indican que el participante masculino muestra un perfil de intereses vocacionales muy específico. Destaca una notable falta de interés en la mayoría de las categorías evaluadas, con niveles de desinterés en áreas como CCFM, CCSS, CCNA, CCCO, ARTE, BURO, CCEP, HAA, FINA, LING, VERA y CONS. Sin embargo, llama la atención el puntaje obtenido en la categoría JURI, con un nivel de interés clasificado como Promedio Bajo. Esto sugiere que, aunque no hay un interés excepcionalmente alto, el participante podría tener cierta inclinación hacia carreras o actividades relacionadas con el ámbito jurídico. En términos generales, se recomienda explorar más a fondo las áreas relacionadas con el derecho y la justicia para determinar si este interés puede desarrollarse y convertirse en una carrera satisfactoria para el participante. Sería beneficioso también considerar actividades o cursos que permitan una mayor exploración de este interés, con el fin de confirmar si indeed es un camino vocacional adecuado.', '2025-06-18 12:22:11'),
(30, 'cc5c52fe1eaa623bc8d6dc161995fba8339337bf19702993e6171702fe157424', 'El análisis de los resultados del Test CASM-83 revela un patrón interesante en cuanto a los intereses vocacionales del participante. Con un puntaje de 0 en la mayoría de las categorías, se observa un desinterés generalizado en áreas como ciencias formales y exactas, ciencias sociales, arte, administración, entre otras. Sin embargo, llama la atención el puntaje de 7 en la categoría JURI, que indica un interés promedio bajo en el ámbito jurídico. Este resultado sugiere que el participante podría tener una inclinación hacia carreras o profesiones relacionadas con el derecho, aunque no de manera apasionada o intensa. En términos de fortalezas, se podría destacar la capacidad del participante para identificar áreas que no le atraen, lo que puede ser beneficioso a la hora de tomar decisiones vocacionales. En cuanto a debilidades, la falta de interés en la mayoría de las categorías podría indicar una necesidad de explorar y descubrir nuevas pasiones y áreas de interés. En términos de recomendaciones vocacionales, sería útil que el participante explore carreras relacionadas con el derecho, como Derecho, Ciencias Jurídicas o carreras afines, y también se anime a investigar y descubrir otras áreas que puedan despertar su interés y motivación.', '2025-06-18 22:54:52');

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
(1, '085b062d11876a523175b7937b1b3ac4ff061bd0aba97d3acce32a0d4bf88048', 'Los resultados del test CASM85 presentan una imagen contradictoria en las áreas evaluadas. En un primer vistazo, se observa que en cuatro de las áreas (\"¿Cómo estudia usted?\", \"¿Cómo escucha las clases?\", \"¿Cómo prepara sus exámenes?\" y \"¿Cómo hace ud. sus tareas?\"), los puntajes obtenidos son 0, lo que se categoriza como \"MUY NEGATIVO\". Esto sugiere debilidades significativas en los hábitos de estudio, especialmente en la forma en que se abordan las clases, la preparación para exámenes y la realización de tareas. Sin embargo, llama la atención que en la pregunta \"¿Cómo estudia usted?\" se reporta un puntaje de 5 con una \"TENDENCIA POSITIVA\", lo que parece contradecir los resultados de la misma área reportada anteriormente con un puntaje de 0. Esta contradicción puede indicar una inconsistencia en la evaluación o una necesidad de revisar la forma en que se percibe el propio estudio. En general, estos resultados sugieren que es necesario trabajar en desarrollar hábitos de estudio más efectivos y consistentes, prestando especial atención a la coherencia en la autoevaluación para mejorar el desempeño académico. Se recomienda una revisión detallada de los métodos de estudio y la búsqueda de apoyo para mejorar las áreas identificadas como débiles.', '2025-06-17 12:44:40'),
(2, 'd4bae77f75139b16c002ffdb2320ae35bc81c5f21d885ecd390075ba356e49aa', 'Los resultados del test CASM85 indican un patrón preocupante en los hábitos de estudio, con una calificación de 0 en todas las áreas evaluadas, lo que se categoriza como MUY NEGATIVO. Esto sugiere una debilidad significativa en la forma en que se abordan las tareas, se preparan los exámenes, se escuchan las clases y se acompañan los momentos de estudio. La consistencia en los bajos puntajes a través de todas las áreas sugiere una falta generalizada de estrategias y hábitos efectivos de estudio. Es importante destacar que no hay fortalezas identificadas en este análisis, lo que subraya la necesidad de una intervención integral para mejorar los hábitos de estudio. Se recomienda trabajar en el desarrollo de estrategias de estudio personalizadas, buscar apoyo académico y fomentar un entorno de estudio propicio para el aprendizaje, con el objetivo de mejorar significativamente estos hábitos y categorías en el futuro.', '2025-06-17 12:46:20'),
(3, '94db6b5d11c5c3db41eb34cb91b4e52469ef9dbd104a331382748ecfef327966', 'Los resultados del test CASM85 revelan una imagen mixta en cuanto a los hábitos de estudio. La categoría \"TENDENCIA POSITIVA\" en la pregunta sobre cómo se estudia es un punto fuerte, ya que indica una buena comprensión y aplicación de técnicas de estudio efectivas. Sin embargo, este aspecto positivo se ve contrastado por resultados preocupantes en las otras áreas evaluadas. Los puntajes de 0 y categorías \"MUY NEGATIVO\" en cómo se realizan tareas, se preparan exámenes, se escuchan las clases y qué acompaña los momentos de estudio sugieren debilidades significativas en la gestión del tiempo, la planificación y el compromiso con el aprendizaje. Estos patrones sugieren que, aunque se tiene una base sólida en la forma de estudiar, existen importantes brechas en la aplicación práctica y el acompañamiento de los procesos de estudio. Se recomienda trabajar en la mejora de estas áreas débiles para aprovechar al máximo las fortalezas existentes y desarrollar hábitos de estudio más integrales y efectivos.', '2025-06-17 12:46:44'),
(4, '168ecc5aa8d2be3d618aee96304e98065bf9d60b9196b6d89067d48fe563df7f', 'Los resultados del test CASM85 revelan un panorama desafiante en cuanto a los hábitos de estudio. Se observa una tendencia negativa tanto en la forma en que se estudia como en la realización de tareas, con puntajes de 4 y 3 respectivamente, lo que sugiere que es necesario mejorar la estrategia y la eficiencia en estas áreas. Sin embargo, las áreas que más preocupan son la preparación para exámenes, la escucha en clase y el acompañamiento durante los momentos de estudio, todas ellas con un puntaje de 0 y categorizadas como \"MUY NEGATIVO\". Esto indica una gran debilidad en la capacidad para prepararse adecuadamente para evaluaciones, mantener una atención y participación activa en clase, y crear un entorno de estudio propicio y libre de distracciones. Para mejorar, es fundamental que se aborden estas debilidades de manera prioritaria, estableciendo estrategias efectivas para la preparación de exámenes, practicando una escucha activa y participativa en clase, y creando un ambiente de estudio focalizado y sin distracciones. Con un enfoque dirigido a estas áreas, se pueden desarrollar hábitos de estudio más sólidos y eficaces, mejorando así el desempeño académico en general.', '2025-06-17 13:49:26'),
(5, 'f485aa4ebb1b728df1469e42f0ca81929eb16ae627226333790648dbebca6b2a', 'Los resultados del test CASM85 indican una serie de desafíos significativos en los hábitos de estudio. En general, se observa una tendencia hacia resultados negativos en todas las áreas evaluadas, lo que sugiere una necesidad urgente de revisar y ajustar las estrategias de aprendizaje. La categoría \"NEGATIVO\" en la pregunta sobre cómo se estudia, con un puntaje de 2, es el resultado más alto, pero aún así refleja un enfoque inadecuado hacia el estudio. Las otras áreas, que incluyen la realización de tareas, preparación para exámenes, escucha en clases y acompañamiento durante el estudio, obtuvieron un puntaje de 0, clasificándose como \"MUY NEGATIVO\". Esto destaca debilidades críticas en la capacidad para gestionar el tiempo de estudio, mantener la concentración y aprovechar al máximo las oportunidades de aprendizaje en el aula. Se recomienda urgentemente desarrollar habilidades más efectivas para el estudio, como la planificación, la organización y la práctica activa, así como buscar apoyo adicional para mejorar la comprensión y retención de la información. Además, sería beneficioso identificar y minimizar las distracciones durante el estudio, y trabajar en la creación de un ambiente de aprendizaje más propicio. Con un enfoque proactivo y el compromiso de cambiar estos hábitos, es posible superar estas debilidades y desarrollar un enfoque más positivo y productivo hacia el estudio.', '2025-06-17 13:57:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `analisis_pma`
--

CREATE TABLE `analisis_pma` (
  `id` int(11) NOT NULL,
  `grupo_hash` varchar(64) NOT NULL,
  `analisis_texto` text NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `analisis_pma`
--

INSERT INTO `analisis_pma` (`id`, `grupo_hash`, `analisis_texto`, `fecha`) VALUES
(1, '41037dd97e25163964d7aa61a66616c06eb3e0f8f990fd7c70c035dc8d281393', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las fortalezas de la persona evaluada se encuentran en áreas muy específicas y limitadas. La puntuación en Comprensión Verbal, aunque baja en términos absolutos (2 sobre 50), es relativamente alta en comparación con las otras categorías, lo que sugiere una leve ventaja en este aspecto. Sin embargo, todos los puntajes se clasificarían como bajos (<50% del máximo), lo que indica debilidades significativas en Razonamiento Espacial, Razonamiento, Cálculo Numérico y Fluidez Verbal, donde no se obtuvieron puntos. Esto sugiere dificultades para manejar conceptos espaciales, razonar de manera lógica, realizar cálculos numéricos y expresarse de forma fluida verbalmente. Se recomienda enfocarse en el desarrollo de estas áreas a través de prácticas y ejercicios específicos para mejorar las habilidades cognitivas y alcanzar un mejor desempeño en diversas actividades personales y profesionales. La puntuación total, aunque no tiene un máximo definido, refleja la necesidad de un esfuerzo significativo en el desarrollo de aptitudes mentales para superar las actuales limitaciones.', '2025-06-21 20:08:18'),
(2, '440260519d56ed2789f5f9b011851cb8b6ba50815f24467c99e5d3b35e23e679', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las puntuaciones en todos los factores evaluados, incluyendo Comprensión Verbal, Razonamiento Espacial, Razonamiento, Cálculo Numérico y Fluidez Verbal, se encuentran en un rango bajo, con un puntaje de 0 en cada uno de ellos. Esto sugiere que existen áreas de mejora significativas en todas las habilidades cognitivas evaluadas. Es importante destacar que estos resultados pueden ser un punto de partida para trabajar en el desarrollo de habilidades en comprensión verbal, razonamiento y cálculo numérico, así como en la fluidez verbal y el razonamiento espacial. Se recomienda la implementación de estrategias de aprendizaje y práctica dirigidas a fortalecer estas áreas, lo que podría incluir la participación en cursos de lógica, matemáticas, lectura y escritura, así como ejercicios que promuevan el pensamiento crítico y la resolución de problemas. Con un enfoque dedicado y un plan de mejora personalizado, es posible esperar una mejora significativa en las habilidades cognitivas y, por lo tanto, en la puntuación total del Test PMA en evaluaciones futuras.', '2025-06-21 20:08:42'),
(3, 'd70f6f6ade78b0b41ecbdf24566fc607f579dc8a3b04602665a1ccb785af58a1', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las puntuaciones en todos los factores evaluados, incluyendo Comprensión Verbal, Razonamiento Espacial, Razonamiento, Cálculo Numérico y Fluidez Verbal, se encuentran en un rango bajo, con puntajes de 0 en cada categoría. Esto sugiere que hay áreas de desarrollo significativas en las habilidades cognitivas medidas por el test. Es importante destacar que no hay fortalezas destacadas en este perfil, lo que significa que el enfoque debería estar en mejorar las habilidades en todos los aspectos evaluados. Para el desarrollo personal y profesional, se recomienda trabajar en ejercicios y actividades que promuevan el desarrollo de la comprensión verbal, el razonamiento espacial, las capacidades numéricas y la fluidez verbal, junto con estrategias para mejorar el razonamiento lógico. Un programa de entrenamiento cognitivo personalizado, junto con la práctica constante y el seguimiento de un profesional, podría ser beneficioso para mejorar estos puntajes y potenciar las capacidades cognitivas en general.', '2025-06-21 20:59:09'),
(4, '841a251b557c88078be4379550b3d799b72f6d340298d7ff3a0801551cd99b67', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las puntuaciones obtenidas se encuentran en un rango bajo en todos los factores evaluados. La Comprensión Verbal, con un puntaje de 2 sobre 50, y la Fluidez Verbal, con un puntaje de 1 sobre 75, muestran un desempeño muy por debajo del promedio, lo que sugiere dificultades significativas en la comprensión y el uso del lenguaje. De igual forma, los puntajes de 0 en Razonamiento Espacial, Razonamiento y Cálculo Numérico reflejan un desempeño mínimo en estas áreas, lo que puede indicar debilidades en la resolución de problemas espaciales, la lógica y el manejo de números. Estos resultados sugieren que es necesario trabajar en el desarrollo de estas habilidades para mejorar el desempeño cognitivo general. Se recomienda participar en actividades y ejercicios diseñados para fortalecer estas áreas, como ejercicios de lógica, juegos de estrategia, prácticas de cálculo mental y lectura comprensiva, con el fin de mejorar las habilidades y alcanzar un mejor equilibrio en el desarrollo personal y profesional.', '2025-06-21 21:10:36');

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
(287, 3, 'CCFM', 3, 2, 1, 'Masculino', '2025-06-18'),
(288, 3, 'CCSS', 2, 1, 1, 'Masculino', '2025-06-18'),
(289, 3, 'CCNA', 2, 1, 1, 'Masculino', '2025-06-18'),
(290, 3, 'CCCO', 2, 1, 1, 'Masculino', '2025-06-18'),
(291, 3, 'ARTE', 2, 1, 1, 'Masculino', '2025-06-18'),
(292, 3, 'BURO', 2, 1, 1, 'Masculino', '2025-06-18'),
(293, 3, 'CCEP', 2, 1, 1, 'Masculino', '2025-06-18'),
(294, 3, 'HAA', 1, 0, 1, 'Masculino', '2025-06-18'),
(295, 3, 'FINA', 2, 1, 1, 'Masculino', '2025-06-18'),
(296, 3, 'LING', 2, 1, 1, 'Masculino', '2025-06-18'),
(297, 3, 'JURI', 1, 0, 1, 'Masculino', '2025-06-18'),
(298, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-18'),
(299, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-18'),
(300, 3, 'CCFM', 1, 1, 0, 'Masculino', '2025-06-18'),
(301, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-18'),
(302, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-18'),
(303, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-18'),
(304, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-18'),
(305, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-18'),
(306, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-18'),
(307, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-18'),
(308, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-06-18'),
(309, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-18'),
(310, 3, 'JURI', 7, 0, 7, 'Masculino', '2025-06-18'),
(311, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-18'),
(312, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-18'),
(313, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-06-18'),
(314, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-18'),
(315, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-18'),
(316, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-18'),
(317, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-18'),
(318, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-18'),
(319, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-18'),
(320, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-18'),
(321, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-06-18'),
(322, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-18'),
(323, 3, 'JURI', 7, 0, 7, 'Masculino', '2025-06-18'),
(324, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-18'),
(325, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-18');

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
(1, 3, '¿CÓMO ESTUDIA USTED?', 0, 'MUY NEGATIVO', '2025-06-17'),
(2, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-17'),
(3, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(4, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(5, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-17'),
(6, 3, '¿CÓMO ESTUDIA USTED?', 5, 'TENDENCIA POSITIVA', '2025-06-17'),
(7, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-17'),
(8, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(9, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(10, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-17'),
(11, 3, '¿CÓMO ESTUDIA USTED?', 4, 'TENDENCIA NEGATIVA', '2025-06-17'),
(12, 3, '¿CÓMO HACE UD. SUS TAREAS?', 3, 'TENDENCIA NEGATIVA', '2025-06-17'),
(13, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(14, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(15, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-17'),
(16, 3, '¿CÓMO ESTUDIA USTED?', 2, 'NEGATIVO', '2025-06-17'),
(17, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-17'),
(18, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(19, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(20, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-17');

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
(8, 3, '2', '0', '0', '0', '1', 4.00, '2025-06-22');

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
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `analisis_pma`
--
ALTER TABLE `analisis_pma`
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
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `test_pma`
--
ALTER TABLE `test_pma`
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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `analisis_casm85`
--
ALTER TABLE `analisis_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `analisis_pma`
--
ALTER TABLE `analisis_pma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=326;

--
-- AUTO_INCREMENT de la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `test_pma`
--
ALTER TABLE `test_pma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- Filtros para la tabla `test_pma`
--
ALTER TABLE `test_pma`
  ADD CONSTRAINT `test_pma_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
