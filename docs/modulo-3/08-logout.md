---
title: 3.8 — Cerrar Sesión
description: Logout, limpiar token, redirigir
---

# 3.8 Cerrar Sesión

## Botón de logout en el AppBar

```dart
// lib/features/auth/presentation/pages/home_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/auth_provider.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Inicio'),
        actions: [
          // Menú de usuario
          PopupMenuButton<String>(
            onSelected: (value) {
              if (value == 'logout') {
                _confirmLogout(context, ref);
              }
            },
            itemBuilder: (_) => [
              PopupMenuItem(
                value: 'profile',
                child: ListTile(
                  leading: CircleAvatar(child: Text(authState.user!.name[0])),
                  title: Text(authState.user!.name),
                  subtitle: Text(authState.user!.email),
                ),
              ),
              const PopupMenuDivider(),
              const PopupMenuItem(
                value: 'logout',
                child: ListTile(
                  leading: Icon(Icons.logout, color: Colors.red),
                  title: Text('Cerrar sesión', style: TextStyle(color: Colors.red)),
                ),
              ),
            ],
          ),
        ],
      ),
      body: /* contenido */,
    );
  }

  void _confirmLogout(BuildContext context, WidgetRef ref) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('Cerrar sesión'),
        content: const Text('¿Estás seguro de que deseas cerrar sesión?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);  // cerrar diálogo
              ref.read(authProvider.notifier).logout();
            },
            child: const Text('Cerrar sesión', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
  }
}
```

## Logout desde cualquier pantalla

Como el `authProvider` es global, puedes cerrar sesión desde cualquier widget:

```dart
// En cualquier ConsumerWidget:
ref.read(authProvider.notifier).logout();
```

El redirect de go_router lo lleva automáticamente a `/login`.

## Drawer con info de usuario y logout

```dart
Drawer(
  child: ListView(
    children: [
      // Header con datos del usuario
      UserAccountsDrawerHeader(
        accountName: Text(authState.user!.name),
        accountEmail: Text(authState.user!.email),
        currentAccountPicture: CircleAvatar(
          child: Text(authState.user!.name[0].toUpperCase()),
        ),
      ),
      ListTile(
        leading: const Icon(Icons.person),
        title: const Text('Mi perfil'),
        onTap: () => context.go('/profile'),
      ),
      ListTile(
        leading: const Icon(Icons.settings),
        title: const Text('Configuración'),
        onTap: () => context.go('/settings'),
      ),
      const Divider(),
      ListTile(
        leading: const Icon(Icons.logout, color: Colors.red),
        title: const Text('Cerrar sesión', style: TextStyle(color: Colors.red)),
        onTap: () {
          ref.read(authProvider.notifier).logout();
        },
      ),
    ],
  ),
)
```

## Tip: Borrar caché al hacer logout

Si tu app guarda datos offline (productos, etc.), también debes limpiarlos:

```dart
Future<void> logout() async {
  try {
    await _repository.logout();
  } catch (_) {
    // Si la API falla, igual limpiamos local
  }

  // Limpiar storage seguro
  await _storage.clearAll();

  // Limpiar otros providers de datos locales
  ref.invalidate(productsProvider);      // reinicia lista de productos
  ref.invalidate(cartProvider);          // reinicia carrito

  state = const AuthState.initial();
}
```

## Mini-ejercicio

1. Agrega un botón de logout en el AppBar con `PopupMenuButton`
2. Implementa `_confirmLogout` con diálogo de confirmación
3. Verifica que después de logout:
   - Se limpia el token
   - El redirect lleva a /login
   - No se puede navegar a rutas protegidas sin sesión

[Siguiente: Ejercicio Final →](/modulo-3/09-ejercicio-final)
