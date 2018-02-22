$(function () {
    $("#errorbox").hide();
    $(".btn_proc").on("click", function() {
        var name = $(this).attr("name");
        $.post("/process", {method: name}).done(function(data) {
            var payload = JSON.parse(data);
            if (payload.error) {
                $("#errorbox").show();
                $("#errorbox").text(payload.error);
            } else {
                $("#errorbox").hide();
            }
            if (payload.temperature) {
                $("#status").text("温度："+payload.temperature+"／湿度："+payload.humidity);
            }
        });
    });
});
