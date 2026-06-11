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
        collapsed: true,
        items: [{ text: 'Próximamente...', link: '' }],
      },
      {
        text: 'Módulo 4: CRUD de Productos',
        collapsed: true,
        items: [{ text: 'Próximamente...', link: '' }],
      },
      {
        text: 'Módulo 5: Navegación Avanzada con go_router',
        collapsed: true,
        items: [{ text: 'Próximamente...', link: '' }],
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
