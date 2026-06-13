---
title: 5.2 — Rutas Anidadas y Parámetros
description: Parámetros de ruta, query, validación
---

# 5.2 Rutas Anidadas y Parámetros

## Parámetros de ruta (path parameters)

```dart
GoRoute(
  path: '/products/:id',
  builder: (context, state) {
    final id = state.pathParameters['id']!;
    return ProductDetailPage(productId: id);
  },
)
```

## Parámetros opcionales

```dart
GoRoute(
  path: '/products/:id',
  builder: (context, state) {
    final id = state.pathParameters['id']!;
    // Opcional: podrías recibir el producto completo como extra
    final product = state.extra as Product?;
    return ProductDetailPage(productId: id, product: product);
  },
)
```

## Query parameters

```dart
// Navegación: /products?category=zapatos&page=2
context.go('/products?category=zapatos&page=2');

// En el builder:
GoRoute(
  path: '/products',
  builder: (context, state) {
    final category = state.uri.queryParameters['category'];
    final page = int.tryParse(state.uri.queryParameters['page'] ?? '1');
    return ProductsListPage(category: category, page: page ?? 1);
  },
)
```

## Parámetros con tipado seguro (Uri.parse)

```dart
Uri buildProductRoute({required String id, String? tab}) {
  final uri = Uri(path: '/products/$id', queryParameters: {
    if (tab != null) 'tab': tab,
  });
  return uri;
}

// Navegación
context.go(buildProductRoute(id: '123', tab: 'reviews').toString());
```

## Validación de parámetros

```dart
GoRoute(
  path: '/products/:id',
  builder: (context, state) {
    final id = state.pathParameters['id'];

    // Validar que el ID no esté vacío
    if (id == null || id.isEmpty) {
      return const NotFoundPage();
    }

    return ProductDetailPage(productId: id);
  },
)
```

## Redirect por parámetro inválido

```dart
GoRoute(
  path: '/products/:id',
  redirect: (context, state) {
    final id = state.pathParameters['id'];
    if (id == null || id.isEmpty) return '/products';
    if (int.tryParse(id) == null && id != 'new') return '/products';
    return null;
  },
  builder: (context, state) {
    final id = state.pathParameters['id']!;
    return ProductDetailPage(productId: id);
  },
)
```

## Mini-ejercicio

1. Crea una ruta `/products/:id` que reciba el ID como path parameter
2. Agrega query parameters opcionales: `?tab=details&referrer=home`
3. Valida que el ID no sea vacío
4. Navega con `context.go('/products/123?tab=reviews')`

[Siguiente: Deep Linking →](/modulo-5/03-deep-linking)
