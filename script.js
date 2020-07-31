var pos = 0;
var test,
  test_status,
  questions,
  option,
  options,
  op1,
  op2,
  op3,
  op4 = 0;
var questions = [
  ['How old are you?', '24', '30', '26', '31', '30'],
  ['What is 2+2?', '4', '6', '9', '2', '4'],
  ['What is your name?', 'Alex', 'Eric', 'Sally', 'Moe', 'Moe'],
];

var test = document.querySelector('#test');
var test_status = document.querySelector('#test_status');
var time = document.querySelector('.timer');
var howmanyTtime = 0;
var counter = questions.length * 10;
time.textContent = counter;

function begin() {
  document.querySelector('.start').addEventListener('click', start);
}

function newBegin() {
  var highscores = document.querySelector('.info');
  highscores.className = 'hide';
  var test_status = document.querySelector('#test_status');
  test_status.className = 'hide';

  var header = document.querySelector('.header');
  header.className = 'header';
  var start = document.querySelector('.text-start');
  start.className = 'container text-start';
  document.querySelector('.start').addEventListener('click', start);
}

function start() {
  var test_status = document.querySelector('#test_status');
  test_status.className = '';

  var start = document.querySelector('.text-start');
  start.className = 'container text-start hide';

  timer();
  renderQuestion();
}

function renderQuestion() {
  if (pos >= questions.length) {
    var newCounter = counter;
    return false;
  }

  test_status.innerHTML = `Question ${pos + 1} / ${questions.length}`;
  question = questions[pos][0];
  op1 = questions[pos][1];
  op2 = questions[pos][2];
  op3 = questions[pos][3];
  op4 = questions[pos][4];
  answer = questions[pos][5];

  test.innerHTML = `<h3> ${question} </h3>`;
  test.innerHTML += `<button onclick='checkAnswer(this)' class="option" data-option="op1">${op1}</button> `;
  test.innerHTML += `<button onclick='checkAnswer(this)' class="option" data-option="op2">${op2}</button> `;
  test.innerHTML += `<button onclick='checkAnswer(this)' class="option" data-option="op3">${op3}</button>`;
  test.innerHTML += `<button onclick='checkAnswer(this)' class="option" data-option="op4">${op4}</button> `;
}
function checkAnswer(ele) {
  // options = document.querySelector('.option');
  var btnValue = ele.innerText;

  if (answer === btnValue) {
    ele.setAttribute('class', 'correct');
  } else {
    ele.setAttribute('class', 'wrong');
    counter = time.textContent = counter - 10;
  }
  var myVar = setTimeout(positionIncrement, 400);

  function positionIncrement() {
    pos++;
    renderQuestion();
  }
}

function timer() {
  var timerInterval = setInterval(function () {
    counter--;
    time.textContent = counter;

    if (pos > questions.length - 1) {
      clearInterval(timerInterval);
      theEnd(counter + 1);
    }

    if (counter === 0) {
      clearInterval(timerInterval);
      theEnd(0);
    }

    if (counter < 0) {
      clearInterval(timerInterval);
      theEnd(0);
    }
  }, 1000);
}

function theEnd(counter) {
  var header = document.querySelector('.header');
  header.className = 'header hide';
  test_status.innerHTML = `You complited ${pos} out of ${questions.length}`;
  test.innerHTML = `  
  <div class="scoreCheck">
  <h3><strong>All Done</strong> </h3>
    <h5><strong>final score is ${counter}<span id="score"></span</strong></h5>
    <label><strong>Enter Initials</strong></label><input type="text" id="bind" /><button onclick='listOfThescore(this)' class="submit">Submit</button>
   </div>
   `;
}

function listOfThescore(ele) {
  var btnValue = ele.innerText;

  var temp = document.getElementById('bind').value;

  if (btnValue == 'Submit') {
    test.innerHTML = `
    <div class="info" >
    <h3><strong>Highscores</strong></h3>
    <ol id="onOrderList"></ol>
    <button id="back-btn">Go Back</button>
    <button id="clear-result">Clear Highscores</button></div>
  `;

    var initial1Test = JSON.parse(localStorage.getItem('usersData')) || [];
    var user = {
      initial: temp,
      score: counter,
    };

    initial1Test.push(user);
    //console.log('i am inside --->' + howmanyTtime);
    howmanyTtime++;

    localStorage.setItem('userData', JSON.stringify(initial1Test));

    for (var i = 0; i < initial1Test.length; i++) {
      var li = document.createElement('li');
      if (counter == 0 || counter < 0) {
        li.textContent = `${initial1Test[i].initial}-0`;
      } else {
        li.textContent = `${initial1Test[i].initial}-${
          initial1Test[i].score + 1
        }`;
      }

      document.querySelector('#onOrderList').appendChild(li);
    }

    document.querySelector('#back-btn').addEventListener('click', function () {
      counter = questions.length * 10;
      time.textContent = counter;
      pos = 0;
      newBegin();
    });

    var clearBtn = document.getElementById('clear-result');
    clearBtn.addEventListener('click', function () {
      li.remove();
    });
  }
}

begin();
