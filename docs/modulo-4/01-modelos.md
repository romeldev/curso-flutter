---
title: 4.1 — Modelos con freezed
description: Product, ProductForm, DTOs
---

# 4.1 Modelos con freezed

## Product — modelo de dominio

```dart
// lib/features/products/domain/product.dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'product.freezed.dart';
part 'product.g.dart';

@freezed
class Product with _$Product {
  const factory Product({
    required String id,
    required String name,
    required double price,
    String? description,
    @Default('https://via.placeholder.com/300') String imageUrl,
    @Default(false) bool isFavorite,
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
}
```

## ProductForm — formulario como modelo

Separar el formulario del modelo de dominio evita acoplar la UI a la API:

```dart
// lib/features/products/presentation/forms/product_form.dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'product_form.freezed.dart';

@freezed
class ProductForm with _$ProductForm {
  const factory ProductForm({
    @Default('') String name,
    @Default('') String description,
    @Default(0) double price,
    @Default('') String imageUrl,
  }) = _ProductForm;

  const ProductForm._();

  /// ¿El formulario es válido?
  bool get isValid =>
      name.isNotEmpty &&
      price > 0;

  /// Errores de validación por campo
  String? nameError => name.isEmpty ? 'El nombre es obligatorio' : null;
  String? priceError => price <= 0 ? 'El precio debe ser mayor a 0' : null;

  /// Convertir a JSON para enviar a la API
  Map<String, dynamic> toJson() => {
    'name': name,
    'description': description,
    'price': price,
    'image_url': imageUrl,
  };
}
```

## DTO para respuesta paginada

```dart
// lib/features/products/data/dtos/paginated_response.dart
import 'package:freezed_annotation/freezed_annotation.dart';
import '../../domain/product.dart';

part 'paginated_response.freezed.dart';
part 'paginated_response.g.dart';

@freezed
class PaginatedResponse with _$PaginatedResponse {
  const factory PaginatedResponse({
    required List<Product> data,
    required Meta meta,
  }) = _PaginatedResponse;

  factory PaginatedResponse.fromJson(Map<String, dynamic> json) =>
      _$PaginatedResponseFromJson(json);
}

@freezed
class Meta with _$Meta {
  const factory Meta({
    @JsonKey(name: 'current_page') required int currentPage,
    @JsonKey(name: 'last_page') required int lastPage,
    required int total,
  }) = _Meta;

  factory Meta.fromJson(Map<String, dynamic> json) => _$MetaFromJson(json);
}
```

## Mini-ejercicio

1. Crea el modelo `Product` con freezed (id, name, price, description, imageUrl)
2. Crea `ProductForm` con validación incluida
3. Crea `PaginatedResponse` y `Meta` para respuestas paginadas
4. Corre `build_runner` para generar el código

[Siguiente: ProductRepository →](/modulo-4/02-repository)
