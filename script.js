window.addEventListener('load', function() { //регистрирует определённый обработчик события


    let countUser = document.querySelector('.count-user'),
    countComp = document.querySelector('.count-comp'),
    userField = document.querySelector('.user-field'),
    compField = document.querySelector('.comp-field'),
    sound = document.querySelector('.sound'),
    play = document.querySelector('.play'),
    fields = document.querySelectorAll('.field'),
    userStep, compStep, countU = 0, countC = 0, blocked = false;


    function choiceUser(e) {
        if(blocked) return;
        let target = e.target;
        if(target.classList.contains('field')) {
            userStep = target.dataset.field;
            fields.forEach(item => item.classList.remove('active', 'error')) //выполняет указанную функцию один раз для каждого элемента в массиве
            target.classList.add('active');
            choiceComp();
        }
    }
    
    function choiceComp() {
        blocked = true;
        let rand = Math.floor(Math.random() * 3)
        compField.classList.add('blink')
        let compFields = compField.querySelectorAll('.field')

        setTimeout(() => { //чтобы бесконечно не крутился как юла
            compField.classList.remove('blink')
            compStep = compFields[rand].dataset.field;
            compFields[rand].classList.add('active');
            winner();
        },3000);
    }

    function winner(){
        blocked = false;

        let comb = userStep + compStep;
        
        switch (comb) { //представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами.
            case 'rr':
            case 'ss':
            case 'pp':
                textContent = 'Draw';
                sound.setAttribute('src', 'audio/draw.mp3');
                sound.play();
                break;

            case 'rs':
            case 'sp':
            case 'pr':
                textContent = 'Win';
                sound.setAttribute('src', 'audio/win.mp3');
                sound.play();
                countU++;
                countUser.textContent = countU;
                compField.querySelector('[data-field='+compStep+']').classList.add('error');
                break;

            case 'sr':
            case 'ps':
            case 'rp':
                textContent = 'Lose';
                sound.setAttribute('src', 'audio/lose.mp3');
                sound.play();
                countC++;
                countComp.textContent = countC;
                userField.querySelector('[data-field='+userStep+']').classList.add('error');
                break;
        }
    }
    
    function playGame() {
        countU = countC = 0;
        textContent = 'Replay';
        countUser.textContent = 0
        countComp.textContent = 0
        fields.forEach(item => item.classList.remove('active', 'error'))
    }
    play.addEventListener('click', playGame);
    userField.addEventListener('click', choiceUser)
})