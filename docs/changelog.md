# Changelog

Registro de cambios en prompts y sistema.

---

## v2.1 — Proyecto modular + Brief mode (2026-03-12)

### Añadido
- Proyecto reestructurado para git con prompts como archivos separados
- `00-brief-research.md`: nuevo prompt para research autónomo desde un brief corto
- `docs/framework.md`: documentación de todos los frameworks aplicados con fuentes
- Modo Brief: el agente investiga el mercado y genera un intake sintético que el usuario valida
- Referencia explícita a frameworks en cada prompt (JTBD, Hormozi, Porter, Category Design, etc.)

### Cambiado
- Prompts externalizados de `vp-builder.jsx` a archivos `.md` individuales
- Cada prompt ahora documenta: discovery, research, y generación por separado
- System prompt reforzado con regla de honestidad (reconocer debilidades del producto)

---

## v2.0 — Discovery + Research (2026-03-12)

### Añadido
- Discovery: 3-5 preguntas específicas antes de cada sección
- Research automático con web_search para datos del sector
- Pricing con dos modos: Strategy (sin precio) y Justificación (con precio)
- Marcadores [DATO POR CONFIRMAR] en vez de inventar datos
- Panel desplegable "Ver datos de research" en cada sección
- Botón "Volver a discovery" para cambiar inputs

### Cambiado
- System prompt prohíbe explícitamente inventar datos
- Pricing ahora requiere datos reales para generar

---

## v1.0 — Versión inicial (2026-03-12)

### Creado
- Artifact JSX funcional con 10 pasos
- Prompts integrados directamente en el código
- Generación one-shot por sección
- Export a .md
