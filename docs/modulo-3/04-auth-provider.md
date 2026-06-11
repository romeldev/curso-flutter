---
title: 3.4 — AuthProvider con Riverpod
description: Estado de autenticación global con StateNotifier
---

# 3.4 AuthProvider con Riverpod

## El estado de autenticación

```dart
// lib/features/auth/domain/auth_state.dart
import 'package:freezed_annotation/freezed_annotation.dart';
import 'user.dart';

part 'auth_state.freezed.dart';

@freezed
sealed class AuthState with _$AuthState {
  const AuthState._();

  // Estado inicial: no sabemos si hay sesión
  const factory AuthState.initial() = _Initial;

  // Cargando (login en progreso, o verificando sesión)
  const factory AuthState.loading() = _Loading;

  // Usuario autenticado
  const factory AuthState.authenticated({
    required User user,
    required String token,
  }) = _Authenticated;

  // Error
  const factory AuthState.error({required String message}) = _Error;

  // Getters útiles
  bool get isAuthenticated => this is _Authenticated;
  bool get isLoading => this is _Loading;
  String? get errorMessage => switch (this) {
    _Error(:var message) => message,
    _ => null,
  };
}
```

## AuthNotifier — la lógica

```dart
// lib/features/auth/presentation/providers/auth_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/auth_repository.dart';
import '../../data/auth_storage.dart';
import '../../domain/auth_state.dart';

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(
    ref.watch(authRepositoryProvider),
    ref.watch(authStorageProvider),
  );
});

class AuthNotifier extends StateNotifier<AuthState> {
  final AuthRepository _repository;
  final AuthStorage _storage;

  AuthNotifier(this._repository, this._storage) : super(const AuthState.initial()) {
    // Al crear el provider, verificamos si hay sesión guardada
    _checkSession();
  }

  Future<void> _checkSession() async {
    final token = await _storage.getToken();
    if (token == null) {
      state = const AuthState.initial();
      return;
    }

    state = const AuthState.loading();
    try {
      final user = await _repository.getCurrentUser();
      state = AuthState.authenticated(user: user, token: token);
    } catch (e) {
      // Token inválido o expirado → limpiar
      await _storage.clearAll();
      state = const AuthState.initial();
    }
  }

  Future<void> login(String email, String password) async {
    state = const AuthState.loading();
    try {
      final response = await _repository.login(email, password);
      await _storage.saveToken(response.token);
      await _storage.saveUser(response.user.toJson().toString());
      state = AuthState.authenticated(
        user: response.user,
        token: response.token,
      );
    } on ApiException catch (e) {
      state = AuthState.error(message: e.message);
    } catch (e) {
      state = AuthState.error(message: 'Error inesperado');
    }
  }

  Future<void> register({
    required String name,
    required String email,
    required String password,
  }) async {
    state = const AuthState.loading();
    try {
      final response = await _repository.register(
        name: name, email: email, password: password,
      );
      await _storage.saveToken(response.token);
      state = AuthState.authenticated(
        user: response.user,
        token: response.token,
      );
    } on ApiException catch (e) {
      state = AuthState.error(message: e.message);
    } catch (e) {
      state = AuthState.error(message: 'Error inesperado');
    }
  }

  Future<void> logout() async {
    try {
      await _repository.logout();
    } catch (_) {
      // Si la API falla, igual limpiamos localmente
    }
    await _storage.clearAll();
    state = const AuthState.initial();
  }

  void clearError() {
    state = state is _Error
        ? const AuthState.initial()
        : state;
  }
}
```

## Flujo completo del AuthProvider

```
App inicia
    │
    ▼
AuthNotifier creado → _checkSession()
    │
    ├── Token guardado? → GET /me
    │       │
    │       ├── 200 → Authenticated(user, token)
    │       └── 401 → Initial (token expirado, se limpia)
    │
    └── No token → Initial

Usuario hace login
    │
    ▼
login(email, pass) → LOADING
    │
    ├── 200 → saveToken() → AUTHENTICATED
    └── 422/500 → ERROR(message)

Cerrar sesión
    │
    ▼
logout() → clearAll() → INITIAL
```

## Mini-ejercicio

1. Crea `AuthState` con freezed (initial, loading, authenticated, error)
2. Crea `AuthNotifier` extendiendo `StateNotifier<AuthState>`
3. Implementa `_checkSession()` que verifica si hay token guardado
4. Implementa `login()` y `logout()`

[Siguiente: Pantalla de Login →](/modulo-3/05-login-page)
