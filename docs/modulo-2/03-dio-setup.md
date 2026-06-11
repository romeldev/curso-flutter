---
title: 2.3 — Configuración de dio
description: Cliente HTTP, interceptors, manejo de errores
---

# 2.3 Configuración de dio

## Provider del cliente HTTP

```dart
// lib/core/network/dio_client.dart
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

final dioProvider = Provider<Dio>((ref) {
  final dio = Dio(BaseOptions(
    baseUrl: 'https://api.miapp.com/api',
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  ));

  dio.interceptors.addAll([
    AuthInterceptor(ref),
    LogInterceptor(
      requestBody: true,
      responseBody: true,
    ),
  ]);

  return dio;
});
```

## Interceptor de autenticación

```dart
class AuthInterceptor extends Interceptor {
  final Ref _ref;

  AuthInterceptor(this._ref);

  @override
  void onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    // Leer token de secure storage
    const storage = FlutterSecureStorage();
    final token = await storage.read(key: 'auth_token');

    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }

    handler.next(options);
  }

  @override
  void onError(
    DioException err,
    ErrorInterceptorHandler handler,
  ) async {
    if (err.response?.statusCode == 401) {
      // Token expirado o inválido → redirigir a login
      const storage = FlutterSecureStorage();
      await storage.delete(key: 'auth_token');
      // Aquí podrías disparar un evento para que el router redirija
    }

    handler.next(err);
  }
}
```

## Interceptor de logging

```dart
LogInterceptor(
  request: true,
  requestBody: true,      // muestra el body enviado
  responseBody: true,     // muestra la respuesta
  error: true,
  logPrint: (obj) => print('[HTTP] $obj'),  // prefijo personalizado
)
```

## Manejo de errores centralizado

```dart
class ApiException implements Exception {
  final String message;
  final int? statusCode;

  ApiException(this.message, {this.statusCode});

  @override
  String toString() => message;
}

// En el repository:
Future<List<Product>> getProducts() async {
  try {
    final response = await dio.get('/products');
    return (response.data as List)
        .map((json) => Product.fromJson(json))
        .toList();
  } on DioException catch (e) {
    throw ApiException(
      _mapError(e),
      statusCode: e.response?.statusCode,
    );
  }
}

String _mapError(DioException e) {
  switch (e.type) {
    case DioExceptionType.connectionTimeout:
      return 'Tiempo de conexión agotado';
    case DioExceptionType.receiveTimeout:
      return 'Tiempo de respuesta agotado';
    case DioExceptionType.badResponse:
      return switch (e.response?.statusCode) {
        400 => 'Solicitud inválida',
        401 => 'No autorizado',
        403 => 'Acceso denegado',
        404 => 'Recurso no encontrado',
        500 => 'Error interno del servidor',
        _   => 'Error inesperado (${e.response?.statusCode})',
      };
    case DioExceptionType.connectionError:
      return 'Sin conexión a internet';
    default:
      return 'Error de red';
  }
}
```

## Mini-ejercicio

1. Crea el provider `dioProvider` en `lib/core/network/`
2. Configura `baseUrl`, timeouts y headers por defecto
3. Agrega el `LogInterceptor`
4. Crea una clase `ApiException` para errores personalizados
5. Prueba haciendo una petición GET a una API pública (jsonplaceholder)

[Siguiente: go_router →](/modulo-2/04-go-router)
