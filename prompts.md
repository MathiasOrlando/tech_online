# Prompts por Fase - tech_online

| Fase | Prompt esencial |
|------|-----------------|
| **Constitución** | "Actúa como arquitecto de software. Define la estructura del proyecto tech_online: carpetas, archivos clave, tecnologías, flujo de trabajo y estándares de código para Django + React auto-alojado." |
| **Spec** | "Actúa como analista de requisitos. Genera una especificación completa con contexto, usuarios, historias de usuario, requisitos funcionales en notación EARS, casos límite, fuera de alcance y criterios de finalización." |
| **Clarificación** | "Revisa la especificación y genera una lista de preguntas de clarificación para resolver ambigüedades antes de planificar. Enfócate en casos límite, validaciones, flujos de error y requisitos no funcionales." |
| **Plan** | "Actúa como tech lead. Crea un plan de implementación secuencial con hitos claros: backend primero (modelos, endpoints, auth), luego frontend (componentes, consumo de API), luego infra (Nginx, SSL, despliegue). Incluye estimación de esfuerzo." |
| **Tareas** | "Descompón el plan en tareas atómicas de GitHub Issues. Cada tarea debe tener: título claro, descripción, criterios de aceptación, labels (backend/frontend/infra), y dependencias con otras tareas." |
| **Implementación** | "Actúa como desarrollador senior. Implementa [TAREA_X] siguiendo los estándares del proyecto. Genera el código completo, migrations si corresponde, y verifica que no haya errores de sintaxis o imports." |
| **Validación** | "Actúa como QA. Verifica que [TAREA_X] cumple los criterios de aceptación. Prueba endpoints con curl, verifica respuestas JSON, testea casos límite, y confirma que no haya regresiones." |
| **Cambio** | "Actúa como ingeniero de cambios. Evalúa el impacto de modificar [X] en el sistema. Lista archivos afectados, migraciones necesarias, cambios en frontend, y riesgos de breaking changes. Propón estrategia de migración." |
