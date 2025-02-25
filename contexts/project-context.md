# API FUDEM - Especificaciones Técnicas

Este archivo define las especificaciones técnicas y configuraciones específicas del proyecto API FUDEM.

## Stack Tecnológico
- Runtime: Node.js v10
- Framework: Express.js 4.x
- Base de datos: MongoDB 6.0
- ODM: Mongoose 7.x
- Autenticación: JWT con passport.js
- Documentación: Swagger/OpenAPI 3.0
- Testing: Jest + Supertest

## Estructura del Proyecto
```
/api_fudem
├── /src
│   ├── /controllers    # Lógica de negocio
│   ├── /models        # Modelos Mongoose
│   ├── /routes        # Definición de endpoints
│   ├── /middleware    # Middlewares personalizados
│   ├── /services      # Servicios externos y lógica compleja
│   ├── /utils         # Utilidades y helpers
│   └── /config        # Configuraciones
├── /tests
│   ├── /unit          # Tests unitarios
│   └── /integration   # Tests de integración
└── /docs              # Documentación del proyecto
```

## Configuración de Base de Datos
- Conexión: MongoDB Atlas
- Colecciones principales:
  - users
  - patients
  - appointments
  - medical_records
- Índices requeridos por colección
- Esquemas con timestamps

## API Endpoints
- Base URL: /api/v1
- Autenticación requerida en headers:
  ```
  Authorization: Bearer <token>
  ```
- Formato de respuesta estándar:
  ```json
  {
    "success": boolean,
    "data": object|array,
    "error": string|null
  }
  ```

## Variables de Entorno
- NODE_ENV
- MONGODB_URI
- JWT_SECRET
- API_PORT
- CORS_ORIGINS

## Dependencias Principales
- express
- mongoose
- passport
- jsonwebtoken
- cors
- helmet
- winston

## Scripts NPM
- start: Inicia en producción
- dev: Inicia con nodemon
- test: Ejecuta tests
- lint: Verifica estilo
- build: Transpila código

## Integración Continua
- GitHub Actions para CI/CD
- Despliegue automático a staging
- Tests automáticos en PRs
- Análisis de código con SonarCloud

## Contexto técnico y de infraestructura del proyecto FUDEM Frontend:

1. Stack Tecnológico:
- Node.js v10.x
- Vue.js
- Vuetify 1.5.x
- Vue Router para navegación
- Vuex para gestión de estado

2. Estructura del Proyecto:
- /src/components: Componentes Vue reutilizables
- /src/views: Vistas principales de la aplicación
- /src/router: Configuración de rutas
- /src/store: Módulos Vuex y gestión de estado
- /src/assets: Recursos estáticos
- /src/plugins: Plugins y configuraciones

3. Convenciones de Componentes:
- Nombres en PascalCase para componentes
- Props documentadas con tipos y validaciones
- Eventos emitidos documentados
- Métodos con nombres descriptivos en camelCase

4. Gestión de Estado:
- Usar Vuex para estado global
- Estado local para componentes aislados
- Acciones asíncronas en actions de Vuex
- Getters para datos computados del store

5. Estilo y UI:
- Seguir guías de diseño de Vuetify 1.5
- Componentes responsive
- Mantener consistencia en el diseño
- Usar variables CSS para temas

6. Performance:
- Lazy loading de rutas
- Optimización de imágenes
- Minimizar dependencias externas
- Code splitting cuando sea posible

7. Compatibilidad:
- Soporte para navegadores modernos
- Polyfills necesarios para IE11+
- Responsive design para móviles

8. Deployment:
- Build optimizado para producción
- Variables de entorno configuradas
- Archivos estáticos en CDN
- Caché apropiado para assets
