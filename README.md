# 💣 Calculadora de Raideos para Rust

Calculadora para **planificar raideos en Rust**, que permite:

- Calcular **los materiales necesarios** para fabricar explosivos.
- Saber **cuántos explosivos puedes crear** con tus recursos actuales.
- Ver **los pasos detallados del proceso de fabricación**.

🌐 Página web:  
https://calculadora-raideos-rust.pages.dev/

📦 Repositorio:  
https://github.com/MrSCR98/calculadora-raideos-rust

---

# 🚀 Cómo ejecutar el proyecto

Este proyecto está desarrollado con **Next.js**, por lo que necesitas tener **Node.js y npm** instalados.

## 1️⃣ Instalar dependencias

En la carpeta del proyecto ejecuta:

```bash
npm install
```

---

## 2️⃣ Ejecutar en modo desarrollo

```bash
npm run dev
```

Después abre esta dirección en el navegador:

```
http://localhost:3000
```

---

## 3️⃣ Crear la build de producción

```bash
npm run build
```

Esto generará la versión optimizada para producción.

---

# 🖼️ Optimización de imágenes

Las imágenes del proyecto se optimizaron usando:

https://squoosh.app/

Se convirtieron de:

```
.png → .avif
```

El formato **AVIF** es mucho más eficiente para la web, ya que reduce bastante el tamaño de los archivos sin apenas pérdida de calidad.

### ⚙️ Configuración usada

- **Formato:** AVIF
- **Quality:** 50
- **Effort:** 4

Estos valores son los **predeterminados de Squoosh al seleccionar el formato AVIF**.

> En el futuro se podría **automatizar la optimización de imágenes durante el proceso de build** usando alguna librería.

---

# 🧩 Algunas imágenes no están en este repositorio

Algunas imágenes utilizadas provienen directamente de los archivos del juego **Rust**, por lo que **no están incluidas en este repositorio**.

Puedes encontrarlas en tu instalación de Rust:

```cmd
C:\Program Files (x86)\Steam\steamapps\common\Rust\Bundles\items
```

### 📂 Archivos utilizados

- ammo.rifle.explosive.png
- ammo.rocket.basic.png
- ammo.rocket.fire.png
- ammo.rocket.hv.png
- catapult.ammo.explosive.png
- charcoal.png
- cloth.png
- explosive.satchel.png
- explosive.timed.png
- explosives.png
- grenade.beancan.png
- gunpowder.png
- lowgradefuel.png
- metal.fragments.png
- metalpipe.png
- propanetank.png
- rope.png
- stash.small.png
- sulfur.png
- techparts.png

---

# 🛠️ Cosas que se podrían mejorar

### 🎨 Diseño

- Mejorar el **diseño general de la página**.
- Ajustar los **colores del tema claro y oscuro**.

### ⚡ Optimización

- Añadir más **optimizaciones de rendimiento**.
- Automatizar la **optimización de imágenes en el proceso de build**.

### 🔧 Código

- Refactorizar algunas partes para mantener el proyecto más limpio y fácil de mantener.

---

# 📄 Licencia

El código del proyecto está bajo **licencia MIT**.

Repositorio:  
https://github.com/MrSCR98/calculadora-raideos-rust

⚠️ **Importante:**  
La licencia **MIT** se aplica únicamente al **código fuente del proyecto**.

Las **imágenes no están cubiertas por esta licencia**.  
Algunas provienen de los **assets del juego Rust** y otras son **imágenes personalizadas**, por lo que pueden tener licencias o derechos diferentes.
