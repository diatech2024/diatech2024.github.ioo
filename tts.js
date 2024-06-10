document.addEventListener('DOMContentLoaded', function() {
  const textToSpeak = document.getElementById('text-to-speak');
  const speechToText = document.getElementById('speech-to-text');
  const voiceSelect = document.getElementById('voice-select');
  const convertButton = document.getElementById('convert-button');
  const stopButton = document.getElementById('stop-button');
  const speechRecognitionButton = document.getElementById('speech-recognition');
  const pitch = document.getElementById('pitch');
  const rate = document.getElementById('rate');
  const volume = document.getElementById('volume');
  let synth = window.speechSynthesis;
  let voices = [];
  let recognition;

  // Function to populate the voice list
  function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach((voice, i) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = i;
      voiceSelect.appendChild(option);
    });
  }

  // Initially populate the voice list and set the event listener for voice changes
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }

  // Function to start speaking
  function speak() {
    if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    }
    if (textToSpeak.value !== '') {
      const utterThis = new SpeechSynthesisUtterance(textToSpeak.value);
      utterThis.onend = () => {
        console.log('SpeechSynthesisUtterance.onend');
      };
      utterThis.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror');
      };
      const selectedVoice = voices[voiceSelect.value];
      utterThis.voice = selectedVoice;
      utterThis.pitch = pitch.value;
      utterThis.rate = rate.value;
      utterThis.volume = volume.value;
      synth.speak(utterThis);
    }
  }

  // Event listener for the convert button
  convertButton.addEventListener('click', () => {
    speak();
  });

  // Event listener for the stop button
  stopButton.addEventListener('click', () => {
    if (synth.speaking) {
      synth.cancel();
    }
  });

  // Function to start speech recognition
  function startRecognition() {
    // Prompt the user for microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        recognition = new webkitSpeechRecognition(); // For compatibility with some browsers
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = function() {
          console.log('Speech recognition started...');
        };

        recognition.onresult = function(event) {
          const transcript = event.results[0][0].transcript;
          speechToText.value = transcript;
        };

        recognition.onerror = function(event) {
          console.error('Speech recognition error:', event.error);
        };

        recognition.onend = function() {
          console.log('Speech recognition ended.');
        };

        recognition.start();
      })
      .catch(function(err) {
        console.error('Error accessing microphone:', err);
        showMicEnableInstructions();
      });
  }

  // Event listener for the speech recognition button
  speechRecognitionButton.addEventListener('click', () => {
    startRecognition();
  });

  // Function to show microphone enable instructions
  function showMicEnableInstructions() {
    // You can customize this alert message or create a modal popup
    alert('To use speech recognition, please allow microphone access. \n\nOn Google Chrome, Settings --> Privacy and Security --> Site Settings --> Microphone --> Sites can ask to use your microphone.');
  }
});
