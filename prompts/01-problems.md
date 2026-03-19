# 01 — Los 3 Problemas

El mercado está atrapado en 3 callejones sin salida, y tu producto los resuelve todos.

---

## Discovery (preguntas al usuario)

Solo si el modo es GUIADO. En modo BRIEF, estas respuestas se extraen del research.

1. ¿Qué hacen tus clientes HOY para resolver el problema que tú resuelves? (el status quo)
2. ¿Cuáles son las 2-3 reacciones más comunes que ves en el mercado? (ej: unos lo hacen a lo loco, otros no hacen nada, otros probaron algo genérico)
3. ¿Qué consecuencia real tiene cada una? (dinero, riesgo, ineficiencia, oportunidad perdida)
4. ¿Tienes alguna anécdota real? (opcional)

---

## Research (web_search)

Búsquedas sugeridas:
- "[sector] + risks of not adopting [tipo de solución]"
- "[sector] + incidents + [tipo de riesgo]"
- "[sector] + adoption trends + [año]"

---

## Prompt de generación

```
CONTEXTO DEL PRODUCTO:
{intake}

DATOS DE DISCOVERY:
{discovery}

DATOS DE RESEARCH:
{research}

---

TAREA: Genera la sección "El Problema que Resolvemos".

ESTRUCTURA:

1. Abre con 2-3 líneas:
   "Ahora mismo, la mayoría de [tipo de empresa] están atrapados en uno de tres lugares — y los tres les están costando."

2. Tres problemas, cada uno con:
   - TÍTULO corto y memorable (ej: "Experimentación sin control", "Parálisis total", "Soluciones genéricas que no funcionan")
   - PÁRRAFO de 4-6 líneas con situaciones REALES del sector. Usa workflows y roles del usuario. Consecuencias concretas y medibles cuando sea posible.
   - Si hay datos de research (incidentes, estadísticas), incorpóralos naturalmente.

3. Cierre de 2-3 líneas:
   "[Producto] resuelve los tres problemas a la vez." + frase de cómo.

REGLAS:
- Los problemas deben mapear a las reacciones que el usuario/research describió.
- Patrón típico: (1) lo hacen mal/sin control, (2) no lo hacen en absoluto, (3) lo intentaron con algo genérico y falló. Adapta al sector.
- Si hay anécdotas del usuario, úsalas.
- Cada problema debe hacer que el lector piense "esto es exactamente lo que nos pasa".
- Si falta un dato, marca [DATO POR CONFIRMAR: qué].

FRAMEWORK APLICADO: Jobs-to-be-Done (los 3 problemas son los 3 "bad solutions" que el mercado usa hoy para el mismo job).
```
