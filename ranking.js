let rankWords = (words, bonusLetters) => {
    let rankings = words.map((wordInfo) => {
        let bonusLetterIndices = [];
        let encounteredLetters = new Map();

        let giveScore = (word, bonusLetters) => {
            let score = 0;

            for (const letter of bonusLetters) {
                // console.log("testing:", letter);
                word.split("").forEach((wordLetter, index) => {
                    if (wordLetter === letter) {
                        bonusLetterIndices.push(index);
    
                        if (!encounteredLetters.has(letter)) {
                            score++;    
                            encounteredLetters.set(letter, true);
                        }
                    }
                });
            }

            return score;
        }

        let score = giveScore(wordInfo.word, bonusLetters)

        return { wordInfo, score, bonusLetterIndices };
    });

    rankings.sort((a, b) => b.score > a.score);
    console.log("rankings:", rankings);

    return rankings.map((rank) => {
        return {
            word: rank.wordInfo.word,
            combinationIndices: rank.wordInfo.combinationIndices,
            bonusLetterIndices: rank.bonusLetterIndices
        };
    });
}