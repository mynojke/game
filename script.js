const scenarios = [
    {
        question: "You find an unfamiliar device with two buttons. Which do you press?",
        options: ["Red", "Blue"],
        advice: 0
    },
    {
        question: "A path splits into two. Which direction do you go?",
        options: ["Left", "Right"],
        advice: 1
    },
    {
        question: "Two boxes sit on a table. Which do you open?",
        options: ["Wooden", "Metal"],
        advice: 0
    }
];
let index = 0;
let followed = 0;

function loadScenario() {
    const s = scenarios[index];
    document.getElementById('question').textContent = s.question;
    document.getElementById('advice').textContent =
        `AI suggests choosing: ${s.options[s.advice]}`;

    const container = document.getElementById('options');
    container.innerHTML = '';
    s.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.onclick = () => chooseOption(i);
        container.appendChild(btn);
    });
}

function chooseOption(choice) {
    const s = scenarios[index];
    if (choice === s.advice) {
        followed++;
    }
    document.getElementById('next').style.display = 'block';
    document.querySelectorAll('#options button').forEach(b => b.disabled = true);
}

document.getElementById('next').onclick = () => {
    index++;
    if (index < scenarios.length) {
        document.getElementById('next').style.display = 'none';
        loadScenario();
    } else {
        showResults();
    }
};

document.getElementById('restart').onclick = () => {
    index = 0;
    followed = 0;
    document.getElementById('results').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    loadScenario();
};

function showResults() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('summary').textContent =
        `You followed the AI ${followed} out of ${scenarios.length} times.`;
}

window.onload = loadScenario;
