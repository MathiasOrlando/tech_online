# AGENTS.md

## Contexto

Eres un asistente de programación trabajando en **tech_online**, una plataforma web de e-commerce self-hosted.

**Stack**:
- Backend: Django + Django REST Framework (Python 3.x)
- Frontend: React + Vite (JavaScript/TypeScript)
- Base de datos: PostgreSQL
- Servidor: Linux (Debian/Ubuntu) sin Docker
- Reverse proxy: Nginx + Gunicorn
- SSL: Certbot (Let's Encrypt)

## Comandos

### Backend
```bash
cd backend
python manage.py runserver          # Desarrollo
python manage.py migrate            # Migrar DB
python manage.py collectstatic      # Estáticos
gunicorn store_api.wsgi:application # Producción
```

### Frontend
```bash
cd frontend
npm run dev     # Desarrollo
npm run build   # Producción
```

### Servidor
```bash
sudo systemctl restart gunicorn
sudo systemctl restart nginx
sudo certbot renew
```

## Estilo

- **Python**: PEP 8, type hints, docstrings
- **JavaScript**: ESLint, Prettier, async/await
- **Git**: Commits atómicos, mensajes claros
- **API**: RESTful, versionado `/api/v1/`, JSON consistente

## Reglas

1. Nunca eliminar código sin confirmación
2. Verificar imports antes de commitear
3. Ejecutar migraciones tras cambiar `models.py`
4. Probar endpoints con curl/Postman
5. No commitear `.env`, `__pycache__`, `node_modules`

## Verificación

Antes de finalizar:

- [ ] Código sin errores
- [ ] Imports correctos
- [ ] Migraciones aplicadas
- [ ] Endpoints responden
- [ ] Frontend sin errores CORS
- [ ] Commit atómico y descriptivo

## Archivos clave

| Archivo | Propósito |
|---------|-----------|
| `backend/store_api/settings.py` | Configuración Django |
| `backend/api/views.py` | Endpoints API |
| `backend/api/models.py` | Modelos DB |
| `frontend/src/` | Componentes React |
| `frontend/vite.config.js` | Configuración Vite |
| `.env.example` | Variables de entorno
