$(document).ready(function () {
    $(".submit-button").on('click', function(){
        const questionContent = $(".questionContent").val();
        $.ajax({
            url:"/api/question",
            type:"POST",
            data: {'questionContent' : questionContent},
            success: function(){
                console.log("question added");
            }
        });
    });
});