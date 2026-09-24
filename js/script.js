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
  hero.insertAdjacentHTML("beforeend", '<div class="weather" aria-hidden="true"></div><i class="hero-spark"></i><i class="hero-spark"></i><i class="hero-spark"></i>');
  const weather = hero.querySelector(".weather");
  if (weather) {
    const rain = Array.from({ length: 64 }, (_, index) => {
      const front = index % 3 === 0 ? " rain-front" : "";
      const length = 34 + index % 5 * 10;
      return `<i class="rain-drop${front}" style="left:${(index * 17 + 3) % 100}%;--rain-length:${length}px;--rain-speed:${.78 + index % 9 * .13}s;--rain-opacity:${front ? ".84" : ".46"};animation-delay:-${index * .17}s"></i>`;
    }).join("");
    const leafColors = ["#b84d2d","#9a3e26","#c46c2f","#7d3827"];
    const leaves = Array.from({ length: 13 }, (_, index) => {
      const drift = 34 + index * 8;
      return `<i class="falling-leaf" style="left:${(index * 23 + 9) % 96}%;--leaf-speed:${8 + index % 5}s;--leaf-drift:${drift}px;--leaf-return:-${drift}px;--leaf-size:${15 + index % 4 * 3}px;--leaf-color:${leafColors[index % leafColors.length]};animation-delay:-${index * .85}s"></i>`;
    }).join("");
    weather.innerHTML = rain + leaves;
  }
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

/* Instant level assessment with a prefilled WhatsApp message for Masha. */
const levelForm = document.querySelector("#level-form");
const levelResult = document.querySelector("#test-result");
if (levelForm && levelResult) {
  const correct = { q1: "b", q2: "a", q3: "b", q4: "b", q5: "a" };
  levelForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(levelForm);
    const unanswered = Object.keys(correct).some((question) => !data.get(question));
    if (unanswered) {
      levelResult.className = "test-result show";
      levelResult.innerHTML = "<p>Por favor responde las cinco preguntas para ver tu resultado.</p>";
      return;
    }
    const score = Object.entries(correct).reduce((total, [question, answer]) => total + (data.get(question) === answer ? 1 : 0), 0);
    const recommendation = score <= 1
      ? { level: "A0 · Desde cero", course: "Mini curso «Ruso desde cero» + clase individual de prueba", plan: "Empezaremos con el alfabeto, presentaciones, frases esenciales y pronunciación." }
      : score <= 3
        ? { level: "A1 · Básico", course: "Paquete de 5 clases individuales", plan: "Reforzaremos conversación, verbos frecuentes y situaciones reales para viajar o conocer gente." }
        : { level: "A2 · Básico alto", course: "Paquete de 7 clases individuales o Club de conversación", plan: "Trabajaremos fluidez, comprensión y conversación natural con correcciones personalizadas." };
    const name = String(data.get("student-name")).trim();
    const answers = Object.keys(correct).map((question, index) => `Pregunta ${index + 1}: ${data.get(question) === correct[question] ? "correcta" : "por reforzar"}`).join("\n");
    const message = encodeURIComponent(`Hola Masha, soy ${name}.\n\nResultado del test de ruso:\nNivel: ${recommendation.level}\nPuntaje: ${score}/5\nRecomendación: ${recommendation.course}\nPlan: ${recommendation.plan}\n\nDetalle:\n${answers}`);
    levelResult.className = "test-result show";
    levelResult.innerHTML = `<p class="eyebrow">TU RESULTADO</p><h3>${recommendation.level}</h3><p><b>Plan recomendado:</b> ${recommendation.plan}</p><p><b>Para ti:</b> ${recommendation.course}</p><a class="button whatsapp-result" target="_blank" rel="noopener" href="https://wa.me/524421562187?text=${message}">Enviar mi resultado a Masha por WhatsApp <span>↗</span></a>`;
    levelResult.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

/* Virtual guide widget */
const guideToggle=document.querySelector("#guide-toggle"),guidePanel=document.querySelector("#virtual-guide"),guideClose=document.querySelector("#guide-close");
if(guideToggle&&guidePanel&&guideClose){const setGuide=open=>{guidePanel.classList.toggle("show",open);guideToggle.setAttribute("aria-expanded",String(open))};guideToggle.addEventListener("click",()=>setGuide(!guidePanel.classList.contains("show")));guideClose.addEventListener("click",()=>setGuide(false));setTimeout(()=>setGuide(true),1200)}
/* Nika: browser voice guide. Speech recognition is available in supported browsers. */
const guideSpeak=document.querySelector("#guide-speak"),guideMic=document.querySelector("#guide-mic"),guideMessage=document.querySelector("#guide-message");
const talkNika=(text,voiceText=text)=>{if(guideMessage)guideMessage.textContent=text;if(!("speechSynthesis" in window))return;window.speechSynthesis.cancel();let spoken=false;const playRussian=()=>{if(spoken)return;const voice=window.speechSynthesis.getVoices().find(item=>item.lang&&item.lang.toLowerCase().startsWith("ru"));if(!voice)return;spoken=true;const utterance=new SpeechSynthesisUtterance(voiceText);utterance.lang=voice.lang;utterance.voice=voice;utterance.rate=.92;window.speechSynthesis.speak(utterance)};playRussian();if(!spoken){if(guideMessage)guideMessage.textContent="Nika hablará en ruso cuando haya una voz rusa disponible en este dispositivo.";window.speechSynthesis.addEventListener("voiceschanged",playRussian,{once:true});setTimeout(playRussian,900)}};
const answerNika=(said)=>{const text=said.toLowerCase();let answer="Puedo ayudarte con tu nivel, con una clase, con la plataforma o para hablar con Masha.",voice="Я помогу определить твой уровень, записаться на урок, открыть платформу или написать Маше.";if(/nivel|test|prueba/.test(text)){answer="Perfecto. Te llevaré al test de nivel. Son diez preguntas y al final tendrás una recomendación hasta B2.";voice="Отлично. Перейдём к тесту уровня. Там десять вопросов, а в конце ты получишь рекомендацию до уровня B2."}else if(/clase|horario|reserv|cita/.test(text)){answer="Claro. Abriré la página de reserva para que elijas el día y la hora que prefieres.";voice="Конечно. Я открою запись, и ты выберешь удобный день и время."}else if(/juego|material|practic|plataforma/.test(text)){answer="Vamos a la plataforma. Allí tienes una mini juego para practicar vocabulario ruso.";voice="Пойдём на платформу. Там можно потренировать русские слова в мини-игре."}else if(/whatsapp|masha|pregunta|ayuda/.test(text)){answer="Te conecto con Masha por WhatsApp para recibir ayuda personal.";voice="Я соединю тебя с Машей в WhatsApp, чтобы ты получила личную помощь."}talkNika(answer,voice);if(/nivel|test|prueba/.test(text))setTimeout(()=>location.href="test-nivel.html",1200);else if(/clase|horario|reserv|cita/.test(text))setTimeout(()=>location.href="reservar.html",1200);else if(/juego|material|practic|plataforma/.test(text))setTimeout(()=>location.href="plataforma.html",1200);else if(/whatsapp|masha|pregunta|ayuda/.test(text))setTimeout(()=>window.open("https://wa.me/524421562187?text=Hola%20Masha%2C%20tengo%20una%20pregunta%20sobre%20los%20cursos.","_blank","noopener"),1200)};
if(guideSpeak)guideSpeak.addEventListener("click",()=>talkNika("Hola, soy Nika. Puedo ayudarte a descubrir tu nivel, reservar una clase, practicar con un juego o hablar con Masha.","Привет, я Ника. Я помогу определить твой уровень, записаться на урок, потренироваться в игре или написать Маше."));
if(guideMic)guideMic.addEventListener("click",()=>{const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Recognition){talkNika("Tu navegador todavía no permite usar el micrófono aquí. Puedes usar los botones de arriba para elegir lo que necesitas.","Твой браузер пока не поддерживает микрофон. Выбери нужное действие кнопками.");return}const recognition=new Recognition();recognition.lang="es-MX";recognition.interimResults=false;recognition.maxAlternatives=1;talkNika("Te escucho.","Я слушаю.");recognition.onresult=e=>answerNika(e.results[0][0].transcript);recognition.onerror=()=>talkNika("No pude escucharte. Prueba otra vez o usa uno de los botones.","Я не смогла тебя услышать. Попробуй ещё раз или выбери кнопку.");recognition.start()});