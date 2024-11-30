import json
import os
from datetime import datetime, timedelta

# Constantes
META_AHORRO = 10000
MESES_TOTALES = 18
ARCHIVO_DATOS = 'datos_ahorro.json'

def cargar_datos():
    if os.path.exists(ARCHIVO_DATOS):
        with open(ARCHIVO_DATOS, 'r') as archivo:
            return json.load(archivo)
    return {"ahorros_actuales": 0, "fecha_inicio": datetime.now().isoformat()}

def guardar_datos(datos):
    with open(ARCHIVO_DATOS, 'w') as archivo:
        json.dump(datos, archivo)

def actualizar_ahorros(datos):
    nuevos_ahorros = float(input("Ingresa tus ahorros actuales: $"))
    datos['ahorros_actuales'] = nuevos_ahorros
    guardar_datos(datos)
    print(f"Se han guardado ${nuevos_ahorros:.2f} como tus ahorros actuales.")

def mostrar_progreso(datos):
    ahorros_actuales = datos['ahorros_actuales']
    progreso = (ahorros_actuales / META_AHORRO) * 100
    monto_restante = META_AHORRO - ahorros_actuales
    
    fecha_inicio = datetime.fromisoformat(datos['fecha_inicio'])
    fecha_actual = datetime.now()
    meses_transcurridos = (fecha_actual.year - fecha_inicio.year) * 12 + fecha_actual.month - fecha_inicio.month
    meses_restantes = max(0, MESES_TOTALES - meses_transcurridos)

    objetivo_mensual = META_AHORRO / MESES_TOTALES

    print(f"\nMeta de Ahorro: ${META_AHORRO} en {MESES_TOTALES} meses")
    print(f"Objetivo mensual: ${objetivo_mensual:.2f}")
    print(f"Progreso: {progreso:.2f}%")
    print(f"Has ahorrado: ${ahorros_actuales:.2f} de ${META_AHORRO}")
    print(f"Te faltan: ${monto_restante:.2f} en {meses_restantes} meses")

def mostrar_consejos():
    consejos = [
        "Crea un presupuesto mensual y apégate a él",
        "Reduce gastos innecesarios",
        "Busca formas de aumentar tus ingresos",
        "Automatiza tus ahorros con transferencias programadas",
        "Revisa tu progreso regularmente y ajusta según sea necesario"
    ]
    print("\nConsejos para alcanzar tu meta:")
    for consejo in consejos:
        print(f"- {consejo}")

def main():
    datos = cargar_datos()
    
    while True:
        print("\n--- Seguimiento de Ahorros ---")
        print("1. Ver progreso")
        print("2. Actualizar ahorros")
        print("3. Ver consejos")
        print("4. Salir")
        
        opcion = input("Selecciona una opción: ")
        
        if opcion == '1':
            mostrar_progreso(datos)
        elif opcion == '2':
            actualizar_ahorros(datos)
        elif opcion == '3':
            mostrar_consejos()
        elif opcion == '4':
            print("¡Gracias por usar el Seguimiento de Ahorros!")
            break
        else:
            print("Opción no válida. Por favor, intenta de nuevo.")

if __name__ == "__main__":
    main()