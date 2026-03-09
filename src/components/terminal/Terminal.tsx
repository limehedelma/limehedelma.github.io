import { useEffect, useRef, useState, useCallback } from 'react'

// ─── CSS (injected as a <style> tag via useEffect) ───────────────────────────
const GLOBAL_CSS = `
@import url(https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;600;700&display=swap);

* { box-sizing: border-box; }

body { background: #000; margin: 0; padding: 0; }

.board {
  --glow-rgb: 255, 160, 0;
  --text-color: #ffa500;
  --danger-fill-color: #f23;
  --danger-glow-rgb: 255, 0, 0;
  --danger-text-color: #f30;
  --info-glow-rgb: 0, 255, 0;
  --info-text-color: #00ff00;
  --gutter-size: 8px;
  padding: 6px;
}

.-bordered {
  --border-glow-color: rgba(var(--glow-rgb), .7);
  border-radius: var(--gutter-size);
  border-style: solid;
  border-width: 3px;
  box-shadow: inset 0 0 0 1px var(--border-glow-color), 0 0 0 1px var(--border-glow-color);
}
.-bordered.--danger { --border-glow-color: rgba(var(--danger-glow-rgb), .7); }
.-bordered.--info   { --border-glow-color: rgba(var(--info-glow-rgb), .7); }
.-bordered.--block  { border-radius: 0px; }

.label {
  display: inline-block;
  font: 400 32px 'Roboto Condensed';
  letter-spacing: -1px;
  line-height: 1;
  padding: 1px calc(var(--gutter-size) - 3px);
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
  --text-glow-color: rgba(var(--glow-rgb), .5);
  color: var(--text-color);
  text-shadow:
    -1px  1px 0 var(--text-glow-color),
     1px -1px 0 var(--text-glow-color),
    -1px -1px 0 var(--text-glow-color),
     1px  1px 0 var(--text-glow-color);
}
.label.--danger { --text-glow-color: rgba(var(--danger-glow-rgb), .5); color: var(--danger-text-color); }
.label.--info   { --text-glow-color: rgba(var(--info-glow-rgb), .5); color: var(--info-text-color); }

@keyframes blink { 50% { opacity: 0; } }
.-blink {
  animation-name: blink;
  animation-duration: var(--blink-duration);
  animation-iteration-count: infinite;
  animation-timing-function: steps(1);
}

.label.-blink    { --blink-duration: 0.1s; }
.--info.-blink   { --blink-duration: 2s; }
.button.-blink   { --blink-duration: 2s; }
.button.-blink:hover { --blink-duration: 0.2s; }

html, body, #root { height: 100vh; overflow: hidden; }

#shell { display: flex; flex-direction: column; height: 100vh; width: 100vw; }

#body { flex: 1; display: flex; flex-direction: column; min-height: 0; padding: 6px; gap: 6px; }

#terminal {
  flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0;
  --border-glow-color: rgba(var(--info-glow-rgb), .7);
  border-radius: 0px;
  border-style: solid;
  border-width: 3px;
  box-shadow: inset 0 0 0 1px var(--border-glow-color), 0 0 0 1px var(--border-glow-color);
  border-color: rgba(0,255,0,.7);
  position: relative;
}

#terminal-topbar {
  flex-shrink: 0; display: flex; align-items: center;
  justify-content: space-between; padding: 4px 8px;
  border-bottom: 2px solid rgba(0,255,0,.3);
}

#output {
  flex: 1; overflow-y: auto; padding: 6px 8px;
  scrollbar-width: thin; scrollbar-color: rgba(255,160,0,.25) transparent;
}
#output::-webkit-scrollbar { width: 3px; }
#output::-webkit-scrollbar-thumb { background: rgba(255,160,0,.25); }

#input-row {
  flex-shrink: 0; display: flex; align-items: center; gap: 6px;
  padding: 4px 8px; border-top: 2px solid rgba(0,255,0,.3);
}

#cmd {
  flex: 1; background: transparent; border: none; outline: none;
  font: 400 22px 'Roboto Condensed'; letter-spacing: -1px;
  text-transform: uppercase; color: #00ff00; caret-color: #00ff00;
}
#cmd::placeholder { color: rgba(0,255,0,.3); font: 400 22px 'Roboto Condensed'; }

/* ── Bottom nav — same border system as original sidebar ── */
#bottom-nav {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: height 0.15s steps(4);
  --border-glow-color: rgba(var(--info-glow-rgb), .7);
  border-radius: 0px;
  border-style: solid;
  border-width: 3px;
  box-shadow: inset 0 0 0 1px var(--border-glow-color), 0 0 0 1px var(--border-glow-color);
  border-color: rgba(0,255,0,.7);
}
#bottom-nav.collapsed { height: 0; border-width: 0; box-shadow: none; }

/* ── Nav buttons ── */
.nav-btn { background: none; border: none; border-right: 1px solid rgba(0,255,0,.2); padding: 0; cursor: pointer; display: flex; flex: 1; align-items: center; justify-content: center; -webkit-tap-highlight-color: transparent; }
.nav-btn:last-child { border-right: none; }
.nav-btn .label { font-size: 22px; width: 100%; display: block; text-align: center; }
.nav-btn.active .label { --text-glow-color: rgba(var(--info-glow-rgb), .6); color: var(--info-text-color); }
.nav-btn.active .label.--danger { color: var(--danger-text-color) !important; --text-glow-color: rgba(var(--danger-glow-rgb), .5); }
.nav-btn:hover .label:not(.--danger) { --text-glow-color: rgba(var(--info-glow-rgb), .6); color: var(--info-text-color); animation: blink 1s steps(1) infinite; }
.nav-btn:hover .label.--danger { animation: blink 1s steps(1) infinite; }

.out-line { display: block; margin-bottom: 3px; }
.out-line .label { white-space: normal; font-size: 20px; }

.card-wrap { margin: 8px 0; position: relative; display: block; }

@keyframes static-noise {
  0%   { opacity: 1; background-position: 0 0; }
  10%  { background-position: -10px 5px; }
  20%  { background-position: 8px -8px; }
  30%  { background-position: -5px 12px; }
  40%  { background-position: 14px -3px; }
  50%  { background-position: -12px 7px; }
  60%  { background-position: 6px -14px; }
  70%  { background-position: -8px 10px; }
  80%  { background-position: 10px -6px; }
  90%  { opacity: .6; }
  100% { opacity: 0; background-position: 0 0; }
}

.static-overlay {
  position: absolute; inset: 0; z-index: 10; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 150px 150px; background-repeat: repeat;
  mix-blend-mode: luminosity; opacity: 0.6;
  animation: static-noise 0.2s steps(1) forwards;
}

.card-content { opacity: 0; transition: opacity 0.1s; }
.card-content.revealed { opacity: 1; }

.clear-overlay {
  position: absolute; inset: 0; z-index: 100; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  background-size: 150px 150px; mix-blend-mode: normal; opacity: 0.85;
  background-color: #000;
  animation: static-noise 0.3s steps(1) forwards;
}
`

// ─── QR SVG strings ───────────────────────────────────────────────────────────
const QR_PATH = `M4 4.5h7m3 0h1m1 0h2m2 0h1m1 0h7M4 5.5h1m5 0h1m2 0h2m3 0h2m2 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h4m2 0h3m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h4m1 0h2m3 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m6 0h1m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m2 0h2m2 0h2m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h2m2 0h1m1 0h3M4 12.5h1m1 0h5m3 0h1m2 0h1m1 0h1m2 0h5M4 13.5h1m2 0h3m1 0h2m1 0h1m2 0h1m2 0h1m2 0h1m3 0h1M6 14.5h1m2 0h4m1 0h1m2 0h3m5 0h1m1 0h2M5 15.5h2m1 0h1m2 0h3m2 0h1m2 0h6m3 0h1M5 16.5h2m1 0h3m3 0h1m1 0h4m1 0h2m1 0h1m1 0h3M4 17.5h4m1 0h1m1 0h1m1 0h2m5 0h1m2 0h1m1 0h1m1 0h1M4 18.5h1m1 0h1m1 0h1m1 0h1m2 0h1m1 0h3m1 0h3m1 0h3m1 0h2M4 19.5h1m2 0h2m6 0h1m2 0h7m3 0h1M4 20.5h1m1 0h1m1 0h1m1 0h2m2 0h2m1 0h8m1 0h1M12 21.5h1m1 0h1m1 0h2m1 0h2m3 0h2M4 22.5h7m6 0h2m1 0h1m1 0h1m1 0h1m1 0h3M4 23.5h1m5 0h1m1 0h2m2 0h1m1 0h1m1 0h1m3 0h2m1 0h1M4 24.5h1m1 0h3m1 0h1m1 0h1m1 0h1m1 0h9m1 0h3M4 25.5h1m1 0h3m1 0h1m1 0h1m4 0h1m1 0h1m1 0h2m1 0h5M4 26.5h1m1 0h3m1 0h1m1 0h5m1 0h3m4 0h2m1 0h1M4 27.5h1m5 0h1m2 0h1m1 0h1m2 0h8m2 0h1M4 28.5h7m1 0h1m1 0h3m4 0h8`
// ─── Constants ────────────────────────────────────────────────────────────────
const DAYS   = ['SUN','MON','TUE','WED','THU','FRI','SAT']
const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

// ─── HTML card builders ───────────────────────────────────────────────────────
function buildAboutCard(): string {
    const qr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33" shape-rendering="crispEdges" style="width:120px;height:120px;color:#00ff00;"><path fill="none" d="M0 0h33v33H0z"/><path stroke="currentColor" d="${QR_PATH}"/></svg>`
    return `
    <div style="border:3px solid #00ff00;padding:16px 20px;display:inline-flex;gap:28px;align-items:stretch;">
      <div style="display:flex;align-items:center;justify-content:center;">
        <div style="width:180px;height:180px;display:flex;align-items:center;justify-content:center;border:3px solid #00ff00;">
          <span class="label --info" style="font-size:14px;letter-spacing:2px;">[LIME.JPG]</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;justify-content:center;gap:3px;">
        <span class="label --info" style="font-size:36px;font-weight:600;letter-spacing:4px;">Emil Vento</span>
        <span class="label --info" style="font-size:24px;">Junior Developer</span>
        <span class="label --info" style="font-size:24px;">Knowledge in:</span>
        <span class="label --info" style="font-size:24px;">Front end development</span>
        <span class="label --info" style="font-size:24px;">Game development</span>
        <span class="label --info" style="font-size:24px;">Technologies used:</span>
        <span class="label --info" style="font-size:24px;">Angular, Ionic, React, Unity</span>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:4px 0;gap:10px;flex-shrink:0;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;">
          ${qr}
          <span class="label --info" style="font-size:16px;">limehedelma.com</span>
        </div>
        <button id="more-info-btn" class="label button -blink" style="font-size:22px;cursor:pointer;background:none;border:3px solid rgba(255,160,0,.7);border-radius:6px;">More Info</button>
      </div>
    </div>`
}

function buildAboutMoreCard(): string {
    return `
    <div style="display:block;">
      <span class="label --info" style="font-size:24px;font-weight:600;letter-spacing:3px;display:block;margin-bottom:6px;">// More About Me!</span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        I'm a junior developer based in Finland, currently studying at Careeria Vocational School. I have a passion for building cool web experiences and games that push creative boundaries.
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        On the web side I work mainly with Angular, Ionic and React with Vite. On the game dev side I use Unity and C# to create jam games and prototypes.
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;">
        Always looking to collaborate, learn and ship interesting projects. Feel free to reach out via the Contact page.
      </span>
    </div>`
}

const PROJECT_DETAILS: Record<string, string> = {
    'portfolio-website': `
    <div style="display:block;">
      <span class="label --info" style="font-size:24px;font-weight:600;letter-spacing:3px;display:block;margin-bottom:6px;">// Portfolio Website</span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        This is the very site you're on right now. It was built with React and TypeScript using Vite, inspired by the iconic NERV terminal UI from Neon Genesis Evangelion.
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        A huge shoutout to Peng Wang for the UI code sniplet in Codepen. I extended and adapted the system to build a full interactive terminal experience on top of it.
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;">
        The terminal accepts typed commands, animates cards with a static-noise reveal effect, and is fully responsive. Stack: Vite, TypeScript, React.
      </span>
    </div>`,
    'you guilty?': `
    <div style="display:block;">
      <span class="label --info" style="font-size:24px;font-weight:600;letter-spacing:3px;display:block;margin-bottom:6px;">// You Guilty?</span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        You Quilty? is a courtroom simulator based on the 16 sustainable development goals of the United Nations. I was responsible for the sound effects as well as the programming of the game.
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        The game was built in Unity using C# was part of a Erasmus+ programme Videogames to Change
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;">
        You can download it from Itch.io
      </span>
    </div>`,
    'cyberdrift-2084': `
    <div style="display:block;">
      <span class="label --info" style="font-size:24px;font-weight:600;letter-spacing:3px;display:block;margin-bottom:6px;">// CyberDrift 2084</span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        CyberDrift 2084 is a fast-paced drifting game set in a neon-lit cyberpunk city, created for International College Jam 6. I handled the majority of the programming including vehicle physics, drift mechanics and score tracking.
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        The game was built in Unity using C# and had to be completed within the jam's time constraints. 
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;">
        You can download it from Itch.io
      </span>
    </div>`,
    'appis': `
    <div style="display:block;">
      <span class="label --info" style="font-size:24px;font-weight:600;letter-spacing:3px;display:block;margin-bottom:6px;">// Appis</span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        From April 2025 to May 2025 I had a unpaid intership with Appis. I was tasked with developing and testing SAJL's Score service.
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
       From June 2025 to August 2025 I had a part time job with Appis as a Junior Developer. I was tasked with developing and testing SAJL's Score service.'
      </span>
    </div>`,
    'careeria-1989': `
    <div style="display:block;">
      <span class="label --info" style="font-size:24px;font-weight:600;letter-spacing:3px;display:block;margin-bottom:6px;">// Careeria 1989</span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
        Careeria 1989 is a horror game made for Finnish College Jam 8, set inside a creepy retrofitted school building (Accidentaly ended up looking very similar to my current school building :D). I was responsible for all the programming as well as decorating the building.
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;margin-bottom:6px;">
       The game was built in Unity using C# and had to be completed within the jam's time constraints.'
      </span>
      <span class="label --info" style="font-size:20px;white-space:normal;display:block;line-height:1.5;">
        Available to play on Itch.io.
      </span>
    </div>`,
}

function buildProjectCard(
    tag: string, title: string, desc: string,
    techs: string[], linkLabel: string, linkUrl: string, detailId: string
): string {
    return `
    <div class="-bordered --info --block" style="border-width:3px;padding:16px 20px;display:block;box-shadow:0 0 0 1px rgba(0,255,0,.7);">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">
        <span class="label --info" style="font-size:32px;font-weight:600;">${title}</span>
        <span class="label -bordered --info" style="font-size:18px;border-width:2px;">${tag}</span>
      </div>
      <div style="margin-bottom:12px;">
        <span class="label --info" style="font-size:22px;white-space:normal;">${desc}</span>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
        ${techs.map(t => `<span class="label -bordered --info" style="font-size:18px;border-width:2px;">${t}</span>`).join('')}
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <button data-project-detail="${detailId}" class="label button -blink" style="font-size:22px;cursor:pointer;background:none;border:3px solid rgba(255,160,0,.7);border-radius:6px;">More Info</button>
        <a href="${linkUrl}" target="_blank" class="-bordered label button -blink" style="font-size:22px;text-decoration:none;display:inline-block;border-width:2px;">${linkLabel}</a>
      </div>
    </div>`
}

function buildContactCard(): string {
    return `
    <div style="border:3px solid #00ff00;padding:10px 14px;display:block;">
      <span class="label --info" style="font-size:28px;font-weight:600;display:block;margin-bottom:10px;">Contact</span>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <a href="https://limehedelma.itch.io/" target="_blank" class="-bordered label button -blink" style="font-size:22px;text-decoration:none;">Itch.io</a>
        <a href="mailto:limehedelma@gmail.com" class="-bordered label button -blink" style="font-size:22px;text-decoration:none;">Email</a>
        <a href="https://discord.com/users/534676989198729217" target="_blank" class="-bordered label button -blink" style="font-size:22px;text-decoration:none;">Discord</a>
        <a href="https://github.com/limehedelma" target="_blank" class="-bordered label button -blink" style="font-size:22px;text-decoration:none;">Github</a>
      </div>
    </div>`
}

// ─── Utility ──────────────────────────────────────────────────────────────────
function waitMs(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms))
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
    const [navCollapsed, setNavCollapsed]         = useState(true)
    const [activeNav, setActiveNav]               = useState('about')
    const [clock, setClock]                       = useState('00:00:00')
    const [date,  setDate]                        = useState('---')
    const [inputVal, setInputVal]                 = useState('')
    const [showClearOverlay, setShowClearOverlay] = useState(false)

    const outputRef  = useRef<HTMLDivElement>(null)
    const inputRef   = useRef<HTMLInputElement>(null)
    const awaitingYN = useRef<string | null>(null)

    // ── inject global CSS once ─────────────────────────────────────────────────
    useEffect(() => {
        const style = document.createElement('style')
        style.textContent = GLOBAL_CSS
        document.head.appendChild(style)
        return () => { document.head.removeChild(style) }
    }, [])

    // ── clock tick ─────────────────────────────────────────────────────────────
    useEffect(() => {
        function tick() {
            const n = new Date()
            setClock(
                String(n.getHours()).padStart(2,'0') + ':' +
                String(n.getMinutes()).padStart(2,'0') + ':' +
                String(n.getSeconds()).padStart(2,'0')
            )
            setDate(
                DAYS[n.getDay()] + ' ' +
                String(n.getDate()).padStart(2,'0') + ' ' +
                MONTHS[n.getMonth()]
            )
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [])

    // ── focus input on any document click ─────────────────────────────────────
    useEffect(() => {
        const handler = () => inputRef.current?.focus()
        document.addEventListener('click', handler)
        return () => document.removeEventListener('click', handler)
    }, [])

    // ─── output helpers ────────────────────────────────────────────────────────
    const scrollBottom = useCallback(() => {
        if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight
    }, [])

    const printLine = useCallback((html: string, cls = '', ms = 0): Promise<void> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const out = outputRef.current
                if (!out) { resolve(); return }
                const row = document.createElement('div')
                row.className = 'out-line'
                row.innerHTML = cls
                    ? `<span class="label ${cls}" style="white-space:normal;font-size:20px;">${html}</span>`
                    : `<span class="label" style="white-space:normal;font-size:20px;">${html}</span>`
                out.appendChild(row)
                scrollBottom()
                resolve()
            }, ms)
        })
    }, [scrollBottom])

    const printSep = useCallback((ms = 0): Promise<void> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const out = outputRef.current
                if (!out) { resolve(); return }
                const s = document.createElement('div')
                s.style.cssText = 'height:6px;border-bottom:1px solid rgba(0,255,0,.3);margin-bottom:4px;'
                out.appendChild(s)
                scrollBottom()
                resolve()
            }, ms)
        })
    }, [scrollBottom])

    const revealCard = useCallback((html: string, ms = 0): Promise<void> => {
        return new Promise(resolve => {
            setTimeout(() => {
                const out = outputRef.current
                if (!out) { resolve(); return }
                const wrap = document.createElement('div')
                wrap.className = 'card-wrap'
                wrap.innerHTML = `<div class="static-overlay"></div><div class="card-content">${html}</div>`
                out.appendChild(wrap)
                scrollBottom()
                const overlay = wrap.querySelector<HTMLElement>('.static-overlay')!
                const content = wrap.querySelector<HTMLElement>('.card-content')!
                overlay.addEventListener('animationend', () => {
                    overlay.remove()
                    content.classList.add('revealed')
                    scrollBottom()
                    resolve()
                })
            }, ms)
        })
    }, [scrollBottom])

    // ─── command handlers ──────────────────────────────────────────────────────
    const handleMoreInfo = useCallback(async () => {
        awaitingYN.current = null
        await printSep(0)
        await printLine('$ MORE INFO', '--info', 0)
        await printSep(60)
        await revealCard(buildAboutMoreCard(), 100)
    }, [printLine, printSep, revealCard])

    const showProjectDetails = useCallback(async (id: string) => {
        const detail = PROJECT_DETAILS[id]
        if (!detail) return
        await printSep(0)
        await printLine('$ MORE INFO', '--info', 0)
        await printSep(60)
        await revealCard(detail, 100)
    }, [printLine, printSep, revealCard])

    useEffect(() => {
        const out = outputRef.current
        if (!out) return
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const projBtn = target.closest<HTMLElement>('[data-project-detail]')
            if (projBtn) { showProjectDetails(projBtn.dataset.projectDetail!); return }
            if (target.id === 'more-info-btn' || target.closest('#more-info-btn')) {
                handleMoreInfo()
            }
        }
        out.addEventListener('click', handler)
        return () => out.removeEventListener('click', handler)
    }, [showProjectDetails, handleMoreInfo])

    const boot = useCallback(async () => {
        const out = outputRef.current; if (!out) return
        await printLine('Limehedelma.com — System Online', '', 0)
        const visitorId = Math.random().toString(36).substring(2, 9).toUpperCase()
        await printLine(`User: ${visitorId} &nbsp; Auth: Confirmed`, '--info', 100)
        const s = document.createElement('div')
        s.style.cssText = 'height:6px;border-bottom:1px solid rgba(255,160,0,.2);margin-bottom:4px;margin-top:4px;'
        setTimeout(() => out.appendChild(s), 180)
        await printLine('Type a command or click the nav.', '', 260)
        await printLine('Type HELP to list commands.', '', 330)
    }, [printLine])

    const run = useCallback(async (raw: string) => {
        const cmd = raw.trim().toLowerCase()
        if (!cmd) return
        const out = outputRef.current; if (!out) return

        if (awaitingYN.current) {
            const context = awaitingYN.current
            const s0 = document.createElement('div')
            s0.style.cssText = 'height:6px;border-bottom:1px solid rgba(255,160,0,.2);margin-bottom:4px;'
            out.appendChild(s0)
            await printLine('$ ' + raw.trim().toUpperCase(), '--info', 0)
            const s1 = document.createElement('div')
            s1.style.cssText = 'height:6px;border-bottom:1px solid rgba(255,160,0,.2);margin-bottom:4px;'
            out.appendChild(s1)
            if (cmd === 'y' || cmd === 'yes') {
                awaitingYN.current = null
                if (context === 'about_more') await revealCard(buildAboutMoreCard(), 100)
            } else if (cmd === 'n' || cmd === 'no') {
                awaitingYN.current = null
                await printLine('Understood. Type HELP for commands.', '', 80)
            } else {
                await printLine('Invalid input. Please type Y or N.', '--danger', 80)
                await printLine('Want to learn more? [Y / N]', '--info', 160)
            }
            return
        }

        const s = document.createElement('div')
        s.style.cssText = 'height:6px;border-bottom:1px solid rgba(255,160,0,.2);margin-bottom:4px;'
        out.appendChild(s)
        await printLine('$ ' + raw.trim().toUpperCase(), '--info', 0)
        const s2 = document.createElement('div')
        s2.style.cssText = 'height:6px;border-bottom:1px solid rgba(255,160,0,.2);margin-bottom:4px;'
        out.appendChild(s2)

        if (cmd === 'about') {
            await printLine('// PERSONNEL FILE', '', 0)
            await printSep(60)
            await revealCard(buildAboutCard(), 100)
            await printSep(200)
            await printLine('Want to learn more? [Y / N]', '--info', 250)
            awaitingYN.current = 'about_more'

        } else if (cmd === 'projects') {
            await printLine('// PROJECT LIST', '', 0)
            await printSep(60)
            await revealCard(buildProjectCard('Web','Portfolio Website',"A portfolio inspired by Neon Genesis Evangelion's UI design. Huge thanks to Peng Wang for the code snipplet.",['Next.js','TypeScript','React'],'Visit Site','https://limehedelma.com','portfolio-website'), 100)
            await revealCard(buildProjectCard('Game Dev','You Guilty?',"A courtroom simulator based on the 16th sustaiable development goal. Made for a Erasmus+ project called Videogames To Change",['Unity','C#'],'Itch','https://limehedelma.itch.io/you-guilty','you guilty?'), 500)
            await revealCard(buildProjectCard('Game Dev','CyberDrift 2084','A drifting game made for International College Jam 6. I did most of the coding on the game.',['Unity','C#'],'Itch.io','https://limehedelma.itch.io/cyberdrift-2084','cyberdrift-2084'), 900)
            await revealCard(buildProjectCard('Web','Appis','2 month internship followed by a 3 week part time job as a Junior dev. I work with SAJLs score service ',['Ionic','Angular','TypeScript'],'Appis','https://www.appis.fi/','appis'), 1300)
            await revealCard(buildProjectCard('Game Dev','Careeria 1989','A horror game made for Finnish College Jam 8. I did the programming and the building of the game.',['Unity','C#'],'Itch.io','https://limehedelma.itch.io/careeria1989','careeria-1989'), 1700)

        } else if (cmd === 'skills') {
            await printLine('// SKILL MATRIX', '', 0)
            await printSep(60)
            const rows: [string, number][] = [['Next.js',82],['Angular',75],['Unity / C#',78],['Ionic',68],['TypeScript',80],['React',75]]
            let d = 100
            for (const [name, pct] of rows) {
                const filled = Math.round(pct / 10)
                const bar = '█'.repeat(filled) + '░'.repeat(10 - filled)
                await printLine(`<span style="display:inline-block;min-width:120px;">${name}</span><span style="color:#00ff00;letter-spacing:2px;">${bar}</span> ${pct}%`, '--info', d)
                d += 80
            }

        } else if (cmd === 'contact') {
            await printLine('// CONTACT', '', 0)
            await printSep(60)
            await revealCard(buildContactCard(), 100)

        } else if (cmd === 'help') {
            await printLine('// COMMANDS', '', 0)
            await printSep(60)
            const cmds: [string][] = [
                ['about'],['projects'],['skills'],
                ['contact'],['clear'],['help']
            ]
            let d = 80
            for (const [c] of cmds) {
                await printLine(`<span class="label --info" style="font-size:20px;">${c}</span>`, '', d)
                d += 70
            }

        } else if (cmd === 'clear') {
            out.innerHTML = ''
            setShowClearOverlay(true)
            await waitMs(300)
            setShowClearOverlay(false)
            await boot()

        } else {
            await printLine(`Command not recognised: "${raw.trim()}"`, '--danger', 80)
            await printLine('Type HELP to list available commands.', '', 160)
        }
    }, [printLine, printSep, revealCard, boot, handleMoreInfo])

    // boot on mount
    const hasBooted = useRef(false)
    useEffect(() => {
        if (hasBooted.current) return
        hasBooted.current = true
        boot()
    }, []) // eslint-disable-line

    const handleNav = useCallback(async (cmd: string) => {
        if (cmd !== 'clear') setActiveNav(cmd)
        await run(cmd)
    }, [run])

    // ─── Render ────────────────────────────────────────────────────────────────
    const navItems = ['about','projects','skills','contact','help'] as const

    return (
        <div id="shell" className="board">
            <div id="body">

                {/* TERMINAL */}
                <div id="terminal">
                    {showClearOverlay && <div className="clear-overlay" />}

                    <div id="terminal-topbar">
                        <button style={{background:'none',border:'none',padding:0,cursor:'pointer'}} onClick={() => setNavCollapsed(c => !c)}>
                            <span className="label -bordered --info">{navCollapsed ? '▶ SHOW' : '◀ HIDE'}</span>
                        </button>
                        <div style={{display:'flex',gap:6,alignItems:'center'}}>
                            <div className="label -bordered --info" style={{paddingLeft:20,paddingRight:20}}>{date}</div>
                            <div className="label -bordered --info" style={{paddingLeft:20,paddingRight:20}}>{clock}</div>
                        </div>
                    </div>

                    <div id="output" ref={outputRef} />

                    <div id="input-row">
                        <span className="label --info -blink" style={{fontSize:22}}>$&gt;</span>
                        <input
                            id="cmd"
                            ref={inputRef}
                            type="text"
                            placeholder="Type a command..."
                            autoComplete="off"
                            autoFocus={true}
                            spellCheck={false}
                            value={inputVal}
                            onChange={e => setInputVal(e.target.value)}
                            onKeyDown={async e => {
                                if (e.key === 'Enter') {
                                    const v = inputVal
                                    setInputVal('')
                                    await run(v)
                                }
                            }}
                        />
                        <span className="label --info -blink" style={{fontSize:18,padding:'0 2px'}}>█</span>
                    </div>
                </div>

                {/* BOTTOM NAV */}
                <div id="bottom-nav" className={navCollapsed ? 'collapsed' : ''}>
                    {navItems.map(cmd => (
                        <button key={cmd} className={`nav-btn${activeNav === cmd ? ' active' : ''}`} onClick={() => handleNav(cmd)}>
                            <span className="label --info --block" style={{width:'100%',fontSize:22}}>
                                {cmd.charAt(0).toUpperCase() + cmd.slice(1)}
                            </span>
                        </button>
                    ))}
                    <button className="nav-btn" onClick={() => handleNav('clear')}>
                        <span className="label --danger --block" style={{width:'100%',fontSize:22}}>Clear</span>
                    </button>
                </div>

            </div>
        </div>
    )
}