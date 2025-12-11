
---

# ✅ **SOLID.md**  
(Evidencia formal de los principios SOLID dentro del proyecto)

```md
# SOLID.md  
## Evidencia de Principios SOLID aplicados

El sistema implementa varios principios SOLID de forma explícita e implícita.  
Aquí se detalla dónde se observa cada uno en el proyecto.

---

# 1. SRP – Single Responsibility Principle

Cada archivo tiene **una sola responsabilidad**.

### ✔ Ejemplos

### `pacientes.jsx`
Responsabilidad: Mostrar pacientes (UI + estado).

### `nuevoPaciente.jsx`
Responsabilidad: Formulario y registro de pacientes.

### `firebase.js`
Responsabilidad: Inicializar Firebase.

### Beneficio
- Código más legible  
- Facilita mantenimiento  

---

# 2. OCP – Open/Closed Principle

El sistema está **abierto a extensión pero cerrado a modificación**.

### ✔ Implementación
El acceso a datos está aislado detrás de funciones como:

```js
onSnapshot(collection(db, "pacientes"), callback);


# 3. LSP — Liskov Substitution Principle

Los servicios pueden sustituirse por mocks en pruebas unitarias.

pacientesService.listenPacientes = mockPacientesService;


# 4. ISP — Interface Segregation Principle

Se dividen responsabilidades por módulos:
  services/
  pacientesService.js
  medicosService.js
  citasService.js
  facturasService.js



# 5. DIP — Dependency Inversion Principle

Las vistas dependen de una abstracción, no de Firestore.

Ejemplo:

getPacientes()

addDoc(collection(db, "pacientes"), data);
pacientesService.add(data);