---
title: 7.2 — Icono de App
description: flutter_launcher_icons, generación multiplataforma
---

# 7.2 Icono de App

## flutter_launcher_icons

```yaml
dev_dependencies:
  flutter_launcher_icons: ^0.14.0
```

```yaml
flutter_launcher_icons:
  android: true
  ios: true
  image_path: assets/icon/app_icon.png
  adaptive_icon_background: "#02569B"
  adaptive_icon_foreground: assets/icon/app_icon_foreground.png
```

Generar iconos:

```bash
flutter pub run flutter_launcher_icons
```

## Requisitos de la imagen

| Plataforma | Tamaño | Formato |
|-----------|--------|---------|
| Android adaptive (foreground) | 1080x1080 | PNG |
| Android adaptive (background) | color hex | - |
| iOS | 1024x1024 | PNG |

## Crear el icono con diseño propio

Puedes diseñar un icono simple con código Flutter y exportarlo:

```dart
// Herramienta simple para generar icono
import 'dart:ui' as ui;
import 'package:flutter/material.dart';

class AppIconPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..color = const Color(0xFF02569B);
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(0, 0, size.width, size.height),
        Radius.circular(size.width * 0.2),
      ),
      paint,
    );
    // Dibujar "F" de Flutter estilizada
    // ...
  }
}
```

## Mini-ejercicio

1. Prepara un icono PNG de 1024x1024 para la app
2. Configura `flutter_launcher_icons` en pubspec.yaml
3. Genera los iconos para Android e iOS
4. Verifica que el icono aparece en el launcher

[Siguiente: Manejo Global de Errores →](/modulo-7/03-error-handling)
