
$(document).ready(function () {
    const questionId = window.location.pathname.split("/");
    $.ajax({
        url: `/api/question/getQuestionById/${questionId[2]}`,
        type: "GET",
        success: function(data){
            $(".question-content").text(data.content);
            const totalVote = data.yes + data.no;
            const yesByPercent = Math.round((data.yes) / totalVote * 100);
            const noByPercent = 100 - yesByPercent;
            $(".total-vote").text("Tổng số lượt vote: " +totalVote + " lượt.");
            $(".percent-yes").css("width", `${yesByPercent}%`);
            $(".percent-yes").text(`${yesByPercent}%`);
            $(".percent-no").css("width", `${noByPercent}%`);
            $(".percent-no").text(`${noByPercent}%`);
        }
    });
    $(".change-question-button").on('click', function(){
        window.open("/","_self");
    });
});