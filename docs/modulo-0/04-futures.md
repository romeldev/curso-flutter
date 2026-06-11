---
title: 0.4 — Futures y async/await
description: De Promises a Futures
---

# 0.4 Futures y async/await

## Promise → Future

```javascript
// JavaScript
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(res => res.json());
}
```

```dart
// Dart
Future<Map<String, dynamic>> fetchUser(int id) {
  return dio.get('/api/users/$id')
    .then((res) => res.data as Map<String, dynamic>);
}
```

| JavaScript | Dart |
|------------|------|
| `Promise<T>` | `Future<T>` |
| `.then()` | `.then()` |
| `.catch()` | `.catchError()` |
| `async / await` | `async / await` |

## async/await — casi idéntico

```dart
// JavaScript
async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

// Dart
Future<User> fetchUser(int id) async {
  final response = await dio.get('/api/users/$id');
  return User.fromJson(response.data);
}

// Llamada
final user = await fetchUser(1);
```

La diferencia principal: en Dart `async` va después de los parámetros, no antes. Y el tipo de retorno siempre debe ser `Future<T>`.

## Manejo de errores

```dart
// JavaScript — exactamente igual
try {
  final user = await fetchUser(1);
} on DioException catch (e) {
  print('Error HTTP: ${e.response?.statusCode}');
} catch (e) {
  print('Error inesperado: $e');
} finally {
  print('Siempre se ejecuta');
}
```

Bonus de Dart: puedes capturar tipos específicos de error con `on`.

## Future.wait — Promise.all

```dart
// JavaScript
const [user, products] = await Promise.all([
  fetchUser(1), fetchProducts()
]);

// Dart
final results = await Future.wait([
  fetchUser(1),
  fetchProducts(),
]);
final user = results[0] as User;
final products = results[1] as List<Product>;

// O más limpio con records (Dart 3+):
final (user, products) = await (
  fetchUser(1),
  fetchProducts(),
).wait;
```

::: info
Dart 3 introdujo records con extensión `.wait` — más limpio que `Future.wait` para 2-3 futures paralelos.
:::

[Siguiente: Streams →](/modulo-0/05-streams)
