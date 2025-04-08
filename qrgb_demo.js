/**
 * Demo de QRGB para la web
 * Este script maneja la generación de códigos QR multicapa (RGB) en la interfaz web.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const generateQRBtn = document.getElementById('generateQRBtn');
    const redDataInput = document.getElementById('redData');
    const greenDataInput = document.getElementById('greenData');
    const blueDataInput = document.getElementById('blueData');
    const qrSizeSelect = document.getElementById('qrSize');
    const errorCorrectionSelect = document.getElementById('errorCorrection');
    const qrResult = document.getElementById('qrResult');
    const qrDisplayContainer = document.getElementById('qrDisplayContainer');
    const qrCodeDisplay = document.getElementById('qrCodeDisplay');
    const downloadQrBtn = document.getElementById('downloadQrBtn');
    const resetQrBtn = document.getElementById('resetQrBtn');

    // Solo continuar si estamos en la página del código QR
    if (!generateQRBtn) return;

    // Generar QR al hacer clic en el botón
    generateQRBtn.addEventListener('click', function() {
        // Validar entrada
        const redData = redDataInput.value.trim();
        const greenData = greenDataInput.value.trim();
        const blueData = blueDataInput.value.trim();
        
        if (!redData && !greenData && !blueData) {
            showAlert('Por favor, ingrese datos para al menos un canal de color.', 'danger');
            return;
        }
        
        // Configurar opciones
        const size = parseInt(qrSizeSelect.value);
        const errorCorrection = errorCorrectionSelect.value;
        
        try {
            // Limpiar área de visualización
            qrCodeDisplay.innerHTML = '';
            
            // Mostrar contenedor de visualización
            qrResult.innerHTML = '';
            qrDisplayContainer.classList.remove('d-none');
            
            // Generar QR para cada canal
            generateQRLayers(redData, greenData, blueData, size, errorCorrection);
            
            // Habilitar botón de descarga (en una implementación real)
            downloadQrBtn.classList.remove('disabled');
            
        } catch (error) {
            showAlert('Error al generar el código QR: ' + error.message, 'danger');
        }
    });
    
    // Restablecer formulario
    resetQrBtn.addEventListener('click', function() {
        redDataInput.value = '';
        greenDataInput.value = '';
        blueDataInput.value = '';
        qrSizeSelect.value = '8';
        errorCorrectionSelect.value = 'M';
        
        qrDisplayContainer.classList.add('d-none');
        qrResult.innerHTML = '<div class="alert alert-secondary" role="alert"><i class="fas fa-info-circle me-2"></i> Complete el formulario y haga clic en "Generar código QR" para visualizar el resultado.</div>';
        
        downloadQrBtn.classList.add('disabled');
    });
    
    // Botón de descarga (simulado)
    downloadQrBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // En una implementación real, esto descargaría realmente el código QR
        showAlert('Esta es una versión de demostración. En la versión completa, se descargaría el código QR generado.', 'info');
    });
    
    /**
     * Genera los códigos QR para cada capa de color y los combina
     */
    function generateQRLayers(redData, greenData, blueData, size, errorLevel) {
        // Verificar si la librería QRCode está disponible
        if (typeof QRCode === 'undefined') {
            showAlert('Error: Librería QRCode no encontrada', 'danger');
            return;
        }
        
        // Crear contenedores para cada capa
        const container = document.createElement('div');
        container.className = 'qrgb-layers';
        
        // Mostrar primero una vista previa combinada (simulada)
        const combinedContainer = document.createElement('div');
        combinedContainer.className = 'mb-4';
        
        const combinedCanvas = document.createElement('canvas');
        combinedCanvas.width = size * 25;  // Tamaño aproximado
        combinedCanvas.height = size * 25;
        
        // Configuración para QRCode.js
        const qrOptions = {
            width: size * 25,
            height: size * 25,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: getErrorLevel(errorLevel)
        };
        
        // Primero, generamos un código QR para mostrar (para la demo)
        // En una implementación real, combinaríamos los tres canales
        const displayData = redData || greenData || blueData;
        
        // Crear un solo código QR para la demostración
        new QRCode(combinedContainer, {
            text: displayData,
            width: qrOptions.width,
            height: qrOptions.height,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: qrOptions.correctLevel
        });
        
        // Agregar título y descripción
        const combinedTitle = document.createElement('h4');
        combinedTitle.className = 'h6 mt-3';
        combinedTitle.innerHTML = 'Código QR Combinado <span class="badge bg-primary">Simulación</span>';
        
        const combinedDesc = document.createElement('p');
        combinedDesc.className = 'small text-muted';
        combinedDesc.innerHTML = 'En la versión completa, esta imagen contendría datos en las tres capas de color.';
        
        combinedContainer.appendChild(combinedTitle);
        combinedContainer.appendChild(combinedDesc);
        
        container.appendChild(combinedContainer);
        
        // Mostrar también las capas individuales simuladas
        if (redData || greenData || blueData) {
            const layersContainer = document.createElement('div');
            layersContainer.className = 'row g-2 mt-4';
            
            // Canal rojo
            if (redData) {
                const redCol = document.createElement('div');
                redCol.className = 'col-md-4';
                
                const redLayerContainer = document.createElement('div');
                redLayerContainer.className = 'text-center';
                
                // Generar QR rojo
                new QRCode(redLayerContainer, {
                    text: redData,
                    width: qrOptions.width / 2,
                    height: qrOptions.height / 2,
                    colorDark: "#ff0000",
                    colorLight: "#ffffff",
                    correctLevel: qrOptions.correctLevel
                });
                
                const redTitle = document.createElement('div');
                redTitle.className = 'mt-2';
                redTitle.innerHTML = '<span class="badge bg-danger">Capa Roja</span>';
                
                redLayerContainer.appendChild(redTitle);
                redCol.appendChild(redLayerContainer);
                layersContainer.appendChild(redCol);
            }
            
            // Canal verde
            if (greenData) {
                const greenCol = document.createElement('div');
                greenCol.className = 'col-md-4';
                
                const greenLayerContainer = document.createElement('div');
                greenLayerContainer.className = 'text-center';
                
                // Generar QR verde
                new QRCode(greenLayerContainer, {
                    text: greenData,
                    width: qrOptions.width / 2,
                    height: qrOptions.height / 2,
                    colorDark: "#00ff00",
                    colorLight: "#ffffff",
                    correctLevel: qrOptions.correctLevel
                });
                
                const greenTitle = document.createElement('div');
                greenTitle.className = 'mt-2';
                greenTitle.innerHTML = '<span class="badge bg-success">Capa Verde</span>';
                
                greenLayerContainer.appendChild(greenTitle);
                greenCol.appendChild(greenLayerContainer);
                layersContainer.appendChild(greenCol);
            }
            
            // Canal azul
            if (blueData) {
                const blueCol = document.createElement('div');
                blueCol.className = 'col-md-4';
                
                const blueLayerContainer = document.createElement('div');
                blueLayerContainer.className = 'text-center';
                
                // Generar QR azul
                new QRCode(blueLayerContainer, {
                    text: blueData,
                    width: qrOptions.width / 2,
                    height: qrOptions.height / 2,
                    colorDark: "#0000ff",
                    colorLight: "#ffffff",
                    correctLevel: qrOptions.correctLevel
                });
                
                const blueTitle = document.createElement('div');
                blueTitle.className = 'mt-2';
                blueTitle.innerHTML = '<span class="badge bg-primary">Capa Azul</span>';
                
                blueLayerContainer.appendChild(blueTitle);
                blueCol.appendChild(blueLayerContainer);
                layersContainer.appendChild(blueCol);
            }
            
            // Añadir descripción para las capas
            const layersTitle = document.createElement('h4');
            layersTitle.className = 'h6 mb-3';
            layersTitle.innerHTML = 'Capas individuales';
            
            container.appendChild(layersTitle);
            container.appendChild(layersContainer);
        }
        
        // Agregar todo al contenedor de visualización
        qrCodeDisplay.appendChild(container);
    }
    
    /**
     * Convierte el nivel de corrección de errores a la constante correspondiente
     */
    function getErrorLevel(level) {
        switch(level) {
            case 'L': return 1; // QRCode.CorrectLevel.L
            case 'M': return 0; // QRCode.CorrectLevel.M
            case 'Q': return 3; // QRCode.CorrectLevel.Q
            case 'H': return 2; // QRCode.CorrectLevel.H
            default: return 0;  // M por defecto
        }
    }
    
    /**
     * Muestra una alerta en la interfaz
     */
    function showAlert(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        
        alertDiv.innerHTML = `
            <i class="fas fa-${type === 'danger' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        qrResult.innerHTML = '';
        qrResult.appendChild(alertDiv);
    }
});
