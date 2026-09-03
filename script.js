/* ===========================================================
   DULCES MOMENTOS — script.js (JavaScript Vanilla, sin librerías)
=========================================================== */

/* ===================== SPA: NAVEGACIÓN POR PESTAÑAS ===================== */
const panels = document.querySelectorAll('.tab-panel');
const tabButtons = document.querySelectorAll('[data-tab]');
const navToggle = document.getElementById('nav-toggle');
const tabsNav = document.getElementById('tabs-nav');

function showTab(name){
  panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
  tabsNav.classList.remove('open');
  window.scrollTo({ top:0, behavior:'smooth' });
}
tabButtons.forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); showTab(el.dataset.tab); }));
navToggle.addEventListener('click', () => tabsNav.classList.toggle('open'));
showTab('inicio');

/* ===================== DATOS DEL CATÁLOGO =====================
   PRECIOS DE EJEMPLO: Confirmar carta real con el cliente antes de
   la propuesta final. Categorías tomadas del menú real fotografiado
   en el local (pizarra de bebidas) y de la vitrina de pastelería. */
const CATEGORIES = ["Todos","Pasteles y Tortas","Postres individuales","Bebidas frías","Bebidas calientes","Opciones saladas"];

const PRODUCTS = [
  {id:1, name:"Torta de chocolate", cat:"Pasteles y Tortas", price:4500, desc:"Bizcocho húmedo de chocolate con ganache, porción individual.", photo:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop"},
  {id:2, name:"Cheesecake de limón", cat:"Pasteles y Tortas", price:4200, desc:"Base crocante, relleno cremoso y toque cítrico fresco.", photo:"https://images.unsplash.com/photo-1524351199678-941a58a3df50?q=80&w=800&auto=format&fit=crop"},
  {id:3, name:"Milhoja artesanal", cat:"Pasteles y Tortas", price:3900, desc:"Capas crujientes de hojaldre con manjar y crema pastelera.", photo:"https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=800&auto=format&fit=crop"},
  {id:4, name:"Macarons (caja x4)", cat:"Postres individuales", price:3500, desc:"Selección de sabores del día, hechos en casa.", photo:"https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop"},
  {id:5, name:"Dona rellena", cat:"Postres individuales", price:2200, desc:"Masa esponjosa con glaseado y relleno a elección.", photo:"https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop"},
  {id:6, name:"Frappuccino clásico", cat:"Bebidas frías", price:3800, desc:"Base de café frío batido con hielo y crema.", photo:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop"},
  {id:7, name:"Smoothie de frutos rojos", cat:"Bebidas frías", price:3600, desc:"Frutas naturales licuadas, sin azúcar añadida.", photo:"https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=800&auto=format&fit=crop"},
  {id:8, name:"Piña colada sin alcohol", cat:"Bebidas frías", price:3900, desc:"Piña, coco y hielo, versión familiar del clásico.", photo:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=800&auto=format&fit=crop"},
  {id:9, name:"Milkshake de vainilla", cat:"Bebidas frías", price:3700, desc:"Cremoso, servido con crema batida.", photo:"https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=800&auto=format&fit=crop"},
  {id:10, name:"Matcha latte", cat:"Bebidas calientes", price:3400, desc:"Té matcha ceremonial con leche a elección.", photo:"https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=800&auto=format&fit=crop"},
  {id:11, name:"Café de especialidad", cat:"Bebidas calientes", price:2600, desc:"Espresso, americano o café con leche, a elección.", photo:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"},
  {id:12, name:"Sandwich de la casa", cat:"Opciones saladas", price:3200, desc:"Pan artesanal con ingredientes frescos del día.", photo:"https://images.unsplash.com/photo-1481070555726-e2fe8357725c?q=80&w=800&auto=format&fit=crop"},
];

let activeCat = "Todos";
const money = n => "$" + n.toLocaleString("es-CL");

function renderFilters(){
  const wrap = document.getElementById("catFilters");
  wrap.innerHTML = CATEGORIES.map(c =>
    `<button class="cat-pill ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`
  ).join("");
  wrap.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => { activeCat = btn.dataset.cat; renderFilters(); renderProducts(); });
  });
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const list = activeCat==="Todos" ? PRODUCTS : PRODUCTS.filter(p=>p.cat===activeCat);
  grid.innerHTML = list.map(p => `
    <button type="button" class="product-card" data-id="${p.id}">
      <div class="product-photo"><img src="${p.photo}" alt="${p.name}"></div>
      <div class="product-row">
        <h4>${p.name}</h4>
        <span class="product-price">${money(p.price)}</span>
      </div>
    </button>
  `).join("");
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(Number(card.dataset.id)));
  });
}
renderFilters();
renderProducts();

/* ===================== MODAL DE PRODUCTO ===================== */
const modalOverlay = document.getElementById("productModal");
function openModal(id){
  const p = PRODUCTS.find(x=>x.id===id);
  document.getElementById("modalPhoto").style.backgroundImage = `url('${p.photo}')`;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPrice").textContent = money(p.price);
  modalOverlay.classList.add("open");
}
function closeModal(){ modalOverlay.classList.remove("open"); }
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

/* ===================== HORARIO — ABIERTO/CERRADO + LISTA POR DÍA =====================
   Lunes(1) a Jueves(4): 09:00–21:30 | Viernes(5) y Sábado(6): 10:00–21:30 | Domingo(0): 10:00–21:00 */
const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
function getScheduleForDay(day){
  if(day === 0) return {open:10, close:21};
  if(day === 5 || day === 6) return {open:10, close:21.5};
  return {open:9, close:21.5}; // Lunes a Jueves
}
const fmtHour = h => Math.floor(h) + ':' + (h % 1 ? '30' : '00');

function updateOpenStatus(){
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes()/60;
  const { open, close } = getScheduleForDay(day);
  const isOpen = hour >= open && hour < close;
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  dot.className = 'status-dot ' + (isOpen ? 'open' : 'closed');
  text.textContent = isOpen
    ? `Abierto ahora · cierra a las ${fmtHour(close)}`
    : `Cerrado ahora · abre a las ${fmtHour(open)}`;
}
updateOpenStatus();
setInterval(updateOpenStatus, 60000);

function renderHoursList(){
  const today = new Date().getDay();
  const list = document.getElementById('hours-list');
  list.innerHTML = DIAS.map((d,i) => {
    const s = getScheduleForDay(i);
    return `<div class="row${i===today?' today':''}"><span>${d}</span><span>${fmtHour(s.open)} – ${fmtHour(s.close)}</span></div>`;
  }).join('');
}
renderHoursList();
