import { useState, useRef, useEffect, useCallback } from "react";

// ─── STEP DEFINITIONS ───────────────────────────────────────────────
const STEPS = [
  {
    id: "intake",
    title: "Tu Idea",
    subtitle: "Cuéntame todo sobre tu producto",
    icon: "💡",
  },
  {
    id: "problems",
    title: "Los 3 Problemas",
    subtitle: "Los callejones sin salida de tu mercado",
    icon: "🔥",
  },
  {
    id: "differentiator",
    title: "Diferenciador Core",
    subtitle: "Lo que nadie puede copiar",
    icon: "⚡",
  },
  {
    id: "dual_promise",
    title: "Doble Promesa",
    subtitle: "Dos pilares que convencen a todos",
    icon: "🎯",
  },
  {
    id: "messaging",
    title: "Messaging por Audiencia",
    subtitle: "Cada decisor oye lo que necesita",
    icon: "🗣️",
  },
  {
    id: "hormozi",
    title: "Oferta Irresistible",
    subtitle: "Framework Hormozi",
    icon: "💰",
  },
  {
    id: "pricing",
    title: "Pricing",
    subtitle: "Estrategia + Justificación",
    icon: "📊",
  },
  {
    id: "positioning",
    title: "Posicionamiento",
    subtitle: "Mapa del mercado + moat",
    icon: "🏰",
  },
  {
    id: "oneliners",
    title: "One-Liners",
    subtitle: "Variaciones por contexto",
    icon: "✍️",
  },
  {
    id: "headline",
    title: "Headline Final",
    subtitle: "La frase que lo resume todo",
    icon: "🎬",
  },
];

// ─── DISCOVERY QUESTIONS PER STEP ───────────────────────────────────
const DISCOVERY = {
  problems: [
    { key: "status_quo", label: "¿Qué hacen tus clientes HOY para resolver el problema que tú resuelves?", placeholder: "Ej: Usan plantillas genéricas de Excel, contratan consultoras caras, o directamente no hacen nada y asumen el riesgo" },
    { key: "reactions", label: "¿Cuáles son las 2-3 reacciones más comunes en el mercado?", placeholder: "Ej: Unos lo hacen a lo loco sin control, otros bloquean toda innovación, otros probaron algo genérico y no funcionó" },
    { key: "consequences", label: "¿Qué consecuencia real tiene cada una?", placeholder: "Ej: Pérdida de clientes, multas regulatorias, equipos quemados, oportunidad perdida frente a competidores" },
    { key: "anecdote", label: "¿Tienes alguna anécdota real de un cliente en alguna de estas situaciones? (opcional)", placeholder: "Ej: Un cliente perdió un contrato de €200K porque su equipo tardó 3 semanas en entregar algo que debería tomar 3 días" },
  ],
  differentiator: [
    { key: "unique", label: "¿Qué hace tu producto que NADIE más hace específicamente para tu sector?", placeholder: "Ej: Cada módulo está construido con los workflows reales de wealth management, no de 'finanzas en general'" },
    { key: "why_not_generic", label: "¿Por qué un competidor genérico no puede ponerle una etiqueta de tu sector y competir?", placeholder: "Ej: Porque no conocen los roles específicos, los flujos regulatorios, ni el lenguaje del día a día" },
    { key: "role_examples", label: "Para cada rol: ¿qué hace esa persona con tu producto que no podría hacer con una alternativa genérica?", placeholder: "Ej: El paraplanner puede redactar un suitability report en 20 min vs 3 horas. El advisor puede resumir reuniones al instante." },
    { key: "build_effort", label: "¿Cuánto tiempo/esfuerzo te costó construir esta especificidad?", placeholder: "Ej: 8 meses de research con 30 firmas, entrevistas con cada rol, revisión con compliance officers" },
  ],
  dual_promise: [
    { key: "two_personas", label: "Si tuvieras que convencer a dos personas opuestas en la empresa (ej: CEO vs director de riesgos), ¿qué le dirías a cada uno?", placeholder: "Ej: Al CEO le digo que su equipo será 3x más productivo. Al compliance le digo que tendrá control total sobre cómo se usa la IA." },
    { key: "sexy_benefit", label: "¿Cuál es el beneficio 'sexy'? (lo que emociona al decisor)", placeholder: "Ej: Productividad, ventaja competitiva, innovación, velocidad" },
    { key: "defensive_benefit", label: "¿Cuál es el beneficio 'defensivo'? (lo que neutraliza al bloqueador)", placeholder: "Ej: Seguridad, compliance, control, reducción de riesgo" },
    { key: "stakeholders", label: "¿Quiénes son los stakeholders típicos en la decisión de compra?", placeholder: "Ej: CEO, COO, Director de RRHH, Compliance Officer, los propios empleados/usuarios" },
  ],
  messaging: [
    { key: "stakeholder_pains", label: "Para cada stakeholder: ¿cuál es su mayor dolor? ¿Qué KPI le quita el sueño?", placeholder: "Ej: CEO = crecimiento y competitividad. RRHH = adopción y engagement. Compliance = zero incidentes." },
    { key: "objections", label: "¿Qué objeciones te pone cada uno cuando vendes?", placeholder: "Ej: CEO dice 'ya tenemos otras prioridades'. RRHH dice 'los empleados no completarán otro curso'. Compliance dice 'es un riesgo'." },
    { key: "champion_vs_signer", label: "¿Quién es el campeón interno vs. el firmador?", placeholder: "Ej: RRHH suele ser el campeón, el CFO o CEO firma" },
    { key: "end_user_feeling", label: "Los usuarios finales: ¿qué sienten hoy? ¿Frustración, curiosidad, miedo?", placeholder: "Ej: Curiosidad mezclada con miedo a quedarse atrás y a hacer algo mal" },
  ],
  hormozi: [
    { key: "dream_outcome", label: "¿Cuál es el resultado soñado? Si todo funciona perfecto, ¿cómo se ve la empresa en 6 meses?", placeholder: "Ej: Cada empleado usa IA con confianza, la firma opera 30% más rápido, zero incidentes de compliance" },
    { key: "proof_elements", label: "¿Qué incluye tu producto que demuestra que funciona? (personalización, herramientas, soporte, etc.)", placeholder: "Ej: Wizard de personalización, prompt libraries listas, tracks por rol, dashboard de progreso, templates de compliance" },
    { key: "first_result", label: "¿Cuánto tarda un cliente en ver el primer resultado? ¿Qué obtiene la primera semana?", placeholder: "Ej: Los prompt libraries se pueden usar desde el día 1. En la primera semana ya están ahorrando tiempo." },
    { key: "biggest_fear", label: "¿Cuál es el mayor miedo del comprador?", placeholder: "Ej: Que los empleados no completen el curso y sea dinero tirado" },
    { key: "fear_mitigation", label: "¿Qué has hecho para minimizar ese miedo?", placeholder: "Ej: Formato self-paced, tracks cortos y relevantes, dashboard de seguimiento, contenido que parece su trabajo real" },
  ],
  pricing_strategy: [
    { key: "value_generated", label: "¿Cuánto valor aproximado genera tu producto por cliente? (tiempo, dinero, riesgo evitado)", placeholder: "Ej: Estimamos 3-5 horas/semana por empleado ahorradas, y evitar un potencial incidente de £50K+" },
    { key: "typical_budget", label: "¿Cuál es el presupuesto típico de tus clientes para este tipo de solución?", placeholder: "Ej: No estoy seguro, pero gastan £5K-20K en formación anual" },
    { key: "pricing_model", label: "¿Cómo quieres cobrar? (por usuario, por empresa, por proyecto, suscripción)", placeholder: "Ej: Por usuario con suscripción anual de renovación" },
    { key: "price_intuition", label: "¿Hay algún precio que te parezca 'demasiado bajo' o 'demasiado alto'?", placeholder: "Ej: Menos de €200/usuario se siente cheap. Más de €2000/usuario sería difícil de vender." },
    { key: "buy_motivation", label: "¿Compran por ROI (justifican con números) o por dolor (resuelven urgencia)?", placeholder: "Ej: Ambos, pero el trigger suele ser un susto de compliance o ver que el competidor ya lo hace" },
  ],
  pricing_justify: [
    { key: "time_saved", label: "¿Cuánto tiempo ahorra tu producto por usuario/mes?", placeholder: "Ej: ~12 horas/mes (3 horas/semana)" },
    { key: "cost_per_hour", label: "¿Cuál es el coste cargado por hora de quien lo usa? (o rango salarial)", placeholder: "Ej: ~€50/hora fully loaded. Si no lo sabes, déjalo en blanco y lo investigamos." },
    { key: "risk_avoided", label: "¿Qué riesgo evita tu producto? ¿Cuánto costaría ese incidente?", placeholder: "Ej: Un breach de datos de cliente puede costar €100K+ en multas y daño reputacional" },
    { key: "alternative_costs", label: "¿Cuánto cuestan las alternativas? (genérica, consultoría, interno)", placeholder: "Ej: Udemy ~€200, consultoría Big4 ~€100K+, interno requiere 6 meses de un equipo dedicado" },
    { key: "renewal_reason", label: "Si tienes suscripción: ¿por qué necesitan renovar?", placeholder: "Ej: IA cambia cada trimestre, regulación evoluciona, nuevos use cases. Opcional si no aplica." },
  ],
  positioning: [
    { key: "direct_competitors", label: "¿Quiénes son tus competidores directos?", placeholder: "Ej: No hay uno directo en wealth management, pero en finanzas genérica está X e Y" },
    { key: "indirect_competitors", label: "¿Y los indirectos? (consultoras, genéricos, DIY)", placeholder: "Ej: LinkedIn Learning, Coursera, Big4 (Deloitte Digital), o que lo intenten hacer internamente" },
    { key: "client_comparison", label: "¿Qué te dicen los clientes cuando comparan contigo vs. otros?", placeholder: "Ej: 'Lo vuestro se siente como si lo hubierais hecho para nosotros, lo otro es genérico'" },
    { key: "replication_effort", label: "¿Qué tendría que hacer un competidor para replicarte? ¿Cuánto le costaría?", placeholder: "Ej: Reconstruir contenido para 6 roles, con compliance de FCA y SEC, con workflows reales. Mínimo 1 año." },
  ],
};

// ─── SYSTEM PROMPT ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres un estratega de propuestas de valor de nivel world-class. Tu trabajo es ayudar al usuario a construir una propuesta de valor completa.

REGLAS FUNDAMENTALES:
- Responde SIEMPRE en español
- NUNCA inventes datos, cifras, nombres de competidores o métricas. Si no tienes un dato concreto del usuario o del research, escribe [DATO POR CONFIRMAR: descripción] para que lo rellene después.
- Sé brutalmente específico al sector del usuario.
- El tono es directo y seguro. Como un documento interno de estrategia, no un blog post.
- Escribe en prosa persuasiva con estructura clara.
- Usa SOLO los roles y workflows que el usuario describió. No inventes.
- Formatea en Markdown limpio.`;

// ─── RESEARCH PROMPT BUILDER ────────────────────────────────────────
function buildResearchPrompt(stepId, intake, discovery) {
  const sector = intake.audience || intake.product || "el sector";
  const product = intake.product || "el producto";
  const queries = {
    problems: `Investiga lo siguiente sobre el sector de "${sector}":
1. Riesgos documentados por no adoptar soluciones como "${product}"
2. Incidentes o casos públicos que ilustren consecuencias
3. Tendencias del sector que amplifiquen la urgencia de adoptar este tipo de solución
Presenta los hallazgos de forma estructurada y concisa.`,
    differentiator: `Investiga lo siguiente:
1. Qué ofrecen los competidores genéricos de "${product}" en el mercado de "${sector}" — nombres, precios, qué incluyen
2. Si hay competidores nicho específicos del mismo sector
3. Qué diferencias clave existen entre soluciones genéricas y específicas en este espacio
Presenta los hallazgos de forma estructurada.`,
    pricing_strategy: `Investiga lo siguiente para el sector "${sector}":
1. Precios de competidores directos de "${product}" 
2. Precios de alternativas genéricas (plataformas tipo Coursera, Udemy, herramientas SaaS horizontales)
3. Precios de consultoras / soluciones premium en este espacio
4. Salarios y costes por hora típicos de los roles que usarían este producto en ${intake.audience || "este sector"}
5. Benchmarks de pricing para modelos ${discovery?.pricing_model || "por usuario/suscripción"} en este mercado
Presenta los hallazgos con números concretos cuando los encuentres.`,
    pricing_justify: `Investiga lo siguiente:
1. Salarios y costes por hora típicos de los roles en "${sector}" (${intake.roles || "roles típicos"})
2. Costes documentados de incidentes o riesgos en el sector (multas, pérdidas, demandas)
3. Precios de competidores y alternativas a "${product}"
Presenta números concretos.`,
    positioning: `Investiga el panorama competitivo para "${product}" en "${sector}":
1. Competidores directos: nombres, precios, qué ofrecen
2. Consultoras que operan en este espacio y sus tarifas típicas
3. Soluciones genéricas que los clientes podrían considerar
4. Competidores nicho emergentes
Presenta hallazgos con nombres y datos concretos.`,
  };
  return queries[stepId] || null;
}

// ─── GENERATION PROMPT BUILDER ──────────────────────────────────────
function buildGenPrompt(stepId, intake, discovery, research, prevSections) {
  const ctx = `
PRODUCTO: ${intake.product || "—"}
AUDIENCIA: ${intake.audience || "—"}
PRECIO: ${intake.price || "No definido"}
ROLES: ${intake.roles || "—"}
PROBLEMA: ${intake.problem || "—"}
COMPETIDORES (usuario): ${intake.competitors || "No especificados"}
REGULACIÓN: ${intake.regulation || "No especificada"}
DATOS DE RESULTADOS: ${intake.results || "No disponibles"}

RESPUESTAS DE DISCOVERY:
${discovery ? Object.entries(discovery).map(([k, v]) => `${k}: ${v}`).join("\n") : "Ninguna"}

DATOS DE RESEARCH:
${research || "No disponible"}

SECCIONES ANTERIORES:
${Object.entries(prevSections).map(([k, v]) => `### ${k}\n${v}`).join("\n\n")}
`;

  const prompts = {
    problems: `${ctx}
---
TAREA: Genera la sección "El Problema que Resolvemos".

ESTRUCTURA:
1. Abre con 2-3 líneas: "Ahora mismo, la mayoría de [tipo de empresa] están atrapados en uno de tres lugares — y los tres les están costando."

2. Tres problemas, cada uno con:
   - Título corto y memorable
   - Párrafo de 4-6 líneas con situaciones REALES del sector. Usa los workflows y roles del usuario. Consecuencias concretas.
   - Si hay datos de research, incorpóralos.

3. Cierre: "[Producto] resuelve los tres problemas a la vez" + una frase de cómo.

REGLAS:
- Los problemas deben corresponderse con las "reacciones" que describió el usuario en Discovery.
- Si el usuario dio anécdotas, úsalas.
- Si falta un dato, marca [DATO POR CONFIRMAR: qué se necesita].`,

    differentiator: `${ctx}
---
TAREA: Genera "Diferenciador Core".

ESTRUCTURA:
1. Abre con: "Esta es la cosa más importante de lo que hemos construido, y tiene que ser lo más alto que digamos en cada conversación."
2. Párrafo de contraste vs. lo genérico (usa datos de research si los hay).
3. Mini-viñetas por ROL (solo los que describió el usuario):
   "Un [ROL] se sienta, [usa el producto], y sale sabiendo exactamente cómo [resultado específico]."
4. Por qué esta especificidad: pagan premium / funciona / no replicable.

REGLAS: Usa SOLO roles del usuario. Contraste con competidores del research.`,

    dual_promise: `${ctx}
---
TAREA: Genera "Doble Promesa".

ESTRUCTURA:
1. Identifica las dos promesas del usuario (sexy + defensiva).
2. Para cada una: por qué sola no basta + quién bloquearía + ejemplo concreto.
3. "Juntas, hacen la venta fácil": para cada stakeholder del usuario → qué obtiene.
4. Cierre: "No le pedimos a una persona que defienda la compra — le damos a cada stakeholder una razón para decir sí."

REGLAS: Usa SOLO los stakeholders que el usuario identificó.`,

    messaging: `${ctx}
---
TAREA: Genera "Messaging por Audiencia".

Para CADA stakeholder identificado:
1. Título: "Para [Rol]"
2. 2-3 párrafos: dolor específico → lo que el producto resuelve PARA ÉL → objeción neutralizada → urgencia/coste de oportunidad.
3. Tono adaptado: C-suite=estratégico, Managers=práctico, Compliance=defensivo, Usuarios=empático.

REGLAS: No incluyas audiencias que el usuario no mencionó.`,

    hormozi: `${ctx}
---
TAREA: Genera "Oferta Irresistible" (Hormozi).

ESTRUCTURA:
1. Fórmula: Valor = (Resultado Soñado × Probabilidad Percibida) / (Tiempo × Esfuerzo)
2. RESULTADO SOÑADO: estado ideal en 4-5 líneas (del usuario).
3. PROBABILIDAD PERCIBIDA: 4-5 elementos del producto que señalan "esto funciona" (del usuario).
4. TIEMPO: valor en la primera semana (del usuario).
5. ESFUERZO: mayor miedo + cómo se neutraliza (del usuario).

REGLAS: Cada punto viene del Discovery. Si falta algo, marca [POR COMPLETAR].`,

    pricing_strategy: `${ctx}
---
TAREA: Propón una estrategia de pricing fundamentada en datos.

ESTRUCTURA:

1. ANÁLISIS DEL MERCADO:
   Lo que cobra la competencia en 3 niveles (del research):
   - Genérica/barata: nombre, precio, qué incluye, qué no
   - Competidor cercano: nombre, precio, qué incluye, qué no  
   - Premium/consultora: nombre, precio, qué incluye, qué no

2. CÁLCULO DE VALOR:
   Con datos del usuario y research:
   - Valor por usuario/año (horas × coste/hora, o ingresos, o riesgo evitado)
   - Cuenta completa. Si hay datos de research, indícalo: "Según benchmarks..."

3. TRES OPCIONES:
   
   Opción A — Anclada en competidores:
   Precio, lógica ("más que genérico, menos que consultoría"), margen.
   
   Opción B — Anclada en valor:
   Precio (10-20% del valor generado), ROI, payback.
   
   Opción C — Anclada en dolor:
   Precio, coste de NO resolver, lógica de "seguro".

4. RECOMENDACIÓN: cuál y por qué. Sugerir suscripción si aplica.

REGLAS: TODOS los números del Discovery o Research. Si falta, [BENCHMARK NO DISPONIBLE].`,

    pricing_justify: `${ctx}
---
TAREA: Genera "Justificación de Precio" para el precio ${intake.price || "[precio por definir]"}.

ESTRUCTURA:
1. Precio y escala: "A [precio], una empresa de [tamaño X] invierte [Y]. Son cifras que requieren justificación."
2. ROI: horas × coste/hora → por persona/año → por empresa/año → payback period. Cuentas completas.
3. RIESGO: coste del incidente vs. coste del producto.
4. COMPETITIVO: coste de oportunidad mensual.
5. Si hay suscripción: justificación (ritmo de cambio, actualizaciones).

REGLAS: TODOS los números del Discovery o Research. Si falta, [NECESITAS CONFIRMAR: qué].`,

    positioning: `${ctx}
---
TAREA: Genera "Posicionamiento Competitivo".

ESTRUCTURA:
1. QUÉ EXISTE HOY: 3-4 categorías con ejemplos reales (del usuario + research), precio, por qué no es suficiente.
2. DÓNDE ENCAJAMOS: frase en negrita de posición única. Contraste directo con cada categoría.
3. NUESTRO MOAT: "La especificidad es el moat." Esfuerzo de construcción. Qué tendría que hacer cada competidor.

REGLAS: Nombres reales solo del usuario o research verificado.`,

    oneliners: `${ctx}
---
TAREA: 6 one-liners.
1. Web (hero): máx 20 palabras. Nicho + resultado + inmediatez.
2. LinkedIn bio: "Ayudamos a [sector] a [resultado] — con [diferenciador]."
3. Cold outreach: 2 frases. Problema → solución.
4. Elevator pitch: 3-4 frases, 30 segundos.
5. Conferencia: arranca con "La mayoría de X no funciona en Y porque Z."
6. Partnerships: "Somos la capa de X para Y."

REGLAS: Cada una reconocible como del mismo producto. No intercambiables.`,

    headline: `${ctx}
---
TAREA: Headline definitiva + Supporting Pitch.

PARTE 1: 3 opciones de headline (20-25 palabras). Nicho + resultado + inmediatez. 1 línea de porqué funciona cada una.
PARTE 2: Supporting Pitch (2 párrafos): qué es y qué NO es + resultado del cliente.

REGLAS: Se hace ÚLTIMO. Cada palabra con peso. Nada genérico.`,
  };
  return prompts[stepId] || "";
}

// ─── MARKDOWN RENDERER ──────────────────────────────────────────────
const Md = ({ text }) => {
  if (!text) return null;
  const lines = text.split("\n");
  const els = [];
  let i = 0;
  const inline = (s) => {
    const parts = [];
    let rest = s, k = 0;
    while (rest) {
      const m = rest.match(/\*\*(.+?)\*\*/);
      if (m) {
        const idx = rest.indexOf(m[0]);
        if (idx > 0) parts.push(<span key={k++}>{rest.slice(0, idx)}</span>);
        parts.push(<strong key={k++} style={{ fontWeight: 700, color: "#e8e6e3" }}>{m[1]}</strong>);
        rest = rest.slice(idx + m[0].length);
      } else { parts.push(<span key={k++}>{rest}</span>); break; }
    }
    return parts;
  };
  while (i < lines.length) {
    const l = lines[i];
    if (l.startsWith("### ")) els.push(<h3 key={i} style={{ fontSize: "1.05rem", fontWeight: 700, margin: "1.4rem 0 0.4rem", color: "#e8e6e3" }}>{inline(l.slice(4))}</h3>);
    else if (l.startsWith("## ")) els.push(<h2 key={i} style={{ fontSize: "1.15rem", fontWeight: 700, margin: "1.6rem 0 0.5rem", color: "#e8e6e3" }}>{inline(l.slice(3))}</h2>);
    else if (l.startsWith("# ")) els.push(<h1 key={i} style={{ fontSize: "1.3rem", fontWeight: 800, margin: "1.8rem 0 0.6rem", color: "#e8e6e3" }}>{inline(l.slice(2))}</h1>);
    else if (l.startsWith("- ") || l.startsWith("* ")) {
      const items = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(<li key={i} style={{ marginBottom: "0.35rem", lineHeight: 1.7 }}>{inline(lines[i].slice(2))}</li>);
        i++;
      }
      els.push(<ul key={`u${i}`} style={{ marginLeft: "1.2rem", marginBottom: "0.8rem", listStyleType: "disc" }}>{items}</ul>);
      continue;
    } else if (/^\d+\.\s/.test(l)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(<li key={i} style={{ marginBottom: "0.35rem", lineHeight: 1.7 }}>{inline(lines[i].replace(/^\d+\.\s/, ""))}</li>);
        i++;
      }
      els.push(<ol key={`o${i}`} style={{ marginLeft: "1.2rem", marginBottom: "0.8rem" }}>{items}</ol>);
      continue;
    } else if (l.trim() === "---") els.push(<hr key={i} style={{ border: "none", borderTop: "1px solid #1e1e21", margin: "1.2rem 0" }} />);
    else if (l.trim() === "") els.push(<div key={i} style={{ height: "0.4rem" }} />);
    else els.push(<p key={i} style={{ marginBottom: "0.7rem", lineHeight: 1.75 }}>{inline(l)}</p>);
    i++;
  }
  return <div>{els}</div>;
};

// ─── API CALL ───────────────────────────────────────────────────────
async function callAPI(messages, useSearch = false) {
  const body = {
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    messages,
  };
  if (useSearch) {
    body.tools = [{ type: "web_search_20250305", name: "web_search" }];
  }
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  return data.content?.filter((b) => b.type === "text").map((b) => b.text).join("\n") || "";
}

// ─── INPUT COMPONENTS ───────────────────────────────────────────────
const inputStyle = {
  width: "100%", background: "#111113", border: "1px solid #2a2a2d",
  borderRadius: "8px", padding: "0.8rem 1rem", color: "#e8e6e3",
  fontSize: "0.88rem", fontFamily: "Georgia, serif", lineHeight: 1.6,
  resize: "vertical", outline: "none", boxSizing: "border-box",
};
const labelStyle = {
  display: "block", fontSize: "0.82rem", fontWeight: 600,
  marginBottom: "0.4rem", color: "#bbb", fontFamily: "'Helvetica Neue', sans-serif",
};

const Field = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div style={{ marginBottom: "1.2rem" }}>
    <label style={labelStyle}>{label}</label>
    <textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
  </div>
);

// ─── MAIN COMPONENT ─────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [intake, setIntake] = useState({ product: "", audience: "", price: "", roles: "", problem: "", competitors: "", regulation: "", results: "" });
  const [disc, setDisc] = useState({});
  const [research, setResearch] = useState({});
  const [sections, setSections] = useState({});
  const [phase, setPhase] = useState("discovery");
  const [error, setError] = useState(null);
  const [editFb, setEditFb] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const contentRef = useRef(null);

  const s = STEPS[step];
  const isIntake = s.id === "intake";
  const hasPriceAlready = intake.price.trim().length > 0;
  const pricingDiscKey = s.id === "pricing" ? (hasPriceAlready ? "pricing_justify" : "pricing_strategy") : s.id;
  const pricingGenKey = s.id === "pricing" ? (hasPriceAlready ? "pricing_justify" : "pricing_strategy") : s.id;
  const questions = DISCOVERY[pricingDiscKey] || [];
  const hasSection = !!sections[s.id];
  const hasDisc = disc[pricingDiscKey] && Object.values(disc[pricingDiscKey]).some((v) => v.trim());

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setPhase(sections[s.id] ? "done" : "discovery");
    setShowEdit(false);
    setEditFb("");
    setError(null);
  }, [step]);

  const updateDisc = (key, val) => {
    setDisc((prev) => ({ ...prev, [pricingDiscKey]: { ...(prev[pricingDiscKey] || {}), [key]: val } }));
  };

  const doResearchAndGenerate = async (feedback = null) => {
    setError(null);
    const discData = disc[pricingDiscKey] || {};
    const needsResearch = ["problems", "differentiator", "pricing_strategy", "pricing_justify", "positioning"].includes(pricingGenKey);

    // Research phase
    let researchResult = research[s.id] || "";
    if (needsResearch && !researchResult) {
      setPhase("researching");
      try {
        const rPrompt = buildResearchPrompt(pricingGenKey, intake, discData);
        if (rPrompt) {
          researchResult = await callAPI([{ role: "user", content: rPrompt }], true);
          setResearch((prev) => ({ ...prev, [s.id]: researchResult }));
        }
      } catch (e) {
        console.warn("Research failed, continuing without:", e.message);
        researchResult = "Research no disponible — se generará con los datos del usuario.";
      }
    }

    // Generation phase
    setPhase("generating");
    try {
      let prompt = buildGenPrompt(pricingGenKey, intake, discData, researchResult, sections);
      if (feedback) prompt += `\n\nFEEDBACK DEL USUARIO:\n${feedback}\nRegenera incorporando este feedback.`;
      const result = await callAPI([{ role: "user", content: prompt }]);
      setSections((prev) => ({ ...prev, [s.id]: result }));
      setPhase("done");
      setShowEdit(false);
      setEditFb("");
    } catch (e) {
      setError(e.message);
      setPhase("discovery");
    }
  };

  const exportMd = () => {
    const order = ["headline", "problems", "differentiator", "dual_promise", "messaging", "hormozi", "pricing", "positioning", "oneliners"];
    const titles = { headline: "Headline & Supporting Pitch", problems: "El Problema que Resolvemos", differentiator: "Diferenciador Core", dual_promise: "Doble Promesa", messaging: "Messaging por Audiencia", hormozi: "Oferta Irresistible", pricing: "Pricing", positioning: "Posicionamiento Competitivo", oneliners: "One-Liners" };
    let md = `# Propuesta de Valor\n\n---\n\n`;
    for (const k of order) if (sections[k]) md += `## ${titles[k]}\n\n${sections[k]}\n\n---\n\n`;
    const blob = new Blob([md], { type: "text/markdown" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "propuesta-de-valor.md"; a.click();
  };

  const completed = Object.keys(sections).length;
  const canGo = isIntake ? intake.product.trim() && intake.audience.trim() : true;

  // ─── RENDER ─────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0b", color: "#e8e6e3", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #1a1a1d", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0d0d0e", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <span style={{ fontSize: "1.3rem" }}>◆</span>
          <div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, fontFamily: "'Helvetica Neue', sans-serif" }}>Value Proposition Builder</div>
            <div style={{ fontSize: "0.7rem", color: "#555", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Helvetica Neue', sans-serif" }}>{completed}/{STEPS.length - 1} secciones</div>
          </div>
        </div>
        {completed > 0 && (
          <button onClick={exportMd} style={{ background: "transparent", color: "#888", border: "1px solid #333", padding: "0.45rem 1rem", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>
            Exportar .md
          </button>
        )}
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: "240px", borderRight: "1px solid #1a1a1d", padding: "0.8rem 0", overflowY: "auto", flexShrink: 0, background: "#0b0b0c" }}>
          {STEPS.map((st, i) => {
            const done = !!sections[st.id];
            const active = i === step;
            const enabled = i === 0 || intake.product.trim();
            return (
              <button key={st.id} onClick={() => enabled && setStep(i)} style={{
                display: "flex", alignItems: "center", gap: "0.65rem", width: "100%",
                padding: "0.6rem 1rem", background: active ? "#161618" : "transparent",
                border: "none", borderLeft: active ? "2px solid #e8e6e3" : "2px solid transparent",
                color: active ? "#e8e6e3" : done ? "#777" : "#444",
                cursor: enabled ? "pointer" : "not-allowed", textAlign: "left",
                fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.8rem",
                opacity: enabled ? 1 : 0.35, transition: "all 0.15s",
              }}>
                <span style={{ fontSize: "0.95rem", width: "22px", textAlign: "center" }}>{done && !active ? "✓" : st.icon}</span>
                <span style={{ fontWeight: active ? 600 : 400 }}>{st.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div ref={contentRef} style={{ flex: 1, overflowY: "auto", padding: "2rem 2.5rem", maxWidth: "800px" }}>
          {/* Step header */}
          <div style={{ marginBottom: "1.8rem" }}>
            <div style={{ fontSize: "0.68rem", color: "#555", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.4rem", fontFamily: "'Helvetica Neue', sans-serif" }}>
              Paso {step + 1} de {STEPS.length}
              {s.id === "pricing" && <span> — {hasPriceAlready ? "Justificación" : "Estrategia (sin precio definido)"}</span>}
            </div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "0.3rem", fontFamily: "'Helvetica Neue', sans-serif" }}>
              {s.icon} {s.title}
            </h1>
            <p style={{ color: "#777", fontSize: "0.9rem" }}>{s.subtitle}</p>
          </div>

          {/* ── INTAKE ── */}
          {isIntake && (
            <div>
              <Field label="¿Qué es tu producto o servicio?" value={intake.product} onChange={(v) => setIntake((p) => ({ ...p, product: v }))} placeholder="Describe qué vendes como si se lo explicaras a alguien inteligente que no sabe nada de tu sector" />
              <Field label="¿A quién se lo vendes? (sector, tamaño, geografía)" value={intake.audience} onChange={(v) => setIntake((p) => ({ ...p, audience: v }))} placeholder="Ej: Restaurantes de gama media-alta con 20-100 empleados en España" />
              <Field label="¿Tienes precio definido? (si no, déjalo en blanco — te ayudo a definirlo)" value={intake.price} onChange={(v) => setIntake((p) => ({ ...p, price: v }))} placeholder="Ej: €997 por usuario. Si no lo sabes, déjalo vacío." rows={1} />
              <Field label="¿Qué roles dentro de la empresa del cliente usan tu producto?" value={intake.roles} onChange={(v) => setIntake((p) => ({ ...p, roles: v }))} placeholder="Ej: Advisors, paraplanners, compliance officers, operations, research analysts, managers" />
              <Field label="¿Qué problema resuelves? ¿Qué hacen hoy sin tu producto?" value={intake.problem} onChange={(v) => setIntake((p) => ({ ...p, problem: v }))} placeholder="Ej: Los equipos tardan horas en tareas que con IA tardarían minutos, pero no saben cómo usarla de forma segura" />
              <Field label="¿Conoces competidores? (nombres, precios si los sabes)" value={intake.competitors} onChange={(v) => setIntake((p) => ({ ...p, competitors: v }))} placeholder="Si no los conoces, déjalo en blanco — los investigamos" />
              <Field label="¿Entorno regulatorio? (reguladores, normativas)" value={intake.regulation} onChange={(v) => setIntake((p) => ({ ...p, regulation: v }))} placeholder="Ej: FCA en UK, SEC en US. Si no aplica, escribe 'No aplica'" rows={2} />
              <Field label="¿Datos de resultados? (tiempo ahorrado, clientes, métricas)" value={intake.results} onChange={(v) => setIntake((p) => ({ ...p, results: v }))} placeholder="Todo lo que tengas: 'ahorra ~3h/semana', '20 clientes beta', etc. Aunque sea aproximado." rows={2} />
            </div>
          )}

          {/* ── CONTENT STEPS ── */}
          {!isIntake && (
            <>
              {/* Discovery Phase */}
              {phase === "discovery" && !hasSection && questions.length > 0 && (
                <div>
                  <div style={{ background: "#111113", border: "1px solid #1e1e21", borderRadius: "10px", padding: "1.2rem", marginBottom: "1.5rem", color: "#888", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    Antes de generar, necesito entender bien tu caso. Responde lo que puedas — lo que no sepas, lo investigo.
                  </div>
                  {questions.map((q) => (
                    <Field key={q.key} label={q.label} value={disc[pricingDiscKey]?.[q.key] || ""} onChange={(v) => updateDisc(q.key, v)} placeholder={q.placeholder} />
                  ))}
                  <button onClick={() => doResearchAndGenerate()} disabled={!hasDisc} style={{
                    background: hasDisc ? "#e8e6e3" : "#222", color: hasDisc ? "#0a0a0b" : "#555",
                    border: "none", padding: "0.75rem 1.8rem", borderRadius: "8px", fontSize: "0.88rem",
                    fontWeight: 700, cursor: hasDisc ? "pointer" : "not-allowed", fontFamily: "'Helvetica Neue', sans-serif",
                  }}>
                    Investigar + Generar →
                  </button>
                </div>
              )}

              {/* No-discovery steps (oneliners, headline) */}
              {phase === "discovery" && !hasSection && questions.length === 0 && (
                <div>
                  <div style={{ background: "#111113", border: "1px solid #1e1e21", borderRadius: "10px", padding: "1.2rem", marginBottom: "1.5rem", color: "#888", fontSize: "0.85rem", lineHeight: 1.6 }}>
                    Esta sección se genera directamente con todo el material que ya tenemos de los pasos anteriores.
                  </div>
                  <button onClick={() => doResearchAndGenerate()} style={{
                    background: "#e8e6e3", color: "#0a0a0b", border: "none", padding: "0.75rem 1.8rem",
                    borderRadius: "8px", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif",
                  }}>
                    Generar →
                  </button>
                </div>
              )}

              {/* Researching */}
              {phase === "researching" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 2rem", gap: "1rem" }}>
                  <div style={{ width: "28px", height: "28px", border: "2px solid #333", borderTop: "2px solid #e8e6e3", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <div style={{ color: "#888", fontSize: "0.85rem", fontFamily: "'Helvetica Neue', sans-serif" }}>Investigando el mercado...</div>
                  <div style={{ color: "#555", fontSize: "0.75rem", fontFamily: "'Helvetica Neue', sans-serif" }}>Buscando competidores, benchmarks y datos del sector</div>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
              )}

              {/* Generating */}
              {phase === "generating" && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 2rem", gap: "1rem" }}>
                  <div style={{ width: "28px", height: "28px", border: "2px solid #333", borderTop: "2px solid #e8e6e3", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  <div style={{ color: "#888", fontSize: "0.85rem", fontFamily: "'Helvetica Neue', sans-serif" }}>Generando con datos reales...</div>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                </div>
              )}

              {/* Error */}
              {error && (
                <div style={{ background: "#1a1111", border: "1px solid #3a1111", borderRadius: "10px", padding: "1rem", marginBottom: "1rem", color: "#e88", fontSize: "0.82rem" }}>
                  Error: {error}
                  <button onClick={() => { setPhase("discovery"); setError(null); }} style={{ display: "block", marginTop: "0.6rem", background: "#2a1515", border: "1px solid #4a2020", color: "#e88", padding: "0.35rem 0.8rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem" }}>
                    Reintentar
                  </button>
                </div>
              )}

              {/* Result */}
              {phase === "done" && hasSection && (
                <>
                  {/* Research summary */}
                  {research[s.id] && (
                    <details style={{ marginBottom: "1rem" }}>
                      <summary style={{ color: "#555", fontSize: "0.78rem", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif", padding: "0.4rem 0" }}>
                        📎 Ver datos de research utilizados
                      </summary>
                      <div style={{ background: "#0e0e10", border: "1px solid #1a1a1d", borderRadius: "8px", padding: "1rem", marginTop: "0.5rem", fontSize: "0.82rem", color: "#888", maxHeight: "300px", overflowY: "auto", lineHeight: 1.6 }}>
                        <Md text={research[s.id]} />
                      </div>
                    </details>
                  )}

                  {/* Content */}
                  <div style={{ background: "#0f0f11", border: "1px solid #1e1e21", borderRadius: "12px", padding: "1.8rem", marginBottom: "1.2rem", fontSize: "0.88rem", lineHeight: 1.75, color: "#ccc" }}>
                    <Md text={sections[s.id]} />
                  </div>

                  {/* Actions */}
                  {showEdit ? (
                    <div style={{ marginBottom: "1.2rem" }}>
                      <textarea value={editFb} onChange={(e) => setEditFb(e.target.value)} placeholder="Dime qué cambiar: más agresivo, enfócate en X, añade Y, los números no cuadran..." rows={3} style={inputStyle} />
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.6rem" }}>
                        <button onClick={() => { setPhase("generating"); doResearchAndGenerate(editFb); }} disabled={!editFb.trim()} style={{ background: editFb.trim() ? "#e8e6e3" : "#333", color: editFb.trim() ? "#0a0a0b" : "#666", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.78rem", fontWeight: 600, cursor: editFb.trim() ? "pointer" : "not-allowed", fontFamily: "'Helvetica Neue', sans-serif" }}>
                          Regenerar con feedback
                        </button>
                        <button onClick={() => { setShowEdit(false); setEditFb(""); }} style={{ background: "transparent", color: "#666", border: "1px solid #333", padding: "0.5rem 0.8rem", borderRadius: "6px", fontSize: "0.78rem", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.2rem" }}>
                      <button onClick={() => setShowEdit(true)} style={{ background: "transparent", color: "#888", border: "1px solid #2a2a2d", padding: "0.45rem 0.9rem", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>
                        ✎ Refinar
                      </button>
                      <button onClick={() => { setResearch((p) => { const n = { ...p }; delete n[s.id]; return n; }); doResearchAndGenerate(); }} style={{ background: "transparent", color: "#555", border: "1px solid #222", padding: "0.45rem 0.9rem", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>
                        ↻ Desde cero
                      </button>
                      <button onClick={() => { setPhase("discovery"); setSections((p) => { const n = { ...p }; delete n[s.id]; return n; }); setResearch((p) => { const n = { ...p }; delete n[s.id]; return n; }); }} style={{ background: "transparent", color: "#444", border: "1px solid #1a1a1d", padding: "0.45rem 0.9rem", borderRadius: "6px", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>
                        ← Volver a discovery
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.2rem", borderTop: "1px solid #1a1a1d" }}>
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} style={{
              background: "transparent", color: step === 0 ? "#333" : "#777", border: "1px solid #222",
              padding: "0.5rem 1rem", borderRadius: "6px", fontSize: "0.8rem",
              cursor: step === 0 ? "not-allowed" : "pointer", fontFamily: "'Helvetica Neue', sans-serif",
            }}>← Anterior</button>
            {step < STEPS.length - 1 && (
              <button onClick={() => setStep((s) => s + 1)} disabled={!canGo} style={{
                background: canGo ? "#e8e6e3" : "#222", color: canGo ? "#0a0a0b" : "#555",
                border: "none", padding: "0.5rem 1.2rem", borderRadius: "6px", fontSize: "0.8rem",
                fontWeight: 600, cursor: canGo ? "pointer" : "not-allowed", fontFamily: "'Helvetica Neue', sans-serif",
              }}>Siguiente →</button>
            )}
            {step === STEPS.length - 1 && completed > 0 && (
              <button onClick={exportMd} style={{ background: "#e8e6e3", color: "#0a0a0b", border: "none", padding: "0.5rem 1.2rem", borderRadius: "6px", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Helvetica Neue', sans-serif" }}>
                Exportar completa ↓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
