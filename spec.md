# spec.md

## Contexto

Plataforma web de e-commerce auto-alojada para venta online sin depender de SaaS externos.

**Usuarios**:
- **Visitante**: Navega catálogo, no puede comprar
- **Cliente**: Usuario registrado, puede comprar
- **Administrador**: Gestiona productos y usuarios

## Historias

| ID | Historia |
|----|----------|
| HU-001 | Como visitante, quiero ver catálogo de productos |
| HU-002 | Como visitante, quiero ver detalle de producto |
| HU-003 | Como visitante, quiero registrarme |
| HU-004 | Como cliente, quiero iniciar sesión |
| HU-005 | Como cliente, quiero gestionar mi carrito |
| HU-006 | Como admin, quiero gestionar productos |

## Requisitos funcionales (EARS)

| ID | Requisito |
|----|-----------|
| RF-001 | El sistema **debe listar** productos activos ordenados por fecha |
| RF-002 | El sistema **debe permitir filtrar** productos por categoría |
| RF-003 | El sistema **debe mostrar** detalle de producto (nombre, descripción, precio, imagen, stock) |
| RF-004 | El sistema **debe permitir registrar** usuario con email, contraseña, nombre, apellido |
| RF-005 | El sistema **debe autenticar** usuario con email y contraseña |
| RF-006 | El sistema **debe agregar** productos al carrito con cantidad |
| RF-007 | El sistema **debe permitir actualizar** cantidad en carrito |
| RF-008 | El sistema **debe permitir eliminar** productos del carrito |
| RF-009 | El sistema **debe permitir crear** productos (admin) |
| RF-010 | El sistema **debe permitir editar** productos (admin) |
| RF-011 | El sistema **debe permitir eliminar** productos (admin) |

## Casos límite

| ID | Caso | Comportamiento |
|----|------|----------------|
| CL-001 | Producto sin stock | Mostrar "Sin stock", deshabilitar compra |
| CL-002 | Carrito vacío | Mostrar mensaje y botón "Ver productos" |
| CL-003 | Usuario no autenticado compra | Redirigir a login |
| CL-004 | Email ya registrado | Mostrar error |
| CL-005 | Contraseña incorrecta | Mostrar error |
| CL-006 | Producto eliminado en carrito | Mostrar error "No disponible" |
| CL-007 | Precio negativo/cero | Validar precio > 0 |
| CL-008 | Stock negativo | Validar stock >= 0 |

## Fuera de alcance (v1)

- Pasarela de pagos
- App Android/iOS
- Notificaciones por email
- Reseñas/calificaciones
- Cupones
- Múltiples direcciones
- Historial de pedidos detallado

## Criterios de finalización

- [ ] Backend Django API REST funcional
- [ ] Frontend React consumiendo API
- [ ] Autenticación funcionando
- [ ] CRUD productos completo
- [ ] Carrito persistente en DB
- [ ] Despliegue Linux + Nginx + Gunicorn
- [ ] HTTPS con SSL válido
- [ ] PostgreSQL configurado
- [ ] Backups automáticos
- [ ] Documentación en README.md

## Dudas abiertas

1. ¿Pasarela de pagos en v1 o solo simulación?
2. ¿Usuarios pueden subir imágenes de perfil?
3. ¿Búsqueda por texto o solo filtro por categoría?
4. ¿Carrito persistente (DB) o solo sesión (localStorage)?
5. ¿Paginación en productos? ¿Cuántos por página?
