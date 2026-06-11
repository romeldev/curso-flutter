---
title: 0.6 — Sealed Classes + Pattern Matching
description: De union types a sealed classes
---

# 0.6 Sealed Classes + Pattern Matching

## El problema que resuelven

```typescript
// En TypeScript harías:
type Resultado<T> =
  | { tipo: 'ok'; dato: T }
  | { tipo: 'error'; mensaje: string }
  | { tipo: 'cargando' };
```

```dart
// Dart 3 — Sealed class
sealed class Resultado<T> {}

class Ok<T> extends Resultado<T> {
  final T dato;
  Ok(this.dato);
}

class Error<T> extends Resultado<T> {
  final String mensaje;
  Error(this.mensaje);
}

class Cargando<T> extends Resultado<T> {}  // sin datos
```

`sealed` obliga a que todas las subclases estén en el mismo archivo. Esto garantiza que el compilador conozca todas las variantes.

## Pattern Matching con switch

Aquí está la magia — el compilador verifica que cubriste TODOS los casos:

```dart
String mostrar<T>(Resultado<T> res) {
  return switch (res) {
    Ok(dato: var d)       => 'Dato: $d',    // extrae el campo
    Error(mensaje: var m) => 'Error: $m',
    Cargando()            => 'Cargando...',
    // No necesitas default — el compilador lo verifica
  };
}

// Uso
final res = Ok(dato: 'Hola');
print(mostrar(res));  // 'Dato: Hola'
```

::: tip Importante
**Esto es GIGANTE para Flutter.** Riverpod usa `AsyncValue` que internamente es exactamente esto: `AsyncData` | `AsyncError` | `AsyncLoading`.
:::

## Pattern Matching avanzado

```dart
// Destructuring
final (nombre, edad) = ('Ana', 30);
print('$nombre tiene $edad años');

// Switch con guards
String clasificar(int valor) {
  return switch (valor) {
    > 90           => 'Excelente',
    > 70 && <= 90  => 'Bueno',
    > 50 && <= 70  => 'Regular',
    _              => 'Malo',
  };
}

// Pattern matching en listas
var lista = [1, 2, 3];
var [a, b, c] = lista;
print('$a, $b, $c');  // 1, 2, 3
```

Dart 3 trajo pattern matching a nivel de lenguaje. Ya no necesitas librerías externas para esto.

[Siguiente: Records →](/modulo-0/07-records)
