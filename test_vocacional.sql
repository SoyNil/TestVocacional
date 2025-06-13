-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-06-2025 a las 07:42:06
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
(1, '98678e8f103febc3d88e8658f69adf5fa22b8a3d2edb12f19f9bc84c402f32a9', 'Los resultados del Test CASM-83 indican que el participante masculino no muestra un interés claro en ninguna de las 13 categorías vocacionales evaluadas. Con puntajes muy bajos en todas las áreas, desde CCFM hasta CONS, y un nivel de \"Desinterés\" en cada una de ellas, se sugiere que el participante no ha encontrado un área que lo motive o llame su atención de manera significativa. Esto podría indicar una falta de exploración o experiencia en diferentes campos, o posiblemente una necesidad de búsqueda más profunda para encontrar áreas que realmente lo apasionen. Es importante destacar que la ausencia de intereses claros no implica una falta de potencial, sino más bien una oportunidad para explorar y descubrir nuevas pasiones y habilidades. Se recomienda al participante que explore diferentes áreas y actividades para encontrar aquellas que realmente lo motivan y satisfacen, lo que podría ayudar a descubrir sus intereses y fortalezas vocacionales.', '2025-05-26 14:57:22'),
(2, '0735a5d0eb1237344a36f9ddd4dabb22017f77d4a9113f1202efd192721510de', 'La participante femenina muestra un perfil vocacional con intereses muy limitados en las diferentes categorías evaluadas. Destaca la categoría CCFM con un puntaje de 6 y un nivel de Promedio Bajo, lo que sugiere una cierta inclinación hacia áreas relacionadas con la ciencia y la tecnología. Sin embargo, en el resto de las categorías, los puntajes son muy bajos o nulos, lo que indica un desinterés marcado en áreas como las ciencias sociales, las artes, la administración, la finanza, el idioma, el derecho y la consultoría, entre otras. Este patrón sugiere que la participante podría tener dificultades para encontrar un campo vocacional que realmente le apasione, por lo que sería recomendable explorar más a fondo sus intereses y habilidades en la categoría CCFM y considerar la posibilidad de realizar pruebas adicionales o asesoramiento vocacional para ayudarla a encontrar un camino profesional más adecuado a sus necesidades y preferencias.', '2025-05-26 14:57:42'),
(3, '209a0f6b4bcaf09ee5e343fc2d4343a39d223e9810a09d5288068684ad560183', 'El análisis de los resultados del Test CASM-83 indica que el participante, un hombre, muestra un patrón de desinterés generalizado en todas las 13 categorías vocacionales evaluadas. Esto sugiere que no hay una área en particular que destaque como un interés principal o una fortaleza vocacional. La ausencia de intereses claros en ninguna de las categorías puede indicar que el participante aún no ha encontrado una área que lo apasione o que requiere una exploración más profunda para descubrir sus verdaderos intereses. En este sentido, se recomienda que el participante explore diferentes campos y actividades para descubrir qué lo motiva y qué lo hace sentir realizado, lo que puede ayudar a identificar patrones y fortalezas vocacionales que no se reflejan en estos resultados. Es importante destacar que el desinterés generalizado no implica una falta de capacidad o potencial, sino más bien una oportunidad para seguir explorando y descubriendo las áreas que pueden ser más adecuadas y gratificantes para él.', '2025-05-26 14:58:00'),
(4, '8e878d5d4f46e87c9e2c83b09a143bd680bf210c2d669767be694e3c721a617b', 'Los resultados del Test CASM-83 indican que el participante masculino no muestra un interés significativo en ninguna de las 13 categorías evaluadas, ya que todos los puntajes se encuentran en el nivel de \"Desinterés\". Esto sugiere que el individuo puede no haber encontrado aún un área que le apasione o que no se sienta atraído por las opciones presentadas en el test. Es importante destacar que la falta de interés en todas las categorías no implica una falta de potencial o capacidad, sino que puede ser un indicador de que es necesario explorar más a fondo las preferencias y habilidades del individuo. Se recomienda realizar una evaluación más profunda y personalizada para ayudar a identificar áreas de interés y fortalezas que puedan no haber sido capturadas en este test, y así proporcionar orientación vocacional más precisa y efectiva.', '2025-05-26 14:58:20'),
(5, '6777d320abc19ffa4e95d03ec860d7935c17804ed9ebff0ad9ce86d02b237309', 'El análisis de los resultados del Test CASM-83 revela un patrón interesante en cuanto a los intereses vocacionales del participante. En general, se observa un desinterés generalizado en la mayoría de las categorías evaluadas, lo que sugiere una falta de inclinación hacia áreas tradicionales como las ciencias, las artes, la administración o las profesiones jurídicas. Los puntajes más altos, aunque aún bajos, se encuentran en las categorías CCFM y CCSS, lo que podría indicar una ligera inclinación hacia campos relacionados con la ciencia y la salud, aunque no es lo suficientemente significativo como para considerarlo un interés principal. En resumen, el participante parece no tener intereses vocacionales definidos en ninguna de las áreas evaluadas, lo que podría sugerir la necesidad de una exploración más profunda para descubrir sus verdaderas pasiones y habilidades. Se recomienda una evaluación más detallada y una orientación vocacional personalizada para ayudar al participante a encontrar un camino profesional que se alinee con sus intereses y fortalezas.', '2025-05-31 22:33:00'),
(6, '2cd3b13cdcffc5f86ef8b4f92db66702106db15294d3c3ab049dd20c8f0716ce', 'La persona evaluada, de sexo femenino, presenta un perfil vocacional caracterizado por un interés destacado en la categoría CCFM, con un nivel de \"Promedio Bajo\" y un puntaje de 6. Esto sugiere que tiene cierta inclinación hacia las ciencias formales y matemáticas, aunque no de manera excepcional. Sin embargo, es notable la ausencia de interés en las demás categorías, donde se observan puntajes de 0 o 1, lo que indica un desinterés generalizado en áreas como las ciencias sociales, naturales, arte, administración, entre otras. Este patrón sugiere que la persona podría beneficiarse de explorar carreras o campos relacionados con las ciencias formales y matemáticas, aunque es importante considerar que su interés no es extremadamente alto. Sería recomendable que la persona evaluada explore y profundice en sus intereses y habilidades en esta área para determinar si es una buena opción para su futuro vocacional.', '2025-06-07 00:06:28'),
(7, 'fbd7de16a90a256254098a72d3f8aa0bb8936ef6e30cf868a9d4a6430520a153', 'Los resultados del Test CASM-83 indican un perfil vocacional con una característica peculiar: la ausencia de intereses significativos en todas las categorías evaluadas. Con puntajes de 0 en cada una de las 13 áreas, el nivel de interés se clasifica como \"Desinterés\" en la mayoría de las categorías, y como \"Desconocido\" en las categorías VERA y CONS. Esto sugiere que el participante no ha demostrado una inclinación clara hacia ninguna de las áreas evaluadas, lo que podría indicar una falta de exploración o una búsqueda de intereses aún en desarrollo. En este sentido, se recomienda una mayor exploración de las opciones vocacionales y una reflexión más profunda sobre las preferencias y habilidades personales para identificar posibles áreas de interés y fortaleza. También podría ser beneficioso considerar actividades y experiencias que permitan una mayor exposición a diferentes campos y especialidades, con el fin de descubrir y desarrollar intereses y pasiones que puedan guiar la toma de decisiones vocacionales.', '2025-06-07 00:06:37'),
(8, 'ba6ccdef2ebe2db2d16d42994abeebf058ef2db0eb96379b32e54c2b7768d0bf', 'Los resultados del Test CASM-83 indican una falta de interés significativa en todas las categorías vocacionales evaluadas. El participante, de sexo masculino, obtuvo puntajes extremadamente bajos en todas las áreas, lo que sugiere una ausencia de inclinación hacia cualquier campo en particular. La mayoría de las categorías se encuentran en el nivel de \"Desinterés\", lo que implica una falta de atracción o motivación hacia esas áreas. La excepción es la categoría CCCO, que presenta un puntaje ligeramente superior, aunque aún se encuentra en el nivel de \"Desinterés\". No se observan patrones o fortalezas destacadas en los resultados, lo que podría indicar una necesidad de exploración y reflexión adicional para identificar intereses y habilidades potenciales. En este sentido, se recomienda al participante buscar oportunidades de exploración vocacional y realizar actividades que le permitan descubrir sus verdaderas pasiones y aptitudes, con el fin de encontrar un camino profesional que se alinee con sus intereses y habilidades.', '2025-06-07 12:11:33');

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
(1, 'e5d8cf45a9267b4c3c93eb6f134fac18e20dfa4d23a996c2aa0bff1ed7d53a42', 'Los resultados del test CASM85 revelan un patrón de hábitos de estudio preocupantes, con una tendencia generalizada hacia categorías negativas. La forma en que se abordan el estudio y la realización de tareas es deficitaria, con un puntaje de 1 en \"¿Cómo estudia usted?\" y 0 en \"¿Cómo hace Ud. sus tareas?\", lo que indica una necesidad urgente de mejorar la planificación y la ejecución de las tareas académicas. Además, la preparación para exámenes, la atención en clase y el entorno de estudio también presentan debilidades significativas, con puntajes de 0 en todas estas áreas, lo que sugiere una falta de compromiso y dedicación hacia el aprendizaje. Para mejorar, se recomienda establecer rutinas de estudio más efectivas, buscar apoyo para la planificación y organización de tareas, y crear un entorno de estudio propicio para el aprendizaje. Es fundamental abordar estas debilidades para evitar que afecten negativamente el rendimiento académico y desarrollar hábitos de estudio más saludables y productivos.', '2025-05-25 10:39:33'),
(2, 'a18ee40c37de6dd07fc31443a91e9c2c95a06a99ae5c9cc12b39bfdb505ee2ad', 'Los resultados del test CASM85 revelan una situación contrastante en cuanto a los hábitos de estudio. Por un lado, la forma en que se aborda el estudio en general muestra una tendencia muy positiva, con un puntaje máximo de 5, lo que sugiere una excelente actitud y enfoque hacia el aprendizaje. Sin embargo, esta fortaleza se ve opacada por debilidades significativas en áreas específicas, como la realización de tareas, la preparación para exámenes, la escucha activa en clases y el ambiente que acompaña los momentos de estudio, todas ellas categorizadas como \"MUY NEGATIVO\" con un puntaje de 0. Esto indica una necesidad urgente de mejorar y desarrollar habilidades y estrategias efectivas en estas áreas para aprovechar al máximo el potencial mostrado en la actitud general hacia el estudio. Se recomienda trabajar en la creación de un entorno de estudio más propicio, desarrollar técnicas de estudio y preparación para exámenes, y mejorar la participación y atención en clase, lo que podría tener un impacto significativo en el rendimiento académico y el crecimiento personal.', '2025-05-25 10:39:53'),
(3, '4d61f393d59263ab641e59503f35e6d90e128e6c380b1008be863ee7ff0809c9', 'Los resultados del test CASM85 revelan un panorama desafiante en cuanto a los hábitos de estudio. Con un puntaje de 2 en la categoría \"NEGATIVO\" en la forma en que se estudia, se identifica una debilidad inicial en la aproximación a la preparación académica. Sin embargo, es aún más preocupante que en las áreas de realización de tareas, preparación de exámenes, escucha en clases y acompañamiento en momentos de estudio, los puntajes sean de 0, lo que los clasifica como \"MUY NEGATIVO\". Esto sugiere una falta de estrategias efectivas y un enfoque insuficiente en estas áreas críticas. Para mejorar, es fundamental que se aborden estas debilidades mediante el desarrollo de habilidades de estudio más efectivas, la implementación de un enfoque más estructurado y organizado en la realización de tareas y la preparación para exámenes, y el fomento de una mejor atención y participación en clases. Además, es importante identificar y eliminar distracciones o factores negativos que puedan acompañar los momentos de estudio, para así crear un entorno de aprendizaje más propicio y productivo. Con un enfoque proactivo y el compromiso de cambio, es posible superar estas debilidades y desarrollar hábitos de estudio más positivos y efectivos.', '2025-05-25 10:40:04'),
(4, '5796afd62ab9235ef88c35f12af2187a337db1f95c5eaa64eb2a140b0f771516', 'Los resultados del test CASM85 revelan un patrón preocupante en los hábitos de estudio, ya que todas las áreas evaluadas presentan un puntaje de 0 y una categoría de MUY NEGATIVO. Esto sugiere que existen debilidades significativas en la forma en que se abordan las tareas, se preparan los exámenes, se escuchan las clases y se estructuran los momentos de estudio. La ausencia de estrategias efectivas y la falta de compromiso con el aprendizaje pueden estar obstaculizando el progreso académico. Es fundamental abordar estas debilidades a través de recomendaciones como la creación de un plan de estudio personalizado, la búsqueda de apoyo adicional para desarrollar habilidades de estudio y la implementación de técnicas de organización y gestión del tiempo. Además, sería beneficioso identificar y minimizar las distracciones que puedan acompañar los momentos de estudio, lo que permitiría mejorar la concentración y el rendimiento académico. Con un enfoque proactivo y una disposición a cambiar, es posible superar estas debilidades y desarrollar hábitos de estudio más efectivos y positivos.', '2025-05-25 10:40:10');

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
  `fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `psicologos`
--

INSERT INTO `psicologos` (`id`, `nombre_usuario`, `nombre`, `apellido`, `sexo`, `fecha_nacimiento`, `correo`, `contraseña`, `jerarquia`, `fecha_creacion`) VALUES
(1, 'admin_illa', 'Admin', 'General', 'Otro', '1985-01-01', 'admin@psicoilla.com', '$2y$10$EvWWfZurw42DEVw1s4gqeeliT4GV.q1Lmulzy0Q8WSE8hhbn3OL8m', 'psicologo', '2025-06-13 04:41:20');

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
(1, 3, 'CCFM', 2, 1, 1, 'Masculino', '2025-05-26'),
(2, 3, 'CCSS', 1, 1, 0, 'Masculino', '2025-05-26'),
(3, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-05-26'),
(4, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-05-26'),
(5, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-05-26'),
(6, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-05-26'),
(7, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-05-26'),
(8, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-05-26'),
(9, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-05-26'),
(10, 3, 'LING', 0, 0, 0, 'Masculino', '2025-05-26'),
(11, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-05-26'),
(12, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-05-26'),
(13, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-05-26'),
(14, 3, 'CCFM', 6, 1, 5, 'Femenino', '2025-05-26'),
(15, 3, 'CCSS', 0, 0, 0, 'Femenino', '2025-05-26'),
(16, 3, 'CCNA', 1, 1, 0, 'Femenino', '2025-05-26'),
(17, 3, 'CCCO', 1, 1, 0, 'Femenino', '2025-05-26'),
(18, 3, 'ARTE', 1, 1, 0, 'Femenino', '2025-05-26'),
(19, 3, 'BURO', 1, 1, 0, 'Femenino', '2025-05-26'),
(20, 3, 'CCEP', 0, 0, 0, 'Femenino', '2025-05-26'),
(21, 3, 'HAA', 0, 0, 0, 'Femenino', '2025-05-26'),
(22, 3, 'FINA', 0, 0, 0, 'Femenino', '2025-05-26'),
(23, 3, 'LING', 0, 0, 0, 'Femenino', '2025-05-26'),
(24, 3, 'JURI', 0, 0, 0, 'Femenino', '2025-05-26'),
(25, 3, 'VERA', 0, 0, 0, 'Femenino', '2025-05-26'),
(26, 3, 'CONS', 0, 0, 0, 'Femenino', '2025-05-26'),
(27, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-05-26'),
(28, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-05-26'),
(29, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-05-26'),
(30, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-05-26'),
(31, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-05-26'),
(32, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-05-26'),
(33, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-05-26'),
(34, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-05-26'),
(35, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-05-26'),
(36, 3, 'LING', 0, 0, 0, 'Masculino', '2025-05-26'),
(37, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-05-26'),
(38, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-05-26'),
(39, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-05-26'),
(40, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-05-26'),
(41, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-05-26'),
(42, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-05-26'),
(43, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-05-26'),
(44, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-05-26'),
(45, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-05-26'),
(46, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-05-26'),
(47, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-05-26'),
(48, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-05-26'),
(49, 3, 'LING', 0, 0, 0, 'Masculino', '2025-05-26'),
(50, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-05-26'),
(51, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-05-26'),
(52, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-05-26'),
(53, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-05-26'),
(54, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-05-26'),
(55, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-05-26'),
(56, 3, 'CCCO', 1, 1, 0, 'Masculino', '2025-05-26'),
(57, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-05-26'),
(58, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-05-26'),
(59, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-05-26'),
(60, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-05-26'),
(61, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-05-26'),
(62, 3, 'LING', 0, 0, 0, 'Masculino', '2025-05-26'),
(63, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-05-26'),
(64, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-05-26'),
(65, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-05-26'),
(66, 3, 'CCFM', 1, 1, 0, 'Masculino', '2025-05-26'),
(67, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-05-26'),
(68, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-05-26'),
(69, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-05-26'),
(70, 3, 'ARTE', 1, 1, 0, 'Masculino', '2025-05-26'),
(71, 3, 'BURO', 1, 0, 1, 'Masculino', '2025-05-26'),
(72, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-05-26'),
(73, 3, 'HAA', 1, 0, 1, 'Masculino', '2025-05-26'),
(74, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-05-26'),
(75, 3, 'LING', 0, 0, 0, 'Masculino', '2025-05-26'),
(76, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-05-26'),
(77, 3, 'VERA', 7, 7, 0, 'Masculino', '2025-05-26'),
(78, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-05-26'),
(79, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-05-26'),
(80, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-05-26'),
(81, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-05-26'),
(82, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-05-26'),
(83, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-05-26'),
(84, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-05-26'),
(85, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-05-26'),
(86, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-05-26'),
(87, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-05-26'),
(88, 3, 'LING', 0, 0, 0, 'Masculino', '2025-05-26'),
(89, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-05-26'),
(90, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-05-26'),
(91, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-05-26');

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
(11, 3, '¿CÓMO ESTUDIA USTED?', 2, 'NEGATIVO', '2025-04-25'),
(12, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-04-25'),
(13, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-04-25'),
(14, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-04-25'),
(15, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-04-25'),
(16, 3, '¿CÓMO ESTUDIA USTED?', 0, 'MUY NEGATIVO', '2025-04-27'),
(17, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-04-27'),
(18, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-04-27'),
(19, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-04-27'),
(20, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-04-27');

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
  `codigo_invitacion_usado` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre_usuario`, `nombre`, `sexo`, `fecha_nacimiento`, `apellido`, `correo`, `contraseña`, `fecha_creacion`, `codigo_invitacion_usado`) VALUES
(3, 'Nil_14', 'Nilton', 'Masculino', '2004-04-14', 'Tolentino Rojas', 'nilton@gmail.com', '$2y$10$xhAA37vR0JI5ufzr.sAZROgJv4etKWTqhQ22c7sgoPhowpeuoK5fW', '2025-04-22 21:51:12', NULL);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `analisis_casm85`
--
ALTER TABLE `analisis_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `psicologos`
--
ALTER TABLE `psicologos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `test_casm83`
--
ALTER TABLE `test_casm83`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT de la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

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
