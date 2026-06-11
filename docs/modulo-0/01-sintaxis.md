---
title: 0.1 — Sintaxis Express
description: var, final, const, typedef, funciones
---

# 0.1 Sintaxis Express

## Declaración de variables

```dart
// JavaScript                  // Dart
let nombre = 'Ana';              var nombre = 'Ana';
const PI = 3.1416;               final PI = 3.1416;  // runtime constant
                                  const pi = 3.1416;  // compile-time constant
```

| JS | Dart | Nota |
|----|------|------|
| `let` | `var` | Variable mutable, tipo inferido |
| `const` | `final` | Solo asignación única |
| — | `const` | Valor constante en compile-time |
| `let x: string` | `String x` | Tipado explícito |

::: tip Regla práctica
Usa `final` por defecto. Cambia a `var` solo si necesitas reasignar. Usa `const` para valores que nunca cambian (matemáticas, config).
:::

## Tipos básicos

```dart
// Dart
int edad = 30;
double precio = 19.99;
String nombre = 'Ana';
bool activo = true;

// Listas (arrays)
List<String> frutas = ['manzana', 'pera', 'uva'];
var numeros = [1, 2, 3];           // inferido: List<int>

// Mapas (objetos)
Map<String, dynamic> usuario = {
  'nombre': 'Ana',
  'edad': 30,
};
```

Nota: `dynamic` es como `any` en TS — úsalo con moderación.

## Funciones

```dart
// Función clásica
int sumar(int a, int b) {
  return a + b;
}

// Arrow function (expression body)
int sumar(int a, int b) => a + b;

// Parámetros opcionales con nombre
void saludar({required String nombre, int edad = 18}) {
  print('Hola $nombre, tienes $edad años');
}

// Llamada
saludar(nombre: 'Ana', edad: 25);

// Función anónima (callback)
var numeros = [1, 2, 3];
numeros.forEach((n) => print(n));
```

::: tip Paralelismo
JS `function sumar(a,b) { return a+b; }` → Dart `int sumar(int a, int b) => a + b;`
:::

## String interpolation y control de flujo

```dart
// JS: template literals `Hola ${nombre}`
// Dart: string interpolation
var msg = 'Hola $nombre, tienes $edad años';
var msg2 = 'Hola ${nombre.toUpperCase()}';  // con expresión

// if / else — idéntico
if (edad >= 18) {
  print('Mayor de edad');
} else {
  print('Menor');
}

// for — casi igual
for (var i = 0; i < 5; i++) { }
for (var fruta in frutas) { }

// switch con pattern matching (Dart 3)
switch (comando) {
  case 'login':  print('login'); break;
  case 'logout': print('logout'); break;
  default:       print('desconocido');
}
```

[Siguiente: Null safety →](/modulo-0/02-null-safety)
