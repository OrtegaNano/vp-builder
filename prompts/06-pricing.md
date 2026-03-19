# 06 — Pricing (Estrategia + Justificación)

Dos modos: si no tienes precio, te ayudo a definirlo. Si ya lo tienes, lo justificamos con datos.

---

## MODO A: No tiene precio → Pricing Strategy

### Discovery

1. ¿Cuánto valor aproximado genera tu producto por cliente? (tiempo, dinero, riesgo evitado)
2. ¿Presupuesto típico de tus clientes para este tipo de solución?
3. ¿Cómo quieres cobrar? (por usuario, empresa, proyecto, suscripción)
4. ¿Precio intuitivo? ("menos de X se siente cheap, más de Y es difícil")
5. ¿Compran por ROI (justifican con números) o por dolor (resuelven urgencia)?

### Research (web_search)

- "[competidor] pricing" (para cada competidor del research)
- "[sector] + [tipo de solución] + pricing benchmarks"
- "[rol] + salary + [país]" (para calcular coste/hora)
- "[sector] + average training spend per employee" (o equivalente)

### Prompt de generación

```
CONTEXTO: {intake + discovery + research + secciones anteriores}

TAREA: Propón una estrategia de pricing fundamentada.

### 1. MAPA DE PRECIOS DEL MERCADO

| Categoría | Ejemplo | Precio | Qué incluye | Qué falta |
|-----------|---------|--------|-------------|-----------|
| Genérica/barata | [nombre] | [precio] | ... | ... |
| Competidor cercano | [nombre] | [precio] | ... | ... |
| Premium/consultora | [nombre] | [precio] | ... | ... |

(Datos del research. Si no hay, marca [NO ENCONTRADO].)

### 2. CÁLCULO DE VALOR

Con datos del usuario + research:
- Valor por usuario/año = [horas ahorradas] × [coste/hora] = [valor]
- O: riesgo evitado = [probabilidad] × [coste del incidente] = [valor]
- O: ingresos incrementales = [métrica] × [impacto] = [valor]
Muestra la cuenta completa. Indica si los datos son del usuario o de benchmarks.

### 3. TRES OPCIONES

**Opción A — Anclada en competidores**
Precio: [X]
Lógica: "Más que [genérico] porque [razón], menos que [premium] porque [razón]"
Mejor para: mercado sensible a precio, venta por comparación

**Opción B — Anclada en valor**
Precio: [X] (10-20% del valor generado)
Lógica: "Si genera [Y] de valor, cobrar [X] es un ROI de [Z]x. Payback en [N meses]."
Mejor para: venta a C-suite, justificación por ROI

**Opción C — Anclada en dolor/riesgo**
Precio: [X]
Lógica: "Un solo [incidente] cuesta [Y]. Esto cuesta [X]. Es un seguro."
Mejor para: sectores regulados, venta a compliance/riesgo

### 4. RECOMENDACIÓN
[Cuál y por qué, basado en el tipo de comprador y el sector]
[Si aplica suscripción: a qué % del precio inicial y por qué]

REGLAS:
- TODOS los números del Discovery o Research. Nunca inventar.
- Si un benchmark falta, [BENCHMARK NO DISPONIBLE: se necesita X].
- Las 3 opciones son decisiones estratégicas, no adivinanzas.
```

---

## MODO B: Ya tiene precio → Justificación

### Discovery

1. ¿Horas ahorradas por usuario/mes?
2. ¿Coste cargado por hora? (o rango salarial)
3. ¿Riesgo que evita? ¿Coste del incidente?
4. ¿Coste de las alternativas?
5. ¿Razón de renovación si hay suscripción?

### Research

- "[rol] salary [país]" → coste/hora
- "[sector] [tipo de incidente] cost fine"
- "[competidor] pricing"

### Prompt de generación

```
CONTEXTO: {intake + discovery + research + secciones anteriores}

TAREA: Genera "Justificación de Precio" para {precio}.

### Escala
"A [precio], una empresa de [tamaño pequeño] invierte [X]. Una de [tamaño grande] invierte [Y]."

### Justificación por ROI
Cuentas explícitas:
- [horas/semana] × [coste/hora] = [ahorro/semana]
- × 50 semanas = [ahorro/año por persona]
- × [tamaño empresa] = [ahorro/año total]
- Payback: [precio total] / [ahorro mensual] = [N meses]
"La inversión se paga en [N meses]. Todo lo demás es margen."

### Justificación por riesgo
"Un solo [incidente] — [descripción] — podría costar [cantidad]. [Producto] cuesta [fracción]."

### Justificación por posicionamiento
"Cada mes sin [producto], los competidores que sí invierten [ventaja]. El gap se amplía."

### Suscripción (si aplica)
"[precio renovación] se justifica porque [razones: ritmo de cambio, actualizaciones, etc.]"

REGLAS:
- TODOS los números verificables. Mostrar las cuentas.
- Si un dato falta: [NECESITAS CONFIRMAR: qué].
- El CFO debe poder leer esto y decir "las cuentas cuadran".
```
