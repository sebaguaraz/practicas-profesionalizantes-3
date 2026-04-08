# Requerimientos - Sistema de Gestión de Stock de Reciclaje

## 1. Descripción del Proyecto

Sistema de gestión de información para la administración de stock de materiales/objetos en una planta de reciclaje. La planta adquiere materiales, los almacena, y los revende a fábricas procesadoras.

---

## 2. Requerimientos Funcionales

### 2.1 Gestión de Catálogo de Materiales

**RF-1.1:** El sistema debe mantener un catálogo de materiales reciclables que incluya:
- Vidrio
- Hierro
- Aluminio
- Cobre
- Bronce
- Cartón
- Papel Blanco
- Tapas de plástico
- Aceite de girasol
- Baterías de vehículos

**RF-1.2:** El sistema debe permitir la incorporación de nuevos tipos de materiales en el futuro.

**RF-1.3:** Cada material debe tener asociada su unidad de medida:
- **Baterías de vehículos:** unidades
- **Sólidos:** kilogramos (kg)
- **Fluidos:** metros cúbicos (m³)

### 2.2 Consulta de Inventario

**RF-2.1:** Al abrir la aplicación, el sistema debe mostrar un listado/tabla con todos los materiales en stock.

**RF-2.2:** El listado debe mostrar:
- Nombre del material
- Cantidad actual en stock
- Unidad de medida correspondiente

### 2.3 Operaciones sobre el Stock

**RF-3.1:** El sistema debe permitir registrar **entrada de materiales (compra)** con:
- Selección del material
- Cantidad a ingresar
- Validación de cantidad positiva

**RF-3.2:** El sistema debe permitir registrar **salida de materiales (venta)** con:
- Selección del material
- Cantidad a quitar
- Validación de cantidad positiva
- Validación de disponibilidad en stock

**RF-3.3:** El sistema debe permitir **consultar el historial o estado actual** del stock de cada material.

### 2.4 Restricciones de Integridad

**RF-4.1:** El sistema **no debe permitir stock negativo**. Toda salida de material debe validar que exista cantidad disponible.

**RF-4.2:** El sistema **no debe permitir duplicación de materiales** en el catálogo.

**RF-4.3:** El sistema **debe validar que los montos** ingresados en las operaciones sean valores numéricos válidos y positivos.

**RF-4.4:** El stock debe ser **consistente y persistente** en todas las operaciones.

---

## 3. Requerimientos No Funcionales

### 3.1 Persistencia de Datos

**RNF-1.1:** Los datos del stock deben persistir en una **base de datos relacional**.

**RNF-1.2:** Se utilizará una **única tabla** para gestionar todo el stock de materiales (sin redundancias).

### 3.2 Interfaz de Usuario

**RNF-2.1:** La interfaz gráfica debe ser clara y accesible.

**RNF-2.2:** Debe mostrar las operaciones mínimas requeridas de forma evidente.

**RNF-2.3:** Puede utilizarse cualquier tecnología (HTML/CSS/JS recomendado si no hay experiencia previa).

### 3.3 Backend

**RNF-3.1:** El servidor puede desarrollarse en cualquier lenguaje de programación.

**RNF-3.2:** Debe permitir conectar con la interfaz gráfica del cliente.

**RNF-3.3:** Debe implementar la lógica de validaciones y restricciones de negocio.

---

## 4. Casos de Uso Identificados

### CU-1: Consultar Estado del Inventario
**Actor:** Usuario (empleado de la planta)
**Precondición:** La aplicación está abierta
**Flujo Principal:**
1. El usuario abre la aplicación
2. El sistema carga y muestra el listado actual de todos los materiales
3. El usuario visualiza nombre, cantidad y unidad de medida de cada material

### CU-2: Registrar Compra de Material
**Actor:** Usuario
**Precondición:** El material existe en el catálogo
**Flujo Principal:**
1. El usuario selecciona la opción "Comprar" o "Ingresar material"
2. El usuario selecciona el tipo de material
3. El usuario ingresa la cantidad a comprar (número positivo)
4. El sistema valida la cantidad
5. El sistema incrementa el stock del material
6. El sistema muestra confirmación

### CU-3: Registrar Venta de Material
**Actor:** Usuario
**Precondición:** El material existe en el catálogo y hay cantidad disponible
**Flujo Principal:**
1. El usuario selecciona la opción "Vender" o "Salida de material"
2. El usuario selecciona el tipo de material
3. El usuario ingresa la cantidad a vender (número positivo)
4. El sistema valida que la cantidad sale no exceda el stock disponible
5. El sistema decrementa el stock del material
6. El sistema muestra confirmación

**Flujo Alternativo:**
- If: Cantidad a vender > cantidad disponible
- Then: El sistema rechaza la operación y muestra mensaje de error

### CU-4: Agregar Nuevo Tipo de Material (Extensible)
**Actor:** Usuario (administrador)
**Precondición:** El material no existe en catálogo
**Flujo Principal:**
1. El usuario selecciona opción de nuevo material (futuro)
2. Ingresa nombre y unidad de medida
3. El sistema valida que no sea duplicado
4. El sistema registra el nuevo material con stock inicial en 0



