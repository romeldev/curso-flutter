---
title: 4.2 — ProductRepository
description: Capa de datos con CRUD completo
---

# 4.2 ProductRepository

## Provider del repositorio

```dart
// lib/features/products/data/products_repository.dart
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/product.dart';
import 'dtos/paginated_response.dart';

final productsRepositoryProvider = Provider<ProductsRepository>((ref) {
  return ProductsRepository(ref.watch(dioProvider));
});

class ProductsRepository {
  final Dio _dio;

  ProductsRepository(this._dio);

  /// Listar productos con paginación
  Future<PaginatedResponse> getProducts({int page = 1, int perPage = 10}) async {
    final response = await _dio.get('/products', queryParameters: {
      'page': page,
      'per_page': perPage,
    });
    return PaginatedResponse.fromJson(response.data);
  }

  /// Obtener un producto por ID
  Future<Product> getProduct(String id) async {
    final response = await _dio.get('/products/$id');
    return Product.fromJson(response.data);
  }

  /// Crear producto
  Future<Product> createProduct(Map<String, dynamic> data) async {
    final response = await _dio.post('/products', data: data);
    return Product.fromJson(response.data);
  }

  /// Actualizar producto
  Future<Product> updateProduct(String id, Map<String, dynamic> data) async {
    final response = await _dio.put('/products/$id', data: data);
    return Product.fromJson(response.data);
  }

  /// Eliminar producto
  Future<void> deleteProduct(String id) async {
    await _dio.delete('/products/$id');
  }
}
```

## Testing del repository

```dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:dio/dio.dart';

class MockDio extends Mock implements Dio {}

void main() {
  late ProductsRepository repo;
  late MockDio mockDio;

  setUp(() {
    mockDio = MockDio();
    repo = ProductsRepository(mockDio);
  });

  group('getProducts', () {
    test('retorna lista paginada', () async {
      when(() => mockDio.get('/products', queryParameters: any(named: 'queryParameters')))
          .thenAnswer((_) async => Response(
                data: {
                  'data': [
                    { 'id': '1', 'name': 'Producto 1', 'price': 10.0 },
                  ],
                  'meta': { 'current_page': 1, 'last_page': 1, 'total': 1 },
                },
                statusCode: 200,
                requestOptions: RequestOptions(path: '/products'),
              ));

      final result = await repo.getProducts();
      expect(result.data.length, 1);
      expect(result.meta.total, 1);
    });
  });

  group('createProduct', () {
    test('crea y retorna el producto', () async {
      when(() => mockDio.post('/products', data: any(named: 'data')))
          .thenAnswer((_) async => Response(
                data: { 'id': '2', 'name': 'Nuevo', 'price': 25.0 },
                statusCode: 201,
                requestOptions: RequestOptions(path: '/products'),
              ));

      final product = await repo.createProduct({ 'name': 'Nuevo', 'price': 25.0 });
      expect(product.name, 'Nuevo');
      expect(product.price, 25.0);
    });
  });

  group('deleteProduct', () {
    test('llama al endpoint DELETE', () async {
      when(() => mockDio.delete('/products/1'))
          .thenAnswer((_) async => Response(
                data: { 'message': 'Eliminado' },
                statusCode: 200,
                requestOptions: RequestOptions(path: '/products/1'),
              ));

      await repo.deleteProduct('1');
      verify(() => mockDio.delete('/products/1')).called(1);
    });
  });
}
```

## Manejo de errores centralizado

```dart
Future<Product> createProduct(Map<String, dynamic> data) async {
  try {
    final response = await _dio.post('/products', data: data);
    return Product.fromJson(response.data);
  } on DioException catch (e) {
    throw _handleError(e);
  }
}

ApiException _handleError(DioException e) {
  final code = e.response?.statusCode;
  return switch (code) {
    422 => ApiException('Error de validación', statusCode: code,
        errors: _parseErrors(e.response?.data)),
    500 => const ApiException('Error del servidor', statusCode: 500),
    _   => ApiException('Error de conexión'),
  };
}
```

## Mini-ejercicio

1. Crea `ProductsRepository` con los 5 métodos CRUD
2. Usa `PaginatedResponse` para el listado
3. Escribe tests con `Mocktail` para cada operación
4. Maneja errores HTTP con `ApiException`

[Siguiente: Providers →](/modulo-4/03-providers)
