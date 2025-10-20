# Mi Jopara

<div align="center">

**Una aplicación móvil moderna para gestión de recetas**

Construida con Ionic + Angular

[![Ionic](https://img.shields.io/badge/Ionic-8-3880FF?style=flat&logo=ionic&logoColor=white)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-7-119EFF?style=flat&logo=capacitor&logoColor=white)](https://capacitorjs.com/)

</div>

---

## Acerca de

**Mi Jopara** es una aplicación móvil multiplataforma diseñada para ayudar a los usuarios a descubrir, organizar y gestionar sus recetas favoritas. Ya sea que estés buscando ideas para el desayuno, comidas saludables o planes nutricionales para aumentar masa muscular, Mi Jopara proporciona una interfaz intuitiva para explorar y guardar las recetas que te interesan.

El nombre "Mi Jopara" está inspirado en la cocina paraguaya, reflejando un compromiso con experiencias culinarias diversas y culturalmente ricas.

## Características

- **Explorar Recetas**: Descubre una colección curada de recetas en múltiples categorías
- **Búsqueda Inteligente**: Encuentra recetas por nombre o ingredientes al instante
- **Filtrado por Categorías**: Filtra recetas por tipo de comida, objetivos dietéticos o preferencias de sabor
  - Desayuno, Almuerzo, Merienda, Cena
  - Saludables, Salados, Dulces
  - Masa Muscular, Bajar de Peso
- **Colección de Favoritos**: Guarda tus recetas favoritas para acceso rápido
- **Recetas Populares**: Descubre recetas en tendencia y mejor valoradas
- **Información Nutricional Detallada**: Visualiza información nutricional completa para cada receta
- **Diseño Responsivo**: Optimizado tanto para dispositivos iOS como Android

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Ionic Framework** | 8 | Componentes UI multiplataforma |
| **Angular** | 20 | Framework de aplicación con componentes standalone |
| **Capacitor** | 7 | Capacidades móviles nativas |
| **TypeScript** | 5.8 | Desarrollo con tipado seguro |
| **SCSS** | - | Estilos de componentes |
| **RxJS** | - | Gestión de estado reactiva |
| **Ionicons** | 7 | Biblioteca de iconos |

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** (v9 o superior)
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Angular CLI**: `npm install -g @angular/cli`

Para desarrollo nativo:
- **Xcode** (para compilaciones iOS en macOS)
- **Android Studio** (para compilaciones Android)

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/app_recetas.git
   cd app_recetas
   ```

2. **Navegar al directorio del proyecto**
   ```bash
   cd mi-jopara
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   ionic serve --port=8100 --no-open
   ```

   La aplicación estará disponible en `http://localhost:8100`

## Desarrollo

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Iniciar servidor de desarrollo (Angular) |
| `ionic serve` | Iniciar servidor de desarrollo (Ionic) |
| `npm run build` | Compilar para producción |
| `npm test` | Ejecutar pruebas unitarias con Karma |
| `npm run lint` | Analizar archivos TypeScript y HTML |
| `npm run watch` | Compilar en modo watch |

### Desarrollo Nativo

```bash
# Sincronizar recursos web con proyectos nativos
npx cap sync

# Abrir proyecto iOS en Xcode
npx cap open ios

# Abrir proyecto Android en Android Studio
npx cap open android
```

## Estructura del Proyecto

```
mi-jopara/
├── src/
│   ├── app/
│   │   ├── models/              # Modelos de datos e interfaces
│   │   │   ├── recipe.model.ts  # Tipos Recipe, Ingredient, Category
│   │   │   └── mock-data.ts     # Datos de ejemplo de recetas
│   │   ├── services/            # Capa de lógica de negocio
│   │   │   └── recipe.service.ts # Gestión de datos de recetas
│   │   ├── tabs/                # Navegación principal por pestañas
│   │   ├── inicio/              # Página de inicio - explorar recetas
│   │   │   └── detalle/         # Página de detalle de receta
│   │   ├── coleccion/           # Página de colección de favoritos
│   │   └── perfil/              # Página de perfil de usuario
│   ├── assets/                  # Recursos estáticos
│   └── theme/                   # Estilos SCSS globales
├── android/                     # Proyecto nativo Android
├── ios/                         # Proyecto nativo iOS
└── www/                         # Salida de compilación de producción
```

## Arquitectura

### Diseño de Componentes

- **Componentes Standalone**: Utiliza la arquitectura de componentes standalone de Angular 20
- **Carga Perezosa**: Todas las rutas se cargan de forma perezosa para rendimiento óptimo
- **Estado Reactivo**: BehaviorSubjects de RxJS para gestión de estado centralizada

### Flujo de Datos

```
RecipeService (BehaviorSubject)
      ↓
   Componentes se suscriben a observables
      ↓
   La UI se actualiza de forma reactiva
```

### Estructura de Navegación

- **Diseño de Pestañas**: Navegación por pestañas inferiores con 3 secciones principales
  - **Inicio**: Página principal/Explorar recetas
  - **Colección**: Favoritos
  - **Perfil**: Configuración de usuario
- **Rutas Anidadas**: Páginas de detalle anidadas bajo rutas padre

## Hoja de Ruta

- [ ] Integración con backend (endpoints API)
- [ ] Autenticación y perfiles de usuario
- [ ] Creación y edición de recetas
- [ ] Funciones de compartir en redes sociales
- [ ] Soporte para modo sin conexión
- [ ] Soporte multi-idioma
- [ ] Calificaciones y reseñas de recetas
- [ ] Calendario de planificación de comidas
- [ ] Generación de lista de compras

## Contribuir

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Haz fork del repositorio
2. Crea una rama de característica (`git checkout -b feature/CaracteristicaIncreible`)
3. Haz commit de tus cambios (`git commit -m 'Agregar alguna CaracteristicaIncreible'`)
4. Haz push a la rama (`git push origin feature/CaracteristicaIncreible`)
5. Abre un Pull Request

### Guías de Desarrollo

- Seguir la guía de estilo de Angular
- Mantener el cumplimiento del modo estricto de TypeScript
- Escribir pruebas unitarias para nuevas características
- Actualizar la documentación según sea necesario

## Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
ng test --watch
```

## Compilar para Producción

```bash
# Compilación web
npm run build

# Sincronizar proyectos nativos
npx cap sync

# Compilar para iOS/Android usando los IDEs respectivos
```

## Licencia

Este proyecto está licenciado bajo la Licencia Apache 2.0 - consulta el archivo LICENSE para más detalles.

## Contacto

Para preguntas o soporte, por favor abre un issue en GitHub.

---
