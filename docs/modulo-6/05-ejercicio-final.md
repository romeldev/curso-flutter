---
title: 6.5 — Ejercicio Final
description: Suite completa de tests para la app
---

# Ejercicio Final: Suite de Tests

## Descripción

Escribe una suite completa de tests que cubra las capas crítica de la app.

## Requisitos

### 1. Unit tests
- [ ] `AuthNotifier.login()` → estado authenticated
- [ ] `AuthNotifier.login()` con error → estado error
- [ ] `AuthNotifier.logout()` → estado initial
- [ ] `ProductListNotifier.loadProducts()` → lista con datos
- [ ] `ProductListNotifier.loadProducts()` → estado error

### 2. Mocktail
- [ ] `MockProductsRepository` con respuestas simuladas
- [ ] `MockAuthRepository` con login exitoso y fallido
- [ ] `verify` que `createProduct` fue llamado con datos correctos
- [ ] `verifyNever` que deleteProduct no se llamó sin confirmación

### 3. Widget tests
- [ ] LoginPage muestra campos y botón
- [ ] LoginPage muestra error en credenciales inválidas
- [ ] ProductsListPage carga y lista productos
- [ ] ProductsListPage muestra "No hay productos" vacío
- [ ] ProductFormPage valida campos obligatorios

### 4. Integration test
- [ ] Login → ver productos en listado
- [ ] Crear producto → aparece en listado

## Estructura final de tests

```
test/
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   └── auth_repository_test.dart
│   │   └── presentation/
│   │       ├── auth_provider_test.dart
│   │       └── login_page_test.dart
│   └── products/
│       ├── data/
│       │   └── products_repository_test.dart
│       └── presentation/
│           ├── products_provider_test.dart
│           ├── products_list_page_test.dart
│           └── product_form_page_test.dart
├── helpers/
│   └── mocks.dart
integration_test/
└── app_test.dart
```

## Verificación

```bash
# Correr todos los tests
flutter test

# Ver cobertura
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html

# Integration tests
flutter test integration_test/
```

::: tip ¿Listo para el Módulo 7?
En el Módulo 7 llevamos la app a producción: splash screen, icono, CI/CD, firma de APK y publicación en Play Store.
:::
