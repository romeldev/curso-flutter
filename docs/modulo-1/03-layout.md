---
title: "1.3 — Layout: Row, Column, Stack, Flex"
description: Cómo organizar elementos en la pantalla
---

# 1.3 Layout: Row, Column, Stack, Flex

## Row — disposición horizontal

Coloca hijos uno al lado del otro.

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Icon(Icons.star, color: Colors.yellow),
    Icon(Icons.star, color: Colors.yellow),
    Icon(Icons.star, color: Colors.grey),
  ],
)
```

## Column — disposición vertical

Coloca hijos uno debajo del otro.

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.start,
  children: [
    const Text('Producto: Zapatos'),
    const Text('Precio: \$49.99'),
    ElevatedButton(onPressed: () {}, child: const Text('Comprar')),
  ],
)
```

## Stack — superposición

Coloca hijos uno encima del otro (como `position: absolute` en CSS).

```dart
Stack(
  children: [
    Image.network('https://ejemplo.com/producto.jpg'),
    Positioned(
      bottom: 8,
      right: 8,
      child: Container(
        color: Colors.black54,
        padding: EdgeInsets.all(4),
        child: const Text('-50%', style: TextStyle(color: Colors.white)),
      ),
    ),
  ],
)
```

## MainAxisAlignment vs CrossAxisAlignment

```
        mainAxisAlignment ←───── Row ─────→ crossAxisAlignment

               crossAxisAlignment
                      ↑
                   Column
                      |
              mainAxisAlignment
```

| Propiedad | Row | Column |
|-----------|-----|--------|
| `mainAxisAlignment` | Horizontal | Vertical |
| `crossAxisAlignment` | Vertical | Horizontal |

Valores comunes para `MainAxisAlignment`:
- `start` (default)
- `center`
- `end`
- `spaceBetween` (espacio entre hijos)
- `spaceEvenly` (espacio igual entre y alrededor)
- `spaceAround` (espacio igual alrededor)

## Expanded y Flexible — espacio dinámico

```dart
Row(
  children: [
    Expanded(
      flex: 2,  // ocupa 2 partes del espacio disponible
      child: Container(color: Colors.red),
    ),
    Expanded(
      flex: 1,  // ocupa 1 parte
      child: Container(color: Colors.blue),
    ),
  ],
)
```

`Expanded` fuerza al hijo a ocupar todo el espacio disponible. `Flexible` permite que el hijo tenga su tamaño pero puede encogerse si no hay espacio.

## SizedBox — espaciador invisible

```dart
Column(
  children: [
    const Text('Arriba'),
    const SizedBox(height: 20),  // espacio vertical
    const Text('Abajo'),
  ],
)
```

## Padding, margin y decoración

```dart
Container(
  margin: const EdgeInsets.all(16),          // margen externo
  padding: const EdgeInsets.symmetric(       // padding interno
    horizontal: 12,
    vertical: 8,
  ),
  decoration: BoxDecoration(                  // borde, sombra, gradiente
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(color: Colors.black26, blurRadius: 4),
    ],
  ),
  child: const Text('Tarjeta decorada'),
)
```

## Mini-ejercicio

Construye esta estructura:

```
┌─────────────────────────┐
│  AppBar: "Perfil"       │
├─────────────────────────┤
│  [Avatar]   [Nombre]    │  ← Row con CircleAvatar + Column
│             [Email]     │
├─────────────────────────┤
│  Seguidores: 1,234      │  ← Centrado
├─────────────────────────┤
│  [Botón Editar]         │  ← Centrado
└─────────────────────────┘
```

[Siguiente: ListView y GridView →](/modulo-1/04-listview)
