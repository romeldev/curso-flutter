---
title: 7.6 — CI/CD
description: GitHub Actions, builds automáticos, tests en CI
---

# 7.6 CI/CD

## Workflow básico: lint + test

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '21'
      - uses: subosito/flutter-action@v2
        with:
          channel: stable
      - run: flutter pub get
      - run: dart analyze
      - run: flutter test
```

## Workflow: build APK en cada release

```yaml
name: Build APK
on:
  push:
    tags: ['v*']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '21'
      - uses: subosito/flutter-action@v2
        with:
          channel: stable

      - run: flutter pub get
      - run: flutter build apk --release

      - uses: softprops/action-gh-release@v2
        with:
          files: build/app/outputs/flutter-apk/app-release.apk
```

## Workflow: deploy a Play Store (con Fastlane)

```yaml
name: Deploy Play Store
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '21'
      - uses: subosito/flutter-action@v2
        with:
          channel: stable

      - run: flutter pub get
      - run: flutter build appbundle --release

      - uses: rishabhgupta/split-properties@v1
        with:
          file: android/key.properties
          key: storeFile
          value: upload-keystore.jks

      # Requiere Fastlane + Service Account configurado
      # - run: fastlane supply --aab build/app/outputs/bundle/release/app-release.aab
```

## Caché de dependencias

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.pub-cache
      .dart_tool
    key: ${{ runner.os }}-pub-${{ hashFiles('pubspec.lock') }}
    restore-keys: |
      ${{ runner.os }}-pub-
```

## Workflow: deploy web a GitHub Pages

```yaml
name: Deploy Web
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
        with:
          channel: stable
      - run: flutter pub get
      - run: flutter build web --release
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: build/web
```

## Buenas prácticas de CI/CD

| Práctica | Razón |
|----------|-------|
| Corre `dart analyze` en CI | Evita que código con warnings llegue a main |
| Tests obligatorios antes de merge | Protege la rama principal |
| Caché de dependencias | Acelera builds en ~50% |
| Tags para releases | Versiona y distribuye automáticamente |
| Secrets para claves | Nunca subas keystore o claves al repo |

## Mini-ejercicio

1. Agrega el workflow CI (analyze + test) al proyecto
2. Agrega el workflow de build APK
3. Agrega el workflow de deploy web (si tu app es multiplataforma)
4. Verifica que los workflows corren correctamente en GitHub Actions

[Siguiente: Ejercicio Final →](/modulo-7/07-ejercicio-final)
