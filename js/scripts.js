document.addEventListener('DOMContentLoaded', function () {
    const minutesEl = document.querySelector("#minutes");
    const secondsEl = document.querySelector("#seconds");
    const millisecondsEl = document.querySelector("#milliseconds");
    const startBtn = document.querySelector("#startBtn");
    const pauseBtn = document.querySelector("#pauseBtn");
    const resumeBtn = document.querySelector("#resumeBtn");
    const resetBtn = document.querySelector("#resetBtn");

    let interval;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let isPaused = false;

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resumeBtn.addEventListener("click", resumeTimer);
    resetBtn.addEventListener("click", resetTimer);

    function startTimer() {
        interval = setInterval(() => {
            if (!isPaused) {
                milliseconds += 10;

                if (milliseconds === 1000) {
                    seconds++;
                    milliseconds = 0;
                }

                if (seconds === 60) {
                    minutes++;
                    seconds = 0;
                }

                updateDisplay();
            }
        }, 10);

        // Oculta o botão Iniciar e exibe os botões Continuar e Resetar
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
        resumeBtn.style.display = 'none';
        resetBtn.style.display = 'inline-block';
    }

    function pauseTimer() {
        isPaused = true;
        toggleButtons(false);
    }

    function resumeTimer() {
        isPaused = false;
        toggleButtons(true);
    }

    function resetTimer() {
        clearInterval(interval);
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay();
        // Exibe o botão Iniciar e oculta os botões Continuar e Resetar
        startBtn.style.display = 'inline-block';
        pauseBtn.style.display = 'none';
        resumeBtn.style.display = 'inline-block';
        resetBtn.style.display = 'none';
    }

    function updateDisplay() {
        minutesEl.textContent = padNumber(minutes);
        secondsEl.textContent = padNumber(seconds);
        millisecondsEl.textContent = padNumber(milliseconds);
    }

    function padNumber(number) {
        return number.toString().padStart(2, '0');
    }

    function toggleButtons(running) {
        startBtn.disabled = running;
        pauseBtn.style.display = running ? 'inline-block' : 'none';
        resumeBtn.style.display = running ? 'none' : 'inline-block';
        resetBtn.disabled = running;
    }
});
