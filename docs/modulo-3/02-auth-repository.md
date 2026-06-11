---
title: 3.2 — Auth Repository
description: Capa de datos para autenticación
---

# 3.2 Auth Repository

## Estructura

El repository es la capa que orquesta las llamadas a la API y convierte DTOs → modelos de dominio.

```dart
// lib/features/auth/data/auth_repository.dart
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/user.dart';
import 'dtos/auth_dtos.dart';

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(ref.watch(dioProvider));
});

class AuthRepository {
  final Dio _dio;

  AuthRepository(this._dio);

  Future<AuthResponse> login(String email, String password) async {
    final response = await _dio.post(
      '/login',
      data: LoginRequest(email: email, password: password).toJson(),
    );

    return AuthResponse.fromJson(response.data);
  }

  Future<AuthResponse> register({
    required String name,
    required String email,
    required String password,
  }) async {
    final response = await _dio.post(
      '/register',
      data: RegisterRequest(
        name: name,
        email: email,
        password: password,
        passwordConfirmation: password,
      ).toJson(),
    );

    return AuthResponse.fromJson(response.data);
  }

  Future<User> getCurrentUser() async {
    final response = await _dio.get('/me');
    final userResponse = UserResponse.fromJson(response.data);
    return userResponse.user;
  }

  Future<void> logout() async {
    await _dio.post('/logout');
  }
}
```

## Manejo de errores con Either (alternativa)

Si prefieres un enfoque más funcional:

```dart
Future<AuthResult> login(String email, String password) async {
  try {
    final response = await _dio.post(
      '/login',
      data: { 'email': email, 'password': password },
    );
    return AuthResult.success(AuthResponse.fromJson(response.data));
  } on DioException catch (e) {
    final message = switch (e.response?.statusCode) {
      422 => _extractValidationError(e),
      401 => 'Credenciales inválidas',
      _   => 'Error de conexión',
    };
    return AuthResult.failure(message);
  }
}

sealed class AuthResult {
  const AuthResult();
}
class AuthSuccess extends AuthResult {
  final AuthResponse data;
  const AuthSuccess(this.data);
}
class AuthFailure extends AuthResult {
  final String message;
  const AuthFailure(this.message);
}
```

## Prueba del repository (con Mocktail)

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:dio/dio.dart';

class MockDio extends Mock implements Dio {}

void main() {
  late AuthRepository repo;
  late MockDio mockDio;

  setUp(() {
    mockDio = MockDio();
    repo = AuthRepository(mockDio);
  });

  test('login exitoso', () async {
    when(() => mockDio.post('/login', data: any(named: 'data')))
        .thenAnswer((_) async => Response(
              data: { 'token': 'abc', 'user': { 'id': '1', 'name': 'Ana', 'email': 'a@b.com' } },
              statusCode: 200,
              requestOptions: RequestOptions(path: '/login'),
            ));

    final result = await repo.login('a@b.com', '123');
    expect(result.token, 'abc');
  });

  test('login falla con 422', () async {
    when(() => mockDio.post('/login', data: any(named: 'data')))
        .thenThrow(DioException(
          response: Response(
            data: { 'message': 'Error de validación' },
            statusCode: 422,
            requestOptions: RequestOptions(path: '/login'),
          ),
          requestOptions: RequestOptions(path: '/login'),
        ));

    expect(() => repo.login('', ''), throwsA(isA<ApiException>()));
  });
}
```

## Mini-ejercicio

1. Crea `AuthRepository` con métodos login, register, getCurrentUser, logout
2. Convierte DTOs → modelo de dominio User
3. Prueba el login con un mock de dio

[Siguiente: flutter_secure_storage →](/modulo-3/03-secure-storage)
