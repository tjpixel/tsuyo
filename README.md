# Tsuyo

Versión web de pruebas de **Tsuyo**, la app de iPhone que sale de NEXA Fit. Sirve para probar y depurar el funcionamiento antes de programar la app nativa.

- `index.html`: estructura y estilos (diseño de iOS)
- `core.js`: lógica compartida con NEXA Fit: catálogo, plantillas, planificación y progresión
- `data.js`: datos, cuentas y sincronización con Supabase
- `app.js`: pantallas
- `schema.sql`: tabla y permisos de Supabase

Sin las claves de Supabase en `data.js`, la app funciona en modo local (datos solo en el móvil).
Plus está simulado: se activa y desactiva desde la app, sin cobro.
