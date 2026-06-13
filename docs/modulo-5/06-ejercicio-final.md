---
title: 5.6 — Ejercicio Final
description: Navegación completa con ShellRoute, transiciones y guardas
---

# Ejercicio Final: Navegación Profesional

## Descripción

Reestructura la navegación de tu app usando todas las técnicas del módulo.

## Requisitos

### 1. ShellRoute con 3 tabs
- **Productos**: listado + detalle + crear/editar
- **Perfil**: datos del usuario + logout
- **Ajustes**: configuración de la app

Cada tab debe **persistir su estado** al cambiar de tab.

### 2. Transiciones personalizadas
- Listado → Detalle: slide horizontal
- Crear/Editar: slide desde abajo (como modal)
- Perfil: fade transition

### 3. Deep linking
- `/products/123` abre la app en el detalle del producto
- `errorBuilder` para rutas no encontradas

### 4. Guardas por rol
- Admin: acceso completo
- Editor: no puede eliminar productos
- Viewer: solo lectura (no puede crear ni editar)
- Página 403 para acceso denegado

### 5. Navegación programática
- `shell.goBranch(1)` desde cualquier lugar
- `context.go('/products/123')` desde notificaciones
- `context.pop()` con resultado

## Verificación

```dart
// Prueba 1: Navegar entre tabs sin perder estado
// 1. Ve a productos, haz scroll hacia abajo
// 2. Cambia a perfil
// 3. Vuelve a productos → el scroll debe estar donde lo dejaste

// Prueba 2: Deep linking
// Abre en el navegador: http://localhost:5173/curso-flutter/products/123
// Debe abrir el detalle del producto

// Prueba 3: Guardas
// Loguea como viewer → no debe ver botón "Crear"
// Loguea como admin → debe ver todo
```

## Criterios

- [ ] ShellRoute con 3 branches funcionales
- [ ] Persistencia de estado entre tabs
- [ ] Transición personalizada en detalle de producto
- [ ] Deep linking funciona en web
- [ ] errorBuilder muestra página 404 amigable
- [ ] Guardas por rol funcionan (admin/editor/viewer)
- [ ] Página 403 para acceso denegado

::: tip ¿Listo para el Módulo 6?
En el Módulo 6 aprendemos **testing**: unit tests con Riverpod, widget tests con Mocktail, e integration tests para flujos completos.
:::
