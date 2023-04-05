var jsPsychCognitiveLoading = (function (jspsych) {
  "use strict";

  const info = {
    name: "Cognitive-Loading-Plugin",
    parameters: {
      mode: {
        type: jspsych.ParameterType.STRING, // expects: 'present' or 'recall'
        default: 'present',
      },
      load: {
        type: jspsych.ParameterType.STRING, // expects: 'low' or 'high'
        default: 'low',
      },
      shape_locations: {
        type: jspsych.ParameterType.OBJECT,
        default: undefined
      },
    },
  };

  /**
   * **Cognitive-Loading-Plugin**
   *
   * SHORT PLUGIN DESCRIPTION
   *
   * @author YOUR NAME
   * @see {@link https://DOCUMENTATION_URL DOCUMENTATION LINK TEXT}
   */
  class CogntiveLoadingPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    trial(display_element, trial) {
      // data saving
      var trial_data = {};
      display_element.innerHTML = `
        <h2 id="instruction"></h2>
        <div class="container">
          <h1 class="cross">+</h1>
          <div id="1" class="circle circle1"></div>
          <div id="2" class="circle circle2"></div>
          <div id="3" class="circle circle3"></div>
          <div id="4" class="circle circle4"></div>
          <div id="5" class="circle circle5"></div>
          <div id="6" class="circle circle6"></div>
        </div>
        <button class="continue-btn jspsych-btn">Continue</button>
        <style>
          .container {
            position: relative;
            width: 80vw; /* Set container width */
            height: 80vh; /* Set container height */
            margin: 0 auto; /* Center container horizontally */
          }

          .cross {
            position: absolute;
            top: 37.5%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 50px; /* Set cross size */
            color: #000000; /* Set cross color to black */
          }

          .circle {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 70px; /* Set circle width */
            height: 70px; /* Set circle height */
            border-radius: 50%; /* Make circle round */
            background-color: #CCCCCC; /* Set circle color to grey */
            border: 3px solid rgba(0, 0, 0, 0);
            transition: border 0.2s ease-in-out;
          }

          .clickable:hover {
            border: 3px solid black;
            opacity: 1;
          }
          .circle1 {
            top: 10%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .circle4 {
            top: 75%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .circle6 {
            top: 28.5%;
            left: 25%;
            transform: translate(-50%, -50%);
          }
          .circle5 {
            top: 56.5%;
            left: 25%;
            transform: translate(-50%, -50%);
          }
          .circle2 {
            top: 28.5%;
            left: 75%;
            transform: translate(-50%, -50%);
          }
          .circle3 {
            top: 56.5%;
            left: 75%;
            transform: translate(-50%, -50%);
          }
        </style>
      `

      const circleNumbers = [1, 2, 3, 4, 5, 6];
      const triangleSVG = `
         <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
          <polygon points='50 15, 85 85, 15 85' style='fill: #FF8C00;'/>
        </svg>
      `;
      const squareSVG = `
        <svg width="45" height="45">
          <rect width="45" height="45" style="fill: blue;" />
        </svg>`;
      const pentagonSVG = `
        <svg width="50" height="50">
          <polygon points="25,1 49,19 38,49 12,49 1,19" style="fill: #FF69B4"/>
        </svg>
      `;
      const starSVG = `
        <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
          <polygon points='50 5, 61.8 37.7, 95 38.7, 68.4 60.4, 79.2 92.3, 50 74.3, 20.8 92.3, 31.6 60.4, 5 38.7, 38.2 37.7' style='fill: #2E8B57;'/>
        </svg>
      `;
      const triangle = {color: 'orange', name: 'triangle', svg: triangleSVG};
      const square = {color: 'blue', name: 'square', svg: squareSVG};
      const pentagon = {color: 'pink', name: 'pentagon', svg: pentagonSVG};
      const star = {color: 'green', name: 'star', svg: starSVG};
      const shapes = [triangle, square, pentagon, star];
      const shapeFinder = {triangle: triangle, square: square, pentagon: pentagon, star: star};

      const instruction = display_element.querySelector('#instruction');
      const button = display_element.querySelector('.continue-btn');
      const cross = display_element.querySelector('.cross');
      const start_time = performance.now();

      if(trial.mode=='present'){
        button.style.display = 'none';
        const shapeLocations = {
          triangle: 0,
          square: 0,
          pentagon: 0,
          star: 0
        }
        // orange triangle
        const triangleIndex = circleNumbers.splice(Math.floor(Math.random() * circleNumbers.length), 1)[0];
        shapeLocations.triangle = triangleIndex;
        const triangleTarget = display_element.querySelector('.circle'+triangleIndex);
        triangleTarget.innerHTML=triangle.svg;

        // for high load
        if(trial.load=='high'){
          instruction.innerHTML = "Remember the locations of the shapes.";
          [square, pentagon, star].forEach(shape => {
            let shapeIndex = circleNumbers.splice(Math.floor(Math.random() * circleNumbers.length), 1)[0];
            shapeLocations[shape.name] = shapeIndex;
            let shapeTarget = display_element.querySelector('.circle'+shapeIndex);
            shapeTarget.innerHTML=shape.svg;
          });
        } else {
          instruction.innerHTML = "Remember the location of the orange triangle.";
        }
        trial_data.locations = shapeLocations;
        trial_data.mode = 'present';
        trial_data.load = load;

        setTimeout(() => {
          trial_data.total_time = Math.round(performance.now()-start_time);
          // end trial
          this.jsPsych.finishTrial(trial_data);
        }, 5000);
      } else if(trial.mode=='recall'){
        button.disabled = true;

        // figure out which shapes were displayed
        let answerKey = [];
        shapes.forEach(s => {
          let loc = trial.shape_locations[s.name];
          if(loc!=0){
            answerKey.push({shape: s, location: loc});
          }
        })
        // choose one at random
        const keyShape = answerKey[Math.floor(Math.random() * answerKey.length)];
        trial_data.shapeAsked = keyShape.shape;
        trial_data.correctAnswer = keyShape.location;


        // Ask where that shape was
        instruction.innerHTML=`Where was the ${keyShape.shape.color} ${keyShape.shape.name}?`;

        const circles = display_element.querySelectorAll('.circle');
        circles.forEach(circle => {
          circle.classList.add('clickable');
          circle.addEventListener('click', () => {
            trial_data.guess_time = Math.round(performance.now()-start_time);
            if(button.disabled){
              button.disabled = false;
              let index = parseInt(circle.id);
              trial_data.selection = index;
              if(keyShape.location == index){
                circle.style.backgroundColor = 'green';
                cross.innerHTML = "Correct!";
              } else {
                circle.style.backgroundColor = 'red';
                cross.innerHTML = "Incorrect";
              }
              circles.forEach(circle => circle.classList.remove('clickable'));
              for(const shape in trial.shape_locations) {
                let shapeIndex = trial.shape_locations[shape];
                let shapeTarget = display_element.querySelector('.circle'+shapeIndex);
                shapeTarget.innerHTML=shapeFinder[shape].svg;
              }
              trial_data.correct = index == keyShape.location;
            }
          })
        })

        button.addEventListener('click', ()=>{
          trial_data.total_time = Math.round(performance.now()-start_time);
          // end trial
          this.jsPsych.finishTrial(trial_data);
        })
      }

    }
  }
  CogntiveLoadingPlugin.info = info;

  return CogntiveLoadingPlugin;
})(jsPsychModule);
