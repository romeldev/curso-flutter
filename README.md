# Curso Flutter: Riverpod + dio + REST APIs

**Perfil de entrada**: Desarrollador web migrando a Flutter
**Stack**: Riverpod + dio + freezed + go_router + flutter_secure_storage
**Backend**: API REST (cualquier lenguaje/servicio)
**App final**: Sistema de inventario/productos con autenticación

---

## Módulo 0 — Dart Express para devs web

*No es empezar de cero, es traducir lo que ya sabes*

| Tema | Paralelo con web |
|---|---|
| 0.1 Sintaxis express: `var`/`final`/`const`, funciones, typedef | JavaScript / TypeScript |
| 0.2 Null safety: `?`, `!`, `late`, `required` | TypeScript strict mode |
| 0.3 Clases y named constructors | Class syntax de TS |
| 0.4 Futures y async/await | Promises / async-await |
| 0.5 Streams (el concepto nuevo) | Observable / EventEmitter |
| 0.6 Sealed classes + pattern matching | Union types / discriminated unions |
| 0.7 Records y pattern matching en returns | Tuples en TypeScript |
| 0.8 Extension methods | Prototype extension |

**Mini-ejemplo**: CLI tool que parsea JSON y muestra resultados

---

## Módulo 1 — Flutter Fundamentals (1 semana)

| Tema | Qué construimos |
|---|---|
| 1.1 Widget tree: todo es un widget | Hola mundo + estructura visual |
| 1.2 StatelessWidget vs StatefulWidget | Contador + reloj en vivo |
| 1.3 Layout: Row, Column, Stack, Flex | Header + body + footer |
| 1.4 ListView y GridView (performance) | Lista estática de productos mock |
| 1.5 Text, Image, Icon, Button, Card | Tarjeta de producto visual |
| 1.6 TextEditingController + Forms + validación | Formulario simple |
| 1.7 Navegación básica: Navigator.push/pop | Pantalla detalle de producto |
| 1.8 Theme (Material 3) y estilos globales | Tema consistente |

**Mini-ejemplo**: App catálogo de productos con datos mock, 3 pantallas

---

## Módulo 2 — Arquitectura y Setup del Proyecto (2 días)

| Tema | Qué hacemos |
|---|---|
| 2.1 Feature-first structure: cómo organizar `lib/` | Creamos la estructura de carpetas |
| 2.2 Configuración de Riverpod (ProviderScope) | Envolvemos la app |
| 2.3 Configuración de dio (BaseOptions, interceptors) | Cliente HTTP listo |
| 2.4 Configuración de go_router (router declarativo) | Router base con rutas |
| 2.5 freezed: modelos inmutables con código generado | Modelos User y Product |
| 2.6 Análisis estático con very_good_analysis | Linting desde el día 1 |

**Mini-ejemplo**: Proyecto base con todo configurado y funcional

---

## Módulo 3 — Autenticación con JWT (1.5 semanas)

| Tema | Qué construimos |
|---|---|
| 3.1 API endpoints: login, register, me, logout | Vistazo rápido a la estructura REST |
| 3.2 dio interceptor para adjuntar token | AuthInterceptor |
| 3.3 flutter_secure_storage: guardar/leer/borrar token | Sesión persistente |
| 3.4 Riverpod: AuthProvider con FutureProvider | Estado de autenticación global |
| 3.5 Pantalla de login con validación | Formulario + llamada API |
| 3.6 Manejo de errores HTTP (401, 422, 500) | Snackbars + estados |
| 3.7 go_router redirect: proteger rutas | Si no hay token → login |
| 3.8 Cerrar sesión: limpiar token + redirigir | Logout funcional |

**Mini-ejemplo**: Login funcional, sesión persistente, ruteo protegido

---

## Módulo 4 — CRUD de Productos (2 semanas)

| Tema | Qué construimos |
|---|---|
| 4.1 Modelos con freezed: Product, ProductForm | DTOs tipados |
| 4.2 Repository pattern: ProductRepository | Capa de datos desacoplada |
| 4.3 Riverpod: providers para listar productos | ProductListProvider |
| 4.4 Pantalla de listado: AsyncValue (loading/data/error/empty) | Lista con estados visuales |
| 4.5 RefreshIndicator + pull-to-refresh | Recargar lista |
| 4.6 Crear producto: formulario + POST | POST /api/products |
| 4.7 Actualizar producto: precargar datos + PUT | PUT /api/products/{id} |
| 4.8 Eliminar producto: confirmación + DELETE | DELETE /api/products/{id} |
| 4.9 Paginación | Carga infinita o botones |
| 4.10 Manejo de imágenes (si aplica) | image_picker + FormData |

**Mini-ejemplo**: CRUD completo funcional

---

## Módulo 5 — Navegación Avanzada con go_router (3-4 días)

| Tema | Qué hacemos |
|---|---|
| 5.1 ShellRoute: bottom navigation con persistencia | Navegación tipo tabs |
| 5.2 Rutas anidadas y parámetros | /products/123, /products/edit/123 |
| 5.3 Deep linking (web + mobile) | Enlaces profundos |
| 5.4 Transiciones personalizadas | Animaciones entre rutas |
| 5.5 Guardas de ruta por rol (si aplica) | Admin vs user |

---

## Módulo 6 — Testing (1 semana)

| Tema | Qué probamos |
|---|---|
| 6.1 Unit tests con Riverpod (sin UI) | Providers y repositorios |
| 6.2 Mocktail: mockear dio | Pruebas sin backend real |
| 6.3 Widget tests: pantallas con Override | Cada pantalla aislada |
| 6.4 Integration tests (uno por módulo clave) | Flujo login → listar → crear |

---

## Módulo 7 — Polish y Producción (3-4 días)

| Tema | Qué hacemos |
|---|---|
| 7.1 Splash screen + icono de app | flutter_native_splash + flutter_launcher_icons |
| 7.2 Manejo global de errores | runZonedGuarded + FlutterError.onError |
| 7.3 Build modes: debug vs release | Cómo compilar para producción |
| 7.4 Firma de APK / App Bundle | Play Store deployment |
| 7.5 (Bonus) CI/CD con GitHub Actions | Build automático |

---

## Mapa de ruta visual

```
M0: Dart Express (2-3 días)
  │
  ▼
M1: Flutter Fundamentals (1 sem)
  │
  ▼
M2: Arquitectura + Setup (2 días)
  │
  ▼
M3: Autenticación (1.5 sem)  ← Login con JWT
  │
  ▼
M4: CRUD Productos (2 sem)   ← El plato fuerte
  │
  ▼
M5: Navegación Avanzada (3-4 días)
  │
  ▼
M6: Testing (1 sem)
  │
  ▼
M7: Polish + Deploy (3-4 días)
```

**Total estimado**: 8-10 semanas

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Estado + DI | Riverpod |
| HTTP | dio |
| Modelos inmutables | freezed + json_serializable |
| Navegación | go_router |
| Seguridad local | flutter_secure_storage |
| Backend API | REST API (cualquier lenguaje) |
| Codegen | build_runner |
| Linting | very_good_analysis |
| Testing | flutter_test + mocktail |
| Temas | Material 3 nativo |
