# PATTERNS.md  
## Patrones de Diseño Implementados en el Sistema de Gestión Clínica

Este documento describe los patrones de diseño aplicados en el proyecto, su propósito, el problema que resuelven y la ubicación exacta en el código.

---

# 1. OBSERVER PATTERN (Frontend – React + Firebase)

### 📌 Problema  
El sistema necesita **actualizar datos en tiempo real** sin recargar la página (pacientes, citas, médicos y facturación).

### 🎯 Solución: Observer Pattern  
Firestore implementa un mecanismo de suscripción mediante **onSnapshot()**, permitiendo que la UI reaccione automáticamente cuando los datos cambian.

### ✔ Beneficios  
- Actualización en tiempo real.  
- Menos recargas.  
- Estado siempre sincronizado.

### 📍 Implementación en el proyecto  
#### Ejemplo: pacientes.jsx  
```js
useEffect(() => {
  const unsub = onSnapshot(collection(db, "pacientes"), (snap) => {
    const lista = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPacientes(lista);
  });
  return () => unsub();
}, []);


2. Repository Pattern (Backend abstraído)
Problema:

Evitar que React dependa directamente de Firestore.

Implementación:

En services/ cada entidad tiene su repositorio. Pantallas que lo usan: Pacientes, Médicos, Citas, Facturación.


3. Repository Pattern (Backend abstraído)
Problema:

Evitar que React dependa directamente de Firestore.

Implementación:

En services/ cada entidad tiene su repositorio. 


4. Facade Pattern (Firebase)
Problema:

Firebase requiere múltiples inicializaciones complicadas.

Solución:

Un solo archivo firebase.js expone todo:
export const db = getFirestore(app);
export const auth = getAuth(app);


5. Factory Method (Frontend)
Problema:

Muchas entidades requieren valores iniciales consistentes.

Ejemplo en nuevaFactura.jsx:

const nuevaFactura = {
  numero: "",
  monto: 0,
  fecha: new Date().toISOString(),
  estado: "Pendiente"
};


6. COMMAND PATTERN (Opcional – Botones de acción)
 Problema

Acciones como cancelar cita, marcar pagada una factura, etc., deben estar desacopladas del UI.

Cada botón ejecuta una función concreta que actúa como comando.