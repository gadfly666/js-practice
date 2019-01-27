$(document).ready(function () {
    $.ajax({
        url: "/api/question/getRandomQuestion",
        type: "GET",
        success: function (data) {
            $(".question-content").text(data.content);
            const questionId = data._id;

            $(".no-button").on('click', function () {
                console.log("Vote no");
                $.ajax({
                    url: "/api/question",
                    type: "PUT",
                    data: {
                        'questionId': questionId,
                        'vote': 0
                    },
                    success: function () {
                        window.open(`/answer/${questionId}`, "_self");
                    },
                    error: function (_xhr, _statusCode, error) {
                        console.log(error);
                    }
                });
            });

            $(".yes-button").on('click', function () {
                $.ajax({
                    url: "/api/question",
                    type: "PUT",
                    data: {
                        'questionId': questionId,
                        'vote': 1
                    },
                    success: function () {
                        window.open(`/answer/${questionId}`, "_self");
                    },
                    error: function (_xhr, _statusCode, error) {
                        console.log(error);
                    }
                });
            });

            $(".result-button").on('click', function () {
                window.open(`/answer/${questionId}`, "_self");
            });
        }
    });

    $(".change-question-button").on('click', function () {
        window.open("/", "_self");
    });
});