function generateQR() {
    const url = document.getElementById('url-input').value;

    if (!url) {
        alert('Por favor ingresa una URL.');
        return;
    }

    // Deshabilitar el botón de descarga mientras se genera el QR
    const downloadButton = document.querySelector('.boton__descargar');
    downloadButton.disabled = true;

    // Hacer la petición al servidor Python para generar el QR
    fetch('http://127.0.0.1:5000/generate_qr', {
        method: 'POST',  // Asegúrate de que sea POST
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),  // Enviar la URL como JSON
    })
    .then(response => response.blob())
    .then(blob => {
        // Crear un URL para la imagen del QR
        const qrImageUrl = URL.createObjectURL(blob);
        const qrImage = document.getElementById('qr-image');
        qrImage.style.display = 'block';  // Hacemos visible la imagen QR
        qrImage.src = qrImageUrl;

        // Mostrar y habilitar el botón de descarga
        downloadButton.style.display = 'inline-block';  // Mostrar el botón
        downloadButton.disabled = false;  // Habilitar el botón
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al generar el QR.');
    });
}

function downloadQR() {
    const qrImage = document.getElementById("qr-image");
    const link = document.createElement("a");
    link.href = qrImage.src;
    link.download = "qr-code.png";  // Nombre del archivo descargado
    link.click();
}