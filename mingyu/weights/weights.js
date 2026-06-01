const ctx = document.getElementById("my_chart").getContext('2d');
const my_chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["1번","2번","3번","4번"],
        datasets: [{
            label: '데이터셋라벨',
            data: [7,12,9,4],
            backgroundColor: [
                '#AAAAAA',
                '#BBBBBB',
                '#CCCCCC',
                '#DDDDDD'
            ],
            borderColor: [
                '#AAAAAA',
                '#BBBBBB',
                '#CCCCCC',
                '#DDDDDD'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

async function load_data() {
    
    const response = await fetch("weight_data.json");

    const data = await response.json();
    console.log(data);

    // for (const record of data) {
    //     console.log(record.date + ' | ' + record.spot + ' | ' + Number(record.successes.red) + ` / ` + Number(record.tries.red));
    // }
    let i=1; // 홀수 행인지 아닌지 판별
    const tbody = document.querySelector("#record_tbody");
    for (const record of data) {
        const tr = document.createElement("tr");

        // 헤더 제외 짝수행일 때
        // 배경색 약간 진하게 해서 가시성 향상
        if (i++%2 === 0) { tr.className = "even_row"; }
        tr.innerHTML = `<td>${record.date}</td><td>${record.weight.toFixed(1)}</td>`; // toFixed() => String

        tbody.appendChild(tr);
    }

    return data;
}
