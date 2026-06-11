---
title: 3.6 — Manejo de Errores HTTP
description: 401, 422, 500, mensajes amigables
---

# 3.6 Manejo de Errores HTTP

## Mapa de errores

```dart
// lib/core/network/api_exception.dart
class ApiException implements Exception {
  final String message;
  final int? statusCode;
  final Map<String, List<String>>? errors;

  const ApiException(this.message, {this.statusCode, this.errors});

  @override
  String toString() => message;
}

// En el interceptor global
class ErrorInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    final apiError = _mapToApiException(err);
    handler.reject(DioException(
      requestOptions: err.requestOptions,
      response: err.response,
      error: apiError,
      type: err.type,
    ));
  }

  ApiException _mapToApiException(DioException e) {
    final code = e.response?.statusCode;
    final data = e.response?.data;

    // Errores de validación (422)
    if (code == 422 && data is Map) {
      final errors = <String, List<String>>{};
      final errorsMap = data['errors'] as Map?;
      if (errorsMap != null) {
        errorsMap.forEach((key, value) {
          errors[key.toString()] = (value as List).cast<String>();
        });
      }
      return ApiException(
        data['message'] as String? ?? 'Error de validación',
        statusCode: code,
        errors: errors,
      );
    }

    return ApiException(
      _defaultMessage(code),
      statusCode: code,
    );
  }

  String _defaultMessage(int? code) => switch (code) {
    400 => 'Solicitud inválida',
    401 => 'No autorizado. Verifica tus credenciales.',
    403 => 'No tienes permiso para esta acción.',
    404 => 'Recurso no encontrado.',
    422 => 'Error de validación. Revisa los campos.',
    429 => 'Demasiadas solicitudes. Intenta más tarde.',
    500 => 'Error interno del servidor. Intenta más tarde.',
    _   => 'Error de conexión. Verifica tu internet.',
  };
}
```

## Mostrar errores de validación por campo

```dart
class LoginPage extends ConsumerStatefulWidget {
  // ...
}

class _LoginPageState extends ConsumerState<LoginPage> {
  String? _emailError;
  String? _passwordError;

  void _submit() {
    setState(() {
      _emailError = null;
      _passwordError = null;
    });

    if (!_formKey.currentState!.validate()) return;

    ref.read(authProvider.notifier).login(
      _emailCtrl.text.trim(),
      _passwordCtrl.text,
    );
  }

  @override
  Widget build(BuildContext context) {
    ref.listen(authProvider, (_, state) {
      state.maybeWhen(
        error: (message, apiException) {
          if (apiException?.errors != null) {
            // Errores por campo (422)
            setState(() {
              _emailError = apiException.errors!['email']?.first;
              _passwordError = apiException.errors!['password']?.first;
            });
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(message), backgroundColor: Colors.red),
            );
          }
        },
        orElse: () {},
      );
    });

    return TextFormField(
      controller: _emailCtrl,
      decoration: InputDecoration(
        labelText: 'Correo',
        errorText: _emailError,  // ← error debajo del campo
      ),
      // ...
    );

    // Igual para _passwordError
  }
}
```

## Estados visuales del AuthState

```dart
// En tu widget, puedes manejar el estado con when
ref.watch(authProvider).when(
  initial: () => const Text('Inicia sesión para continuar'),
  loading: () => const CircularProgressIndicator(),
  authenticated: (user, _) => Text('Bienvenido, ${user.name}'),
  error: (message, _) => Text('Error: $message'),
);
```

## Errores que el usuario debe ver

| Situación | Mensaje |
|-----------|---------|
| Login con credenciales inválidas | "Credenciales inválidas" |
| Token expirado | "Tu sesión expiró. Inicia sesión de nuevo." |
| Sin conexión | "Sin conexión a internet" |
| Error 500 | "Error interno del servidor. Intenta más tarde." |
| Error de validación | Se muestra debajo del campo correspondiente |

## Mini-ejercicio

1. Crea `ErrorInterceptor` que convierta errores HTTP en mensajes legibles
2. Agrega manejo de errores 422 con mensajes por campo
3. Muestra errores de validación debajo de cada campo en el formulario de login
4. Muestra errores generales con SnackBar

[Siguiente: Redirect con go_router →](/modulo-3/07-router-redirect)
