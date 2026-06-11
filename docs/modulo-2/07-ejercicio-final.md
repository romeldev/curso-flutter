---
title: 2.7 — Ejercicio Final
description: Configurar el proyecto base profesional
---

# Ejercicio Final: Proyecto Base Profesional

## Descripción

Configura desde cero un proyecto Flutter con toda la arquitectura que vimos en el módulo. Al final tendrás un **template reutilizable** para cualquier app.

## Requisitos

### 1. Estructura de carpetas

```
lib/
├── main.dart
├── app.dart
├── core/
│   ├── theme/
│   │   └── app_theme.dart
│   ├── router/
│   │   └── app_router.dart
│   └── network/
│       ├── dio_client.dart
│       └── api_exception.dart
└── features/
    └── auth/
        ├── domain/
        │   └── user.dart
        ├── data/
        │   └── auth_repository.dart
        └── presentation/
            ├── providers/
            │   └── auth_provider.dart
            └── pages/
                └── login_page.dart
```

### 2. main.dart

```dart
void main() {
  runApp(const ProviderScope(child: MyApp()));
}
```

### 3. app.dart

- `ConsumerWidget` con `MaterialApp.router`
- Tema Material 3 con color semilla
- Modo oscuro con `ThemeMode.system`
- `routerConfig` desde `routerProvider`

### 4. Router (go_router)

- Ruta `/` → HomePage
- Ruta `/login` → LoginPage
- Redirect: si no hay sesión → `/login`

### 5. Network (dio)

- Cliente HTTP con `baseUrl` configurable
- `AuthInterceptor` que lee token de `FlutterSecureStorage`
- `LogInterceptor` para desarrollo
- Clase `ApiException` para errores

### 6. Modelos (freezed)

- `User` con: id, nombre, email, avatarUrl
- `AuthState` con estados: initial, loading, authenticated, error

### 7. Linting

- `very_good_analysis` en `analysis_options.yaml`
- Corre `dart fix --apply` y verifica que no queden issues

## Verificación

Ejecuta y verifica que:

```bash
flutter run                   # La app arranca sin errores
flutter pub run build_runner build  # Código generado sin errores
dart analyze                  # 0 errores, 0 warnings
```

## Criterios

- [ ] `ProviderScope` envuelve la app
- [ ] `MaterialApp.router` con go_router
- [ ] Redirect a `/login` si no hay token
- [ ] dio configurado con interceptors
- [ ] Modelos con freezed generados correctamente
- [ ] `dart analyze` da 0 errores
- [ ] very_good_analysis activado

::: tip ¿Listo para el Módulo 3?
En el Módulo 3 conectamos todo esto con autenticación real: login, registro, manejo de tokens y sesión persistente con flutter_secure_storage.
:::
