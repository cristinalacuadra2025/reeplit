// Script para funcionalidades interactivas de la página

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar tooltips de Bootstrap
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Inicializar popovers de Bootstrap
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Añadir clase active a enlaces de navegación basados en la URL actual
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    // Extraer nombre del archivo de la URL actual
    const currentPath = currentLocation.split('/').pop();
    // Extraer nombre del archivo del enlace
    const linkPath = link.getAttribute('href');
    
    if (linkPath === currentPath || 
        (currentPath === '' && linkPath === 'index.html') || 
        (currentPath === '/' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Animación suave para enlaces de anclaje internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Efecto de desplazamiento para tarjetas y elementos
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .alert, .row > div').forEach(element => {
    observer.observe(element);
  });

  // Resaltar sintaxis de los bloques de código
  document.querySelectorAll('pre code').forEach(block => {
    highlightElement(block);
  });

  // Main application code starts here

  // Función para resaltar elementos de código (versión simplificada)
  function highlightElement(element) {
    // Añadir clase para identificar bloques de código ya procesados
    element.classList.add('highlight-processed');

    // Una implementación básica que añade clases para algunos tokens comunes
    const text = element.textContent;
    let processed = text
      .replace(/\b(function|return|if|else|for|while|var|let|const|class|import|export|from|async|await)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(true|false|null|undefined|NaN)\b/g, '<span class="literal">$1</span>')
      .replace(/("[^"]*")|('[^']*')/g, '<span class="string">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
      .replace(/(\/\/[^\n]*)/g, '<span class="comment">$1</span>');

    element.innerHTML = processed;
  }
});