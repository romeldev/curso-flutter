---
title: 7.5 — Firma de APK
description: Keystore, signed bundle, Play Store
---

# 7.5 Firma de APK

## Generar keystore

```bash
# Solo una vez: crear el keystore
keytool -genkey -v -keystore ~/upload-keystore.jks   -keyalg RSA -keysize 2048 -validity 10000   -alias upload
```

Te pedirá:
- Contraseña del keystore
- Contraseña de la clave
- Nombre, organización, ciudad, etc.

## Configurar Android

```gradle
// android/key.properties (crear este archivo)
storePassword=tu-contraseña
keyPassword=tu-contraseña
keyAlias=upload
storeFile=../upload-keystore.jks
```

```gradle
// android/app/build.gradle — agregar antes de android {
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... existing config ...

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

## Generar App Bundle firmado

```bash
# Limpiar build anterior
flutter clean

# Generar App Bundle firmado
flutter build appbundle --release

# El archivo estará en:
# build/app/outputs/bundle/release/app-release.aab
```

## Publicar en Play Store

1. Ve a [Google Play Console](https://play.google.com/console)
2. Crea una nueva aplicación
3. Producción → Crear nuevo lanzamiento
4. Sube el `app-release.aab`
5. Completa la ficha de Play Store (descripción, capturas, etc.)
6. Revisa y publica

## Publicar en web

```bash
flutter build web --release
# El build estará en build/web/
# Puedes subirlo a Firebase Hosting, Netlify, Vercel, etc.
```

## Publicar en GitHub Releases

```yaml
# .github/workflows/release.yml
name: Build Release
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
      - run: flutter pub get
      - run: flutter build appbundle --release
      - uses: actions/upload-artifact@v4
        with:
          name: app-release
          path: build/app/outputs/bundle/release/app-release.aab
```

## Mini-ejercicio

1. Genera un keystore de prueba
2. Configura la firma en Android
3. Genera un App Bundle firmado
4. Verifica que el archivo `.aab` se genera correctamente

[Siguiente: CI/CD →](/modulo-7/06-cicd)
