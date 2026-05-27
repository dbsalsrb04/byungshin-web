var black_try = 0;
var brown_try = 0;
var gray_try = 0;
var purple_try = 0;
var pink_try = 0;
var red_try = 0;
var blue_try = 0;
var green_try = 0;
var orange_try = 0;
var yellow_try = 0;
var white_try = 0;

var black_success = 0;
var brown_success = 0;
var gray_success = 0;
var purple_success = 0;
var pink_success = 0;
var red_success = 0;
var blue_success = 0;
var green_success = 0;
var orange_success = 0;
var yellow_success = 0;
var white_success = 0;

// 검정 시도 개수
function increase_black_try(){
    black_try++;
    document.getElementById("black_try").innerText = black_try;
}
function decrease_black_try(){
    if (black_try == 0 || black_try <= black_success) {
        return;
    }
    black_try--;
    document.getElementById("black_try").innerText = black_try;
}
// 검정 시도문제 중 성공 개수
function increase_black_success(){
    if (black_try <= black_success) {
        return;
    }
    black_success++;
    document.getElementById("black_success").innerText = black_success;
}
function decrease_black_success(){
    if (black_success == 0) {
        return;
    }
    black_success--;
    document.getElementById("black_success").innerText = black_success;
}


// 갈색
function increase_brown_try(){
    brown_try++;
    document.getElementById("brown_try").innerText = brown_try;
}
function decrease_brown_try(){
    if (brown_try == 0 || brown_try <= brown_success) {
        return;
    }
    brown_try--;
    document.getElementById("brown_try").innerText = brown_try;
}
// 갈색 시도문제 중 성공 개수
function increase_brown_success(){
    if (brown_try <= brown_success) {
        return;
    }
    brown_success++;
    document.getElementById("brown_success").innerText = brown_success;
}
function decrease_brown_success(){
    if (brown_success == 0 || brown_try <= brown_success) {
        return;
    }
    brown_success--;
    document.getElementById("brown_success").innerText = brown_success;
}


// 회색
function increase_gray_try(){
    gray_try++;
    document.getElementById("gray_try").innerText = gray_try;
}
function decrease_gray_try(){
    if (gray_try == 0 || gray_try <= gray_success) {
        return;
    }
    gray_try--;
    document.getElementById("gray_try").innerText = gray_try;
}
// 회색 시도문제 중 성공 개수
function increase_gray_success(){
    if (gray_try <= gray_success) {
        return;
    }
    gray_success++;
    document.getElementById("gray_success").innerText = gray_success;
}
function decrease_gray_success(){
    if (gray_success == 0) {
        return;
    }
    gray_success--;
    document.getElementById("gray_success").innerText = gray_success;
}


// 보라
function increase_purple_try(){
    purple_try++;
    document.getElementById("purple_try").innerText = purple_try;
}
function decrease_purple_try(){
    if (purple_try == 0 || purple_try <= purple_success) {
        return;
    }
    purple_try--;
    document.getElementById("purple_try").innerText = purple_try;
}
// 보라 시도문제 중 성공 개수
function increase_purple_success(){
    if (purple_try <= purple_success) {
        return;
    }
    purple_success++;
    document.getElementById("purple_success").innerText = purple_success;
}
function decrease_purple_success(){
    if (purple_success == 0) {
        return;
    }
    purple_success--;
    document.getElementById("purple_success").innerText = purple_success;
}


// 핑크
function increase_pink_try(){
    pink_try++;
    document.getElementById("pink_try").innerText = pink_try;
}
function decrease_pink_try(){
    if (pink_try == 0 || pink_try <= pink_success) {
        return;
    }
    pink_try--;
    document.getElementById("pink_try").innerText = pink_try;
}
// 핑크 시도문제 중 성공 개수
function increase_pink_success(){
    if (pink_try <= pink_success) {
        return;
    }
    pink_success++;
    document.getElementById("pink_success").innerText = pink_success;
}
function decrease_pink_success(){
    if (pink_success == 0) {
        return;
    }
    pink_success--;
    document.getElementById("pink_success").innerText = pink_success;
}


// 빨강
function increase_red_try(){
    red_try++;
    document.getElementById("red_try").innerText = red_try;
}
function decrease_red_try(){
    if (red_try == 0 || red_try <= red_success) {
        return;
    }
    red_try--;
    document.getElementById("red_try").innerText = red_try;
}
// 빨강 시도문제 중 성공 개수
function increase_red_success(){
    if (red_try <= red_success) {
        return;
    }
    red_success++;
    document.getElementById("red_success").innerText = red_success;
}
function decrease_red_success(){
    if (red_success == 0) {
        return;
    }
    red_success--;
    document.getElementById("red_success").innerText = red_success;
}


// 파랑
function increase_blue_try(){
    blue_try++;
    document.getElementById("blue_try").innerText = blue_try;
}
function decrease_blue_try(){
    if (blue_try == 0 || blue_try <= blue_success) {
        return;
    }
    blue_try--;
    document.getElementById("blue_try").innerText = blue_try;
}
// 파랑 시도문제 중 성공 개수
function increase_blue_success(){
    if (blue_try <= blue_success) {
        return;
    }
    blue_success++;
    document.getElementById("blue_success").innerText = blue_success;
}
function decrease_blue_success(){
    if (blue_success == 0) {
        return;
    }
    blue_success--;
    document.getElementById("blue_success").innerText = blue_success;
}


// 초록
function increase_green_try(){
    green_try++;
    document.getElementById("green_try").innerText = green_try;
}
function decrease_green_try(){
    if (green_try == 0 || green_try <= green_success) {
        return;
    }
    green_try--;
    document.getElementById("green_try").innerText = green_try;
}
// 초록 시도문제 중 성공 개수
function increase_green_success(){
    if (green_try <= green_success) {
        return;
    }
    green_success++;
    document.getElementById("green_success").innerText = green_success;
}
function decrease_green_success(){
    if (green_success == 0) {
        return;
    }
    green_success--;
    document.getElementById("green_success").innerText = green_success;
}


// 주황
function increase_orange_try(){
    orange_try++;
    document.getElementById("orange_try").innerText = orange_try;
}
function decrease_orange_try(){
    if (orange_try == 0 || orange_try <= orange_success) {
        return;
    }
    orange_try--;
    document.getElementById("orange_try").innerText = orange_try;
}
// 주황 시도문제 중 성공 개수
function increase_orange_success(){
    if (orange_try <= orange_success) {
        return;
    }
    orange_success++;
    document.getElementById("orange_success").innerText = orange_success;
}
function decrease_orange_success(){
    if (orange_success == 0) {
        return;
    }
    orange_success--;
    document.getElementById("orange_success").innerText = orange_success;
}


// 노랑
function increase_yellow_try(){
    yellow_try++;
    document.getElementById("yellow_try").innerText = yellow_try;
}
function decrease_yellow_try(){
    if (yellow_try == 0 || yellow_try <= yellow_success) {
        return;
    }
    yellow_try--;
    document.getElementById("yellow_try").innerText = yellow_try;
}
// 노랑 시도문제 중 성공 개수
function increase_yellow_success(){
    if (yellow_try <= yellow_success) {
        return;
    }
    yellow_success++;
    document.getElementById("yellow_success").innerText = yellow_success;
}
function decrease_yellow_success(){
    if (yellow_success == 0) {
        return;
    }
    yellow_success--;
    document.getElementById("yellow_success").innerText = yellow_success;
}


// 하양
function increase_white_try(){
    white_try++;
    document.getElementById("white_try").innerText = white_try;
}
function decrease_white_try(){
    if (white_try == 0 || white_try <= white_success) {
        return;
    }
    white_try--;
    document.getElementById("white_try").innerText = white_try;
}
// 하양 시도문제 중 성공 개수
function increase_white_success(){
    if (white_try <= white_success) {
        return;
    }
    white_success++;
    document.getElementById("white_success").innerText = white_success;
}
function decrease_white_success(){
    if (white_success == 0) {
        return;
    }
    white_success--;
    document.getElementById("white_success").innerText = white_success;
}