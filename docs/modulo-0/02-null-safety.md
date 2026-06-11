---
title: 0.2 — Null Safety
description: ?, !, late, required
---

# 0.2 Null Safety

## El problema que resuelve

```dart
// Dart sin null safety (antes de 2.12)
String nombre = null;  // ⚠️ permitido → crash en runtime

// Dart con null safety (2.12+)
String? nombre = null;  // ✅ explícitamente nullable
String nombre = null;   // ❌ error en compilación
```

| TypeScript | Dart |
|------------|------|
| `string` | `String` (no nullable) |
| `string \| null` | `String?` (nullable) |
| `x!` (non-null assertion) | `x!` (force unwrap) |
| `x ?? defaultValue` | `x ?? defaultValue` |

## Los operadores clave

```dart
String? nombre = obtenerNombre();  // podría ser null

// 1. ?.  — acceso condicional (optional chaining)
int? longitud = nombre?.length;  // null si nombre es null

// 2. ??  — valor por defecto (null coalescing)
String saludo = nombre ?? 'Invitado';

// 3. !   — force unwrap (solo cuando SABES que no es null)
String seguro = nombre!;  // crash si nombre es null

// 4. ?[] — indexación condicional
List<String>? items;
var primero = items?[0];  // null si items es null
```

::: danger Regla de oro
Nunca uses `!` sin verificar antes. Es como `as string` en TS sin type guard.
:::

## late — inicialización diferida

```dart
// Para cuando no puedes inicializar en el constructor
// pero SABES que se asignará antes de usarse

class Config {
  late String apiUrl;  // se asigna después

  void load() {
    apiUrl = 'https://api.miapp.com';
  }

  void usar() {
    print(apiUrl);  // seguro, porque load() se llamó antes
  }
}
```

**Casos de uso real**: controladores, dependencias circulares, lazy initialization.

## required — parámetros obligatorios

```dart
// En constructores y parámetros nombrados

class Usuario {
  final String nombre;
  final int edad;

  // named parameters: TODOS son opcionales por defecto
  // required los vuelve obligatorios
  Usuario({
    required this.nombre,
    this.edad = 18,  // valor por defecto
  });
}

// Uso
final user = Usuario(nombre: 'Ana');  // ✅ edad usa 18
final user2 = Usuario();              // ❌ falta nombre
```

[Siguiente: Clases y Named Constructors →](/modulo-0/03-clases)
