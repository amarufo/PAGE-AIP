import pyautogui
import time
import pyperclip

# Configuración
NUM_MENSAJES = 10
NUMERO = '+51930123005'
MENSAJE = 'Hola, este es un mensaje automático de prueba.'
TIEMPO_ENTRE_MENSAJES = 2  # segundos

print('Asegúrate de tener la ventana de WhatsApp Web activa y visible en tu escritorio.')
input('Presiona Enter cuando estés listo para comenzar...')

for i in range(NUM_MENSAJES):
    pyautogui.hotkey('ctrl', 'alt', 'n')
    time.sleep(0.5)
    pyperclip.copy(NUMERO)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    time.sleep(1)

    # Paso 2: Escribir el mensaje
    pyperclip.copy(MENSAJE)
    pyautogui.hotkey('ctrl', 'v')
    time.sleep(0.5)
    pyautogui.press('enter')
    print(f'Mensaje {i+1} enviado a {NUMERO}')
    time.sleep(TIEMPO_ENTRE_MENSAJES)

print('Proceso terminado.')
