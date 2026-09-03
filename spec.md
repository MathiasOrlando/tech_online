# spec.md

## Contexto

Plataforma web de e-commerce auto-alojada para venta online sin depender de SaaS externos.

**Usuarios**:
- **Visitante**: Navega catálogo, no puede comprar
- **Cliente**: Usuario registrado (Google OAuth), puede comprar
- **Administrador**: Gestiona productos y usuarios

## Historias

| ID | Historia |
|----|----------|
| HU-001 | Como visitante, quiero ver catálogo de productos |
| HU-002 | Como visitante, quiero ver detalle de producto |
| HU-003 | Como visitante, quiero registrarme con Google |
| HU-004 | Como cliente, quiero iniciar sesión con Google |
| HU-005 | Como cliente, quiero gestionar mi carrito (persiste si autenticado) |
| HU-006 | Como admin, quiero gestionar productos |
| HU-007 | Como cliente, quiero enviar mi pedido por WhatsApp para coordinar pago |

## Requisitos funcionales (EARS)

| ID | Requisito |
|----|-----------|
| RF-001 | El sistema **debe listar** productos activos ordenados por fecha |
| RF-002 | El sistema **debe permitir filtrar** productos por categoría |
| RF-003 | El sistema **debe mostrar** detalle de producto (nombre, descripción, precio, imagen, stock) |
| RF-004 | El sistema **debe permitir registrar** usuario con Google OAuth |
| RF-005 | El sistema **debe autenticar** usuario con Google OAuth |
| RF-006 | El sistema **debe agregar** productos al carrito con cantidad |
| RF-007 | El sistema **debe permitir actualizar** cantidad en carrito |
| RF-008 | El sistema **debe permitir eliminar** productos del carrito |
| RF-009 | El sistema **debe permitir crear** productos (admin) |
| RF-010 | El sistema **debe permitir editar** productos (admin) |
| RF-011 | El sistema **debe permitir eliminar** productos (admin) |
| RF-012 | El sistema **debe permitir buscar** productos por texto en nombre y descripción |
| RF-013 | El sistema **debe generar** pedido y enviar por WhatsApp para coordinar pago |
| RF-014 | El sistema **debe persistir** carrito en DB si usuario autenticado, localStorage si no |
| RF-015 | El sistema **debe cargar** productos con infinite scroll (sin paginació´´´n tradicional) |

## Casos límite

| ID | Caso | Comportamiento |
|----|------|----------------|
| CL-001 | Producto sin stock | Mostrar "Sin stock", deshabilitar compra |
| CL-002 | Carrito vacío | Mostrar mensaje y botón "Ver productos" |
| CL-003 | Usuario no autenticado compra | Redirigir a login con Google |
| CL-004 | Email ya registrado | Mostrar error |
| CL-005 | Contraseñ´´´a incorrecta | Mostrar error |
| CL-006 | Producto eliminado en carrito | Mostrar error "No disponible" |
| CL-007 | Precio negativo/cero | Validar precio > 0 |
| CL-008 | Stock negativo | Validar stock >= 0 |
| CL-009 | Usuario sin cuenta Google | Mostrar opción de crear cuenta |
| CL-010 | WhatsApp no disponible | Mostrar número de teléfono alternativo |
| CL-011 | Buesqueda sin resultados | Mostrar mensaje "No se encontraron productos" |

## Fuera de alcance (v1)

- Pasarela de pagos integrada
- App Android/iOS
- Notificaciones por email
- Reseñ´´´as/calificaciones
- Cupones
- Meltiples direcciones
- Historial de pedidos detallado
- Upload de imágenes de perfil

## Criterios de finalizacion

- [ ] Backend Django API REST funcional
- [ ] Frontend React consumiendo API
- [ ] Autenticacioo0n Google OAuth funcionando
- [ ] CRUD productos completo
- [ ] Carrito hibrido (localStorage + DB)
- [ ] Be0usqueda por texto + filtros
- [ ] Infinite scroll en listado de productos
- [ ] Pedido enviado por WhatsApp
- [ ] Despliegue Linux + Nginx + Gunicorn
- [ ] HTTPS con SSL va0lido
- [ ] PostgreSQL configurado
- [ ] Backups automa0ticos
- [ ] Documentacioo0n en README.md

## Dudas abiertas

*(Todas resueltas)*
