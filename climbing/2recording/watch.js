let start = null;
let timer = null;

function update_time() {

    let elapsed = Date.now() - start; // ms 단위
    let total_second = ~~(elapsed / 1000); // 지난 시간(초)
    
    let hour = ~~(total_second / 3600); // hour
    let minute = ~~((total_second % 3600) / 60); // minute
    let second = total_second % 60; // second

    hour = String(hour).padStart(2, "0");
    minute = String(minute).padStart(2, "0");
    second = String(second).padStart(2, "0");
    
    document.getElementById("time").innerText = `${hour}:${minute}:${second}`;
}

function start_climbing() {
    if (timer !== null) {
        clearInterval(timer);
    }
    document.getElementById("start_button").style.display = "none";

    start = Date.now();
    update_time(); // 즉시 한 번 실행
    timer = setInterval(update_time, 1000);
}