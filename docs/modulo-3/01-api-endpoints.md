---
title: 3.1 — API Endpoints
description: Estructura REST para autenticación
---

# 3.1 API Endpoints

## Contrato API asumido

El backend (cualquier lenguaje) debe exponer estos endpoints:

### POST /api/login

```json
// Request
{ "email": "user@email.com", "password": "123456" }

// Response 200
{ "token": "eyJhbGciOiJIUzI1NiIs...", "user": { "id": "1", "name": "Ana", "email": "user@email.com" } }

// Response 422
{ "message": "Credenciales inválidas", "errors": { "email": ["Estas credenciales no coinciden con nuestros registros."] } }
```

### POST /api/register

```json
// Request
{ "name": "Ana", "email": "user@email.com", "password": "123456", "password_confirmation": "123456" }

// Response 201
{ "token": "eyJhbGciOiJIUzI1NiIs...", "user": { "id": "1", "name": "Ana", "email": "user@email.com" } }
```

### GET /api/me (protegido)

```json
// Header: Authorization: Bearer <token>

// Response 200
{ "id": "1", "name": "Ana", "email": "user@email.com", "avatar_url": null }

// Response 401
{ "message": "No autenticado" }
```

### POST /api/logout (protegido)

```json
// Header: Authorization: Bearer <token>

// Response 200
{ "message": "Sesión cerrada" }
```

## DTOs con freezed

```dart
// lib/features/auth/data/dtos/auth_dtos.dart
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/user.dart';

part 'auth_dtos.freezed.dart';
part 'auth_dtos.g.dart';

// ===== Request =====
@freezed
class LoginRequest with _$LoginRequest {
  const factory LoginRequest({
    required String email,
    required String password,
  }) = _LoginRequest;

  factory LoginRequest.fromJson(Map<String, dynamic> json) =>
      _$LoginRequestFromJson(json);
}

@freezed
class RegisterRequest with _$RegisterRequest {
  const factory RegisterRequest({
    required String name,
    required String email,
    required String password,
    @JsonKey(name: 'password_confirmation') required String passwordConfirmation,
  }) = _RegisterRequest;

  factory RegisterRequest.fromJson(Map<String, dynamic> json) =>
      _$RegisterRequestFromJson(json);
}

// ===== Response =====
@freezed
class AuthResponse with _$AuthResponse {
  const factory AuthResponse({
    required String token,
    required User user,
  }) = _AuthResponse;

  factory AuthResponse.fromJson(Map<String, dynamic> json) =>
      _$AuthResponseFromJson(json);
}

@freezed
class UserResponse with _$UserResponse {
  const factory UserResponse({
    required User user,
  }) = _UserResponse;

  factory UserResponse.fromJson(Map<String, dynamic> json) =>
      _$UserResponseFromJson(json);
}
```

## Diferencia entre DTO y Domain model

| | DTO | Domain |
|---|---|---|
| Ubicación | `data/dtos/` | `domain/` |
| Sigue a la API | ✅ Sí | ❌ No |
| Se usa en UI | ❌ No | ✅ Sí |
| Tiene `fromJson` | ✅ Sí | ❌ No necesariamente |

La conversión se hace en el Repository.

## Mini-ejercicio

1. Crea los DTOs con freezed para login, register y auth response
2. Ejecuta `build_runner` para generar el código
3. Verifica que los `fromJson` funcionan con JSON de prueba

[Siguiente: Auth Repository →](/modulo-3/02-auth-repository)
