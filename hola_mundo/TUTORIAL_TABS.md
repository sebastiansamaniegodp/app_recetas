# Tutorial: Cómo Crear Tabs con Enrutamiento en Ionic Angular

Este tutorial explica paso a paso cómo implementar tabs (pestañas) con navegación en una aplicación Ionic Angular usando standalone components.

## Índice
1. [Conceptos básicos](#conceptos-básicos)
2. [Estructura de archivos](#estructura-de-archivos)
3. [Paso 1: Crear la página principal de Tabs](#paso-1-crear-la-página-principal-de-tabs)
4. [Paso 2: Crear las páginas individuales](#paso-2-crear-las-páginas-individuales)
5. [Paso 3: Configurar las rutas](#paso-3-configurar-las-rutas)
6. [Cómo funciona el enrutamiento](#cómo-funciona-el-enrutamiento)
7. [Personalización](#personalización)

---

## Conceptos Básicos

### ¿Qué son los Tabs?
Los tabs son una interfaz de navegación común en aplicaciones móviles que permite cambiar entre diferentes vistas usando una barra de pestañas, típicamente ubicada en la parte inferior de la pantalla.

### Componentes clave de Ionic:
- **`<ion-tabs>`**: Contenedor principal que gestiona las pestañas
- **`<ion-tab-bar>`**: La barra visible con los botones de pestañas
- **`<ion-tab-button>`**: Cada botón individual de pestaña
- **`<ion-icon>`**: Iconos de Ionicons para cada tab
- **`<ion-label>`**: Texto descriptivo de cada tab

---

## Estructura de Archivos

```
src/app/
├── tabs/
│   ├── tabs.page.ts          # Componente principal de tabs
│   ├── tabs.page.html         # Template con la barra de tabs
│   ├── tabs.page.scss         # Estilos personalizados
│   ├── tab1/
│   │   ├── tab1.page.ts       # Página del tab 1
│   │   ├── tab1.page.html     # Template del tab 1
│   │   └── tab1.page.scss     # Estilos del tab 1
│   ├── tab2/
│   │   ├── tab2.page.ts
│   │   ├── tab2.page.html
│   │   └── tab2.page.scss
│   └── tab3/
│       ├── tab3.page.ts
│       ├── tab3.page.html
│       └── tab3.page.scss
└── app.routes.ts              # Configuración de rutas
```

---

## Paso 1: Crear la Página Principal de Tabs

### 1.1. Crear el componente TypeScript (`tabs/tabs.page.ts`)

```typescript
import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  constructor() {
    // Registrar los iconos que vamos a usar
    addIcons({ triangle, ellipse, square });
  }
}
```

**Puntos clave:**
- Usamos **standalone components**, por eso importamos cada componente de Ionic en el array `imports`
- `addIcons()` registra los iconos de Ionicons que usaremos en el template
- Los iconos se importan desde `ionicons/icons`

### 1.2. Crear el template HTML (`tabs/tabs.page.html`)

```html
<ion-tabs>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="tab1">
      <ion-icon name="triangle"></ion-icon>
      <ion-label>Tab 1</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab2">
      <ion-icon name="ellipse"></ion-icon>
      <ion-label>Tab 2</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="tab3">
      <ion-icon name="square"></ion-icon>
      <ion-label>Tab 3</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>
```

**Puntos clave:**
- `<ion-tabs>`: Contenedor principal que gestiona la navegación
- `slot="bottom"`: Posiciona la barra de tabs en la parte inferior (también puedes usar `slot="top"`)
- **Atributo `tab`**: Debe coincidir exactamente con el `path` en las rutas (por ejemplo, `tab="tab1"` → ruta `/tabs/tab1`)
- `name="triangle"`: Referencia al icono registrado en el constructor

### 1.3. Crear los estilos CSS (`tabs/tabs.page.scss`)

```scss
// Estilos personalizados para tabs si los necesitas
ion-tab-bar {
  --background: var(--ion-color-light);
  --color: var(--ion-color-medium);
}

ion-tab-button {
  --color-selected: var(--ion-color-primary);
}
```

**Puntos clave:**
- Ionic usa **CSS Variables** para personalización
- `--background`: Color de fondo de la barra
- `--color`: Color de los tabs no seleccionados
- `--color-selected`: Color del tab activo

---

## Paso 2: Crear las Páginas Individuales

Cada tab necesita su propia página. Vamos a crear 3 páginas de ejemplo.

### 2.1. Tab 1 (`tabs/tab1/tab1.page.ts`)

```typescript
import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent],
})
export class Tab1Page {
  constructor() {}
}
```

### 2.2. Template del Tab 1 (`tabs/tab1/tab1.page.html`)

```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>Tab 1</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Tab 1</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-card>
    <ion-card-header>
      <ion-card-title>Bienvenido a Tab 1</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      Este es el contenido de la primera pestaña. Aquí puedes agregar cualquier componente de Ionic o funcionalidad que necesites.
    </ion-card-content>
  </ion-card>
</ion-content>
```

**Puntos clave:**
- **Header translúcido**: `[translucent]="true"` hace que el header sea semitransparente
- **Collapse condense**: El segundo `<ion-header>` dentro de `<ion-content>` crea un efecto de título grande que se colapsa al hacer scroll
- **Fullscreen**: `[fullscreen]="true"` permite que el contenido se expanda detrás del header

### 2.3. Estilos (`tabs/tab1/tab1.page.scss`)

```scss
ion-card {
  margin: 20px;
}
```

### 2.4. Repetir para Tab 2 y Tab 3

Crea archivos similares para `tab2` y `tab3`, cambiando los títulos y contenidos según sea necesario.

---

## Paso 3: Configurar las Rutas

Esta es la parte más importante: conectar todo usando el sistema de enrutamiento de Angular.

### 3.1. Editar `app.routes.ts`

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'tabs',  // Ruta principal de tabs
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [  // Rutas hijas para cada tab
      {
        path: 'tab1',
        loadComponent: () => import('./tabs/tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () => import('./tabs/tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () => import('./tabs/tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: 'tab1',  // Tab por defecto
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs',  // Ruta inicial de la app
    pathMatch: 'full',
  },
];
```

---

## Cómo Funciona el Enrutamiento

### Estructura de rutas para tabs:

```
/tabs              → Carga TabsPage (el contenedor con la barra de tabs)
  ├── /tabs/tab1   → Muestra Tab1Page dentro de TabsPage
  ├── /tabs/tab2   → Muestra Tab2Page dentro de TabsPage
  └── /tabs/tab3   → Muestra Tab3Page dentro de TabsPage
```

### Conceptos importantes:

1. **Lazy Loading**:
   ```typescript
   loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage)
   ```
   - Los componentes se cargan solo cuando se necesitan
   - Mejora el rendimiento inicial de la app
   - Cada `import()` es una carga diferida

2. **Rutas hijas (children)**:
   - Los tabs son rutas hijas de `/tabs`
   - Se renderizan dentro del `<ion-tabs>` del padre
   - La navegación entre tabs no recarga el componente padre

3. **Coincidencia del atributo `tab`**:
   ```html
   <ion-tab-button tab="tab1">  <!-- debe coincidir con -->
   ```
   ```typescript
   { path: 'tab1', ... }  <!-- el path en las rutas -->
   ```

4. **Redirecciones**:
   - `path: ''` en las rutas hijas → redirige a `tab1` cuando accedes a `/tabs`
   - `path: ''` en la raíz → redirige a `tabs` cuando accedes a `/`

### Flujo de navegación:

1. Usuario abre la app → `/`
2. Se redirige a → `/tabs`
3. Se redirige a → `/tabs/tab1` (tab por defecto)
4. Usuario toca tab 2 → navega a `/tabs/tab2`
5. El router carga `Tab2Page` dentro de `TabsPage`

---

## Personalización

### Cambiar iconos

Busca iconos en [Ionicons](https://ionic.io/ionicons):

```typescript
// 1. Importar el icono
import { home, person, settings } from 'ionicons/icons';

// 2. Registrarlo
addIcons({ home, person, settings });
```

```html
<!-- 3. Usarlo en el template -->
<ion-icon name="home"></ion-icon>
```

### Cambiar posición de los tabs

```html
<!-- Tabs arriba -->
<ion-tab-bar slot="top">

<!-- Tabs abajo (por defecto) -->
<ion-tab-bar slot="bottom">
```

### Personalizar colores

```scss
ion-tab-bar {
  --background: #ffffff;           // Fondo blanco
  --color: #9e9e9e;               // Gris para tabs inactivos
  --color-selected: #3880ff;       // Azul para tab activo
  --border: 1px solid #e0e0e0;    // Borde superior
}

ion-tab-button {
  --color-selected: #ff6b35;       // Color personalizado para tab activo
  --padding-top: 10px;
  --padding-bottom: 10px;
}
```

### Agregar más tabs

1. Crear una nueva carpeta `tabs/tab4/`
2. Crear archivos `tab4.page.ts`, `tab4.page.html`, `tab4.page.scss`
3. Agregar el botón en `tabs.page.html`:
   ```html
   <ion-tab-button tab="tab4">
     <ion-icon name="star"></ion-icon>
     <ion-label>Tab 4</ion-label>
   </ion-tab-button>
   ```
4. Agregar la ruta en `app.routes.ts`:
   ```typescript
   {
     path: 'tab4',
     loadComponent: () => import('./tabs/tab4/tab4.page').then((m) => m.Tab4Page),
   }
   ```

### Tabs con badges (notificaciones)

```html
<ion-tab-button tab="tab1">
  <ion-icon name="home"></ion-icon>
  <ion-label>Inicio</ion-label>
  <ion-badge color="danger">5</ion-badge>
</ion-tab-button>
```

### Navegación programática

Si necesitas navegar desde el código TypeScript:

```typescript
import { Router } from '@angular/router';

constructor(private router: Router) {}

navegarATab2() {
  this.router.navigate(['/tabs/tab2']);
}
```

---

## Ejecutar la Aplicación

```bash
# Iniciar servidor de desarrollo
npm start

# O usar Ionic CLI
ionic serve
```

La aplicación se abrirá en `http://localhost:8100` con los tabs funcionando.

---

## Recursos Adicionales

- [Documentación de Ionic Tabs](https://ionicframework.com/docs/api/tabs)
- [Ionicons](https://ionic.io/ionicons)
- [Angular Router](https://angular.dev/guide/routing)
- [Ionic Angular Standalone Components](https://ionicframework.com/docs/angular/standalone)

---

## Resumen

Has aprendido a:
1. Crear un componente de tabs con `<ion-tabs>` y `<ion-tab-bar>`
2. Crear páginas individuales para cada tab
3. Configurar rutas con estructura padre-hija
4. Usar lazy loading para optimizar el rendimiento
5. Personalizar estilos y comportamiento de los tabs

Los tabs son perfectos para aplicaciones con 2-5 secciones principales que el usuario necesita acceder frecuentemente.
