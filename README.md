# Turnix

Turnix es una plataforma SaaS para negocios de servicios que centraliza:

- 📅 Online appointments
- 🎟️ Queue management
- 💳 Payments
- 📊 Business reports

Actualmente el proyecto corresponde al MVP Frontend desarrollado con datos simulados (mock data).

---

# Technology Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- next-intl
- Prisma (próximamente)
- SQLite (desarrollo)
- PostgreSQL (producción)

---

# Getting Started

Instalar dependencias:

```bash
pnpm install
```

Iniciar el proyecto:

```bash
pnpm dev
```

Abrir:

```
http://localhost:3000
```

---

# Current Modules

## Administration

```
Dashboard
Appointments
Queue
Customers
Services
Employees
Payments
Reports
Settings
```

---

## Public

```
Booking Landing
```

Ruta:

```
http://localhost:3000/booking
```

---

# Public Booking Landing

La Landing pública permite a un cliente:

- Ver información del negocio
- Consultar los servicios disponibles
- Elegir un profesional (opcional)
- Seleccionar fecha y hora
- Registrar sus datos
- Confirmar una cita

Actualmente todo funciona con datos simulados.

---

# Folder Structure

```
src
│
├── app
│   ├── (dashboard)
│   └── booking
│
├── components
│   ├── business
│   ├── public
│   ├── layout
│   ├── shared
│   └── ui
│
├── config
├── hooks
├── lib
├── mocks
├── providers
├── styles
└── types
```

---

# Internationalization

Idiomas soportados:

- English
- Español

Los textos se encuentran en:

```
messages/
    en.json
    es.json
```

Cuando se agregan nuevos módulos se deben incluir las traducciones correspondientes en ambos archivos.

---

# Mock Data

Mientras se desarrolla el backend, toda la aplicación utiliza información simulada ubicada en:

```
src/mocks
```

Posteriormente estos archivos serán reemplazados por llamadas a la API.

---

# Roadmap

## Phase 1

- ✅ Dashboard
- ✅ Appointments
- ✅ Queue
- ✅ Customers
- ✅ Services
- ✅ Employees
- ✅ Payments
- ✅ Reports
- ✅ Settings
- ✅ Booking Landing

## Phase 2

- Backend
- Authentication
- Prisma
- Database
- REST API

## Phase 3

- Online Payments
- Email Notifications
- SMS Notifications
- Customer Portal
- Calendar Integration

---

# Development

Para agregar un nuevo módulo:

1. Crear la página en:

```
src/app/(dashboard)
```

2. Crear el componente correspondiente en:

```
src/components/business
```

3. Crear los mocks necesarios en:

```
src/mocks
```

4. Agregar traducciones en:

```
messages/en.json
messages/es.json
```

5. Registrar el módulo en:

```
config/navigation.ts
```

---

# License

Copyright © Turnix.
All rights reserved.