import { createRequire } from 'module';
const require = createRequire('D:/extentuin/Agent-SAFE Grid/');
const { chromium } = require('playwright');
import { Image, Frame, GIF } from 'imagescript';
import fs from 'fs';
import path from 'path';

const WIDTH = 880;
const HEIGHT = 490;

// Convert local file to Base64 data URL for instant embedding in Playwright HTML
function toBase64DataUrl(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${fileBuffer.toString('base64')}`;
}

async function renderHtmlToImage(page, htmlContent) {
  await page.setContent(htmlContent, { waitUntil: 'load' });
  const buffer = await page.screenshot({ type: 'png' });
  return await Image.decode(buffer);
}

// ----------------------------------------------------
// 1. DRIFTGUARD PIXEL-PERFECT ANIMATED GIF
// ----------------------------------------------------
async function generateDriftGuard(browser) {
  console.log("Generating DriftGuard pixel-perfect GIF...");
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });

  const states = [
    {
      stepNum: 1,
      badge: "ACTIVE AGENT RUNTIME",
      badgeColor: "#38bdf8",
      badgeBg: "rgba(56, 189, 248, 0.12)",
      title: "1. AI AGENT TOOL INVOCATION",
      statusDot: "#38bdf8",
      consoleHeader: "DRIFTGUARD MCP SECURITY PROXY // PORT: 3001",
      logs: [
        { text: "[AGENT_RUNTIME] Claude 3.7 Sonnet / Autonomous Coding Agent connected", color: "#38bdf8" },
        { text: "[INCOMING_RPC] tools/call -> write_file({ path: '../server/jwt_secret.env' })", color: "#f1f5f9" },
        { text: "[TASK_SCOPE] Declared Goal: 'Refactor Top Navigation UI Component'", color: "#94a3b8" },
        { text: "[ANALYSIS] Target path violates declared changeset boundaries...", color: "#fbbf24" }
      ],
      activeStep: 1,
      footerMsg: "Step 1/4: Intercepting Model Context Protocol (MCP) tool execution",
      footerDot: "#38bdf8"
    },
    {
      stepNum: 2,
      badge: "FSM POLICY ENGINE",
      badgeColor: "#f59e0b",
      badgeBg: "rgba(245, 158, 11, 0.12)",
      title: "2. FINITE STATE MACHINE & SCOPE VERIFICATION",
      statusDot: "#f59e0b",
      consoleHeader: "DRIFTGUARD POLICY ENGINE // GRAPH EVALUATION",
      logs: [
        { text: "[FSM_TRANSITION] IDLE -> PROPOSAL -> VALIDATION_CHECKPOINT", color: "#38bdf8" },
        { text: "[SCOPE_VALIDATOR] Comparing mutation vector against AST graph...", color: "#94a3b8" },
        { text: "[MUTATION_DRIFT] Detected out-of-scope filesystem mutation!", color: "#fbbf24" },
        { text: "[DRIFT_METRIC] Scope Divergence Index: 0.89 (THRESHOLD: 0.15)", color: "#f87171" }
      ],
      activeStep: 2,
      footerMsg: "Step 2/4: Verifying permission contract against active task state",
      footerDot: "#f59e0b"
    },
    {
      stepNum: 3,
      badge: "POLICY FIREWALL: BLOCKED",
      badgeColor: "#ef4444",
      badgeBg: "rgba(239, 68, 68, 0.15)",
      title: "3. PERMISSION CHECKPOINT — UNAUTHORIZED MUTATION REJECTED",
      statusDot: "#ef4444",
      consoleHeader: "DRIFTGUARD FIREWALL // VIOLATION ENFORCEMENT",
      logs: [
        { text: "[FIREWALL_ACTION] ❌ 403 MUTATION REJECTED: Scope Drift Violation", color: "#f87171" },
        { text: "[SECURITY_EVENT] Blocked attempt to mutate sensitive configuration", color: "#fca5a5" },
        { text: "[ROLLBACK] Agent state reverted to pre-mutation snapshot [ID: 0x9AF4]", color: "#fbbf24" },
        { text: "[NOTIFICATION] Alert dispatched to orchestrator: Agent drift halted.", color: "#e2e8f0" }
      ],
      activeStep: 3,
      footerMsg: "Step 3/4: Enforcing deterministic safety rails before filesystem mutation",
      footerDot: "#ef4444"
    },
    {
      stepNum: 4,
      badge: "IMMUTABLE AUDIT TRAIL",
      badgeColor: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      title: "4. CRYPTOGRAPHIC STATE RECORD & VERIFIED RESUME",
      statusDot: "#10b981",
      consoleHeader: "DRIFTGUARD AUDIT LOG // SHA-256 STATE LOGGING",
      logs: [
        { text: "[AUDIT_TRAIL] Appended event to immutable log: logs/audit.jsonl", color: "#38bdf8" },
        { text: "[HASH_CHAIN] SHA-256 Signature: 8f9b2c3a10e7d65498a12bc4fe87a930", color: "#4ade80" },
        { text: "[AGENT_STATUS] Resuming agent within bounded sandbox parameters...", color: "#94a3b8" },
        { text: "[SYSTEM_HEALTH] System integrity: 100% PROTECTED • Drift zeroed.", color: "#4ade80" }
      ],
      activeStep: 4,
      footerMsg: "Step 4/4: Cryptographic tamper-proof logging & safe agent continuation",
      footerDot: "#10b981"
    }
  ];

  const frames = [];

  for (const st of states) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: ${WIDTH}px;
            height: ${HEIGHT}px;
            background: #0b0f19;
            color: #e2e8f0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border: 1px solid #1e293b;
            border-radius: 10px;
          }
          .titlebar {
            height: 38px;
            background: #0f172a;
            border-bottom: 1px solid #1e293b;
            display: flex;
            align-items: center;
            padding: 0 16px;
            justify-content: space-between;
          }
          .mac-dots {
            display: flex;
            gap: 8px;
          }
          .dot {
            width: 11px;
            height: 11px;
            border-radius: 50%;
          }
          .dot-red { background: #ef4444; }
          .dot-yellow { background: #f59e0b; }
          .dot-green { background: #10b981; }
          .title-text {
            font-size: 13px;
            font-weight: 600;
            color: #94a3b8;
            margin-left: 12px;
          }
          .badge {
            font-size: 11px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 4px;
            border: 1px solid ${st.badgeColor};
            background: ${st.badgeBg};
            color: ${st.badgeColor};
            letter-spacing: 0.5px;
          }
          .content {
            flex: 1;
            padding: 16px 20px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #070b14;
          }
          .stage-banner {
            background: #0f172a;
            border: 1px solid #1e293b;
            border-radius: 8px;
            padding: 10px 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .stage-left {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .status-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${st.statusDot};
            box-shadow: 0 0 8px ${st.statusDot};
          }
          .stage-title {
            font-size: 14px;
            font-weight: 700;
            color: #f8fafc;
            letter-spacing: 0.3px;
          }
          .stage-right {
            font-family: "Consolas", "Fira Code", monospace;
            font-size: 11px;
            color: #64748b;
          }
          .terminal-box {
            background: #030712;
            border: 1px solid #1e293b;
            border-radius: 8px;
            padding: 14px 18px;
            font-family: "Consolas", "Fira Code", monospace;
            font-size: 12.5px;
            line-height: 1.65;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .cli-prompt {
            color: #64748b;
            margin-bottom: 6px;
          }
          .diagram-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            margin-top: auto;
            padding-top: 10px;
          }
          .step-box {
            flex: 1;
            padding: 8px;
            border-radius: 6px;
            text-align: center;
            border: 1px solid #334155;
            background: #0f172a;
          }
          .step-box.active-1 { border-color: #38bdf8; background: rgba(56, 189, 248, 0.1); box-shadow: 0 0 10px rgba(56, 189, 248, 0.2); }
          .step-box.active-2 { border-color: #f59e0b; background: rgba(245, 158, 11, 0.1); box-shadow: 0 0 10px rgba(245, 158, 11, 0.2); }
          .step-box.active-3 { border-color: #ef4444; background: rgba(239, 68, 68, 0.15); box-shadow: 0 0 10px rgba(239, 68, 68, 0.3); }
          .step-box.active-4 { border-color: #10b981; background: rgba(16, 185, 129, 0.15); box-shadow: 0 0 10px rgba(16, 185, 129, 0.3); }
          .step-lbl { font-size: 10.5px; color: #94a3b8; margin-bottom: 2px; }
          .step-val { font-size: 11.5px; font-weight: 700; color: #f1f5f9; font-family: monospace; }
          .arrow { color: #64748b; font-size: 15px; }
          .footer {
            height: 38px;
            background: #0f172a;
            border-top: 1px solid #1e293b;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 18px;
            font-size: 12px;
          }
          .footer-left {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #f1f5f9;
            font-weight: 600;
          }
          .footer-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${st.footerDot};
          }
          .footer-right {
            color: #64748b;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <div class="titlebar">
          <div style="display: flex; align-items: center;">
            <div class="mac-dots">
              <div class="dot dot-red"></div>
              <div class="dot dot-yellow"></div>
              <div class="dot dot-green"></div>
            </div>
            <div class="title-text">mcp-server-driftguard // AI Agent Governance & Policy Firewall</div>
          </div>
          <div class="badge">${st.badge}</div>
        </div>

        <div class="content">
          <div class="stage-banner">
            <div class="stage-left">
              <div class="status-indicator"></div>
              <div class="stage-title">${st.title}</div>
            </div>
            <div class="stage-right">${st.consoleHeader}</div>
          </div>

          <div class="terminal-box">
            <div class="cli-prompt">$ driftguard-core --enforce-fsm --audit-trail</div>
            ${st.logs.map(l => `<div style="color: ${l.color};">${l.text}</div>`).join('')}
            
            <div class="diagram-row">
              <div class="step-box ${st.activeStep === 1 ? 'active-1' : ''}">
                <div class="step-lbl">1. Agent RPC</div>
                <div class="step-val">Tool Mutation</div>
              </div>
              <div class="arrow">→</div>
              <div class="step-box ${st.activeStep === 2 ? 'active-2' : ''}">
                <div class="step-lbl">2. Scope Engine</div>
                <div class="step-val">FSM State Check</div>
              </div>
              <div class="arrow">→</div>
              <div class="step-box ${st.activeStep === 3 ? 'active-3' : ''}">
                <div class="step-lbl">3. Checkpoint</div>
                <div class="step-val" style="color: ${st.activeStep === 3 ? '#f87171' : '#f1f5f9'};">Policy Verification</div>
              </div>
              <div class="arrow">→</div>
              <div class="step-box ${st.activeStep === 4 ? 'active-4' : ''}">
                <div class="step-lbl">4. Audit Trail</div>
                <div class="step-val" style="color: ${st.activeStep === 4 ? '#4ade80' : '#f1f5f9'};">Cryptographic Log</div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div class="footer-left">
            <div class="footer-dot"></div>
            <div>${st.footerMsg}</div>
          </div>
          <div class="footer-right">Model Context Protocol (MCP)</div>
        </div>
      </body>
    </html>
    `;

    const img = await renderHtmlToImage(page, html);
    frames.push(Frame.from(img, 2600));
  }

  await page.close();
  const gif = new GIF(frames);
  const buf = await gif.encode(40);
  fs.writeFileSync("d:/extentuin/aboutme/assets/driftguard-demo.gif", buf);
  console.log(`DriftGuard GIF created: ${buf.length} bytes`);
}

// ----------------------------------------------------
// 2. SPICYSWIPE PIXEL-PERFECT ANIMATED GIF
// ----------------------------------------------------
async function generateSpicySwipe(browser) {
  console.log("Generating SpicySwipe pixel-perfect GIF...");
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });

  const bannerB64 = toBase64DataUrl("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/screenshots/banner.png");
  const aiTabB64 = toBase64DataUrl("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/docs/AI tab.png");
  const statsTabB64 = toBase64DataUrl("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/docs/satus tab.png");
  const msgB64 = toBase64DataUrl("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/docs/suggested message.png");
  const screen1B64 = toBase64DataUrl("D:/extentuin/SPIOCYY SWIPE/SpicySwipe good one/screenshots/1.png");

  const slides = [
    {
      title: "SpicySwipe v1.4.1 • AI Browser Extension (Manifest V3)",
      badge: "OLLAMA + CLAUDE + GPT",
      badgeColor: "#818cf8",
      badgeBg: "rgba(99, 102, 241, 0.15)",
      statusText: "Feature 1/3: Multi-LLM Generation & Privacy-First Local AI",
      statusDot: "#22c55e",
      meta: "Live Chrome Extension",
      bodyHtml: `
        <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 10px;">
          <img src="${bannerB64}" style="max-width: 100%; max-height: 370px; object-fit: contain; border-radius: 8px; border: 1px solid #1e293b;" />
        </div>
      `
    },
    {
      title: "SpicySwipe • Context Analysis & Dynamic Tone Adaptation",
      badge: "SMART PERSONAS",
      badgeColor: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      statusText: "Feature 2/3: Intelligent Bio Parsing & Custom Tone Controls",
      statusDot: "#38bdf8",
      meta: "Manifest V3 Secure Runtime",
      bodyHtml: `
        <div style="flex: 1; display: flex; gap: 20px; padding: 12px 16px; align-items: center;">
          <div style="width: 320px; height: 370px; display: flex; align-items: center; justify-content: center; background: #030712; border-radius: 8px; border: 1px solid #1e293b; overflow: hidden;">
            <img src="${aiTabB64}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
            <div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px;">
              <div style="font-size: 15px; font-weight: 700; color: #38bdf8; margin-bottom: 8px;">⚡ Adaptive AI Workflow</div>
              <div style="font-size: 12.5px; color: #cbd5e1; line-height: 1.6;">
                • <b>Dynamic Bio Extraction:</b> Reads profile context automatically.<br/>
                • <b>Multi-Tone Adaptation:</b> Flirty, Witty, Playful, or Casual.<br/>
                • <b>Model Selector:</b> Gemini 2.0, Claude 3.7, GPT-4o, Local Ollama.
              </div>
            </div>
            <div style="background: #030712; border: 1px solid #1e293b; border-radius: 8px; padding: 8px; display: flex; align-items: center; justify-content: center;">
              <img src="${msgB64}" style="max-width: 100%; max-height: 140px; object-fit: contain;" />
            </div>
          </div>
        </div>
      `
    },
    {
      title: "SpicySwipe • Realtime Match Analytics & Security Hardening",
      badge: "LIVE TELEMETRY",
      badgeColor: "#d946ef",
      badgeBg: "rgba(217, 70, 239, 0.15)",
      statusText: "Feature 3/3: Conversation Analytics, Swipe Stats & Security Hardening",
      statusDot: "#d946ef",
      meta: "79+ Production Commits",
      bodyHtml: `
        <div style="flex: 1; display: flex; gap: 20px; padding: 12px 16px; align-items: center;">
          <div style="width: 320px; height: 370px; display: flex; align-items: center; justify-content: center; background: #030712; border-radius: 8px; border: 1px solid #1e293b; overflow: hidden;">
            <img src="${statsTabB64}" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
          </div>
          <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
            <div style="background: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px;">
              <div style="font-size: 15px; font-weight: 700; color: #c084fc; margin-bottom: 8px;">🛡️ Security & Stealth Engine 2.0</div>
              <div style="font-size: 12.5px; color: #cbd5e1; line-height: 1.6;">
                ✔ <b>DOM XSS Sanitization:</b> Strict HTML escaping across content scripts.<br/>
                ✔ <b>Sender Authorization:</b> Verifies internal runtime origin IDs.<br/>
                ✔ <b>Stealth 2.0:</b> Gaussian random delays and Bézier mouse curves.
              </div>
            </div>
            <div style="background: #030712; border: 1px solid #1e293b; border-radius: 8px; padding: 8px; display: flex; align-items: center; justify-content: center;">
              <img src="${screen1B64}" style="max-width: 100%; max-height: 140px; object-fit: contain;" />
            </div>
          </div>
        </div>
      `
    }
  ];

  const frames = [];

  for (const slide of slides) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: ${WIDTH}px;
            height: ${HEIGHT}px;
            background: #0b0f19;
            color: #e2e8f0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border: 1px solid #1e293b;
            border-radius: 10px;
          }
          .titlebar {
            height: 38px;
            background: #0f172a;
            border-bottom: 1px solid #1e293b;
            display: flex;
            align-items: center;
            padding: 0 16px;
            justify-content: space-between;
          }
          .mac-dots { display: flex; gap: 8px; }
          .dot { width: 11px; height: 11px; border-radius: 50%; }
          .dot-red { background: #ef4444; }
          .dot-yellow { background: #f59e0b; }
          .dot-green { background: #10b981; }
          .title-text { font-size: 13px; font-weight: 600; color: #94a3b8; margin-left: 12px; }
          .badge {
            font-size: 11px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 4px;
            border: 1px solid ${slide.badgeColor};
            background: ${slide.badgeBg};
            color: ${slide.badgeColor};
            letter-spacing: 0.5px;
          }
          .content {
            flex: 1;
            display: flex;
            background: #070b14;
            overflow: hidden;
          }
          .footer {
            height: 38px;
            background: #0f172a;
            border-top: 1px solid #1e293b;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 18px;
            font-size: 12px;
          }
          .footer-left {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #f1f5f9;
            font-weight: 600;
          }
          .footer-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${slide.statusDot};
          }
          .footer-right {
            color: #64748b;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <div class="titlebar">
          <div style="display: flex; align-items: center;">
            <div class="mac-dots">
              <div class="dot dot-red"></div>
              <div class="dot dot-yellow"></div>
              <div class="dot dot-green"></div>
            </div>
            <div class="title-text">${slide.title}</div>
          </div>
          <div class="badge">${slide.badge}</div>
        </div>

        <div class="content">
          ${slide.bodyHtml}
        </div>

        <div class="footer">
          <div class="footer-left">
            <div class="footer-dot"></div>
            <div>${slide.statusText}</div>
          </div>
          <div class="footer-right">${slide.meta}</div>
        </div>
      </body>
    </html>
    `;

    const img = await renderHtmlToImage(page, html);
    frames.push(Frame.from(img, 2600));
  }

  await page.close();
  const gif = new GIF(frames);
  const buf = await gif.encode(40);
  fs.writeFileSync("d:/extentuin/aboutme/assets/spicyswipe-demo.gif", buf);
  console.log(`SpicySwipe GIF created: ${buf.length} bytes`);
}

// ----------------------------------------------------
// 3. ONWARD90 PIXEL-PERFECT ANIMATED GIF
// ----------------------------------------------------
async function generateOnward90(browser) {
  console.log("Generating Onward90 pixel-perfect GIF...");
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });

  const homeB64 = toBase64DataUrl("D:/extentuin/90days/public/screenshots/home.png");
  const dashB64 = toBase64DataUrl("D:/extentuin/90days/public/screenshots/dashboard.png");
  const loginB64 = toBase64DataUrl("D:/extentuin/90days/public/screenshots/login.png");

  const slides = [
    {
      title: "Onward90 • 90-Day Interactive Employee Onboarding Platform",
      badge: "DAY-BY-DAY JOURNEY",
      badgeColor: "#0284c7",
      badgeBg: "rgba(2, 132, 199, 0.15)",
      statusText: "Slide 1/3: Role-Based Journeys & Milestone Tracking",
      statusDot: "#0284c7",
      meta: "Next.js 15 • TailwindCSS • Prisma ORM",
      imgB64: homeB64
    },
    {
      title: "Onward90 • HR Onboarding Health & Retention Analytics",
      badge: "HR ADMIN CONSOLE",
      badgeColor: "#10b981",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      statusText: "Slide 2/3: Real-Time Team Progress & Ramp-Up Metrics",
      statusDot: "#10b981",
      meta: "PostgreSQL • Serverless Analytics",
      imgB64: dashB64
    },
    {
      title: "Onward90 • Enterprise Role-Based Authentication & Guardrails",
      badge: "AUTH & SECURITY",
      badgeColor: "#8b5cf6",
      badgeBg: "rgba(139, 92, 246, 0.15)",
      statusText: "Slide 3/3: Manager Checkpoints, Buddies & Pulse Surveys",
      statusDot: "#8b5cf6",
      meta: "Auth.js (NextAuth v5) • Neon Postgres",
      imgB64: loginB64
    }
  ];

  const frames = [];

  for (const slide of slides) {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: ${WIDTH}px;
            height: ${HEIGHT}px;
            background: #0b0f19;
            color: #e2e8f0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            border: 1px solid #1e293b;
            border-radius: 10px;
          }
          .titlebar {
            height: 38px;
            background: #0f172a;
            border-bottom: 1px solid #1e293b;
            display: flex;
            align-items: center;
            padding: 0 16px;
            justify-content: space-between;
          }
          .mac-dots { display: flex; gap: 8px; }
          .dot { width: 11px; height: 11px; border-radius: 50%; }
          .dot-red { background: #ef4444; }
          .dot-yellow { background: #f59e0b; }
          .dot-green { background: #10b981; }
          .title-text { font-size: 13px; font-weight: 600; color: #94a3b8; margin-left: 12px; }
          .badge {
            font-size: 11px;
            font-weight: 700;
            padding: 3px 10px;
            border-radius: 4px;
            border: 1px solid ${slide.badgeColor};
            background: ${slide.badgeBg};
            color: ${slide.badgeColor};
            letter-spacing: 0.5px;
          }
          .content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #070b14;
            padding: 10px;
            overflow: hidden;
          }
          .content img {
            max-width: 100%;
            max-height: 375px;
            object-fit: contain;
            border-radius: 6px;
            border: 1px solid #1e293b;
          }
          .footer {
            height: 38px;
            background: #0f172a;
            border-top: 1px solid #1e293b;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 18px;
            font-size: 12px;
          }
          .footer-left {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #f1f5f9;
            font-weight: 600;
          }
          .footer-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: ${slide.statusDot};
          }
          .footer-right {
            color: #64748b;
            font-size: 11px;
          }
        </style>
      </head>
      <body>
        <div class="titlebar">
          <div style="display: flex; align-items: center;">
            <div class="mac-dots">
              <div class="dot dot-red"></div>
              <div class="dot dot-yellow"></div>
              <div class="dot dot-green"></div>
            </div>
            <div class="title-text">${slide.title}</div>
          </div>
          <div class="badge">${slide.badge}</div>
        </div>

        <div class="content">
          <img src="${slide.imgB64}" />
        </div>

        <div class="footer">
          <div class="footer-left">
            <div class="footer-dot"></div>
            <div>${slide.statusText}</div>
          </div>
          <div class="footer-right">${slide.meta}</div>
        </div>
      </body>
    </html>
    `;

    const img = await renderHtmlToImage(page, html);
    frames.push(Frame.from(img, 2600));
  }

  await page.close();
  const gif = new GIF(frames);
  const buf = await gif.encode(40);
  fs.writeFileSync("d:/extentuin/aboutme/assets/onward90-demo.gif", buf);
  console.log(`Onward90 GIF created: ${buf.length} bytes`);
}

async function run() {
  console.log("Launching Edge headless browser...");
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  await generateDriftGuard(browser);
  await generateSpicySwipe(browser);
  await generateOnward90(browser);

  await browser.close();
  console.log("All 3 GIFs successfully generated with pixel-perfect Edge rendering!");
}

run();
