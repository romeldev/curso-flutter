---
title: 1.4 — ListView y GridView
description: Listas eficientes, scroll y cuadrículas
---

# 1.4 ListView y GridView

## ListView básico

```dart
ListView(
  children: [
    ListTile(title: Text('Producto 1')),
    ListTile(title: Text('Producto 2')),
    ListTile(title: Text('Producto 3')),
  ],
)
```

::: danger No hagas esto con listas grandes
`ListView(children: [...])` construye **todos los hijos** de una vez. Con 10 items está bien, con 10,000 tu app crashea por memoria.
:::

## ListView.builder — la forma correcta

Construye solo los items visibles en pantalla (lazy loading).

```dart
final productos = List.generate(100, (i) => 'Producto \$i');

ListView.builder(
  itemCount: productos.length,
  itemBuilder: (context, index) {
    return ListTile(
      leading: const Icon(Icons.inventory),
      title: Text(productos[index]),
      trailing: const Icon(Icons.chevron_right),
    );
  },
);
```

**Analogía web**: como un `document.createDocumentFragment()` que solo renderiza los elementos en el viewport.

## ListTile — el item estándar

```dart
ListTile(
  leading: CircleAvatar(child: Icon(Icons.person)),
  title: const Text('Ana García'),
  subtitle: const Text('ana@email.com'),
  trailing: const Icon(Icons.phone),
  onTap: () => print('Tap en Ana'),
)
```

## GridView — cuadrícula

```dart
GridView.builder(
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,      // 2 columnas
    crossAxisSpacing: 8,
    mainAxisSpacing: 8,
    childAspectRatio: 0.8,  // alto/ancho
  ),
  itemCount: productos.length,
  itemBuilder: (context, index) {
    return Card(
      child: Column(
        children: [
          Expanded(child: Container(color: Colors.amber[100])),
          Padding(
            padding: EdgeInsets.all(8),
            child: Text(productos[index]),
          ),
        ],
      ),
    );
  },
)
```

## Separators entre items

```dart
ListView.separated(
  itemCount: productos.length,
  separatorBuilder: (_, __) => const Divider(height: 1),
  itemBuilder: (context, index) => ListTile(title: Text(productos[index])),
)
```

## Scroll horizontal

```dart
SizedBox(
  height: 120,
  child: ListView.builder(
    scrollDirection: Axis.horizontal,
    itemCount: 10,
    itemBuilder: (context, index) {
      return Container(
        width: 100,
        margin: EdgeInsets.all(4),
        color: Colors.primaries[index % Colors.primaries.length],
      );
    },
  ),
)
```

## Pull-to-refresh

```dart
RefreshIndicator(
  onRefresh: () async {
    // Simular recarga
    await Future.delayed(Duration(seconds: 2));
  },
  child: ListView.builder(
    itemCount: productos.length,
    itemBuilder: (_, i) => ListTile(title: Text(productos[i])),
  ),
)
```

## Mini-ejercicio

Crea una lista de 20 productos mock con:
- `ListTile` con icono, nombre, precio como subtitle
- `trailing` con icono de flecha
- `ListView.builder` con `RefreshIndicator`
- Al hacer tap, imprime el nombre del producto en consola

[Siguiente: Widgets de UI →](/modulo-1/05-widgets-ui)
