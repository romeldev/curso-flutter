---
title: 2.5 — freezed + build_runner
description: Modelos inmutables con código generado
---

# 2.5 freezed + build_runner

## ¿Por qué freezed?

Escribir modelos a mano en Dart es tedioso y propenso a errores:

```dart
// ❌ Sin freezed: escribir a mano fromJson, toJson, ==, hashCode, copyWith
class Product {
  final String id;
  final String name;
  final double price;

  const Product({required this.id, required this.name, required this.price});

  factory Product.fromJson(Map<String, dynamic> json) => ...;
  Map<String, dynamic> toJson() => ...;
  bool operator ==(Object other) => ...;
  int get hashCode => ...;
  Product copyWith({...}) => ...;
}
```

Con freezed, **escribes solo la declaración** y el código se genera automáticamente.

## Instalación

```yaml
dev_dependencies:
  build_runner: ^2.4.0
  freezed: ^2.5.0
  json_serializable: ^6.8.0
```

## Modelo básico con freezed

```dart
// lib/features/products/domain/product.dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'product.freezed.dart';     // ← generado
part 'product.g.dart';            // ← generado

@freezed
class Product with _$Product {
  const factory Product({
    required String id,
    required String name,
    required double price,
    String? description,
    @Default('https://via.placeholder.com/300') String imageUrl,
  }) = _Product;

  factory Product.fromJson(Map<String, dynamic> json) =>
      _$ProductFromJson(json);
}
```

## Generar el código

```bash
flutter pub run build_runner build
# o en modo watch (genera automáticamente al guardar)
flutter pub run build_runner watch
```

## Lo que freezed genera por ti

```dart
// ✅ Constructor con parámetros requeridos y opcionales
const product = Product(id: '1', name: 'Zapatos', price: 89.99);

// ✅ copyWith (para actualizar sin mutar)
final updated = product.copyWith(price: 69.99);

// ✅ == y hashCode (para comparar objetos correctamente)
print(product == updated);  // false

// ✅ toString descriptivo
print(product);  // Product(id: 1, name: Zapatos, price: 89.99)

// ✅ fromJson / toJson (con json_serializable)
final json = product.toJson();
final restored = Product.fromJson(json);

// ✅ Valores por defecto
print(product.imageUrl);  // https://via.placeholder.com/300
```

## Modelo con named parameters (múltiples constructores)

```dart
@freezed
class AuthState with _$AuthState {
  const factory AuthState.initial() = _Initial;
  const factory AuthState.loading() = _Loading;
  const factory AuthState.authenticated({required User user}) = _Authenticated;
  const factory AuthState.error({required String message}) = _Error;
}
```

Esto + sealed classes + pattern matching es extremadamente poderoso (lo vimos en M0.6):

```dart
return switch (state) {
  _Initial()          => LoginForm(),
  _Loading()          => CircularProgressIndicator(),
  _Authenticated(:var user) => HomePage(user: user),
  _Error(:var message) => ErrorView(message),
};
```

## DTO y modelo de dominio separados

A veces el JSON de la API no coincide con tu modelo de dominio:

```dart
// DTO: lo que devuelve la API
@freezed
class ProductDto with _$ProductDto {
  const factory ProductDto({
    @JsonKey(name: '_id') required String id,     // ← mapeo de nombres
    required String name,
    required double price,
    String? description,
    @JsonKey(name: 'image_url') String? imageUrl,
  }) = _ProductDto;

  factory ProductDto.fromJson(Map<String, dynamic> json) =>
      _$ProductDtoFromJson(json);

  // Convertir DTO → modelo de dominio
  const ProductDto._();
  Product toDomain() => Product(
    id: id,
    name: name,
    price: price,
    description: description,
    imageUrl: imageUrl ?? 'https://via.placeholder.com/300',
  );
}
```

## Troubleshooting común

| Problema | Solución |
|----------|----------|
| `part 'product.freezed.dart'` no se encuentra | Ejecuta `build_runner` |
| Error de importación | Verifica que `freezed_annotation` está en `dependencies` |
| El código generado no refleja cambios | Corre `build_runner build --delete-conflicting-outputs` |
| "Sealed class can't be extended" | Las clases freezed son selladas por defecto |

## Mini-ejercicio

1. Agrega freezed + json_serializable + build_runner al proyecto
2. Crea un modelo `User` con: id, nombre, email, avatarUrl
3. Crea un modelo `Product` con: id, name, price, description, imageUrl
4. Genera el código con `build_runner`
5. Prueba `copyWith`, `toJson`, `fromJson` en un pequeño test

[Siguiente: Linting →](/modulo-2/06-linting)
