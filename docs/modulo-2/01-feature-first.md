---
title: 2.1 — Feature-First Structure
description: Cómo organizar lib/ por funcionalidades
---

# 2.1 Feature-First Structure

## El problema

```dart
// ❌ Estructura plana (todo mezclado)
lib/
├── main.dart
├── login_page.dart
├── login_provider.dart
├── products_page.dart
├── products_provider.dart
├── products_repository.dart
├── user_model.dart
├── product_model.dart
├── api_client.dart
├── theme.dart
├── router.dart
```

Cuando la app crece, esto se vuelve inmantenible: 20+ archivos en una carpeta, sin saber qué pertenece a qué.

## Feature-First: la solución

Cada funcionalidad es una carpeta con todo lo que necesita:

```
lib/
├── main.dart                    ← Punto de entrada
├── app.dart                     ← MaterialApp + providers globales
│
├── core/                        ← Compartido entre features
│   ├── theme/
│   │   └── app_theme.dart
│   ├── router/
│   │   └── app_router.dart
│   └── network/
│       ├── dio_client.dart
│       └── auth_interceptor.dart
│
└── features/                    ← Cada feature es autocontenida
    ├── auth/
    │   ├── domain/
    │   │   └── user.dart        ← Modelo
    │   ├── data/
    │   │   └── auth_repository.dart
    │   └── presentation/
    │       ├── providers/
    │       │   └── auth_provider.dart
    │       └── pages/
    │           └── login_page.dart
    │
    └── products/
        ├── domain/
        │   └── product.dart
        ├── data/
        │   └── products_repository.dart
        └── presentation/
            ├── providers/
            │   └── products_provider.dart
            └── pages/
                ├── products_list_page.dart
                └── product_detail_page.dart
```

## ¿Por qué 3 capas por feature?

| Capa | Responsabilidad | Depende de Flutter? |
|------|----------------|-------------------|
| `domain/` | Modelos puros, lógica de negocio sin dependencias | ❌ No |
| `data/` | Repositorios, APIs, bases de datos, DTOs | ❌ No (usa paquetes) |
| `presentation/` | Providers, widgets, páginas | ✅ Sí |

## Reglas de dependencia

```
presentation → domain
data → domain
domain → nada (capa más pura)
```

## Beneficios

- **Escalabilidad**: agregas `features/pagos/` y no tocas nada existente
- **Aislamiento**: puedes borrar un feature sin afectar otros
- **Código visible**: sabes exactamente dónde buscar cada cosa
- **Equipos**: cada dev trabaja en su feature sin conflictos de git

## Mini-ejercicio

Crea la estructura de carpetas vacía:

```bash
mkdir -p lib/core/{theme,router,network}
mkdir -p lib/features/{auth/{domain,data,presentation/{providers,pages}},products/{domain,data,presentation/{providers,pages}}}
```

[Siguiente: Riverpod ProviderScope →](/modulo-2/02-riverpod-setup)
