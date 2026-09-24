(()=> {
  const toggle=document.querySelector("#guide-toggle"),panel=document.querySelector("#virtual-guide"),close=document.querySelector("#guide-close"),speakButton=document.querySelector("#guide-speak"),mic=document.querySelector("#guide-mic"),message=document.querySelector("#guide-message"),chat=document.querySelector("#guide-chat"),input=document.querySelector("#guide-input");
  if(!toggle||!panel||!close)return;
  const say=(spanish,russian)=>{
    if(message)message.textContent=spanish;
    if(!("speechSynthesis" in window))return;
    window.speechSynthesis.cancel();
    const voices=window.speechSynthesis.getVoices(),female=/female|femen|mujer|zira|paulina|dalia|helena|laura|sabina|monica|irina|elena|katya|milena/i;
    const pick=prefix=>voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(prefix)&&female.test(v.name))||voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(prefix));
    const es=pick("es"),ru=pick("ru"),spanishText=spanish.replace(/\bNika\b/gi,"tu asistente").replace(/\bMasha\b/gi,"la profesora");
    [[spanishText,es],[russian,ru]].forEach(([text,voice])=>{if(!voice)return;const u=new SpeechSynthesisUtterance(text);u.lang=voice.lang;u.voice=voice;u.rate=.92;window.speechSynthesis.speak(u)});
  };
  const welcome=()=>say("Hola, me llamo Nika y seré tu ayudante durante todo el camino. Ya hiciste el primer paso. Pregúntame lo que quieras sobre ruso, clases, el test o la plataforma.","Привет, меня зовут Ника, и я буду твоей помощницей на всём пути. Ты уже сделала первый шаг. Спроси меня о русском языке, уроках, тесте или платформе.");
  const reply=raw=>{
    const t=raw.toLowerCase();
    if(/nivel|test|prueba|уров/.test(t))return say("El test tiene diez preguntas y te da una orientación hasta B2. Pulsa «Hacer mi test de nivel» para empezar.","Тест состоит из десяти вопросов и определяет примерный уровень до B2. Нажми «Тест уровня», чтобы начать.");
    if(/clase|horario|reserv|lección|урок|занят/.test(t))return say("Las clases individuales son con Masha por Zoom, con plataforma y pizarras digitales. Puedes reservar el horario que te convenga.","Индивидуальные уроки проходят с Машей в Zoom, с платформой и интерактивными досками. Ты можешь выбрать удобное время.");
    if(/precio|cuesta|pago|pagar|precio|стоим|цен/.test(t))return say("Hay cursos desde 400 pesos y clases individuales desde 200 pesos. Puedes añadir un paquete a la canasta en la página principal.","Есть курсы от 400 песо и индивидуальные уроки от 200 песо. На главной странице можно добавить пакет в корзину.");
    if(/plataforma|juego|practic|игр|платформ/.test(t))return say("La plataforma tiene ejercicios de palabras, práctica y pronto mostrará tu progreso. Pulsa «Jugar y practicar».","На платформе есть упражнения со словами и практика. Нажми «Играть и практиковаться».");
    if(/hola|buenas|привет/.test(t))return say("¡Hola! Me alegra conocerte. ¿Quieres empezar con el test, una clase o una práctica?","Привет! Рада познакомиться. Хочешь начать с теста, урока или практики?");
    return say("Entiendo. Estoy en modo de demostración, pero puedo orientarte sobre el test, las clases, precios, la plataforma y WhatsApp de la profesora.","Я понимаю. Сейчас я в демо-режиме, но могу подсказать про тест, уроки, цены, платформу и WhatsApp Маши.");
  };
  const open=()=>{panel.classList.add("show");toggle.setAttribute("aria-expanded","true");setTimeout(welcome,180)};
  const hide=()=>{panel.classList.remove("show");toggle.setAttribute("aria-expanded","false");window.speechSynthesis?.cancel()};
  toggle.addEventListener("click",()=>panel.classList.contains("show")?hide():open());close.addEventListener("click",hide);speakButton?.addEventListener("click",welcome);
  chat?.addEventListener("submit",e=>{e.preventDefault();const text=input?.value.trim();if(!text)return;input.value="";reply(text)});
  mic?.addEventListener("click",()=>{
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Recognition){if(message)message.textContent="Tu navegador no reconoce el micrófono. Escribe tu pregunta abajo.";return}
    let received=false;const recognition=new Recognition();
    recognition.lang="es-MX";recognition.interimResults=false;recognition.maxAlternatives=1;
    if(message)message.textContent="🎙 Te escucho… habla ahora.";
    recognition.onresult=e=>{received=true;reply(e.results[0][0].transcript)};
    recognition.onerror=e=>{if(message)message.textContent=e.error==="not-allowed"?"Permite el micrófono en el navegador y vuelve a pulsar el botón.":"No recibí una frase. Intenta otra vez o escribe tu pregunta."};
    recognition.onend=()=>{if(!received&&message&&message.textContent.includes("Te escucho"))message.textContent="No recibí una frase. Intenta otra vez o escribe tu pregunta."};
    try{recognition.start()}catch{if(message)message.textContent="Pulsa el micrófono otra vez para hablar."}
  });
})();