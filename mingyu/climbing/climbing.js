const COLORS = {
    black: "#000000",
    brown: "#A52A2A",
    gray: "#808080",
    purple: "#800080",
    pink: "#FF00FF",
    red: "#FF0000",
    blue: "#0000FF",
    green: "#00FF00",
    orange: "#FF8000",
    yellow: "#FFFF00",
    white: "#FFFFFF"
}

async function load_climbing_data() {
    document.getElementById("record_tbody").innerHTML = ``;
    const response = await fetch("climbing_data.json");

    // data 가져오기
    const data = await response.json();
    console.log(data);

    // tbody 가져오기
    const tbody = document.querySelector("#record_table tbody");

    // 데이터 개수만큼 반복
    // data: 0,1,2,3, ... => 0: {spot: 더클라임, date, ...}
    // record: {spot: '더클라임 양재', date: '2004-11-24', tries: {...}, successes: {...}}
    for (const record of data) {

        // tr 생성
        const tr = document.createElement("tr");
        if (record.spot.includes("더클라임") == false) {
            tr.className = "not_theclimb"
        }

        tr.innerHTML = `
        <td class="date">${record.date}</td>
        <td class="spot">${record.spot}</td>
            
            <td class="black success">${record.successes.black}</td>
            <td class="black">${record.tries.black}</td>
            
            <td class="brown success">${record.successes.brown}</td>
            <td class="brown">${record.tries.brown}</td>
            
            <td class="gray success">${record.successes.gray}</td>
            <td class="gray">${record.tries.gray}</td>
            
            <td class="purple success">${record.successes.purple}</td>
            <td class="purple">${record.tries.purple}</td>
            
            <td class="pink success">${record.successes.pink}</td>
            <td class="pink">${record.tries.pink}</td>
            
            <td class="red success">${record.successes.red}</td>
            <td class="red">${record.tries.red}</td>
            
            <td class="blue success">${record.successes.blue}</td>
            <td class="blue">${record.tries.blue}</td>
            
            <td class="green success">${record.successes.green}</td>
            <td class="green">${record.tries.green}</td>
            
            <td class="orange success">${record.successes.orange}</td>
            <td class="orange">${record.tries.orange}</td>

            <td class="yellow success">${record.successes.yellow}</td>
            <td class="yellow">${record.tries.yellow}</td>

            <td class="white success">${record.successes.white}</td>
            <td class="white">${record.tries.white}</td>
        `;

        // tbody에 추가
        tbody.appendChild(tr);
    }

    return data;
}


////////////////////////////////////////////////////////////////////////////////////////////////////
// 난이도 열 숨기기/보이기 버튼
// 버튼 누르면 해당 난이도 열 숨기기 또는 보이기
// 현 상태(보임/숨김) 따라서 버튼 텍스트 달라짐
function display_column(color) {
    const column =  document.querySelectorAll(`.${color}`);
    const display_button = document.getElementById(`${color}_display_button`);
    
    // 현재 누른 난이도 열이 숨김인지 보이기인지
    const is_hidden = getComputedStyle(column[0]).display == "none";

    // 난이도 열에 대해 숨길지 말지
    column.forEach(function(cell) {
        if (is_hidden) { cell.style.display = ""; } // 숨김되어 있었다면 다시 보이기
        else { cell.style.display = "none";} // 보이기였다면 다시 숨기기
    })

    // 숨김/보이기 버튼 텍스트
    if (is_hidden) { // 원래 숨기기였는데 눌러서 바꾼 후 상태라서 "숨기기", false
        display_button.innerText = "숨기기";
        localStorage.setItem(`${color}_hidden`, "false")
    }
    else { // 원래 보이기였는데 눌러서 바꾼 후 상태라서 "보이기", true
        display_button.innerText = "보이기";
        localStorage.setItem(`${color}_hidden`, "true")
    }
}

// 이전 방문 시 저장되었던 column 숨기기 다시 반영
function apply_saved_columns() {
    const colors = [
        "black",
        "brown",
        "gray",
        "purple",
        "pink",
        "red",
        "blue",
        "green",
        "orange",
        "yellow",
        "white"];

    colors.forEach(function(color) {
        const hidden = localStorage.getItem(`${color}_hidden`);

        const column = document.querySelectorAll(`.${color}`);

        const display_button = document.getElementById(`${color}_display_button`);

        // 숨기기였다면 숨김처리
        // 반대의 경우는.. 사실 할 필요 없지만 가독성을 위해 추가
        if (hidden === "true") { 
            column.forEach(function(cell) {
                cell.style.display = "none";
            });
            display_button.innerText = "보이기";
        }
        else {
            display_button.innerText = "숨기기";
        }
    });
}

// climbing.html 의
// <body onload="init()">
// 에서 처음 실행되는 함수가 하나가 아니기 때문에
// init() 함수로 통합
async function init() {
    await load_climbing_data();
    apply_saved_columns();
}