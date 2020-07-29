var questions = [
  ['How old are you?', '24', '30', '26', '31', '30'],
  ['What is 2+2?', '4', '6', '9', '2', '4'],
  ['What is your name?', 'Alex', 'Eric', 'Sally', 'Moe', 'Moe'],
];

var obj = {};

var loc = 0;
var counter = questions.length * 10;

document.querySelector('.start').addEventListener('click', start);
var time = document.querySelector('.timer');
time.textContent = questions.length * 10;

function start() {
  var start = document.querySelector('.text-start');
  start.className = 'container text-start hide';

  timer();
  generateQuestion();
}

function reset() {
  var questionStart = document.querySelector('.question-start');
  questionStart.remove();
  if (loc > parseInt(questions.length - 1)) {
    var danswer = document.querySelector('.danswer');
    danswer.className = 'danswer hide';
    return false;
  }
  generateQuestion();
}

function timer() {
  // console.log('sub: ' + rTime);

  var timerInterval = setInterval(function (newcounter) {
    counter--;
    // console.log('countdown is ' + c);
    time.textContent = counter;
    if (loc > parseInt(questions.length - 1)) {
      clearInterval(timerInterval);
      theEnd(counter);
    }

    if (counter === 0 || counter <= 0) {
      clearInterval(timerInterval);
      var questionStart = document.querySelector('.question-start');
      questionStart.remove();
      theEnd(0);
    }

    if (counter <= 0) {
      var timer = document.querySelector('.timer');
      timer.remove();

      var score = document.querySelector('#score');
      score.remove();

      clearInterval(timerInterval);
      console.log(questionStart + '.....');
      var questionStart = document.querySelector('.question-start');
      questionStart.remove();
      theEnd(counter);
    }
  }, 1000);
}

function generateQuestion() {
  // console.log(loc);
  var question = questions[loc][0];
  // console.log(question);
  var option1 = questions[loc][1];
  // console.log(option1);
  var option2 = questions[loc][2];
  // console.log(option2);
  var option3 = questions[loc][3];
  // console.log(option3);
  var option4 = questions[loc][4];
  // console.log(option4);
  var answer = questions[loc][5]; // store the answer
  // console.log(answer);

  var questionContainer = document.querySelector('.question');
  // create a container
  var qContainer = (questionContainer.appendChild(
    document.createElement('div')
  ).className = 'container question-start');

  //create an h4 adn append it to the container
  var q = document
    .querySelector('.question-start')
    .appendChild(document.createElement('h4'));
  q.textContent = question;
  // console.log(q);

  //create Buttons

  var button1 = document
    .querySelector('.question-start')
    .appendChild(document.createElement('button'));
  button1.className = `answer a-${loc}-1`;
  button1.textContent = option1;

  var button2 = document
    .querySelector('.question-start')
    .appendChild(document.createElement('button'));
  button2.className = `answer a-${loc}-2`;
  button2.textContent = option2;

  var button3 = document
    .querySelector('.question-start')
    .appendChild(document.createElement('button'));
  button3.className = `answer a-${loc}-3`;
  button3.textContent = option3;

  var button4 = document
    .querySelector('.question-start')
    .appendChild(document.createElement('button'));
  button4.className = `answer a-${loc}-4`;
  button4.textContent = option4;

  //Add event listener

  var op1 = document.querySelector(`.a-${loc}-1`);
  var op2 = document.querySelector(`.a-${loc}-2`);
  var op3 = document.querySelector(`.a-${loc}-3`);
  var op4 = document.querySelector(`.a-${loc}-4`);

  op1.addEventListener('click', function () {
    console.log(option1);
    nextQuestion(option1, answer);
  });
  op2.addEventListener('click', function () {
    console.log(op2);

    nextQuestion(option2, answer);
  });
  op3.addEventListener('click', function () {
    console.log(op3);

    nextQuestion(option3, answer);
  });
  op4.addEventListener('click', function () {
    console.log(op4);

    nextQuestion(option4, answer);
  });
}

function nextQuestion(option, answer) {
  if (option == answer && loc <= parseInt(questions.length - 1)) {
    var danswer = document.querySelector('.danswer');
    time.textContent = counter - 0;
    danswer.textContent = 'Good Job';
    loc++;

    setTimeout(function () {
      danswer.className = 'danswer hide';
    }, 1000);
    danswer.className = 'danswer';
  } else if (option != answer && loc <= parseInt(questions.length - 1)) {
    counter = time.textContent = counter - 10;

    console.log('Wrong');
    var danswer = document.querySelector('.danswer');

    danswer.textContent = 'Wrong';

    loc++;

    setTimeout(function () {
      danswer.className = 'danswer hide';
    }, 1000);

    danswer.className = 'danswer';
  }

  reset();
}

function theEnd(counter) {
  var end = document.querySelector('.text-end');
  end.className = 'container text-end';
  document.querySelector('#score').textContent = counter;
  document.querySelector('.submit').addEventListener('click', function () {
    var end = document.querySelector('.text-end');
    end.className = 'container text-end hide';

    var header = document.querySelector('.header');
    header.className = 'header hide';

    var highscores = document.querySelector('.highscores');
    highscores.className = 'container highscores';
    var scoreList = document
      .querySelector('.scoreList')
      .appendChild(document.createElement('li'));
    scoreList.className = 'demo';

    var initial = (document.querySelector(
      '.demo'
    ).innerHTML = document.getElementById('input_id').value);

    console.log('initial value: ' + initial);

    if (!Object.keys(obj).length) {
      Object.assign(obj, { initial: `${initial}`, score: `${counter}` });
    }

    console.log(obj);

    // localStorage.setItem('initial', JSON.stringify(obj.initial));
    // localStorage.setItem('counter', JSON.stringify(obj.score));

    // var initial1 = JSON.parse(localStorage.getItem('initial'));
    // var counter1 = JSON.parse(localStorage.getItem('counter'));

    scoreList.textContent = `${initial}-${counter}`;
    //
    // return false;

    document.querySelector('.back-btn').addEventListener('click', backToStart);
    document
      .querySelector('.clear-result')
      .addEventListener('click', function () {
        scoreList.remove();
      });
  });
}

function backToStart() {
  counter = questions.length * 10;
  time.textContent = counter;
  document.querySelector('#input_id').value = '';
  console.log('counter is start' + counter);
  loc = 0;
  var highscores = document.querySelector('.highscores');
  highscores.className = 'container highscores hide';

  var header = document.querySelector('.header');
  header.className = 'header';
  var start = document.querySelector('.text-start');
  start.className = 'container text-start';
}
