---
title: 0.9 — Ejercicio Final — Mini CLI
description: Integra todo lo aprendido
---

# Ejercicio Final: Mini CLI

Integra todo lo aprendido en el módulo.

## Descripción

Construye un pequeño programa CLI que:

1. Lee un archivo JSON de usuarios desde una URL pública (o mock)
2. Parsea el JSON a una lista de objetos `User` usando `fromJson`
3. Filtra usuarios mayores de edad
4. Muestra los resultados formateados en consola
5. Maneja errores (archivo no encontrado, JSON inválido)

## Esqueleto del ejercicio

```dart
import 'dart:convert';
import 'dart:io';

// TODO: sealed class Resultado<T> con Ok y Error
// TODO: class User con fromJson
// TODO: extension en String para validar email
// TODO: extension en Iterable<User> para filtrar mayores de edad
// TODO: función fetchUsers que retorna Future<Resultado<List<User>>>
// TODO: función main que usa async/await y try/catch
```

Si lo resuelves sin mirar soluciones, tienes Dart dominado. Si te atascas, pregunta.

## ¿Listo para el Módulo 1?

- [x] Entiendes null safety → no tendrás crashes tontos
- [x] Sabes clases y constructores → widgets son clases
- [x] Manejas Futures → toda API en Flutter es asíncrona
- [x] Conoces Streams → la base del estado reactivo
- [x] Usas sealed classes → AsyncValue de Riverpod te será familiar
- [x] Extension methods → BuildContext extensions nativas

**Siguiente: Módulo 1 — Flutter Fundamentals** (próximamente)
