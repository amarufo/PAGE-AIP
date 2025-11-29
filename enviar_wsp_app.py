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

NUM_VECES = 10
COORD_ADJUNTAR = (-736, 1786)  # Coordenadas del botón adjuntar

print('Asegúrate de tener WhatsApp en tu PC abierto.')
input('Presiona Enter cuando estés listo para comenzar...')

for i in range(NUM_VECES):
    print(f'\n--- Mensaje {i+1}/{NUM_VECES} ---')
    
    # Nuevo chat: Ctrl+Alt+N
    time.sleep(1)
    print('Abriendo nuevo chat...')
    pyautogui.hotkey('ctrl', 'alt', 'n')
    time.sleep(1)
    
    # Pegar número
    print(f'Enviando a {NUMERO}...')
    pyperclip.copy(NUMERO)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(2)
    
    # Enviar mensaje
    print('Enviando mensaje...')
    pyperclip.copy(MENSAJE)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(2)

    # Adjuntar documento (PDF) - Primer adjunto
    print('Adjuntando imágen')
    pyautogui.click(COORD_ADJUNTAR[0], COORD_ADJUNTAR[1])
    time.sleep(1)
    
    # Elegir primera opción (adjunta documento)
    pyautogui.press('enter')  # Primera opción
    time.sleep(1.5)    
    
    # Pegar ruta de la imagen
    pyperclip.copy(IMG_PATH)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(2)
    
    # Adjuntar documento (PDF) - Primer adjunto
    print('Adjuntando documento (PDF)...')
    pyautogui.click(COORD_ADJUNTAR[0], COORD_ADJUNTAR[1])
    time.sleep(1)
    
    # Elegir primera opción (adjunta documento)
    pyautogui.press('enter')  # Primera opción
    time.sleep(1.5)
    
    # Pegar ruta del PDF
    pyperclip.copy(PDF_PATH)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(2)
    
    # Adjuntar imagen
    print('Adjuntando imagen...')
    pyautogui.click(COORD_ADJUNTAR[0], COORD_ADJUNTAR[1])
    time.sleep(1)
    
    # Elegir primera opción
    pyautogui.press('enter')
    time.sleep(1.5)
    
    # Pegar ruta de la imagen
    pyperclip.copy(IMG_PATH)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(2)
    
    print(f'Mensaje {i+1} completado')
    time.sleep(3)  # Pausa entre mensajes

print('\n✅ Proceso completado - 10 mensajes enviados')
