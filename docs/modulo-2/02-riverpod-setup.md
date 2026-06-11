---
title: 2.2 — Riverpod ProviderScope
description: Envolver la app, providers globales, ProviderScope
---

# 2.2 Riverpod ProviderScope

## ¿Qué es ProviderScope?

Es el **contenedor raíz** de todos los providers. Sin él, Riverpod no funciona.

```dart
// main.dart
void main() {
  runApp(
    const ProviderScope(  // ← envuelve toda la app
      child: MyApp(),
    ),
  );
}
```

## Tipos de provider que ya deberías conocer

| Provider | Uso |
|----------|-----|
| `Provider` | Valor sincrónico (una instancia, un repositorio) |
| `FutureProvider` | Valor asíncrono que se obtiene una vez (fetch a API) |
| `StreamProvider` | Stream de valores en el tiempo |
| `StateNotifierProvider` | Estado mutable con lógica (no lo usaremos, preferimos riverpod_generator) |

## Providers globales típicos

```dart
// 1. Provider de configuración
final appThemeProvider = Provider<AppTheme>((ref) {
  return AppTheme();
});

// 2. Provider del cliente HTTP
final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(BaseOptions(baseUrl: 'https://api.miapp.com'));
  dio.interceptors.add(LogInterceptor());
  return dio;
});

// 3. Provider del repositorio (que depende de dio)
final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(ref.watch(dioProvider));
});
```

## ProviderScope con overrides (testing)

```dart
// En tests: reemplazas un provider real por uno mock
void main() {
  testWidgets('login test', (tester) async {
    await tester.pumpWidget(
      ProviderScope(
        overrides: [
          // Reemplaza el provider real por uno que devuelve datos mock
          dioProvider.overrideWithValue(DioMock()),
        ],
        child: const MyApp(),
      ),
    );
  });
}
```

## app.dart — el widget raíz

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: 'Mi App',
      theme: ref.watch(appThemeProvider).tema,
      routerConfig: ref.watch(routerProvider),
    );
  }
}
```

::: tip Importante
Usamos `ConsumerWidget` en lugar de `StatelessWidget` para acceder a `WidgetRef` y leer providers. No necesitas StatefulWidget para esto.
:::

## pubspec.yaml — dependencias mínimas

```yaml
dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.6.1
  dio: ^5.7.0
  go_router: ^14.8.0
  flutter_secure_storage: ^9.2.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  very_good_analysis: ^6.0.0
  build_runner: ^2.4.0
  freezed: ^2.5.0
  json_serializable: ^6.8.0
  mocktail: ^1.0.0
```

## Mini-ejercicio

1. Agrega `flutter_riverpod` a tu `pubspec.yaml`
2. Envuelve `MyApp` con `ProviderScope` en `main.dart`
3. Crea un `Provider<String>` que devuelva "Hola desde Riverpod"
4. Muestra ese valor en un `ConsumerWidget`

[Siguiente: Configuración de dio →](/modulo-2/03-dio-setup)
