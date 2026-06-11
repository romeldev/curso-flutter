---
title: 1.6 — Forms y Validación
description: TextEditingController, GlobalKey, validación de campos
---

# 1.6 Forms y Validación

## TextEditingController — controlar un campo

```dart
class _FormularioState extends State<Formulario> {
  final _nombreController = TextEditingController();  // 1. crear

  @override
  void dispose() {
    _nombreController.dispose();  // 3. limpiar
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: _nombreController,  // 2. asignar
      decoration: InputDecoration(
        labelText: 'Nombre',
        border: OutlineInputBorder(),
        prefixIcon: Icon(Icons.person),
      ),
    );
  }
}
```

::: warning Importante
Siempre llama a `dispose()` de los controladores. Olvidarlo causa memory leaks.
:::

## TextField — personalización

```dart
TextField(
  controller: _controller,
  obscureText: true,              // para contraseñas
  keyboardType: TextInputType.emailAddress,  // tipo de teclado
  textInputAction: TextInputAction.next,     // acción del teclado
  autocorrect: false,
  enabled: true,                  // false = deshabilitado
  maxLength: 100,                 // con contador
  onChanged: (value) => print(value),  // cada cambio
  onSubmitted: (value) => print('Enter: \$value'),
  decoration: InputDecoration(
    labelText: 'Correo',
    hintText: 'ejemplo@correo.com',
    helperText: 'Nunca compartiremos tu correo',
    errorText: _mostrarError ? 'Correo inválido' : null,
    prefixIcon: Icon(Icons.email),
    suffixIcon: IconButton(
      icon: Icon(Icons.clear),
      onPressed: () => _controller.clear(),
    ),
    border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
  ),
)
```

## Form + GlobalKey — validación

```dart
class _FormularioState extends State<Formulario> {
  final _formKey = GlobalKey<FormState>();  // llave única del formulario
  final _nombreCtrl = TextEditingController();
  final _emailCtrl = TextEditingController();

  @override
  void dispose() {
    _nombreCtrl.dispose();
    _emailCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,  // ← asocia la llave al formulario
      child: Column(
        children: [
          TextFormField(
            controller: _nombreCtrl,
            decoration: InputDecoration(labelText: 'Nombre'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'El nombre es obligatorio';
              }
              if (value.length < 3) {
                return 'Mínimo 3 caracteres';
              }
              return null;  // ← sin error
            },
          ),
          TextFormField(
            controller: _emailCtrl,
            decoration: InputDecoration(labelText: 'Correo'),
            keyboardType: TextInputType.emailAddress,
            validator: (value) {
              if (value == null || !value.contains('@')) {
                return 'Correo inválido';
              }
              return null;
            },
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                // ✅ Todos los campos son válidos
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Formulario válido')),
                );
              }
            },
            child: const Text('Enviar'),
          ),
        ],
      ),
    );
  }
}
```

## Flujo de validación

```
Usuario llena campos → Presiona Enviar
                              │
                              ▼
                    _formKey.currentState!.validate()
                              │
                    ┌─────────┴──────────┐
                    ▼                    ▼
              Todos válidos        Algún error
                    │                    │
                    ▼                    ▼
            Procesar datos      Mensaje en cada campo
                                    inválido
```

## SnackBar — mensajes temporales

```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Producto guardado'),
    backgroundColor: Colors.green,
    duration: Duration(seconds: 2),
    action: SnackBarAction(
      label: 'Deshacer',
      onPressed: () => print('Deshaciendo...'),
    ),
  ),
);
```

## Mini-ejercicio

Crea un formulario de registro con:
- Nombre (obligatorio, mínimo 3 caracteres)
- Correo (obligatorio, debe tener @)
- Contraseña (obligatorio, mínimo 6 caracteres, `obscureText: true`)
- Botón "Registrarse" que valida y muestra un SnackBar

[Siguiente: Navegación básica →](/modulo-1/07-navigation)
