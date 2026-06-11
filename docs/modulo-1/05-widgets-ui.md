---
title: 1.5 — Text, Image, Icon, Button, Card
description: Los widgets de UI más usados
---

# 1.5 Text, Image, Icon, Button, Card

## Text — texto con estilo

```dart
Text(
  'Hola Flutter',
  style: TextStyle(
    fontSize: 20,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    letterSpacing: 1.2,
    height: 1.5,  // interlineado
  ),
  textAlign: TextAlign.center,
  overflow: TextOverflow.ellipsis,  // si es muy largo: ...
  maxLines: 2,
)
```

::: tip
Usa `TextStyle` para definir estilos. Si ves que repites mucho el mismo estilo, muévelo al `Theme` (lo veremos en el tema 1.8).
:::

## Image — imágenes

```dart
// Desde assets (requiere configurar pubspec.yaml)
Image.asset('assets/producto.jpg')

// Desde URL
Image.network(
  'https://ejemplo.com/imagen.jpg',
  width: 200,
  height: 200,
  fit: BoxFit.cover,       // cómo se ajusta
  loadingBuilder: (_, child, progress) {
    if (progress == null) return child;
    return CircularProgressIndicator();  // mientras carga
  },
  errorBuilder: (_, __, ___) => Icon(Icons.broken_image),  // si falla
)
```

## Icon — iconos Material Design

```dart
Icon(
  Icons.favorite,
  color: Colors.red,
  size: 40,
)

// Con fondo
CircleAvatar(
  backgroundColor: Colors.blue[100],
  child: const Icon(Icons.person, color: Colors.blue),
)
```

## Button — botones

```dart
// Botón relleno (principal)
ElevatedButton(
  onPressed: () => print('Guardar'),
  child: const Text('Guardar'),
)

// Botón con borde (secundario)
OutlinedButton(
  onPressed: () => print('Cancelar'),
  child: const Text('Cancelar'),
)

// Botón texto (terciario)
TextButton(
  onPressed: () => print('Ver más'),
  child: const Text('Ver más'),
)

// Botón con icono
ElevatedButton.icon(
  onPressed: () {},
  icon: const Icon(Icons.add),
  label: const Text('Nuevo producto'),
)

// Botón deshabilitado (onPressed = null)
ElevatedButton(
  onPressed: null,  // ← se ve gris y no responde
  child: const Text('No disponible'),
)
```

## Card — tarjeta con elevación

```dart
Card(
  elevation: 2,           // sombra
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
  ),
  child: Padding(
    padding: EdgeInsets.all(16),
    child: Column(
      children: [
        Image.network('https://ejemplo.com/producto.jpg', height: 150),
        SizedBox(height: 8),
        const Text('Producto Ejemplo',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        const Text('\$19.99',
            style: TextStyle(color: Colors.green, fontSize: 16)),
      ],
    ),
  ),
)
```

## Ejemplo completo: Tarjeta de producto

```dart
Card(
  clipBehavior: Clip.antiAlias,  // bordes redondeados recortan la imagen
  elevation: 3,
  child: Column(
    children: [
      Image.network(
        'https://via.placeholder.com/300x200',
        height: 150,
        width: double.infinity,
        fit: BoxFit.cover,
      ),
      Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Zapatos Deportivos',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            const Text('\$89.99',
                style: TextStyle(color: Colors.green, fontSize: 16)),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.star, color: Colors.amber, size: 18),
                    const Text(' 4.5'),
                  ],
                ),
                ElevatedButton(
                  onPressed: () {},
                  child: const Text('Comprar'),
                ),
              ],
            ),
          ],
        ),
      ),
    ],
  ),
)
```

## Mini-ejercicio

Construye una tarjeta de perfil de usuario:
- `CircleAvatar` con foto (o icono por defecto)
- Nombre y correo
- Botón "Seguir" / "Siguiendo" con `ElevatedButton`
- Icono de ubicación + texto "Ciudad"

[Siguiente: Forms →](/modulo-1/06-forms)
