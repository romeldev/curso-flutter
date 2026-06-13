---
title: 7.3 — Manejo Global de Errores
description: runZonedGuarded, FlutterError.onError, crash reporting
---

# 7.3 Manejo Global de Errores

## Errores no capturados en Flutter

Dos tipos de errores que pueden escapar:

1. **Errores de Dart**: excepciones no capturadas en zonas asíncronas
2. **Errores de Flutter**: errores durante el build/layout/paint

## runZonedGuarded — capturar errores Dart

```dart
// main.dart
void main() {
  runZonedGuarded(() {
    runApp(const ProviderScope(child: MyApp()));
  }, (error, stack) {
    // Aquí capturas cualquier error no manejado
    _reportError(error, stack);
  });
}

void _reportError(Object error, StackTrace stack) {
  // En desarrollo: imprimir
  debugPrint('ERROR GLOBAL: $error\n$stack');

  // En producción: enviar a servicio de reporting
  // Crashlytics.recordError(error, stack);
}
```

## FlutterError.onError — capturar errores Flutter

```dart
void main() {
  FlutterError.onError = (details) {
    FlutterError.presentError(details);
    // Enviar a servicio externo
    // Crashlytics.recordFlutterError(details);
  };

  runApp(const ProviderScope(child: MyApp()));
}
```

## ErrorWidget — UI de error

```dart
// Widget que se muestra cuando otro widget falla en build
class AppErrorWidget extends StatelessWidget {
  final FlutterErrorDetails details;

  const AppErrorWidget({super.key, required this.details});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 48, color: Colors.red),
              const SizedBox(height: 16),
              const Text('Algo salió mal'),
              const SizedBox(height: 8),
              Text(details.exceptionAsString(), style: const TextStyle(fontSize: 12, color: Colors.grey)),
            ],
          ),
        ),
      ),
    );
  }
}

// En MaterialApp:
MaterialApp(
  builder: (context, widget) {
    ErrorWidget.builder = (details) => AppErrorWidget(details: details);
    return widget!;
  },
)
```

## Logger estructurado

```dart
// lib/core/utils/logger.dart
enum LogLevel { debug, info, warning, error }

class Logger {
  static void log(String message, {LogLevel level = LogLevel.debug, Object? error, StackTrace? stack}) {
    final prefix = switch (level) {
      LogLevel.debug   => '🐛 DEBUG',
      LogLevel.info    => 'ℹ️ INFO',
      LogLevel.warning => '⚠️ WARN',
      LogLevel.error   => '❌ ERROR',
    };

    debugPrint('$prefix: $message');
    if (error != null) debugPrint('Error: $error');
    if (stack != null) debugPrint('Stack: $stack');
  }
}

// Uso:
Logger.log('Usuario inició sesión', level: LogLevel.info);
Logger.log('Error al cargar productos', level: LogLevel.error, error: e, stack: s);
```

## En desarrollo vs producción

```dart
void main() {
  if (kReleaseMode) {
    // En producción: reporting externo
    FlutterError.onError = (details) {
      // Crashlytics.recordFlutterError(details);
    };
  } else {
    // En desarrollo: mostrar errores en consola
    FlutterError.onError = (details) {
      FlutterError.presentError(details);
    };
  }

  runApp(const ProviderScope(child: MyApp()));
}
```

## Mini-ejercicio

1. Implementa `runZonedGuarded` en main.dart
2. Configura `FlutterError.onError` para capturar errores de Flutter
3. Crea un `Logger` básico con niveles
4. Diferencia entre debug y release mode

[Siguiente: Build Modes →](/modulo-7/04-build-modes)
