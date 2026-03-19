# CLAUDE.md — Contexto del proyecto para asistentes AI

## Qué es este proyecto

Un sistema de prompts + artifact (JSX) que genera propuestas de valor de calidad profesional a partir de un brief corto. El objetivo es que alguien escriba "App de viajes AI para iOS" y obtenga un documento estratégico del mismo nivel que si un consultor senior hubiera trabajado una semana en ello.

El sistema se usa como artifact dentro de Claude (claude.ai). No es una web app standalone — es un .jsx que se abre en Claude y usa la API de Anthropic internamente para generar cada sección.

## Arquitectura

```
vp-builder/
├── CLAUDE.md              ← Este archivo
├── README.md              ← Documentación para humanos
├── vp-builder.jsx         ← Artifact principal (React, se ejecuta en Claude)
├── prompts/
│   ├── system.md          ← System prompt global (va en TODAS las llamadas)
│   ├── 00-brief-research.md  ← Research autónomo desde un brief de 1-3 frases
│   ├── 01-problems.md     ← Los 3 Problemas
│   ├── 02-differentiator.md  ← Diferenciador Core
│   ├── 03-dual-promise.md ← Doble Promesa
│   ├── 04-messaging.md    ← Messaging por Audiencia
│   ├── 05-hormozi.md      ← Oferta Irresistible (framework Hormozi)
│   ├── 06-pricing.md      ← Pricing Strategy + Justificación (dos modos)
│   ├── 07-positioning.md  ← Posicionamiento Competitivo
│   ├── 08-oneliners.md    ← One-Liners por contexto
│   └── 09-headline.md     ← Headline Final + Supporting Pitch
├── docs/
│   ├── framework.md       ← Frameworks aplicados (Hormozi, JTBD, Porter, etc.)
│   ├── reference-example.md  ← Ejemplo de VP terminada (AI Ready - wealth management)
│   └── changelog.md       ← Log de cambios
└── .gitignore
```

## Cómo funciona el flujo

### Modo Brief (automático)
1. El usuario escribe 1-3 frases describiendo su producto
2. El sistema usa `web_search` para investigar: competidores, precios, mercado, regulación, roles
3. Genera un "intake sintético" con todo lo encontrado
4. El usuario valida/corrige el intake
5. Se generan las secciones secuencialmente, cada una con el contexto de las anteriores

### Modo Guiado (manual)
1. El usuario rellena un intake de 8 campos
2. Por cada sección: discovery (preguntas) → research (web search) → generación
3. El usuario refina con feedback o regenera

### Ciclo de cada sección
```
Discovery (preguntas al usuario)
    ↓
Research (web_search para datos que faltan)
    ↓
Generación (prompt con intake + discovery + research + secciones previas)
    ↓
Validación (usuario aprueba, refina con feedback, o regenera)
```

## Principios de diseño — NO ROMPER

1. **Nunca inventar datos.** Si no hay dato del usuario ni del research, se marca `[DATO POR CONFIRMAR: descripción]`. Un hueco visible es infinitamente mejor que un dato inventado. Este principio es sagrado.

2. **Research-first, no question-first.** El agente investiga antes de preguntar. Solo pregunta lo que no puede encontrar solo.

3. **Especificidad brutal.** Cada output debe sonar como si se hubiera escrito dentro de la oficina del cliente. Si puedes cambiar el nombre del sector y el texto sigue funcionando, es demasiado genérico.

4. **Frameworks probados, no inventados.** Cada sección aplica una metodología documentada (ver `docs/framework.md`). No se menciona el framework por nombre en el output (excepto Hormozi), pero el rigor debe estar.

5. **Modularidad.** Cambiar un prompt no debe romper los demás. Cada archivo en `prompts/` es independiente. El contexto entre secciones fluye a través de las variables `{intake}`, `{discovery}`, `{research}`, `{secciones anteriores}`.

6. **Tono de memo estratégico.** No es un blog post, no es copy publicitario, no es académico. Es alguien seguro de lo que dice, hablándole a alguien que toma decisiones. Directo, sin relleno, con sustancia.

## Cómo modificar prompts

Cada archivo en `prompts/` tiene la misma estructura:

```markdown
# Número — Título

Descripción corta de qué hace esta sección.

## Discovery
Preguntas al usuario (solo en modo guiado).

## Research
Qué buscar con web_search y queries sugeridas.

## Prompt de generación
El prompt exacto que se envía a la API, con variables entre {llaves}.
Incluye ESTRUCTURA (qué secciones debe tener el output) y REGLAS (restricciones).
Al final, FRAMEWORK APLICADO indica qué metodología sustenta la sección.
```

### Para mejorar un prompt:
1. Lee el prompt actual
2. Genera output con un caso real
3. Identifica qué falla (genérico, datos inventados, estructura débil, tono incorrecto)
4. Modifica la sección relevante (normalmente las REGLAS o la ESTRUCTURA)
5. Vuelve a probar con el mismo caso
6. Si mejora, commitea. Si no, revierte.

### Para añadir un paso nuevo:
1. Crea `prompts/XX-nombre.md` siguiendo la estructura
2. Documenta el framework aplicado en `docs/framework.md`
3. Añade al array `STEPS` en `vp-builder.jsx`
4. Añade las preguntas de discovery en el objeto `DISCOVERY`
5. Añade la query de research en `buildResearchPrompt()`
6. Añade el prompt de generación en `buildGenPrompt()`
7. Actualiza `docs/changelog.md`

## Sobre el JSX (vp-builder.jsx)

- Es un componente React que se ejecuta como artifact en Claude
- Usa la API de Anthropic (`https://api.anthropic.com/v1/messages`) directamente — en Claude artifacts no se necesita API key
- Modelo: `claude-sonnet-4-20250514`
- El research usa `web_search_20250305` como tool
- Los prompts están actualmente hardcodeados en el JSX (funciones `buildResearchPrompt` y `buildGenPrompt`). Lo ideal es que reflejen lo que hay en `prompts/` — si hay divergencia, `prompts/` es la fuente de verdad
- Estado en memoria (useState). No hay persistencia. Si el usuario cierra, pierde el progreso
- Export a `.md` al final con todas las secciones

## Sobre el pricing (paso 6)

Tiene DOS MODOS que se activan según si el usuario puso precio en el intake o no:

- **Sin precio → Pricing Strategy** (discovery de valor + research de benchmarks + 3 opciones ancladas en competidores/valor/dolor + recomendación)
- **Con precio → Pricing Justification** (discovery de métricas + cálculos de ROI + justificación por ROI/riesgo/competitivo)

La detección es por `intake.price.trim().length > 0`.

## Documento de referencia

`docs/reference-example.md` es la propuesta de valor de "AI Ready" — un curso de AI para wealth management. Es el gold standard del nivel de calidad que el sistema debe producir. Características clave:

- Cada sección tiene ejemplos ultra-específicos del sector (paraplanner, suitability report, FCA, etc.)
- Los números son reales y verificables (£997/employee, 3h/semana, £50/hora)
- El messaging cambia de tono por audiencia (CEO vs RRHH vs Compliance vs Empleados)
- El framework Hormozi se aplica con rigor
- El posicionamiento competitivo nombra categorías reales con precios

Cualquier output del sistema debería pasar el test: "¿está al nivel de reference-example.md?"

## Errores comunes a evitar

1. **Generar sin research.** El research es lo que convierte un output genérico en algo con sustancia. Siempre buscar competidores reales, precios reales, datos del sector reales.

2. **Inventar roles que no existen.** Si el usuario dijo que su producto es para "restaurantes", no inventar roles como "Chief Culinary Innovation Officer". Usar los roles reales del sector.

3. **Números redondos sospechosos.** Si un prompt genera "ahorra un 50% del tiempo" o "ROI de 10x", probablemente se lo inventó. Los números reales son feos: 37%, 3.2x, 2.7 horas.

4. **Jerga de marketing vacía.** "Revolucionario", "innovador", "de vanguardia", "game-changer", "empodera" — todas prohibidas. Usar verbos concretos y resultados específicos.

5. **Tratar todos los stakeholders igual.** El CEO no habla como el usuario final. El tono, el vocabulario, las métricas y las objeciones cambian por audiencia.

6. **Olvidar el moat.** El diferenciador no es un feature — es la acumulación de especificidad que haría falta reconstruir desde cero. Si suena a feature list, está mal.

## Stack técnico

- React (hooks: useState, useRef, useEffect, useCallback)
- Anthropic API (claude-sonnet-4-20250514, web_search_20250305)
- Markdown rendering manual (componente `Md` dentro del JSX)
- Sin dependencias externas (todo inline, requisito de artifacts de Claude)
- Sin localStorage (no soportado en artifacts de Claude)

## Roadmap

- [x] Sistema de prompts por sección
- [x] Discovery + Research + Generación por paso
- [x] Pricing con dos modos
- [x] Artifact funcional en Claude
- [x] Prompts externalizados como archivos .md
- [x] Documentación de frameworks con fuentes
- [ ] Modo Brief completo integrado en el JSX (research autónomo → intake sintético → validación)
- [ ] Evaluación automática de calidad post-generación (¿pasa el test de especificidad?)
- [ ] Templates de research por industria (SaaS, e-commerce, servicios, hardware, apps)
- [ ] Integración de más frameworks (Blue Ocean, Crossing the Chasm, StoryBrand)
- [ ] Persistencia vía `window.storage` (API de artifacts de Claude)
- [ ] Export a formatos adicionales (Notion, Google Docs, PDF)
