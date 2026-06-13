---
title: 5.4 — Transiciones Personalizadas
description: Animaciones entre rutas con CustomTransitionPage
---

# 5.4 Transiciones Personalizadas

## Transición por defecto

Por defecto go_router usa `MaterialPageTransition` (slide desde la derecha en Android, desde abajo en iOS). Con `CustomTransitionPage` puedes personalizarlo.

## Slide horizontal

```dart
GoRoute(
  path: '/products/:id',
  pageBuilder: (context, state) {
    return CustomTransitionPage(
      key: state.pageKey,
      child: ProductDetailPage(productId: state.pathParameters['id']!),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(1, 0),   // empieza desde la derecha
            end: Offset.zero,
          ).animate(animation),
          child: child,
        );
      },
    );
  },
)
```

## Slide desde abajo (como modal)

```dart
pageBuilder: (context, state) {
  return CustomTransitionPage(
    key: state.pageKey,
    child: ProductFormPage(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return SlideTransition(
        position: Tween<Offset>(
          begin: const Offset(0, 1),   // desde abajo
          end: Offset.zero,
        ).animate(CurvedAnimation(
          parent: animation,
          curve: Curves.easeOutCubic,
        )),
        child: child,
      );
    },
  );
},
```

## Fade transition

```dart
pageBuilder: (context, state) {
  return CustomTransitionPage(
    key: state.pageKey,
    child: const ProfilePage(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: animation,
        child: child,
      );
    },
  );
},
```

## Scale + Fade (zoom in)

```dart
pageBuilder: (context, state) {
  return CustomTransitionPage(
    key: state.pageKey,
    child: ProductDetailPage(productId: state.pathParameters['id']!),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return ScaleTransition(
        scale: Tween<double>(begin: 0.8, end: 1.0).animate(
          CurvedAnimation(parent: animation, curve: Curves.easeOutBack),
        ),
        child: FadeTransition(
          opacity: animation,
          child: child,
        ),
      );
    },
  );
},
```

## Mix de transiciones

Puedes combinar varias animaciones:

```dart
transitionsBuilder: (context, animation, secondaryAnimation, child) {
  return SlideTransition(
    position: Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(animation),
    child: FadeTransition(
      opacity: animation,
      child: child,
    ),
  );
},
```

## Rutas con transición global

Para aplicar la misma transición a todas las rutas, usa `defaultPageBuilder`:

```dart
final router = GoRouter(
  routes: [ /* ... */ ],
  // No hay defaultPageBuilder directo,
  // pero puedes crear una función helper
);
```

Helper:

```dart
GoRoute fadeRoute({
  required String path,
  required WidgetBuilder builder,
  String? name,
}) {
  return GoRoute(
    path: path,
    name: name,
    pageBuilder: (context, state) {
      return CustomTransitionPage(
        key: state.pageKey,
        child: builder(context),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
          return FadeTransition(opacity: animation, child: child);
        },
      );
    },
  );
}

// Uso:
fadeRoute(path: '/products', builder: (_) => const ProductsListPage()),
```

## Transición tipo modal (abajo hacia arriba)

Útil para formularios o pantallas que se sienten como modales:

```dart
GoRoute(
  path: 'create',
  pageBuilder: (context, state) {
    return ModalBottomSheetRoute(
      builder: (_) => const ProductFormPage(),
      isScrollControlled: true,
      settings: RouteSettings(name: 'product-create'),
    );
  },
);
```

## Mini-ejercicio

1. Reemplaza la transición por defecto de `/products/:id` con un slide personalizado
2. Prueba fade para `/profile`
3. Crea un helper `fadeRoute` para reutilizar transiciones
4. Ajusta la curva de animación con `CurvedAnimation`

[Siguiente: Guardas por rol →](/modulo-5/05-guardas)
