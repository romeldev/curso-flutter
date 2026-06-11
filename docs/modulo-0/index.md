---
title: Módulo 0 — Dart Express
description: Traduce lo que ya sabes de JavaScript/TypeScript a Dart
---

# Módulo 0: Dart Express para Devs Web

::: tip Meta del módulo
Poder leer y escribir Dart con fluidez **antes de tocar un widget de Flutter**. Estimado: **2-3 días**.
:::

## ¿Por qué este módulo?

Flutter se escribe en Dart. Saltarse Dart y lanzarse a widgets es como construir una casa sin saber qué hace un martillo.

Pero como **ya programas en JavaScript / TypeScript**, no necesitas empezar desde cero. Este módulo traduce concepto por concepto.

## Paralelismo JS/TS → Dart

| Lo que ya sabes (JS/TS) | Lo que vas a aprender (Dart) |
|-------------------------|-----------------------------|
| `const` / `let` / `var` | `const` / `final` / `var` |
| Promises + async/await | Futures + async/await |
| Observables / EventEmitter | Streams |
| Union types / discriminated unions | Sealed classes + pattern matching |
| `strictNullChecks` | Null safety (`?` / `!` / `late`) |
| Tuples (TypeScript) | Records |

## Temario

1. **Sintaxis express** — var, final, const, typedef, funciones
2. **Null safety** — ?, !, late, required
3. **Clases y named constructors**
4. **Futures y async/await**
5. **Streams** — el concepto nuevo
6. **Sealed classes + pattern matching**
7. **Records + pattern matching en returns**
8. **Extension methods**

## Herramientas

Para practicar esto **no necesitas Flutter**. Solo Dart:

```bash
# Probar código Dart desde terminal
dart run               # Ejecuta main.dart
dart compile exe       # Compila a binario nativo

# O mejor: el playground online
# https://dartpad.dev
```

::: warning Consejo
No solo leas — **escribe cada ejemplo**. El músculo de la sintaxis se entrena escribiendo.
:::

## Siguiente paso

Empieza con la **[Sintaxis Express →](/modulo-0/01-sintaxis)**
