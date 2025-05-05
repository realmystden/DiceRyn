import type { ProjectIdea } from "./project-ideas"

const masterProjectIdeas: ProjectIdea[] = [
  // Distributed Systems
  {
    titulo: "Sistema Distribuido de Alta Disponibilidad",
    descripcion:
      "Implementa un sistema distribuido con tolerancia a fallos, replicación de datos y balanceo de carga que pueda escalar horizontalmente para manejar millones de solicitudes por segundo.",
    categoria: "Sistemas Distribuidos",
    tecnologias: ["Go", "Rust", "Java"],
    frameworks: ["gRPC", "Kubernetes", "Istio"],
    basesdedatos: ["Cassandra", "CockroachDB"],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Motor de Procesamiento de Eventos en Tiempo Real",
    descripcion:
      "Desarrolla un motor de procesamiento de eventos que pueda ingerir, procesar y analizar millones de eventos por segundo con latencia submilisegundo y garantías de entrega exactamente una vez.",
    categoria: "Procesamiento de Datos",
    tecnologias: ["Scala", "Java", "Rust"],
    frameworks: ["Akka", "Kafka Streams", "Flink"],
    basesdedatos: ["Kafka", "Redis", "TimescaleDB"],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Sistema de Almacenamiento Distribuido",
    descripcion:
      "Crea un sistema de almacenamiento distribuido con particionamiento de datos, replicación y consistencia ajustable que pueda escalar a petabytes de datos.",
    categoria: "Almacenamiento",
    tecnologias: ["C++", "Rust", "Go"],
    frameworks: ["RAFT", "Paxos"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },

  // AI/ML
  {
    titulo: "Motor de Recomendación Personalizado",
    descripcion:
      "Desarrolla un sistema de recomendación avanzado que combine filtrado colaborativo, procesamiento de lenguaje natural y aprendizaje por refuerzo para proporcionar recomendaciones altamente personalizadas.",
    categoria: "IA",
    tecnologias: ["Python", "Rust"],
    frameworks: ["PyTorch", "TensorFlow", "Ray"],
    basesdedatos: ["MongoDB", "Neo4j"],
    nivel: "Master",
    tipo: "API",
  },
  {
    titulo: "Plataforma de Aprendizaje Federado",
    descripcion:
      "Implementa una plataforma de aprendizaje federado que permita entrenar modelos de IA en datos distribuidos sin comprometer la privacidad de los usuarios.",
    categoria: "IA",
    tecnologias: ["Python", "C++"],
    frameworks: ["TensorFlow Federated", "PySyft"],
    basesdedatos: ["PostgreSQL"],
    nivel: "Master",
    tipo: "API",
  },
  {
    titulo: "Sistema de Detección de Anomalías en Tiempo Real",
    descripcion:
      "Crea un sistema que detecte anomalías en tiempo real en flujos de datos masivos utilizando técnicas avanzadas de aprendizaje automático y procesamiento de señales.",
    categoria: "IA",
    tecnologias: ["Python", "Scala"],
    frameworks: ["Spark Streaming", "PyTorch", "Kafka"],
    basesdedatos: ["InfluxDB", "Elasticsearch"],
    nivel: "Master",
    tipo: "Backend",
  },

  // Security
  {
    titulo: "Plataforma de Seguridad Zero-Trust",
    descripcion:
      "Desarrolla una plataforma de seguridad basada en el modelo Zero-Trust con autenticación multifactor, autorización contextual y monitoreo continuo de comportamiento.",
    categoria: "Seguridad",
    tecnologias: ["Rust", "Go", "TypeScript"],
    frameworks: ["SPIFFE/SPIRE", "OPA", "Envoy"],
    basesdedatos: ["PostgreSQL", "Redis"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Sistema de Detección y Respuesta a Intrusiones",
    descripcion:
      "Implementa un sistema avanzado de detección y respuesta a intrusiones que utilice aprendizaje automático para identificar amenazas y responder automáticamente a incidentes de seguridad.",
    categoria: "Seguridad",
    tecnologias: ["Python", "Go", "Rust"],
    frameworks: ["Suricata", "Zeek", "TensorFlow"],
    basesdedatos: ["Elasticsearch", "Kafka"],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Plataforma de Análisis de Vulnerabilidades",
    descripcion:
      "Crea una plataforma que analice código, infraestructura y configuraciones para identificar vulnerabilidades de seguridad y proporcionar recomendaciones de mitigación.",
    categoria: "Seguridad",
    tecnologias: ["Python", "TypeScript", "Go"],
    frameworks: ["OWASP ZAP", "Trivy", "Semgrep"],
    basesdedatos: ["PostgreSQL", "Neo4j"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // Blockchain
  {
    titulo: "Plataforma Blockchain Personalizada",
    descripcion:
      "Desarrolla una blockchain personalizada con un mecanismo de consenso eficiente, contratos inteligentes y alta capacidad de procesamiento de transacciones.",
    categoria: "Blockchain",
    tecnologias: ["Rust", "Go", "C++"],
    frameworks: ["Substrate", "Tendermint"],
    basesdedatos: ["RocksDB", "LevelDB"],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Sistema de Identidad Descentralizada",
    descripcion:
      "Implementa un sistema de identidad descentralizada basado en blockchain que permita a los usuarios controlar sus datos personales y credenciales verificables.",
    categoria: "Blockchain",
    tecnologias: ["TypeScript", "Rust"],
    frameworks: ["Hyperledger Aries", "DID", "Verifiable Credentials"],
    basesdedatos: ["IPFS", "OrbitDB"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },
  {
    titulo: "Plataforma DeFi Avanzada",
    descripcion:
      "Crea una plataforma DeFi completa con protocolos de préstamo, intercambio y derivados financieros implementados como contratos inteligentes.",
    categoria: "Blockchain",
    tecnologias: ["Solidity", "Rust", "TypeScript"],
    frameworks: ["Hardhat", "Anchor", "React"],
    basesdedatos: ["The Graph", "IPFS"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // Databases
  {
    titulo: "Motor de Base de Datos Personalizado",
    descripcion:
      "Desarrolla un motor de base de datos optimizado para un caso de uso específico, con un modelo de almacenamiento eficiente, índices avanzados y un lenguaje de consulta personalizado.",
    categoria: "Bases de Datos",
    tecnologias: ["C++", "Rust", "Go"],
    frameworks: ["LLVM", "RocksDB"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Sistema de Almacenamiento de Series Temporales",
    descripcion:
      "Implementa un sistema de almacenamiento optimizado para datos de series temporales con compresión avanzada, consultas eficientes y políticas de retención configurables.",
    categoria: "Bases de Datos",
    tecnologias: ["Rust", "C++", "Go"],
    frameworks: ["Arrow", "InfluxDB Engine"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Base de Datos Vectorial para IA",
    descripcion:
      "Crea una base de datos vectorial optimizada para búsquedas de similitud en espacios de alta dimensión, ideal para aplicaciones de IA y recuperación de información.",
    categoria: "Bases de Datos",
    tecnologias: ["Rust", "C++", "Python"],
    frameworks: ["FAISS", "HNSW"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },

  // Compilers and Programming Languages
  {
    titulo: "Compilador para un Lenguaje de Programación Personalizado",
    descripcion:
      "Desarrolla un compilador completo para un lenguaje de programación personalizado, incluyendo análisis léxico, sintáctico, semántico, optimización y generación de código.",
    categoria: "Compiladores",
    tecnologias: ["Rust", "C++", "OCaml"],
    frameworks: ["LLVM", "ANTLR"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Intérprete de Lenguaje de Dominio Específico",
    descripcion:
      "Implementa un intérprete para un lenguaje de dominio específico (DSL) diseñado para resolver problemas en un dominio particular de manera eficiente y expresiva.",
    categoria: "Lenguajes",
    tecnologias: ["Rust", "TypeScript", "Python"],
    frameworks: ["ANTLR", "Tree-sitter"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Motor de Ejecución de Código Seguro",
    descripcion:
      "Crea un entorno de ejecución aislado que permita ejecutar código no confiable de manera segura, con límites de recursos y permisos granulares.",
    categoria: "Seguridad",
    tecnologias: ["Rust", "C++", "WebAssembly"],
    frameworks: ["V8", "Wasmtime"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },

  // Graphics and Simulation
  {
    titulo: "Motor de Renderizado 3D Avanzado",
    descripcion:
      "Desarrolla un motor de renderizado 3D con técnicas avanzadas como ray tracing, iluminación global y materiales físicamente correctos.",
    categoria: "Gráficos",
    tecnologias: ["C++", "Rust", "GLSL"],
    frameworks: ["Vulkan", "DirectX", "OptiX"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Simulador de Física en Tiempo Real",
    descripcion:
      "Implementa un simulador de física en tiempo real que modele fluidos, cuerpos rígidos, telas y otros fenómenos físicos con alta precisión y rendimiento.",
    categoria: "Simulación",
    tecnologias: ["C++", "CUDA", "Rust"],
    frameworks: ["PhysX", "Bullet", "OpenCL"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Plataforma de Realidad Virtual Colaborativa",
    descripcion:
      "Crea una plataforma de realidad virtual que permita a múltiples usuarios interactuar en un espacio compartido con baja latencia y sincronización precisa.",
    categoria: "Realidad Virtual",
    tecnologias: ["C#", "C++", "TypeScript"],
    frameworks: ["Unity", "WebXR", "WebRTC"],
    basesdedatos: ["Redis", "MongoDB"],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },

  // Networking and Protocols
  {
    titulo: "Implementación de Protocolo de Red Personalizado",
    descripcion:
      "Desarrolla un protocolo de red personalizado optimizado para un caso de uso específico, con mecanismos de control de congestión, recuperación de errores y seguridad integrada.",
    categoria: "Redes",
    tecnologias: ["Rust", "C++", "Go"],
    frameworks: ["QUIC", "libp2p"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Proxy de Red Programable",
    descripcion:
      "Implementa un proxy de red programable que pueda inspeccionar, transformar y enrutar tráfico de red con reglas personalizables y extensiones dinámicas.",
    categoria: "Redes",
    tecnologias: ["Rust", "Go", "C++"],
    frameworks: ["Envoy", "eBPF"],
    basesdedatos: ["Redis", "etcd"],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Sistema de Comunicación Segura P2P",
    descripcion:
      "Crea un sistema de comunicación peer-to-peer con cifrado de extremo a extremo, enrutamiento anónimo y resistencia a la censura.",
    categoria: "Redes",
    tecnologias: ["Rust", "Go", "TypeScript"],
    frameworks: ["libp2p", "Noise Protocol"],
    basesdedatos: ["IPFS", "OrbitDB"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // Operating Systems and Low-level
  {
    titulo: "Kernel de Sistema Operativo Minimalista",
    descripcion:
      "Desarrolla un kernel de sistema operativo minimalista con planificación de procesos, gestión de memoria y controladores de dispositivos básicos.",
    categoria: "Sistemas Operativos",
    tecnologias: ["Rust", "C", "Assembly"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Hipervisor de Máquina Virtual",
    descripcion:
      "Implementa un hipervisor que permita ejecutar múltiples sistemas operativos en una misma máquina con aislamiento y virtualización eficiente.",
    categoria: "Virtualización",
    tecnologias: ["C", "Rust", "Assembly"],
    frameworks: ["KVM", "QEMU"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Sistema de Archivos Distribuido",
    descripcion:
      "Crea un sistema de archivos distribuido con replicación, tolerancia a fallos y semántica de consistencia configurable.",
    categoria: "Almacenamiento",
    tecnologias: ["Go", "Rust", "C++"],
    frameworks: ["gRPC", "FUSE"],
    basesdedatos: ["etcd", "RocksDB"],
    nivel: "Master",
    tipo: "Backend",
  },

  // Web and Cloud
  {
    titulo: "Framework Web de Alto Rendimiento",
    descripcion:
      "Desarrolla un framework web de alto rendimiento con enrutamiento eficiente, manejo de solicitudes asíncronas y optimizaciones avanzadas.",
    categoria: "Web",
    tecnologias: ["Rust", "Go", "TypeScript"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Plataforma Serverless Personalizada",
    descripcion:
      "Implementa una plataforma serverless que permita ejecutar funciones en respuesta a eventos con escalado automático y aislamiento de recursos.",
    categoria: "Cloud",
    tecnologias: ["Go", "Rust", "TypeScript"],
    frameworks: ["Kubernetes", "Knative", "WASM"],
    basesdedatos: ["etcd", "Redis"],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "CDN Programable",
    descripcion:
      "Crea una red de distribución de contenido (CDN) programable con edge computing, caché inteligente y optimización de entrega de contenido.",
    categoria: "Web",
    tecnologias: ["Rust", "Go", "JavaScript"],
    frameworks: ["V8", "Envoy"],
    basesdedatos: ["Redis", "LevelDB"],
    nivel: "Master",
    tipo: "Backend",
  },

  // Mobile and IoT
  {
    titulo: "Framework de Aplicaciones Móviles Multiplataforma",
    descripcion:
      "Desarrolla un framework para crear aplicaciones móviles multiplataforma con rendimiento nativo, acceso a APIs del sistema y experiencia de desarrollo fluida.",
    categoria: "Móvil",
    tecnologias: ["Rust", "C++", "TypeScript"],
    frameworks: [],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación Móvil",
  },
  {
    titulo: "Sistema Operativo para IoT",
    descripcion:
      "Implementa un sistema operativo ligero para dispositivos IoT con soporte para actualizaciones OTA, seguridad robusta y bajo consumo de energía.",
    categoria: "IoT",
    tecnologias: ["C", "Rust", "Assembly"],
    frameworks: ["FreeRTOS", "Zephyr"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Backend",
  },
  {
    titulo: "Plataforma de Gestión de Dispositivos IoT",
    descripcion:
      "Crea una plataforma para gestionar, monitorear y actualizar miles de dispositivos IoT de manera segura y eficiente.",
    categoria: "IoT",
    tecnologias: ["Go", "Rust", "TypeScript"],
    frameworks: ["MQTT", "gRPC", "React"],
    basesdedatos: ["TimescaleDB", "Kafka"],
    nivel: "Master",
    tipo: "Aplicación Web",
  },

  // Game Development
  {
    titulo: "Motor de Juegos Personalizado",
    descripcion:
      "Desarrolla un motor de juegos completo con renderizado, física, audio, networking y herramientas de desarrollo.",
    categoria: "Juegos",
    tecnologias: ["C++", "Rust", "C#"],
    frameworks: ["Vulkan", "PhysX", "FMOD"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Sistema de IA para Juegos",
    descripcion:
      "Implementa un sistema de inteligencia artificial para juegos con planificación de caminos, toma de decisiones y aprendizaje por refuerzo.",
    categoria: "Juegos",
    tecnologias: ["C++", "C#", "Python"],
    frameworks: ["Unity", "TensorFlow", "PyTorch"],
    basesdedatos: [],
    nivel: "Master",
    tipo: "Aplicación de Escritorio",
  },
  {
    titulo: "Plataforma de Juegos Multijugador Masivos",
    descripcion:
      "Crea una plataforma para juegos multijugador masivos con arquitectura distribuida, sincronización de estado y matchmaking avanzado.",
    categoria: "Juegos",
    tecnologias: ["Go", "Rust", "C++"],
    frameworks: ["gRPC", "WebRTC", "Redis"],
    basesdedatos: ["ScyllaDB", "Redis"],
    nivel: "Master",
    tipo: "Backend",
  },
]

export default masterProjectIdeas
