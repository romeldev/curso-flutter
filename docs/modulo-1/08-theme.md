---
title: 1.8 — Theme y Material 3
description: Tema global, colores, tipografía, estilos consistentes
---

# 1.8 Theme y Material 3

## ¿Por qué un tema global?

Sin tema, terminas repitiendo estilos en cada widget:

```dart
// ❌ Sin tema: repetir en cada pantalla
Text('Hola', style: TextStyle(fontSize: 20, color: Colors.blue)),
Text('Adiós', style: TextStyle(fontSize: 20, color: Colors.blue)),

// ✅ Con tema: el estilo vive en un solo lugar
Text('Hola', style: Theme.of(context).textTheme.headlineMedium),
```

## MaterialApp con tema

```dart
MaterialApp(
  title: 'Mi App',
  theme: ThemeData(
    // Material 3 (nuevo diseño de Google)
    useMaterial3: true,

    // Colores
    colorSchemeSeed: Colors.blue,  // genera paleta automática

    // Tipografía
    textTheme: TextTheme(
      headlineLarge: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
      headlineMedium: TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
      bodyLarge: TextStyle(fontSize: 16),
      bodyMedium: TextStyle(fontSize: 14, color: Colors.grey[600]),
    ),

    // AppBar
    appBarTheme: AppBarTheme(
      centerTitle: true,
      elevation: 0,
    ),

    // Botones
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
    ),

    // Tarjetas
    cardTheme: CardTheme(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
    ),

    // Input
    inputDecorationTheme: InputDecorationTheme(
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(8),
      ),
      contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    ),
  ),
  home: const HomeScreen(),
);
```

## Usar el tema en widgets

```dart
@override
Widget build(BuildContext context) {
  final theme = Theme.of(context);

  return Scaffold(
    appBar: AppBar(
      title: Text('Productos'),
      backgroundColor: theme.colorScheme.primaryContainer,
    ),
    body: Padding(
      padding: theme.cardTheme.margin ?? EdgeInsets.all(8),
      child: Text(
        'Bienvenido',
        style: theme.textTheme.headlineMedium,
      ),
    ),
    floatingActionButton: FloatingActionButton(
      onPressed: () {},
      backgroundColor: theme.colorScheme.primary,
      child: Icon(Icons.add, color: theme.colorScheme.onPrimary),
    ),
  );
}
```

## ColorScheme — paleta semántica

Con `useMaterial3: true` y `colorSchemeSeed`, Material genera una paleta completa:

```dart
theme.colorScheme.primary         // Color principal
theme.colorScheme.onPrimary       // Texto sobre primary
theme.colorScheme.primaryContainer // Variante suave de primary
theme.colorScheme.secondary       // Color secundario
theme.colorScheme.surface         // Fondo de tarjetas
theme.colorScheme.error           // Para errores
theme.colorScheme.brightness      // Brightness.light o .dark
```

## Modo oscuro

```dart
MaterialApp(
  theme: ThemeData(  // modo claro
    useMaterial3: true,
    colorSchemeSeed: Colors.blue,
    brightness: Brightness.light,
  ),
  darkTheme: ThemeData(  // modo oscuro
    useMaterial3: true,
    colorSchemeSeed: Colors.blue,
    brightness: Brightness.dark,
  ),
  themeMode: ThemeMode.system,  // sigue la configuración del sistema
)
```

## MediaQuery — información del dispositivo

```dart
@override
Widget build(BuildContext context) {
  final size = MediaQuery.of(context).size;
  final isWide = size.width > 600;

  return Scaffold(
    body: isWide
        ? Row(children: [/* layout tablet */])
        : Column(children: [/* layout móvil */]),
  );
}
```

## Buenas prácticas

1. **Define el tema en un solo lugar** — en `MaterialApp`
2. **Usa `Theme.of(context)`** — no crees `TextStyle` duplicados
3. **Crea un archivo separado** `lib/core/theme.dart` si el tema es grande
4. **Aprovecha Material 3** — `useMaterial3: true` + `colorSchemeSeed` te da 90% del trabajo hecho

## Mini-ejercicio

Configura un tema que:
- Use Material 3 con color semilla verde (`Colors.green`)
- Defina `headlineLarge` para títulos y `bodyLarge` para contenido
- Personalice `ElevatedButton` con bordes redondeados
- Agregue modo oscuro con `ThemeMode.system`
- Prueba cambiando `colorSchemeSeed` a `Colors.deepPurple` y observa cómo cambia toda la app

[Siguiente: Ejercicio Final →](/modulo-1/09-ejercicio-final)
