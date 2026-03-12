# Value Proposition Builder — Sistema de Prompts v2

---

## Filosofía del sistema

El documento de referencia (AI Ready) es excepcional porque quien lo escribió conoce el negocio en profundidad: sabe cuánto tarda un paraplanner en un suitability report, cuánto cuesta la hora cargada, qué regulador vigila qué. Sin esa profundidad, cualquier generación es relleno.

Cada sección sigue un ciclo de 3 fases:

1. **Discovery** → Preguntas al usuario para extraer lo que sabe
2. **Research** → Lo que el usuario no sepa, se busca (competidores, benchmarks del sector, datos regulatorios, métricas típicas)
3. **Generación** → Con datos reales, se genera la sección

Si el usuario no sabe algo en Discovery, no se inventa. Se investiga o se marca como supuesto a validar.

---

## System Prompt (global, va en todas las llamadas)

```
Eres un estratega de propuestas de valor de nivel world-class. Tu trabajo es ayudar al usuario a construir una propuesta de valor completa, sección por sección.

REGLAS FUNDAMENTALES:
- Responde SIEMPRE en español
- NUNCA inventes datos, cifras, nombres de competidores o métricas. Si no tienes un dato concreto, usa los que el usuario ha proporcionado. Si no hay dato disponible, escribe [DATO POR CONFIRMAR: descripción de lo que se necesita] para que el usuario lo rellene después.
- Sé brutalmente específico al sector del usuario. Cada ejemplo, cada rol mencionado, cada workflow debe sonar como si conocieras el día a día de esa industria.
- El tono es directo, seguro, sin relleno. Como un documento interno de estrategia, no un blog post.
- Escribe en prosa persuasiva con estructura clara. No listas sueltas de bullets sin contexto.
- Cuando des ejemplos de roles o workflows, usa los que el usuario ha descrito. No inventes roles que no existen en su sector.
- Formatea en Markdown limpio.
```

---

## Paso 0: Intake (la idea)

Este paso NO usa LLM. Es un formulario directo.

### Preguntas al usuario:

1. **¿Qué es tu producto o servicio?** — Describe qué vendes como si se lo explicaras a alguien inteligente que no sabe nada de tu sector.
2. **¿A quién se lo vendes?** — Sector, tamaño de empresa, geografía, tipo de decisor.
3. **¿Tienes un precio definido o necesitas ayuda para definirlo?** — Si ya tienes precio, indícalo. Si no, lo trabajamos en el paso de Pricing Strategy.
4. **¿Qué roles específicos dentro de la empresa del cliente usan o se benefician de tu producto?** — Lista los 3-6 roles más importantes y qué hacen con tu producto.
5. **¿Qué problema concreto resuelves? ¿Qué hacen hoy sin tu producto?** — La situación actual de tu cliente: cómo lo resuelven hoy, cuánto tardan, qué sale mal.
6. **¿Conoces competidores directos o alternativas que usen tus clientes?** — Nombres, precios si los sabes, qué ofrecen. Si no los conoces, lo investigamos.
7. **¿En qué entorno regulatorio opera tu cliente?** — Reguladores, normativas, certificaciones relevantes. Si no aplica, dilo.
8. **¿Tienes datos de resultados?** — Tiempo ahorrado, dinero ahorrado, clientes actuales, casos de éxito, métricas. Todo lo que tengas, aunque sea aproximado.

### Research automático tras el intake:

Con las respuestas del usuario, se busca:
- Competidores principales del sector (si el usuario no los conoció)
- Tamaño del mercado o datos del sector relevantes
- Entorno regulatorio si el usuario no lo tiene claro
- Benchmarks de productividad o costes típicos del sector

---

## Paso 1: Los 3 Problemas

### Discovery (preguntas al usuario):

1. ¿Qué hacen tus clientes HOY para resolver el problema que tú resuelves? (el status quo)
2. ¿Cuáles son las 2-3 reacciones más comunes que ves en el mercado? (ej: unos lo hacen a lo loco sin control, otros no hacen nada, otros lo intentaron y no funcionó)
3. ¿Qué consecuencia real tiene cada una? (pérdida de dinero, riesgo, ineficiencia, oportunidad perdida)
4. ¿Tienes alguna anécdota o ejemplo real de un cliente que estaba en alguna de estas situaciones?

### Research:

- Buscar riesgos documentados del sector por no adoptar soluciones como la del usuario
- Buscar incidentes o casos públicos que ilustren las consecuencias
- Buscar tendencias del sector que amplifiquen la urgencia

### Prompt de generación:

```
CONTEXTO DEL PRODUCTO:
{intake_completo}

DATOS DE DISCOVERY:
{respuestas_discovery_paso1}

DATOS DE RESEARCH:
{resultados_research}

---

TAREA: Genera la sección "El Problema que Resolvemos".

ESTRUCTURA:

1. Abre con 2-3 líneas que digan: "Ahora mismo, la mayoría de [tipo de empresa del sector] están atrapados en uno de tres lugares — y los tres les están costando."

2. Tres problemas, cada uno con:
   - Un título corto y memorable (ej: "Experimentación sin control", "Parálisis total", "Soluciones genéricas que no funcionan")
   - Un párrafo de 4-6 líneas que describe el problema con situaciones REALES del sector. Usa los workflows y roles que el usuario describió. Menciona consecuencias concretas — no abstractas.
   - Si hay datos de research (incidentes reales, estadísticas del sector), incorpóralos naturalmente.

3. Cierre de 2-3 líneas: "[Producto] resuelve los tres problemas a la vez" + una frase que explique cómo.

REGLAS:
- Los tres problemas deben corresponderse con lo que el usuario describió en Discovery. No inventes problemas que no existan en su mercado.
- Si el usuario dio anécdotas, úsalas (sin nombres reales salvo que los haya dado).
- Cada problema debe hacer que el lector piense "esto es exactamente lo que nos pasa".
- Si no tienes datos suficientes para hacer concreto un punto, marca [DATO POR CONFIRMAR: qué se necesita].
```

---

## Paso 2: Diferenciador Core

### Discovery:

1. ¿Qué hace tu producto que NADIE más hace específicamente para tu sector?
2. ¿Por qué un competidor genérico no puede simplemente "ponerle una etiqueta" de tu sector y competir contigo?
3. Para cada rol que mencionaste: ¿qué hace esa persona con tu producto que no podría hacer con una alternativa genérica? Dame el ejemplo más concreto posible.
4. ¿Cuánto tiempo/esfuerzo te costó construir esta especificidad? (esto define el moat)

### Research:

- Buscar qué ofrecen los competidores genéricos para entender el contraste
- Buscar si hay algún competidor nicho en el mismo sector

### Prompt de generación:

```
CONTEXTO: {intake + discovery + research}

TAREA: Genera la sección "Diferenciador Core".

ESTRUCTURA:

1. Abre con: "Esta es la cosa más importante de lo que hemos construido, y tiene que ser lo más alto que digamos en cada conversación, en cada página, en cada pieza de contenido."

2. Un párrafo que explique qué hace diferente al producto vs. todo lo genérico que existe en el mercado. Usa datos de research sobre competidores genéricos para hacer el contraste.

3. Para cada rol que el usuario describió, una mini-viñeta de 2-3 líneas:
   "Un [ROL] se sienta, [usa el producto], y sale sabiendo/pudiendo exactamente [resultado concreto y específico]."
   — USA SOLAMENTE los roles y workflows que el usuario proporcionó. No inventes roles.

4. Cierra explicando por qué esta especificidad es:
   - Por lo que pagan premium (contraste con alternativa genérica barata)
   - Por lo que funciona (los ejemplos son su trabajo real, no teoría)
   - Por lo que la competencia no puede replicarlo (usa el dato de esfuerzo que dio el usuario)

REGLAS:
- Los ejemplos por rol DEBEN venir del Discovery. Si el usuario describió 4 roles, usa 4. No añadas roles inventados.
- El contraste con la competencia debe ser específico (nombres y precios si los tenemos del research).
```

---

## Paso 3: Doble Promesa

### Discovery:

1. Si tuvieras que convencer a dos personas opuestas en la misma empresa (ej: al CEO y al director de riesgos / al de ventas y al de finanzas), ¿qué le dirías a cada uno?
2. ¿Cuál es el beneficio "sexy" de tu producto? (lo que hace que el decisor se emocione)
3. ¿Cuál es el beneficio "defensivo"? (lo que hace que el bloqueador no pueda decir que no)
4. ¿Quiénes son los stakeholders típicos en la decisión de compra?

### Prompt de generación:

```
CONTEXTO: {intake + discovery + secciones anteriores}

TAREA: Genera la sección "Doble Promesa".

ESTRUCTURA:

1. Identifica las dos promesas complementarias basándote en lo que el usuario describió como beneficio "sexy" y beneficio "defensivo".

2. Para la Promesa 1 (la "sexy"):
   - Por qué sola no es suficiente — quién la bloquearía
   - Ejemplo concreto del bloqueo ("Si solo prometemos X, el [rol bloqueador] mata el deal porque pregunta Y")

3. Para la Promesa 2 (la "defensiva"):
   - Por qué sola no es suficiente — quién perdería interés
   - Ejemplo concreto ("Si solo prometemos X, el [decisor] pierde interés porque no ve Y")

4. "Juntas, hacen la venta fácil":
   - Para cada stakeholder que el usuario mencionó: qué obtiene
   - Cierre: "No le estamos pidiendo a una persona que defienda la compra contra resistencia interna — le estamos dando a cada stakeholder una razón para decir sí."

REGLAS:
- Usa SOLAMENTE los stakeholders que el usuario identificó.
- Los ejemplos de bloqueo deben sonar como conversaciones reales de ventas del sector.
```

---

## Paso 4: Messaging por Audiencia

### Discovery:

1. Para cada stakeholder que ya identificaste: ¿cuál es su mayor dolor del día a día? ¿Qué KPI o métrica le quita el sueño?
2. ¿Qué objeciones te pone cada uno cuando vendes?
3. ¿Hay algún stakeholder que sea campeón interno (el que empuja la compra) vs. firmador (el que aprueba el gasto)?
4. Los usuarios finales de tu producto: ¿qué sienten hoy? ¿Frustración, curiosidad, miedo, indiferencia?

### Prompt de generación:

```
CONTEXTO: {intake + discovery + secciones anteriores}

TAREA: Genera la sección "Messaging por Audiencia".

Para CADA stakeholder identificado, genera:

1. Título: "Para [Rol / Título]"
2. Dos o tres párrafos de pitch directo que:
   - Abren con el dolor específico de ESA persona (usa lo que el usuario describió)
   - Conectan con lo que el producto resuelve para ella concretamente
   - Incorporan la objeción típica y la neutralizan
   - Si hay datos de ROI o métricas (de secciones anteriores), los incluyen donde sean relevantes para ese stakeholder
   - Cierran con urgencia o coste de oportunidad

3. El tono se adapta:
   - C-suite: estratégico, competitivo, orientado a board
   - Managers / L&D: práctico, medible, orientado a reporting
   - Compliance / Riesgo: defensivo, regulatorio, orientado a control
   - Usuarios finales: empático, concreto, orientado a su día a día

REGLAS:
- No incluyas audiencias que el usuario no haya mencionado.
- Cada pitch debe sonar como si se lo dijeras cara a cara a esa persona, no como un párrafo de web.
```

---

## Paso 5: Oferta Irresistible (Hormozi)

### Discovery:

1. ¿Cuál es el resultado soñado de tu cliente ideal? Si todo funcionara perfecto, ¿cómo se ve su empresa 6 meses después de comprarte?
2. ¿Qué incluye tu producto que demuestra que va a funcionar? (personalización, herramientas listas para usar, onboarding, soporte, garantía, etc.)
3. ¿Cuánto tarda un cliente en ver el primer resultado? ¿Qué obtiene en la primera semana?
4. ¿Cuál es el mayor miedo del comprador? (que no se use, que sea una pérdida de tiempo, que cause problemas, que no se implemente)
5. ¿Qué has hecho para minimizar ese miedo? (formato, duración, soporte, facilidad de implementación)

### Prompt de generación:

```
CONTEXTO: {intake + discovery + secciones anteriores}

TAREA: Genera la sección "Oferta Irresistible" usando el framework de Hormozi.

ESTRUCTURA:

1. Abre explicando la fórmula:
   "El valor de cualquier oferta se determina por cuatro variables:
   Valor = (Resultado Soñado × Probabilidad Percibida) / (Tiempo de Espera × Esfuerzo & Sacrificio)"

2. RESULTADO SOÑADO (Maximizar):
   Pinta el estado ideal en 4-5 líneas usando lo que el usuario describió. Tiene que sonar aspiracional pero creíble.

3. PROBABILIDAD PERCIBIDA (Maximizar):
   "Aquí es donde la mayoría de [alternativas] fallan. Los compradores ya han visto [experiencias anteriores fallidas]."
   Lista 4-5 elementos concretos del producto que señalan "esto sí funciona". Usa SOLO lo que el usuario describió como features/incluidos.

4. TIEMPO DE ESPERA (Minimizar):
   "El comprador debe sentir que obtiene valor en la primera semana, no después de un rollout de 6 meses."
   Usa lo que el usuario dijo sobre primeros resultados.

5. ESFUERZO & SACRIFICIO (Minimizar):
   "El mayor miedo del comprador a [precio] es [miedo que describió el usuario]."
   Lista 4-5 puntos concretos de cómo el producto neutraliza ese miedo. Usa SOLO lo que el usuario describió.

REGLAS:
- Cada punto debe venir de las respuestas del usuario, no de supuestos genéricos.
- Si el usuario no dio suficiente detalle en algún cuadrante, marca [POR COMPLETAR: qué falta].
```

---

## Paso 6: Pricing Strategy + Justificación

Este paso tiene DOS modos según el usuario tenga precio o no.

### MODO A: El usuario NO tiene precio → Pricing Strategy

#### Discovery:

1. ¿Cuánto valor aproximado genera tu producto por cliente? (tiempo ahorrado, ingresos incrementales, costes evitados — aunque sea estimación rough)
2. ¿Cuál es el presupuesto típico que manejan tus clientes para este tipo de solución?
3. ¿Cómo quieres cobrar? (por usuario, por empresa, por proyecto, suscripción, one-time)
4. ¿Hay algún precio que te parezca "demasiado bajo" o "demasiado alto"? (rango intuitivo)
5. ¿Tus clientes compran por ROI (necesitan justificar con números) o por dolor (necesitan resolver algo urgente)?

#### Research:

- Buscar precios de competidores directos del sector
- Buscar precios de alternativas genéricas (plataformas grandes tipo Coursera, Udemy, SaaS horizontales)
- Buscar precios de consultoras/soluciones premium en el espacio
- Buscar benchmarks de pricing para el modelo elegido (por usuario/año, por empresa, etc.)
- Buscar coste/hora o salarios típicos de los roles que usan el producto (para calcular valor generado)

#### Prompt de generación (Pricing Strategy):

```
CONTEXTO: {intake + discovery + research + secciones anteriores}

TAREA: Propón una estrategia de pricing fundamentada en datos.

ESTRUCTURA:

1. ANÁLISIS DEL MERCADO:
   Resume lo que cobra la competencia en 3 niveles:
   - Alternativa genérica/barata: [nombre] a [precio] — qué incluye y qué no
   - Competidor más cercano: [nombre] a [precio] — qué incluye y qué no
   - Alternativa premium/consultora: [nombre] a [precio] — qué incluye y qué no

2. CÁLCULO DE VALOR:
   Con los datos del usuario y del research, calcula:
   - Valor generado por usuario/año (en horas ahorradas × coste/hora, o ingresos incrementales, o riesgo evitado)
   - Muestra la cuenta completa y transparente
   - Si faltan datos, usa los del research e indícalo como "Según benchmarks del sector..."

3. TRES OPCIONES DE PRECIO:
   
   Opción A — Anclada en competidores:
   - Precio: [X] (posicionado entre [genérico] y [premium])
   - Lógica: "Más caro que lo genérico porque es específico, más barato que consultoría porque es escalable"
   - Margen de maniobra y percepción esperada
   
   Opción B — Anclada en valor:
   - Precio: [X] (fracción del valor generado, típicamente 10-20%)
   - Lógica: "Si genera [Y] de valor por usuario/año, cobrar [X] es un ROI de [Z]x"
   - Payback period
   
   Opción C — Anclada en dolor/urgencia:
   - Precio: [X] (basado en el coste de NO resolver el problema)
   - Lógica: "Un solo [incidente/pérdida] cuesta [Y]. El producto cuesta [X]. Es un seguro."
   - Mejor para: venta basada en riesgo

4. RECOMENDACIÓN:
   De las tres, recomienda una con justificación clara.
   Sugiere si tiene sentido modelo de suscripción/renovación y a qué % del precio inicial.

REGLAS:
- TODOS los números deben venir del Discovery o del Research. Nunca inventes.
- Si un benchmark no se encontró, marca [BENCHMARK NO DISPONIBLE: se necesita X].
- Presenta las opciones como decisión estratégica, no como adivinanza.
- Muestra las cuentas completas para que el usuario pueda validarlas.
```

### MODO B: El usuario YA tiene precio → Justificación de Precio

#### Discovery:

1. ¿Cuánto tiempo ahorra tu producto por usuario/mes? (aunque sea estimación)
2. ¿Cuál es el coste cargado por hora de la persona que lo usa? (o el rango salarial típico del sector)
3. ¿Hay algún riesgo que tu producto evita? ¿Cuánto costaría ese incidente? (multa, pérdida de cliente, demanda, error)
4. ¿Cuánto cuestan las alternativas? (la genérica barata, la consultoría cara, el "hacerlo internamente")
5. Si tienes modelo de suscripción/renovación: ¿por qué necesitan renovar? ¿Qué cambia con el tiempo?

#### Research:

- Buscar salarios/costes por hora típicos del sector y roles relevantes
- Buscar costes de incidentes o riesgos en el sector (multas, pérdidas documentadas)
- Buscar precios de competidores si el usuario no los conoce

#### Prompt de generación (Justificación):

```
CONTEXTO: {intake + discovery + research + secciones anteriores}

TAREA: Genera la sección "Justificación de Precio".

ESTRUCTURA:

1. Abre con el precio y escala:
   "A [precio], una empresa de [tamaño pequeño] invierte [X]. Una de [tamaño grande] invierte [Y]. Son cifras significativas que requieren justificación clara."

2. JUSTIFICACIÓN POR ROI:
   - Usa los datos concretos del usuario (horas ahorradas, coste/hora)
   - Haz las matemáticas explícitas: por persona/semana → por persona/año → por empresa/año
   - Calcula payback period: "La inversión se paga en [X meses]. Todo lo que viene después es margen puro."
   - Si los datos vienen de research (no del usuario), indícalo: "Según benchmarks del sector..."

3. JUSTIFICACIÓN POR EVITACIÓN DE RIESGO:
   - Usa el riesgo que describió el usuario
   - Si hay datos de research sobre costes de incidentes, incorpóralos
   - "Un solo [incidente] podría costar órdenes de magnitud más que la inversión en [producto]."

4. JUSTIFICACIÓN POR POSICIONAMIENTO COMPETITIVO:
   - Coste de oportunidad: qué pasa cada mes que no actúan
   - Contraste con lo que hacen los competidores que sí invierten

5. Si hay suscripción/renovación:
   - Justifica con ritmo de cambio del sector, actualizaciones, contenido nuevo

REGLAS:
- TODOS los números deben venir del Discovery o del Research. NUNCA inventes cifras.
- Si un dato no está disponible, escribe: [NECESITAS CONFIRMAR: coste por hora típico de un {rol} en {sector}]
- Las matemáticas deben ser verificables. Muestra la cuenta completa.
```

---

## Paso 7: Posicionamiento Competitivo

### Discovery:

1. ¿Quiénes son tus competidores directos? (los que el cliente compara contigo)
2. ¿Y los indirectos? (consultoras, soluciones genéricas, "hacerlo internamente")
3. ¿Qué te dicen los clientes cuando comparan? ¿Qué valoran de ti vs. otros?
4. ¿Qué tendría que hacer un competidor para replicar lo que tú ofreces? ¿Cuánto tiempo/inversión les costaría?

### Research:

- Buscar competidores del sector y sus ofertas/precios
- Buscar posicionamiento de consultoras grandes en el espacio
- Buscar si hay competidores nicho emergentes

### Prompt de generación:

```
CONTEXTO: {intake + discovery + research + secciones anteriores}

TAREA: Genera la sección "Posicionamiento Competitivo".

ESTRUCTURA:

1. QUÉ EXISTE HOY:
   Para cada categoría de competidor (3-4 categorías), incluye:
   - Nombre de la categoría y ejemplos concretos (de discovery + research)
   - Qué ofrecen y a qué precio (si lo tenemos)
   - Por qué no es suficiente para el cliente objetivo

2. DÓNDE ENCAJAMOS:
   Una frase en negrita que define la posición única:
   "Ocupamos una posición específica y defendible: [la única X construida exclusivamente para Y, con Z]."
   Luego 2-3 líneas de contraste directo con cada categoría.

3. NUESTRO MOAT:
   "La especificidad es el moat."
   Usa lo que el usuario dijo sobre el esfuerzo de construir su producto.
   Explica qué tendría que hacer cada tipo de competidor para igualarlo.

REGLAS:
- Usa nombres reales de competidores SOLO si vienen del usuario o del research verificado.
- El moat no es un feature. Es la acumulación de especificidad que requeriría reconstruir desde cero.
```

---

## Paso 8: One-Liners

### Discovery:

Ninguna pregunta adicional. Se genera directamente con todo el material previo.

### Prompt de generación:

```
CONTEXTO: {intake + TODAS las secciones completadas}

TAREA: Genera 6 variaciones de one-liner.

FORMATO EXACTO:

1. **Para la web (hero):** Una frase de máximo 20 palabras que una especificidad de nicho + resultado tangible + inmediatez. Debe sonar como si solo pudiera ser de ESTE producto.

2. **Para LinkedIn bio:** Una línea empezando por "Ayudamos a [sector] a [resultado] — con [diferenciador]."

3. **Para cold outreach:** 2 frases que abran un email frío. La primera identifica el problema. La segunda presenta la solución.

4. **Para elevator pitch:** 3-4 frases para 30 segundos. Problema → Solución → Diferenciador → Resultado.

5. **Para conferencia:** 3-4 frases que arranquen con "La mayoría de [soluciones/training/etc.] no funciona en [sector] porque [razón]. Nosotros [diferenciador]."

6. **Para partnerships:** 2-3 frases que posicionen como "Somos la capa de [X] para [sector]. Nos integramos con [tipo de partners] y [propuesta de valor para el partner]."

REGLAS:
- Cada variación debe ser inmediatamente reconocible como del mismo producto pero adaptada al contexto.
- No deben ser intercambiables con cualquier otro producto. La especificidad es clave.
```

---

## Paso 9: Headline Final

### Discovery:

Ninguna pregunta adicional. Este es el paso de destilación.

### Prompt de generación:

```
CONTEXTO: {intake + TODAS las secciones completadas}

TAREA: Genera la Headline definitiva y el Supporting Pitch.

PARTE 1 — HEADLINE:
Genera 3 opciones de headline. Cada una debe:
- Tener máximo 20-25 palabras
- Unir: especificidad de nicho + resultado tangible + inmediatez
- Sonar como si SOLO pudiera ser de este producto para este sector
- No ser genérica ni intercambiable

Para cada opción, escribe una línea explicando por qué funciona.

PARTE 2 — SUPPORTING PITCH:
2 párrafos que expandan la headline ganadora:
- Párrafo 1: Qué es el producto y qué NO es. Ataca lo genérico. Eleva la especificidad. Conecta con los workflows reales.
- Párrafo 2: Qué resultado obtiene el cliente. Conecta la doble promesa. Cierra con la frase de resultado.

REGLAS:
- El headline se hace ÚLTIMO porque necesita toda la destilación previa.
- No uses jerga de marketing vacía. Cada palabra debe tener peso.
```

---

## Notas de implementación

### Sobre el research automático

Cuando el usuario no tiene un dato, el sistema debe buscarlo antes de generar. Prioridades de búsqueda:

1. **Competidores y precios** → Buscar "[sector] + [tipo de solución] + competitors/pricing"
2. **Salarios y costes/hora** → Buscar "[rol] + salary + [país/región]"
3. **Riesgos y costes de incidentes** → Buscar "[sector] + [tipo de incidente] + cost/fine"
4. **Regulación** → Buscar "[sector] + regulation + [país/región]"
5. **Tamaño de mercado** → Buscar "[sector] + market size + [año]"

### Sobre el modo dual de Pricing

El paso 6 detecta si el usuario escribió un precio en el intake:
- **Si hay precio** → va directo a Justificación (Modo B). Las preguntas de discovery son sobre datos para justificar.
- **Si no hay precio** → va a Pricing Strategy (Modo A). Las preguntas de discovery son sobre valor percibido y modelo. El research busca benchmarks y competidores. La generación propone 3 opciones con lógica diferente. Una vez el usuario elige, se puede regenerar como Justificación con el precio elegido.

### Sobre los datos marcados como [POR CONFIRMAR]

Si el modelo no tiene datos suficientes ni de discovery ni de research, DEBE marcar el hueco en vez de inventar. El usuario puede rellenar después. Un dato marcado es infinitamente mejor que un dato inventado.

### Sobre el tono

El documento de referencia tiene un tono muy específico: es como un memo estratégico interno. No es un blog post, no es copy publicitario, no es un documento académico. Es alguien seguro de lo que dice, hablándole a alguien que toma decisiones. Ese tono debe mantenerse en todas las secciones.
