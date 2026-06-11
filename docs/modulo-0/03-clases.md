---
title: 0.3 — Clases y Named Constructors
description: De TypeScript a Dart
---

# 0.3 Clases y Named Constructors

## Clase básica

```dart
// TypeScript
class Usuario {
  constructor(public nombre: string, private edad: number) {}
}

// Dart
class Usuario {
  final String nombre;
  final int _edad;  // privado (con guión bajo)

  Usuario(this.nombre, this._edad);  // constructor con shorthand
}

// Uso
final user = Usuario('Ana', 30);
print(user.nombre);    // ✅ público
print(user._edad);     // ❌ error: _edad es privado
```

En Dart la visibilidad es por archivo: lo que empieza con `_` es accesible solo dentro del mismo archivo.

## Named constructors (lo que no hay en JS/TS)

```dart
class Usuario {
  final String nombre;
  final int edad;

  // Constructor principal
  Usuario(this.nombre, this.edad);

  // Named constructor — múltiples formas de crear
  Usuario.vacio()
      : nombre = '',
        edad = 0;

  Usuario.desdeJson(Map<String, dynamic> json)
      : nombre = json['nombre'] as String,
        edad = json['edad'] as int;

  // Factory constructor — puede retornar subclases o cachear
  factory Usuario.admin(String nombre) {
    return Usuario(nombre, 99);
  }
}

// Uso
final u1 = Usuario('Ana', 30);
final u2 = Usuario.vacio();
final u3 = Usuario.desdeJson({'nombre': 'Luis', 'edad': 25});
final admin = Usuario.admin('root');
```

::: info
Named constructors son como **static factory methods** en TS pero integrados en la sintaxis del lenguaje. Muy usados en Flutter para configurar widgets.
:::

## Getters y Setters

```dart
class Rectangulo {
  final double ancho;
  final double alto;

  Rectangulo(this.ancho, this.alto);

  // Getter (como computed property en TS)
  double get area => ancho * alto;
}

final r = Rectangulo(10, 5);
print(r.area);  // 50.0 — se usa como propiedad, no como método
```

[Siguiente: Futures y async/await →](/modulo-0/04-futures)
