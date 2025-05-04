import type { ProjectIdea } from "./project-ideas"

const masterProjectIdeas: ProjectIdea[] = [
  // Distributed Systems
  {
    titulo: "Sistema Distribuido de Alta Disponibilidad",
    descripcion:
      "Implementa un sistema distribuido con tolerancia a fallos, replicación de datos y balanceo de carga utilizando arquitectura de microservicios.",
    categoria: "Arquitectura de Sistemas",
    tecnologias: ["Go", "Rust", "Java"],
    frameworks: ["gRPC", "Kubernetes", "Istio"],
    basesdedatos: ["CockroachDB", "Cassandra"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Motor de Base de Datos Personalizado",
    descripcion:
      "Desarrolla un motor de base de datos optimizado para un caso de uso específico, con soporte para transacciones ACID, índices avanzados y consultas distribuidas.",
    categoria: "Bases de Datos",
    tecnologias: ["C++", "Rust"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Compilador de Lenguaje de Programación",
    descripcion:
      "Diseña e implementa un compilador completo para un lenguaje de programación personalizado, incluyendo análisis léxico, sintáctico, semántico y generación de código.",
    categoria: "Compiladores",
    tecnologias: ["C++", "OCaml", "Haskell"],
    frameworks: ["LLVM"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Sistema de Procesamiento de Big Data en Tiempo Real",
    descripcion:
      "Crea un sistema para procesar y analizar grandes volúmenes de datos en tiempo real con baja latencia y alta disponibilidad.",
    categoria: "Big Data",
    tecnologias: ["Scala", "Java"],
    frameworks: ["Apache Spark", "Apache Kafka", "Apache Flink"],
    basesdedatos: ["Apache Cassandra", "InfluxDB"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // AI/ML Advanced
  {
    titulo: "Plataforma de Aprendizaje Federado",
    descripcion:
      "Desarrolla una plataforma para entrenar modelos de machine learning de forma distribuida sin compartir datos sensibles entre participantes.",
    categoria: "IA",
    tecnologias: ["Python", "C++"],
    frameworks: ["TensorFlow", "PyTorch"],
    basesdedatos: ["MongoDB", "Redis"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Motor de Búsqueda Semántica",
    descripcion:
      "Implementa un motor de búsqueda que comprenda el significado y contexto de las consultas utilizando procesamiento de lenguaje natural avanzado.",
    categoria: "IA",
    tecnologias: ["Python", "Rust"],
    frameworks: ["Transformers", "FAISS", "Elasticsearch"],
    basesdedatos: ["PostgreSQL", "Neo4j"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Detección de Anomalías en Series Temporales",
    descripcion:
      "Crea un sistema para detectar anomalías en datos de series temporales utilizando técnicas avanzadas de machine learning y estadística.",
    categoria: "IA",
    tecnologias: ["Python", "R"],
    frameworks: ["TensorFlow", "Prophet", "Keras"],
    basesdedatos: ["InfluxDB", "TimescaleDB"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Plataforma de Generación de Contenido con IA",
    descripcion:
      "Desarrolla una plataforma que utilice modelos generativos avanzados para crear contenido multimedia (texto, imágenes, música) con controles precisos.",
    categoria: "IA",
    tecnologias: ["Python", "JavaScript"],
    frameworks: ["PyTorch", "React", "Next.js"],
    basesdedatos: ["MongoDB", "Redis"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // Security
  {
    titulo: "Framework de Seguridad para Aplicaciones Distribuidas",
    descripcion:
      "Diseña e implementa un framework de seguridad completo para aplicaciones distribuidas con autenticación, autorización, cifrado y auditoría.",
    categoria: "Seguridad",
    tecnologias: ["Rust", "Go"],
    frameworks: ["Tokio", "gRPC"],
    basesdedatos: ["PostgreSQL"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Plataforma de Análisis de Vulnerabilidades",
    descripcion:
      "Crea una plataforma para detectar, analizar y clasificar vulnerabilidades en código fuente y aplicaciones desplegadas.",
    categoria: "Seguridad",
    tecnologias: ["Python", "Rust"],
    frameworks: ["Django", "React"],
    basesdedatos: ["PostgreSQL", "Elasticsearch"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Detección y Respuesta a Intrusiones",
    descripcion:
      "Implementa un sistema avanzado para detectar, analizar y responder automáticamente a intrusiones en redes y sistemas.",
    categoria: "Seguridad",
    tecnologias: ["Python", "Go"],
    frameworks: ["Zeek", "Suricata"],
    basesdedatos: ["Elasticsearch", "ClickHouse"],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },

  // High Performance Computing
  {
    titulo: "Motor de Física para Simulaciones Científicas",
    descripcion:
      "Desarrolla un motor de física de alto rendimiento para simulaciones científicas complejas con soporte para computación paralela y distribuida.",
    categoria: "Computación de Alto Rendimiento",
    tecnologias: ["C++", "CUDA"],
    frameworks: ["OpenMP", "MPI"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Sistema de Renderizado 3D en Tiempo Real",
    descripcion:
      "Implementa un sistema de renderizado 3D avanzado con técnicas modernas como ray tracing, iluminación global y física realista.",
    categoria: "Gráficos por Computadora",
    tecnologias: ["C++", "Rust"],
    frameworks: ["Vulkan", "DirectX 12"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Biblioteca de Algoritmos Criptográficos Post-Cuánticos",
    descripcion:
      "Crea una biblioteca de algoritmos criptográficos resistentes a ataques cuánticos con implementaciones optimizadas y verificables formalmente.",
    categoria: "Criptografía",
    tecnologias: ["Rust", "C++"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },

  // Web/Cloud Advanced
  {
    titulo: "Plataforma Serverless Personalizada",
    descripcion:
      "Diseña e implementa una plataforma serverless completa con aislamiento de funciones, escalado automático y observabilidad.",
    categoria: "Cloud Computing",
    tecnologias: ["Go", "Rust"],
    frameworks: ["Kubernetes", "Prometheus"],
    basesdedatos: ["etcd", "PostgreSQL"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Framework Web de Alto Rendimiento",
    descripcion: "Desarrolla un framework web optimizado para alto rendimiento, baja latencia y eficiencia energética.",
    categoria: "Web",
    tecnologias: ["Rust", "C++"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Caché Distribuido",
    descripcion:
      "Implementa un sistema de caché distribuido con consistencia configurable, particionamiento automático y recuperación ante fallos.",
    categoria: "Sistemas Distribuidos",
    tecnologias: ["Go", "Rust"],
    frameworks: ["gRPC"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // Blockchain/Web3
  {
    titulo: "Plataforma Blockchain Personalizada",
    descripcion:
      "Diseña e implementa una blockchain completa con mecanismo de consenso, contratos inteligentes y pruebas formales de seguridad.",
    categoria: "Blockchain",
    tecnologias: ["Rust", "Go"],
    frameworks: [],
    basesdedatos: ["RocksDB"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Identidad Descentralizada",
    descripcion:
      "Desarrolla un sistema de identidad descentralizada con credenciales verificables, pruebas de conocimiento cero y privacidad por diseño.",
    categoria: "Blockchain",
    tecnologias: ["Rust", "TypeScript"],
    frameworks: ["Substrate", "React"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Plataforma de Finanzas Descentralizadas (DeFi)",
    descripcion:
      "Crea una plataforma DeFi completa con protocolos de préstamo, intercambio y derivados financieros con seguridad verificable formalmente.",
    categoria: "Blockchain",
    tecnologias: ["Solidity", "Rust"],
    frameworks: ["Hardhat", "Anchor"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // Mobile/Embedded
  {
    titulo: "Sistema Operativo para Dispositivos IoT",
    descripcion:
      "Desarrolla un sistema operativo ligero y seguro para dispositivos IoT con soporte para actualizaciones OTA y aislamiento de aplicaciones.",
    categoria: "IoT",
    tecnologias: ["Rust", "C"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Framework de Aplicaciones Móviles de Alto Rendimiento",
    descripcion:
      "Crea un framework para desarrollar aplicaciones móviles de alto rendimiento con renderizado nativo y lógica compartida entre plataformas.",
    categoria: "Móvil",
    tecnologias: ["Rust", "C++", "Kotlin", "Swift"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Móvil",
  },
  {
    titulo: "Plataforma de Realidad Aumentada Avanzada",
    descripcion:
      "Implementa una plataforma de realidad aumentada con reconocimiento avanzado de objetos, mapeo espacial y renderizado fotorrealista.",
    categoria: "Realidad Aumentada",
    tecnologias: ["C++", "Swift", "Kotlin"],
    frameworks: ["ARKit", "ARCore", "Vulkan"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Móvil",
  },

  // Gaming
  {
    titulo: "Motor de Juegos Multiplataforma",
    descripcion:
      "Diseña e implementa un motor de juegos completo con renderizado avanzado, física, audio, networking y herramientas de desarrollo.",
    categoria: "Juegos",
    tecnologias: ["C++", "Rust"],
    frameworks: ["Vulkan", "DirectX 12"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Sistema de IA para NPCs en Juegos",
    descripcion:
      "Desarrolla un sistema avanzado de inteligencia artificial para personajes no jugables con comportamientos emergentes y aprendizaje.",
    categoria: "Juegos",
    tecnologias: ["C++", "C#"],
    frameworks: ["Unity", "Unreal Engine"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Plataforma de Juegos en la Nube",
    descripcion:
      "Crea una plataforma para ejecutar juegos en la nube con streaming de baja latencia, escalado automático y sincronización entre dispositivos.",
    categoria: "Juegos",
    tecnologias: ["C++", "Rust", "Go"],
    frameworks: ["WebRTC", "Kubernetes"],
    basesdedatos: ["Redis", "PostgreSQL"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // Data Engineering
  {
    titulo: "Motor de Consultas Distribuido",
    descripcion:
      "Implementa un motor de consultas distribuido para análisis de datos a gran escala con optimización automática de consultas.",
    categoria: "Bases de Datos",
    tecnologias: ["Rust", "C++"],
    frameworks: ["Arrow", "DataFusion"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Plataforma de Integración de Datos en Tiempo Real",
    descripcion:
      "Desarrolla una plataforma para integrar, transformar y sincronizar datos de múltiples fuentes en tiempo real con garantías de consistencia.",
    categoria: "Integración de Datos",
    tecnologias: ["Java", "Scala"],
    frameworks: ["Apache Kafka", "Apache Flink"],
    basesdedatos: ["PostgreSQL", "MongoDB"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Almacenamiento de Series Temporales",
    descripcion:
      "Crea un sistema optimizado para almacenar y consultar eficientemente grandes volúmenes de datos de series temporales.",
    categoria: "Bases de Datos",
    tecnologias: ["Rust", "C++"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },

  // Programming Languages
  {
    titulo: "Lenguaje de Programación con Sistema de Tipos Avanzado",
    descripcion:
      "Diseña e implementa un lenguaje de programación con un sistema de tipos avanzado que garantice seguridad y expresividad.",
    categoria: "Lenguajes de Programación",
    tecnologias: ["OCaml", "Rust"],
    frameworks: ["LLVM"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Entorno de Desarrollo Interactivo",
    descripcion:
      "Desarrolla un entorno de desarrollo interactivo con evaluación incremental, depuración avanzada y visualización de datos.",
    categoria: "Herramientas de Desarrollo",
    tecnologias: ["TypeScript", "Rust"],
    frameworks: ["React", "Monaco Editor"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Verificación Formal",
    descripcion:
      "Implementa un sistema para verificar formalmente propiedades de programas utilizando lógica de Hoare, model checking o asistentes de prueba.",
    categoria: "Verificación Formal",
    tecnologias: ["OCaml", "Coq", "Lean"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },

  // Quantum Computing
  {
    titulo: "Simulador de Computación Cuántica",
    descripcion:
      "Desarrolla un simulador de computación cuántica de alto rendimiento con soporte para diferentes modelos de ruido y algoritmos cuánticos.",
    categoria: "Computación Cuántica",
    tecnologias: ["C++", "Python"],
    frameworks: ["CUDA"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Biblioteca de Algoritmos Cuánticos",
    descripcion:
      "Crea una biblioteca de algoritmos cuánticos optimizados para diferentes arquitecturas de hardware cuántico.",
    categoria: "Computación Cuántica",
    tecnologias: ["Python", "Q#"],
    frameworks: ["Qiskit", "Cirq"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },

  // Robotics
  {
    titulo: "Framework de Control para Robots Autónomos",
    descripcion:
      "Diseña e implementa un framework para controlar robots autónomos con planificación de movimiento, percepción y toma de decisiones.",
    categoria: "Robótica",
    tecnologias: ["C++", "Python"],
    frameworks: ["ROS 2"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Sistema de Visión por Computadora para Robots",
    descripcion:
      "Desarrolla un sistema avanzado de visión por computadora para robots con reconocimiento de objetos, estimación de pose y reconstrucción 3D.",
    categoria: "Robótica",
    tecnologias: ["C++", "Python"],
    frameworks: ["OpenCV", "PyTorch"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },

  // Bioinformatics
  {
    titulo: "Plataforma de Análisis Genómico",
    descripcion:
      "Crea una plataforma para analizar datos genómicos a gran escala con algoritmos optimizados para alineamiento, ensamblaje y anotación.",
    categoria: "Bioinformática",
    tecnologias: ["Rust", "Python"],
    frameworks: ["PyTorch"],
    basesdedatos: ["PostgreSQL"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Simulación de Proteínas",
    descripcion:
      "Implementa un sistema para simular el plegamiento y dinámica de proteínas utilizando técnicas avanzadas de física computacional.",
    categoria: "Bioinformática",
    tecnologias: ["C++", "CUDA"],
    frameworks: ["OpenMM"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },

  // Advanced Web
  {
    titulo: "Framework Web con Renderizado Isomórfico",
    descripcion:
      "Desarrolla un framework web con renderizado isomórfico, hidratación progresiva y optimización automática de rendimiento.",
    categoria: "Web",
    tecnologias: ["TypeScript", "Rust"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Gestión de Contenido Headless",
    descripcion:
      "Crea un CMS headless con modelado de contenido flexible, versionado, localización y API GraphQL optimizada.",
    categoria: "Web",
    tecnologias: ["TypeScript", "Go"],
    frameworks: ["Next.js", "GraphQL"],
    basesdedatos: ["PostgreSQL"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Plataforma de E-commerce de Alta Escalabilidad",
    descripcion:
      "Implementa una plataforma de e-commerce diseñada para manejar picos de tráfico extremos con alta disponibilidad y baja latencia.",
    categoria: "E-commerce",
    tecnologias: ["Go", "TypeScript"],
    frameworks: ["React", "gRPC"],
    basesdedatos: ["PostgreSQL", "Redis", "Elasticsearch"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // DevOps/SRE
  {
    titulo: "Plataforma de Observabilidad Distribuida",
    descripcion:
      "Desarrolla una plataforma completa para monitorear, trazar y depurar sistemas distribuidos a gran escala.",
    categoria: "DevOps",
    tecnologias: ["Go", "Rust"],
    frameworks: ["OpenTelemetry"],
    basesdedatos: ["ClickHouse", "Prometheus"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Despliegue Continuo Multi-Entorno",
    descripcion:
      "Crea un sistema avanzado de CI/CD con despliegues canary, rollbacks automáticos y verificación de calidad.",
    categoria: "DevOps",
    tecnologias: ["Go", "TypeScript"],
    frameworks: ["Kubernetes", "Argo CD"],
    basesdedatos: ["PostgreSQL", "etcd"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Plataforma de Infraestructura como Código",
    descripcion:
      "Implementa una plataforma para gestionar infraestructura como código con validación, testing y gestión de dependencias.",
    categoria: "DevOps",
    tecnologias: ["Go", "TypeScript"],
    frameworks: ["Kubernetes"],
    basesdedatos: ["PostgreSQL"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
]

export default masterProjectIdeas
