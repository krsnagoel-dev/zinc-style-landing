// Flair landing interactions (original code)
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// sticky nav shadow
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 10), { passive: true });

// hero ticker
let n = 18342117;
const tick = () => { $('#ticker').textContent = n.toLocaleString('en-US'); n += Math.floor(Math.random() * 4) + 1; };
tick(); setInterval(tick, 900);

// cycling word
const words = ['discovery', 'comparison', 'approval', 'checkout', 'returns'];
let wi = 0;
setInterval(() => {
  const el = $('#cycle'); el.classList.add('out');
  setTimeout(() => { wi = (wi + 1) % words.length; el.textContent = words[wi]; el.classList.remove('out'); }, 300);
}, 2200);

// copy install command
$('#copyBtn').addEventListener('click', () => {
  navigator.clipboard?.writeText('npm i @flair/sdk');
  const l = $('#copyLabel'), t = l.textContent; l.textContent = 'Copied'; setTimeout(() => (l.textContent = t), 1400);
});

// scroll reveal + one-shot demo triggers
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in');
  e.target.querySelectorAll('.count').forEach(countUp);
  io.unobserve(e.target);
}), { threshold: 0.18 });
$$('.reveal').forEach((el) => io.observe(el));

function countUp(el) {
  const to = +el.dataset.to, t0 = performance.now(), d = 1400;
  const step = (t) => { const p = Math.min((t - t0) / d, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}

// typed search query loop
const queries = ['gear for my marathon plan', 'housewarming gift under $50', 'refill my weekly groceries'];
let qi = 0;
async function typeLoop() {
  const el = $('#typed');
  for (;;) {
    const q = queries[qi++ % queries.length];
    for (let i = 1; i <= q.length; i++) { el.textContent = q.slice(0, i); await sleep(55); }
    await sleep(1800);
    for (let i = q.length; i >= 0; i--) { el.textContent = q.slice(0, i); await sleep(22); }
    await sleep(300);
  }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
typeLoop();

// json preview
$('#jsonCode').innerHTML = `{
  <span class="k">"id"</span>: <span class="s">"itm_8f2a"</span>,
  <span class="k">"title"</span>: <span class="s">"Ceramic pour-over set"</span>,
  <span class="k">"price"</span>: { <span class="k">"amount"</span>: 4200, <span class="k">"currency"</span>: <span class="s">"USD"</span> },
  <span class="k">"variants"</span>: [<span class="s">"Sand"</span>, <span class="s">"Slate"</span>],
  <span class="k">"delivery"</span>: { <span class="k">"eta_days"</span>: 2 },
  <span class="k">"fit_score"</span>: 0.92
}`;

// sandbox switch
const sw = $('#sw');
sw.addEventListener('click', () => sw.classList.toggle('on'));
setInterval(() => sw.classList.toggle('on'), 2600);

// terminal typing
const termLines = [
  ['c', '// place an order within a limit'],
  ['', 'const order = await flair.checkout({'],
  ['', '  item: <span class="s">"itm_8f2a"</span>,'],
  ['', '  maxSpend: 5000,'],
  ['', '  approval: <span class="s">"required"</span>,'],
  ['', '});'],
  ['k', 'order.status // "awaiting_approval"'],
];
async function term() {
  const el = $('#term');
  for (;;) {
    el.innerHTML = '';
    for (const [cls, line] of termLines) {
      const span = document.createElement('div'); if (cls) span.className = cls; el.appendChild(span);
      const plain = line.replace(/<[^>]+>/g, '');
      for (let i = 1; i <= plain.length; i++) { span.textContent = plain.slice(0, i); await sleep(18); }
      span.innerHTML = line;
    }
    await sleep(3500);
  }
}
term();

// webhook feed
const events = [['order.created', 'queued'], ['order.shipped', 'left warehouse'], ['order.delivered', 'on the doorstep'], ['refund.issued', 'back to card'], ['return.started', 'label ready']];
let ei = 0;
function pushHook() {
  const ul = $('#hooks'); const [name] = events[ei++ % events.length];
  const li = document.createElement('li'); li.innerHTML = `<span>${name}</span><small>just now</small>`;
  ul.prepend(li); $$('li', ul).forEach((x, i) => { if (i) x.querySelector('small').textContent = `${i * 7}s ago`; });
  while (ul.children.length > 4) ul.lastChild.remove();
}
for (let i = 0; i < 4; i++) pushHook();
setInterval(pushHook, 2400);

// live tape of colored tiles
const palette = ['#e07b39', '#4a78c9', '#6aa84f', '#e0a526', '#7b5cd6', '#c95526', '#d9c3a0', '#8a837b'];
const tape = $('#tape');
const tiles = Array.from({ length: 30 }, (_, i) => `<span style="background:linear-gradient(135deg,${palette[i % 8]},${palette[(i * 3 + 2) % 8]})"></span>`).join('');
tape.innerHTML = tiles + tiles;

$('#yr').textContent = new Date().getFullYear();
