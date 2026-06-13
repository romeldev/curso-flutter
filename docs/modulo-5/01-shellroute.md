---
title: 5.1 — ShellRoute
description: BottomNavigationBar con persistencia de estado
---

# 5.1 ShellRoute

## El problema

Con `GoRoute` simple, cambiar de pantalla con `context.go('/products')` remplaza toda la ruta. No hay forma de tener un BottomNavigationBar que **persista el estado** de cada tab.

```dart
// ❌ Sin ShellRoute: cada navegación destruye la pantalla anterior
context.go('/products');   // ProductsListPage se crea
context.go('/profile');    // ProductsListPage se destruye
context.go('/products');   // ProductsListPage se vuelve a crear (pierde scroll!)
```

## ShellRoute — la solución

`ShellRoute` envuelve las rutas hijas en un "shell" que persiste. Ideal para tabs.

```dart
final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    initialLocation: '/products',
    routes: [
      // ShellRoute envuelve las rutas con un scaffold + bottom nav
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return ScaffoldWithNavBar(navigationShell: navigationShell);
        },
        branches: [
          // Tab 1: Productos
          StatefulShellBranch(
            routes: [
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
                  GoRoute(
                    path: 'create',
                    name: 'product-create',
                    builder: (context, state) => const ProductFormPage(),
                  ),
                ],
              ),
            ],
          ),
          // Tab 2: Perfil
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/profile',
                name: 'profile',
                builder: (context, state) => const ProfilePage(),
              ),
            ],
          ),
          // Tab 3: Ajustes
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/settings',
                name: 'settings',
                builder: (context, state) => const SettingsPage(),
              ),
            ],
          ),
        ],
      ),
    ],
  );
});
```

## ScaffoldWithNavBar

```dart
class ScaffoldWithNavBar extends StatelessWidget {
  final StatefulNavigationShell navigationShell;

  const ScaffoldWithNavBar({super.key, required this.navigationShell});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: navigationShell,  // ← aquí se renderiza el contenido del tab activo
      bottomNavigationBar: NavigationBar(
        selectedIndex: navigationShell.currentIndex,
        onDestinationSelected: (index) {
          navigationShell.goBranch(
            index,
            initialLocation: index == navigationShell.currentIndex,
          );
        },
        destinations: const [
          NavigationDestination(icon: Icon(Icons.inventory), label: 'Productos'),
          NavigationDestination(icon: Icon(Icons.person), label: 'Perfil'),
          NavigationDestination(icon: Icon(Icons.settings), label: 'Ajustes'),
        ],
      ),
    );
  }
}
```

## Navegar dentro de un tab

Cuando estás dentro de un tab, usa `context.go` normal:

```dart
// Navega dentro del tab actual (sin cambiar de tab)
context.go('/products/create');

// Cambiar de tab programáticamente
final shell = StatefulNavigationShell.of(context);
shell.goBranch(1);  // va al tab de perfil
```

## Persistencia de estado

Cada tab mantiene su **propio stack de rutas**. Si estás en `/products/123` y cambias a perfil, al volver a productos sigues viendo el detalle.

```
Tab Productos:  /products → /products/123 → /products/create
Tab Perfil:     /profile
Tab Ajustes:    /settings
```

## Mini-ejercicio

1. Reemplaza tus rutas actuales por `StatefulShellRoute.indexedStack`
2. Crea 3 branches: productos, perfil, ajustes
3. Implementa `ScaffoldWithNavBar` con `NavigationBar`
4. Verifica que el estado de cada tab persiste al cambiar

[Siguiente: Rutas anidadas →](/modulo-5/02-rutas-anidadas)
