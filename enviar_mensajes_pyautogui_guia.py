import pyautogui
import pyperclip
import time
import os

NUM_MENSAJES = 1  # Cambia si quieres enviar más veces
NUMERO = '+51930123005'
MENSAJE = '''Acabo de lanzar una *Guía Interactiva de 69 Métodos Cuantitativos* ,\nideal si tienes dudas en tu tesis.\nFunciona como un asistente inteligente que te ayuda a elegir el método perfecto para tu tesis en 4 preguntas ✨\n\n📊 Incluye:\n✓ Métodos de estadísticos básicos,  correlación, regresión, ANOVA, series de tiempo, ML y otros\n✓ Ejemplos reales con datos peruanos\n✓ Galerías visuales de cada análisis\n✓ Galerías de informes (PDFs) de cada análisis\n\n🎯 Pruébalo aquí:\nhttps://amarufo.github.io/PAGE-AIP/pages/servicios-analisis-cuantitativo.html\n\n📥 Te envío el Brochure\n\n¿Crees que puede ayudar a otra persona? ¡Compártelo! 🤓\n¡Contáctame sin problema! 🤠💬'''
PDF_PATH = r'Z:\04_PAGINA-PERSONAL\brochure\brochure-metodos-v2.pdf'
IMG_PATH = r'Z:\04_PAGINA-PERSONAL\brochure\IMAGEN.png'
TIEMPO_ENTRE_MENSAJES = 2

print('Asegúrate de tener la ventana de WhatsApp Web activa y visible en tu escritorio, y el chat con el número abierto.')
input('Presiona Enter cuando estés listo para comenzar...')

for i in range(NUM_MENSAJES):
    # Pega el mensaje
    pyperclip.copy(MENSAJE)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(1)

    # Adjunta imagen
    pyautogui.hotkey('ctrl', 'alt', 'a')  # Abre el selector de archivos (puede variar)
    time.sleep(1)
    pyperclip.copy(IMG_PATH)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(2)
    pyautogui.press('enter')  # Enviar imagen
    time.sleep(2)

    # Adjunta PDF
    pyautogui.hotkey('ctrl', 'alt', 'a')
    time.sleep(1)
    pyperclip.copy(PDF_PATH)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(2)
    pyautogui.press('enter')  # Enviar PDF
    time.sleep(TIEMPO_ENTRE_MENSAJES)

    print(f'Mensaje {i+1} enviado a {NUMERO}')

print('Proceso terminado.')
