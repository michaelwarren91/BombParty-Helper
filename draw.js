let wordCanvas = document.createElement("canvas");
wordCanvas.style = "position: absolute; left: 0; top: 2em; z-index: 1; width: 100%; height: calc(100% - 2em);";

let context = wordCanvas.getContext("2d", { alpha: true });


let draw = (sectionedWords) => {
    // const canvasRect = wordCanvas.getBoundingClientRect();
    const canvasWidth = wordCanvas.width;
    const canvasHeight = wordCanvas.height;

    // console.log("draw canvas width ehgith:", canvasWidth, canvasHeight);

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    let drawFrame = () => {
        context.save();
        context.globalAlpha = 0.2;
        context.fillStyle = "black";
        context.fillRect(0.01 * canvasWidth, 0.01 * canvasHeight, 0.2 * canvasWidth, 0.9 * canvasHeight);

        context.globalAlpha = 1;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#fff";
        context.font = "36px Vsans-serif";
        context.fillText("Word List", (0.21 / 2) * canvasWidth, 0.035 * canvasHeight);
        context.restore();
    };

    let drawWord = (wordInfo, position) => {
        context.save();

        context.textAlign = "left";
        context.fillStyle = "#FFF";
        context.textBaseline = "middle";
        context.font = "30px Vsans-serif";

        let x = 0.02 * canvasWidth;
        context.fillText(`${position + 1}. `, x, (2.5 * 0.035 + 0.035 * position) * canvasHeight);
        x += context.measureText(`${position + 1}. `).width;

        for (const section of wordInfo.sections) {
            let text = section.str;
            context.fillStyle = section.color;
            context.fillText(text, x, (2.5 * 0.035 + 0.035 * position) * canvasHeight);
            x += context.measureText(text).width;
        }

        context.restore();
    };

    drawFrame();

    sectionedWords.forEach((wordInfo, index) => {
        drawWord(wordInfo, index);
    });
}

let initCanvas = (width, height) => {
    wordCanvas.width = width;
    wordCanvas.height = height;

    let div = $(".canvasArea");
    div.appendChild(wordCanvas);
}