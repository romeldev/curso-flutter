---
title: 4.10 — Imágenes
description: image_picker + FormData + upload
---

# 4.10 Imágenes

## image_picker — seleccionar imagen

```yaml
dependencies:
  image_picker: ^1.1.0
```

```dart
import 'package:image_picker/image_picker.dart';

class _ProductFormPageState extends ConsumerState<ProductFormPage> {
  File? _selectedImage;

  Future<void> _pickImage(ImageSource source) async {
    final picker = ImagePicker();
    final image = await picker.pickImage(
      source: source,
      maxWidth: 1024,
      maxHeight: 1024,
      imageQuality: 80,
    );

    if (image != null) {
      setState(() {
        _selectedImage = File(image.path);
      });
    }
  }

  void _showImagePickerOptions() {
    showModalBottomSheet(
      context: context,
      builder: (_) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.camera_alt),
              title: const Text('Tomar foto'),
              onTap: () {
                Navigator.pop(context);
                _pickImage(ImageSource.camera);
              },
            ),
            ListTile(
              leading: const Icon(Icons.photo_library),
              title: const Text('Galería'),
              onTap: () {
                Navigator.pop(context);
                _pickImage(ImageSource.gallery);
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

## Vista previa de la imagen

```dart
// En el formulario, donde iría el campo imageUrl:
if (_selectedImage != null) {
  Stack(
    children: [
      ClipRRect(
        borderRadius: BorderRadius.circular(8),
        child: Image.file(
          _selectedImage!,
          height: 200,
          width: double.infinity,
          fit: BoxFit.cover,
        ),
      ),
      Positioned(
        top: 8, right: 8,
        child: CircleAvatar(
          backgroundColor: Colors.black54,
          child: IconButton(
            icon: const Icon(Icons.close, color: Colors.white, size: 18),
            onPressed: () => setState(() => _selectedImage = null),
          ),
        ),
      ),
    ],
  ),
} else if (widget.product?.imageUrl != null) {
  Image.network(widget.product!.imageUrl, height: 200, width: double.infinity, fit: BoxFit.cover);
} else {
  ElevatedButton.icon(
    onPressed: _showImagePickerOptions,
    icon: const Icon(Icons.add_photo_alternate),
    label: const Text('Agregar imagen'),
  );
}
```

## Subir imagen con FormData

Si el backend acepta multipart:

```dart
Future<Product> createProductWithImage({
  required ProductForm form,
  File? imageFile,
}) async {
  final data = FormData.fromMap({
    'name': form.name,
    'description': form.description,
    'price': form.price,
    if (imageFile != null)
      'image': await MultipartFile.fromFile(
        imageFile.path,
        filename: imageFile.path.split('/').last,
      ),
  });

  final response = await _dio.post('/products', data: data);
  return Product.fromJson(response.data);
}
```

## Preview de imagen desde URL

```dart
Image.network(
  product.imageUrl,
  height: 200,
  width: double.infinity,
  fit: BoxFit.cover,
  loadingBuilder: (_, child, progress) {
    if (progress == null) return child;
    return const Center(child: CircularProgressIndicator());
  },
  errorBuilder: (_, __, ___) => Container(
    height: 200,
    color: Colors.grey[200],
    child: const Center(child: Icon(Icons.broken_image, size: 48)),
  ),
)
```

## Mini-ejercicio

1. Agrega `image_picker` al proyecto
2. Agrega botón para seleccionar imagen (cámara o galería)
3. Muestra vista previa de la imagen seleccionada
4. Si el backend acepta multipart, usa `FormData` para subir
5. Si solo acepta URL, usa el campo `imageUrl` como texto

[Siguiente: Ejercicio Final →](/modulo-4/11-ejercicio-final)
