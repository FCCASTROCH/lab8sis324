/**
 * lab8sis324 - Landing Page Script
 * Interacciones: Menú hamburguesa móvil, navegación suave, validación de formulario,
 * estado interactivo de mockup y feedback visual mediante toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. SELECTORES PRINCIPALES
  // ========================================================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const btnScrollTop = document.getElementById('btn-scroll-top');
  const currentYearSpan = document.getElementById('current-year');

  // Formulario de Contacto / Registro
  const leadForm = document.getElementById('lead-form');
  const inputBusinessName = document.getElementById('business-name');
  const inputBusinessEmail = document.getElementById('business-email');
  const selectProductCategory = document.getElementById('product-category');
  const inputTermsAgree = document.getElementById('terms-agree');
  const btnSubmitForm = document.getElementById('btn-submit-form');
  const formSuccessAlert = document.getElementById('form-success-alert');
  const successMessageText = document.getElementById('success-message-text');
  const btnResetForm = document.getElementById('btn-reset-form');

  // Elementos de Mockup Interactivo
  const cartCounter = document.getElementById('cart-counter');
  const addButtons = document.querySelectorAll('.btn-mini-add');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  const toastIcon = document.getElementById('toast-icon');

  // ========================================================================
  // 2. AÑO ACTUAL EN FOOTER
  // ========================================================================
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // ========================================================================
  // 3. MENÚ HAMBURGUESA MÓVIL
  // ========================================================================
  if (navToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.contains('open');
      navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    navToggle.addEventListener('click', toggleMenu);

    // Cerrar al hacer clic en un enlace de navegación
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // ========================================================================
  // 4. NAVBAR SCROLL EFFECT & SCROLL-TO-TOP BUTTON
  // ========================================================================
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sombra y fondo opaco en navbar al scrollear
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Botón scroll to top
    if (btnScrollTop) {
      if (scrollY > 400) {
        btnScrollTop.classList.add('visible');
      } else {
        btnScrollTop.classList.remove('visible');
      }
    }
  });

  if (btnScrollTop) {
    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========================================================================
  // 5. ENLACES ACTIVOS POR INTERSECTION OBSERVER
  // ========================================================================
  const sections = document.querySelectorAll('section[id]');
  
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  // ========================================================================
  // 6. TOAST NOTIFICATION HELPER
  // ========================================================================
  let toastTimer = null;

  function showToast(message, iconClass = 'fa-solid fa-circle-check', duration = 3500) {
    if (!toastNotification || !toastMessage || !toastIcon) return;

    // Limpiar temporizador previo
    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastMessage.textContent = message;
    toastIcon.innerHTML = `<i class="${iconClass}"></i>`;

    toastNotification.classList.add('show');

    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, duration);
  }

  // ========================================================================
  // 7. DEMOSTRACIÓN INTERACTIVA DE TIENDA EN EL HERO
  // ========================================================================
  let currentItemsInCart = 2;

  addButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      currentItemsInCart += 1;

      if (cartCounter) {
        cartCounter.textContent = currentItemsInCart;
        // Animación de pulso
        cartCounter.style.transform = 'scale(1.35)';
        setTimeout(() => {
          cartCounter.style.transform = 'scale(1)';
        }, 200);
      }

      const productName = button.getAttribute('data-product') || 'Producto';
      showToast(`¡${productName} agregado al carrito de demostración!`, 'fa-solid fa-bag-shopping');
    });
  });

  // ========================================================================
  // 8. VALIDACIÓN Y ENVÍO DEL FORMULARIO DE REGISTRO
  // ========================================================================
  
  // Utilidad para mostrar u ocultar error
  function setError(inputElement, errorElementId, isError) {
    const errorElem = document.getElementById(errorElementId);
    if (!errorElem) return;

    if (isError) {
      inputElement.classList.add('invalid');
      errorElem.classList.add('visible');
    } else {
      inputElement.classList.remove('invalid');
      errorElem.classList.remove('visible');
    }
  }

  // Validación de Email con Regex estándar
  function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase().trim());
  }

  // Limpiar errores en tiempo real al escribir
  if (inputBusinessName) {
    inputBusinessName.addEventListener('input', () => {
      if (inputBusinessName.value.trim().length >= 2) {
        setError(inputBusinessName, 'error-business-name', false);
      }
    });
  }

  if (inputBusinessEmail) {
    inputBusinessEmail.addEventListener('input', () => {
      if (isValidEmail(inputBusinessEmail.value)) {
        setError(inputBusinessEmail, 'error-business-email', false);
      }
    });
  }

  if (selectProductCategory) {
    selectProductCategory.addEventListener('change', () => {
      if (selectProductCategory.value !== '') {
        setError(selectProductCategory, 'error-product-category', false);
      }
    });
  }

  if (inputTermsAgree) {
    inputTermsAgree.addEventListener('change', () => {
      if (inputTermsAgree.checked) {
        setError(inputTermsAgree, 'error-terms-agree', false);
      }
    });
  }

  // Manejador del Submit
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;

      // 1. Validar Nombre del Negocio
      const businessNameVal = inputBusinessName ? inputBusinessName.value.trim() : '';
      if (!businessNameVal || businessNameVal.length < 2) {
        setError(inputBusinessName, 'error-business-name', true);
        hasErrors = true;
      } else {
        setError(inputBusinessName, 'error-business-name', false);
      }

      // 2. Validar Correo Electrónico
      const businessEmailVal = inputBusinessEmail ? inputBusinessEmail.value.trim() : '';
      if (!businessEmailVal || !isValidEmail(businessEmailVal)) {
        setError(inputBusinessEmail, 'error-business-email', true);
        hasErrors = true;
      } else {
        setError(inputBusinessEmail, 'error-business-email', false);
      }

      // 3. Validar Categoría
      const categoryVal = selectProductCategory ? selectProductCategory.value : '';
      if (!categoryVal) {
        setError(selectProductCategory, 'error-product-category', true);
        hasErrors = true;
      } else {
        setError(selectProductCategory, 'error-product-category', false);
      }

      // 4. Validar Términos
      const termsVal = inputTermsAgree ? inputTermsAgree.checked : false;
      if (!termsVal) {
        setError(inputTermsAgree, 'error-terms-agree', true);
        hasErrors = true;
      } else {
        setError(inputTermsAgree, 'error-terms-agree', false);
      }

      // Si hay errores, detener y hacer foco en el primer campo inválido
      if (hasErrors) {
        const firstInvalid = leadForm.querySelector('.form-input.invalid, input:invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        showToast('Por favor completa todos los campos requeridos.', 'fa-solid fa-triangle-exclamation');
        return;
      }

      // Proceso de Envío Simulado (Feedback UX)
      if (btnSubmitForm) {
        btnSubmitForm.classList.add('loading');
        btnSubmitForm.disabled = true;
      }

      setTimeout(() => {
        // Finalizar estado de carga
        if (btnSubmitForm) {
          btnSubmitForm.classList.remove('loading');
          btnSubmitForm.disabled = false;
        }

        // Ocultar formulario y mostrar confirmación de éxito
        leadForm.style.display = 'none';
        
        if (successMessageText) {
          successMessageText.innerHTML = `¡Excelente! Hemos reservado la tienda para <strong>"${escapeHtml(businessNameVal)}"</strong>. Te hemos enviado un correo de bienvenida a <strong>${escapeHtml(businessEmailVal)}</strong> para activar tu catálogo y comenzar a vender.`;
        }

        if (formSuccessAlert) {
          formSuccessAlert.classList.add('active');
        }

        // Notificación Toast de éxito global
        showToast(`¡Tienda "${escapeHtml(businessNameVal)}" creada con éxito!`, 'fa-solid fa-circle-check', 5000);

        // Desplazamiento suave para centrar la alerta de éxito en pantallas móviles
        formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

      }, 1200);
    });
  }

  // Botón para reiniciar formulario y registrar otro negocio
  if (btnResetForm && leadForm && formSuccessAlert) {
    btnResetForm.addEventListener('click', () => {
      leadForm.reset();
      leadForm.style.display = 'flex';
      formSuccessAlert.classList.remove('active');
      if (inputBusinessName) inputBusinessName.focus();
      showToast('Formulario restablecido. Puedes registrar una nueva tienda.', 'fa-solid fa-rotate-left');
    });
  }

  // ========================================================================
  // 9. ENLACES LEGALES (Términos & Privacidad)
  // ========================================================================
  const privacyLinks = document.querySelectorAll('#link-privacy, #link-terms-footer, .link-terms');
  privacyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Si el enlace apunta a #contacto, podemos mostrar un toast explicativo
      if (link.getAttribute('href') === '#contacto') {
        showToast('Términos y Privacidad de lab8sis324: Tus datos están 100% protegidos bajo cifrado SSL.', 'fa-solid fa-shield-halved');
      }
    });
  });

  // ========================================================================
  // 10. HELPER XSS SANITIZATION
  // ========================================================================
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

});
