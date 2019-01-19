$(document).ready(function () {
    $(".submit-button").on('click', function(){
        const questionContent = $(".questionContent").val();
        $.ajax({
            url:"/addquestion",
            type:"POST",
            data: {'questionContent' : questionContent},
            success: function(){
                console.log("question added");
            }
        });
    });
});