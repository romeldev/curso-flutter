---
title: 7.7 — Ejercicio Final
description: Llevar la app a producción
---

# Ejercicio Final: App en Producción

## Descripción

Completa el ciclo de vida de la app: desde el branding hasta el despliegue.

## Requisitos

### 1. Branding
- [ ] Splash screen con logo personalizado
- [ ] Icono de app en todas las resoluciones
- [ ] Tema Material 3 consistente

### 2. Calidad
- [ ] Manejo global de errores con `runZonedGuarded`
- [ ] `FlutterError.onError` configurado
- [ ] Logger estructurado con niveles
- [ ] `dart analyze` da 0 errores y 0 warnings

### 3. Build
- [ ] `AppConfig` con valores diferentes para dev y prod
- [ ] APK release firmado
- [ ] `flutter build appbundle --release` funciona

### 4. CI/CD
- [ ] Workflow CI (analyze + test) en GitHub Actions
- [ ] Workflow de build APK automático
- [ ] Workflow de deploy web

## Checklist final

```bash
# 1. Análisis estático
dart analyze                          # 0 errors, 0 warnings

# 2. Tests
flutter test                           # all green
flutter test --coverage                # > 70% coverage

# 3. Build Release
flutter build apk --release            # APK en build/app/outputs/
flutter build appbundle --release       # AAB en build/app/outputs/
flutter build web --release             # Web en build/web/

# 4. CI (push a main)
# GitHub Actions corre: dart analyze + flutter test + build
```

## 🎉 ¡Felicidades!

Has completado el curso completo de Flutter con Riverpod + dio.

**Resumen de lo que aprendiste:**

| Módulo | Habilidad |
|--------|-----------|
| M0 | Dart: null safety, sealed classes, records, streams, futures |
| M1 | Widgets, layouts, formularios, navegación básica, temas |
| M2 | Arquitectura feature-first, Riverpod, dio, go_router, freezed |
| M3 | Autenticación JWT, login, tokens, rutas protegidas |
| M4 | CRUD completo con listado, formularios, paginación, imágenes |
| M5 | ShellRoute, deep linking, transiciones animadas, guardas |
| M6 | Unit tests, widget tests, integration tests con Riverpod |
| M7 | Splash, icono, error handling, build release, CI/CD |

**Stack final:** Riverpod + dio + freezed + go_router + flutter_secure_storage

[:rocket: Volver al inicio del curso](/)
