---
title: 5.5 — Guardas por Rol
description: Proteger rutas según el rol del usuario
---

# 5.5 Guardas por Rol

## Redirect condicional por rol

```dart
final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);
  final user = authState.isAuthenticated ? authState.user : null;
  final role = user?.role;  // 'admin', 'editor', 'viewer'

  return GoRouter(
    redirect: (context, state) {
      final location = state.matchedLocation;

      // 1. Sin sesión → login
      if (!authState.isAuthenticated) {
        return location == '/login' ? null : '/login';
      }

      // 2. Rutas solo para admin
      final adminRoutes = ['/admin', '/users', '/settings'];
      final isAdminRoute = adminRoutes.any((r) => location.startsWith(r));
      if (isAdminRoute && role != 'admin') {
        return '/403';  // página de acceso denegado
      }

      // 3. Rutas solo para editor o admin
      if (location.startsWith('/products/create') && role == 'viewer') {
        return '/403';
      }

      return null;
    },
    routes: [ /* ... */ ],
  );
});
```

## Página 403 — acceso denegado

```dart
GoRoute(
  path: '/403',
  name: 'forbidden',
  builder: (context, state) => const ForbiddenPage(),
);

class ForbiddenPage extends StatelessWidget {
  const ForbiddenPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Acceso denegado')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.lock, size: 64, color: Colors.red),
            const SizedBox(height: 16),
            Text('No tienes permiso para ver esta página',
                style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () => context.go('/'),
              child: const Text('Volver al inicio'),
            ),
          ],
        ),
      ),
    );
  }
}
```

## Modelo User con rol

```dart
@freezed
class User with _$User {
  const factory User({
    required String id,
    required String name,
    required String email,
    @Default(UserRole.viewer) UserRole role,
    String? avatarUrl,
  }) = _User;

  factory User.fromJson(Map<String, dynamic> json) => _$UserFromJson(json);
}

enum UserRole { admin, editor, viewer }
```

## Ocultar/mostrar UI según rol

```dart
// En el ScaffoldWithNavBar o en cualquier widget:
final user = ref.watch(authProvider).user;

if (user?.role == UserRole.admin) {
  // Mostrar opciones de admin
  NavigationDestination(icon: Icon(Icons.admin_panel_settings), label: 'Admin'),
}

// Botón de crear producto solo para editor+
if (user!.role != UserRole.viewer) {
  FloatingActionButton(onPressed: () => context.go('/products/create')),
}
```

## Permisos por feature

```dart
// lib/core/permissions.dart
enum Permission {
  createProduct,
  editProduct,
  deleteProduct,
  manageUsers,
  viewReports,
}

class UserPermissions {
  static bool hasPermission(UserRole role, Permission permission) {
    return switch (role) {
      UserRole.admin => true,  // admin todo
      UserRole.editor => switch (permission) {
        Permission.createProduct => true,
        Permission.editProduct => true,
        Permission.deleteProduct => false,
        Permission.manageUsers => false,
        Permission.viewReports => true,
      },
      UserRole.viewer => false,  // viewer solo lectura
    };
  }
}

// Uso:
if (UserPermissions.hasPermission(user.role, Permission.createProduct)) {
  // mostrar botón crear
}
```

## Redirect con permisos

```dart
redirect: (context, state) {
  final location = state.matchedLocation;
  final user = authState.user;

  // Mapa: ruta → permiso requerido
  final routePermissions = {
    '/products/create': Permission.createProduct,
    '/products/:id/edit': Permission.editProduct,
    '/products/:id/delete': Permission.deleteProduct,
    '/admin': Permission.manageUsers,
  };

  for (final entry in routePermissions.entries) {
    if (location.startsWith(entry.key)) {
      if (!UserPermissions.hasPermission(user!.role, entry.value)) {
        return '/403';
      }
    }
  }

  return null;
}
```

## Mini-ejercicio

1. Agrega `role` al modelo `User` (admin, editor, viewer)
2. Implementa redirect en go_router que restrinja:
   - `/admin/*` solo para admin
   - `/products/create` solo para admin/editor
3. Crea `ForbiddenPage` para acceso denegado
4. Oculta el botón "Crear producto" si el rol es viewer

[Siguiente: Ejercicio Final →](/modulo-5/06-ejercicio-final)
