import pyautogui
import pyperclip
import time
import datetime
import csv

# Leer números desde CSV y eliminar duplicados manteniendo orden
csv_path = r'Z:\04_PAGINA-PERSONAL\brochure\prueba_numeros.csv'
NUMEROS = []
numeros_vistos = set()

def limpiar_numero(numero_raw):
    """Limpia el número: remueve espacios, guiones y normaliza el formato"""
    # Remover espacios y guiones
    numero = numero_raw.strip().replace('-', '')
    # Asegurar que empiece con +51
    if numero.startswith('+51'):
        return numero
    elif numero.startswith('51'):
        return '+' + numero
    else:
        return numero

with open(csv_path, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        numero_raw = row.get('numero', '').strip()
        if numero_raw:
            numero_limpio = limpiar_numero(numero_raw)
            if numero_limpio and numero_limpio not in numeros_vistos:
                NUMEROS.append(numero_limpio)
                numeros_vistos.add(numero_limpio)

NUM_TOTAL_NUMEROS = len(NUMEROS)

print(f'📞 Total de números únicos cargados: {NUM_TOTAL_NUMEROS}')
print(f'📊 Se enviarán mensajes a todos ellos')
print(f'✓ Primeros 5 números: {NUMEROS[:5]}')
print(f'✓ Últimos 5 números: {NUMEROS[-5:]}\n')

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
COORD_NUEVO_MENSAJE = (-857, 1034)        # Botón nuevo mensaje
COORD_ADJUNTAR_GENERAL = (-752, 1790)     # Botón adjuntar general
COORD_ADJUNTAR_DOCUMENTO = (-749, 1504)   # Botón adjuntar documento
COORD_ADJUNTAR_IMAGEN = (-749, 1535)      # Botón adjuntar imagen

# Tiempos promedio por acción
TIEMPO_POR_MENSAJE = (0.2 + 0.7 + 0.7 + 0.2 + 0.5 + 0.2 + 0.2 + 0.2 + 0.7 + 
                      0.2 + 0.5 + 0.2 + 0.2 + 0.2 + 0.7 + 0.2 + 0.2 + 0.7)

tiempo_total_estimado = TIEMPO_POR_MENSAJE * NUM_TOTAL_NUMEROS
minutos = int(tiempo_total_estimado // 60)
segundos = int(tiempo_total_estimado % 60)

print(f'\n⏱️  Tiempo estimado total: {minutos}m {segundos}s')
print(f'📊 Velocidad aproximada: {TIEMPO_POR_MENSAJE:.1f} segundos por mensaje\n')

print('Asegúrate de tener WhatsApp en tu PC abierto.')
input('Presiona Enter cuando estés listo para comenzar...')

time.sleep(5)
start_time = datetime.datetime.now()

numeros_procesados = []
numeros_fallidos = []

for idx, numero in enumerate(NUMEROS, 1):
    try:
        pyautogui.press('esc')
        # 1. Hacer clic en nuevo mensaje
        pyautogui.click(COORD_NUEVO_MENSAJE[0], COORD_NUEVO_MENSAJE[1])
        time.sleep(0.7)
        
        # 2. Pegar número y presionar Enter
        pyperclip.copy(numero)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(0.5)
        pyautogui.press('enter')
        pyautogui.press('enter')        
        time.sleep(0.7)
        
        # 3. Adjuntar imagen
        pyautogui.click(COORD_ADJUNTAR_GENERAL[0], COORD_ADJUNTAR_GENERAL[1])
        time.sleep(0.7)
        pyautogui.click(COORD_ADJUNTAR_IMAGEN[0], COORD_ADJUNTAR_IMAGEN[1])
        time.sleep(0.5)
        
        pyperclip.copy(IMG_PATH)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(0.7)
        pyautogui.press('enter')
        time.sleep(0.7)
        pyautogui.press('enter')
        time.sleep(0.7)
        
        # 4. Adjuntar documento
        pyautogui.click(COORD_ADJUNTAR_GENERAL[0], COORD_ADJUNTAR_GENERAL[1])
        time.sleep(0.7)
        pyautogui.click(COORD_ADJUNTAR_DOCUMENTO[0], COORD_ADJUNTAR_DOCUMENTO[1])
        time.sleep(0.5)
        
        pyperclip.copy(PDF_PATH)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(0.7)
        pyautogui.press('enter')
        time.sleep(0.7)
        pyautogui.press('enter')
        time.sleep(0.7)
        
        # 5. Pegar mensaje y enviar
        pyperclip.copy(MENSAJE)
        pyautogui.hotkey('ctrl', 'v')
        time.sleep(0.7)
        pyautogui.press('enter')
        time.sleep(0.7)
        
        numeros_procesados.append(numero)
        
        # Mostrar progreso cada mensaje
        elapsed_so_far = datetime.datetime.now() - start_time
        print(f'[{idx}/{NUM_TOTAL_NUMEROS}] ✓ {numero} | Tiempo: {elapsed_so_far}')
        
        # Cerrar chat
        time.sleep(0.7)
        pyautogui.press('esc')
        
    except Exception as err:
        numeros_fallidos.append((numero, str(err)))
        elapsed_so_far = datetime.datetime.now() - start_time
        print(f'[{idx}/{NUM_TOTAL_NUMEROS}] ✗ {numero} (Error) | Tiempo: {elapsed_so_far}')
        pyautogui.press('esc')
        time.sleep(0.5)

end_time = datetime.datetime.now()
elapsed = end_time - start_time

print('\n' + '='*80)
print('✅ RESUMEN DEL PROCESO')
print('='*80)
print(f'\n📊 Estadísticas generales:')
print(f'   • Total de números: {NUM_TOTAL_NUMEROS}')
print(f'   • Mensajes enviados: {len(numeros_procesados)}')
print(f'   • Números fallidos: {len(numeros_fallidos)}')
print(f'   • Tasa de éxito: {(len(numeros_procesados)/NUM_TOTAL_NUMEROS*100):.1f}%')

print(f'\n⏱️  Tiempos:')
print(f'   • Tiempo total: {elapsed}')
print(f'   • Tiempo promedio por número: {(elapsed.total_seconds() / NUM_TOTAL_NUMEROS):.2f}s')

print(f'\n📞 Números procesados exitosamente ({len(numeros_procesados)}):')
for i, numero in enumerate(numeros_procesados, 1):
    if i % 10 == 0 or i == len(numeros_procesados):
        print(f'   [{i:3d}] {numero}')
    if i == 20:
        print(f'   ... ({len(numeros_procesados) - 40} más) ...')
        for j in range(len(numeros_procesados) - 20, len(numeros_procesados)):
            print(f'   [{j+1:3d}] {numeros_procesados[j]}')
        break

if numeros_fallidos:
    print(f'\n❌ Números con fallos ({len(numeros_fallidos)}):')
    for numero, error in numeros_fallidos[:10]:
        print(f'   • {numero}: {error[:50]}...')
    if len(numeros_fallidos) > 10:
        print(f'   ... y {len(numeros_fallidos) - 10} más')

print('\n' + '='*80)
