---
title: 6.4 — Integration Tests
description: Probar flujos completos de la app
---

# 6.4 Integration Tests

## ¿Qué son?

Los integration tests prueban **flujos completos** conectando la app real (o con mocks) de principio a fin.

## Configuración

```yaml
dev_dependencies:
  integration_test:
    sdk: flutter
  flutter_test:
    sdk: flutter
```

## Estructura

```
integration_test/
├── app_test.dart
└── helpers/
    └── test_utils.dart
```

## Test: flujo de login

```dart
// integration_test/app_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('flujo completo: login → ver productos', (tester) async {
    // 1. Iniciar la app
    await tester.pumpWidget(const ProviderScope(child: MyApp()));
    await tester.pumpAndSettle();

    // 2. Debe mostrar login (no hay sesión)
    expect(find.text('Iniciar Sesión'), findsOneWidget);

    // 3. Llenar formulario
    await tester.enterText(find.byType(TextFormField).at(0), 'admin@test.com');
    await tester.enterText(find.byType(TextFormField).at(1), 'password');
    await tester.tap(find.text('Iniciar Sesión'));
    await tester.pumpAndSettle();

    // 3b. Si el login es real, esperar respuesta
    // Si usas mock, override el provider

    // 4. Verificar que navegó a la lista de productos
    expect(find.text('Productos'), findsOneWidget);
  });
}
```

## Test: mockeando la API completa

```dart
// Para tests de integración, a veces conviene mockear la capa HTTP:
class MockDioInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    if (options.path.endsWith('/login')) {
      handler.resolve(Response(
        data: { 'token': 'test-token', 'user': { 'id': '1', 'name': 'Test', 'email': 't@t.com' } },
        statusCode: 200,
        requestOptions: options,
      ));
    } else if (options.path.endsWith('/me')) {
      handler.resolve(Response(
        data: { 'id': '1', 'name': 'Test', 'email': 't@t.com' },
        statusCode: 200,
        requestOptions: options,
      ));
    } else if (options.path.contains('/products')) {
      handler.resolve(Response(
        data: { 'data': [], 'meta': { 'current_page': 1, 'last_page': 1, 'total': 0 } },
        statusCode: 200,
        requestOptions: options,
      ));
    } else {
      handler.reject(DioException(requestOptions: options, error: 'No mockeado'));
    }
  }
}
```

## Test: crear y verificar producto

```dart
testWidgets('crear producto y verificar en lista', (tester) async {
  // ... login ...

  // Navegar a crear producto
  await tester.tap(find.byType(FloatingActionButton));
  await tester.pumpAndSettle();

  // Llenar formulario
  await tester.enterText(find.byType(TextFormField).at(0), 'Producto Test');
  await tester.enterText(find.byType(TextFormField).at(1), 'Descripción');
  await tester.enterText(find.byType(TextFormField).at(2), '99.99');

  await tester.tap(find.text('Guardar Producto'));
  await tester.pumpAndSettle();

  // Debe volver al listado y mostrar el nuevo producto
  expect(find.text('Producto Test'), findsOneWidget);
});
```

## Buenas prácticas

| Práctica | Razón |
|----------|-------|
| Usa `pumpAndSettle()` | Espera a que todas las animaciones terminen |
| Mockea la capa HTTP | No dependas del backend real en tests |
| Tests pequeños y enfocados | Cada test prueba un flujo específico |
| `find.byType` > `find.text` | Menos frágil ante cambios de texto |
| Limpia estado entre tests | `ProviderContainer` nuevo en cada test |

## Mini-ejercicio

1. Crea un integration test para el flujo login → listado de productos
2. Mockea las respuestas HTTP con un interceptor personalizado
3. Agrega un test para crear un producto y verificar que aparece en la lista
4. Corre los tests con `flutter test integration_test/`

[Siguiente: Ejercicio Final →](/modulo-6/05-ejercicio-final)
