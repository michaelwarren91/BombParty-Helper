let applyColors = (wordList) => {
    let combinationColor = "#00FF3F";
    let bonusLetterColor = "#00bfff";
    let defaultColor = "#FFF";

    let sectionedWords = wordList.map((wordInfo) => {
        let sections = [];
        let currentSection = null;
        let word = wordInfo.word;

        word.split("").forEach((letter, index) => {
            if (index >= wordInfo.combinationIndices.start && index <= wordInfo.combinationIndices.end) {
                if (currentSection === null) {
                    currentSection = {
                        color: combinationColor,
                        start: index,
                    };
                }
                else if (currentSection.color !== combinationColor) {
                    currentSection.end = index - 1;
                    sections.push({
                        color: currentSection.color,
                        str: word.substr(currentSection.start, index - currentSection.start)
                    });

                    currentSection = {
                        color: combinationColor,
                        start: index,
                    };
                }
            }
            else if (wordInfo.bonusLetterIndices.includes(index)) {
                if (currentSection === null) {
                    currentSection = {
                        color: bonusLetterColor,
                        start: index,
                    }
                }
                else if (currentSection.color !== bonusLetterColor) {
                    currentSection.end = index - 1;
                    sections.push({
                        color: currentSection.color,
                        str: word.substr(currentSection.start, index - currentSection.start)
                    });

                    currentSection = {
                        color: bonusLetterColor,
                        start: index,
                    };
                }
            }
            else {
                if (currentSection === null) {
                    currentSection = {
                        color: defaultColor,
                        start: index,
                    }
                }
                else if (currentSection.color !== defaultColor) {
                    currentSection.end = index - 1;
                    sections.push({
                        color: currentSection.color,
                        str: word.substr(currentSection.start, index - currentSection.start)
                    });

                    currentSection = {
                        color: defaultColor,
                        start: index,
                    };
                }
            }
        });

        // finish the currrent section
        currentSection.end = word.length;
        sections.push({
            color: currentSection.color,
            str: word.substr(currentSection.start, currentSection.end - currentSection.start)
        });

        return { word, sections };
    })

    return sectionedWords;
}