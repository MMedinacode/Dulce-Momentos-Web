// ===================== DATOS DEL CATÁLOGO =====================
// PRECIOS DE EJEMPLO: Confirmar carta real con el cliente antes de la propuesta final.
// Categorías tomadas del menú real fotografiado en el local (pizarra de bebidas) y de la vitrina de pastelería.
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
    `<button class="cat-pill ${c===activeCat?'active':''}" onclick="setCategory('${c}')">${c}</button>`
  ).join("");
}
function setCategory(c){ activeCat = c; renderFilters(); renderProducts(); }

function renderProducts(){
  const grid = document.getElementById("productGrid");
  const list = activeCat==="Todos" ? PRODUCTS : PRODUCTS.filter(p=>p.cat===activeCat);
  grid.innerHTML = list.map(p => `
    <div class="product-card" onclick="openModal(${p.id})">
      <div class="aspect-[4/5] overflow-hidden rounded-sm mb-3">
        <img src="${p.photo}" alt="${p.name}" class="w-full h-full object-cover">
      </div>
      <div class="flex items-start justify-between gap-2">
        <h4 class="text-sm leading-snug">${p.name}</h4>
        <span class="text-sm font-medium whitespace-nowrap">${money(p.price)}</span>
      </div>
    </div>
  `).join("");
}

function openModal(id){
  const p = PRODUCTS.find(x=>x.id===id);
  document.getElementById("modalPhoto").style.backgroundImage = `url('${p.photo}')`;
  document.getElementById("modalName").textContent = p.name;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPrice").textContent = money(p.price);
  document.getElementById("productModal").classList.add("open");
}
function closeModal(){ document.getElementById("productModal").classList.remove("open"); }

// ===================== INDICADOR ABIERTO/CERRADO (horario real) =====================
// Lunes(1) a Jueves(4): 09:00–21:30 | Viernes(5) y Sábado(6): 10:00–21:30 | Domingo(0): 10:00–21:00
function getScheduleForDay(day){
  if(day === 0) return {open:10, close:21};
  if(day === 5 || day === 6) return {open:10, close:21.5};
  return {open:9, close:21.5}; // Lunes a Jueves
}
function updateOpenStatus(){
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes()/60;
  const { open, close } = getScheduleForDay(day);
  const isOpen = hour >= open && hour < close;
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  const fmt = h => (Math.floor(h)+":"+(h%1 ? "30" : "00"));
  if(isOpen){
    dot.className = "status-dot bg-emerald-400";
    text.textContent = `Abierto ahora · cierra a las ${fmt(close)}`;
  } else {
    dot.className = "status-dot bg-red-400";
    text.textContent = `Cerrado ahora · abre a las ${fmt(open)}`;
  }
}
updateOpenStatus();

// ===================== INIT =====================
renderFilters();
renderProducts();
