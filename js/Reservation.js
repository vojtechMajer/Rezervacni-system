$(() => {
    let drahyUrl = "http://localhost/lanes";
    let reservationTable = $("table#reservation-table");

    let casy = new Map();


    if (reservationTable.length === 0) {
        console.log("Table not found!");
        return;
    }

    let tableHeader = $("<tr>");
    tableHeader.appendTo(reservationTable);

    // start     ..       end
    // 8:00 8:30 .. 17:30 18:00
    let start = 8;
    let end = 18;
    let countOfTimeIntervals = end - start;
    tableHeader.append("<th> DRAHY/ČASY");

    // 2 kvůli půlhodinovým intervalům
    for (let i = 0; i <= countOfTimeIntervals; i++) {
        tableHeader.append("<th> " + String((start + i)) + ":00");

        // nebude dávat 18:30
        if (i != countOfTimeIntervals)
            tableHeader.append("<th> " + String((start + i)) + ":30");
    }

    // Get all lanes and create reservations
    $.getJSON(drahyUrl, function (result) {
        $.each(result, function (i, lane) {
            // let laneContent = reservationTable.append("<tr>");

            let laneContent = $("<tr>").appendTo(reservationTable);
            // Row description 
            laneContent.append("<td> " + lane.id);

            for (let i = 0; i <= countOfTimeIntervals; i++) {
                let idH = String(i + start) + "00" + lane.id;
                let idM = String(i + start) + "30" + lane.id;
                $("<td>").appendTo(laneContent).attr("id", idH).append("<button>HUH").on("click", function () {
                    addToReservations(casy, idH, lane.id);
                });

                if (i != countOfTimeIntervals)
                    $("<td>").appendTo(laneContent).attr("id", idM).append("<button>HUH").on("click", function () {
                        addToReservations(casy, idM, lane.id);
                    });
            }

        });
    }).fail(function (textStatus, errorThrown) {
        console.log("Error fetching data: " + textStatus + errorThrown);
    });

    var d = new Date();
    var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    // TODO:
    // změna data podle výběru uživatele

    // Get reservations from today 
    $.getJSON("http://localhost/reservations/by-day?day=" + today, function (reservations) {
        $.each(reservations, function (i, reservation) {

            // start time
            let Shours = Number(reservation.startDate.substring(11, 13));
            let Sminutes = reservation.startDate.substring(14, 16);

            let Ehours = Number(reservation.endDate.substring(11, 13));
            let Eminutes = reservation.endDate.substring(14, 16);

            let reservedTimes = [];

            reservedTimes.push($("table#reservation-table tr td#" + Shours + "" + Sminutes + "" + reservation.lane.id));
            reservedTimes.push($("table#reservation-table tr td#" + Ehours + "" + Eminutes + "" + reservation.lane.id));

            if (Sminutes == "00") {
                // console.log(Shours + "30" + reservation.lane.id)
                // console.log(Shours + 1 + "00" + reservation.lane.id)
                reservedTimes.push($("table#reservation-table tr td#" + Shours + "30" + reservation.lane.id));
                reservedTimes.push($("table#reservation-table tr td#" + (Shours + 1) + "00" + reservation.lane.id));

            }
            for (let i = 1; i <= Ehours - Shours; i++) {
                reservedTimes.push($("table#reservation-table tr td#" + (Shours + i) + "00" + reservation.lane.id));
                if (i != Ehours - Shours)
                    reservedTimes.push($("table#reservation-table tr td#" + (Shours + i) + "30" + reservation.lane.id));

                $("table#reservation-table tr td#" + (Shours + i) + "30" + reservation.lane.id);
            }

            $.each(reservedTimes, function (i, time) {
                time.children().text("KYS");
                time.children().css('color', 'red');
            })

            // console.log(date);
            //   let date = new Date(reservation.startDate.substring(0, 4), reservation.startDate.substring(5, 7) - 1, reservation.startDate.substring(8, 10));
        })

    }).fail(function (textStatus, errorThrown) {
        console.log("Error fetching data: " + textStatus + errorThrown);
    });


});



function addToReservations(reservations = [], id, line) {

    let element = $("#" + id);
    if (!reservations.has(id)) {
        reservations.set(id, line);
        console.log("Added item to list");

        element.children().css('color', 'red');
        element.children().text("KYS");
    }
    else {
        console.log("This item already exists");
        reservations.delete(id);
        element.children().css('color', 'yellow');
        element.children().text("HUH");
    }


    console.log(reservations);
}