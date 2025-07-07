import os

# Ruta principal (ajustar según sea necesario)
ruta_principal = "C:\\xampp\\htdocs\\TestVocacional\\Modelo\\img\\img_factorE\\"

# Recorrer las carpetas de pregunta1 a pregunta20
for i in range(1, 21):
    carpeta = os.path.join(ruta_principal, f"pregunta{i}")
    
    if not os.path.exists(carpeta):
        continue

    # Obtener todos los archivos .jpg ordenados (para consistencia)
    archivos = sorted([f for f in os.listdir(carpeta) if f.lower().endswith(".jpg")])

    if len(archivos) < 7:
        print(f"[Advertencia] En {carpeta} hay menos de 7 imágenes.")
        continue

    # Renombrar la primera imagen como img.jpg
    original_path = os.path.join(carpeta, archivos[0])
    nuevo_path = os.path.join(carpeta, "img.jpg")
    os.rename(original_path, nuevo_path)

    # Renombrar las siguientes 6 como opcA.jpg a opcF.jpg
    for idx, letra in enumerate("ABCDEF", start=1):
        original = os.path.join(carpeta, archivos[idx])
        nuevo = os.path.join(carpeta, f"opc{letra}.jpg")
        os.rename(original, nuevo)

"Renombramiento completado."
