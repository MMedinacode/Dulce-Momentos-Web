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
   SIN PRECIOS INVENTADOS (corregido 11-09-2026). Antes esta carta
   mostraba 12 precios "de ejemplo" en la página pública de un negocio
   real — va contra la regla del portafolio de no inventar datos, así
   que todos pasan a "Consultar" hasta tener una fuente confirmada.
   Las categorías y los productos SÍ son reales: salen del menú
   fotografiado en el local (pizarra de bebidas) y de su vitrina.
   Las fotos de stock también se sacaron: quedan solo fotos reales
   del local donde calzan, y el resto sin foto (carta-fotos.js dibuja
   una ilustración cuando no hay imagen). */
const CATEGORIES = ["Todos","Pasteles y Tortas","Postres individuales","Bebidas frías","Bebidas calientes","Opciones saladas"];

const PRODUCTS = [
  {id:1, name:"Torta de chocolate", cat:"Pasteles y Tortas", price:null, desc:"Bizcocho húmedo de chocolate con ganache, porción individual.", photo:null},
  {id:2, name:"Cheesecake de limón", cat:"Pasteles y Tortas", price:null, desc:"Base crocante, relleno cremoso y toque cítrico fresco.", photo:null},
  {id:3, name:"Milhoja artesanal", cat:"Pasteles y Tortas", price:null, desc:"Capas crujientes de hojaldre con manjar y crema pastelera.", photo:null},
  {id:4, name:"Macarons (caja x4)", cat:"Postres individuales", price:null, desc:"Selección de sabores del día, hechos en casa.", photo:null},
  {id:5, name:"Dona rellena", cat:"Postres individuales", price:null, desc:"Masa esponjosa con glaseado y relleno a elección.", photo:null},
  {id:6, name:"Frappuccino clásico", cat:"Bebidas frías", price:null, desc:"Base de café frío batido con hielo y crema.", photo:null},
  {id:7, name:"Smoothie de frutos rojos", cat:"Bebidas frías", price:null, desc:"Frutas naturales licuadas, sin azúcar añadida.", photo:"fotos/waffles-frutas.jpg"},
  {id:8, name:"Piña colada sin alcohol", cat:"Bebidas frías", price:null, desc:"Piña, coco y hielo, versión familiar del clásico.", photo:null},
  {id:9, name:"Milkshake de vainilla", cat:"Bebidas frías", price:null, desc:"Cremoso, servido con crema batida.", photo:null},
  {id:10, name:"Matcha latte", cat:"Bebidas calientes", price:null, desc:"Té matcha ceremonial con leche a elección.", photo:null},
  {id:11, name:"Café de especialidad", cat:"Bebidas calientes", price:null, desc:"Espresso, americano o café con leche, a elección.", photo:null},
  /* El té sale de una foto suya: tetera de vidrio servida en mesa, con su
     propio posavasos. No es un producto inventado, está fotografiado. */
  {id:13, name:"Té en tetera", cat:"Bebidas calientes", price:null, desc:"Servido en tetera de vidrio para compartir.", photo:"fotos/tea-time.jpg"},
  {id:12, name:"Sandwich de la casa", cat:"Opciones saladas", price:null, desc:"Pan artesanal con ingredientes frescos del día.", photo:"fotos/tabla-sandwich.jpg"},
];

let activeCat = "Todos";
const money = n => (n === null || n === undefined) ? "Consultar" : "$" + n.toLocaleString("es-CL");

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
      <div class="product-photo">${p.photo ? `<img src="${p.photo}" alt="${p.name}">` : ''}</div>
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
  const mp = document.getElementById("modalPhoto");
  mp.style.backgroundImage = p.photo ? `url('${p.photo}')` : 'none';
  mp.hidden = !p.photo;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPrice").textContent = money(p.price);
  modalOverlay.classList.add("open");
}
function closeModal(){ modalOverlay.classList.remove("open"); }
document.getElementById('modalClose').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

/* ===================== HORARIO — ABIERTO/CERRADO + LISTA POR DÍA =====================
   Fuente: bio de Instagram (@dulces.momentos.caffe) — "Lun a viernes 9:00 a 21:30h
   Sáb y dom 10:00 a 21:30h".
   Lunes(1) a Viernes(5): 09:00–21:30 | Sábado(6) y Domingo(0): 10:00–21:30 */
const DIAS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
function getScheduleForDay(day){
  if(day === 0 || day === 6) return {open:10, close:21.5};
  return {open:9, close:21.5}; // Lunes a Viernes
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
