---
title: 6.2 — Mocktail
description: Mockear dependencias sin backend real
---

# 6.2 Mocktail

## ¿Por qué Mocktail?

`mocktail` es como Mockito pero **sin codegen**. No necesitas `build_runner` para crear mocks.

```yaml
dev_dependencies:
  mocktail: ^1.0.0
```

## Crear un mock

```dart
import 'package:mocktail/mocktail.dart';

// Cualquier clase se puede mockear con extends Mock implements
class MockDio extends Mock implements Dio {}
class MockAuthRepository extends Mock implements AuthRepository {}
class MockProductsRepository extends Mock implements ProductsRepository {}
class MockAuthStorage extends Mock implements FlutterSecureStorage {}
```

## when — configurar respuestas

```dart
// Retornar un valor
when(() => mockRepo.getProducts()).thenAnswer(
  (_) async => PaginatedResponse(data: [], meta: Meta(currentPage: 1, lastPage: 1, total: 0)),
);

// Retornar un valor específico
when(() => mockRepo.getProduct('123')).thenAnswer(
  (_) async => Product(id: '123', name: 'Zapatos', price: 50),
);

// Lanzar una excepción
when(() => mockRepo.login(any(), any())).thenThrow(
  ApiException('Credenciales inválidas'),
);
```

## verify — verificar que se llamó

```dart
// Verificar que se llamó una vez
verify(() => mockRepo.getProducts()).called(1);

// Verificar con argumentos específicos
verify(() => mockRepo.createProduct({
  'name': 'Nuevo',
  'price': 25.0,
})).called(1);

// Verificar que NO se llamó
verifyNever(() => mockRepo.deleteProduct(any()));
```

## any — cualquier argumento

```dart
// Cualquier String
when(() => mockRepo.deleteProduct(any())).thenAnswer((_) async => {});
when(() => mockRepo.getProduct(any())).thenAnswer(
  (_) async => Product(id: '1', name: 'Test', price: 10),
);

// Cualquier Map
when(() => mockRepo.createProduct(any(named: 'data'))).thenAnswer(
  (_) async => Product(id: '2', name: 'Nuevo', price: 20),
);
```

## Capturar argumentos

```dart
// Para inspeccionar qué argumentos se pasaron
when(() => mockRepo.createProduct(any())).thenAnswer(
  (_) async => Product(id: '1', name: 'Test', price: 10),
);

await repo.createProduct({ 'name': 'Test', 'price': 10 });

final captured = verify(() => mockRepo.createProduct(captureAny())).captured;
print(captured[0]);  // { 'name': 'Test', 'price': 10 }
```

## Mock de Stream

```dart
class MockStreamService extends Mock implements StreamService {}

test('stream provider emite valores', () {
  when(() => mockService.observeProducts())
      .thenAnswer((_) => Stream.fromIterable([product1, product2]));

  // ...
});
```

## Reset de mocks entre tests

```dart
setUp(() {
  mockRepo = MockProductsRepository();
  // Opcional: reset si se usa en múltiples tests
  reset(mockRepo);
});

tearDown(() {
  // Verificar que no quedaron interacciones sin verificar
  verifyNoMoreInteractions(mockRepo);
});
```

## Mini-ejercicio

1. Crea `MockProductsRepository` con mocktail
2. Configura respuestas para getProducts, createProduct, deleteProduct
3. Escribe un test que verifique que `createProduct` fue llamado con los datos correctos
4. Usa `captureAny` para inspeccionar argumentos

[Siguiente: Widget Tests →](/modulo-6/03-widget-tests)
