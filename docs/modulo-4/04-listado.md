---
title: 4.4 — Pantalla de Listado
description: AsyncValue con loading/data/error/empty
---

# 4.4 Pantalla de Listado

## ProductsListPage

```dart
// lib/features/products/presentation/pages/products_list_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/products_provider.dart';

class ProductsListPage extends ConsumerWidget {
  const ProductsListPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(productListProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Productos'),
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () => context.push('/products/create'),
          ),
        ],
      ),
      body: _buildBody(context, ref, state),
    );
  }

  Widget _buildBody(BuildContext context, WidgetRef ref, ProductListState state) {
    // Loading inicial
    if (state.isLoading && state.products.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    // Error y lista vacía
    if (state.errorMessage != null && state.products.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.error_outline, size: 48, color: Colors.red),
            const SizedBox(height: 16),
            Text(state.errorMessage!, textAlign: TextAlign.center),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => ref.read(productListProvider.notifier).loadProducts(),
              child: const Text('Reintentar'),
            ),
          ],
        ),
      );
    }

    // Lista vacía (éxito pero sin datos)
    if (state.products.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.inventory_2_outlined, size: 64, color: Colors.grey),
            const SizedBox(height: 16),
            Text('No hay productos', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 8),
            ElevatedButton.icon(
              onPressed: () => context.push('/products/create'),
              icon: const Icon(Icons.add),
              label: const Text('Crear primer producto'),
            ),
          ],
        ),
      );
    }

    // Lista con datos
    return RefreshIndicator(
      onRefresh: () => ref.read(productListProvider.notifier).refresh(),
      child: ListView.builder(
        itemCount: state.products.length + (state.lastPage > state.currentPage ? 1 : 0),
        itemBuilder: (context, index) {
          // Footer de carga para paginación
          if (index == state.products.length) {
            return const Padding(
              padding: EdgeInsets.all(16),
              child: Center(child: CircularProgressIndicator()),
            );
          }

          final product = state.products[index];
          return _ProductCard(product: product);
        },
      ),
    );
  }
}

class _ProductCard extends StatelessWidget {
  final Product product;
  const _ProductCard({required this.product});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      child: ListTile(
        leading: CircleAvatar(
          backgroundImage: product.imageUrl.startsWith('http')
              ? NetworkImage(product.imageUrl)
              : null,
          child: product.imageUrl.startsWith('http')
              ? null
              : const Icon(Icons.inventory),
        ),
        title: Text(product.name),
        subtitle: Text('\$${product.price.toStringAsFixed(2)}'),
        trailing: const Icon(Icons.chevron_right),
        onTap: () => context.push('/products/${product.id}'),
      ),
    );
  }
}
```

## Los 4 estados visuales

El usuario debe ver algo diferente en cada estado:

| Estado | Qué se muestra |
|--------|---------------|
| **Loading** (carga inicial) | `CircularProgressIndicator` centrado |
| **Loading** (recarga) | `RefreshIndicator` (pull) |
| **Data vacía** (éxito, 0 items) | Icono + mensaje "No hay productos" + botón crear |
| **Data** (con items) | Lista de tarjetas |
| **Error** (sin datos previos) | Icono error + mensaje + botón reintentar |
| **Error** (con datos previos) | SnackBar (no reemplazar la lista) |
| **Cargando más** (paginación) | Footer con spinner |

## Mini-ejercicio

1. Crea `ProductsListPage` que maneje los 4 estados (loading, error, empty, data)
2. Usa `productListProvider` para obtener los datos
3. Muestra tarjetas con nombre, precio y foto
4. Agrega botón flotante para crear producto
5. Al hacer tap en un producto, navega al detalle

[Siguiente: Pull-to-refresh →](/modulo-4/05-pull-to-refresh)
