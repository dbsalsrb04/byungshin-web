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
