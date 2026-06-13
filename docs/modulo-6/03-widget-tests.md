---
title: 6.3 — Widget Tests
description: Probar pantallas con ProviderScope y overrides
---

# 6.3 Widget Tests

## Estructura básica

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() {
  testWidgets('ProductsListPage muestra loading inicial', (tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: MaterialApp(home: ProductsListPage()),
      ),
    );

    expect(find.byType(CircularProgressIndicator), findsOneWidget);
  });
}
```

## Override de providers en widget tests

```dart
testWidgets('ProductsListPage muestra lista de productos', (tester) async {
  final mockRepo = MockProductsRepository();
  when(() => mockRepo.getProducts()).thenAnswer(
    (_) async => PaginatedResponse(
      data: [
        Product(id: '1', name: 'Zapatos', price: 50),
        Product(id: '2', name: 'Camiseta', price: 20),
      ],
      meta: Meta(currentPage: 1, lastPage: 1, total: 2),
    ),
  );

  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        productsRepositoryProvider.overrideWithValue(mockRepo),
      ],
      child: const MaterialApp(home: ProductsListPage()),
    ),
  );

  // Esperar a que se resuelva el FutureProvider
  await tester.pumpAndSettle();

  expect(find.text('Zapatos'), findsOneWidget);
  expect(find.text('Camiseta'), findsOneWidget);
  expect(find.text('\$50.00'), findsOneWidget);
});
```

## Test de formulario con validación

```dart
testWidgets('ProductFormPage muestra error si name está vacío', (tester) async {
  await tester.pumpWidget(
    ProviderScope(
      overrides: [
        productsRepositoryProvider.overrideWithValue(MockProductsRepository()),
      ],
      child: const MaterialApp(home: ProductFormPage()),
    ),
  );

  // Presionar guardar sin llenar campos
  await tester.tap(find.text('Guardar Producto'));
  await tester.pumpAndSettle();

  // Debe mostrar error de validación
  expect(find.text('Obligatorio'), findsWidgets);
});
```

## Test de navegación

```dart
testWidgets('tap en producto navega al detalle', (tester) async {
  final mockRepo = MockProductsRepository();
  when(() => mockRepo.getProducts()).thenAnswer(
    (_) async => PaginatedResponse(
      data: [Product(id: '1', name: 'Zapatos', price: 50)],
      meta: Meta(currentPage: 1, lastPage: 1, total: 1),
    ),
  );

  await tester.pumpWidget(
    ProviderScope(
      overrides: [productsRepositoryProvider.overrideWithValue(mockRepo)],
      child: MaterialApp.router(
        routerConfig: GoRouter(
          initialLocation: '/products',
          routes: [
            GoRoute(path: '/products', builder: (_, __) => const ProductsListPage()),
            GoRoute(path: '/products/:id', builder: (_, state) {
              return ProductDetailPage(productId: state.pathParameters['id']!);
            }),
          ],
        ),
      ),
    ),
  );

  await tester.pumpAndSettle();

  // Tap en el producto
  await tester.tap(find.text('Zapatos'));
  await tester.pumpAndSettle();

  // Debe estar en la pantalla de detalle
  expect(find.text('Detalle del Producto'), findsOneWidget);
});
```

## Test de estados vacío y error

```dart
testWidgets('ProductsListPage muestra empty state', (tester) async {
  final mockRepo = MockProductsRepository();
  when(() => mockRepo.getProducts()).thenAnswer(
    (_) async => PaginatedResponse(
      data: [],
      meta: Meta(currentPage: 1, lastPage: 1, total: 0),
    ),
  );

  await tester.pumpWidget(
    ProviderScope(
      overrides: [productsRepositoryProvider.overrideWithValue(mockRepo)],
      child: const MaterialApp(home: ProductsListPage()),
    ),
  );

  await tester.pumpAndSettle();

  expect(find.text('No hay productos'), findsOneWidget);
  expect(find.text('Crear primer producto'), findsOneWidget);
});
```

## Mini-ejercicio

1. Escribe un widget test para `LoginPage` que verifique:
   - Muestra los campos de email y password
   - Botón deshabilitado durante loading
   - SnackBar en error
2. Escribe un widget test para `ProductsListPage`:
   - Muestra lista cuando hay datos
   - Muestra "No hay productos" cuando está vacía
   - Navega al detalle al hacer tap

[Siguiente: Integration Tests →](/modulo-6/04-integration-tests)
