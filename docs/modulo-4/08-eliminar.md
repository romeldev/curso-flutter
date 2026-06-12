---
title: 4.8 — Eliminar Producto
description: Confirmación + DELETE a la API
---

# 4.8 Eliminar Producto

## Confirmación con diálogo

```dart
// En ProductDetailPage o ProductsListPage
Future<void> _confirmDelete(BuildContext context, WidgetRef ref, Product product) async {
  final confirmed = await showDialog<bool>(
    context: context,
    builder: (ctx) => AlertDialog(
      icon: const Icon(Icons.warning_amber_rounded, size: 48, color: Colors.red),
      title: const Text('Eliminar producto'),
      content: Text('¿Estás seguro de eliminar "${product.name}"?\nEsta acción no se puede deshacer.'),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(ctx, false),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: () => Navigator.pop(ctx, true),
          style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
          child: const Text('Eliminar', style: TextStyle(color: Colors.white)),
        ),
      ],
    ),
  );

  if (confirmed == true) {
    final success = await ref.read(productListProvider.notifier).deleteProduct(product.id);
    if (success && context.mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Producto eliminado')),
      );
      context.pop();  // vuelve al listado
    }
  }
}
```

## Deslizar para eliminar (Dismissible)

```dart
Dismissible(
  key: ValueKey(product.id),
  direction: DismissDirection.endToStart,
  background: Container(
    alignment: Alignment.centerRight,
    padding: const EdgeInsets.only(right: 20),
    color: Colors.red,
    child: const Icon(Icons.delete, color: Colors.white),
  ),
  confirmDismiss: (_) => showDialog<bool>(
    context: context,
    builder: (ctx) => AlertDialog(
      title: const Text('Eliminar'),
      content: Text('¿Eliminar "${product.name}"?'),
      actions: [
        TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('No')),
        TextButton(onPressed: () => Navigator.pop(ctx, true), child: const Text('Sí')),
      ],
    ),
  ),
  onDismissed: (_) {
    ref.read(productListProvider.notifier).deleteProduct(product.id);
  },
  child: ProductCard(product: product),
)
```

## Botón de eliminar en el AppBar

```dart
// En ProductDetailPage
appBar: AppBar(
  title: Text(product.name),
  actions: [
    IconButton(
      icon: const Icon(Icons.delete_outline, color: Colors.red),
      onPressed: () => _confirmDelete(context, ref, product),
    ),
  ],
),
```

## SnackBar con "Deshacer"

```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: const Text('Producto eliminado'),
    action: SnackBarAction(
      label: 'Deshacer',
      onPressed: () {
        // Revertir la eliminación
        ref.read(productListProvider.notifier).createProduct(
          ProductForm(name: product.name, price: product.price),
        );
      },
    ),
  ),
);
```

## Mini-ejercicio

1. Implementa `_confirmDelete` con diálogo de confirmación
2. En caso de éxito, elimina el producto y muestra SnackBar
3. Opcional: agrega `Dismissible` para deslizar y eliminar
4. Opcional: agrega botón "Deshacer" en el SnackBar

[Siguiente: Paginación →](/modulo-4/09-paginacion)
