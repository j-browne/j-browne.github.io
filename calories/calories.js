function update() {
    let container = document.getElementById("calorie-tracker");

    let add_data = render_add_data();
    let data_log = render_data_log();

    container.replaceChildren(add_data, data_log);
}

function render_add_data() {
    let container = document.createElement("form");
    container.id = "add-data";

    let input_name = document.createElement("input");
    input_name.id = "new-name";
    input_name.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("add-button").click();
        }
    });

    let input_val = document.createElement("input");
    input_val.id = "new-val";
    input_val.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("add-button").click();
        }
    });

    let button = document.createElement("button");
    button.id = "add-button";
    button.addEventListener ("click", add_new_data, false);
    button.appendChild(document.createTextNode("Add"));

    container.replaceChildren(input_name, input_val, button);

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
        let cal_sum = cal_entries.map((a) => a[1]).reduce((a, b) => a + b, 0);
        let row = table.insertRow();
        let cell1 = row.insertCell();
        cell1.appendChild(document.createTextNode(date));
        let cell2 = row.insertCell();
        cell2.appendChild(document.createTextNode(cal_sum));
    }

    container.replaceChildren(log_heading, table);

    return container;
}

function add_new_data() {
    let new_name = document.getElementById("new-name").value;
    let new_val = Number.parseFloat(document.getElementById("new-val").value);

    let calorie_data = JSON.parse(localStorage.getItem("calorie_data"));
    if (!calorie_data) {
        calorie_data = {};
    }

    let today_key = new Date().toDateString();
    let today_data = calorie_data[today_key];
    if (!today_data) {
        today_data = [];
    }
    today_data.push([new_name, new_val]);
    calorie_data[today_key] = today_data;

    localStorage.setItem("calorie_data", JSON.stringify(calorie_data));

    update();
}

document.addEventListener('DOMContentLoaded', function() {
    update();
}, false);
