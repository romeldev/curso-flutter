---
title: 4.6 — Crear Producto
description: Formulario + POST a la API
---

# 4.6 Crear Producto

## ProductFormPage

```dart
// lib/features/products/presentation/pages/product_form_page.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../forms/product_form.dart';
import '../providers/products_provider.dart';

class ProductFormPage extends ConsumerStatefulWidget {
  const ProductFormPage({super.key});

  @override
  ConsumerState<ProductFormPage> createState() => _ProductFormPageState();
}

class _ProductFormPageState extends ConsumerState<ProductFormPage> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _descCtrl = TextEditingController();
  final _priceCtrl = TextEditingController();
  final _imageCtrl = TextEditingController();
  bool _isSubmitting = false;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _descCtrl.dispose();
    _priceCtrl.dispose();
    _imageCtrl.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSubmitting = true);

    final form = ProductForm(
      name: _nameCtrl.text.trim(),
      description: _descCtrl.text.trim(),
      price: double.tryParse(_priceCtrl.text) ?? 0,
      imageUrl: _imageCtrl.text.trim(),
    );

    final success = await ref.read(productListProvider.notifier).createProduct(form);

    if (!mounted) return;
    setState(() => _isSubmitting = false);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Producto creado'), backgroundColor: Colors.green),
      );
      context.pop();  // regresa al listado
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error al crear producto'), backgroundColor: Colors.red),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Nuevo Producto')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextFormField(
                controller: _nameCtrl,
                decoration: const InputDecoration(labelText: 'Nombre *'),
                validator: (v) => v == null || v.isEmpty ? 'Obligatorio' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _descCtrl,
                decoration: const InputDecoration(labelText: 'Descripción'),
                maxLines: 3,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _priceCtrl,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Precio *',
                  prefixText: '\$ ',
                ),
                validator: (v) {
                  if (v == null || v.isEmpty) return 'Obligatorio';
                  final price = double.tryParse(v);
                  if (price == null || price <= 0) return 'Debe ser un número mayor a 0';
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _imageCtrl,
                decoration: const InputDecoration(labelText: 'URL de imagen'),
                keyboardType: TextInputType.url,
              ),
              const SizedBox(height: 32),
              SizedBox(
                height: 48,
                child: ElevatedButton(
                  onPressed: _isSubmitting ? null : _submit,
                  child: _isSubmitting
                      ? const SizedBox(
                          height: 20, width: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Guardar Producto', style: TextStyle(fontSize: 16)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

## Registrar la ruta en go_router

```dart
GoRoute(
  path: '/products/create',
  name: 'product-create',
  builder: (context, state) => const ProductFormPage(),
),
```

## Validación antes de enviar

Dos capas de validación:

1. **Formulario (cliente)**: campos obligatorios, formato, valores
2. **API (servidor)**: el backend también valida y devuelve 422

```dart
// En el ProductFormPage, después de recibir un 422:
ref.listen(productListProvider, (_, state) {
  if (state.errorMessage != null) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(state.errorMessage!), backgroundColor: Colors.red),
    );
    ref.read(productListProvider.notifier).clearError();
  }
});
```

## Mini-ejercicio

1. Crea `ProductFormPage` con campos: name, description, price, imageUrl
2. Valida que name no esté vacío y price sea > 0
3. Al enviar, llama `createProduct` del notifier
4. En éxito: SnackBar verde + pop al listado
5. En error: SnackBar rojo con mensaje

[Siguiente: Editar producto →](/modulo-4/07-editar)
