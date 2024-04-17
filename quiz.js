var questions = [ // Вопросы с ответами
    { question: "What is the capital of Canada?", choices: ["Toronto", "Ottawa", "Vancouver"], correct: ["Ottawa"] },
    { question: "Which of these characters are friends with Harry Potter?", choices: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"], correct: ["Ron Weasley", "Hermione Granger"] },
    { question: "What is the longest river in the world?", choices: ["Nile", "Amazon", "Yangtze"], correct: ["Nile"] },
    { question: "Which year is considered leap year?", choices: ["2004", "2014", "2024"], correct: ["2004", "2024"] },
];
var currentQuestionIndex = 0;
var correctAnswersIndex = 0;

function showQuestion() { // Вывод вопроса и вариантов ответа на страницу
    var currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    var choices = document.getElementById('choices');
    choices.innerHTML = '';
    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var input = document.createElement('input');
        input.type = currentQuestion.correct.length > 1 ? 'checkbox' : 'radio';
        input.name = 'choice';
        input.value = currentQuestion.choices[i];
        var label = document.createElement('label');
        label.textContent = currentQuestion.choices[i];
        label.insertBefore(input, label.firstChild);
        choices.appendChild(label);
    }
    if (currentQuestion.correct.length > 1) { // Проверка на ответ с несколькими правильными ответами 
        var warning = document.createElement('p'); 
        warning.className = 'warning';
        warning.textContent = "This question has multiple correct answers";
        choices.appendChild(warning);
    }
    document.getElementById('submit').style.display = 'block'; 
    document.getElementById('next').style.display = 'none';
}

function checkAnswer() { // Проверка на правильность/неправильность ответа 
    var inputs = document.getElementById('choices').getElementsByTagName('input');
    var correctAnswer = questions[currentQuestionIndex].correct;
    var correctChecked = 0;
    var incorrectChecked = false;

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            if (correctAnswer.includes(inputs[i].value)) {
                correctChecked++;
                inputs[i].parentNode.className = 'correct';
            } else {
                incorrectChecked = true;
                inputs[i].parentNode.className = 'incorrect';
            }
        } else if (correctAnswer.includes(inputs[i].value)) {
            inputs[i].parentNode.className = '';
        }
    }

    if (correctChecked === correctAnswer.length && !incorrectChecked) {
        correctAnswersIndex++;
    }

    document.getElementById('submit').style.display = 'none';
    document.getElementById('next').style.display = 'block';
}


document.getElementById('submit').onclick = checkAnswer; // Кнопка проверки ответа

document.getElementById('next').onclick = function() { // Кнопка следующего вопроса 
    this.classList.toggle('hidden');
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        this.style.display = 'none';
        document.getElementById('submit').style.display = 'block';
    } else {
        document.getElementById('quiz').style.display = 'none';
        document.getElementById('correct').textContent = correctAnswersIndex;
        document.getElementById('result').style.display = 'block';
        document.getElementById('restart').style.display = 'block';
    }
};

document.getElementById('restart').onclick = function() { // Кнопка Retry (перезагрузка страницы)
    location.reload()
    currentQuestionIndex = 0;
    correctAnswersIndex = 0;
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('restart').style.display = 'none';
    showQuestion();
};

showQuestion();
