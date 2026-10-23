# lab8sis324 - Landing Page de eCommerce para Pequeños Empresarios

Plataforma moderna, atractiva, totalmente responsive e interactiva para la digitalización de pequeñas empresas y emprendedores locales.

> **"Tu tienda en línea lista en minutos: la solución fácil e intuitiva para que pequeños empresarios vendan sus productos por Internet sin complicaciones técnicas."**

---

## 🚀 Características Principales

- **Diseño Dark Mode Elegante:** Fondo profundo (`#0B0F19`, `#111827`) con acentos de neón (`#00F59B` y `#00D2FF`) para una apariencia SaaS/Fintech moderna y confiable.
- **100% Responsive:** Diseñado con Mobile-First, adaptándose a pantallas móviles, tablets y monitores de escritorio.
- **Estructura Semántica HTML5:** Accesibilidad optimizada, etiquetas semánticas (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **CSS Moderno:** Variables nativas, Glassmorphism con `backdrop-filter`, Flexbox y CSS Grid.
- **Interactividad JavaScript pura:**
  - Menú hamburguesa accesible para dispositivos móviles.
  - Desplazamiento suave con sincronización visual de la sección activa (`IntersectionObserver`).
  - Barra de navegación con efecto blur al scrollear.
  - Simulación interactiva de tienda en el Hero (con contador reactivo de carrito de compras).
  - Validación de formulario en tiempo real con sanitización XSS y estados de éxito/error.
  - Notificaciones flotantes interactivas (*Toast notifications*).
  - Botón de retorno al inicio (*Scroll-to-top*).

---

## 📁 Estructura del Proyecto

```plaintext
lab8sis324/
│
├── index.html        # Estructura semántica completa de la Landing Page
├── styles.css        # Hoja de estilos en Modo Oscuro con variables y responsive
├── script.js         # Lógica interactiva, menú móvil y validación de formulario
└── README.md         # Documentación y guía de despliegue en Render
```

---

## 🌐 Cómo Probar Localmente

1. Puedes abrir directamente el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Firefox, Edge, Safari).
2. O ejecutar un servidor local con extensiones como *Live Server* en VS Code o con Python:
   ```bash
   python -m http.server 8000
   ```
   Luego visita `http://localhost:8000` en tu navegador.

---

## ☁️ Guía de Despliegue en Render (Static Site)

Esta página web es **100% estática**, por lo que su despliegue en **Render** es directo, gratuito e instantáneo:

1. **Subir el código a GitHub/GitLab:**
   - Inicializa el repositorio git:
     ```bash
     git init
     git add .
     git commit -m "Initial commit - Landing Page lab8sis324"
     git branch -M main
     git remote add origin <URL_DE_TU_REPOSITORIO>
     git push -u origin main
     ```
2. **Crear el servicio en Render:**
   - Inicia sesión en [Render.com](https://render.com).
   - Haz clic en el botón **New +** y selecciona **Static Site**.
   - Conecta tu repositorio de GitHub/GitLab donde subiste `lab8sis324`.
3. **Configuración del Despliegue:**
   - **Name:** `lab8sis324` (o el nombre que prefieras).
   - **Branch:** `main`
   - **Build Command:** *(Dejar vacío)*
   - **Publish Directory:** `.` (un solo punto para indicar la raíz)
4. **Desplegar:**
   - Haz clic en **Create Static Site**.
   - Render generará automáticamente un enlace público con certificado SSL gratuito (ej. `https://lab8sis324.onrender.com`).
