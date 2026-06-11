---
title: 2.6 — Linting Profesional
description: very_good_analysis, reglas, automatic fix
---

# 2.6 Linting Profesional

## ¿Por qué linting?

El linting es un **revisor de código automático** que te enseña buenas prácticas mientras escribes. Sin él, terminas con código inconsistente y bugs evitables.

## very_good_analysis

Es el set de reglas más estricto y usado de la comunidad Flutter, mantenido por Very Good Ventures.

```yaml
dev_dependencies:
  very_good_analysis: ^6.0.0
```

```yaml
# analysis_options.yaml
include: package:very_good_analysis/analysis_options.yaml
```

## Lo que te enseña

| Regla | Qué previene |
|-------|-------------|
| `prefer_const_constructors` | Rendimiento: widget no se reconstruye si es const |
| `avoid_print` | Usar `debugPrint` o logger en lugar de `print` |
| `require_trailing_commas` | Código más legible y diffs más limpios |
| `always_specify_types` | Claridad: no usar `var` para tipos públicos |
| `sort_constructors_first` | Consistencia en el orden de miembros |
| `use_key_in_widget_constructors` | Rendimiento: widgets necesitan key |
| `avoid_dynamic_calls` | Seguridad: no llamar métodos en dynamic |
| `no_leading_underscores_for_local_identifiers` | Convenciones de nomenclatura |

## Ejemplo: con y sin linting

```dart
// ❌ Sin very_good_analysis
class productCard extends StatelessWidget {
  productCard(this.data);
  final data;
  Widget build(context) {
    return Container(
      child: Text(data.name),
    );
  }
}

// ✅ Con very_good_analysis
class ProductCard extends StatelessWidget {
  const ProductCard({super.key, required this.product});
  final Product product;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Text(product.name),
    );
  }
}
```

## Personalizar reglas

Puedes relajar o endurecer reglas específicas:

```yaml
# analysis_options.yaml
include: package:very_good_analysis/analysis_options.yaml

linter:
  rules:
    # Relajar: permitir print en desarrollo
    avoid_print: false

    # Endurecer: exigir documentación en APIs públicas
    public_member_api_docs: true
```

## Auto-fix desde terminal

```bash
# Aplica correcciones automáticas a todos los archivos
dart fix --apply

# Ver qué problemas hay sin aplicar cambios
dart fix --dry-run
```

## Integración con VS Code

El linting se ve **directamente en el editor** sin configuración extra:

- 🔴 Subrayado rojo = error
- 🟡 Subrayado amarillo = warning
- 🟢 Línea verde en scroll = lint
- 💡 Bombillo = sugerencia de auto-fix

## Mini-ejercicio

1. Agrega `very_good_analysis` a `dev_dependencies`
2. Cambia `analysis_options.yaml` para incluir el paquete
3. Corre `dart fix --dry-run` para ver cuántos issues hay en tu proyecto
4. Corre `dart fix --apply` para auto-corregir
5. Arregla manualmente los que no tengan auto-fix

[Siguiente: Ejercicio Final →](/modulo-2/07-ejercicio-final)
