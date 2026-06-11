import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Curso Flutter',
  description: 'Aprende Flutter con Riverpod, dio y Laravel — para devs web migrando a mobile',
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
        collapsed: true,
        items: [{ text: 'Próximamente...', link: '' }],
      },
      {
        text: 'Módulo 2: Arquitectura y Setup',
        collapsed: true,
        items: [{ text: 'Próximamente...', link: '' }],
      },
      {
        text: 'Módulo 3: Autenticación con Laravel Sanctum',
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
      message: 'Curso Flutter con Riverpod + dio + Laravel — 8 módulos, 8-10 semanas',
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
