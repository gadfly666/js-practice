
$(document).ready(function () {
    let questionId =-1;

    $.ajax({
        url: "/question",
        type: "GET",
        success: function(data){
            const question = data.question;
            console.log(question.content)
            $("h1").text(question.content);
            questionId =question.id;
        }
    });

    $(".no-button").on('click',function () {
        console.log("Vote no");
        $.ajax({
            url: "/vote",
            type: "POST",
            data: {
                'questionId': questionId,
                'vote': 0
            },
            success: function(){
               window.open(`/result/${questionId}`, "_self");
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    $(".yes-button").on('click',function () {
        $.ajax({
            url: "/vote",
            type: "POST",
            data: {
                'questionId': questionId,
                'vote': 1
            },
            success: function(){
                window.open(`/result/${questionId}`, "_self");
            }
        });
    });

    $(".result-button").on('click', function(){
        window.open(`/result/${questionId}`,"_self");
    });

    $("change-question-button").on('click', function(){
        window.open("/","_self");
    });
});