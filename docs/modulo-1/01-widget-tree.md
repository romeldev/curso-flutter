---
title: 1.1 — Widget Tree
description: Todo es un widget, composición sobre herencia
---

# 1.1 Widget Tree

## El árbol de widgets

Cuando escribes Flutter, estás construyendo un **árbol de widgets**. Cada widget es un nodo, y los hijos van anidados.

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mi App',
      home: Scaffold(
        appBar: AppBar(title: const Text('Inicio')),
        body: Center(
          child: Text('Hola desde Flutter'),
        ),
      ),
    );
  }
}
```

El árbol de este código:

```
MaterialApp
  └── Scaffold
        ├── AppBar (título)
        └── Center
              └── Text('Hola desde Flutter')
```

## Scaffold — el layout base

`Scaffold` es el widget que define la estructura visual de una pantalla:

| Propiedad | Función |
|-----------|---------|
| `appBar` | Barra superior con título y acciones |
| `body` | Contenido principal |
| `bottomNavigationBar` | Barra de navegación inferior |
| `floatingActionButton` | Botón flotante (FAB) |
| `drawer` | Menú lateral |
| `backgroundColor` | Color de fondo |

## Composición, no herencia

A diferencia de Android (Activity) o iOS (ViewController), en Flutter no extiendes una clase para cada pantalla. **Compones widgets** dentro de otros widgets.

```dart
// ❌ No hay "ProductScreen extends Something"
// ✅ Combinas widgets:
Scaffold(
  appBar: AppBar(title: Text('Productos')),
  body: Column(
    children: [
      ProductCard(),
      ProductCard(),
      ProductCard(),
    ],
  ),
)
```

## const y rendimiento

Siempre que un widget no cambie, márcalo como `const`:

```dart
// ✅ Bueno: Flutter no reconstruye este widget si no es necesario
const Text('Hola')

// ✅ Mejor aún en el constructor
class MyApp extends StatelessWidget {
  const MyApp({super.key});  // ← permite que la instancia sea const
}
```

::: tip Regla práctica
Si un widget no depende de datos que cambian (estado), hazlo `const`. Flutter renderiza más rápido porque sabe que no necesita reconstruirlo.
:::

## Mini-ejercicio

Modifica el `Scaffold` para que tenga:
- Un `AppBar` con título "Mi Catálogo"
- Un `body` con un `Text` centrado que diga "Bienvenido"
- Un `floatingActionButton` con icono de corazón (`Icons.favorite`)

[Siguiente: StatelessWidget vs StatefulWidget →](/modulo-1/02-stateless-vs-stateful)
