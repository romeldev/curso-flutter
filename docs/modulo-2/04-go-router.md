---
title: 2.4 — go_router
description: Router declarativo, rutas anidadas, redirects
---

# 2.4 go_router

## ¿Qué es go_router?

Es el router declarativo oficial de Flutter. En lugar de `Navigator.push/pop` esparcido por toda la app, **defines todas las rutas en un solo lugar**.

```dart
// ❌ Sin go_router: rutas invisibles, push/pop por todas partes
Navigator.push(context, MaterialPageRoute(builder: (_) => DetallePage()));

// ✅ Con go_router: rutas declarativas en un archivo
context.go('/products/123');
```

## Instalación

```yaml
dependencies:
  go_router: ^14.8.0
```

## RouterProvider con Riverpod

```dart
// lib/core/router/app_router.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        name: 'home',
        builder: (context, state) => const HomePage(),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginPage(),
      ),
      GoRoute(
        path: '/products',
        name: 'products',
        builder: (context, state) => const ProductsListPage(),
        routes: [
          GoRoute(
            path: ':id',   // ← /products/123
            name: 'product-detail',
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return ProductDetailPage(productId: id);
            },
          ),
        ],
      ),
    ],
  );
});
```

## MaterialApp.router

```dart
// app.dart
class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return MaterialApp.router(
      title: 'Mi App',
      theme: ref.watch(appThemeProvider),
      routerConfig: ref.watch(routerProvider),  // ← el GoRouter
    );
  }
}
```

## Navegar (context.go vs context.push)

```dart
// Reemplaza la ruta actual (sin botón atrás)
context.go('/products');

// Apila una nueva ruta (con botón atrás)
context.push('/products/123');

// Volver atrás
context.pop();

// Ir a login y limpiar el historial
context.go('/login');
```

## Pasar y recibir parámetros

```dart
GoRoute(
  path: '/products/:id',
  builder: (context, state) {
    final id = state.pathParameters['id']!;        // de la URL
    final extra = state.extra as Product?;          // datos extra
    return ProductDetailPage(productId: id, product: extra);
  },
);

// Navegar con parámetros
context.push('/products/123', extra: miProducto);

// Query parameters
context.push('/products?category=zapatos&page=1');
// En el builder: state.uri.queryParameters['category']
```

## Redirect (protección de rutas)

```dart
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final isLoggedIn = authState.isAuthenticated;
      final isLoginRoute = state.matchedLocation == '/login';

      // Si no está logueado y no está en login → redirigir
      if (!isLoggedIn && !isLoginRoute) return '/login';

      // Si está logueado y está en login → ir a home
      if (isLoggedIn && isLoginRoute) return '/';

      return null;  // no redirige
    },
    routes: [ /* ... */ ],
  );
});
```

## Mini-ejercicio

1. Crea `routerProvider` en `lib/core/router/`
2. Define rutas: `/`, `/login`, `/products`, `/products/:id`
3. Conecta `MaterialApp.router` con `routerConfig`
4. Agrega un `redirect` que lleve a `/login` si no hay sesión
5. Navega entre pantallas con `context.go()` y `context.push()`

[Siguiente: freezed →](/modulo-2/05-freezed)
