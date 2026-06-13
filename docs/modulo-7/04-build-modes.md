---
title: 7.4 — Build Modes
description: debug vs profile vs release, configuración por entorno
---

# 7.4 Build Modes

## Los 3 modos de Flutter

| Modo | Comando | Características |
|------|---------|-----------------|
| **Debug** | `flutter run` | Hot reload, asserts, dev tools, rendimiento lento |
| **Profile** | `flutter run --profile` | Sin asserts, con profiling, para pruebas de rendimiento |
| **Release** | `flutter build apk` | Optimizado, sin hot reload, sin dev tools |

## Detectar el modo en código

```dart
import 'package:flutter/foundation.dart';

if (kDebugMode) {
  print('Estamos en debug');
}

if (kReleaseMode) {
  print('Estamos en release');
}

if (kProfileMode) {
  print('Estamos en profile');
}
```

## Configuración por entorno

```yaml
# .env.dev
API_URL=https://dev.api.miapp.com/api
ENV_NAME=dev

# .env.prod
API_URL=https://api.miapp.com/api
ENV_NAME=prod
```

```dart
class AppConfig {
  final String apiUrl;
  final String envName;
  final bool enableLogging;
  final bool enableCrashReporting;

  const AppConfig._({
    required this.apiUrl,
    required this.envName,
    this.enableLogging = false,
    this.enableCrashReporting = true,
  });

  static const dev = AppConfig._(
    apiUrl: 'https://dev.api.miapp.com/api',
    envName: 'dev',
    enableLogging: true,
    enableCrashReporting: false,
  );

  static const prod = AppConfig._(
    apiUrl: 'https://api.miapp.com/api',
    envName: 'prod',
    enableLogging: false,
    enableCrashReporting: true,
  );

  static AppConfig get current => kReleaseMode ? prod : dev;
}

// Uso:
final dio = Dio(BaseOptions(baseUrl: AppConfig.current.apiUrl));
```

## Compilar para producción

```bash
# APK (para distribución directa)
flutter build apk --release

# App Bundle (recomendado para Play Store)
flutter build appbundle --release

# iOS (requiere Mac)
flutter build ios --release

# Web
flutter build web --release
```

## Flavor (diferentes sabores)

Para apps con versiones white-label o múltiples entornos:

```bash
# Android flavors en build.gradle
flutter build apk --flavor dev -t lib/main_dev.dart
flutter build apk --flavor prod -t lib/main_prod.dart

# iOS schemes
flutter build ios --flavor dev -t lib/main_dev.dart
```

## Mini-ejercicio

1. Crea `AppConfig` con valores diferentes para dev y prod
2. Usa `kReleaseMode` para cambiar la URL de la API
3. Compila un APK release con `flutter build apk --release`
4. Verifica que el APK se genera en `build/app/outputs/flutter-apk/`

[Siguiente: Firma de APK →](/modulo-7/05-firma)
