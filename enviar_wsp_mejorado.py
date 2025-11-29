import pyautogui
import pyperclip
import time
import datetime

# Configuración
NUMEROS = ['+51930123005', '+51967100615']
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

NUM_VECES = 100

# Coordenadas
COORD_NUEVO_MENSAJE = (-839, 1036)        # Botón nuevo mensaje
COORD_ADJUNTAR_GENERAL = (-732, 1783)     # Botón adjuntar general
COORD_ADJUNTAR_DOCUMENTO = (-740, 1504)   # Botón adjuntar documento
COORD_ADJUNTAR_IMAGEN = (-733, 1535)      # Botón adjuntar imagen

print('Asegúrate de tener WhatsApp en tu PC abierto.')
input('Presiona Enter cuando estés listo para comenzar...')

time.sleep(5)
start_time = datetime.datetime.now()

for i in range(NUM_VECES):
    numero = NUMEROS[i % len(NUMEROS)]  # Intercalar entre los dos números
    
    if (i+1) % 10 == 0:
        print(f'\n--- Mensaje {i+1}/{NUM_VECES} a {numero} ---')
    
    # 1. Hacer clic en nuevo mensaje
    pyautogui.click(COORD_NUEVO_MENSAJE[0], COORD_NUEVO_MENSAJE[1])
    time.sleep(0.2)
    
    # 2. Pegar número y presionar Enter
    pyperclip.copy(numero)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.1)
    pyautogui.press('enter')
    time.sleep(0.7)
    
    # 3. Adjuntar imagen
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
    
    # 4. Adjuntar documento
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
    
    # 5. Pegar mensaje y enviar
    pyperclip.copy(MENSAJE)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.2)
    pyautogui.press('enter')
    time.sleep(0.7)

end_time = datetime.datetime.now()
elapsed = end_time - start_time

print('\n✅ Proceso completado - 100 mensajes enviados alternando entre:')
print(f'   • +51930123005 (50 mensajes)')
print(f'   • +51967100615 (50 mensajes)')
print(f'⏱️  Tiempo total: {elapsed}')
print(f'📊 Velocidad promedio: {(elapsed.total_seconds() / NUM_VECES):.2f} segundos por mensaje')
