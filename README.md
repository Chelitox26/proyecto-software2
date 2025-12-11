# Sistema de Gestión Clínica – Proyecto Final Ingeniería de Software II

Este proyecto corresponde al sistema funcional desarrollado para la asignatura **Ingeniería de Software II**, siguiendo los artefactos generados en Ingeniería de Software I y cumpliendo con los lineamientos técnicos solicitados: arquitectura, patrones, SOLID, trazabilidad y calidad del código.

---

## Cómo ejecutar el proyecto


```bash

# 1) Clonar repositorio
git clone https://github.com/Chelitox26/proyecto-software2.git
cd proyecto-software2

# 2) Instalar dependencias
npm install

# 3) Ejecutar el servidor
npm run dev o npm start


# 4) C4 – Level 1 (Contexto)
[Usuario]
   │ 
   ▼ 
[Sistema de Gestión Clínica ( React)]
   │
   │  CRUD Pacientes, Médicos, Citas, Facturación
   │
   ▼
[Firebase Backend]
      ├── Authentication
      ├── Firestore Database
      └── Firestore Security Rules

# 5) C4 – Level 2 (Contenedores)
    +---------------------------------------------------------------+
|                   Frontend (React SPA)                        |
|  - Páginas: Login, Pacientes, Médicos, Citas, Facturación     |
|  - Componentes: Formularios, Modales, Reutilizables           |
|  - Router: navegación SPA                                     |
|  - Services/: lógica de acceso a datos                        |
+----------------------------|----------------------------------+
                             |
                             ▼
+---------------------------------------------------------------+
|            Backend as a Service (Firebase)                    |
|  Firestore = Persistencia                                     |
|  Authentication = Manejo de usuarios                           |
|                                                               |
|  Colecciones utilizadas:                                      |
|   • pacientes                                                 |
|   • medicos                                                   |
|   • citas                                                     |
|   • facturas                                                  |
|                                                               |
|  Reglas de seguridad + validaciones                           |
+---------------------------------------------------------------+


# 7) Carpetas principales del proyecto 
src/
 ├── pages/
 ├── components/
 ├── services/
 ├── firebase.js
 ├── App.jsx
 ├── App.css