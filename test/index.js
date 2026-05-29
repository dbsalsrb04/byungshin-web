let data = [];
let flat_records = [];

async function load_data() {
    
    const response = await fetch("data.json");

    data = await response.json();
    console.log(data);

    // for (const record of data) {
    //     console.log(record.date + ' | ' + record.spot + ' | ' + Number(record.successes.red) + ` / ` + Number(record.tries.red));
    // }

    return data;
}

// 데이터 단순화
// 하루의 데이터는 각 난이도(색)별로 11개로 쪼개짐
// Result[n] => [ {date:"..", spot:"..", color:"..", success: 1, tries: 1}, {...}, ... ]
function flatten_records(records) {
    const result = [];
    
    for (const record of records) { // record: 하루 기록
        for (const color in record.successes) { // 기록 중 난이도 하나
            // if (!record.spot.includes("더클라임")){ break; }
            result.push({
                date: record.date, // 날짜
                spot: record.spot, // 지점
                color: color, // 난이도
                success: record.successes[color], // 해당 난이도 성공 문제 수
                tries: record.tries[color] // 해당 난이도 총 시도 문제 수
            });
        }
    }

    return result;
}

////////////////////////////////////////////////////////////
///////////////////////// Examples /////////////////////////

// 1. 특정 색 난이도만 (시도 문제가 0개인 날은 제외)
function show_red_records() {
    const div1 = document.getElementById("div1");
    div1.innerHTML = "";

    // 평탄화된 데이터
    console.log(flat_records);
    
    // 평탄화된 데이터에서 색깔="빨강" 그리고 시도횟수가 0인 날짜는 제외한 레코드들만
    const red_record = flat_records.filter(record => (record.color === "red" && record.tries > 0));
    // 빨강 난이도만 모인 데이터
    console.log(red_record);

    for (const record of red_record) {
        const tmp_tag = document.createElement("p");
        tmp_tag.innerHTML = `${record.date} | ${record.spot} | <b>${record.success} / ${record.tries}</b>`;
        div1.appendChild(tmp_tag);
    }
}

// 2. 특정 색 난이도의 날짜별 완등률
function show_red_success_rates() {
    const div1 = document.getElementById("div1");
    div1.innerHTML = "";
    
    console.log(flat_records);

    const red_record = flat_records.filter(record => (record.color === "red" && record.tries > 0));
    console.log(red_record);

    for (const record of red_record) {
        const tmp_tag = document.createElement("p"); // 태그 생성
        rate = (record.success / record.tries * 100).toFixed(1); // 완등률 계산
        tmp_tag.innerHTML = `${record.date} | ${record.spot} | `;
        tmp_tag.innerHTML += `${record.success} / `.padStart(5, `\u00A0`);
        tmp_tag.innerHTML += `${record.tries} | `.padStart(5, `\u00A0`);
        tmp_tag.innerHTML += `<b>${rate}%</b>`;
        div1.appendChild(tmp_tag);
    }
}

// 3. 특정 색 난이도의 TOTAL 완등/시도 문제 수
function show_red_total() {
    const div1 = document.getElementById("div1");
    div1.innerHTML = "";
    
    console.log(flat_records);

    const red_record = flat_records.filter(record => (record.color === "red" && record.tries > 0));
    console.log(red_record);

    let total_red_tries = 0;
    let total_red_success = 0;
    for (const record of red_record) {
        total_red_tries += record.tries;
        total_red_success += record.success;
    }
    const tmp_tag = document.createElement("p"); // 태그 생성
    tmp_tag.innerHTML = `시도한 문제 수: <b>${total_red_tries}</b><br>성공한 문제 수: <b>${total_red_success}</b>`;
    div1.appendChild(tmp_tag);
}

// 4. 특정 지점만
// * color는 여기선 `red`로 고정
function show_only_theclimb_yangjae(color) {
    const div1 = document.getElementById("div1");
    div1.innerHTML = "";
    
    console.log(flat_records);

    const theclimb_yangjae_record = flat_records.filter(
        record =>(
            record.spot === "더클라임 양재" &&
            record.color === "red" &&
            record.tries > 0
        )
    );
    
    const cnt_tag = document.createElement("p")
    cnt_tag.innerHTML = `총 방문 횟수: <b>${theclimb_yangjae_record.length}회</b>`;
    div1.appendChild(cnt_tag);
    for (const record of theclimb_yangjae_record) {
        const tmp_tag = document.createElement("p"); // 태그 생성
        tmp_tag.innerHTML = `${record.date} | ${record.spot} | <b>${record.success} / ${record.tries}</b>`;
        div1.appendChild(tmp_tag);
    }

}


async function init(){
    await load_data();
    flat_records = flatten_records(data);
}