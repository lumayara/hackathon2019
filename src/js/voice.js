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

// synthVoice("Sistema inicializado");

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

    if (myJson.response.parameters.fields.number && myJson.response.parameters.fields.number.numberValue &&
      myJson.response.parameters.fields['phone-number'] && myJson.response.parameters.fields['phone-number'].stringValue){
      let forRequest = { 
        value : myJson.response.parameters.fields.number.numberValue,
        phone :  myJson.response.parameters.fields['phone-number'].stringValue
      }
      console.log(forRequest);
      requestTranfer(forRequest);
    }
    synthVoice(myJson.data);
  }); // parses JSON response into native Javascript objects 
  

  console.log(`Result: ${text}`);

  synthVoice(text);

  // We will use the Socket.IO here later…
});


function requestTranfer(pData)  {
        console.log(pData);
        let userInfo = JSON.parse(localStorage.getItem(CONSTANS.USER));
        pData.user = userInfo._id;
        pData.name = userInfo.name;
        $("#dErrorTranfer").hide();
        plGlobals.backEnd('POST', "/admin/tranfers" , pData,
            function(response) {
                if (response.status == CODES.OK){
                    localStorage.setItem(CONSTANS.TRANSFERMSG, true);
                    // plGlobals.rediret("app/home");
                    plGlobals.notification({
                title       : "<b>Transferencia realizada</b>",
                type        : "success",
            });
                }
                else{
                    $("#dErrorTranfer").show();
                }
            }
        );
    };
