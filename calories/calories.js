function update() {
    let container = document.getElementById("calorie-tracker");

    let add_data = render_add_data();
    let data_log = render_data_log();

    container.replaceChildren(add_data, data_log);
}

function render_add_data() {
    let container = document.createElement("div");
    container.id = "add-data";

    let input = document.createElement("input");
    input.id = "new-val";

    let button = document.createElement("button");
    button.addEventListener ("click", add_new_val, false);
    button.appendChild(document.createTextNode("Add"));

    container.replaceChildren(input, button);

    return container;
}

function render_data_log() {
    let container = document.createElement("div");
    container.id = "data-log";

    let log_heading = document.createElement("h2");
    log_heading.appendChild(document.createTextNode("Log"));

    let calorie_data = JSON.parse(localStorage.getItem("calorie_data"));
    if (!calorie_data) {
        calorie_data = {};
    }

    let table = document.createElement("table");
    let colgroup = document.createElement("colgroup");
    let date_col = document.createElement("col");
    date_col.className = "date-col";
    let cal_col = document.createElement("col");
    cal_col.className = "cal-col";
    colgroup.replaceChildren(date_col, cal_col);
    table.appendChild(colgroup);
    for (let [date, cal_entries] of Object.entries(calorie_data)) {
        let cal_sum = cal_entries.reduce((a, b) => a + b, 0);
        let row = table.insertRow();
        let cell1 = row.insertCell();
        cell1.appendChild(document.createTextNode(date));
        let cell2 = row.insertCell();
        cell2.appendChild(document.createTextNode(cal_sum));
    }

    container.replaceChildren(log_heading, table);

    return container;
}

function add_new_val() {
    let new_val = Number.parseFloat(document.getElementById("new-val").value);

    let calorie_data = JSON.parse(localStorage.getItem("calorie_data"));
    if (!calorie_data) {
        calorie_data = {};
    }

    let today_key = new Date().toDateString();
    let today_val = calorie_data[today_key];
    if (!today_val) {
        today_val = [];
    }
    today_val.push(new_val);
    calorie_data[today_key] = today_val;

    localStorage.setItem("calorie_data", JSON.stringify(calorie_data));

    update();
}

document.addEventListener('DOMContentLoaded', function() {
    update();
}, false);
