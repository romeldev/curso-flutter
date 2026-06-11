---
title: 0.5 — Streams
description: El concepto nuevo (no hay en JS nativo)
---

# 0.5 Streams

## ¿Qué es un Stream?

Un **Stream** es una secuencia de eventos asíncronos en el tiempo. Piensa en:

- ❌ Una Promesa / Future: **un solo valor** → después
- ✅ Un Stream: **múltiples valores** → uno tras otro

En el mundo web, sería como un **EventEmitter** o un **Observable** de RxJS.

```dart
// Stream: los datos llegan en el tiempo
Stream<int> contador = (async* {
  for (int i = 0; i < 5; i++) {
    await Future.delayed(Duration(seconds: 1));
    yield i;  // emite un valor
  }
});
```

## Escuchar un Stream

```dart
// Opción 1: await for (como for-await en JS)
Future<void> escucharContador() async {
  await for (final valor in contador) {
    print('Llegó: $valor');
  }
  print('Stream terminado');
}

// Opción 2: .listen() (callback style)
final sub = contador.listen(
  (valor) => print('Llegó: $valor'),
  onError: (err) => print('Error: $err'),
  onDone: () => print('Completado'),
);

// Cancelar la suscripción
sub.cancel();
```

::: tip Paralelismo
JS `for await (const valor of stream)` → Dart `await for (final valor in stream)`
:::

## ¿Dónde ves Streams en Flutter?

| Componente | Qué emite |
|------------|----------|
| `TextField` | Stream de cambios de texto |
| Firebase | Stream de documentos en tiempo real |
| WebSockets | Stream de mensajes |
| Riverpod StreamProvider | Stream reactivo de datos |
| Eventos de UI | Scroll, gestos, etc. |

Entender Streams es clave para controlar flujos reactivos en tu app.

## Tipos de Stream

| Tipo | Característica | Úsalo cuando... |
|------|---------------|-----------------|
| `Stream` (single-subscription) | Un solo listener | Lectura de archivo, HTTP chunked |
| `StreamController.broadcast()` | Múltiples listeners | Eventos de UI, notificaciones globales |

```dart
// Broadcast: varios oyentes
final controller = StreamController<int>.broadcast();
controller.stream.listen((v) => print('A: $v'));
controller.stream.listen((v) => print('B: $v'));
controller.add(1);  // ambos reciben
controller.add(2);
```

::: info
En la práctica, con Riverpod rara vez creas Streams manualmente. Pero entenderlos es esencial para depurar.
:::

[Siguiente: Sealed Classes →](/modulo-0/06-sealed-classes)
