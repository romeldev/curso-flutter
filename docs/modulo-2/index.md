---
title: Módulo 2 — Arquitectura y Setup
description: Estructura del proyecto, Riverpod, dio, go_router, freezed, linting
---

# Módulo 2: Arquitectura y Setup del Proyecto

::: tip Meta del módulo
Configurar un proyecto Flutter profesional desde el día 1 con Riverpod, dio, go_router, freezed y linting. **Estimado: 2 días.**
:::

## ¿Qué vas a aprender?

| Tema | Qué hacemos |
|------|------------|
| Feature-first structure | Organizar `lib/` por funcionalidades |
| Riverpod ProviderScope | Envolver la app con el gestor de estado |
| Cliente HTTP con dio | BaseOptions, interceptors, logging |
| Router declarativo con go_router | Rutas, redirects, navegación tipada |
| freezed + build_runner | Modelos inmutables con código generado |
| Linting profesional | very_good_analysis + config |

## Al final del módulo

Tendrás un **proyecto base replicable** que puedes usar para empezar cualquier app Flutter:

```
lib/
├── main.dart
├── app.dart
├── core/
│   ├── theme/
│   ├── router/
│   └── network/
└── features/
```

[Siguiente: Feature-First Structure →](/modulo-2/01-feature-first)
