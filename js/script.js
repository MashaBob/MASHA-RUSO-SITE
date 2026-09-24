const cart=[];
const cartEl=document.querySelector('#cart'),overlay=document.querySelector('#overlay'),items=document.querySelector('#cart-items'),total=document.querySelector('#cart-total'),count=document.querySelector('#cart-count'),checkout=document.querySelector('#checkout'),payment=document.querySelector('#payment-modal');
const style=document.createElement('style');
style.textContent='.delivery-note{font-size:13px;line-height:1.55;padding:14px 0;border-top:1px solid #34243322;margin-top:15px}.course-card,.package-grid article,.service-strip article{position:relative}.hover-info{position:absolute;inset:0;background:#251c25;color:#fff;padding:25px;display:flex;align-items:center;opacity:0;transition:.25s;pointer-events:none;font-size:14px;line-height:1.55}.course-card:hover .hover-info,.package-grid article:hover .hover-info,.service-strip article:hover .hover-info,.show-info .hover-info{opacity:1}';
document.head.append(style);
document.querySelector('.private-lessons .section-heading>p').textContent='Clases con profesora por Zoom, plataforma interactiva y pizarras digitales. Todo se adapta a tu nivel, objetivos y horarios.';
document.querySelector('.courses .section-heading>p').textContent='Mini cursos para autoestudio en plataforma interactiva, con acceso por 30 días, soporte por WhatsApp y una clase de regalo de 45 minutos.';
document.querySelectorAll('.service-strip article')[1].querySelector('p:not(.eyebrow)').textContent='Grupos de 5-6 personas: clases por Zoom y plataforma interactiva, 2 veces por semana durante 3 meses. Cada clase dura 1.5 horas.';
function addInfo(selector,text){
  document.querySelectorAll(selector).forEach(card=>{
    card.insertAdjacentHTML('beforeend',`<div class="hover-info">${text}</div>`);
    card.onclick=e=>{
      if(!e.target.closest('.add'))card.classList.toggle('show-info')
    }
  })
}
addInfo('.package-grid article','Clases individuales con profesora por Zoom, plataforma interactiva, pizarras digitales y acompañamiento totalmente personalizado.');
addInfo('.course-card','Mini curso para estudiar de forma autónoma en plataforma interactiva. Incluye soporte por WhatsApp y una clase de regalo de 45 minutos.');
addInfo('.service-strip article','Clases en vivo por Zoom con apoyo de plataforma interactiva y materiales para practicar.');
function money(n){
  return '$'+n.toLocaleString('es-MX')+' MXN'
}
function render(){
  items.innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-item"><span><b>${x.name}</b><br>${money(x.price)}</span><button data-remove="${i}">Quitar</button></div>`).join(''):'<p class="empty">Tu carrito está vacío.<br>Elige un curso para empezar.</p>';
  const sum=cart.reduce((a,x)=>a+x.price,0);
  total.textContent=money(sum);
  count.textContent=cart.length;
  checkout.disabled=!cart.length;
  document.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{
    cart.splice(+b.dataset.remove,1);
    render()
  })
}
function openCart(){
  cartEl.classList.add('open');
  overlay.classList.add('show')
}
function closeCart(){
  cartEl.classList.remove('open');
  overlay.classList.remove('show')
}
document.querySelectorAll('.add').forEach(b=>b.onclick=e=>{
  e.stopPropagation();
  cart.push({
    name:b.dataset.name,price:+b.dataset.price
  });
  render();
  openCart()
});
document.querySelector('#open-cart').onclick=openCart;
document.querySelector('#close-cart').onclick=closeCart;
overlay.onclick=closeCart;
checkout.onclick=()=>{
  closeCart();
  payment.classList.add('show')
};
document.querySelector('#close-payment').onclick=()=>payment.classList.remove('show');
render();

/* Layered game-like motion in the hero: works with mouse and touch. */
const hero = document.querySelector(".hero");
if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  hero.insertAdjacentHTML("beforeend", '<i class="hero-spark"></i><i class="hero-spark"></i><i class="hero-spark"></i>');
  const moveScene = (clientX, clientY) => {
    const box = hero.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (clientX - box.left) / box.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (clientY - box.top) / box.height * 2 - 1));
    hero.style.setProperty("--scene-x", `${x * -16}px`);
    hero.style.setProperty("--scene-y", `${y * -9}px`);
    hero.style.setProperty("--card-x", `${x * 9}px`);
    hero.style.setProperty("--card-y", `${y * 7}px`);
  };
  hero.addEventListener("pointermove", (event) => moveScene(event.clientX, event.clientY));
  hero.addEventListener("touchmove", (event) => {
    const finger = event.touches[0];
    if (finger) moveScene(finger.clientX, finger.clientY);
  }, { passive: true });
  hero.addEventListener("pointerleave", () => {
    ["--scene-x","--scene-y","--card-x","--card-y"].forEach((name) => hero.style.setProperty(name, "0px"));
  });
}
