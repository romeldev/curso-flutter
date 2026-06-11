---
title: 0.8 — Extension Methods
description: Como prototype extension pero sin riesgos
---

# 0.8 Extension Methods

## ¿Qué son?

Los extension methods te permiten añadir funcionalidad a clases existentes **sin modificarlas y sin herencia**.

```dart
// JavaScript: prototype extension (riesgosa)
String.prototype.capitalizar = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Dart: extension method (segura, acotada)
extension StringExtension on String {
  String capitalizar() {
    return '${this[0].toUpperCase()}${substring(1)}';
  }
}

// Uso
print('hola mundo'.capitalizar());  // 'Hola mundo'
```

A diferencia de JS, los extension methods de Dart:
- Solo están disponibles donde importas la extension
- No pueden acceder a miembros privados
- No sobrescriben métodos existentes

## Casos de uso reales en Flutter

```dart
// 1. Extension en BuildContext (el más común)
extension ContextExtension on BuildContext {
  ThemeData get tema => Theme.of(this);
  MediaQueryData get media => MediaQuery.of(this);
  double get screenWidth => media.size.width;
  bool get isDark => tema.brightness == Brightness.dark;
}

// Uso: context.tema, context.screenWidth

// 2. Extension en DateTime
extension DateFormatting on DateTime {
  String get formatoLegible => '$day/$month/$year';
  bool get esFinde => weekday == DateTime.saturday
      || weekday == DateTime.sunday;
}

// 3. Extension en String para validación
extension StringValidation on String {
  bool get esEmail => contains('@') && contains('.');
  String get sinEspacios => replaceAll(' ', '');
}
```

::: tip ¿Dónde ponerlas?
En un archivo `lib/core/extensions/` para que estén disponibles globalmente.
:::

## Operators (extensiones con operadores)

```dart
extension MultiplicarLista<T> on List<T> {
  List<T> operator *(int veces) {
    return [for (int i = 0; i < veces; i++, ...this];
  }
}

final lista = [1, 2, 3] * 3;
print(lista);  // [1, 2, 3, 1, 2, 3, 1, 2, 3]
```

Puedes sobrecargar operadores (+ - * / [] etc.) en cualquier tipo mediante extension methods. Útil pero úsalo con moderación.

[Siguiente: Ejercicio Final →](/modulo-0/09-ejercicio-final)
