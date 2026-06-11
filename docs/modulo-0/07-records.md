---
title: 0.7 — Records
description: Tuplas tipadas en Dart
---

# 0.7 Records

## Records (tuplas tipadas)

Los records son **tuplas con nombre o posicionales**. Como las tuplas de TypeScript pero más potentes.

```dart
// Sin records — tenías que crear una clase para cada retorno múltiple
class LoginResult {
  final String token;
  final Usuario user;
  LoginResult(this.token, this.user);
}

// Con records — directo
(String token, Usuario user) login(String email, String pass) {
  // ...
  return (token, user);
}

final (token, user) = await login('a@b.com', '123');
```

## Records con nombre

```dart
// Posicionales
(String, int) datos() => ('Ana', 30);
final d = datos();
print(d.$1);  // 'Ana'  (posición 1)
print(d.$2);  // 30     (posición 2)

// Con nombre (más legible)
({String nombre, int edad}) datos() {
  return (nombre: 'Ana', edad: 30);
}
final d = datos();
print(d.nombre);  // 'Ana'
print(d.edad);    // 30

// Con .wait para Futures paralelos
final (user, products) = await (
  fetchUser(1),
  fetchProducts(),
).wait;
```

::: info
Los records con nombre son ideales para retornos temporales de funciones sin crear DTOs. En APIs internas del repositorio, úsalos sin miedo.
:::

## Records en la práctica con Riverpod

```dart
// Muy útil para providers que necesitan múltiples dependencias
final dashboardProvider = FutureProvider((ref) async {
  final dio = ref.watch(dioProvider);

  // Ejecuta las 3 peticiones en paralelo con records
  final (user, stats, recent) = await (
    fetchUser(dio),
    fetchStats(dio),
    fetchRecentProducts(dio),
  ).wait;

  return (user: user, stats: stats, recent: recent);
});
```

Los records evitan tener que crear clases `DashboardData` solo para agrupar 3 valores temporalmente.

[Siguiente: Extension Methods →](/modulo-0/08-extension-methods)
