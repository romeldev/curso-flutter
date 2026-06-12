---
title: 4.3 — Providers con Riverpod
description: FutureProvider, StateNotifier, invalidación
---

# 4.3 Providers con Riverpod

## ProductListProvider (FutureProvider)

```dart
// lib/features/products/presentation/providers/products_provider.dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/products_repository.dart';
import '../../domain/product.dart';

// Provider simple: solo lectura (lista paginada)
final productsProvider = FutureProvider<List<Product>>((ref) async {
  final repo = ref.watch(productsRepositoryProvider);
  final result = await repo.getProducts();
  return result.data;
});
```

## ProductDetailProvider

```dart
// Provider que recibe un ID
final productDetailProvider = FutureProvider.family<Product, String>((ref, id) async {
  final repo = ref.watch(productsRepositoryProvider);
  return repo.getProduct(id);
});
// Uso: ref.watch(productDetailProvider('123'))
```

## ProductNotifier (StateNotifier con CRUD)

Cuando necesitas manejar creación, edición y eliminación, un `StateNotifier` da más control:

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/products_repository.dart';
import '../../domain/product.dart';
import '../forms/product_form.dart';

// Estado del listado de productos
@freezed
class ProductListState with _$ProductListState {
  const factory ProductListState({
    @Default([]) List<Product> products,
    @Default(false) bool isLoading,
    @Default(false) bool isRefreshing,
    String? errorMessage,
    @Default(1) int currentPage,
    @Default(1) int lastPage,
  }) = _ProductListState;
}

final productListProvider =
    StateNotifierProvider<ProductListNotifier, ProductListState>((ref) {
  return ProductListNotifier(ref.watch(productsRepositoryProvider));
});

class ProductListNotifier extends StateNotifier<ProductListState> {
  final ProductsRepository _repository;

  ProductListNotifier(this._repository)
      : super(const ProductListState()) {
    loadProducts();
  }

  /// Cargar primera página
  Future<void> loadProducts() async {
    state = state.copyWith(isLoading: true, errorMessage: null);
    try {
      final result = await _repository.getProducts();
      state = state.copyWith(
        products: result.data,
        isLoading: false,
        currentPage: result.meta.currentPage,
        lastPage: result.meta.lastPage,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        errorMessage: e.toString(),
      );
    }
  }

  /// Recargar (pull-to-refresh)
  Future<void> refresh() async {
    state = state.copyWith(isRefreshing: true);
    try {
      final result = await _repository.getProducts();
      state = state.copyWith(
        products: result.data,
        isRefreshing: false,
        currentPage: 1,
        lastPage: result.meta.lastPage,
      );
    } catch (_) {
      state = state.copyWith(isRefreshing: false);
    }
  }

  /// Cargar más (paginación)
  Future<void> loadMore() async {
    if (state.currentPage >= state.lastPage) return;
    state = state.copyWith(isLoading: true);
    try {
      final result = await _repository.getProducts(
        page: state.currentPage + 1,
      );
      state = state.copyWith(
        products: [...state.products, ...result.data],
        isLoading: false,
        currentPage: result.meta.currentPage,
      );
    } catch (_) {
      state = state.copyWith(isLoading: false);
    }
  }

  /// Crear producto
  Future<bool> createProduct(ProductForm form) async {
    try {
      await _repository.createProduct(form.toJson());
      await refresh();
      return true;
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
      return false;
    }
  }

  /// Actualizar producto
  Future<bool> updateProduct(String id, ProductForm form) async {
    try {
      await _repository.updateProduct(id, form.toJson());
      await refresh();
      return true;
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
      return false;
    }
  }

  /// Eliminar producto
  Future<bool> deleteProduct(String id) async {
    try {
      await _repository.deleteProduct(id);
      await refresh();
      return true;
    } catch (e) {
      state = state.copyWith(errorMessage: e.toString());
      return false;
    }
  }

  void clearError() {
    state = state.copyWith(errorMessage: null);
  }
}
```

## Invalidación entre pantallas

Cuando creas/editas/eliminas y vuelves al listado, necesitas **refrescar los datos**. Con el Notifier esto se maneja internamente con `refresh()`.

```dart
// Después de crear un producto:
final created = await ref.read(productListProvider.notifier).createProduct(form);
if (created) {
  context.pop();  // vuelve al listado, que ya está refrescado
}
```

## Mini-ejercicio

1. Crea `ProductListProvider` con `StateNotifier` (estado con lista, loading, error, paginación)
2. Implementa métodos: loadProducts, refresh, loadMore, createProduct, updateProduct, deleteProduct
3. Crea `productDetailProvider.family` para ver detalle de un producto

[Siguiente: Listado →](/modulo-4/04-listado)
