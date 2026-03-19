# 00 — Brief Research (Research Autónomo)

Este es el prompt más importante del sistema. Convierte un brief de 1-3 frases en un intake completo fundamentado en datos reales.

---

## Cuándo se usa

Cuando el usuario escribe solo un brief corto en vez de rellenar el intake completo. Ejemplos:
- "App de viajes asistida por AI para iOS"
- "Curso de AI aplicada para despachos de abogados"
- "SaaS de gestión de inventario para restaurantes"

## Qué hace

1. Investiga el mercado con web search
2. Identifica competidores, precios, roles, regulación, tamaño de mercado
3. Genera un "intake sintético" que el usuario puede validar/corregir
4. Este intake se usa como base para todas las secciones posteriores

---

## Prompt de Research (usa web_search)

```
BRIEF DEL USUARIO: {brief}

Eres un investigador de mercado. Tu trabajo es convertir este brief en un análisis completo que sirva como base para construir una propuesta de valor profesional.

Investiga lo siguiente usando web search. Busca datos REALES y ACTUALES:

### 1. MERCADO
- ¿Qué tamaño tiene este mercado? (TAM/SAM/SOM si hay datos)
- ¿Está creciendo, estancado o contrayéndose?
- ¿Qué tendencias están moviendo este espacio ahora mismo?

### 2. COMPETIDORES
- ¿Quiénes son los 3-5 competidores principales? (nombre, web, precio si está público)
- ¿Quiénes son las alternativas indirectas? (consultoras, soluciones genéricas, DIY)
- ¿Qué modelo de pricing usan? (por usuario, freemium, enterprise, etc.)
- ¿Qué gaps o quejas comunes tienen los usuarios sobre las soluciones actuales?

### 3. CLIENTE OBJETIVO
- ¿Quién compraría esto? (tipo de empresa, tamaño, sector, geografía probable)
- ¿Quiénes son los roles dentro de esa empresa que lo usarían?
- ¿Quién toma la decisión de compra? ¿Quién la bloquea?
- ¿Cuánto gastan típicamente en soluciones de este tipo?

### 4. WORKFLOWS Y DOLOR
- ¿Qué tareas concretas haría el usuario con este producto?
- ¿Cómo las resuelven hoy sin el producto? ¿Cuánto tardan?
- ¿Cuál es el coste de no resolver el problema? (tiempo, dinero, riesgo)

### 5. REGULACIÓN
- ¿Hay regulación relevante en este sector/mercado?
- ¿Hay requisitos de compliance, privacidad, o certificación?
- Si no hay regulación específica, indícalo.

### 6. PRICING BENCHMARKS
- ¿Qué cobran los competidores?
- ¿Cuál es el rango de precios del mercado (low/mid/high)?
- ¿Cuál es el coste por hora / salario de los roles que lo usarían?
- ¿Cuál es el valor económico estimado que generaría? (horas ahorradas × coste/hora, ingresos incrementales, riesgo evitado)

FORMATO DE RESPUESTA:
Responde en JSON con esta estructura exacta:

{
  "market": {
    "size": "...",
    "trend": "...",
    "key_trends": ["..."]
  },
  "competitors": [
    {"name": "...", "url": "...", "price": "...", "model": "...", "strengths": "...", "weaknesses": "..."}
  ],
  "indirect_alternatives": ["..."],
  "target_customer": {
    "type": "...",
    "size": "...",
    "geography": "...",
    "buyer": "...",
    "blocker": "...",
    "typical_budget": "..."
  },
  "roles": [
    {"title": "...", "tasks_with_product": "...", "current_approach": "...", "time_saved": "..."}
  ],
  "pain_points": ["..."],
  "regulation": "...",
  "pricing_benchmarks": {
    "low": "...",
    "mid": "...",
    "high": "...",
    "cost_per_hour_user": "...",
    "estimated_value_per_user_year": "..."
  },
  "sources": ["..."]
}

REGLAS:
- Si no encuentras un dato, pon "NO ENCONTRADO - requiere input del usuario"
- Cita fuentes cuando las tengas
- No inventes datos. Es mejor un campo vacío que un dato falso.
- Busca en inglés Y en español si el mercado es hispano.
```

---

## Prompt de Síntesis (convierte el research en intake legible)

```
RESEARCH COMPLETO: {research_json}
BRIEF ORIGINAL: {brief}

Con base en el research, genera un INTAKE COMPLETO en formato legible que el usuario pueda revisar y corregir.

FORMATO:

## Tu producto (según lo que entendí)
[Descripción de 3-4 líneas basada en el brief + lo que el research reveló sobre el mercado]

## Tu audiencia
[Tipo de empresa, tamaño, geografía, basado en el research]

## Precio sugerido
[Rango basado en benchmarks del research. Si no hay datos suficientes, indica que necesitas input.]

## Roles que lo usarían
[Lista de roles con lo que haría cada uno, basado en el research]

## El problema que resuelves
[Basado en los pain points del research]

## Competidores identificados
[Lista con nombres, precios y gaps]

## Regulación
[Lo que encontró el research, o "No aplica"]

## Datos disponibles
[Métricas del research: tamaño de mercado, costes, benchmarks]

---

**¿Esto es correcto?** Revisa cada sección. Lo que esté mal, corrígelo. Lo que falte, añádelo. Lo que sobre, quítalo. Con tu validación, genero la propuesta de valor completa.
```

---

## Notas de implementación

- Este paso necesita `web_search` habilitado en la API call.
- Idealmente hace 3-5 búsquedas diferentes para cubrir los 6 bloques.
- El JSON de research se guarda y se pasa como contexto a TODAS las secciones posteriores.
- El usuario SIEMPRE ve el intake sintético y puede editarlo antes de continuar.
- Si el usuario corrige algo, esa corrección tiene prioridad sobre el research.
