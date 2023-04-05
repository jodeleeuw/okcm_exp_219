var jsPsychCuriosity = (function (jspsych) {
  "use strict";

  const info = {
    name: "Curiosity-PlugIn",
    parameters: {
      clicks_until_key: {
        type: jspsych.ParameterType.INT,
        default: 5,
      },
      image_filepath: {
        type: jspsych.ParameterType.IMAGE,
        default: undefined,
      },
    },
  };

  /**
   * **PLUGIN-NAME**
   *
   * SHORT PLUGIN DESCRIPTION
   *
   * @author YOUR NAME
   * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
   */
  class CuriosityPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    trial(display_element, trial) {
      // data saving
      var trial_data = {};
      display_element.innerHTML = `
        <div class="grid-container">
          <div class="card" id="1">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="2">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="3">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="4">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="5">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="6">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="7">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="8">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="9">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="10">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="11">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="12">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="13">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="14">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="15">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="16">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="17">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="18">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="19">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="20">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="21">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="22">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="23">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="24">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="25">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="26">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="27">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="28">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="29">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
          <div class="card" id="30">
            <div class="front"><h1>?</h1></div>
            <div class="back"><h1>X</h1></div>
          </div>
        </div>
        <br>
        <button id="continue-btn" class="jspsych-btn" disabled>Continue</button>
        <style>
          h1 {
            color: #888888;
          }
          .grid-container {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            grid-gap: 6px;
            height: 600px;
            margin: auto;
            perspective: 800px;
            background-image: url("img/sunset.jpeg"); /* default background image */
            background-color: #cccccc; /* Used if the image is unavailable */
            height: 80vh;
            background-position: center; /* Center the image */
            background-repeat: no-repeat; /* Do not repeat the image */
            background-size: cover; /* Resize the background image to cover the entire container */
            min-width: 80vw;
          }
          .card {
            background-color: black;
            border: 3px solid #555555;
            width: 100%;
            height: 100%;
            color: white;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
          /*  position: absolute;*/
            border-radius: 3%;
          }
          .card div {
            position: absolute;
            backface-visibility: hidden;
            height: 100%;
            width: 100%;
            border-radius: 3%;
          }
          .card .front {
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: sans-serif;
            font-size: 200;
          }
          .card .back {
            transform: rotateY(180deg);
            background-color: blue;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: sans-serif;
            font-size: 200;
          }
          .card.flipped {
            transform: rotateY(180deg);
          }
          .card.flipped .front {
            display: none;
          }
          .card.flipped.disappeared {
            animation: fadeOut 3s forwards;
          }
          .removed {
            opacity: 0;
            cursor: auto; !important
          }
          @keyframes fadeOut {
            0% {
              opacity: 1;
              transform: rotateY(180deg);
            }
            100% {
              opacity: 0;
              transform: rotateY(180deg);
            }
          }
          #key {
            height: 100%;
          }
        </style>
      `;

      const key_num = trial.clicks_until_key;
      const backdrop_file = trial.image_filepath;
      let flip_count = 0;
      let flips = [];
      const start_time = performance.now();

      const cards = display_element.querySelectorAll('.card');
      const button = display_element.querySelector('#continue-btn');

      // Set background image
      const container = display_element.querySelector('.grid-container');
      container.style.backgroundImage = `url(${backdrop_file})`;

      cards.forEach(card => {
        let first_click = true;
        card.addEventListener('click', () => {
          if(first_click){
            flip_count += 1;
            first_click = false;
            let index = parseInt(card.id);

            flips.push({
              trial_number: flip_count,
              card_index: index,
              row: Math.floor(index / 6) + 1,
              column: (index % 6),
              timestamp: Math.round(performance.now()-start_time)
            });
          }
          if(flip_count == key_num){
            card.querySelectorAll('.back')[0].innerHTML = '<img src="./img/KEY.png" alt="KEY" id="key">';
            button.disabled = false;
          }
          if (!card.classList.contains('flipped')) {
            card.classList.toggle('flipped');
          }

          setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease-out';
            card.style.opacity = 0;
            card.style.pointerEvents = "none";
          }, 1300);
        });
      });

      button.addEventListener('click', ()=>{
        trial_data.flips_count = flip_count;
        trial_data.flips = flips
        // end trial
        this.jsPsych.finishTrial(trial_data);
      })

    }
  }
  CuriosityPlugin.info = info;

  return CuriosityPlugin;
})(jsPsychModule);
