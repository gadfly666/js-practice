$(document).ready(function(){
    var id = 0;
    $.ajax({
        type: "GET",
        url: "/api/gamecount",
        success: function (data) {
            const gameNumber = data;
            id = gameNumber;
        },
        error: function (__xhr,__statuscode,error){
            console.log(error);
        }
    });

    $(".submit-button").on("click", function(event){
        event.preventDefault();
        let PlayerList = [];
        let i;
        for(i =1; i<5; i++){
            let playerName = $(`#${i}`).val();
            if(playerName != ""){
                const player = {
                    name : playerName,
                    score : [],
                }

                PlayerList.push(player);
            }
        }

        const playerListToSend = JSON.stringify(PlayerList);
        console.log(playerListToSend);

        if(PlayerList.length != 4 ){
            alert('The game must have 4 player');
        }else{
            $.ajax({
                url: "/api/createGame",
                type: "POST",
                data: {
                    'playerListInJson': playerListToSend,
                },
                success: function () {      
                    window.location.href = `/games/${id}`; 
                },
                error: function(__xhr,__statuscode,error){
                    if(error) console.log(error);
                }
            });
        }
    });
});