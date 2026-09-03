# AGENTS.md - Contexto para Agentes de IA

## Qué es este proyecto

**tech_online** es una plataforma web de e-commerce self-hosted que permite:
- Catálogo de productos
- Carrito de compras
- Gestión de usuarios y autenticación
- Panel de administración

**Stack técnico**:
- Backend: Django + Django REST Framework (API REST)
- Frontend: React + Vite
- Base de datos: PostgreSQL
- Servidor: Linux (Debian/Ubuntu) sin Docker
- Reverse proxy: Nginx
- SSL: Certbot (Let's Encrypt)

## Comandos comunes

### Backend (Django)
```bash
cd backend
python manage.py runserver              # Desarrollo local
python manage.py migrate                # Aplicar migraciones
python manage.py collectstatic          # Recoger estáticos
python manage.py createsuperuser        # Crear admin
gunicorn store_api.wsgi:application     # Producción
```

### Frontend (Vite)
```bash
cd frontend
npm run dev                             # Desarrollo local
npm run build                           # Build producción
npm run preview                         # Preview build
```

### Servidor (producción)
```bash
sudo systemctl restart gunicorn         # Reiniciar backend
sudo systemctl restart nginx            # Reiniciar proxy
sudo certbot renew                      # Renovar SSL
```

## Estilo de código

- **Python**: PEP 8, type hints opcionales, docstrings en funciones públicas
- **JavaScript/TypeScript**: ESLint, Prettier, funciones flecha, async/await
- **Git**: Commits atómicos, mensajes en inglés o español claro
- **APIs**: RESTful, versionado en URL (`/api/v1/`), responses JSON consistentes

## Reglas obligatorias

1. **Nunca** eliminar código existente sin confirmación explícita
2. **Siempre** verificar que los imports estén correctos antes de commitear
3. **Siempre** ejecutar migraciones después de cambiar `models.py`
4. **Siempre** probar endpoints con curl/Postman antes de marcar como completado
5. **Nunca** commitear `.env`, `__pycache__`, `node_modules`, `*.pyc`

## Verificación al terminar

Antes de marcar una tarea como completada:

- [ ] El código compila/sin errores de sintaxis
- [ ] Los imports están correctos
- [ ] Las migraciones se generan y aplican
- [ ] Los endpoints responden (probar con curl)
- [ ] El frontend consume la API sin errores CORS
- [ ] No hay código eliminado sin autorización
- [ ] El commit es atómico y descriptivo

## Archivos clave

| Archivo | Propósito |
|---------|-----------|
| `backend/store_api/settings.py` | Configuración Django (DB, CORS, allowed hosts) |
| `backend/api/views.py` | Endpoints de la API |
| `backend/api/models.py` | Modelos de base de datos |
| `frontend/src/` | Componentes React |
| `frontend/vite.config.js` | Configuración Vite (proxy, build) |
| `.env.example` | Variables de entorno de ejemplo
