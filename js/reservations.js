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

    let dateInput = $("input#date");
    let today = new Date();


    let tableHeader = $("<tr>");
    tableHeader.appendTo(reservationTable);

    // nazev sloupců a řádků
    tableHeader.append("<th>DRAHY\n/ČASY");

    while (hours != endH || minutes != endM) {
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
            // create new table row
            let laneRow = $("<tr>");
            // append it to table
            laneRow.appendTo(reservationTable);
            // append lane number as first value in row
            laneRow.append("<th>" + lane.id + ". line");

            // reset hours and minutes
            hours = startH;
            minutes = startM;
            while (hours != endH || minutes != endM) {
                // creat table cell
                let timeInterval = $("<td>");
                let id = ((hours <= 9) ? ("0" + hours) : (hours)) + "" + minutes + "" + lane.id;

                $(timeInterval).attr("id", id);
                // TODO:
                // make css for the button
                let button = $("<button>");
                button.text("HUH");

                button.on("click", function () {
                    addToReservations($(this).parent(), reservedTimes, orderedTimesHashMap);
                    loadOrderedTimes(new Date(dateInput.val()), orderedTimesHashMap);
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
    }).fail(function (textStatus, errorThrown) {
        console.log("Error fetching data: " + textStatus + errorThrown);
    });;


    // set default date to today
    dateInput.val(today.yyyymmdd());
    loadReservedTimes(today, timeIntervals, reservedTimes);

    // add events
    dateInput.on("change", function () {
        let date = new Date(this.val());

        clearSelection(orderedTimesHashMap);
        orderedTimesHashMap.clear();

        loadReservedTimes(date, timeIntervals, reservedTimes);
    });

    $("button#date-next").on("click", function () {
        let date = new Date(dateInput.val()).addDays(1);

        clearSelection(orderedTimesHashMap);
        orderedTimesHashMap.clear();

        // Set date
        dateInput.val(date.yyyymmdd())

        loadReservedTimes(date, timeIntervals, reservedTimes);
    });

    $("button#date-prev").on("click", function () {
        let date = new Date(dateInput.val()).addDays(-1);

        clearSelection(orderedTimesHashMap);
        orderedTimesHashMap.clear();

        // Set date
        dateInput.val(date.yyyymmdd())

        loadReservedTimes(date, timeIntervals, reservedTimes);
    });

})

function loadReservedTimes(date = Date, timeIntervals = Map, reservedTimes = Map) {
    // clear reserved times from previous date
    reservedTimes.forEach(cell => {

        cell.children().removeClass('selected');
        cell.children().attr('disabled', false);
        cell.children().text("HUH");
    });
    reservedTimes.clear();

    let d = date.yyyymmdd();
    // disable all buttons which are already reserved and make fill hashmap with already reserved times 
    $.getJSON("http://localhost/reservations/by-day?day=" + d, function (reservations) {

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
                let key = ((hours <= 9) ? "0" + hours : hours) + "" + minutes + reservation.lane.id;
                let cell = timeIntervals.get(key);
                let button = $(cell).children();

                button.text("KYS");
                button.addClass('selected');
                button.prop('disabled', true);

                reservedTimes.set(key, cell);

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

}

function loadOrderedTimes(date = Date, orderedTimesHashMap = Map) {
    $("#reservations").empty();

    let sortedMap = new Map([...orderedTimesHashMap.entries()].sort(function (a, b) {
        let hourA = Number($(a[1]).attr("id").substring(0, 2));
        let hourB = Number($(b[1]).attr("id").substring(0, 2));

        let minuteA = Number($(a[1]).attr("id").substring(2, 4));
        let minuteB = Number($(b[1]).attr("id").substring(2, 4));

        let laneA = Number($(a[1]).attr("id").substring(4, 5));
        let laneB = Number($(b[1]).attr("id").substring(4, 5));

        if (laneA != laneB) {
            return laneA - laneB;
        }
        if (hourA != hourB) {
            return hourA - hourB;
        }

        return minuteA - minuteB;
    }));

    let mergedReservations = mergeReservations(sortedMap);
    console.log("Merged reservations");
    console.log(mergedReservations);

    sortedMap.forEach(cell => {
        $("#reservations").append("<input type='number' value='" + cell.attr("id").substring(4, 5) + "' > ");

        let hours = cell.attr("id").substring(0, 2);
        let minutes = cell.attr("id").substring(2, 4);
        $("#reservations").append("<input type='datetime-local' value='" + date.dateTime(hours, minutes) + "' > ");

        // value="2017-06-01T08:30" />
    })
}

function mergeReservations(sortedReservations) {
    // Dodelat
    // if (sortedReservations.length === 0) return [];

    // let mergedReservations = [];

    // let currentStartId = $(sortedReservations[0]).attr("id");
    // let currentEndId = $(sortedReservations[0]).attr("id");

    // for (let i = 1; i < sortedReservations.length; i++) {
    //     let currentReservationId = $(sortedReservations[i]).attr("id");
    //     // 
    //     if (currentStartId.substring(0, 4) === )

    // }

    // // Push the final range
    // // mergedReservations.push({
    // //     start: currentStartId.substring(0, 2) + ":" + currentStartId.substring(2, 4),
    // //     end: currentEndId.substring(0, 2) + ":" + currentEndId.substring(2, 4)
    // // });

    // return mergedReservations;
}

function clearSelection(orderedTimesHashMap = Map) {
    orderedTimesHashMap.forEach(cell => {
        cell.children().removeClass('selected');
        cell.children().attr('disabled', false);
        cell.children().text("HUH");
    });

}

function addToReservations(tableCell, reservedTimesHashMap = Map, orderedTimesHashMap = Map) {

    let key = $(tableCell).attr("id");
    if (reservedTimesHashMap.has(key))
        return;

    if (orderedTimesHashMap.has(key)) {

        orderedTimesHashMap.delete(key);
        // Mark deselected
        tableCell.children().removeClass('selected');
        tableCell.children().text("HUH");
        console.log("removed from order");

    } else {
        orderedTimesHashMap.set(key, tableCell);

        tableCell.children().addClass('selected');
        tableCell.children().text("KYS");
        console.log("added to order");
    }
}




// Date prototypes
Date.prototype.dateTime = function (hours, minutes) {
    // Convert the hours and minutes to integers
    var hoursInt = parseInt(hours, 10);
    var minutesInt = parseInt(minutes, 10);

    // Set the hours and minutes
    this.setHours(hoursInt);
    this.setMinutes(minutesInt);

    // Format the date to 'YYYY-MM-DDTHH:MM'
    var year = this.getFullYear();
    var month = ('0' + (this.getMonth() + 1)).slice(-2);
    var day = ('0' + this.getDate()).slice(-2);
    var hour = (hoursInt <= 9) ? "0" + hoursInt : hoursInt;
    var minute = minutes;

    // Return the formatted string
    return `${year}-${month}-${day}T${hour}:${minute}`;
};

Date.prototype.yyyymmdd = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
};

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addMinutes = function (minutes) {
    var date = new Date(this.valueOf());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}
