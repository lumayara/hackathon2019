const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang =  'es-ES';
recognition.interimResults = false;

function synthVoice(text) {
  const synth = window.speechSynthesis;
  let utterance = new SpeechSynthesisUtterance();
  utterance.lang = 'es-MX';

  utterance.text = text;
  synth.speak(utterance);
}

synthVoice("Sistema inicializado");

document.querySelector('#Talk-Btn').addEventListener('click', () => {
  recognition.start();
});

recognition.addEventListener('result', (e) => {
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;

  console.log('Confidence: ' + e.results[0][0].confidence);

  let data = {query: text};

  fetch("/voice", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  .then(response => response.json())
  .then(function(myJson) {
    console.log(myJson);
    synthVoice(myJson.data);
  }); // parses JSON response into native Javascript objects 
  

  console.log(`Result: ${text}`);

  synthVoice(text);

  // We will use the Socket.IO here later…
});

