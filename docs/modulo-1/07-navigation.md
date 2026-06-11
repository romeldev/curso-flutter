---
title: 1.7 — Navegación Básica
description: Navigator.push, pop, paso de datos entre pantallas
---

# 1.7 Navegación Básica

## Navigator — la pila de pantallas

Flutter usa una **pila (stack)** de rutas. `push` apila, `pop` desapila.

```
Pantalla A (abajo)
        │ push(RutaB)
        ▼
Pantalla B
Pantalla A
        │ pop()
        ▼
Pantalla A (de vuelta)
```

## Navegar a otra pantalla

```dart
// Pantalla A
ElevatedButton(
  onPressed: () {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const DetalleScreen()),
    );
  },
  child: const Text('Ver detalle'),
);
```

## Volver atrás

```dart
// Dentro de DetalleScreen
ElevatedButton(
  onPressed: () {
    Navigator.pop(context);  // vuelve a la pantalla anterior
  },
  child: const Text('Volver'),
);
```

El botón de retroceso del AppBar ya hace `pop` automáticamente.

## Pasar datos a la siguiente pantalla

```dart
// Pantalla A
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (_) => DetalleScreen(producto: 'Zapatos'),
  ),
);

// Pantalla DetalleScreen
class DetalleScreen extends StatelessWidget {
  final String producto;
  const DetalleScreen({super.key, required this.producto});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(producto)),
      body: Center(child: Text('Detalle de \$producto')),
    );
  }
}
```

## Recibir datos de vuelta (pop con resultado)

```dart
// Pantalla A: espera resultado
final result = await Navigator.push<bool>(
  context,
  MaterialPageRoute(builder: (_) => const ConfirmacionScreen()),
);

if (result == true) {
  print('El usuario confirmó');
} else {
  print('El usuario canceló');
}

// Pantalla de confirmación
Navigator.pop(context, true);   // envía true de vuelta
Navigator.pop(context, false);  // envía false
```

## Named routes (antes de go_router)

```dart
// En MaterialApp
MaterialApp(
  initialRoute: '/',
  routes: {
    '/': (_) => const HomeScreen(),
    '/detalle': (_) => const DetalleScreen(),
  },
);

// Navegar
Navigator.pushNamed(context, '/detalle');

// Desventaja: no puedes pasar parámetros fácilmente
```

::: warning
Las named routes son limitadas. En el Módulo 5 veremos `go_router` que resuelve esto correctamente.
:::

## Mini-ejemplo: Lista → Detalle

```dart
// HomeScreen
ListView.builder(
  itemCount: productos.length,
  itemBuilder: (_, i) => ListTile(
    title: Text(productos[i].nombre),
    onTap: () {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => DetalleScreen(producto: productos[i]),
        ),
      );
    },
  ),
);

// DetalleScreen
class DetalleScreen extends StatelessWidget {
  final Producto producto;
  const DetalleScreen({super.key, required this.producto});
  // ...
}
```

## Mini-ejercicio

1. Crea una `HomeScreen` con una lista de productos (mock)
2. Al hacer tap en un producto, navega a `DetalleScreen` pasando el producto
3. `DetalleScreen` muestra nombre, precio y descripción
4. `DetalleScreen` tiene un botón "Comprar" que hace `pop` con `true`
5. HomeScreen muestra un SnackBar si el usuario compró

[Siguiente: Theme →](/modulo-1/08-theme)
