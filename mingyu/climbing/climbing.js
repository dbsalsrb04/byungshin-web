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

// climbing_data.json에서 가져온 데이터 저장할 전역변수. 그냥 이게 편할 듯.
let climbing_data; // 원본 데이터. 전역 변수로 선언되었으니 그냥 climbing_data로 쓰면 됨.

async function load_climbing_data() {
    document.getElementById("record_tbody").innerHTML = ``;
    const response = await fetch("climbing_data.json");

    // data 가져오기
    climbing_data = await response.json();
    // console.log(data);

    // tbody 가져오기
    const tbody = document.querySelector("#record_table tbody");

    // 데이터 개수만큼 반복
    // data: 0,1,2,3, ... => 0: {spot: 더클라임, date, ...}
    // record: {spot: '더클라임 양재', date: '2004-11-24', tries: {...}, successes: {...}}
    for (const record of climbing_data) {

        // tr 생성
        const tr = document.createElement("tr");
        tr.className = "date_record";
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

    return climbing_data;
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


// 차트 그리기
// x축은 방문한 모든 날짜.
/* === 설명 ===
1. successRateChart(태그 id, 클라이밍 데이터 원본)
2. [날짜(x축)|완등률|시도문제 수|완등문제 수] 정의
3. 더클라임 아닌 지역 제외, for문으로 success_rates 배열에 각 날짜마다
   limbing_data의 데이터를 가공하여 완등률만 push.
   tries_count와 successes_count는 이 for문에서 같이 시도문제수|완등문제수만 넣음
   따로 하면 더클라임 아닌 지역도 포함되어서, 날짜와 맞지 않는 경우 발생
4. for문을 사용하여 chart 호출 시 datasets에 넣을 값을 미리 만들어놓기
   chart_dataset 배열을 미리 정의하여 이 배열에 chart 호출 시 넣을 값과 동일하게 만듦.
   대신 tries_counts와 successes_counts도 같이 넣음. 얘네 2개 넣는다고 문제 안됨.
   이러면 나중에 차트 포인터(점)에 갖다댔을 때 실제 문제 수도 같이 볼 수 있게 할 수 있음.
5. chart 함수 호출. plugins: {tooltip: {... callbacks: { ... } ... } ... }
   위 callbacks 에서 드디어 tries_counts와 successes_counts를 사용.
   이로써 툴팁에서 실제 시도문제 수와 완등문제 수를 볼 수 있게 됨.

+ spots도 동일한 방법으로..

!!! 중요 !!!
모든 가공될 데이터는 "더클라임" 지역에 대해서만 넣어야 날짜와 맞게 들어감.
*/
// 최초 차트 그릴 때 호출되는 함수.
function successRateChart(canvas_id) {
    const dates = chartDates(climbing_data);
    const spots = chartSpots(climbing_data);

    const success_rates = successRates(climbing_data);
    
    const counts = problemCounts(climbing_data); // { tries_counts: {...}, successes_counts: {...} }

    const chart_dataset = [];

    // chart의 data 속성 중 datasets 속성에 넣을 값 미리 넣기
    for (const color in COLORS) {
        chart_dataset.push({ // 데이터 속성
            label: color, // 데이터 제목
            data: success_rates[color], // 데이터

            // dataset 안에 지점/완등/성공 문제 수도 같이 넣어놓기
            spots: spots,
            tries: counts.tries_counts[color],
            successes: counts.successes_counts[color],

            pointRadius: 3.5,
            pointHoverRadius: 7,
            backgroundColor: COLORS[color],
            borderColor: COLORS[color],
            // pointBackgroundColor: 'transparent', // 포인터 배경 없애기
            // pointBorderWidth: 3 // 포인터 테두리 굵기
            // borderWidth: 2.5
        });
    }

    const ctx = document.getElementById(canvas_id).getContext('2d');
    const my_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates, // x축 데이터
            datasets: chart_dataset // 데이터셋 미리 정의
        },
        options: {
            responsive: false, // 반응형(기본값 true) ?크기자동변경 등...
            maintainAspectRatio: false, // 크기 고정.
            hover: { // 그래프의 점에 커서 올려졌을 때 해당 난이도의 그래프가 반응.
                mode: "dataset",
                intersect: true
            },
            // 플러그인
            plugins: {
                // 툴팁
                tooltip: {
                    enabled: true, // 툴팁 활성화 (기본값 true)
                    // intersect: true, // ?
                    mode: 'index', // 툴팁 팝업에서 그 x축에 대한 모든 y축 정보.
                    backgroundColor: '#808080', // 툴팁 색상
                    padding: 10, // 툴팁 패딩
                    // 타이틀 폰트
                    titleFont: {
                        family: "consolas"
                    },
                    // 내용 폰트
                    bodyFont: {
                        family: "consolas"
                    },
                    callbacks: {
                        // 타이틀 텍스트 변경
                        /* === title 설명 ===
                            1. items로 해당 x축의 색깔(에 대한 데이터)이 들어옴.
                            2. 만약 그날 파랑&빨강 의 기록이 있었다면
                               items는 길이가 2인 배열{{파랑 데이터}, {빨강 데이터}} 임.
                            3. spots 배열은 {'양재', '성수', ... } 의 형태이기 때문에,
                               key가 아닌 인덱스가 반드시 필요.
                               items의 요소들은 전부 다 dataIndex를 갖고 있고,
                               그것이 같은 items 배열로 들어왔다면, 전부 같은 값임.
                               예를 들어, 위의 items에서, 파랑 데이터와 빨강 데이터 배열의
                               dataIndex: (같은 값) 일 것.
                            4. (3)을 이용하여 items[0].dataIndex로 미리 인덱스를 구함.
                               items[1] 로 해도 될테지만, items[0]은 항상 존재함이
                               보장되기 때문에 그냥 items[0]으로 함.
                               이렇게 해서 item = items[0] 으로 정의.
                            5. 어쨌든, 이렇게 구한 인덱스는 idx로 정의하고,
                               아래와 같이 return~
                        */
                        title: function(items) {
                            const item = items[0];
                            const idx = item.dataIndex;
                            return `${item.dataset.spots[idx]}\n${item.label}`;
                        },
                        // 레이블 텍스트 변경
                        label: function(ctx) {
                            // console.log(ctx);
                            const label = ctx.dataset.label.padEnd(6, ' ');
                            const rate  = `${ctx.raw}`.padStart(4, ' ');
                            return `${label}: ${rate}% (${ctx.dataset.successes[ctx.dataIndex]}/${ctx.dataset.tries[ctx.dataIndex]})`;
                        }
                    }
                },
                // 범례
                legend: {
                    display: true, // 범례 보이기
                    position: 'left', // 범례 위치
                    labels: {
                        font: {
                            size: 10,
                            weight: "bold"
                        },
                        boxWidth: 20, // 색상 네모 가로
                        boxHeight: 10, // 색상 네모 세로
                        padding: 10 // 색상 간 간격
                    }
                },
            },
            // Scales
            scales: { // x,y축 설정 관련
                x: { // x축
                    title: {
                        display: true,
                        text: "< 날짜 >",
                        font: {
                            size: 14,
                            weight: "bold"
                        }
                    },
                    // ticks: { display: false }, // x축 라벨 숨김
                    grid: { display: false } // x축 격자선(=세로선) 숨김
                },
                y: { // y축
                    title: { 
                        display: true,
                        text: "완등률(%)",
                        font: {
                            size: 16,
                            weight: "bold"
                        }
                    },
                    // min: 0, // y축 최솟값
                    beginAtZero: true, // y축이 0부터 시작하도록 설정
                    // grace: 5, // y축 최댓값이 데이터의 최댓값보다 약간 더 크게 보이도록 여유 공간 주기
                    // max: 100, // y축 최댓값
                    // border: { dash: [0,0] } // 점선
                }
            }
            // title: {
            //     display: true,
            //     text: "WEIGHTS GRAPH"
            // }
        }
    });
}

// 원본 데이터를 받아 클라이밍한 날짜만 return
function chartDates(climbing_data) {
    const dates = [];
    
    for (const record of climbing_data) {
        if (record.spot.includes("더클라임")) {
            dates.push(record.date);
        }
    }

    return dates;
}

// 원본 데이터를 받아 더클라임 지점만 return
function chartSpots(climbing_data) {
    const spots = [];
    for (const record of climbing_data) {
        if (record.spot.includes("더클라임")) {
            spots.push(record.spot);
        }
    }
    return spots;
}

// 원본 데이터를 받아 각 난이도별 완등률 return
function successRates(climbing_data) {
    const success_rates = {
         black: [],
         brown: [],
          gray: [],
        purple: [],
          pink: [],
           red: [],
          blue: [],
         green: [],
        orange: [],
        yellow: [],
         white: []
    };
    for (const record of climbing_data) {
        if (record.spot.includes("더클라임")) {
            for (const color in success_rates) {
                let rate = Number((record.successes[color] / record.tries[color] * 100).toFixed(1));
                success_rates[color].push(rate);
            }
        }
    }

    return success_rates;
}

// 원본 데이터를 받아 각 난이도별 시도/성공 문제 수 return
/* !!! 호출할 때 !!!
    counts = problemCount(climbing_data).tries_counts
    counts = problemCount(climbing_data).successes_counts
    이렇게 호출하면 됨. */
function problemCounts(climbing_data) {
    const tries_counts = {
        black: [],
        brown: [],
         gray: [],
       purple: [],
         pink: [],
          red: [],
         blue: [],
        green: [],
       orange: [],
       yellow: [],
        white: []
    };
    const successes_counts = {
        black: [],
        brown: [],
         gray: [],
       purple: [],
         pink: [],
          red: [],
         blue: [],
        green: [],
       orange: [],
       yellow: [],
        white: []
    };

    for (const record of climbing_data) {
        if (record.spot.includes("더클라임")) {
            for (const color in tries_counts) {
                tries_counts[color].push(record.tries[color]);
                successes_counts[color].push(record.successes[color]);
            }
        }
    }
    return { tries_counts, successes_counts };
}

// 현재 canvas의 차트 return
function getMyChart(canvas_id) {
    const canvas_element = document.getElementById(canvas_id);
    const chart = Chart.getChart(canvas_element);
    return chart;
}


/* ======= 차트 수정 ======= */
/* === sample ===
function getMyChart(canvas_id) {
    const canvas_element = document.getElementById(canvas_id);
    const gotChart = Chart.getChart(canvas_element);
    console.log(gotChart);
    console.log(gotChart.data);
    console.log(gotChart.data.datasets[0].data);
    console.log(gotChart.data.labels);
    
    gotChart.data.datasets[0].data = [Math.random()*15, Math.random()*15, Math.random()*15, Math.random()*15];
    gotChart.update();
    }
*/

// 1. canvas의 id를 받아 chart를 구함.
// 2. 원본 데이터를 불러와서 이 함수 내에서 가공할 지,
//    아니면 목적에 맞게 가공하는 함수를 따로따로 만들어서 이 함수에 넘겨줄 지..
//    그럴 필요 없는 게, 어차피 받아온 chart에 지금 chart의 정보가 들어있으니 괜찮을 듯.
// 3. ...
// 4. 그냥 이 함수는 labels, datasets만 파라미터로 받아서 수정하고, 가공은 다른 함수에서 해오는 걸로
// 4.1. 근데 문제가 있다. chart의 labels, datasets는 다 준비됐는데, chart의 options를 어떻게 해야 할까..
// 4.2. 그냥 editChartTo 이런 식으로 원하는 통계의 형태에 따라 함수를 만드는 게 좋을 듯. ex) editChartToSuccessRate 등등...
// 4.3. 추가로, chart_dataset은 함수로 만들지 말고, 그냥 edit 함수 내에서 처리하는 게 나을 듯. 파라미터가 너무 많아지게 되기 때문에
// ㄴ 고민의 흔적... 대견하다.

// !!! 앞으로 다른 통계로 수정하는 함수 만들 때도 이 함수를 템플릿 삼아 만들면 됨
// ex) editChartToMINGYU(canvas_id) {...} !!!
// 전체 기간 동안의 완등률 차트로 수정하는 함수
function editChartToSuccessRate(canvas_id) {
    const chart = getMyChart(canvas_id);

    const dates = chartDates(climbing_data);
    const spots = chartSpots(climbing_data);

    const success_rates = successRates(climbing_data);
    
    const counts = problemCounts(climbing_data); // { tries_counts: {...}, successes_counts: {...} }

    const chart_dataset = [];

    for (const color in COLORS) {
        chart_dataset.push({
            label: color, // 데이터 제목
            data: success_rates[color], // 데이터

            // dataset 안에 지점/완등/성공 문제 수도 같이 넣어놓기
            spots: spots,
            tries: counts.tries_counts[color],
            successes: counts.successes_counts[color],

            pointRadius: 3.5,
            pointHoverRadius: 7,
            backgroundColor: COLORS[color],
            borderColor: COLORS[color],
            // pointBackgroundColor: 'transparent', // 포인터 배경 없애기
            // pointBorderWidth: 3 // 포인터 테두리 굵기
            // borderWidth: 2.5
        });
    }
    chart.data.datasets = chart_dataset;
    chart.data.labels = dates;
    chart.update();
}

// 특정 지점에 대한 전체 기간 완등률 차트로 수정하는 함수 (사실 editChartToSuccessRate랑 거의 동일, filtered_data만 다름.)
function editChartToSuccessRateBySpot(canvas_id, spot) {
    const chart = getMyChart(canvas_id);
    
    // climbing_data에서 spot에 해당하는 날짜와 데이터만 필터링
    const filtered_data = climbing_data.filter(record => record.spot === spot);

    // 만약 배열이 비어있으면 차트 업데이트하지 않고 alert 띄우고 함수 종료
    if (filtered_data.length === 0) {
        alert(`${spot}은(는) 간 적이 없어요!`);
        return;
    }

    const dates = chartDates(filtered_data);
    const spots = chartSpots(filtered_data);
    const success_rates = successRates(filtered_data);

    const counts = problemCounts(filtered_data); // { tries_counts: {...}, successes_counts: {...} }

    const chart_dataset = [];

    // console.log(dates);
    // console.log(spots);
    // console.log(success_rates);

    for (const color in COLORS) {
        chart_dataset.push({
            label: color, // 데이터 제목
            data: success_rates[color], // 데이터

            // dataset 안에 지점/완등/성공 문제 수도 같이 넣어놓기
            spots: spots, // 지점
            tries: counts.tries_counts[color], // 시도 문제 수
            successes: counts.successes_counts[color], // 완등 문제 수

            pointRadius: 3.5,
            pointHoverRadius: 7,
            backgroundColor: COLORS[color],
            borderColor: COLORS[color],
            // pointBackgroundColor: 'transparent', // 포인터 배경 없애기
            // pointBorderWidth: 3 // 포인터 테두리 굵기
            // borderWidth: 2.5
        });
    }
    chart.data.datasets = chart_dataset;
    chart.data.labels = dates;
    chart.update();
}


// climbing.html에서 body onload="init()" => 페이지 로드되면 init 함수 실행됨.
async function init() {
    await load_climbing_data();
    apply_saved_columns();
    successRateChart("success-rate-chart");
}