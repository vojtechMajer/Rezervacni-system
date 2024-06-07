$(() => {
    // +-----------------------------+
    // |            SetUp            |
    // +-----------------------------+
    
    // --- Nastaveni constant + potrebne promene ---
    const drahyUrl = "http://localhost/lanes";    // JSON s daty
    const rezervaceUrl = ""   //JSON s rezervacemi

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
        let min = (i == Math.floor(i)) ? "00" : "30"                //kontrola pro 30min interval
        tableHeader.append("<th> " + Math.floor(i) + ":" + min);
    }

    // --- dotaz na JSON, pocet drah ---

    
})
