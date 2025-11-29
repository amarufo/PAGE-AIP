import pyautogui
import pyperclip
import time

# Configuración
NUMEROS = ['+51930123005', '+51967100615']
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

print('Asegúrate de tener WhatsApp Web abierto en Firefox.')
print(f'Se enviarán mensajes solo al segundo número: {NUMEROS[1]}')
input('Presiona Enter cuando estés listo...')

numero = NUMEROS[1]  # Solo el segundo número

# Nuevo chat
print(f'\nAbriendo nuevo chat con {numero}...')
pyautogui.hotkey('ctrl', 'alt', 'n')
time.sleep(1.5)

# Escribir número
pyperclip.copy(numero)
pyautogui.hotkey('ctrl', 'v')
time.sleep(0.5)
pyautogui.press('enter')
time.sleep(2)

# Enviar mensaje
print('Enviando mensaje...')
pyperclip.copy(MENSAJE)
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)
pyautogui.press('enter')
time.sleep(2)

# Adjuntar imagen - Buscar y hacer clic en el botón de clip
print('Adjuntando imagen...')
time.sleep(1)

# Encontrar el botón de adjuntar (ícono clip) y hacer clic
# En WhatsApp Web, el botón está en el área de mensajes
pyautogui.hotkey('tab')  # Navegar al botón de adjuntar
time.sleep(0.5)
pyautogui.press('space')  # O Enter si necesita
time.sleep(1.5)

# Esperar a que abra el diálogo y pegar la ruta
pyperclip.copy(IMG_PATH)
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)
pyautogui.press('enter')
time.sleep(2)

print('Imagen enviada')
time.sleep(2)

# Adjuntar PDF
print('Adjuntando PDF...')
# Hacer clic nuevamente en adjuntar
pyautogui.hotkey('tab')
time.sleep(0.5)
pyautogui.press('space')
time.sleep(1.5)

pyperclip.copy(PDF_PATH)
pyautogui.hotkey('ctrl', 'v')
time.sleep(1)
pyautogui.press('enter')
time.sleep(2)

print('PDF enviado')
print('Proceso completado.')
