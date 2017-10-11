$(document).ready(function() {
    $.getJSON("data.json", function(data) {
        $.each(data, function(index, route) {
            $(".schedule").append("<h2 class='routeName'>" + route.routeName + "</h2>");
            $.each(route.schedule, function(index, sailing) {
                $(".schedule").append("<div class='sailings'>");
                $(".schedule").append("<div class='vessel'>" + sailing.vessel + "</div>");
                $(".schedule").append("<div class='scheduledDeparture'>" + sailing.scheduledDeparture + "</div>");
                $(".schedule").append("<div class='actualDeparture'>" + sailing.actualDeparture + "</div>");
                $(".schedule").append("<div class='arrivalTime'>" + sailing.arrivalTime + "</div>");
                $(".schedule").append("<div class='status'>" + sailing.status + "</div>");
                $(".schedule").append("</div>");
            });
        });
    });
});
