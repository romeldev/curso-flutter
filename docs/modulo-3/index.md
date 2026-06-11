---
title: Módulo 3 — Autenticación JWT
description: Login, tokens, flutter_secure_storage, rutas protegidas
---

# Módulo 3: Autenticación JWT

::: tip Meta del módulo
Implementar autenticación completa contra cualquier API REST: login, sesión persistente, rutas protegidas y cierre de sesión. **Estimado: 1.5 semanas.**
:::

## ¿Qué vas a aprender?

| Tema | Qué hacemos |
|------|------------|
| Endpoints de autenticación | login, register, me, logout |
| AuthInterceptor con dio | Adjuntar token automáticamente |
| flutter_secure_storage | Guardar/leer/borrar token de forma segura |
| AuthProvider con Riverpod | Estado de autenticación global |
| Pantalla de login | Formulario + llamada API |
| Manejo de errores HTTP | 401, 422, 500 |
| go_router redirect | Proteger rutas según sesión |
| Cerrar sesión | Limpiar token + redirigir |

## API endpoints (asumidos)

```http
POST   /api/login     { email, password }  → { token, user }
POST   /api/register  { name, email, password }  → { token, user }
GET    /api/me        Authorization: Bearer <token>  → { user }
POST   /api/logout    Authorization: Bearer <token>  → { message }
```

## Modelos que usaremos

```dart
@freezed
class AuthState with _$AuthState {
  const factory AuthState.initial() = _Initial;
  const factory AuthState.loading() = _Loading;
  const factory AuthState.authenticated({required User user, required String token}) = _Authenticated;
  const factory AuthState.error({required String message}) = _Error;
}
```

[Siguiente: API Endpoints →](/modulo-3/01-api-endpoints)
