---
title: 4.9 — Paginación
description: Scroll infinito con carga de más páginas
---

# 4.9 Paginación

## Scroll infinito con ScrollController

```dart
class ProductsListPage extends ConsumerStatefulWidget {
  const ProductsListPage({super.key});
  @override
  ConsumerState<ProductsListPage> createState() => _ProductsListPageState();
}

class _ProductsListPageState extends ConsumerState<ProductsListPage> {
  final _scrollCtrl = ScrollController();

  @override
  void initState() {
    super.initState();
    _scrollCtrl.addListener(_onScroll);
  }

  @override
  void dispose() {
    _scrollCtrl.removeListener(_onScroll);
    _scrollCtrl.dispose();
    super.dispose();
  }

  void _onScroll() {
    if (_scrollCtrl.position.pixels >= _scrollCtrl.position.maxScrollExtent - 200) {
      // El usuario está cerca del final → cargar más
      ref.read(productListProvider.notifier).loadMore();
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = ref.watch(productListProvider);

    return RefreshIndicator(
      onRefresh: () => ref.read(productListProvider.notifier).refresh(),
      child: ListView.builder(
        controller: _scrollCtrl,
        itemCount: state.products.length + _footerCount(state),
        itemBuilder: (context, index) {
          if (index == state.products.length) {
            return _buildFooter(state);
          }
          return _ProductCard(product: state.products[index]);
        },
      ),
    );
  }

  int _footerCount(ProductListState state) {
    if (state.currentPage >= state.lastPage) return 0;  // ya no hay más
    return 1;  // footer de carga
  }

  Widget _buildFooter(ProductListState state) {
    return const Padding(
      padding: EdgeInsets.all(20),
      child: Center(child: CircularProgressIndicator()),
    );
  }
}
```

## loadMore en el Provider

```dart
Future<void> loadMore() async {
  if (state.currentPage >= state.lastPage) return;  // ya no hay más
  if (state.isLoading) return;  // ya está cargando

  state = state.copyWith(isLoading: true);
  try {
    final nextPage = state.currentPage + 1;
    final result = await _repository.getProducts(page: nextPage);
    state = state.copyWith(
      products: [...state.products, ...result.data],
      isLoading: false,
      currentPage: result.meta.currentPage,
      lastPage: result.meta.lastPage,
    );
  } catch (_) {
    state = state.copyWith(isLoading: false);
  }
}
```

## Botón "Cargar más" (alternativa)

Si prefieres un botón en vez de scroll infinito:

```dart
// En vez de footer con spinner, muestra un botón
Widget _buildFooter(ProductListState state) {
  return Padding(
    padding: const EdgeInsets.all(16),
    child: SizedBox(
      width: double.infinity,
      child: OutlinedButton(
        onPressed: () => ref.read(productListProvider.notifier).loadMore(),
        child: const Text('Cargar más productos'),
      ),
    ),
  );
}
```

## Manejo de errores en paginación

```dart
Future<void> loadMore() async {
  if (state.currentPage >= state.lastPage) return;
  state = state.copyWith(isLoading: true);
  try {
    // ... fetch ...
  } catch (e) {
    state = state.copyWith(
      isLoading: false,
      errorMessage: 'Error al cargar más productos',
    );
    // Mostrar SnackBar con reintento
  }
}
```

## Mini-ejercicio

1. Implementa scroll infinito con `ScrollController`
2. Agrega `loadMore()` al provider (solo si hay más páginas)
3. Muestra spinner al final de la lista mientras carga
4. Opcional: agrega botón "Cargar más" como alternativa

[Siguiente: Imágenes →](/modulo-4/10-imagenes)
