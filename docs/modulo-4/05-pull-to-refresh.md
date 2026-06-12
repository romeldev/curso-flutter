---
title: 4.5 — Pull-to-Refresh
description: RefreshIndicator + recarga de datos
---

# 4.5 Pull-to-Refresh

## RefreshIndicator básico

```dart
RefreshIndicator(
  onRefresh: () => ref.read(productListProvider.notifier).refresh(),
  child: ListView.builder(
    itemCount: products.length,
    itemBuilder: (_, i) => ProductCard(product: products[i]),
  ),
)
```

## Con estado isRefreshing

```dart
// En el Provider:
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
```

## RefreshIndicator con scroll a tope

Si la lista no empieza en el tope (por scroll), `RefreshIndicator` no se activa. Asegúrate de que `ListView.builder` no tenga un padding superior que impida el scroll negativo.

```dart
// ✅ Correcto: el padding va dentro del ListView
RefreshIndicator(
  onRefresh: () => /* ... */,
  child: ListView.builder(
    padding: EdgeInsets.all(12),  // ← padding dentro del scroll
    itemCount: products.length,
    itemBuilder: (_, i) => ProductCard(product: products[i]),
  ),
)

// ❌ Incorrecto: el padding fuera del scroll impide el refresh
RefreshIndicator(
  onRefresh: () => /* ... */,
  child: Padding(
    padding: EdgeInsets.all(12),  // ← padding fuera, REFRESH NO FUNCIONA
    child: ListView.builder(...),
  ),
)
```

## Indicador de recarga en el AppBar

```dart
// Puedes mostrar la animación de recarga en el AppBar también
appBar: AppBar(
  title: const Text('Productos'),
  actions: [
    if (state.isRefreshing)
      const Padding(
        padding: EdgeInsets.all(12),
        child: SizedBox(
          width: 20, height: 20,
          child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
        ),
      ),
  ],
),
```

## Mini-ejercicio

1. Agrega `RefreshIndicator` al listado de productos
2. El método `refresh()` debe reiniciar la paginación (volver a page 1)
3. Muestra indicador en el AppBar durante la recarga
4. Verifica que el refresh funciona incluso si hay error previo

[Siguiente: Crear producto →](/modulo-4/06-crear)
