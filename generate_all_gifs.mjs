import { Image, Frame, GIF } from 'imagescript';
import fs from 'fs';
import path from 'path';

const WIDTH = 860;
const HEIGHT = 480;

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper to render an SVG frame into an ImageScript Image
async function renderSvg(svgString) {
  return await Image.renderSVG(svgString, 1);
}

// ----------------------------------------------------
// 1. SPICYSWIPE ANIMATED SHOWCASE GIF
// ----------------------------------------------------
async function createSpicySwipeGif() {
  console.log("Creating SpicySwipe showcase GIF...");
  const frames = [];

  const bannerImg = await Image.decode(fs.readFileSync("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/screenshots/banner.png"));
  const aiTabImg = await Image.decode(fs.readFileSync("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/docs/AI tab.png"));
  const statsTabImg = await Image.decode(fs.readFileSync("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/docs/satus tab.png"));
  const msgImg = await Image.decode(fs.readFileSync("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/docs/suggested message.png"));
  const screen1Img = await Image.decode(fs.readFileSync("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/screenshots/1.png"));

  // Slide 1: Platform Overview & Multi-LLM
  {
    const headerSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b0f19" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="10" stroke="#1e293b" stroke-width="2" />
      
      <!-- Window Titlebar -->
      <rect width="${WIDTH}" height="38" fill="#0f172a" rx="10" />
      <rect y="36" width="${WIDTH}" height="2" fill="#1e293b" />
      <circle cx="20" cy="19" r="5" fill="#ef4444" />
      <circle cx="36" cy="19" r="5" fill="#f59e0b" />
      <circle cx="52" cy="19" r="5" fill="#10b981" />
      <text x="80" y="24" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600">SpicySwipe v1.4.1 • AI Browser Extension (Manifest V3)</text>
      <rect x="${WIDTH - 170}" y="8" width="150" height="22" rx="4" fill="#1e1b4b" stroke="#6366f1" stroke-width="1" />
      <text x="${WIDTH - 95}" y="23" fill="#a5b4fc" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">OLLAMA + CLAUDE + GPT</text>

      <!-- Bottom Status Bar -->
      <rect y="${HEIGHT - 40}" width="${WIDTH}" height="40" fill="#0f172a" />
      <line x1="0" y1="${HEIGHT - 40}" x2="${WIDTH}" y2="${HEIGHT - 40}" stroke="#1e293b" stroke-width="1" />
      <circle cx="25" cy="${HEIGHT - 20}" r="4" fill="#22c55e" />
      <text x="38" y="${HEIGHT - 16}" fill="#f1f5f9" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Feature 1/3: Multi-LLM Generation &amp; Privacy-First Local AI</text>
      <text x="${WIDTH - 25}" y="${HEIGHT - 16}" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="end">Live Production Extension</text>
    </svg>
    `;
    const frameImg = await renderSvg(headerSvg);
    const bannerFit = bannerImg.clone().fit(WIDTH - 40, HEIGHT - 100);
    const posX = Math.floor((WIDTH - bannerFit.width) / 2) + 1;
    const posY = 48 + Math.floor((HEIGHT - 100 - bannerFit.height) / 2);
    frameImg.composite(bannerFit, posX, posY);
    frames.push(Frame.from(frameImg, 2600));
  }

  // Slide 2: AI Multi-Model Sidebar & Context Generation
  {
    const headerSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b0f19" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="10" stroke="#1e293b" stroke-width="2" />
      
      <!-- Window Titlebar -->
      <rect width="${WIDTH}" height="38" fill="#0f172a" rx="10" />
      <rect y="36" width="${WIDTH}" height="2" fill="#1e293b" />
      <circle cx="20" cy="19" r="5" fill="#ef4444" />
      <circle cx="36" cy="19" r="5" fill="#f59e0b" />
      <circle cx="52" cy="19" r="5" fill="#10b981" />
      <text x="80" y="24" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">SpicySwipe • Context Analysis &amp; Tone Adaptation</text>
      <rect x="${WIDTH - 150}" y="8" width="130" height="22" rx="4" fill="#064e3b" stroke="#10b981" stroke-width="1" />
      <text x="${WIDTH - 85}" y="23" fill="#6ee7b7" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">SMART PERSONAS</text>

      <!-- Glass Panel on Right -->
      <rect x="360" y="55" width="470" height="365" rx="8" fill="#1e293b" opacity="0.6" stroke="#334155" />
      <text x="385" y="90" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="15" font-weight="700">⚡ Adaptive AI Workflow</text>
      <text x="385" y="118" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">1. Dynamic Profile Bio Extraction</text>
      <text x="385" y="140" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">2. Persona Tuning: Witty / Playful / Direct / Charming</text>
      <text x="385" y="162" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">3. One-Click Context-Aware Dispatch</text>

      <!-- Bottom Status Bar -->
      <rect y="${HEIGHT - 40}" width="${WIDTH}" height="40" fill="#0f172a" />
      <line x1="0" y1="${HEIGHT - 40}" x2="${WIDTH}" y2="${HEIGHT - 40}" stroke="#1e293b" stroke-width="1" />
      <circle cx="25" cy="${HEIGHT - 20}" r="4" fill="#38bdf8" />
      <text x="38" y="${HEIGHT - 16}" fill="#f1f5f9" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Feature 2/3: Intelligent Bio Parsing &amp; Tone Customization</text>
      <text x="${WIDTH - 25}" y="${HEIGHT - 16}" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="end">Manifest V3 Secure Runtime</text>
    </svg>
    `;
    const frameImg = await renderSvg(headerSvg);
    const aiTabFit = aiTabImg.clone().fit(310, 365);
    const msgFit = msgImg.clone().fit(420, 200);

    frameImg.composite(aiTabFit, 30, 55);
    frameImg.composite(msgFit, 385, 200);
    frames.push(Frame.from(frameImg, 2600));
  }

  // Slide 3: Performance Telemetry & Stealth Engine
  {
    const headerSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b0f19" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="10" stroke="#1e293b" stroke-width="2" />
      
      <!-- Window Titlebar -->
      <rect width="${WIDTH}" height="38" fill="#0f172a" rx="10" />
      <rect y="36" width="${WIDTH}" height="2" fill="#1e293b" />
      <circle cx="20" cy="19" r="5" fill="#ef4444" />
      <circle cx="36" cy="19" r="5" fill="#f59e0b" />
      <circle cx="52" cy="19" r="5" fill="#10b981" />
      <text x="80" y="24" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">SpicySwipe • Realtime Match Analytics &amp; Security Guard</text>
      <rect x="${WIDTH - 150}" y="8" width="130" height="22" rx="4" fill="#701a75" stroke="#d946ef" stroke-width="1" />
      <text x="${WIDTH - 85}" y="23" fill="#f5d0fe" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">LIVE TELEMETRY</text>

      <!-- Feature Card on Right -->
      <rect x="360" y="55" width="470" height="365" rx="8" fill="#1e293b" opacity="0.6" stroke="#334155" />
      <text x="385" y="90" fill="#a855f7" font-family="system-ui, sans-serif" font-size="15" font-weight="700">🛡️ Security &amp; Stealth Engine 2.0</text>
      <text x="385" y="118" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">✔ DOM XSS Sanitization (Strict HTML Escaping)</text>
      <text x="385" y="140" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">✔ Runtime Sender Authorization &amp; Key Shielding</text>
      <text x="385" y="162" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="12">✔ Gaussian Timing &amp; Bézier Cursor Curves</text>

      <!-- Bottom Status Bar -->
      <rect y="${HEIGHT - 40}" width="${WIDTH}" height="40" fill="#0f172a" />
      <line x1="0" y1="${HEIGHT - 40}" x2="${WIDTH}" y2="${HEIGHT - 40}" stroke="#1e293b" stroke-width="1" />
      <circle cx="25" cy="${HEIGHT - 20}" r="4" fill="#a855f7" />
      <text x="38" y="${HEIGHT - 16}" fill="#f1f5f9" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Feature 3/3: Conversation Analytics, Swipe Stats &amp; Security</text>
      <text x="${WIDTH - 25}" y="${HEIGHT - 16}" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="end">79+ Production Commits</text>
    </svg>
    `;
    const frameImg = await renderSvg(headerSvg);
    const statsTabFit = statsTabImg.clone().fit(310, 365);
    const screen1Fit = screen1Img.clone().fit(420, 200);

    frameImg.composite(statsTabFit, 30, 55);
    frameImg.composite(screen1Fit, 385, 200);
    frames.push(Frame.from(frameImg, 2600));
  }

  const gif = new GIF(frames);
  const buf = await gif.encode(40);
  fs.writeFileSync("d:/extentuin/aboutme/assets/spicyswipe-demo.gif", buf);
  console.log(`SpicySwipe showcase GIF created: ${buf.length} bytes`);
}

// ----------------------------------------------------
// 2. ONWARD90 ANIMATED SHOWCASE GIF
// ----------------------------------------------------
async function createOnward90Gif() {
  console.log("Creating Onward90 showcase GIF...");
  const frames = [];

  const homeImg = await Image.decode(fs.readFileSync("D:/extentuin/90days/public/screenshots/home.png"));
  const dashImg = await Image.decode(fs.readFileSync("D:/extentuin/90days/public/screenshots/dashboard.png"));
  const loginImg = await Image.decode(fs.readFileSync("D:/extentuin/90days/public/screenshots/login.png"));

  const slides = [
    {
      img: homeImg,
      badge: "DAY-BY-DAY JOURNEY",
      badgeColor: "#0284c7",
      title: "Onward90 • 90-Day Interactive Employee Onboarding Platform",
      status: "Slide 1/3: Role-Based Journeys &amp; Milestone Tracking",
      meta: "Next.js 15 • TailwindCSS • Prisma ORM"
    },
    {
      img: dashImg,
      badge: "HR ADMIN CONSOLE",
      badgeColor: "#10b981",
      title: "Onward90 • HR Onboarding Health &amp; Retention Analytics",
      status: "Slide 2/3: Real-Time Team Progress &amp; Ramp-Up Metrics",
      meta: "PostgreSQL • Serverless Analytics"
    },
    {
      img: loginImg,
      badge: "AUTH &amp; SECURITY",
      badgeColor: "#8b5cf6",
      title: "Onward90 • Enterprise Role-Based Authentication &amp; Guardrails",
      status: "Slide 3/3: Manager Checkpoints, Buddies &amp; Pulse Surveys",
      meta: "Auth.js (NextAuth v5) • Neon Postgres"
    }
  ];

  for (const slide of slides) {
    const headerSvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b0f19" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="10" stroke="#1e293b" stroke-width="2" />
      
      <!-- Window Titlebar -->
      <rect width="${WIDTH}" height="38" fill="#0f172a" rx="10" />
      <rect y="36" width="${WIDTH}" height="2" fill="#1e293b" />
      <circle cx="20" cy="19" r="5" fill="#ef4444" />
      <circle cx="36" cy="19" r="5" fill="#f59e0b" />
      <circle cx="52" cy="19" r="5" fill="#10b981" />
      <text x="80" y="24" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">${slide.title}</text>
      <rect x="${WIDTH - 170}" y="8" width="150" height="22" rx="4" fill="#0f172a" stroke="${slide.badgeColor}" stroke-width="1" />
      <text x="${WIDTH - 95}" y="23" fill="${slide.badgeColor}" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${slide.badge}</text>

      <!-- Bottom Status Bar -->
      <rect y="${HEIGHT - 40}" width="${WIDTH}" height="40" fill="#0f172a" />
      <line x1="0" y1="${HEIGHT - 40}" x2="${WIDTH}" y2="${HEIGHT - 40}" stroke="#1e293b" stroke-width="1" />
      <circle cx="25" cy="${HEIGHT - 20}" r="4" fill="${slide.badgeColor}" />
      <text x="38" y="${HEIGHT - 16}" fill="#f1f5f9" font-family="system-ui, sans-serif" font-size="12" font-weight="600">${slide.status}</text>
      <text x="${WIDTH - 25}" y="${HEIGHT - 16}" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="end">${slide.meta}</text>
    </svg>
    `;
    const frameImg = await renderSvg(headerSvg);
    const contentFit = slide.img.clone().fit(WIDTH - 30, HEIGHT - 95);
    const posX = Math.floor((WIDTH - contentFit.width) / 2) + 1;
    const posY = 45 + Math.floor((HEIGHT - 95 - contentFit.height) / 2);
    frameImg.composite(contentFit, posX, posY);
    frames.push(Frame.from(frameImg, 2600));
  }

  const gif = new GIF(frames);
  const buf = await gif.encode(40);
  fs.writeFileSync("d:/extentuin/aboutme/assets/onward90-demo.gif", buf);
  console.log(`Onward90 showcase GIF created: ${buf.length} bytes`);
}

// ----------------------------------------------------
// 3. DRIFTGUARD ANIMATED ARCHITECTURE & GOVERNANCE GIF
// ----------------------------------------------------
async function createDriftGuardGif() {
  console.log("Creating DriftGuard showcase GIF...");
  const frames = [];

  const states = [
    {
      badge: "ACTIVE AGENT RUNTIME",
      badgeColor: "#38bdf8",
      stateTitle: "1. AI AGENT TOOL INVOCATION",
      terminalHeader: "DRIFTGUARD MCP SECURITY PROXY // PORT: 3001",
      code: [
        `[AGENT_RUNTIME] Claude 3.7 Sonnet / Autonomous Coding Agent connected`,
        `[INCOMING_RPC] tools/call -&gt; write_file({ path: "../server/jwt_secret.env" })`,
        `[TASK_SCOPE] Declared Goal: "Refactor Top Navigation UI Component"`,
        `[ANALYSIS] Target path violates declared changeset boundaries...`
      ],
      diagramHighlight: "AGENT_INPUT",
      footerMsg: "Step 1/4: Intercepting Model Context Protocol (MCP) tool execution",
      statusColor: "#38bdf8"
    },
    {
      badge: "FSM POLICY ENGINE",
      badgeColor: "#f59e0b",
      stateTitle: "2. FINITE STATE MACHINE &amp; SCOPE VERIFICATION",
      terminalHeader: "DRIFTGUARD POLICY ENGINE // GRAPH EVALUATION",
      code: [
        `[FSM_TRANSITION] IDLE -&gt; PROPOSAL -&gt; VALIDATION_CHECKPOINT`,
        `[SCOPE_VALIDATOR] Comparing mutation vector against AST graph...`,
        `[MUTATION_DRIFT] Detected out-of-scope filesystem mutation!`,
        `[DRIFT_METRIC] Scope Divergence Index: 0.89 (THRESHOLD: 0.15)`
      ],
      diagramHighlight: "FSM_CHECK",
      footerMsg: "Step 2/4: Verifying permission contract against active task state",
      statusColor: "#f59e0b"
    },
    {
      badge: "POLICY FIREWALL: BLOCKED",
      badgeColor: "#ef4444",
      stateTitle: "3. PERMISSION CHECKPOINT — UNAUTHORIZED MUTATION REJECTED",
      terminalHeader: "DRIFTGUARD FIREWALL // VIOLATION ENFORCEMENT",
      code: [
        `[FIREWALL_ACTION] ❌ 403 MUTATION REJECTED: Scope Drift Violation`,
        `[SECURITY_EVENT] Blocked attempt to mutate sensitive configuration`,
        `[ROLLBACK] Agent state reverted to pre-mutation snapshot [ID: 0x9AF4]`,
        `[NOTIFICATION] Alert dispatched to orchestrator: Agent drift halted.`
      ],
      diagramHighlight: "MUTATION_BLOCKED",
      footerMsg: "Step 3/4: Enforcing deterministic safety rails before filesystem mutation",
      statusColor: "#ef4444"
    },
    {
      badge: "IMMUTABLE AUDIT TRAIL",
      badgeColor: "#10b981",
      stateTitle: "4. CRYPTOGRAPHIC STATE RECORD &amp; VERIFIED RESUME",
      terminalHeader: "DRIFTGUARD AUDIT LOG // SHA-256 STATE LOGGING",
      code: [
        `[AUDIT_TRAIL] Appended event to immutable log: logs/audit.jsonl`,
        `[HASH_CHAIN] SHA-256 Signature: 8f9b2c3a10e7d65498a12bc4fe87a930`,
        `[AGENT_STATUS] Resuming agent within bounded sandbox parameters...`,
        `[SYSTEM_HEALTH] System integrity: 100% PROTECTED • Drift zeroed.`
      ],
      diagramHighlight: "AUDIT_SAVED",
      footerMsg: "Step 4/4: Cryptographic tamper-proof logging &amp; safe agent continuation",
      statusColor: "#10b981"
    }
  ];

  for (const st of states) {
    const codeLines = st.code.map((line, idx) => {
      let color = "#cbd5e1";
      if (line.includes("❌")) color = "#f87171";
      else if (line.includes("100% PROTECTED")) color = "#4ade80";
      else if (line.includes("Detected") || line.includes("violates")) color = "#fbbf24";
      else if (line.includes("[AGENT_RUNTIME]") || line.includes("[INCOMING_RPC]")) color = "#38bdf8";

      return `<text x="35" y="${140 + idx * 26}" fill="${color}" font-family="Consolas, 'Fira Code', monospace" font-size="13">${line}</text>`;
    }).join("");

    const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0b0f19" />
          <stop offset="100%" stop-color="#111827" />
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)" rx="10" stroke="#1e293b" stroke-width="2" />
      
      <!-- Window Titlebar -->
      <rect width="${WIDTH}" height="38" fill="#0f172a" rx="10" />
      <rect y="36" width="${WIDTH}" height="2" fill="#1e293b" />
      <circle cx="20" cy="19" r="5" fill="#ef4444" />
      <circle cx="36" cy="19" r="5" fill="#f59e0b" />
      <circle cx="52" cy="19" r="5" fill="#10b981" />
      <text x="80" y="24" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="13" font-weight="600">mcp-server-driftguard // AI Agent Governance &amp; Policy Firewall</text>
      <rect x="${WIDTH - 200}" y="8" width="180" height="22" rx="4" fill="#0f172a" stroke="${st.badgeColor}" stroke-width="1" />
      <text x="${WIDTH - 110}" y="23" fill="${st.badgeColor}" font-family="system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${st.badge}</text>

      <!-- Stage Title Banner -->
      <rect x="20" y="48" width="${WIDTH - 40}" height="42" rx="6" fill="#0f172a" stroke="#1e293b" />
      <circle cx="42" cy="69" r="6" fill="${st.statusColor}" />
      <text x="60" y="74" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="14" font-weight="700">${st.stateTitle}</text>
      <text x="${WIDTH - 35}" y="73" fill="#64748b" font-family="Consolas, monospace" font-size="11" text-anchor="end">${st.terminalHeader}</text>

      <!-- Terminal Output Window -->
      <rect x="20" y="98" width="${WIDTH - 40}" height="325" rx="8" fill="#070b14" stroke="#1e293b" />
      
      <!-- Terminal Prompt line -->
      <text x="35" y="122" fill="#64748b" font-family="Consolas, monospace" font-size="12">$ driftguard-core --enforce-fsm --audit-trail</text>
      ${codeLines}

      <!-- Visual Flow Diagram at Bottom of Terminal -->
      <g transform="translate(35, 275)">
        <!-- Step 1 Box -->
        <rect x="0" y="0" width="160" height="50" rx="6" fill="${st.diagramHighlight === 'AGENT_INPUT' ? '#1e293b' : '#0f172a'}" stroke="${st.diagramHighlight === 'AGENT_INPUT' ? '#38bdf8' : '#334155'}" stroke-width="${st.diagramHighlight === 'AGENT_INPUT' ? '2' : '1'}" />
        <text x="80" y="22" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">1. Agent RPC</text>
        <text x="80" y="38" fill="#e2e8f0" font-family="Consolas, monospace" font-size="10" font-weight="bold" text-anchor="middle">Tool Mutation</text>

        <!-- Arrow 1 -->
        <text x="180" y="30" fill="#64748b" font-family="system-ui, sans-serif" font-size="16" text-anchor="middle">→</text>

        <!-- Step 2 Box -->
        <rect x="200" y="0" width="160" height="50" rx="6" fill="${st.diagramHighlight === 'FSM_CHECK' ? '#1e293b' : '#0f172a'}" stroke="${st.diagramHighlight === 'FSM_CHECK' ? '#f59e0b' : '#334155'}" stroke-width="${st.diagramHighlight === 'FSM_CHECK' ? '2' : '1'}" />
        <text x="280" y="22" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">2. Scope Engine</text>
        <text x="280" y="38" fill="#e2e8f0" font-family="Consolas, monospace" font-size="10" font-weight="bold" text-anchor="middle">FSM State Check</text>

        <!-- Arrow 2 -->
        <text x="380" y="30" fill="#64748b" font-family="system-ui, sans-serif" font-size="16" text-anchor="middle">→</text>

        <!-- Step 3 Box -->
        <rect x="400" y="0" width="170" height="50" rx="6" fill="${st.diagramHighlight === 'MUTATION_BLOCKED' ? '#450a0a' : '#0f172a'}" stroke="${st.diagramHighlight === 'MUTATION_BLOCKED' ? '#ef4444' : '#334155'}" stroke-width="${st.diagramHighlight === 'MUTATION_BLOCKED' ? '2' : '1'}" />
        <text x="485" y="22" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">3. Checkpoint</text>
        <text x="485" y="38" fill="${st.diagramHighlight === 'MUTATION_BLOCKED' ? '#f87171' : '#e2e8f0'}" font-family="Consolas, monospace" font-size="10" font-weight="bold" text-anchor="middle">Policy Verification</text>

        <!-- Arrow 3 -->
        <text x="590" y="30" fill="#64748b" font-family="system-ui, sans-serif" font-size="16" text-anchor="middle">→</text>

        <!-- Step 4 Box -->
        <rect x="610" y="0" width="170" height="50" rx="6" fill="${st.diagramHighlight === 'AUDIT_SAVED' ? '#064e3b' : '#0f172a'}" stroke="${st.diagramHighlight === 'AUDIT_SAVED' ? '#10b981' : '#334155'}" stroke-width="${st.diagramHighlight === 'AUDIT_SAVED' ? '2' : '1'}" />
        <text x="695" y="22" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" text-anchor="middle">4. Audit Trail</text>
        <text x="695" y="38" fill="${st.diagramHighlight === 'AUDIT_SAVED' ? '#4ade80' : '#e2e8f0'}" font-family="Consolas, monospace" font-size="10" font-weight="bold" text-anchor="middle">Cryptographic Log</text>
      </g>

      <!-- Bottom Status Bar -->
      <rect y="${HEIGHT - 40}" width="${WIDTH}" height="40" fill="#0f172a" />
      <line x1="0" y1="${HEIGHT - 40}" x2="${WIDTH}" y2="${HEIGHT - 40}" stroke="#1e293b" stroke-width="1" />
      <circle cx="25" cy="${HEIGHT - 20}" r="4" fill="${st.statusColor}" />
      <text x="38" y="${HEIGHT - 16}" fill="#f1f5f9" font-family="system-ui, sans-serif" font-size="12" font-weight="600">${st.footerMsg}</text>
      <text x="${WIDTH - 25}" y="${HEIGHT - 16}" fill="#64748b" font-family="system-ui, sans-serif" font-size="11" text-anchor="end">Model Context Protocol (MCP)</text>
    </svg>
    `;

    const frameImg = await renderSvg(svg);
    frames.push(Frame.from(frameImg, 2600));
  }

  const gif = new GIF(frames);
  const buf = await gif.encode(40);
  fs.writeFileSync("d:/extentuin/aboutme/assets/driftguard-demo.gif", buf);
  console.log(`DriftGuard showcase GIF created: ${buf.length} bytes`);
}

async function run() {
  await createSpicySwipeGif();
  await createOnward90Gif();
  await createDriftGuardGif();
  console.log("All 3 project animated GIFs have been successfully generated!");
}

run();
