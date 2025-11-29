#!/usr/bin/env python3
"""
Herramienta para reemplazo en masa:
- Busca cadenas entre comillas (" o ') que contengan 'wa.me/51930123005'
- Reemplaza el contenido dentro de las comillas con 'mailto:amaruf9523@gmail.com'

Características:
- Dry-run (por defecto) -> muestra los archivos y líneas que cambiarían
- Backup: .bak por defecto si --apply
- Extensiones filtrables (por defecto: html, htm, js, css)
- Opcional: commit automático si --git-commit

Usage examples:
    python tools/replace_wa_with_mailto.py --path . --dry-run
    python tools/replace_wa_with_mailto.py --path pages --apply --backup
    python tools/replace_wa_with_mailto.py --path . --apply --git-commit --git-message "Replace wa.me links with mailto"
"""
import argparse
import os
import re
import shutil
import sys
import subprocess

PATTERN = re.compile(r'(["\'])([^"\']*wa\.me/51930123005[^"\']*)(["\'])', flags=re.IGNORECASE)
REPLACEMENT_VALUE = 'mailto:amaruf9523@gmail.com'

DEFAULT_EXTENSIONS = ['.html', '.htm', '.js', '.css']


def find_files(root, extensions):
    for dirpath, dirnames, filenames in os.walk(root):
        for name in filenames:
            ext = os.path.splitext(name)[1].lower()
            if ext in extensions:
                yield os.path.join(dirpath, name)


def process_file(path, apply_changes=False, backup=True):
    changed = False
    matches = []
    with open(path, 'r', encoding='utf-8', errors='replace') as f:
        content = f.read()

    def repl(match):
        # Keep the same quote char
        quote = match.group(1)
        return f"{quote}{REPLACEMENT_VALUE}{quote}"

    new_content, count = PATTERN.subn(repl, content)
    if count > 0:
        changed = True
        # Extract sample matches for preview
        for m in PATTERN.finditer(content):
            matches.append((m.group(0), f'"{REPLACEMENT_VALUE}"'))

    if changed and apply_changes:
        # Backup before writing
        if backup:
            bak = path + '.bak'
            shutil.copy2(path, bak)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)

    return changed, count, matches


def git_commit(files, message):
    try:
        # Stage files
        subprocess.run(['git', 'add'] + files, check=True)
        subprocess.run(['git', 'commit', '-m', message], check=True)
        return True
    except subprocess.CalledProcessError as e:
        print('[ERROR] Git commit failed:', e)
        return False


def main():
    parser = argparse.ArgumentParser(description='Reemplaza referencias wa.me/51930123005 entre comillas a mailto:amaruf9523@gmail.com')
    parser.add_argument('--path', default='.', help='Directorio raíz donde buscar')
    parser.add_argument('--extensions', default=','.join(DEFAULT_EXTENSIONS), help='Extensiones a incluir, separadas por coma')
    parser.add_argument('--dry-run', dest='dry_run', action='store_true', help='Solo mostrar qué se cambiaría')
    parser.add_argument('--apply', dest='apply', action='store_true', help='Aplicar cambios en archivos (hace backup .bak)')
    parser.add_argument('--backup', dest='backup', action='store_true', help='Crear archivo de backup .bak antes de sobrescribir (solo con --apply)')
    parser.add_argument('--git-commit', dest='git_commit', action='store_true', help='Si se usa --apply, hará git commit de los archivos modificados (repository debe estar inicializado)')
    parser.add_argument('--git-message', dest='git_message', default='Replace wa.me links with mailto', help='Mensaje para el commit de git')
    args = parser.parse_args()

    extensions = [e if e.startswith('.') else '.' + e for e in args.extensions.split(',') if e.strip()]
    print(f'Buscando en: {args.path} con extensiones: {extensions}')

    files_changed = []
    total_replacements = 0

    for file_path in find_files(args.path, extensions):
        changed, count, matches = process_file(file_path, apply_changes=args.apply, backup=args.backup)
        if changed:
            total_replacements += count
            files_changed.append(file_path)
            print(f'[FOUND] {file_path} -> {count} reemplazo(s)')
            if args.dry_run or not args.apply:
                # Print sample matches
                for old, new in matches[:5]:
                    print(f'    - {old}  =>  {new}')

    if not files_changed:
        print('No se encontraron cadenas para reemplazar.')
        return

    print('\nResumen:')
    print(f'  Archivos que se cambiarían: {len(files_changed)}')
    print(f'  Reemplazos totales: {total_replacements}')

    if args.apply and not args.dry_run:
        # If we applied and want to commit
        if args.git_commit:
            # Only commit modified files (excluding backups)
            commit_success = git_commit(files_changed, args.git_message)
            if commit_success:
                print('[OK] Commit realizado con éxito.')
            else:
                print('[WARN] Commit falló: revisa el estado de git')
        else:
            print('[OK] Cambios aplicados (backups creados si --backup).')
    else:
        print('\nEjecute con --apply --backup para aplicar los cambios y crear respaldos (o --git-commit para commitear).')

if __name__ == '__main__':
    main()
