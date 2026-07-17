let streak_data = null;

function streak_data_valid() {
    return !!streak_data && Number.isInteger(streak_data.num) && typeof streak_data.head == "boolean";
}

function render() {
    let streak = document.createElement("div");
    streak.id = "streak";
    if (streak_data_valid()) {
        let streak_type = streak_data.head ? "Heads" : "Tails";
        streak.appendChild(document.createTextNode(`Current Streak: ${streak_data.num} ${streak_type}`));
    } else {
        streak.appendChild(document.createTextNode("No Current Streak"));
    }

    let flip_button = document.createElement("button");
    flip_button.type = "button";
    flip_button.appendChild(document.createTextNode("Flip"));
    flip_button.setAttribute("onclick", "do_flip()");

    document.getElementById('flip').replaceChildren(streak, flip_button);
}

function do_flip() {
    if (!streak_data_valid()) {
        streak_data = {
            num: 0,
            head: true,
        };
    }

    let head = Math.random() < 0.5;

    if (head == streak_data.head) {
        streak_data.num += 1;
    } else {
        streak_data.head = head;
        streak_data.num = 1;
    }

    save_streak();
    render();
}

function save_streak() {
    localStorage.setItem("flip_streak", JSON.stringify(streak_data));
}

function load_streak() {
    let temp_scores = null;
    try {
        temp_scores = JSON.parse(localStorage.getItem("flip_streak"));
    } finally {
        if (temp_scores) {
            streak_data = temp_scores;
        } else {
            console.log("failed to load from storage");
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    load_streak();
    render();
}, false);
