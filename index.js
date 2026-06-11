function resolution() {
    console.log(`${screen.width} * ${screen.height}`)
    document.getElementById("resolution").innerText = `해상도: ${screen.width} * ${screen.height}`;
}

function init() {
    resolution();
}