# spec.md - Tech Online

## Contexto

Plataforma web de e-commerce para clientes finales.

**Arquitectura**:
- **tech_prod**: Administra productos (CRUD, proveedores)
- **tech_online**: Gestiona clientes, carritos, pedidos (este proyecto)

**Fuente de productos**: API externa de tech_prod

## Usuarios

- **Visitante**: Navega catálogo, no puede comprar
- **Cliente**: Usuario registrado (Google OAuth), puede comprar
- **Administrador**: Gestiona clientes y pedidos desde Django Admin

## Historias

| ID | Historia |
|----|----------|
| HU-001 | Como visitante, quiero ver catálogo de productos (de tech_prod) |
| HU-002 | Como visitante, quiero ver detalle de producto |
| HU-003 | Como visitante, quiero registrarme con Google |
| HU-004 | Como cliente, quiero iniciar sesión con Google |
| HU-005 | Como cliente, quiero gestionar mi carrito (persiste en DB) |
| HU-006 | Como cliente, quiero enviar mi pedido por WhatsApp |
| HU-007 | Como admin, quiero ver lista de clientes y pedidos |

## Requisitos funcionales (EARS)

| ID | Requisito |
|----|-----------|
| RF-001 | El sistema **debe listar** productos desde API de tech_prod |
| RF-002 | El sistema **debe permitir filtrar** productos por categoría |
| RF-003 | El sistema **debe mostrar** detalle de producto |
| RF-004 | El sistema **debe permitir buscar** productos por texto |
| RF-005 | El sistema **debe permitir registrar** usuario con Google OAuth |
| RF-006 | El sistema **debe autenticar** usuario con Google OAuth |
| RF-007 | El sistema **debe agregar** productos al carrito con cantidad |
| RF-008 | El sistema **debe permitir actualizar** cantidad en carrito |
| RF-009 | El sistema **debe permitir eliminar** productos del carrito |
| RF-010 | El sistema **debe generar** pedido y enviar por WhatsApp |
| RF-011 | El sistema **debe persistir** carrito en DB si usuario autenticado |
| RF-012 | El sistema **debe cargar** productos con infinite scroll |
| RF-013 | El sistema **debe permitir listar** clientes (admin) |
| RF-014 | El sistema **debe permitir listar** pedidos (admin) |

## Casos límite

| ID | Caso | Comportamiento |
|----|------|----------------|
| CL-001 | Producto sin stock (tech_prod) | Mostrar "Sin stock" |
| CL-002 | Carrito vacío | Mostrar mensaje y botón "Ver productos" |
| CL-003 | Usuario no autenticado compra | Redirigir a login con Google |
| CL-004 | Email ya registrado | Mostrar error |
| CL-005 | API de tech_prod no disponible | Mostrar error "Servicio no disponible" |
| CL-006 | WhatsApp no disponible | Mostrar número alternativo |
| CL-007 | Buesqueda sin resultados | Mostrar "No se encontraron productos" |

## Fuera de alcance (v1)

- CRUD de productos (tech_prod)
- Gestión de inventario (tech_prod)
- Pasarela de pagos integrada
- App Android/iOS
- Notificaciones por email

## Criterios de finalizacion

- [ ] Frontend consume productos de tech_prod
- [ ] Backend Django guarda carritos y pedidos en DB propia
- [ ] Autenticació´´³n Google OAuth funcionando
- [ ] Carrito persistente en DB
- [ ] Pedido enviado por WhatsApp
- [ ] Admin puede ver clientes y pedidos
- [ ] Despliegue Linux + Nginx + Gunicorn
- [ ] HTTPS con SSL válido
- [ ] PostgreSQL configurado
- [ ] Backups automáticos

## Dudas abiertas

*(Todas resueltas)*

## Notas de arquitectura

- **Productos**: Solo lectura desde tech_prod (API)
- **Clientes/Carritos/Pedidos**: DB propia de tech_online
- **Admin**: Solo ve clientes y pedidos, NO productos
