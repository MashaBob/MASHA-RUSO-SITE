(()=> {
  const toggle=document.querySelector("#guide-toggle");
  const panel=document.querySelector("#virtual-guide");
  const close=document.querySelector("#guide-close");
  const speakButton=document.querySelector("#guide-speak");
  const mic=document.querySelector("#guide-mic");
  const message=document.querySelector("#guide-message");
  if(!toggle||!panel||!close)return;

  const say=(spanish,russian)=>{
    if(message)message.textContent=spanish;
    if(!("speechSynthesis" in window))return;
    window.speechSynthesis.cancel();
    const voices=window.speechSynthesis.getVoices();
    const female=/female|femen|mujer|zira|paulina|dalia|helena|laura|sabina|monica|irina|elena|katya|milena/i;
    const pick=prefix=>voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(prefix)&&female.test(v.name))||voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith(prefix));
    const es=pick("es"),ru=pick("ru");
    const spanishText=spanish.replace(/\bNika\b/gi,"tu asistente").replace(/\bMasha\b/gi,"la profesora");
    [[spanishText,es],[russian,ru]].forEach(([text,voice])=>{
      if(!voice)return;
      const u=new SpeechSynthesisUtterance(text);
      u.lang=voice.lang;u.voice=voice;u.rate=.92;
      window.speechSynthesis.speak(u);
    });
  };

  const welcome=()=>say(
    "Hola, me llamo Nika y seré tu ayudante durante todo el camino. Ya hiciste el primer paso. Aquí puedes hacer el test de nivel, reservar una clase, practicar en la plataforma o hablar con la profesora.",
    "Привет, меня зовут Ника, и я буду твоей помощницей на всём пути. Ты уже сделала первый шаг. Здесь можно пройти тест уровня, записаться на урок, потренироваться на платформе или написать Маше."
  );
  const open=()=>{panel.classList.add("show");toggle.setAttribute("aria-expanded","true");setTimeout(welcome,180)};
  const hide=()=>{panel.classList.remove("show");toggle.setAttribute("aria-expanded","false");window.speechSynthesis?.cancel()};
  toggle.addEventListener("click",()=>panel.classList.contains("show")?hide():open());
  close.addEventListener("click",hide);
  speakButton?.addEventListener("click",welcome);
  mic?.addEventListener("click",()=>{
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!Recognition){say("Tu navegador no permite el micrófono aquí. Puedes elegir una de las cuatro opciones.","Твой браузер не поддерживает микрофон. Выбери одно из четырёх действий.");return}
    const recognition=new Recognition();
    recognition.lang="es-MX";recognition.interimResults=false;recognition.maxAlternatives=1;
    say("Te escucho. Puedes decir: nivel, clase, plataforma o WhatsApp.","Я слушаю. Скажи: уровень, урок, платформа или WhatsApp.");
    recognition.onresult=e=>{
      const t=e.results[0][0].transcript.toLowerCase();
      const page=/nivel|test|prueba/.test(t)?"test-nivel.html":/clase|horario|reserv/.test(t)?"reservar.html":/juego|plataforma|practic/.test(t)?"plataforma.html":null;
      if(page){say("Perfecto, abrimos esa sección.","Отлично, открываем этот раздел.");setTimeout(()=>location.href=page,1500)}
      else if(/whatsapp|masha|ayuda|pregunta/.test(t)){say("Abriré el WhatsApp de la profesora.","Я открою WhatsApp Маши.");setTimeout(()=>window.open("https://wa.me/524421562187?text=Hola%20Masha%2C%20tengo%20una%20pregunta%20sobre%20los%20cursos.","_blank","noopener"),1500)}
      else say("No entendí. Prueba con nivel, clase, plataforma o WhatsApp.","Я не поняла. Попробуй сказать: уровень, урок, платформа или WhatsApp.");
    };
    recognition.onerror=()=>say("No pude escucharte. Prueba otra vez o usa los botones.","Я не смогла тебя услышать. Попробуй ещё раз или выбери кнопку.");
    recognition.start();
  });
})();