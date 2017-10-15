$(document).ready(function() {
    $(".accordion").click(function() {
        // $(this).toggleClass("active");
        // $(this).next(".panel").toggleClass("active");
        // $(this).children("a").attr("href", "#");
    });

    $("h3.routeName").click(function() {
        $(this).parent().toggleClass("active");
        $(this).next().slideToggle("fast");
    });
    // $("h2:contains('Tsawwassen')").css("background", "green");
});
