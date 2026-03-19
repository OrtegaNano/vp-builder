# Value Proposition Builder

Un sistema de prompts + artifact que genera propuestas de valor de calidad profesional a partir de un brief corto.

---

## La idea

Escribes algo como:

> "App de viajes asistida por AI para iOS"

Y el agente hace el resto: investiga el mercado, identifica competidores, encuentra datos de pricing, aplica frameworks probados (Hormozi, Jobs-to-be-Done, posicionamiento competitivo), y genera un documento completo de propuesta de valor — del mismo nivel que si un estratega senior hubiera pasado una semana trabajando en ello.

## Cómo funciona

El sistema tiene dos modos:

### Modo Brief (automático)
1. El usuario escribe un brief de 1-3 frases
2. El agente hace **deep research** autónomo: mercado, competidores, roles, regulación, pricing benchmarks
3. Con esa investigación, genera un **intake sintético** (como si el usuario hubiera respondido las 8 preguntas)
4. Se lo muestra al usuario para validar/corregir
5. Genera cada sección con datos reales
6. El usuario valida, refina, o pide cambios

### Modo Guiado (manual)
El flujo actual: intake → discovery por sección → research → generación.
Para usuarios que ya tienen contexto profundo de su negocio.

## Estructura del proyecto

```
vp-builder/
├── README.md              ← Este archivo
├── vp-builder.jsx         ← Artifact principal (se usa en Claude)
├── prompts/
│   ├── system.md          ← System prompt global
│   ├── 00-brief-research.md  ← Prompt de research autónomo desde brief
│   ├── 01-problems.md     ← Los 3 Problemas
│   ├── 02-differentiator.md  ← Diferenciador Core
│   ├── 03-dual-promise.md ← Doble Promesa
│   ├── 04-messaging.md    ← Messaging por Audiencia
│   ├── 05-hormozi.md      ← Oferta Irresistible
│   ├── 06-pricing.md      ← Pricing Strategy + Justificación
│   ├── 07-positioning.md  ← Posicionamiento Competitivo
│   ├── 08-oneliners.md    ← One-Liners
│   └── 09-headline.md     ← Headline Final
├── docs/
│   ├── framework.md       ← Metodología y frameworks de referencia
│   ├── reference-example.md  ← Ejemplo de VP terminada (AI Ready)
│   └── changelog.md       ← Log de cambios en prompts
```

## Cómo iterar

### Mejorar un prompt
1. Abre el archivo en `prompts/` correspondiente
2. Modifica la sección que quieras (discovery, research, generación)
3. Prueba en Claude con un caso real
4. Si mejora, commitea. Si no, revierte.

### Añadir un paso nuevo
1. Crea `prompts/XX-nombre.md` siguiendo la estructura de los existentes
2. Añádelo al array `STEPS` en `vp-builder.jsx`
3. Añade las preguntas de discovery en `DISCOVERY`
4. Añade el prompt de generación en `buildGenPrompt`

### Añadir un framework
1. Documéntalo en `docs/framework.md`
2. Referéncialo en el prompt de la sección donde aplique
3. El system prompt ya instruye al agente a usar frameworks probados

## Principios de diseño

1. **Research-first, no question-first.** El agente investiga antes de preguntar. Solo pregunta lo que no puede encontrar.
2. **Nunca inventar datos.** Si no hay dato, se marca como [DATO POR CONFIRMAR]. Un hueco es mejor que una mentira.
3. **Especificidad brutal.** Cada output debe sonar como si se hubiera escrito dentro de la oficina del cliente.
4. **Frameworks probados.** No inventar metodología. Usar Hormozi, JTBD, posicionamiento competitivo, y documentar cuál se usa dónde.
5. **Modular.** Cambiar un prompt no debe romper los demás.

## Roadmap

- [x] Sistema de prompts por sección
- [x] Discovery + Research + Generación por paso
- [x] Pricing con dos modos (estrategia / justificación)
- [x] Artifact funcional en Claude
- [ ] Modo Brief: research autónomo desde una frase
- [ ] Integración de más frameworks (Blue Ocean, Value Chain, Porter)
- [ ] Evaluación automática de calidad post-generación
- [ ] Templates por industria (SaaS, servicios, e-commerce, etc.)
- [ ] Export a formatos adicionales (Notion, Google Docs, PDF)
