/**
 * ARCHIVO PRINCIPAL DE LA APLICACIÓN CRM
 * 
 * Este archivo maneja la funcionalidad básica de la aplicación
 * y los estilos adicionales para los módulos en desarrollo.
 */

/**
 * Función que se ejecuta cuando la página se carga completamente
 * 
 * Esta función se ejecuta automáticamente cuando el navegador
 * termina de cargar todos los elementos de la página HTML
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('CRM iniciado correctamente');
    console.log('Sistema CRM listo para usar');
});

// Agregamos estilos adicionales para los módulos en desarrollo
const estilosAdicionales = `
    <style>
        .modulo-en-desarrollo, .modulo-no-disponible, .informacion-app {
            text-align: center;
            padding: 3rem 2rem;
        }
        
        .mensaje-desarrollo, .mensaje-error {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
            color: #6c757d;
        }
        
        .mensaje-error {
            background: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
        }
        
        .info-content {
            text-align: left;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .info-content h3, .info-content h4 {
            color: #333;
            margin: 1.5rem 0 1rem 0;
        }
        
        .info-content ul {
            margin: 1rem 0;
            padding-left: 2rem;
        }
        
        .info-content li {
            margin: 0.5rem 0;
        }
    </style>
`;

// Agregamos los estilos al documento
document.head.insertAdjacentHTML('beforeend', estilosAdicionales);
