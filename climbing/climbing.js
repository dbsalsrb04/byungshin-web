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
            tr.className = "not_the_climb"
        }

        tr.innerHTML = `
        <td class="date">${record.date}</td>
        <td class="spot">${record.spot}</td>
            
            <td class="success">${record.successes.black}</td>
            <td>${record.tries.black}</td>
            
            <td class="success">${record.successes.brown}</td>
            <td>${record.tries.brown}</td>
            
            <td class="success">${record.successes.gray}</td>
            <td>${record.tries.gray}</td>
            
            <td class="success">${record.successes.purple}</td>
            <td>${record.tries.purple}</td>
            
            <td class="success">${record.successes.pink}</td>
            <td>${record.tries.pink}</td>
            
            <td class="success">${record.successes.red}</td>
            <td>${record.tries.red}</td>
            
            <td class="success">${record.successes.blue}</td>
            <td>${record.tries.blue}</td>
            
            <td class="success">${record.successes.green}</td>
            <td>${record.tries.green}</td>
            
            <td class="success">${record.successes.orange}</td>
            <td>${record.tries.orange}</td>

            <td class="success">${record.successes.yellow}</td>
            <td>${record.tries.yellow}</td>

            <td class="success">${record.successes.white}</td>
            <td>${record.tries.white}</td>
        `;

        // tbody에 추가
        tbody.appendChild(tr);
    }

    return data;
}