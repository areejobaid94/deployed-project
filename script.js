function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    if (pageId === 'home') {
        document.getElementById('cover').style.display = 'block';
        document.getElementById('cover-nav').classList.add('active');
    } else if (pageId === 'lesson' || pageId === 'quiz' || pageId === 'lesson-content') {
        document.getElementById(pageId).style.display = 'block';
        if(pageId === 'lesson-content')
            pageId = "lesson";
        document.getElementById(pageId +'-nav').classList.add('active');
    } else {
        if (element)
            element.classList.add('active');
        if (document.getElementById(pageId))
            document.getElementById(pageId).style.display = 'block';
    }
}

const audio = document.getElementById("lessonAudio");
const btn = document.querySelector(".audio-btn");

function toggleAudio() {
    if (audio.paused) {
        audio.play();
        btn.textContent = "⏸ Pause";
    } else {
        audio.pause();
        btn.textContent = "▶ Play";
    }
}

audio.addEventListener("ended", () => {
    btn.textContent = "▶ Play";
});

// quiz func
let score = 0;

let answers = {
    1: { selected: null, correct: false },
    2: { selected: null, correct: false },
    3: { selected: null, correct: false }
};

const options =["a", "b", "c"];

const questions = {
    1: {
        text: "Why was Nessie upset?",
        options: [
            { text: "a. She was tired.", correct: false },
            { text: "b. She had to go home.", correct: false },
            { text: "c. She doesn’t like playing tag.", correct: true }
        ]
    },
    2: {
        text: "What did Nessie do to keep calm?",
        options: [
            { text: "a. She shouted.", correct: false },
            { text: "b. She counted to ten.", correct: true },
            { text: "c. She cried.", correct: false }
        ]
    },
    3: {
        text: "What did her friends do?",
        options: [
            { text: "a. They thanked her.", correct: true },
            { text: "b. They ignored her.", correct: false },
            { text: "c. They yelled at her.", correct: false }
        ]
    }
};

function openQuestion(num) {
    const modal = document.getElementById("quizModal");
    const container = document.getElementById("question-container");
    const feedback = document.getElementById("modal-feedback");
    feedback.textContent = ""; 

    const q = questions[num];
    let html = `<p>${q.text}</p>`;
    q.options.forEach((opt, i) => {
        const checked = answers[num].selected === i ? "checked" : "";
        html += `
            <label>
            <input type="radio" name="q${num}" value="${i}" ${checked}>
                ${opt.text}
            </label>
        `;
    });
    html += `<button onclick="checkAnswer(${num})">Submit</button>`;
    container.innerHTML = html;
    modal.style.display = "flex";
}

function closeModal() {
    document.getElementById("quizModal").style.display = "none";
}

function checkAnswer(num) {
    const selected = document.querySelector(`input[name="q${num}"]:checked`);
    const feedback = document.getElementById("modal-feedback");
    if (!selected) {
        feedback.textContent = "⚠️ Please select an answer!";
        feedback.style.color = "#333";
        return;
    }

    const choiceIndex = parseInt(selected.value);
    answers[num].selected = choiceIndex;
    const isCorrect = questions[num].options[choiceIndex].correct;
    if (isCorrect && !answers[num].correct) score++;
    else if (!isCorrect && answers[num].correct) score--;
        answers[num].correct = isCorrect;

    const btn = document.getElementById(`btn-q${num}`);
    btn.classList.remove("correct", "wrong", "unanswered");
    if (isCorrect) {
        btn.classList.add("correct");
        btn.textContent = `✅ (${options[choiceIndex]}) Correct!`;
        feedback.textContent = btn.textContent ;
        feedback.style.color = "green";
        closeModal();
        alert(btn.textContent );
    } else {
        btn.classList.add("wrong");
        btn.textContent = `❌ (${options[choiceIndex]}) Try Again!`;
        feedback.textContent = btn.textContent;
        feedback.style.color = "red";
        closeModal();
        alert(btn.textContent);
    }

    updateScore();
}

function updateScore() {
    document.getElementById("score").textContent = `Score: ${score} / 3`;
}
