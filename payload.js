let init_bombparty = () => {
    console.log("Initiating bomb party helper...");

    let allBonusLetters = [];
    let remainingBonusLetters = [];
    let lastSubmittedWord = "";
    let usedWords = [];
    
    // called whenever you a game room
    socket.on("setup", data => {
        console.log("setup");
        allBonusLetters = data.milestone.dictionaryManifest.bonusAlphabet.split("");

        initCanvas(canvas.width, canvas.height);
        draw([]);
    });

    // called whenever it moves to the next player to guess a word
    socket.on("nextTurn", (playerId, letters, promptAge) => {
        console.log("nextTurn");
        if (playerId === selfPeerId) {
            console.log("My turn!");

            fetchWords(letters).then(words => {
                let freshWords = words.filter((wordInfo) => !usedWords.includes(wordInfo.word));
                let rankedWords = rankWords(freshWords, remainingBonusLetters);
                let sectionedWords = applyColors(rankedWords).slice(0, 20);

                draw(sectionedWords);
            });
        }
        else
            draw([]);
    });

    // seems to be called only at the very start of the game
    socket.on("setMilestone", ({currentPlayerPeerId, syllable, dictionaryManifest}, serverNow) => {
        console.log("setMilestone");

        usedWords = [];
        remainingBonusLetters = allBonusLetters;

        if (currentPlayerPeerId == selfPeerId) {
            console.log("Game starting with me!");
            fetchWords(syllable).then(words => {
                let freshWords = words.filter((wordInfo) => !usedWords.includes(wordInfo.word));
                let rankedWords = rankWords(freshWords, remainingBonusLetters);
                let sectionedWords = applyColors(rankedWords).slice(0, 20);

                draw(sectionedWords);
            });
        }
    });

    // called whenever a player guesses a correct word
    socket.on("correctWord", ({playerPeerId, bonusLetters}) => {
        console.log("correctWord");

        usedWords.push(lastSubmittedWord);

        if (playerPeerId == selfPeerId) {
            remainingBonusLetters = allBonusLetters.filter((letter) => !bonusLetters.includes(letter));
            //console.log("My remaining bonus letters are now:", remainingBonusLetters);
        }
    });

    socket.on("setPlayerWord", (playerPeerId, word) => lastSubmittedWord = word);

    draw([]);
};

window.addEventListener('message', event => {
    //console.log(event);

    if (event.data.name === "joinGame") {
        if (event.data.gameId === "bombparty")
            init_bombparty();
    }
});