---
title: Módulo 1 — Flutter Fundamentals
description: Widget tree, layouts, formularios, navegación básica y temas
---

# Módulo 1: Flutter Fundamentals

::: tip Meta del módulo
Construir tu primera app con varias pantallas, layouts y formularios sin depender de paquetes externos. **Estimado: 1 semana.**
:::

## ¿Qué vas a aprender?

| Tema | Qué construimos |
|------|----------------|
| Widget tree: todo es un widget | Hola mundo + estructura visual |
| StatelessWidget vs StatefulWidget | Contador + reloj en vivo |
| Layout: Row, Column, Stack, Flex | Header + body + footer |
| ListView y GridView | Lista estática de productos mock |
| Text, Image, Icon, Button, Card | Tarjeta de producto visual |
| TextEditingController + Forms | Formulario simple con validación |
| Navegación básica: Navigator.push/pop | Pantalla detalle de producto |
| Theme (Material 3) y estilos globales | Tema consistente |

## Mini-proyecto de la semana

Una app de **catálogo de productos** con datos mock, 3 pantallas:

```
Home → Lista de productos → Detalle del producto
```

## Concepto clave: Todo es un Widget

En Flutter **todo es un widget**. No hay HTML, no hay CSS, no hay divs. Hasta la app misma, el padding, el centrado, el tema — todos son widgets.

```dart
// Esto ES la app entera:
void main() {
  runApp(
    Center(
      child: Text('Hola Flutter'),
    ),
  );
}
```

Cada widget es una clase de Dart. Los combinas por composición (anidando), no por herencia.

## Herramientas

```bash
# Crear proyecto nuevo
flutter create mi_app

# Hot reload (después de editar código, presiona 'r' en la terminal)
flutter run

# DartPad también sirve para pruebas rápidas
# https://dartpad.dev
```

[Siguiente: Widget Tree →](/modulo-1/01-widget-tree)
