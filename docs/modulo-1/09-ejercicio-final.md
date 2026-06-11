---
title: 1.9 — Ejercicio Final
description: App de catálogo con 3 pantallas, formularios y tema
---

# Ejercicio Final: App Catálogo de Productos

## Descripción

Construye una app de **catálogo de productos** con 3 pantallas, datos mock, formulario de login y tema personalizado.

## Requisitos

### Pantalla 1: Login

```
┌─────────────────────────┐
│     Iniciar Sesión       │
│                         │
│  [Correo            ]   │
│  [Contraseña        ]   │
│                         │
│  [Iniciar Sesión    ]   │
│                         │
│  ¿No tienes cuenta?     │
│  Registrarse            │
└─────────────────────────┘
```

- Formulario con validación (correo con @, contraseña mínimo 6)
- Al ser válido, navega a la pantalla de lista
- Usa `SnackBar` si hay error

### Pantalla 2: Lista de productos

```
┌─────────────────────────┐
│  Productos        [🔍]  │
├─────────────────────────┤
│ [🖼] Zapatos            │
│      \$89.99            │
├─────────────────────────┤
│ [🖼] Camiseta           │
│      \$29.99            │
├─────────────────────────┤
│ [🖼] Bolso              │
│      \$59.99            │
├─────────────────────────┤
│ ...                     │
└─────────────────────────┘
```

- `ListView.builder` con mínimo 6 productos mock
- `RefreshIndicator` para recargar
- Al hacer tap → navega a detalle

### Pantalla 3: Detalle del producto

```
┌─────────────────────────┐
│  ← Volver               │
├─────────────────────────┤
│                         │
│     [Imagen grande]     │
│                         │
│   Nombre del producto   │
│   \$49.99               │
│                         │
│   Descripción larga     │
│   del producto...       │
│                         │
│  [Agregar al carrito]   │
│                         │
│  ★ 4.5 (120 reseñas)    │
└─────────────────────────┘
```

- Recibe el producto por constructor
- Muestra todos los detalles
- Botón "Agregar al carrito" que hace `pop` con el producto

### Tema

- Material 3 con `colorSchemeSeed: Colors.indigo`
- Modo oscuro con `ThemeMode.system`
- `ElevatedButton` con bordes redondeados de 12px

## Esqueleto recomendado

```
lib/
├── main.dart              ← MaterialApp + tema
├── models/
│   └── producto.dart      ← Clase Producto con nombre, precio, descripción
├── screens/
│   ├── login_screen.dart
│   ├── lista_screen.dart
│   └── detalle_screen.dart
└── theme/
    └── app_theme.dart     ← (opcional) tema separado
```

## Modelo Producto

```dart
class Producto {
  final String nombre;
  final double precio;
  final String descripcion;
  final String imagenUrl;

  const Producto({
    required this.nombre,
    required this.precio,
    required this.descripcion,
    this.imagenUrl = 'https://via.placeholder.com/300',
  });
}
```

## Criterios de evaluación

- [ ] Login con validación funciona
- [ ] Lista de productos con `ListView.builder`
- [ ] Navegación push/pop con datos
- [ ] Tema Material 3 con modo oscuro
- [ ] Código limpio (widgets separados, sin amontonar todo en main)

::: tip ¿Listo para el Módulo 2?
En el Módulo 2 empezamos con **arquitectura real**: Riverpod, dio, freezed y estructura feature-first. Este ejercicio es la base sobre la que construiremos todo.
:::
