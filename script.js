let equationChoose = function() {
  let equationArray = [];
  $('.btn-check[type="checkbox"]').each(function (index, type) {
    if ($(this).prop('checked') === true) {
      equationArray.push($(type).next().attr('id'));
    }
  });
  
  // console.log(equationArray);
  let randomPick = Math.floor(Math.random() * equationArray.length);
  let choice = equationArray[randomPick];
  // console.log(choice);

  if (choice === "addition") {
    return "+"
  } else if (choice === "subtraction") {
    return "-"
  } else if (choice === "multiplication") {
    return "*"
  } else if (choice === "division") {
    return "/"
  } else {
    alert("Must select at least one type of equation");
  }
}

let answer;

let problemGen = function() {
  let numFirst;
  let numSecond;
  let operator = equationChoose();

  let numGen = function() {
    if (operator === "*") {
      num1 = Math.floor(Math.random() * 20) + 1; 
      num2 = Math.floor(Math.random() * 10) + 1;
    } else {
      num1 = Math.floor(Math.random() * 100) + 1; 
      num2 = Math.floor(Math.random() * 100) + 1;
    }
    
    if (num1 >= num2) {
      numFirst = num1;
      numSecond = num2;
      
    } else if (num2 > num1) {
      numFirst = num2;
      numSecond = num1;
      
    }
    // console.log(numFirst);
    // console.log(numSecond);
  }

  numGen();

  // ===== division remainder ===== //
  
  if (operator === "/") {
    if (numFirst % numSecond !== 0) {
      while (numFirst % numSecond !== 0) {
        numGen();
        if (numFirst % numSecond === 0) {
          break;
        }
      }
    }
  }

  // ===== equation creator ===== //

  let equation = `${numFirst} ${operator} ${numSecond}`;
  // let answer;  
  if (operator === "+") {
    answer = numFirst + numSecond;
  } else if (operator === "-") {
    answer = numFirst - numSecond;
  } else if (operator === "*") {
    answer = numFirst * numSecond;
  } else if (operator === "/") {
    answer = numFirst / numSecond;
  }

  $('#equation').text(equation);
  
  console.log(equation, answer);
  return

  
}

let score = 0;
let highscore = 0;
let count = 10;

let scoreEval = function() {
  let userInput = $('#answer');
  if (userInput.val() === answer.toString()) {
    score++;
    count++;
    $('#timer').text(count);
    problemGen();
    userInput.val('');
  }
  if (score > highscore) {
    highscore = score;
  }
  $('#current-score').text(score);
  $('#highscore').text(highscore);

}

let timerStart = function() {
  $('#answer').off('keypress', timerStart);
  let countdown = function() {
    count--;
    $('#timer').text(count);
    if (count === 0) {
      clearInterval(timer);
      answer = null;
      $('#equation').text("Time's up!")
    }
    if ($('#testLength').val() !== 0) {
      if (score >= $('#testLength').val()) {
        clearInterval(timer);
        $('#equation').text("Congratulations! You beat the timer!");
      }
    }
  }
  let timer = setInterval(countdown, 1000);
  
  timer;
  
}

let sliderVal = function() {
  let slider = $('#testLength');
  let val = slider.val();
  $('#slider-val').text(val);
}

$(document).ready(function() {
  problemGen();
  sliderVal();
  $('#testLength').on('change', sliderVal);
  $('.btn-ready').on('click', function() {
    count = 10;
    score = 0;
    $('#current-score').text(score);
    $('#timer').text(count);
    problemGen();
    timerStart();
  });
  $('#answer').on('keyup', scoreEval);
  $('#answer').on('keypress', timerStart);
})
