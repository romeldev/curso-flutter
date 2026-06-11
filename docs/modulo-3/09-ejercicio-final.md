---
title: 3.9 — Ejercicio Final
description: Autenticación completa con JWT
---

# Ejercicio Final: Autenticación Completa

## Descripción

Implementa el flujo completo de autenticación contra un API REST real o mockeada.

## Requisitos

### 1. AuthRepository
- login(email, password) → AuthResponse
- register(name, email, password) → AuthResponse
- getCurrentUser() → User
- logout() → void
- Manejo de errores con `ApiException`

### 2. AuthStorage
- saveToken / getToken / deleteToken / clearAll
- saveUser / getUser (opcional, para mantener sesión)
- Usando `flutter_secure_storage`

### 3. AuthProvider (StateNotifier)
- `AuthState` con freezed (initial, loading, authenticated, error)
- `_checkSession()` al iniciar
- login() y logout()
- Manejo de errores

### 4. LoginPage
- Formulario con validación
- Loading state en el botón
- SnackBar en error
- Navegación automática al home en éxito

### 5. Router Redirect
- /login público
- / y /products protegidos
- Redirect automático si no hay sesión

### 6. Logout
- Confirmación con diálogo
- Limpiar token + storage
- Redirigir a /login

## Verificación

```bash
# 1. Inicia la app → debe mostrar LoginPage
# 2. Sin token guardado → Initial
# 3. Login con credenciales inválidas → mensaje de error
# 4. Login exitoso → navega a Home
# 5. Cierra la app y vuelve a abrir → sesión persistente
# 6. Logout → vuelve a LoginPage
# 7. Sin sesión, intenta navegar a /products → redirige a /login
```

## Mock API (para pruebas)

Puedes usar esta API pública para probar:

```dart
baseUrl: 'https://reqres.in/api'
// POST /login  { email, password } → { token }
// GET  /users/2  → { data: { id, email, first_name, last_name, avatar } }
```

O crear un mock con `Mocktail` como vimos en la lección 3.2.

## Criterios

- [ ] Login funcional contra API real o mock
- [ ] Token guardado en secure storage
- [ ] Sesión persiste al cerrar y abrir la app
- [ ] Rutas protegidas redirigen a login
- [ ] Logout funciona y limpia todo
- [ ] Manejo de errores 401, 422, 500
- [ ] `dart analyze` da 0 errores

::: tip ¿Listo para el Módulo 4?
En el Módulo 4 construimos el **CRUD completo de productos** con Riverpod + dio + freezed, consumiendo los endpoints de tu API REST.
:::
