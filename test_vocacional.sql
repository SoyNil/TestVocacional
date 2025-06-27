-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-06-2025 a las 20:02:28
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
(34, '018cd528a70bbde2d7b6e8ae456bda05be846299cac70b9c55241ea931d6e4c9', 'Los resultados del Test CASM-83 indican que el participante masculino no muestra un interés claro en ninguna de las 13 categorías vocacionales evaluadas. Con puntajes muy bajos en todas las áreas, desde CCFM hasta CONS, y niveles clasificados como \"Desinterés\", se sugiere que el participante podría estar en una etapa de exploración o indecisión respecto a sus intereses vocacionales. No se observan patrones o fortalezas destacadas en este perfil, lo que podría indicar la necesidad de una exploración más profunda de sus intereses y habilidades. Se recomienda una evaluación más detallada y una orientación vocacional personalizada para ayudar al participante a identificar posibles áreas de interés y desarrollar un plan de carrera que se adapte a sus necesidades y aspiraciones.', '2025-06-25 10:50:28'),
(35, '135887b38ef93f8064b9a95394c4d8eb00a68dc8d256d4ae0b555f8317141a1f', 'El análisis de los resultados del Test CASM-83 muestra un patrón interesante en los intereses vocacionales del participante. Destaca una gran inclinación hacia la categoría CCFM, con un puntaje alto, lo que sugiere un fuerte interés en carreras relacionadas con ciencias, tecnología, ingeniería y matemáticas. Sin embargo, es notable la ausencia de intereses en las demás categorías, todas las cuales se encuentran en el nivel de desinterés. Esto indica una concentración de intereses en un área específica y una falta de inclinación hacia otras áreas como arte, burocracia, finanzas, lenguas, jurídica, entre otras. Esta claridad en los intereses puede ser una fortaleza a la hora de tomar decisiones vocacionales, ya que el participante parece tener una dirección clara hacia carreras más técnicas y científicas. La recomendación vocacional sería explorar carreras dentro del espectro de CCFM, donde el participante puede aprovechar al máximo sus intereses y habilidades, y potencialmente encontrar una carrera gratificante y que se alinee con sus pasiones.', '2025-06-25 10:54:50'),
(36, 'ff02c43f0e775f42e7fba175049b81d5ad63c0641a12c2646480c2cbc335a262', 'Los resultados del Test CASM-83 indican que el participante masculino muestra un interés vocacional extremadamente alto y concentrado en la categoría CCFM, alcanzando el puntaje máximo de 22. Esta categoría parece ser el foco principal de sus intereses, destacándose claramente de las demás áreas evaluadas. No se observan intereses significativos en las otras 12 categorías, todas las cuales se encuentran en el nivel de desinterés con puntajes de 0. Este patrón sugiere una gran claridad y dirección en sus aspiraciones profesionales, centradas en CCFM. La ausencia de intereses en otras áreas podría indicar una personalidad muy enfocada y con objetivos bien definidos. Se recomienda explorar carreras y actividades relacionadas con CCFM para aprovechar al máximo su potencial y satisfacer sus intereses vocacionales.', '2025-06-25 11:00:09'),
(37, '62e7c28ba8594f0ecca03e40b2442810947cfa7e25858a4ede81aa283f7a8b42', 'Los resultados del Test CASM-83 sugieren que el participante masculino muestra un perfil de intereses vocacionales poco definido, con una tendencia generalizada hacia el desinterés en la mayoría de las categorías evaluadas. Excepto en la categoría VERA, donde se observa un puntaje ligeramente superior y un nivel de interés clasificado como \"Bajo\", el resto de las categorías presentan puntajes mínimos y un nivel de \"Desinterés\". Esto indica que el participante podría carecer de claridad respecto a sus intereses profesionales o que sus verdaderos intereses no se alinean con las categorías evaluadas en el test. La única área que parece destacar, aunque de manera modesta, es VERA, lo que podría sugerir una inclinación hacia actividades relacionadas con este campo. Sin embargo, se recomienda una exploración más profunda y personalizada para identificar patrones y fortalezas no capturados en este test, con el fin de ofrecer recomendaciones vocacionales más precisas y alineadas con las verdaderas inclinaciones y potencialidades del participante.', '2025-06-25 11:02:50'),
(38, '209a0f6b4bcaf09ee5e343fc2d4343a39d223e9810a09d5288068684ad560183', 'Los resultados del Test CASM-83 indican que el participante masculino muestra un patrón de desinterés generalizado en todas las 13 categorías vocacionales evaluadas. Con puntajes de 0 en cada una de ellas, tanto en las respuestas A como en las B, es evidente que no hay una inclinación clara hacia ningún área en particular. Este perfil sugiere que el individuo podría estar en una fase de exploración o indecisión regarding sus intereses vocacionales, o posiblemente, que los instrumentos o contextos evaluados no han logrado capturar sus verdaderos intereses. Es importante destacar que la ausencia de intereses destacados en ninguna categoría no implica una falta de potencial, sino más bien la necesidad de una exploración más profunda y personalizada para descubrir sus fortalezas y pasiones. Se recomienda una evaluación más detallada y conversaciones con asesores vocacionales para ayudar a identificar áreas de interés y habilidades ocultas que podrían no estar reflejadas en estos resultados.', '2025-06-27 12:02:55');

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
(4, '168ecc5aa8d2be3d618aee96304e98065bf9d60b9196b6d89067d48fe563df7f', 'Los resultados del test CASM85 revelan un panorama desafiante en cuanto a los hábitos de estudio. Se observa una tendencia negativa tanto en la forma en que se estudia como en la realización de tareas, con puntajes de 4 y 3 respectivamente, lo que sugiere que es necesario mejorar la estrategia y la eficiencia en estas áreas. Sin embargo, las áreas que más preocupan son la preparación para exámenes, la escucha en clase y el acompañamiento durante los momentos de estudio, todas ellas con un puntaje de 0 y categorizadas como \"MUY NEGATIVO\". Esto indica una gran debilidad en la capacidad para prepararse adecuadamente para evaluaciones, mantener una atención y participación activa en clase, y crear un entorno de estudio propicio y libre de distracciones. Para mejorar, es fundamental que se aborden estas debilidades de manera prioritaria, estableciendo estrategias efectivas para la preparación de exámenes, practicando una escucha activa y participativa en clase, y creando un ambiente de estudio focalizado y sin distracciones. Con un enfoque dirigido a estas áreas, se pueden desarrollar hábitos de estudio más sólidos y eficaces, mejorando así el desempeño académico en general.', '2025-06-17 13:49:26'),
(7, '6d3dd0538c69229db2371c24fc97841c40d3b3518adc29c45edf34e47b633a9f', 'Los resultados del test CASM85 indican un patrón consistente de respuestas que sugieren una serie de desafíos significativos en los hábitos de estudio. En todas las cinco áreas evaluadas, los puntajes obtenidos fueron de 0, clasificados como MUY NEGATIVO. Esto sugiere una debilidad generalizada en la forma en que se abordan las tareas, se preparan los exámenes, se escuchan las clases y se acompañan los momentos de estudio. Es evidente que se necesitan mejoras sustanciales en cada una de estas áreas para desarrollar hábitos de estudio más efectivos. Como fortaleza, se puede destacar la oportunidad de comenzar a trabajar en estas áreas desde cero, permitiendo una transformación significativa con el esfuerzo y la dedicación adecuados. Se recomienda buscar apoyo académico, desarrollar un plan de estudio estructurado y practicar técnicas de aprendizaje activo para mejorar gradualmente los hábitos de estudio y alcanzar un mayor éxito académico.', '2025-06-21 22:08:48'),
(8, '2b007f21e1dbaab278209ed8f1ca87310b714557b913dafd7e19c96163a7f06e', 'Los resultados del test CASM85 destacan una tendencia muy positiva en cuatro de las cinco áreas evaluadas, lo que sugiere hábitos de estudio muy efectivos. En áreas como \"¿Cómo estudia usted?\", \"¿Cómo hace ud. sus tareas?\", \"¿Cómo prepara sus exámenes?\" y \"¿Cómo escucha las clases?\", los puntajes obtenidos indican una excelente capacidad para abordar estas tareas de manera eficiente y con una actitud muy favorable. Sin embargo, en la categoría \"¿Qué acompaña sus momentos de estudio?\", se observa una puntación ligeramente menor, catalogada como \"POSITIVO\", lo que podría indicar una oportunidad de mejora en cuanto a la creación de un entorno de estudio óptimo o la gestión de factores que acompañan el proceso de aprendizaje. En general, estos resultados sugieren que la persona tiene sólidas bases en términos de hábitos de estudio y podría beneficiarse de ajustes menores para maximizar su rendimiento académico.', '2025-06-25 10:00:35'),
(9, '03d35809c3cfa75ba9f8e7d3e3d0f2125a2dd9d4bb7991e363143bd36febc6f1', 'Los resultados del test CASM85 revelan un patrón consistente de hábitos de estudio muy negativos en las cinco áreas evaluadas. Con puntajes de 0 en cada categoría, es evidente que existen debilidades significativas en la forma en que se abordan las tareas, se preparan los exámenes, se escuchan las clases y se acompañan los momentos de estudio. Esto sugiere una falta de estrategias efectivas y una posible carencia de motivación o enfoque en el proceso de aprendizaje. Es importante destacar que no hay fortalezas identificadas en estas áreas, lo que indica una necesidad urgente de intervención y mejora. Se recomienda trabajar en el desarrollo de hábitos de estudio más efectivos, como la planificación, la organización y la práctica activa, para mejorar los resultados académicos y el rendimiento general. Además, sería beneficioso explorar estrategias para aumentar la motivación y el interés en el aprendizaje, como encontrar temas de interés o establecer metas a corto y largo plazo. Con un enfoque proactivo y el apoyo adecuado, es posible superar estas debilidades y desarrollar hábitos de estudio más positivos y productivos.', '2025-06-26 11:20:58');

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
(4, '841a251b557c88078be4379550b3d799b72f6d340298d7ff3a0801551cd99b67', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las puntuaciones obtenidas se encuentran en un rango bajo en todos los factores evaluados. La Comprensión Verbal, con un puntaje de 2 sobre 50, y la Fluidez Verbal, con un puntaje de 1 sobre 75, muestran un desempeño muy por debajo del promedio, lo que sugiere dificultades significativas en la comprensión y el uso del lenguaje. De igual forma, los puntajes de 0 en Razonamiento Espacial, Razonamiento y Cálculo Numérico reflejan un desempeño mínimo en estas áreas, lo que puede indicar debilidades en la resolución de problemas espaciales, la lógica y el manejo de números. Estos resultados sugieren que es necesario trabajar en el desarrollo de estas habilidades para mejorar el desempeño cognitivo general. Se recomienda participar en actividades y ejercicios diseñados para fortalecer estas áreas, como ejercicios de lógica, juegos de estrategia, prácticas de cálculo mental y lectura comprensiva, con el fin de mejorar las habilidades y alcanzar un mejor equilibrio en el desarrollo personal y profesional.', '2025-06-21 21:10:36'),
(5, '2952d88ddf6a2eba26674aaee4987f5236ed6383bd5e3273679ef323b349505e', 'Dado que todos los puntajes del Test de Aptitudes Mentales Primarias (PMA) son 0, es evidente que el individuo no ha demostrado habilidad en ninguna de las áreas evaluadas, que incluyen Comprensión Verbal, Razonamiento Espacial, Razonamiento, Cálculo Numérico y Fluidez Verbal. Esto sugiere debilidades significativas en todas estas áreas, lo que indica un desempeño bajo en cada una de ellas. Es importante destacar que, con puntajes de 0 en todas las categorías, el individuo enfrenta desafíos sustanciales en términos de comprensión y procesamiento de información verbal y espacial, razonamiento lógico, cálculos numéricos y capacidad para generar palabras o conceptos de manera fluida. Se recomienda un enfoque integral para el desarrollo personal y profesional, que incluya programas de entrenamiento y práctica destinados a mejorar las habilidades en cada una de estas áreas, con el fin de elevar los niveles de desempeño y alcanzar un mejor equilibrio en las aptitudes mentales.', '2025-06-21 22:09:29'),
(6, 'db1a3aed40261893a986a03247f04b52a795abbfa2c6816311cdd860153a295f', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que las puntuaciones obtenidas en todos los factores se encuentran en un rango bajo, lo que sugiere áreas de mejora significativas. La Comprensión Verbal, con un puntaje de 2 sobre 50, y la Fluidez Verbal, con un puntaje de 1 sobre 75, muestran un desempeño muy limitado en habilidades relacionadas con el lenguaje. De igual manera, el Razonamiento Espacial, el Razonamiento y el Cálculo Numérico obtuvieron puntajes de 0, lo que indica una gran debilidad en estas áreas críticas para el pensamiento lógico y la resolución de problemas. Considerando estos resultados, es fundamental enfocarse en el desarrollo de habilidades básicas en todas las áreas evaluadas. Se recomienda buscar programas de entrenamiento o tutorías personalizadas que aborden específicamente el fortalecimiento de la comprensión verbal, el razonamiento espacial, el cálculo numérico y la fluidez verbal, con el objetivo de mejorar significativamente estos aspectos y potenciar el desempeño general en tareas cognitivas. Además, prácticas regulares y ejercicios diseñados para cada una de estas áreas pueden ayudar a mejorar las habilidades y, con el tiempo, elevar las puntuaciones en futuras evaluaciones.', '2025-06-21 22:30:44'),
(7, 'e7d7421d968feb0217ee72ec4a76e86e7de2863c2a2fe1bad011e9a3ea9ac2a3', 'Los resultados del Test de Aptitudes Mentales Primarias (PMA) indican que la persona evaluada presenta una combinación interesante de fortalezas y debilidades en diferentes áreas. En el ámbito de la Comprensión Verbal (V), con un puntaje de 49 sobre 50, se sitúa en un nivel Alto, lo que sugiere una excelente capacidad para entender y procesar información verbal. De manera similar, en Razonamiento Espacial (E), alcanzó el puntaje máximo de 20, lo que destaca su habilidad para visualizar y manipular objetos en el espacio. Por otro lado, el Razonamiento (R) y el Cálculo Numérico (N) se encuentran en un rango Medio, con puntajes de 28 sobre 30 y 66 sobre 70, respectivamente, indicando capacidades desarrolladas pero con espacio para mejorar. La Fluidez Verbal (F), con un puntaje de 41 sobre 75, se ubica en un nivel Bajo, lo que podría sugerir dificultades para expresarse de manera fluida y efectiva en contextos verbales. En general, estas fortalezas y debilidades sugieren que la persona podría beneficiarse de trabajar en su expresión verbal para complementar sus sólidas habilidades en comprensión y razonamiento espacial, lo que podría mejorar significativamente su desempeño tanto en contextos personales como profesionales.', '2025-06-25 10:23:40');

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
(391, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-06-25'),
(392, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-25'),
(393, 3, 'CCNA', 1, 0, 1, 'Masculino', '2025-06-25'),
(394, 3, 'CCCO', 1, 0, 1, 'Masculino', '2025-06-25'),
(395, 3, 'ARTE', 1, 0, 1, 'Masculino', '2025-06-25'),
(396, 3, 'BURO', 1, 0, 1, 'Masculino', '2025-06-25'),
(397, 3, 'CCEP', 1, 0, 1, 'Masculino', '2025-06-25'),
(398, 3, 'HAA', 1, 0, 1, 'Masculino', '2025-06-25'),
(399, 3, 'FINA', 1, 0, 1, 'Masculino', '2025-06-25'),
(400, 3, 'LING', 1, 0, 1, 'Masculino', '2025-06-25'),
(401, 3, 'JURI', 1, 0, 1, 'Masculino', '2025-06-25'),
(402, 3, 'VERA', 2, 2, 0, 'Masculino', '2025-06-25'),
(403, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-25'),
(404, 3, 'CCFM', 24, 11, 13, 'Masculino', '2025-06-25'),
(405, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-25'),
(406, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-25'),
(407, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-25'),
(408, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-25'),
(409, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-25'),
(410, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-25'),
(411, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-25'),
(412, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-06-25'),
(413, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-25'),
(414, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-06-25'),
(415, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-25'),
(416, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-25'),
(417, 3, 'CCFM', 22, 11, 11, 'Masculino', '2025-06-25'),
(418, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-25'),
(419, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-25'),
(420, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-25'),
(421, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-25'),
(422, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-25'),
(423, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-25'),
(424, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-25'),
(425, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-06-25'),
(426, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-25'),
(427, 3, 'JURI', 0, 0, 0, 'Masculino', '2025-06-25'),
(428, 3, 'VERA', 0, 0, 0, 'Masculino', '2025-06-25'),
(429, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-25'),
(430, 3, 'CCFM', 0, 0, 0, 'Masculino', '2025-06-25'),
(431, 3, 'CCSS', 0, 0, 0, 'Masculino', '2025-06-25'),
(432, 3, 'CCNA', 0, 0, 0, 'Masculino', '2025-06-25'),
(433, 3, 'CCCO', 0, 0, 0, 'Masculino', '2025-06-25'),
(434, 3, 'ARTE', 0, 0, 0, 'Masculino', '2025-06-25'),
(435, 3, 'BURO', 0, 0, 0, 'Masculino', '2025-06-25'),
(436, 3, 'CCEP', 0, 0, 0, 'Masculino', '2025-06-25'),
(437, 3, 'HAA', 0, 0, 0, 'Masculino', '2025-06-25'),
(438, 3, 'FINA', 0, 0, 0, 'Masculino', '2025-06-25'),
(439, 3, 'LING', 0, 0, 0, 'Masculino', '2025-06-25'),
(440, 3, 'JURI', 1, 0, 1, 'Masculino', '2025-06-25'),
(441, 3, 'VERA', 3, 3, 0, 'Masculino', '2025-06-25'),
(442, 3, 'CONS', 0, 0, 0, 'Masculino', '2025-06-25');

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
(11, 3, '¿CÓMO ESTUDIA USTED?', 4, 'TENDENCIA NEGATIVA', '2025-06-17'),
(12, 3, '¿CÓMO HACE UD. SUS TAREAS?', 3, 'TENDENCIA NEGATIVA', '2025-06-17'),
(13, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(14, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-17'),
(15, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-17'),
(21, 8, '¿CÓMO ESTUDIA USTED?', 0, 'MUY NEGATIVO', '2025-06-22'),
(22, 8, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-22'),
(23, 8, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-22'),
(24, 8, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-22'),
(25, 8, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-22'),
(26, 3, '¿CÓMO ESTUDIA USTED?', 12, 'MUY POSITIVO', '2025-06-25'),
(27, 3, '¿CÓMO HACE UD. SUS TAREAS?', 10, 'MUY POSITIVO', '2025-06-25'),
(28, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 11, 'MUY POSITIVO', '2025-06-25'),
(29, 3, '¿CÓMO ESCUCHA LAS CLASES?', 12, 'MUY POSITIVO', '2025-06-25'),
(30, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 6, 'POSITIVO', '2025-06-25'),
(31, 3, '¿CÓMO ESTUDIA USTED?', 0, 'MUY NEGATIVO', '2025-06-26'),
(32, 3, '¿CÓMO HACE UD. SUS TAREAS?', 0, 'MUY NEGATIVO', '2025-06-26'),
(33, 3, '¿CÓMO PREPARA SUS EXÁMENES?', 0, 'MUY NEGATIVO', '2025-06-26'),
(34, 3, '¿CÓMO ESCUCHA LAS CLASES?', 0, 'MUY NEGATIVO', '2025-06-26'),
(35, 3, '¿QUÉ ACOMPAÑA SUS MOMENTOS DE ESTUDIO?', 0, 'MUY NEGATIVO', '2025-06-26');

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `analisis_casm85`
--
ALTER TABLE `analisis_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `analisis_pma`
--
ALTER TABLE `analisis_pma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=443;

--
-- AUTO_INCREMENT de la tabla `test_casm85`
--
ALTER TABLE `test_casm85`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `test_gaston`
--
ALTER TABLE `test_gaston`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `test_pma`
--
ALTER TABLE `test_pma`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
