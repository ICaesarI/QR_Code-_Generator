from flask import Flask, request, send_file
from flask_cors import CORS
import qrcode
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/generate_qr', methods=['POST'])
def generate_qr():
    url = request.json.get('url')  # Recibe la URL como JSON

    if not url:
        return {"error": "No URL provided"}, 400

    # Generar el código QR
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(url)
    qr.make(fit=True)

    # Crear una imagen en memoria
    img = qr.make_image(fill='black', back_color='white')

    # Guardar la imagen en un objeto BytesIO
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)

    # Verificar que la imagen se ha generado
    print("QR generado y guardado en memoria.")

    # Enviar la imagen como respuesta
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
