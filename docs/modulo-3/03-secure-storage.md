---
title: 3.3 — flutter_secure_storage
description: Guardar/leer/borrar token de forma segura
---

# 3.3 flutter_secure_storage

## ¿Qué es?

`flutter_secure_storage` guarda datos en el almacenamiento seguro del dispositivo:
- **Android**: EncryptedSharedPreferences (o KeyStore en versiones antiguas)
- **iOS**: Keychain Services
- **Linux**: libsecret / Secret Service API

El token JWT **nunca** debe guardarse en `SharedPreferences` ni en almacenamiento plano.

## Instalación

```yaml
dependencies:
  flutter_secure_storage: ^9.2.0
```

## Provider del SecureStorage

```dart
// lib/core/network/secure_storage.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final secureStorageProvider = Provider<FlutterSecureStorage>((ref) {
  return const FlutterSecureStorage(
    aOptions: AndroidOptions(encryptedSharedPreferences: true),
  );
});
```

## Auth tokens service

```dart
// lib/features/auth/data/auth_storage.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final authStorageProvider = Provider<AuthStorage>((ref) {
  return AuthStorage(ref.watch(secureStorageProvider));
});

class AuthStorage {
  static const _tokenKey = 'auth_token';
  static const _userKey = 'auth_user';
  final FlutterSecureStorage _storage;

  AuthStorage(this._storage);

  Future<void> saveToken(String token) async {
    await _storage.write(key: _tokenKey, value: token);
  }

  Future<String?> getToken() async {
    return await _storage.read(key: _tokenKey);
  }

  Future<void> deleteToken() async {
    await _storage.delete(key: _tokenKey);
  }

  Future<void> saveUser(String userJson) async {
    await _storage.write(key: _userKey, value: userJson);
  }

  Future<String?> getUser() async {
    return await _storage.read(key: _userKey);
  }

  Future<void> clearAll() async {
    await _storage.deleteAll();
  }
}
```

## Verificar si hay sesión al iniciar

```dart
// Al iniciar la app, verificamos si hay un token guardado
Future<bool> hasSession(AuthStorage storage) async {
  final token = await storage.getToken();
  return token != null && token.isNotEmpty;
}
```

Esto permite que el usuario **no tenga que loguearse cada vez** que abre la app.

## Seguridad en Linux (escritorio)

Para desarrollo en Linux (como tu Ubuntu), necesitas instalar `libsecret`:

```bash
sudo apt install libsecret-1-dev
```

Si no lo tienes, `flutter_secure_storage` lanzará un error al escribir/leer.

## Mini-ejercicio

1. Crea el provider `secureStorageProvider` en `lib/core/network/`
2. Crea `AuthStorage` con métodos saveToken, getToken, deleteToken, clearAll
3. Prueba guardar un token, leerlo y borrarlo
4. Verifica que funciona en Linux con `libsecret` instalado

[Siguiente: AuthProvider →](/modulo-3/04-auth-provider)
