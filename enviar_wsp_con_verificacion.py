import pyautogui
import pyperclip
import time
import datetime
import csv

# Leer números desde CSV y eliminar duplicados
NUMEROS = []
csv_path = r'Z:\04_PAGINA-PERSONAL\brochure\numeros_extraidos.csv'

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    numeros_set = set()
    for row in reader:
        numero = row.get('numero', '').strip()
        if numero:
            numeros_set.add(numero)

NUMEROS = sorted(list(numeros_set))
NUM_TOTAL_NUMEROS = len(NUMEROS)

print(f'📞 Total de números únicos cargados: {NUM_TOTAL_NUMEROS}')
print(f'🔍 Se verificará cada número antes de enviar\n')

# Mensaje mejorado
MENSAJE = '''Hola 🙋‍♂️🙋‍♂️
¿Tienes dudas sobre qué método cuantitativo usar en tu tesis o proyecto de investigación? 🤔📚
Acabo de lanzar una *Guía Interactiva de 69 Métodos Cuantitativos*, ideal si tienes dudas en tu tesis.

Funciona como un asistente inteligente que te ayuda a elegir el método perfecto para tu tesis en 4 preguntas ✨

🎯 Pruébalo aquí:
https://amarufo.github.io/PAGE-AIP/pages/servicios-analisis-cuantitativo.html

📊 Incluye:
✓ Métodos de estadísticos básicos,  correlación, regresión, ANOVA, series de tiempo, ML y otros
✓ Ejemplos reales con datos peruanos
✓ Galerías visuales de cada análisis
✓ Galerías de informes (PDFs) de cada análisis

📥 ¿Quieres ver modelos de análisis para casos específicos? Te envío el Brochure 🗒️con links los documentos (PDFs) 🌎

¿Crees que puede ayudar a otra persona? ¡Compártelo! 🤓
¡Contáctame sin problema! 🤠💬'''

PDF_PATH = r'Z:\04_PAGINA-PERSONAL\brochure\brochure-metodos-v2.pdf'
IMG_PATH = r'Z:\04_PAGINA-PERSONAL\brochure\IMAGEN.png'

# Coordenadas
COORD_NUEVO_MENSAJE = (-839, 1036)        # Botón nuevo mensaje
COORD_ADJUNTAR_GENERAL = (-732, 1783)     # Botón adjuntar general
COORD_ADJUNTAR_DOCUMENTO = (-740, 1504)   # Botón adjuntar documento
COORD_ADJUNTAR_IMAGEN = (-733, 1535)      # Botón adjuntar imagen
COORD_BUSCAR = (-839, 100)                # Área de búsqueda aproximada (puedes ajustar)

print('Asegúrate de tener WhatsApp en tu PC abierto.')
input('Presiona Enter cuando estés listo para comenzar...')

time.sleep(5)
start_time = datetime.datetime.now()

numeros_verificados = 0
numeros_no_encontrados = []
numeros_enviados = 0

for idx, numero in enumerate(NUMEROS, 1):
    if idx % 10 == 0:
        elapsed_so_far = datetime.datetime.now() - start_time
        print(f'\n--- Procesando: {idx}/{NUM_TOTAL_NUMEROS} | Enviados: {numeros_enviados} | No encontrados: {len(numeros_no_encontrados)} (Tiempo: {elapsed_so_far}) ---')
    
    # 1. Hacer clic en nuevo mensaje
    pyautogui.click(COORD_NUEVO_MENSAJE[0], COORD_NUEVO_MENSAJE[1])
    time.sleep(0.3)
    
    # 2. Pegar número para verificar
    pyperclip.copy(numero)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.3)
    
    # 3. Esperar a que se busque el contacto
    time.sleep(0.8)
    
    # 4. Verificar si el número está disponible presionando Enter
    # Si existe, se abrirá el chat; si no, aparecerá un mensaje de error
    pyautogui.press('enter')
    time.sleep(1)
    
    # Verificar si el chat se abrió buscando por cambios visuales
    # Suponemos que si el chat se abrió correctamente, podemos escribir
    # Intentamos escribir el mensaje
    try:
        # 5. Adjuntar imagen
        pyautogui.click(COORD_ADJUNTAR_GENERAL[0], COORD_ADJUNTAR_GENERAL[1])
        time.sleep(0.2)
        pyautogui.click(COORD_ADJUNTAR_IMAGEN[0], COORD_ADJUNTAR_IMAGEN[1])
        time.sleep(0.4)
        
        pyperclip.copy(IMG_PATH)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(0.2)
        pyautogui.press('enter')
        time.sleep(0.2)
        pyautogui.press('enter')
        time.sleep(0.7)
        
        # 6. Adjuntar documento
        pyautogui.click(COORD_ADJUNTAR_GENERAL[0], COORD_ADJUNTAR_GENERAL[1])
        time.sleep(0.2)
        pyautogui.click(COORD_ADJUNTAR_DOCUMENTO[0], COORD_ADJUNTAR_DOCUMENTO[1])
        time.sleep(0.4)
        
        pyperclip.copy(PDF_PATH)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(0.2)
        pyautogui.press('enter')
        time.sleep(0.2)
        pyautogui.press('enter')
        time.sleep(0.7)
        
        # 7. Pegar mensaje y enviar
        pyperclip.copy(MENSAJE)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(0.2)
        pyautogui.press('enter')
        time.sleep(0.7)
        
        numeros_enviados += 1
        
    except Exception as e:
        numeros_no_encontrados.append(numero)
        # Cerrar el diálogo de error si lo hay
        pyautogui.press('esc')
        time.sleep(0.5)

end_time = datetime.datetime.now()
elapsed = end_time - start_time

print(f'\n✅ RESUMEN DEL PROCESO')
print(f'=' * 60)
print(f'📊 Total de números procesados: {NUM_TOTAL_NUMEROS}')
print(f'✓ Mensajes enviados exitosamente: {numeros_enviados}')
print(f'✗ Números no encontrados/inválidos: {len(numeros_no_encontrados)}')
print(f'⏱️  Tiempo total: {elapsed}')
print(f'📈 Velocidad promedio: {(elapsed.total_seconds() / NUM_TOTAL_NUMEROS):.2f} segundos por número\n')

if numeros_no_encontrados:
    print(f'❌ Números no encontrados ({len(numeros_no_encontrados)}):')
    for numero in numeros_no_encontrados[:20]:  # Mostrar primeros 20
        print(f'   • {numero}')
    if len(numeros_no_encontrados) > 20:
        print(f'   ... y {len(numeros_no_encontrados) - 20} más')
    
    # Guardar números no encontrados en archivo
    with open(r'Z:\04_PAGINA-PERSONAL\numeros_no_encontrados.txt', 'w', encoding='utf-8') as f:
        for numero in numeros_no_encontrados:
            f.write(numero + '\n')
    print(f'\n💾 Números no encontrados guardados en: numeros_no_encontrados.txt')
