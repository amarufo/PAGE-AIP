import re
from pathlib import Path
import sys

def extract_peruvian_numbers(html_content):
    """
    Extrae números de teléfono peruanos del contenido HTML.
    Busca secuencias que comiencen con "+51" o "51" seguidas de 9 dígitos,
    ignorando espacios y caracteres de formateo en medio.
    
    Args:
        html_content (str): Contenido HTML a analizar
        
    Returns:
        list: Lista de números encontrados
    """
    
    # Patrón regex que captura:
    # - Opcionalmente: "+51" o "51"
    # - Seguido de 9 dígitos con posibles espacios/guiones en medio
    pattern = r'(\+51|51)\s*(\d[\s\-]?\d[\s\-]?\d[\s\-]?\d[\s\-]?\d[\s\-]?\d[\s\-]?\d[\s\-]?\d[\s\-]?\d)'
    
    matches = re.findall(pattern, html_content)
    
    # Procesar matches para obtener números limpios
    phone_numbers = []
    for prefix, digits in matches:
        # Remover espacios y guiones de los dígitos
        clean_digits = re.sub(r'[\s\-]', '', digits)
        # Construir número completo
        full_number = prefix + clean_digits
        phone_numbers.append(full_number)
    
    return phone_numbers


def analyze_html_file(file_path):
    """
    Analiza un archivo HTML y extrae números de teléfono.
    
    Args:
        file_path (str): Ruta del archivo HTML
        
    Returns:
        dict: Información del análisis
    """
    
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
    except UnicodeDecodeError:
        # Intentar con otra codificación si falla UTF-8
        with open(file_path, 'r', encoding='latin-1') as file:
            content = file.read()
    
    # Extraer números
    numbers = extract_peruvian_numbers(content)
    
    # Obtener números únicos
    unique_numbers = list(set(numbers))
    unique_numbers.sort()
    
    return {
        'file': file_path,
        'total_matches': len(numbers),
        'unique_numbers': len(unique_numbers),
        'numbers': unique_numbers,
        'all_matches': numbers
    }


def main():
    """
    Función principal - procesa archivos HTML desde línea de comandos.
    Uso: python extract_phone_numbers.py <archivo.html> [archivo2.html ...]
    """
    
    # Archivos fijos
    html_files = [
        r"C:\Users\SystemPeru\Downloads\GRUPO GENERAL.htm",
        r"C:\Users\SystemPeru\Downloads\(17) WhatsApp.htm"
    ]

    all_results = []
    for file_arg in html_files:
        file_path = Path(file_arg)
        if not file_path.exists():
            print(f"\n❌ Archivo no encontrado: {file_arg}")
            continue
        print(f"\n{'='*60}")
        print(f"Analizando: {file_arg}")
        print(f"{'='*60}")
        result = analyze_html_file(str(file_path))
        print(f"\n📊 Resultados:")
        print(f"   • Total de coincidencias: {result['total_matches']}")
        print(f"   • Números únicos: {result['unique_numbers']}")
        lista_numeros = ', '.join(result['numbers']) if result['numbers'] else 'Ninguno'
        print(f"   • Números encontrados: {lista_numeros}")
        if result['unique_numbers'] > 0:
            print(f"\n📱 Números encontrados:")
            for num in result['numbers']:
                print(f"   • {num}")
        else:
            print("\n   ℹ️  No se encontraron números de teléfono.")
        # Guardar resultados para CSV
        for num in result['numbers']:
            all_results.append({
                'archivo': file_path.name,
                'numero': num
            })

    # Guardar en CSV
    import csv
    csv_file = Path(__file__).parent / 'numeros_extraidos.csv'
    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['archivo', 'numero'])
        writer.writeheader()
        for row in all_results:
            writer.writerow(row)
    print(f"\n✅ Resultados guardados en: {csv_file}\n")


if __name__ == "__main__":
    main()
