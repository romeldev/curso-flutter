import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Curso Flutter',
  description: 'Aprende Flutter con Riverpod, dio y REST APIs — para devs web migrando a mobile',
  lang: 'es',
  base: '/curso-flutter/',

  head: [
    ['link', { rel: 'icon', href: '/curso-flutter/favicon.svg' }],
  ],

  themeConfig: {
    logo: '/flutter-logo.svg',
    siteTitle: 'Curso Flutter',

    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Módulo 0', link: '/modulo-0/' },
      { text: 'Módulo 1', link: '/modulo-1/' },
      { text: 'Módulo 2', link: '/modulo-2/' },
      { text: 'Módulo 3', link: '/modulo-3/' },
      { text: 'Módulo 4', link: '/modulo-4/' },
      { text: 'Módulo 5', link: '/modulo-5/' },
      { text: 'DartPad', link: 'https://dartpad.dev' },
    ],

    sidebar: [
      {
        text: 'Módulo 0: Dart Express para Devs Web',
        collapsed: false,
        items: [
          { text: '0.0 Introducción', link: '/modulo-0/' },
          { text: '0.1 Sintaxis Express', link: '/modulo-0/01-sintaxis' },
          { text: '0.2 Null Safety', link: '/modulo-0/02-null-safety' },
          { text: '0.3 Clases y Named Constructors', link: '/modulo-0/03-clases' },
          { text: '0.4 Futures y async/await', link: '/modulo-0/04-futures' },
          { text: '0.5 Streams', link: '/modulo-0/05-streams' },
          { text: '0.6 Sealed Classes + Pattern Matching', link: '/modulo-0/06-sealed-classes' },
          { text: '0.7 Records', link: '/modulo-0/07-records' },
          { text: '0.8 Extension Methods', link: '/modulo-0/08-extension-methods' },
          { text: '0.9 Ejercicio Final — Mini CLI', link: '/modulo-0/09-ejercicio-final' },
        ],
      },
      {
        text: 'Módulo 1: Flutter Fundamentals',
        collapsed: false,
        items: [
          { text: '1.0 Introducción', link: '/modulo-1/' },
          { text: '1.1 Widget Tree', link: '/modulo-1/01-widget-tree' },
          { text: '1.2 StatelessWidget vs StatefulWidget', link: '/modulo-1/02-stateless-vs-stateful' },
          { text: '1.3 Layout: Row, Column, Stack', link: '/modulo-1/03-layout' },
          { text: '1.4 ListView y GridView', link: '/modulo-1/04-listview' },
          { text: '1.5 Text, Image, Icon, Button, Card', link: '/modulo-1/05-widgets-ui' },
          { text: '1.6 Forms y Validación', link: '/modulo-1/06-forms' },
          { text: '1.7 Navegación Básica', link: '/modulo-1/07-navigation' },
          { text: '1.8 Theme y Material 3', link: '/modulo-1/08-theme' },
          { text: '1.9 Ejercicio Final — Catálogo', link: '/modulo-1/09-ejercicio-final' },
        ],
      },
      {
        text: 'Módulo 2: Arquitectura y Setup',
        collapsed: false,
        items: [
          { text: '2.0 Introducción', link: '/modulo-2/' },
          { text: '2.1 Feature-First Structure', link: '/modulo-2/01-feature-first' },
          { text: '2.2 Riverpod ProviderScope', link: '/modulo-2/02-riverpod-setup' },
          { text: '2.3 Configuración de dio', link: '/modulo-2/03-dio-setup' },
          { text: '2.4 go_router', link: '/modulo-2/04-go-router' },
          { text: '2.5 freezed + build_runner', link: '/modulo-2/05-freezed' },
          { text: '2.6 Linting Profesional', link: '/modulo-2/06-linting' },
          { text: '2.7 Ejercicio Final', link: '/modulo-2/07-ejercicio-final' },
        ],
      },
      {
        text: 'Módulo 3: Autenticación JWT',
        collapsed: false,
        items: [
          { text: '3.0 Introducción', link: '/modulo-3/' },
          { text: '3.1 API Endpoints', link: '/modulo-3/01-api-endpoints' },
          { text: '3.2 Auth Repository', link: '/modulo-3/02-auth-repository' },
          { text: '3.3 flutter_secure_storage', link: '/modulo-3/03-secure-storage' },
          { text: '3.4 AuthProvider con Riverpod', link: '/modulo-3/04-auth-provider' },
          { text: '3.5 Pantalla de Login', link: '/modulo-3/05-login-page' },
          { text: '3.6 Manejo de Errores HTTP', link: '/modulo-3/06-error-handling' },
          { text: '3.7 go_router Redirect', link: '/modulo-3/07-router-redirect' },
          { text: '3.8 Cerrar Sesión', link: '/modulo-3/08-logout' },
          { text: '3.9 Ejercicio Final', link: '/modulo-3/09-ejercicio-final' },
        ],
      },
      {
        text: 'Módulo 4: CRUD de Productos',
        collapsed: false,
        items: [
          { text: '4.0 Introducción', link: '/modulo-4/' },
          { text: '4.1 Modelos con freezed', link: '/modulo-4/01-modelos' },
          { text: '4.2 ProductRepository', link: '/modulo-4/02-repository' },
          { text: '4.3 Providers con Riverpod', link: '/modulo-4/03-providers' },
          { text: '4.4 Pantalla de Listado', link: '/modulo-4/04-listado' },
          { text: '4.5 Pull-to-Refresh', link: '/modulo-4/05-pull-to-refresh' },
          { text: '4.6 Crear Producto', link: '/modulo-4/06-crear' },
          { text: '4.7 Editar Producto', link: '/modulo-4/07-editar' },
          { text: '4.8 Eliminar Producto', link: '/modulo-4/08-eliminar' },
          { text: '4.9 Paginación', link: '/modulo-4/09-paginacion' },
          { text: '4.10 Imágenes', link: '/modulo-4/10-imagenes' },
          { text: '4.11 Ejercicio Final', link: '/modulo-4/11-ejercicio-final' },
        ],
      },
      {
        text: 'Módulo 5: Navegación Avanzada con go_router',
        collapsed: false,
        items: [
          { text: '5.0 Introducción', link: '/modulo-5/' },
          { text: '5.1 ShellRoute', link: '/modulo-5/01-shellroute' },
          { text: '5.2 Rutas Anidadas', link: '/modulo-5/02-rutas-anidadas' },
          { text: '5.3 Deep Linking', link: '/modulo-5/03-deep-linking' },
          { text: '5.4 Transiciones', link: '/modulo-5/04-transiciones' },
          { text: '5.5 Guardas por Rol', link: '/modulo-5/05-guardas' },
          { text: '5.6 Ejercicio Final', link: '/modulo-5/06-ejercicio-final' },
        ],
      },
      {
        text: 'Módulo 6: Testing',
        collapsed: true,
        items: [{ text: 'Próximamente...', link: '' }],
      },
      {
        text: 'Módulo 7: Polish y Producción',
        collapsed: true,
        items: [{ text: 'Próximamente...', link: '' }],
      },
    ],

    footer: {
      message: 'Curso Flutter con Riverpod + dio + REST APIs — 8 módulos, 8-10 semanas',
      copyright: 'Creado para desarrolladores web migrando a Flutter',
    },

    editLink: {
      pattern: 'https://github.com/romeldev/curso-flutter/edit/main/docs/:path',
      text: 'Editar esta página en GitHub',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/romeldev/curso-flutter' },
    ],

    search: {
      provider: 'local',
    },

    outline: {
      level: [2, 3],
      label: 'En esta página',
    },

    lastUpdated: {
      text: 'Última actualización',
    },
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    lineNumbers: true,
  },

  lastUpdated: true,

  cleanUrls: true,
})
