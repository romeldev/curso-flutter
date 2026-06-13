---
title: 7.1 — Splash Screen
description: Pantalla de inicio personalizada con flutter_native_splash
---

# 7.1 Splash Screen

## flutter_native_splash

```yaml
dependencies:
  flutter_native_splash: ^2.4.0
```

Configuración en `pubspec.yaml`:

```yaml
flutter_native_splash:
  color: "#ffffff"
  image: assets/splash_logo.png
  android: true
  ios: true

  # Opciones
  android_gravity: center
  ios_content_mode: center
  fullscreen: true

  # Modo oscuro
  color_dark: "#0f0f0f"
  image_dark: assets/splash_logo_dark.png
```

Generar splash:

```bash
flutter pub run flutter_native_splash:create
```

## Splash con lottie (animación)

```dart
// Si prefieres animación en vez de imagen estática:
class SplashScreen extends StatefulWidget {
  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateAfterDelay();
  }

  Future<void> _navigateAfterDelay() async {
    // Aquí puedes cargar configuración, verificar sesión, etc.
    await Future.delayed(const Duration(seconds: 2));

    if (!mounted) return;
    context.go('/');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FlutterLogo(size: 120),
            const SizedBox(height: 24),
            const CircularProgressIndicator(),
          ],
        ),
      ),
    );
  }
}
```

## Ruta del splash en go_router

```dart
GoRoute(
  path: '/splash',
  name: 'splash',
  builder: (context, state) => const SplashScreen(),
),

// En initialLocation:
initialLocation: '/splash',
```

## Mini-ejercicio

1. Agrega `flutter_native_splash` al proyecto
2. Configura color e imagen de splash
3. Genera el splash con `flutter pub run flutter_native_splash:create`
4. Opcional: crea un SplashScreen animado con ruta en go_router

[Siguiente: Icono de App →](/modulo-7/02-icono)
