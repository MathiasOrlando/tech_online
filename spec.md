# Especificación del Proyecto - tech_online

## Contexto

Plataforma web de e-commerce auto-alojada que permite a usuarios:
- Ver catálogo de productos
- Agregar productos al carrito
- Registrarse e iniciar sesión
- Gestionar perfil de usuario

**Objetivo**: Proveer una solución self-hosted para venta online sin depender de SaaS externos.

## Usuarios

| Rol | Descripción |
|-----|-------------|
| **Visitante** | Navega catálogo, ve productos, no puede comprar |
| **Cliente** | Usuario registrado, puede agregar al carrito y comprar |
| **Administrador** | Gestiona productos, usuarios, pedidos desde Django Admin |

## Historias de usuario

### HU-001: Catálogo de productos
> Como **visitante**, quiero **ver una lista de productos disponibles** para **conocer qué se puede comprar**.

### HU-002: Detalle de producto
> Como **visitante**, quiero **ver el detalle de un producto específico** para **decidir si lo compro**.

### HU-003: Registro de usuario
> Como **visitante**, quiero **crear una cuenta** para **poder comprar y gestionar mis pedidos**.

### HU-004: Inicio de sesión
> Como **cliente**, quiero **iniciar sesión** para **acceder a mi carrito y perfil**.

### HU-005: Carrito de compras
> Como **cliente**, quiero **agregar/quitar productos del carrito** para **gestionar mi compra**.

### HU-006: Gestión de productos (admin)
> Como **administrador**, quiero **crear/editar/eliminar productos** para **mantener el catálogo actualizado**.

## Requisitos funcionales (EARS)

### RF-001: Listar productos
> El sistema **debe listar** todos los productos activos ordenados por fecha de creación (más reciente primero).

### RF-002: Filtrar productos por categoría
> El sistema **debe permitir filtrar** productos por categoría cuando el usuario seleccione una categoría.

### RF-003: Ver detalle de producto
> El sistema **debe mostrar** nombre, descripción, precio, imagen y stock de un producto cuando el usuario acceda a su detalle.

### RF-004: Registrar usuario
> El sistema **debe permitir registrar** un nuevo usuario con email, contraseña, nombre y apellido cuando el usuario complete el formulario de registro.

### RF-005: Autenticar usuario
> El sistema **debe autenticar** un usuario con email y contraseña cuando el usuario envíe el formulario de login.

### RF-006: Agregar al carrito
> El sistema **debe agregar** un producto al carrito cuando el cliente seleccione "Agregar al carrito" y especifique cantidad.

### RF-007: Actualizar cantidad en carrito
> El sistema **debe permitir actualizar** la cantidad de un producto en el carrito cuando el cliente modifique la cantidad.

### RF-008: Eliminar del carrito
> El sistema **debe permitir eliminar** un producto del carrito cuando el cliente seleccione "Eliminar".

### RF-009: Crear producto (admin)
> El sistema **debe permitir crear** un nuevo producto con nombre, descripción, precio, categoría, imagen y stock cuando el administrador complete el formulario.

### RF-010: Editar producto (admin)
> El sistema **debe permitir editar** un producto existente cuando el administrador modifique sus datos.

### RF-011: Eliminar producto (admin)
> El sistema **debe permitir eliminar** un producto cuando el administrador confirme la eliminación.

## Casos límite

| ID | Caso | Comportamiento esperado |
|----|------|------------------------|
| CL-001 | Producto sin stock | Mostrar "Sin stock" y deshabilitar "Agregar al carrito" |
| CL-002 | Carrito vacío | Mostrar mensaje "Tu carrito está vacío" y botón "Ver productos" |
| CL-003 | Usuario no autenticado intenta comprar | Redirigir a login |
| CL-004 | Email ya registrado | Mostrar error "Este email ya está registrado" |
| CL-005 | Contraseña incorrecta | Mostrar error "Email o contraseña incorrectos" |
| CL-006 | Producto eliminado mientras está en carrito | Mostrar error "Producto no disponible" al intentar comprar |
| CL-007 | Precio negativo o cero | Validar que precio > 0 al crear/editar producto |
| CL-008 | Stock negativo | Validar que stock >= 0 al crear/editar producto |

## Fuera de alcance (v1)

- Pasarela de pagos (solo simulación de compra)
- App Android/iOS
- Notificaciones por email
- Sistema de reseñas/calificaciones
- Cupones de descuento
- Múltiples direcciones de envío
- Historial de pedidos detallado

## Criterios de finalización

- [ ] Backend Django con API REST funcional
- [ ] Frontend React consumiendo la API
- [ ] Autenticación JWT o sessions funcionando
- [ ] CRUD de productos completo (admin)
- [ ] Carrito de compras persistente (base de datos)
- [ ] Despliegue en servidor Linux con Nginx + Gunicorn
- [ ] HTTPS con certificado SSL válido
- [ ] Base de datos PostgreSQL configurada
- [ ] Backups automáticos de base de datos
- [ ] Documentación de despliegue en README.md

## Dudas abiertas

1. ¿Se requiere integración con pasarela de pagos en v1 o solo simulación?
2. ¿Los usuarios pueden subir imágenes de perfil?
3. ¿Se requiere búsqueda de productos por texto o solo filtrado por categoría?
4. ¿El carrito debe persistir entre sesiones (base de datos) o solo en sesión actual (localStorage)?
5. ¿Se requiere paginación en el listado de productos? ¿Cuántos productos por página?
