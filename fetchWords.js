
let wordCache = new Map();

let fetchWords = async (combination) => {
    if (wordCache.has(combination))
        return wordCache.get(combination);

    let res = await fetch(`https://api.datamuse.com/words?sp=*${combination}*&max=100`);
    let json = await res.json();
    let words = Array.from(json).map((wordInfo) => {
        
        let start = wordInfo.word.indexOf(combination);
        let end = start + combination.length - 1;
        
        let combinationIndices = { start, end };
        
        return {
            word: wordInfo.word,
            combinationIndices
        };
    });

    wordCache.set(combination, words);

    return words;
}

let clearWordCache = () => {
    wordCache.clear();
}