let injectScript = async (file) => {
    console.log(`Injecting ${file}...`);
    let url = browser.runtime.getURL(file);
    let res = await fetch(url);
    let text = await res.text();

    // console.log(text);
    let script = document.createElement("script");
    script.textContent = text;
    (document.head).appendChild(script);
}

let injectScripts = async (fileArray) => {
    for (const file of fileArray) {
        await injectScript(file);
    }
}