---
title: 1.2 — StatelessWidget vs StatefulWidget
description: Cuándo usar cada uno, ciclo de vida
---

# 1.2 StatelessWidget vs StatefulWidget

## StatelessWidget

Un widget **sin estado mutable**. Se construye una vez y no cambia.

```dart
class TituloApp extends StatelessWidget {
  final String texto;

  const TituloApp({super.key, required this.texto});

  @override
  Widget build(BuildContext context) {
    return Text(
      texto,
      style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
    );
  }
}
```

**Úsalo cuando:** El widget solo muestra datos que recibe por constructor y no cambian.

## StatefulWidget

Un widget **con estado mutable** que puede cambiar en el tiempo.

```dart
class Contador extends StatefulWidget {
  const Contador({super.key});

  @override
  State<Contador> createState() => _ContadorState();
}

class _ContadorState extends State<Contador> {
  int _contador = 0;

  void _incrementar() {
    setState(() {
      _contador++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Has presionado $_contador veces'),
        ElevatedButton(
          onPressed: _incrementar,
          child: const Text('Incrementar'),
        ),
      ],
    );
  }
}
```

::: warning ¡Cuidado!
Son **dos clases**: `Contador` (el widget, inmutable) y `_ContadorState` (el estado, mutable). El estado se crea con `createState()`.
:::

## Ciclo de vida del State

```
createState()
    │
    ▼
initState()          ← Una vez, al crear (aquí cargas data inicial)
    │
    ▼
didChangeDependencies()  ← Si dependencias de InheritedWidget cambian
    │
    ▼
build()              ← Se ejecuta cada vez que cambia el estado
    │
    ▼
setState() ──────┐   ← Marca para reconstruir
    │            │
    ▼            │
build()  ←───────┘
    │
    ▼
dispose()            ← Al destruir (aquí limpias recursos)
```

```dart
class _EjemploState extends State<Ejemplo> {
  @override
  void initState() {
    super.initState();
    print('initState: el widget nació');
    // Inicializar controladores, listeners, streams
  }

  @override
  void dispose() {
    print('dispose: el widget murió');
    // Cancelar suscripciones, cerrar streams
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return const Text('Hola');
  }
}
```

## ¿Stateless o Stateful?

| Situación | Widget |
|-----------|--------|
| Muestras texto que no cambia | StatelessWidget |
| Tienes un contador que se incrementa | StatefulWidget |
| Una lista de productos que viene de API | StatelessWidget (el proveedor de estado maneja los cambios) |
| Un formulario con campos editables | StatefulWidget |
| Un cronómetro que actualiza cada segundo | StatefulWidget |

::: tip Con Riverpod (más adelante)
La mayoría de tus pantallas serán `StatelessWidget` + `ConsumerWidget`. El estado vive en los providers, no en el widget. StatefulWidget se usa para cosas puntuales como controladores de animación o foco de texto.
:::

## Mini-ejercicio

Crea un widget `Reloj` que:
- Use `StatefulWidget`
- Muestre la hora actual usando `DateTime.now()`
- Use `Timer.periodic` en `initState` para actualizar cada segundo
- Limpie el timer en `dispose`

[Siguiente: Layout →](/modulo-1/03-layout)
