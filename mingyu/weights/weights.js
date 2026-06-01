let dates = [];
let weights = [];

// 차트 그리기
// can
function chartCtx(canvas_id, x_data, y_data) {
    const ctx = document.getElementById(canvas_id).getContext('2d');
    const my_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates, // x축 데이터
            datasets: [{ // 데이터 속성
                label: '몸무게', // 데이터 제목
                data: weights, // 데이터
                pointRadius: 5,
                pointHoverRadius: 10,
                backgroundColor: [ "#CCCCCC" ],
                borderColor: [ "#000000" ],
                // borderWidth: 1
                }
            ]
        },
        options: {
            responsive: false, // 반응형(기본값 true) ?크기자동변경 등...
            maintainAspectRatio: false, // 크기 고정.
            plugins: {
                // tooltip: { // 툴팁
                //     enabled: true, // 튤팁 활성화 (기본값 true)
                //     backgroundColor: '#FF0000', // 툴팁 색상
                //     padding: 10 // 툴팁 패딩
                // },
                legend: { // 범례
                    display: false, // 범례 보이기
                    position: 'bottom' // 범례 위치
                }
            },
            scales: { // x,y축 설정 관련
                x: { // x축
                    grid: { display: true } // x축 격자선(=세로선) 숨김
                },
                y: {
                    min: 61, // y축 최솟값
                    max: 64, // y축 최댓값
                    border: { dash: [0,0] } // 점선
                }
            },
            // title: {
            //     display: true,
            //     text: "WEIGHTS GRAPH"
            // }
        }
    });
}

// 몸무게 데이터 불러오기
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
        tr.innerHTML = `<td>${record.date}</td><td>${Number(record.weight).toFixed(1)}</td>`; // toFixed() => String

        tbody.appendChild(tr);
    }

    return data;
}

async function init() {
    data = await load_data();
    
    for (const record of data) {
        dates.push(record.date);
        weights.push(record.weight);
    }

    chartCtx("weight_chart", dates, weights);
}