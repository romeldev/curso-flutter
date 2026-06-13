---
title: 5.3 — Deep Linking
description: Enlaces profundos desde web, notificaciones y enlaces externos
---

# 5.3 Deep Linking

## ¿Qué es deep linking?

Es la capacidad de **abrir la app en una pantalla específica** desde un enlace externo:

```text
https://miapp.com/products/123
   → abre la app directamente en el detalle del producto 123

https://miapp.com/profile
   → abre la app en el perfil del usuario
```

## Configuración básica

go_router soporta deep linking **sin configuración adicional** si usas `MaterialApp.router`:

```dart
MaterialApp.router(
  routerConfig: ref.watch(routerProvider),
  // El deep linking funciona automáticamente
)
```

## Configuración Android

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data
    android:scheme="https"
    android:host="miapp.com" />
</intent-filter>
```

## Configuración iOS

```xml
<!-- ios/Runner/Info.plist -->
<key>FlutterDeepLinkingEnabled</key>
<true/>
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>miapp</string>
    </array>
  </dict>
</array>
```

## Web — enrutamiento con URL

En Flutter web, go_router usa la URL del navegador directamente:

```text
https://romeldev.github.io/curso-flutter/#/products/123
```

Solo necesitas configurar el `base` correctamente en `config.ts` (ya lo hicimos en Módulo 2).

## Deep linking desde notificaciones push

```dart
// Al recibir una notificación:
void handleNotificationTap(Map<String, dynamic> data) {
  final productId = data['product_id'] as String?;
  if (productId != null) {
    context.go('/products/$productId');
  }
}
```

## Probar deep linking en desarrollo

```bash
# Android
adb shell am start -a android.intent.action.VIEW   -d "https://miapp.com/products/123"

# iOS
xcrun simctl openurl booted "https://miapp.com/products/123"

# Web
# Solo abre la URL en el navegador
```

## Manejo de enlaces no reconocidos

```dart
final routerProvider = Provider<GoRouter>((ref) {
  return GoRouter(
    routes: [ /* ... */ ],
    errorBuilder: (context, state) {
      return Scaffold(
        appBar: AppBar(title: const Text('Error')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.link_off, size: 64, color: Colors.grey),
              const SizedBox(height: 16),
              Text('Ruta no encontrada: ${state.uri}'),
              const SizedBox(height: 16),
              ElevatedButton(
                onPressed: () => context.go('/'),
                child: const Text('Ir al inicio'),
              ),
            ],
          ),
        ),
      );
    },
  );
});
```

## Mini-ejercicio

1. Prueba deep linking abriendo `http://localhost:5173/curso-flutter/products/123` en el navegador
2. Configura `errorBuilder` para rutas no encontradas
3. Crea un enlace en la web que apunte a un producto específico

[Siguiente: Transiciones →](/modulo-5/04-transiciones)
