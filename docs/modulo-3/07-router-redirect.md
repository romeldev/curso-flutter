---
title: 3.7 — go_router Redirect
description: Proteger rutas según estado de autenticación
---

# 3.7 go_router Redirect

## Redirect con Riverpod

```dart
// lib/core/router/app_router.dart
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../features/auth/presentation/providers/auth_provider.dart';

final routerProvider = Provider<GoRouter>((ref) {
  // Escuchamos el estado de autenticación
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/',
    // EL REDIRECT se ejecuta en cada navegación
    redirect: (context, state) {
      final isAuthenticated = authState.isAuthenticated;
      final isAuthRoute = state.matchedLocation == '/login';
      final isInitial = authState is _Initial;

      // Mientras verificamos sesión, no redirigimos
      if (isInitial) return null;
      if (authState.isLoading) return null;

      // Si no está autenticado y no está en login → va a login
      if (!isAuthenticated && !isAuthRoute) return '/login';

      // Si está autenticado y está en login → va a home
      if (isAuthenticated && isAuthRoute) return '/';

      return null;  // No redirige
    },
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
            path: ':id',
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

## Flujo de redirect

```
Usuario visita /products (sin sesión)
    │
    ▼
redirect() se ejecuta
    │
    ├── isAuthenticated? NO
    ├── isAuthRoute (/login)? NO
    │
    ▼
return '/login'  ← redirigido

Usuario se loguea → estado cambia a Authenticated
    │
    ▼
redirect() se ejecuta de nuevo
    │
    ├── isAuthenticated? SÍ
    ├── isAuthRoute (/login)? SÍ
    │
    ▼
return '/'  ← redirigido al home
```

## RefreshListener (actualizar redirects)

Cuando el estado de auth cambia, go_router necesita saberlo. Con Riverpod esto funciona automáticamente porque `ref.watch(authProvider)` hace que el provider se reconstruya cuando authState cambia.

```dart
// Si por alguna razón el redirect no se ejecuta,
// puedes forzar refresh manualmente:
final router = ref.read(routerProvider);
router.refresh();  // re-ejecuta el redirect
```

## Rutas públicas vs protegidas

```dart
redirect: (context, state) {
  final isAuthenticated = authState.isAuthenticated;
  final location = state.matchedLocation;

  // Rutas que no requieren autenticación
  const publicRoutes = ['/login', '/register', '/forgot-password'];

  // Si la ruta es pública, permite el acceso
  if (publicRoutes.any((r) => location.startsWith(r))) return null;

  // Si no está autenticado → login
  if (!isAuthenticated) return '/login';

  return null;
}
```

## Mini-ejercicio

1. Actualiza el `routerProvider` para incluir `redirect` con el estado de auth
2. Define rutas públicas (/login) y protegidas (todo lo demás)
3. Prueba navegar a /products sin sesión → debe redirigir a /login
4. Después de login exitoso → debe redirigir a /

[Siguiente: Cerrar Sesión →](/modulo-3/08-logout)
