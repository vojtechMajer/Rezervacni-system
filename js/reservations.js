$(() => {
    // URL pro JSON return
    let drahyUrl = "http://localhost/lanes";
    //kontrola existence tabulky v pohledu
    let reservationTable = $("table#reservation-table");

    let timeIntervals = new Map();
    let reservedTimes = new Map();
    let orderedTimesHashMap = new Map();

    if (reservationTable.length === 0) {
        console.log("Table not found!");
        return;
    }

    // po 30 minutových intervalech
    // start     ..       end
    // 8:30 9:00 .. 17:30 18:00
    let startH = 8;
    let startM = "00";
    let endH = 18;
    let endM = "30";

    // + jeden časový interval aby se vypsal i poslední čas v cyklu 
    endH += (endM == "30") ? 1 : 0;
    endM = (endM == "30") ? "00" : "30";

    let hours = startH;
    let minutes = startM;

    let tableHeader = $("<tr>");
    tableHeader.appendTo(reservationTable);

    // nazev sloupců a řádků
    tableHeader.append("<th>DRAHY\n/ČASY");

    while (hours != endH || minutes != endM) {
        // console.log(hours + ":" + minutes);

        tableHeader.append("<th> " + hours + ":" + minutes);
        // 17:30 -> 18:00
        if (minutes == "30") {
            minutes = "00";
            hours++;
        }
        // 17:00 -> 17:30
        else {
            minutes = "30";
        }
    }

    // Create table
    $.getJSON(drahyUrl, function (lanes) {

        $.each(lanes, function (i, lane) {
            console.log(lane.id);
            // create new table row
            let laneRow = $("<tr>");
            // append it to table
            laneRow.appendTo(reservationTable);
            // append lane number as first value in row
            laneRow.append("<th>" + lane.id);

            // reset hours and minutes
            hours = startH;
            minutes = startM;
            while (hours != endH || minutes != endM) {
                // creat table cell
                let timeInterval = $("<td>");
                let id = hours + "" + minutes + "" + lane.id;

                $(timeInterval).attr("id", id);
                // TODO:
                // make css for the button
                let button = $("<button>");
                button.text("HUH");

                button.on("click", function () {
                    addToReservations($(this).parent(), reservedTimes, orderedTimesHashMap);
                })

                // append button to cell
                button.appendTo(timeInterval);
                // append whole cell with button to row
                timeInterval.appendTo(laneRow);

                // set timeInterval in HashMap
                // 8301 -> <td> v čase  8:30 na dráze 1
                // 9002 -> <td> v čase 9:00 na dráze 2
                timeIntervals.set(id, timeInterval);

                if (minutes == "30") {
                    minutes = "00";
                    hours++;
                }
                else {
                    minutes = "30";
                }
            }
        })
        console.log(timeIntervals);
    }).fail(function (textStatus, errorThrown) {
        console.log("Error fetching data: " + textStatus + errorThrown);
    });;

    var d = new Date();
    var today = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

    // disable all buttons which are already reserved and make fill hashmap with already reserved times 
    $.getJSON("http://localhost/reservations/by-day?day=" + today, function (reservations) {

        $.each(reservations, function (i, reservation) {

            let reservationStartH = Number(reservation.startDate.substring(11, 13));
            let reservationStartM = reservation.startDate.substring(14, 16);

            let reservationEndH = Number(reservation.endDate.substring(11, 13));
            let reservationEndM = reservation.endDate.substring(14, 16)

            reservationEndH += (reservationEndM == "30") ? 1 : 0;
            reservationEndM = (reservation.endDate.substring(14, 16) == "30") ? "00" : "30"

            hours = reservationStartH;
            minutes = reservationStartM;

            while (hours != reservationEndH || minutes != reservationEndM) {
                // console.log(hours + ":" + minutes);

                let key = hours + "" + minutes + reservation.lane.id;
                let cell = timeIntervals.get(key);
                let button = $(cell).children();

                button.text("KYS");
                button.css('color', 'red');
                button.prop('disabled', true);

                reservedTimes.set(key, reservations[i]);

                // 17:30 -> 18:00
                if (minutes == "30") {
                    minutes = "00";
                    hours++;
                }
                // 17:00 -> 17:30
                else {
                    minutes = "30";
                }
            }
        })
    }).fail(function (textStatus, errorThrown) {
        console.log("Error fetching data: " + textStatus + errorThrown);
    });;
});

function addToReservations(tableCell, reservedTimesHashMap = Map, orderedTimesHashMap = Map) {

    let key = $(tableCell).attr("id");
    if (reservedTimesHashMap.has(key))
        return;

    console.log(key);
    if (orderedTimesHashMap.has(key)) {
        // deselect
        orderedTimesHashMap.delete(key);

        // Mark deselected
        tableCell.children().css('color', 'black');
        tableCell.children().text("HUH");

        console.log("removed from order");

    } else {
        orderedTimesHashMap.set(key, tableCell);

        // Mark selected
        tableCell.children().css('color', 'yellow');
        tableCell.children().text("KYS");

        console.log("added to order");
    }
}