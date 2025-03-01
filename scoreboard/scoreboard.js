let player_scores = {};

function update() {
    let table = document.createElement("TABLE");

    let colgroup = document.createElement("COLGROUP");
    let player_col = document.createElement("COL");
    player_col.className = "player_col";
    colgroup.appendChild(player_col);
    let score_col = document.createElement("COL");
    score_col.className = "score_col";
    colgroup.appendChild(score_col);
    let actions_col = document.createElement("COL");
    actions_col.className = "actions_col";
    colgroup.appendChild(actions_col);

    table.appendChild(colgroup);

    if (Object.keys(player_scores).length == 0) {
        let row = table.insertRow(-1);
        row.insertCell(0).innerHTML = "&nbsp;";
        row.insertCell(1).innerHTML = "&nbsp;";
        row.insertCell(2).innerHTML = "&nbsp;";
    }
    for (player in player_scores) {
        let row = table.insertRow(-1);
        row.insertCell(0).innerHTML = player;
        row.insertCell(1).innerHTML = player_scores[player];
        let actions_cell = row.insertCell(2);

        let actions_div = document.createElement("DIV");
        actions_div.className = "actions_cell";

        let del_button = document.createElement("BUTTON");
        del_button.type = "button";
        del_button.appendChild(document.createTextNode("🗑️"));
        del_button.setAttribute("onclick", `del_player("${player}")`);
        actions_div.appendChild(del_button);

        let set_button = document.createElement("BUTTON");
        set_button.type = "button";
        set_button.appendChild(document.createTextNode("="));
        set_button.setAttribute("onclick", `set_player("${player}")`);
        actions_div.appendChild(set_button);

        let minus1_button = document.createElement("BUTTON");
        minus1_button.type = "button";
        minus1_button.appendChild(document.createTextNode("-"));
        minus1_button.setAttribute("onclick", `adjust_player("${player}", -1)`);
        actions_div.appendChild(minus1_button);

        let plus1_button = document.createElement("BUTTON");
        plus1_button.type = "button";
        plus1_button.appendChild(document.createTextNode("+"));
        plus1_button.setAttribute("onclick", `adjust_player("${player}", 1)`);
        actions_div.appendChild(plus1_button);

        let diff_button = document.createElement("BUTTON");
        diff_button.type = "button";
        diff_button.appendChild(document.createTextNode("Δ"));
        diff_button.setAttribute("onclick", `diff_player("${player}")`);
        actions_div.appendChild(diff_button);

        actions_cell.appendChild(actions_div);
    }

    {
        let header = table.createTHead();
        let row = header.insertRow(-1);
        row.insertCell(0).innerHTML = "Player";
        row.insertCell(1).innerHTML = "Score";
        row.insertCell(2).innerHTML = "Actions";
    }

    document.getElementById('scoreboard').innerHTML = table.outerHTML;
}

function set_player(name) {
    if (!Object.hasOwn(player_scores, name)) {
        console.error(`"${name}" does not exist`);
        return;
    }

    let score_raw = prompt(`${name}'s New Score`);
    let score = parseInt(score_raw);
    if (isNaN(score)) {
        console.error(`"${score_raw}" is an invalid score`);
        return;
    }

    if (score != null) {
        player_scores[name] = score;
    }
    update()
}

function add_player() {
    let name = prompt("New Player Name");
    if (Object.hasOwn(player_scores, name)) {
        console.error(`"${name}" already exists`);
        return;
    }

    if (name != null) {
        player_scores[name] = 0;
    }
    update()
}

function del_player(name) {
    if (!Object.hasOwn(player_scores, name)) {
        console.error(`"${name}" does not exist`);
        return;
    }

    if (confirm(`This will delete "${name}".`)) {
        delete player_scores[name];
    }
    update()
}

function diff_player(name) {
    if (!Object.hasOwn(player_scores, name)) {
        console.error(`"${name}" does not exist`);
        return;
    }

    let score_raw = prompt(`Change to ${name}'s Score`);
    let score = parseInt(score_raw);
    if (isNaN(score)) {
        console.error(`"${score_raw}" is an invalid score difference`);
        return;
    }

    if (score != null) {
        player_scores[name] += score;
    }
    update()
}

function adjust_player(name, diff_raw) {
    if (!Object.hasOwn(player_scores, name)) {
        console.error(`"${name}" does not exist`);
        return;
    }

    let diff = parseInt(diff_raw);
    if (isNaN(diff)) {
        console.error(`"${diff_raw}" is an invalid score difference`);
        return;
    }

    player_scores[name] += diff;
    update()
}

function save_scores() {
    localStorage.setItem("saved_scores", JSON.stringify(player_scores));
}

function load_scores() {
    let temp_scores = null;
    try {
        temp_scores = JSON.parse(localStorage.getItem("saved_scores"));
    } finally {
        if (temp_scores) {
            player_scores = temp_scores;
        } else {
            console.log("failed to load from storage");
        }
        update();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    update();
}, false);
