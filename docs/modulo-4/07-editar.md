---
title: 4.7 — Editar Producto
description: Precargar datos + PUT a la API
---

# 4.7 Editar Producto

## Reutilizar el formulario

La página de crear y editar son casi iguales. La diferencia es que al editar **precargamos los datos** y el método es `PUT` en vez de `POST`.

```dart
class ProductFormPage extends ConsumerStatefulWidget {
  final Product? product;  // null → crear, con datos → editar

  const ProductFormPage({super.key, this.product});

  bool get isEditing => product != null;

  @override
  ConsumerState<ProductFormPage> createState() => _ProductFormPageState();
}
```

## Precargar datos en initState

```dart
class _ProductFormPageState extends ConsumerState<ProductFormPage> {
  @override
  void initState() {
    super.initState();

    // Si estamos editando, precargar los datos
    if (widget.isEditing) {
      final p = widget.product!;
      _nameCtrl.text = p.name;
      _descCtrl.text = p.description ?? '';
      _priceCtrl.text = p.price.toStringAsFixed(2);
      _imageCtrl.text = p.imageUrl;
    }
  }
}
```

## Submit: crear vs editar

```dart
Future<void> _submit() async {
  if (!_formKey.currentState!.validate()) return;

  setState(() => _isSubmitting = true);

  final form = ProductForm(
    name: _nameCtrl.text.trim(),
    description: _descCtrl.text.trim(),
    price: double.tryParse(_priceCtrl.text) ?? 0,
    imageUrl: _imageCtrl.text.trim(),
  );

  final notifier = ref.read(productListProvider.notifier);
  final bool success;

  if (widget.isEditing) {
    success = await notifier.updateProduct(widget.product!.id, form);
  } else {
    success = await notifier.createProduct(form);
  }

  if (!mounted) return;
  setState(() => _isSubmitting = false);

  if (success) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(widget.isEditing ? 'Producto actualizado' : 'Producto creado'),
        backgroundColor: Colors.green,
      ),
    );
    context.pop();
  }
}
```

## Botón de editar en el detalle

```dart
// En ProductDetailPage:
appBar: AppBar(
  title: Text(product.name),
  actions: [
    IconButton(
      icon: const Icon(Icons.edit),
      onPressed: () => context.push('/products/${product.id}/edit',
        extra: product,
      ),
    ),
  ],
),
```

## Ruta en go_router

```dart
GoRoute(
  path: 'edit',  // /products/:id/edit
  name: 'product-edit',
  builder: (context, state) {
    final id = state.pathParameters['id']!;
    final product = state.extra as Product?;
    return ProductFormPage(product: product);
  },
),
```

## Mini-ejercicio

1. Modifica `ProductFormPage` para aceptar un `Product?` opcional
2. Si recibe producto, precarga los datos en los controladores
3. Cambia el título del AppBar a "Editar Producto"
4. Al enviar, usa `updateProduct` en vez de `createProduct`
5. Agrega botón de editar en la pantalla de detalle

[Siguiente: Eliminar producto →](/modulo-4/08-eliminar)
