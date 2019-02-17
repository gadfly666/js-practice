var playerList = [];

$(function () {
    const gameId = window.location.pathname.split("/")[2];
    $.ajax({
        async: false,
        type: "GET",
        url: `/api/getPlayerList/${gameId}`,
        success: function (data) {
            playerList = data;
        },
        error: function (__xhr, __statuscode, error) {
            console.log(error);
        }
    });

});

var roundCount;

$(document).ready(function () {
    init();

    $(".add-round-btn").on("click", function () {
        roundCount += 1;
        let i;
        for (i = 0; i < 4; i++) {
            playerList[i].score.push(0);
        }

        let markup = ` <tr>
        <td>Round ${roundCount}</td>
        <td><input class="form-control" id="${roundCount} 1" type="text"></td>
        <td><input class="form-control" id="${roundCount} 2" type="text"></td>
        <td><input class="form-control" id="${roundCount} 3" type="text"></td>
        <td><input class="form-control" id="${roundCount} 4" type="text"></td>
    </tr>`

        $("table tbody").append(markup);
    });
    $('.form-control').on('keydown blur', function (event) {
        if (event.keyCode == 13 || event.type == 'blur') {
            const keval = $(this).val();
            const cell = $(this).attr('id');

            const roundNum = cell.split(" ")[0];
            const playerNum = cell.split(" ")[1];

            if (keval != "") {
                if (isNaN(keval)) {
                    alert("Score must be a number");
                } else {
                    playerList[playerNum - 1].score[roundNum - 1] = parseInt(keval);
                }
            }

            $(".sum-head").text(`Sum of score (${getSum(playerList[0].score)+getSum(playerList[1].score)+getSum(playerList[2].score)+getSum(playerList[3].score)})`);
            $(".p1-score").text(getSum(playerList[0].score));
            $(".p2-score").text(getSum(playerList[1].score));
            $(".p3-score").text(getSum(playerList[2].score));
            $(".p4-score").text(getSum(playerList[3].score));
        }
    });
});

window.onbeforeunload = function(){
    const gameId = window.location.pathname.split("/")[2];
    const playerListToSend = JSON.stringify(playerList);
    $.ajax({
        async: false,
        type: "POST",
        url: "/api/update",
        data: {
            'gameId': gameId,
            'playerListInJson': playerListToSend,
        },
        error: function (__xhr, __statuscode, error) {
            console.log(error);
        }
    });
}

function init() {
    let player1 = playerList[0].name;
    let player2 = playerList[1].name;
    let player3 = playerList[2].name;
    let player4 = playerList[3].name;

    let thead = `<tr>
    <th scope="col"></th>
    <th scope="col">${player1}</th>
    <th scope="col">${player2}</th>
    <th scope="col">${player3}</th>
    <th scope="col">${player4}</th>
    </tr>`;

    $("table thead").append(thead);

    p1Score = getSum(playerList[0].score);
    p2Score = getSum(playerList[1].score);
    p3Score = getSum(playerList[2].score);
    p4Score = getSum(playerList[3].score);

    $(".sum-head").text(`Sum of score (${p1Score+p2Score+p3Score+p4Score})`);
    $(".p1-score").text(p1Score);
    $(".p2-score").text(p2Score);
    $(".p3-score").text(p3Score);
    $(".p4-score").text(p4Score);

    roundCount = playerList[0].score.length;
    console.log(roundCount);
    let i;
    for (i = 0; i < roundCount; i++) {
        let markup = ` <tr>
        <td>Round ${i+1}</td>
        <td><input class="form-control" id="${i+1} 1" type="text" value=${playerList[0].score[i]}></td>
        <td><input class="form-control" id="${i+1} 2" type="text" value=${playerList[1].score[i]}></td>
        <td><input class="form-control" id="${i+1} 3" type="text" value=${playerList[2].score[i]}></td>
        <td><input class="form-control" id="${i+1} 4" type="text" value=${playerList[3].score[i]}></td>
    </tr>`

        $("table tbody").append(markup);
    }
}

function getSum(list) {
    let i, sum = 0;
    for (i = 0; i < list.length; i++) {
        sum += list[i];
    }
    return sum;
}