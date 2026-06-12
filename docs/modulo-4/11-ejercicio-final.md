---
title: 4.11 — Ejercicio Final
description: CRUD completo de productos
---

# Ejercicio Final: CRUD Completo

## Descripción

Implementa el CRUD completo de productos con todas las funcionalidades vistas en el módulo.

## Requisitos

### 1. Modelos y DTOs
- [ ] `Product` con freezed (id, name, price, description, imageUrl)
- [ ] `ProductForm` con validación (isValid, nameError, priceError)
- [ ] `PaginatedResponse` + `Meta` para paginación

### 2. Repository
- [ ] `ProductsRepository` con los 5 métodos CRUD
- [ ] Tests con `Mocktail` para cada método
- [ ] Manejo de errores con `ApiException`

### 3. Providers
- [ ] `ProductListState` con freezed (products, isLoading, isRefreshing, errorMessage, currentPage, lastPage)
- [ ] `ProductListNotifier` con loadProducts, refresh, loadMore, createProduct, updateProduct, deleteProduct
- [ ] `productDetailProvider.family` para detalle

### 4. Pantallas
- [ ] **Listado**: 4 estados (loading, error, empty, data) + RefreshIndicator + scroll infinito
- [ ] **Crear**: formulario con validación + POST
- [ ] **Editar**: mismo formulario con datos precargados + PUT
- [ ] **Detalle**: muestra toda la info + botón editar + botón eliminar

### 5. Navegación
- [ ] `/products` → Listado
- [ ] `/products/create` → Crear
- [ ] `/products/:id` → Detalle
- [ ] `/products/:id/edit` → Editar

## Estructura final

```
lib/features/products/
├── domain/
│   └── product.dart
├── data/
│   ├── products_repository.dart
│   └── dtos/
│       └── paginated_response.dart
└── presentation/
    ├── providers/
    │   └── products_provider.dart
    ├── forms/
    │   └── product_form.dart
    └── pages/
        ├── products_list_page.dart
        ├── product_detail_page.dart
        └── product_form_page.dart
```

## Verificación

```bash
flutter run
# ✓ Listado carga productos desde la API
# ✓ Pull-to-refresh recarga la lista
# ✓ Scroll infinito carga más páginas
# ✓ Crear producto: formulario → POST → vuelve al listado
# ✓ Editar producto: precarga → PUT → listado actualizado
# ✓ Eliminar producto: confirmación → DELETE → listado actualizado
```

::: tip ¿Listo para el Módulo 5?
En el Módulo 5 dominamos **go_router** a fondo: navegación con tabs, ShellRoute, deep linking y animaciones.
:::
