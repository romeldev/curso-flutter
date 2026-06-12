---
title: Módulo 4 — CRUD de Productos
description: Listado, creación, edición y eliminación de productos con Riverpod + dio
---

# Módulo 4: CRUD de Productos

::: tip Meta del módulo
Construir un CRUD completo de productos contra una API REST: listar, crear, editar y eliminar, con estados visuales (loading, error, empty, data) y manejo de formularios. **Estimado: 2 semanas.**
:::

## API endpoints (asumidos)

```http
GET    /api/products?page=1&per_page=10   → { data: [...], meta: { current_page, last_page, total } }
GET    /api/products/:id                  → { id, name, description, price, image_url, created_at }
POST   /api/products                      → { id, name, description, price, image_url }
PUT    /api/products/:id                  → { id, name, description, price, image_url }
DELETE /api/products/:id                  → { message: "Producto eliminado" }
```

## Lo que construiremos

| Lección | Qué hacemos |
|---------|------------|
| 4.1 Modelos | Product + ProductForm con freezed |
| 4.2 Repository | ProductRepository con CRUD completo |
| 4.3 Providers | ProductListProvider, ProductDetailProvider |
| 4.4 Listado | AsyncValue con loading/data/error/empty |
| 4.5 Pull-to-refresh | RefreshIndicator + recarga |
| 4.6 Crear producto | Formulario + POST |
| 4.7 Editar producto | Precargar datos + PUT |
| 4.8 Eliminar producto | Confirmación + DELETE |
| 4.9 Paginación | Scroll infinito |
| 4.10 Imágenes | image_picker + FormData |
| 4.11 Ejercicio final | CRUD completo funcional |

[Siguiente: Modelos →](/modulo-4/01-modelos)
