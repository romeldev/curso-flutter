---
title: 6.1 — Unit Tests con Riverpod
description: Probar providers y lógica de negocio
---

# 6.1 Unit Tests con Riverpod

## Estructura de tests

```
test/
├── features/
│   ├── auth/
│   │   ├── data/
│   │   │   └── auth_repository_test.dart
│   │   └── presentation/
│   │       └── auth_provider_test.dart
│   └── products/
│       ├── data/
│       │   └── products_repository_test.dart
│       └── presentation/
│           └── products_provider_test.dart
└── helpers/
    └── test_providers.dart
```

## ProviderContainer — el entorno de test

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';

void main() {
  late ProviderContainer container;

  setUp(() {
    container = ProviderContainer();
  });

  tearDown(() {
    container.dispose();
  });

  test('authProvider estado inicial es initial', () {
    final authState = container.read(authProvider);
    expect(authState, const AuthState.initial());
  });
}
```

## Override de dependencias

```dart
test('productListProvider carga productos', () async {
  // Creamos un mock del repositorio
  final mockRepo = MockProductsRepository();
  when(() => mockRepo.getProducts())
      .thenAnswer((_) async => PaginatedResponse(
            data: [Product(id: '1', name: 'Test', price: 10)],
            meta: Meta(currentPage: 1, lastPage: 1, total: 1),
          ));

  // Override: reemplazamos el provider real por el mock
  final container = ProviderContainer(overrides: [
    productsRepositoryProvider.overrideWithValue(mockRepo),
  ]);

  // Leemos el provider (se ejecuta async)
  final products = await container.read(productsProvider.future);
  expect(products.length, 1);
  expect(products.first.name, 'Test');
});
```

## Test de AuthNotifier

```dart
void main() {
  late ProviderContainer container;
  late MockAuthRepository mockRepo;
  late MockAuthStorage mockStorage;

  setUp(() {
    mockRepo = MockAuthRepository();
    mockStorage = MockAuthStorage();
    container = ProviderContainer(overrides: [
      authRepositoryProvider.overrideWithValue(mockRepo),
      authStorageProvider.overrideWithValue(mockStorage),
    ]);
  });

  tearDown(() => container.dispose());

  test('login exitoso cambia a authenticated', () async {
    when(() => mockRepo.login(any(), any()))
        .thenAnswer((_) async => AuthResponse(
              token: 'token123',
              user: User(id: '1', name: 'Ana', email: 'a@b.com'),
            ));
    when(() => mockStorage.saveToken(any())).thenAnswer((_) async => {});

    await container.read(authProvider.notifier).login('a@b.com', '123');

    final state = container.read(authProvider);
    expect(state, isA<Authenticated>());
    expect((state as Authenticated).user.name, 'Ana');
  });

  test('login con error cambia a error', () async {
    when(() => mockRepo.login(any(), any()))
        .thenThrow(ApiException('Credenciales inválidas'));

    await container.read(authProvider.notifier).login('a@b.com', 'wrong');

    final state = container.read(authProvider);
    expect(state, isA<Error>());
    expect((state as Error).message, 'Credenciales inválidas');
  });
}
```

## Test de ProductListNotifier

```dart
void main() {
  late ProviderContainer container;
  late MockProductsRepository mockRepo;

  setUp(() {
    mockRepo = MockProductsRepository();
    container = ProviderContainer(overrides: [
      productsRepositoryProvider.overrideWithValue(mockRepo),
    ]);
  });

  test('loadProducts carga correctamente', () async {
    when(() => mockRepo.getProducts()).thenAnswer((_) async =>
        PaginatedResponse(
          data: [Product(id: '1', name: 'Zapatos', price: 50)],
          meta: Meta(currentPage: 1, lastPage: 1, total: 1),
        ));

    await container.read(productListProvider.notifier).loadProducts();
    final state = container.read(productListProvider);

    expect(state.products.length, 1);
    expect(state.isLoading, false);
    expect(state.currentPage, 1);
  });

  test('loadProducts con error', () async {
    when(() => mockRepo.getProducts())
        .thenThrow(ApiException('Error de red'));

    await container.read(productListProvider.notifier).loadProducts();
    final state = container.read(productListProvider);

    expect(state.products, isEmpty);
    expect(state.errorMessage, isNotNull);
  });
}
```

## Mini-ejercicio

1. Escribe un test para `authProvider` que verifique login exitoso
2. Escribe un test para `authProvider` que verifique login fallido
3. Escribe un test para `productListProvider` que verifique carga de productos
4. Usa `ProviderContainer` con overrides

[Siguiente: Mocktail →](/modulo-6/02-mocktail)
