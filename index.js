document.querySelectorAll(".spinning-mingyu").forEach(img => {
    img.addEventListener("click", function() {
        this.classList.add("dead");
        // animationend: CSS 애니메이션 끝났을 때 발생하는 이벤트
        this.addEventListener("animationend", () => {
            this.parentElement.remove();
        }, { once: true })
    });
});

function resolution() {
    console.log(`${screen.width} * ${screen.height}`)
    document.getElementById("resolution").innerText = `해상도: ${screen.width} * ${screen.height}`;
}

function init() {
    resolution();
}