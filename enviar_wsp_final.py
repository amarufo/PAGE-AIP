import pyautogui
import pyperclip
import time

# Configuración
NUMERO = '+51930123005'
MENSAJE = '''Acabo de lanzar una *Guía Interactiva de 69 Métodos Cuantitativos* ,
ideal si tienes dudas en tu tesis.
Funciona como un asistente inteligente que te ayuda a elegir el método perfecto para tu tesis en 4 preguntas ✨

📊 Incluye:
✓ Métodos de estadísticos básicos,  correlación, regresión, ANOVA, series de tiempo, ML y otros
✓ Ejemplos reales con datos peruanos
✓ Galerías visuales de cada análisis
✓ Galerías de informes (PDFs) de cada análisis

🎯 Pruébalo aquí:
https://amarufo.github.io/PAGE-AIP/pages/servicios-analisis-cuantitativo.html

📥 Te envío el Brochure

¿Crees que puede ayudar a otra persona? ¡Compártelo! 🤓
¡Contáctame sin problema! 🤠💬'''

PDF_PATH = r'Z:\04_PAGINA-PERSONAL\brochure\brochure-metodos-v2.pdf'
IMG_PATH = r'Z:\04_PAGINA-PERSONAL\brochure\IMAGEN.png'

NUM_VECES = 5

# Coordenadas
COORD_NUEVO_MENSAJE = (-839, 1036)      # Botón nuevo mensaje
COORD_ADJUNTAR = (-736, 1786)            # Botón adjuntar general
COORD_ADJUNTAR_DOCUMENTO = (-732, 1498)  # Opción adjuntar documento

print('Asegúrate de tener WhatsApp en tu PC abierto.')
input('Presiona Enter cuando estés listo para comenzar...')

for i in range(NUM_VECES):
    print(f'\n--- Mensaje {i+1}/{NUM_VECES} ---')
    
    # 1. Hacer clic en nuevo mensaje
    print('1. Abriendo nuevo mensaje...')
    pyautogui.click(COORD_NUEVO_MENSAJE[0], COORD_NUEVO_MENSAJE[1])
    time.sleep(1)
    
    # 2. Pegar número y presionar Enter
    print(f'2. Pegando número: {NUMERO}')
    pyperclip.copy(NUMERO)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.25)
    pyautogui.press('enter')
    time.sleep(1)
    
    # 3. Ir al botón de adjuntar e insertar imagen
    print('3. Adjuntando imagen...')
    pyautogui.click(COORD_ADJUNTAR[0], COORD_ADJUNTAR[1])
    time.sleep(1)
    
    # Pegar ruta de imagen
    pyperclip.copy(IMG_PATH)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.25)
    pyautogui.press('enter')  # Confirmar imagen
    time.sleep(0.25)
    pyautogui.press('enter')  # Enviar imagen
    time.sleep(1)
    
    # 4. Ir al botón de adjuntar documento
    print('4. Adjuntando documento PDF...')
    pyautogui.click(COORD_ADJUNTAR[0], COORD_ADJUNTAR[1])
    time.sleep(0.2)
    
    # Hacer clic en opción de adjuntar documento
    pyautogui.click(COORD_ADJUNTAR_DOCUMENTO[0], COORD_ADJUNTAR_DOCUMENTO[1])
    time.sleep(0.2)
    
    # Pegar ruta del PDF
    pyperclip.copy(PDF_PATH)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.25)
    pyautogui.press('enter')  # Confirmar documento
    time.sleep(0.25)
    pyautogui.press('enter')  # Enviar documento
    time.sleep(0.5)
    
    # 7. Pegar mensaje y enviar
    print('7. Enviando mensaje de texto...')
    pyperclip.copy(MENSAJE)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')  # Enviar mensaje
    time.sleep(0.5)
    
    print(f'✓ Mensaje {i+1} completado')
    time.sleep(0.5)  # Pausa entre mensajes
print('\n✅ Proceso completado - 5 mensajes enviados a +51930123005')
