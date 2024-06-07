$(() => {
    // +-----------------------------+
    // |            SetUp            |
    // +-----------------------------+
    
    // --- Nastaveni constant + potrebne promene ---
    const drahyUrl = "http://localhost/lanes";    // JSON s daty
    const rezervaceUrl = "http://localhost/reservations/by-day?day="   //JSON s rezervacemi

    const reservationTable = $("table#reservation-table");    // Table pro tabulku
    if (reservationTable.length === 0) {                    //overeni existence tabulky
        console.log("Table not found!");
        return;
    }

    const StartTime = 8;  //zacatek oteviraci doby format: 8 => 8:00
    const EndTime = 18.5;  //konec oteviraci doby format: 18.5 => 18:30
    const Today = new Date().toISOString().split('T')[0]; //Aktualni datum

    const DateInput = $("input#date");                  //Input:date pro urceni datumu rezervace tabulku
    if (reservationTable.length === 0) {                //overeni existence Input:date
        console.log("Intup#date not found!");
        return;
    } else {
        DateInput.val(Today);                           //nastaveni na momentalni datum
    }
    const DateInputNext = $("input#date-next");     //Tlacitko pro rychle posouvani datumu doperdu
    const DateInputPrev = $("input#date-prev");     //Tlacitko pro rychle posouvani datumu dozadu

    // +----------------------------+
    // |            Code            |
    // +----------------------------+

    // --- Predpriprava tablky ---

    const tableHeader = $("<tr>"); // zacatek hlavicky
    tableHeader.appendTo(reservationTable);
    tableHeader.append("<th>DRAHY\n/ČASY"); // 
    for(let i = StartTime; i <= EndTime; i += 0.5) {
        let min = (i == Math.floor(i)) ? "00" : "30";               //kontrola pro 30min interval
        tableHeader.append("<th> " + Math.floor(i) + ":" + min + "</th>");
    }
    reservationTable.append("</tr>")

    // --- dotaz na JSON, pocet drah a generovani jednotlivych tlacitek ---

    $.getJSON(drahyUrl, function (lanes) {
        $.each(lanes, function (i, lane) {
            // hlavicka prvni lainy
            const laneRow = $("<tr>");
            laneRow.appendTo(reservationTable);
            laneRow.append("<th>" + lane.id + ". line" + "</th>");
            // generovani tlacitek pro samotnou rezervaci
            for(let i = StartTime; i < EndTime; i += 0.5) {
                laneRow.append('<td><button id="' + lane.id + '-' + i*10 + '"></button>');
            }
            reservationTable.append("</tr>")
        })

        // --- dotaz na JSON, prirazeni rezervaci k tlacitkum, jejich deaktivace/aktivace ---
        let datePart = DateInput.val().split('-');                          //rozdeleni dat z input:date na den mesic rok
        let url = rezervaceUrl + datePart[0] + datePart[1] + datePart[2];   //priprava url pro JSON dotaz
        $.getJSON(url, function (rezervations) {
            $.each(rezervations, function (i, reservation) {
                for( i = ISOdateToHours(reservation.startDate); i < ISOdateToHours(reservation.endDate); i += 0.5) {
                    let button = "button#" + reservation.lane.id + "-" + i*10  //priprava pro nalezeni tlacitka
                    $(button).text("X").addClass('reserved');               //nalezeni tlacitka a oznaceni tlacitka jako rezervovano
                }
            })
        })

        //Sprovozneni nezablokovanych tlacitek
        for(let i = 1; i <= lanes.length; i ++) {
            for(let j = StartTime; j < EndTime; j += 0.5) {
                let button = "button#" + i + "-" + j*10;
                $(button).on("click", function () {
                    if($(this).attr('class') != 'reserved') {
                        if($(this).attr("class") == 'selected') {
                            $(this).removeClass("selected");
                        } else {
                            $(this).addClass("selected");
                        }
                    }
                })
            }
        }
    })

    
})

    // +---------------------------------+
    // |            Functions            |
    // +---------------------------------+

function ISOdateToHours(date) {    // funkce prevadi ISO format data na ciste hodiny
    let [datePart, timePart] = date.split(' ');                         //oddeleni datumu od casu
    let [hours, minutes, seconds] = timePart.split(':').map(Number);    //oddeleni hodin,minut,sekund
    let decimalTime = hours + minutes / 60;                             //spojeni hodin a minut na hodiny
    return decimalTime;
}