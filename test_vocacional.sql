-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2025 a las 19:41:15
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
(39, '3469eafc59d284845b0c747ae2a8cc55e638b670ae91478ed5a5e464e06ad487', 'Los resultados del Test CASM-83 indican que el participante masculino no presenta un interés significativo en ninguna de las 13 categorías evaluadas, mostrando un nivel de desinterés en todas ellas. Esto sugiere una falta de inclinación hacia áreas tradicionalmente asociadas con carreras y profesiones específicas, lo que podría dificultar la identificación de una vocación clara. Sin embargo, es importante destacar que la ausencia de intereses prominentes no necesariamente implica una falta de capacidad o potencial. En este caso, sería recomendable explorar áreas que no estén estrictamente definidas dentro de las categorías evaluadas, o considerar la posibilidad de realizar actividades y talleres que puedan ayudar a descubrir habilidades y pasiones ocultas. Además, podría ser beneficioso buscar asesoramiento vocacional personalizado para ayudar a identificar patrones y fortalezas que, aunque no sean evidentes en este test, puedan ser clave para encontrar una carrera satisfactoria y acorde a las capacidades y deseos del participante.', '2025-06-28 22:26:58'),
(40, '6f8302064af1ad1c59658024dbbfe8e96de9c776ae4341130dab5c79a13971ff', 'Los resultados del Test CASM-83 indican que el participante masculino presenta un perfil vocacional con un interés significativamente alto en solo una categoría: CCFM, con un puntaje de 6 y un nivel de interés calificado como \"Bajo\". Esto sugiere que el participante podría tener una inclinación hacia carreras o campos relacionados con esta categoría, aunque es importante destacar que el interés es relativamente bajo en comparación con los máximos posibles. En contraste, el participante muestra un desinterés marcado en las demás categorías evaluadas, como CCSS, CCNA, CCCO, ARTE, BURO, CCEP, HAA, FINA, LING, JURI, VERA y CONS, todas con puntajes de 0 y un nivel de \"Desinterés\". Estos resultados sugieren que el participante podría beneficiarse de explorar áreas dentro de la categoría CCFM que se alineen con sus intereses y habilidades, y considerar la posibilidad de desarrollar sus habilidades y explorar otros campos para ampliar sus opciones vocacionales. Es recomendable que el participante busque asesoramiento vocacional adicional para explorar sus intereses y habilidades de manera más profunda y encontrar carreras o campos que se ajusten mejor a su perfil.', '2025-06-28 22:29:18'),
(41, '209a0f6b4bcaf09ee5e343fc2d4343a39d223e9810a09d5288068684ad560183', 'Los resultados del Test CASM-83 indican una falta de interés claro en las 13 categorías evaluadas, lo que sugiere que el participante masculino no ha manifestado preferencias vocacionales definidas en ninguna de las áreas exploradas. Con puntajes de cero en todas las categorías, desde CCFM hasta CONS, y un nivel de desinterés en cada una, se observa un patrón de neutralidad o posible indecisión vocacional. Esta situación puede indicar que el individuo aún no ha explorado sus intereses de manera profunda o que requiere una reflexión más detallada sobre sus inclinaciones y aptitudes. Se recomienda una exploración más a fondo de sus habilidades, valores y experiencias personales para identificar posibles áreas de interés que no hayan sido capturadas en este test. Además, podría ser beneficioso considerar actividades de orientación vocacional que fomenten la exploración de diferentes campos y permitan al individuo descubrir áreas donde pueda encontrar realización y satisfacción.', '2025-06-30 10:43:20'),
(42, '812849f4489531e26940505c8cef20bda0459072140618b6714cdbcf2f8e4250', 'Los resultados del Test CASM-83 indican una falta de interés claro en todas las categorías vocacionales evaluadas. Con puntajes de 0 en la mayoría de las áreas, como CCFM, CCSS, CCNA, CCCO, ARTE, BURO, CCEP, HAA, FINA, LING, VERA y CONS, se sugiere que el participante no ha demostrado una inclinación marcada hacia ninguno de estos campos. Solo en la categoría JURI se observa un puntaje ligeramente superior, aunque aún se clasifica como \"Desinterés\". Este patrón sugiere que el participante podría estar en una etapa de exploración o indecisión sobre sus intereses vocacionales. Sería recomendable que el participante explore diferentes áreas y actividades para descubrir sus verdaderos intereses y fortalezas, y considerar la posibilidad de realizar más pruebas o asistir a sesiones de orientación vocacional para obtener una visión más clara de sus opciones futuras.', '2025-06-30 10:44:47'),
(43, '4eb2575f52ff632cdbd827d89c10062bb56cbba3cd8e01f7263a238013c45331', 'Los resultados del Test CASM-83 indican que el participante, un hombre, presenta un perfil vocacional con intereses muy focalizados. La categoría CCFM es la única que muestra un nivel de interés, aunque clasificado como \"Bajo\" con un puntaje de 6. Esto sugiere que el participante podría tener alguna inclinación hacia carreras o actividades relacionadas con ciencias, tecnología, ingeniería y matemáticas, aunque no de manera destacada. Es notable la ausencia de intereses en las demás categorías, todas las cuales se encuentran en el nivel de \"Desinterés\", lo que podría indicar una falta de exploración o una gran especificidad en sus intereses vocacionales. Se recomienda que el participante explore más a fondo las áreas relacionadas con CCFM para determinar si existe un interés más profundo que podría ser desarrollado, y también considere la posibilidad de realizar actividades o cursos en otras áreas para descubrir nuevos intereses y ampliar sus horizontes vocacionales.', '2025-06-30 11:09:17'),
(44, 'f171127d6dba980993e07da8f20da2f547d67e5b233196146a703da457f317b0', 'El perfil vocacional de este individuo masculino muestra un patrón de desinterés generalizado en todas las categorías evaluadas. Con puntajes muy bajos en cada una de las 13 áreas, desde CCFM hasta CONS, es evidente que no existe una inclinación marcada hacia ningún campo en particular. Este resultado sugiere que el individuo podría estar en una etapa de exploración o indecisión respecto a sus intereses vocacionales. Es importante destacar que la ausencia de intereses prominentes no necesariamente indica una falta de capacidad, sino más bien la necesidad de una mayor exploración y reflexión sobre sus pasiones y fortalezas. Se recomienda una orientación vocacional más profunda para ayudar a descubrir áreas de interés y talento que puedan no haber sido capturadas en esta evaluación, promoviendo así un proceso de autoconocimiento y toma de decisiones informadas sobre su futuro profesional.', '2025-06-30 11:42:15');

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
(7, '6d3dd0538c69229db2371c24fc97841c40d3b3518adc29c45edf34e47b633a9f', 'Los resultados del test CASM85 indican un patrón consistente de respuestas que sugieren una serie de desafíos significativos en los hábitos de estudio. En todas las cinco áreas evaluadas, los puntajes obtenidos fueron de 0, clasificados como MUY NEGATIVO. Esto sugiere una debilidad generalizada en la forma en que se abordan las tareas, se preparan los exámenes, se escuchan las clases y se acompañan los momentos de estudio. Es evidente que se necesitan mejoras sustanciales en cada una de estas áreas para desarrollar hábitos de estudio más efectivos. Como fortaleza, se puede destacar la oportunidad de comenzar a trabajar en estas áreas desde cero, permitiendo una transformación significativa con el esfuerzo y la dedicación adecuados. Se recomienda buscar apoyo académico, desarrollar un plan de estudio estructurado y practicar técnicas de aprendizaje activo para mejorar gradualmente los hábitos de estudio y alcanzar un mayor éxito académico.', '2025-06-21 22:08:48'),
(10, '0c4c7274f2a08da1e1bc4170d0754372b0440291d95c02fe372fb456bb3d7f4c', 'Los resultados del test CASM85 revelan un panorama mixto en cuanto a los hábitos de estudio. Por un lado, se destacan fortalezas significativas en cómo se abordan el estudio en general y la realización de tareas, ambas calificadas como positivas con un puntaje de 8. Además, el acompañamiento durante los momentos de estudio también muestra una tendencia positiva con un puntaje de 6. Sin embargo, se identifican debilidades importantes en la preparación para exámenes y en la atención durante las clases, áreas en las que se observa una tendencia negativa con un puntaje de 4. Estos patrones sugieren que, aunque se cuenta con una base sólida en términos de enfoque y dedicación al estudio y a las tareas, es necesario mejorar las estrategias de preparación para exámenes y de participación activa en las clases para maximizar el potencial académico. Se recomienda desarrollar técnicas de estudio más efectivas para los exámenes y trabajar en la mejora de la concentración y participación durante las clases para equilibrar y fortalecer los hábitos de estudio de manera integral.', '2025-06-30 11:06:13');

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
(16, '5e4352d103c87ffe1ac32c9e6f7444b1947ebc1fc9e7c8a157e5c5cbf1f54b03', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que los puntajes obtenidos en todos los factores evaluados, Comprensión Verbal, Razonamiento Espacial, Razonamiento, Cálculo Numérico y Fluidez Verbal, son de 0, lo que sugiere un desempeño muy bajo en todas las áreas. Considerando que none de estos puntajes alcanza el 50% del máximo en sus respectivas escalas, se clasifican como Bajo. Esta distribución de puntajes sugiere una necesidad de mejorar en todas las áreas evaluadas. Para el desarrollo personal y profesional, se recomienda enfocarse en el desarrollo de habilidades básicas en comprensión y expresión verbal, razonamiento lógico y espacial, así como en cálculo numérico. Un enfoque integral que aborde estas debilidades puede ayudar a mejorar significativamente el desempeño cognitivo en general. Es importante destacar que, aunque los puntajes son bajos, el esfuerzo y la práctica constante pueden contribuir a una mejora sustancial en estas áreas.', '2025-06-28 19:38:01'),
(21, 'd0cf74b9171973f67ed6bfbafbedd1ff894049bfe12559c2cbf1b24d9f94ede4', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las puntuaciones en todos los factores evaluados, incluyendo Comprensión Verbal, Razonamiento Espacial, Razonamiento, Cálculo Numérico y Fluidez Verbal, son de 0, lo que sugiere un desempeño muy bajo en todas las áreas. Considerando los máximos posibles, estos puntajes se clasificarían como bajos, indicando posibles debilidades en la comprensión y expresión verbal, habilidades espaciales, capacidad de razonamiento y cálculo numérico. Para el desarrollo personal y profesional, se recomienda enfocarse en mejorar estas áreas a través de prácticas y ejercicios específicos. Sería beneficioso trabajar en la comprensión lectora y la expresión escrita para mejorar la Comprensión Verbal y la Fluidez Verbal, mientras que actividades que involucren resolución de problemas y ejercicios de lógica podrían ayudar a fortalecer el Razonamiento y el Razonamiento Espacial. Adicionalmente, prácticas de cálculo y resolución de problemas numéricos podrían mejorar el Cálculo Numérico. Un enfoque gradual y constante en estas áreas podría ayudar a mejorar significativamente los puntajes y, por ende, las aptitudes mentales primarias.', '2025-06-28 22:43:58'),
(22, 'e5ebf8a077f6d36b5a8b3bb6fd7c865ac6fe0669a33c7e05e083486d9bebbff7', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las puntuaciones en todos los factores evaluados, incluyendo Comprensión Verbal, Razonamiento Espacial, Razonamiento, Cálculo Numérico y Fluidez Verbal, están en un rango bajo, con puntajes de 0 en cada categoría. Esto sugiere que existen áreas de desarrollo significativas en las habilidades cognitivas evaluadas. Es importante destacar que no hay fortalezas destacadas en este perfil, lo que implica que el enfoque debería estar en el desarrollo general de las aptitudes mentales. Se recomienda un programa de mejora integral que aborde todas las áreas, con énfasis en ejercicios y actividades diseñadas para mejorar la comprensión verbal, el razonamiento espacial, la resolución de problemas, el cálculo numérico y la fluidez verbal. Además, sería beneficioso explorar estrategias de aprendizaje efectivas y técnicas de pensamiento crítico para ayudar a mejorar los puntajes en futuras evaluaciones y, por ende, el desempeño cognitivo general.', '2025-06-30 10:58:11'),
(23, '7a5352831210f63ceb2fcee355d8b9f90ee048429a5b4011cf63f2345641c2b3', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las aptitudes evaluadas se encuentran en un rango bajo, con puntajes muy por debajo del máximo en cada categoría. En Comprensión Verbal y Cálculo Numérico, los puntajes son de 1 sobre 50 y 70, respectivamente, lo que sugiere un desempeño bajo en estas áreas. De manera similar, en Razonamiento Espacial, Razonamiento y Fluidez Verbal, los puntajes de 0 sobre 20, 30 y 75, respectivamente, revelan una falta de fortaleza en estas habilidades cognitivas. La puntuación total de 2.50 refleja este patrón general de desempeño bajo en todas las áreas evaluadas. En términos de recomendaciones, sería beneficioso para el individuo enfocarse en el desarrollo de estas habilidades cognitivas a través de prácticas y ejercicios específicos, buscando mejorar gradualmente en cada una de las áreas evaluadas por el test PMA. Esto podría incluir actividades que fomenten la comprensión lectora, el razonamiento lógico, la resolución de problemas espaciales y numéricos, y el uso efectivo del lenguaje, con el objetivo de fortalecer sus capacidades cognitivas y alcanzar un mejor desempeño en el futuro.', '2025-06-30 11:22:57');

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
  `fecha` date NOT NULL,
  `tipo_usuario` enum('usuario','institucion') NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test_casm83`
--

INSERT INTO `test_casm83` (`id`, `id_usuario`, `categoria`, `total`, `count_a`, `count_b`, `sexo`, `fecha`, `tipo_usuario`) VALUES
(456, 8, 'CCFM', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(457, 8, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(458, 8, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(459, 8, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(460, 8, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(461, 8, 'BURO', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(462, 8, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(463, 8, 'HAA', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(464, 8, 'FINA', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(465, 8, 'LING', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(466, 8, 'JURI', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(467, 8, 'VERA', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(468, 8, 'CONS', 0, 0, 0, 'Masculino', '2025-06-30', 'institucion'),
(469, 3, 'CCFM', 6, 1, 5, 'Masculino', '2025-06-30', 'usuario'),
(470, 3, 'CCSS', 1, 1, 0, 'Masculino', '2025-06-30', 'usuario'),
(471, 3, 'CCNA', 1, 1, 0, 'Masculino', '2025-06-30', 'usuario'),
(472, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(473, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(474, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(475, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(476, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(477, 3, 'FINA', 1, 1, 0, 'Masculino', '2025-06-30', 'usuario'),
(478, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(479, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(480, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(481, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(482, 8, 'CCFM', 2, 1, 1, 'Masculino', '2025-06-30', 'usuario'),
(483, 8, 'CCSS', 1, 1, 0, 'Masculino', '2025-06-30', 'usuario'),
(484, 8, 'CCNA', 2, 0, 2, 'Masculino', '2025-06-30', 'usuario'),
(485, 8, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(486, 8, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(487, 8, 'BURO', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(488, 8, 'CCEP', 1, 1, 0, 'Masculino', '2025-06-30', 'usuario'),
(489, 8, 'HAA', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(490, 8, 'FINA', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(491, 8, 'LING', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(492, 8, 'JURI', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(493, 8, 'VERA', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario'),
(494, 8, 'CONS', 0, 0, 0, 'Masculino', '2025-06-30', 'usuario');

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
  `fecha` date DEFAULT NULL,
  `tipo_usuario` enum('usuario','institucion') NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test_casm85`
--

INSERT INTO `test_casm85` (`id`, `id_usuario`, `area`, `puntaje`, `categoria`, `fecha`, `tipo_usuario`) VALUES
(21, 8, '¿CÓMO ESTUDIA USTED?', 0, 'MUY NEGATIVO', '2025-06-22', 'usuario'),
(22, 8, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-22', 'usuario'),
(23, 8, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-22', 'usuario'),
(24, 8, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-22', 'usuario'),
(25, 8, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-22', 'usuario'),
(36, 8, '¿CÓMO ESTUDIA USTED?', 8, 'POSITIVO', '2025-06-30', 'institucion'),
(37, 8, '¿CÓMO HACE UD. SUS TAREAS?', 8, 'POSITIVO', '2025-06-30', 'institucion'),
(38, 8, '¿CÓMO PREPARA SUS EXÁMENES?', 4, 'TENDENCIA NEGATIVA', '2025-06-30', 'institucion'),
(39, 8, '¿CÓMO ESCUCHA LAS CLASES?', 4, 'TENDENCIA NEGATIVA', '2025-06-30', 'institucion'),
(40, 8, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 6, 'POSITIVO', '2025-06-30', 'institucion');

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
  `sexo` char(9) NOT NULL,
  `tipo_usuario` enum('usuario','institucion') NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test_gaston`
--

INSERT INTO `test_gaston` (`id`, `id_usuario`, `emotividad`, `actividad`, `resonancia`, `tipo_caracterologico`, `formula_caracterologica`, `fecha`, `sexo`, `tipo_usuario`) VALUES
(8, 3, 50, 58, 34, 'Colérico', 'EAP', '2025-06-29', 'Masculino', 'usuario'),
(9, 8, 50, 42, 26, 'Nervioso', 'ENAP', '2025-06-30', 'Masculino', 'institucion'),
(10, 8, 26, 26, 22, 'Amorfo', 'NENAP', '2025-06-30', 'Masculino', 'usuario');

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
  `fecha` date NOT NULL,
  `tipo_usuario` enum('usuario','institucion') NOT NULL DEFAULT 'usuario'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test_pma`
--

INSERT INTO `test_pma` (`id`, `id_usuario`, `factorV`, `factorE`, `factorR`, `factorN`, `factorF`, `puntajeTotal`, `fecha`, `tipo_usuario`) VALUES
(9, 8, '0', '0', '0', '0', '0', 0.00, '2025-06-22', 'usuario'),
(16, 3, '0', '0', '0', '0', '0', 0.00, '2025-06-29', 'usuario'),
(17, 8, '1', '0', '0', '1', '0', 2.50, '2025-06-30', 'institucion');

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
(8, 'Luis_1', 'Luis', 'Masculino', '2025-06-04', 'Carlos', 'luis@gmail.com', '$2y$10$omfjMMZdTIItVX1Xu/lDeejoZ/yHOphIb5CiFWTXfvr4bLTMAUS1S', '2025-06-16 05:25:24', 'Invitacion');

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
-- Indices de la tabla `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `DNI` (`DNI`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

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
-- Indices de la tabla `test_gaston`
--
ALTER TABLE `test_gaston`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `analisis_casm85`
--
ALTER TABLE `analisis_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `analisis_pma`
--
ALTER TABLE `analisis_pma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `codigos_invitacion`
--
ALTER TABLE `codigos_invitacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `institucion`
--
ALTER TABLE `institucion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `psicologos`
--
ALTER TABLE `psicologos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `test_casm83`
--
ALTER TABLE `test_casm83`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=495;

--
-- AUTO_INCREMENT de la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `test_gaston`
--
ALTER TABLE `test_gaston`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `test_pma`
--
ALTER TABLE `test_pma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
-- Filtros para la tabla `test_gaston`
--
ALTER TABLE `test_gaston`
  ADD CONSTRAINT `test_gaston_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `test_pma`
--
ALTER TABLE `test_pma`
  ADD CONSTRAINT `test_pma_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
