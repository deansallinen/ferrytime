$(document).ready(function() {
    $(".accordion").click(function() {
        $(this).toggleClass("active");
        $(this).next(".panel").toggleClass("active");
        // $(this).children("a").attr("href", "#");
    });
    // $("h2:contains('Tsawwassen')").css("background", "green");
});
