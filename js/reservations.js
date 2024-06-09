$(() => {
    // +-----------------------------+
    // |            SetUp            |
    // +-----------------------------+

    // --- Nastaveni constant + potrebne promene ---

    const SetUp = new Map([                                                                                     //Objekt Map() obsahujici vsechna nastaveni (v budoucnu dotaz na server)
        ["drahyUrl", "http://localhost/lanes"],                                                                 // JSON url pro zjisteni poctu drah
        ["rezervaceUrl", "http://localhost/reservations/by-day?day="],                                          // JSON url pro zjisteni jiz existujicich rezervaci
        ["StartTime", 8],                                                                                       //zacatek oteviraci doby format: 8 => 8:00
        ["EndTime", 18.5],                                                                                      //konec oteviraci doby format: 18.5 => 18:30
        ["price", 100]                                                                                          //cena za 30 pronajmuti drahy
    ])

    let SelectedReservationArray = [];                                                                          //Array pro ukladani vybranych rezervaci

    const reservationTable = $("table#reservation-table");                                                      // Table pro tabulku
    if (reservationTable.length === 0) {                                                                        //overeni existence tabulky
        console.log("Table not found!");                                                                        //Error hlaska
        return;                                                                                                 //preruseni celeho JS
    }

    const Today = new Date().toISOString().split('T')[0];                                                       //Aktualni datum
    const DateInput = $("input#date");                                                                          //Input:date pro urceni datumu rezervace tabulku
    if (DateInput.length === 0) {                                                                               //overeni existence Input:date
        console.log("Intup#date not found!");                                                                   //Error hlaska
        return;                                                                                                 //preruseni celeho JS
    } else {
        DateInput.val(Today);                                                                                   //nastaveni na momentalni datum
        DateInput.on("change", function () {                                                                    //pridani eventu on:change pro detekci manualniho zadani data uzivatelem
            let dateSplit = DateInput.val().split('-');                                                         //rozdeleni hodnoty v inputu na dny mesice a roky
            let todaySplit = Today.split('-');                                                                  //rozdeleni dnesniho data na dny mesice a roky
            if (dateSplit[0] > todaySplit[0] || dateSplit[1] > todaySplit[1] || dateSplit[2] > todaySplit[2]) { //porovnani zda datum v inputu je vetsi nez dnesni datum
                DrawTable(reservationTable, SetUp, DateInput, SelectedReservationArray);                        //pokud ano -> znovu nakresleni tabulky
            } else {
                DateInput.val(Today);                                                                           //pokud ne -> nastaveni data v inputu na dnesni datum
            }
        })
    }

    const DateNext = $("button#date-next");                                                                     //Tlacitko pro rychle posouvani datumu doperdu
    if (DateNext.length === 0) {                                                                                //overeni existence tlacitka
        console.log("button#date-next not found!");                                                             //Error hlaska
        return;                                                                                                 //preruseni celeho JS
    } else {
        DateNext.on("click", function () {                                                                      //pridani event on:click
            addDay(1, DateInput);                                                                               //posunuti data o jeden den dopredu
            DrawTable(reservationTable, SetUp, DateInput, SelectedReservationArray);                            //Znovu nakresleni tabulky
        });
    }


    const DatePrev = $("button#date-prev");                                                                     //Tlacitko pro rychle posouvani datumu dozadu
    if (DatePrev.length === 0) {                                                                                //overeni existence tlacitka
        console.log("button#date-prev not found!");                                                             //Error hlaska
        return;                                                                                                 //preruseni celeho JS
    } else {
        DatePrev.on("click", function () {                                                                      //pridani event on:click
            if (DateInput.val() !== Today) {                                                                    //overeni ze se uzivaten nestazi vytvorit rezervaci v minulosti
                addDay(-1, DateInput);                                                                          //posunuti data o jeden den dozadu
                DrawTable(reservationTable, SetUp, DateInput, SelectedReservationArray);                        //Znovu nakresleni tabulky
            }
        });
    }

    const ReservationsList = $("div#reservations");
    if (ReservationsList.length === 0) {                                                                        //overeni existence tlacitka
        console.log("button#confirm not found!");                                                               //Error hlaska
        return;                                                                                                 //preruseni celeho JS
    }

    const ConfirmSelection = $("button#confirm");
    if (ConfirmSelection.length === 0) {                                                                        //overeni existence tlacitka
        console.log("button#confirm not found!");                                                               //Error hlaska
        return;                                                                                                 //preruseni celeho JS
    } else {
        ConfirmSelection.on("click", function () {                                                              //pridani event on:click
            let list = Summary(SelectedReservationArray, SetUp);
            DrawSummary(ReservationsList, list);
        });
    }

    const submitButton = $("#order-form");                                                                      // povoleni všech inputu ve formuláři pro POST
    submitButton.on('submit', function () {
        console.log("submitted");
        $('#reservations input:disabled').prop('disabled', false);
    })

    DrawTable(reservationTable, SetUp, DateInput, SelectedReservationArray);                                    //Pocatecni tvorba tabulky
})

// +---------------------------------+
// |            Functions            |
// +---------------------------------+

function ISOdateToHours(date) {                                                                                 //funkce prevadi ISO format data na ciste hodiny
    let [datePart, timePart] = date.split(' ');                                                                 //oddeleni datumu od casu
    let [hours, minutes, seconds] = timePart.split(':').map(Number);                                            //oddeleni hodin,minut,sekund
    let decimalTime = hours + minutes / 60;                                                                     //spojeni hodin a minut na hodiny
    return decimalTime;
}

function addDay(days, dateInput) {                                                                              //Funkce zajistujici pridani x dnu do input:datum 
    let date = new Date(dateInput.val());                                                                       //zjisteni aktualni hodnoty inputu
    date.setDate(date.getDate() + days);                                                                        //pridani jednoho dnu
    dateInput.val(date.toISOString().split('T')[0]);                                                            //zapsani nove hodnoty do inputu
}

function DrawTable(reservationTable, setUp, date, data) {
    // --- Code ---
    reservationTable.empty();   //vyprazdneni tabulky

    const tableHeader = $("<tr>"); // zacatek hlavicky
    tableHeader.appendTo(reservationTable);
    tableHeader.append("<th>DRAHY\n/ČASY");
    for (let i = setUp.get("StartTime"); i <= setUp.get("EndTime"); i += 0.5) {
        let min = (i == Math.floor(i)) ? "00" : "30";               //kontrola pro 30min interval
        tableHeader.append("<th> " + Math.floor(i) + ":" + min + "</th>");
    }
    reservationTable.append("</tr>")

    // --- dotaz na JSON, pocet drah a generovani jednotlivych tlacitek ---

    $.getJSON(setUp.get("drahyUrl"), function (lanes) {
        $.each(lanes, function (i, lane) {
            // hlavicka drahy
            const laneRow = $("<tr>");
            laneRow.appendTo(reservationTable);
            laneRow.append("<th>" + lane.id + ". line" + "</th>");
            // generovani tlacitek pro samotnou rezervaci
            for (let i = setUp.get("StartTime"); i < setUp.get("EndTime"); i += 0.5) {
                laneRow.append('<td><button id="' + lane.id + '-' + i * 10 + '"></button>');
            }
            reservationTable.append("</tr>")
        })

        // --- dotaz na JSON, prirazeni rezervaci k tlacitkum, jejich deaktivace/aktivace ---
        let datePart = date.val().split('-');                                                                       //rozdeleni dat z input:date na den mesic rok
        let url = setUp.get("rezervaceUrl") + datePart[0] + datePart[1] + datePart[2];                              //priprava url pro JSON dotaz
        $.getJSON(url, function (rezervations) {
            $.each(rezervations, function (i, reservation) {
                for (i = ISOdateToHours(reservation.startDate); i < ISOdateToHours(reservation.endDate); i += 0.5) {
                    let button = "button#" + reservation.lane.id + "-" + i * 10                                     //priprava pro nalezeni tlacitka
                    $(button).text("X").addClass('reserved');                                                       //nalezeni tlacitka a oznaceni tlacitka jako rezervovano
                }
            })
        })

        //Sprovozneni nezablokovanych tlacitek                      
        for (let i = 1; i <= lanes.length; i++) {                                                                   //for loop ktery zajisti ze kazda draha bude testovana
            for (let j = setUp.get("StartTime"); j < setUp.get("EndTime"); j += 0.5) {                              //for loop ktery zajisti test kazdeho tlacitka v draze
                let button = "button#" + i + "-" + j * 10;                                                          //promena s identifikatorem aktualniho tlacitka
                if (data.indexOf(date.val() + "-" + i + "-" + j * 10) != -1) {                                      //kontrola zda se aktualni tlacitko nachazi v array data (bylo jiz vybrano do rezervace)
                    $(button).addClass("selected");                                                                 //pokud ano -> prida se mu classa "selected"
                }
                $(button).on("click", function () {                                                                 //pridni eventu on:click na aktualni tlacitko
                    if ($(this).attr('class') != 'reserved') {                                                      //kontrola zda dane tlacitko neni jiz zareervovane
                        if ($(this).attr("class") == 'selected') {                                                  //kontrola zda jiz bylo tlacitko vybrano pokud ano ->
                            data.splice(data.indexOf(date.val() + "-" + i + "-" + j * 10), 1);                      //odebere se ze seznmu vybranych (array data)
                            $(this).removeClass("selected");                                                        //odebere se mu classa "selected"
                        } else {                                                                                    //pokud vybrano nebylo ->
                            data.push(date.val() + "-" + i + "-" + j * 10)                                          //pridani talcitka do seznamu vybranych (array data)
                            $(this).addClass("selected");                                                           //pridani classy "selected"
                        }
                    }
                })
            }
        }
    })
}

function Summary(data, setings) {
    data.sort();                                                                                                    //serazeni data
    let list = [];
    let pomocna = [];
    for (let i = 0; i < data.length; i++) {
        pomocna = data[i].split('-');                                                                               //rozdeleni dat na jednotlive slozky
        for (let j = 0; j < 5; j++) {
            pomocna[j] = parseInt(pomocna[j]);                                                                      //prevedeni dat z stringu na int
        }
        pomocna.push(pomocna[4] + 5);                                                                               //pridani koncoveho casu
        pomocna.push(setings.get("price"));
        list.push(pomocna);                                                                                         //slozeni spatky do jednotneho listu
    }
    for (i = 0; i < list.length - 1; i++) {
        if (list[i][0] != list[i + 1][0]) continue;                                                                 //kontrola zda rok prvku i nerovna prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        if (list[i][1] != list[i + 1][1]) continue;                                                                 //kontrola zda mesic prvku i nerovna prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        if (list[i][2] != list[i + 1][2]) continue;                                                                 //kontrola zda den prvku i nerovna prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        if (list[i][3] != list[i + 1][3]) continue;                                                                 //kontrola zda draha prvku i nerovna prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        if (list[i][5] != list[i + 1][4]) continue;                                                                 //kontrola zda konecny cas prvku i nerovna pocatecnimu casu prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        list[i][5] = list[i + 1][5];                                                                                //nahrazeni konecneho casu prvku i konecnym casem prvku i+1
        list[i][6] += list[i + 1][6];                                                                               //naviseni ceny rezervace
        list.splice(i + 1, 1);                                                                                      //smazani prvku i+1
        i -= 1;                                                                                                     //zamezeni kontrole dlsiho prvku
    }
    for (i = 0; i < list.length - 1; i++) {                                                                         //opetovna kontrola listu jelikoz .sort kvuli nejakemu vyjebanemu duvodu serazuje 100, 80, 90, 95. Like WTF?!! EXPLANE!!!
        if (list[i][0] != list[i + 1][0]) continue;                                                                 //kontrola zda rok prvku i nerovna prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        if (list[i][1] != list[i + 1][1]) continue;                                                                 //kontrola zda mesic prvku i nerovna prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        if (list[i][2] != list[i + 1][2]) continue;                                                                 //kontrola zda den prvku i nerovna prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        if (list[i][3] != list[i + 1][3]) continue;                                                                 //kontrola zda draha prvku i nerovna prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        if (list[i][4] != list[i + 1][5]) continue;                                                                 //kontrola zda pocatecni cas prvku i nerovna koncovemu casu prvku i+1 pokud ne -> pokracujeme na dalsi prvek i
        list[i][4] = list[i + 1][4];                                                                                //nahrazeni pocatecniho casu prvku i pocatecnim casem prvku i+1
        list[i][6] += list[i + 1][6];                                                                               //naviseni ceny rezervace
        list.splice(i + 1, 1);                                                                                      //smazani prvku i+1
        i -= 1;                                                                                                     //zamezeni kontrole dlsiho prvku
    }
    return (list);
}

function DrawSummary(list, data) {
    list.empty();                                                                                                                               //Vyprazdneni puvodnich vysledku
    price = 0;                                                                                                                                  //nastaveni celkove ceny na 0kc
    for (let i = 0; i < data.length; i++) {                                                                                                     //Prohledani celeho seznamu
        month = (Math.floor(Math.floor(data[i][1]) / 10) == 0) ? "0" + Math.floor(data[i][1]) : Math.floor(data[i][1]);                         //pokud je cislo mesice mensi nez 10 tak se prevede na string a prida se mu nula na zacatek 8 -> 08
        day = (Math.floor(Math.floor(data[i][2]) / 10) == 0) ? "0" + Math.floor(data[i][2]) : Math.floor(data[i][2]);                           //pokud je cislo dne mensi nez 10 tak se prevede na string a prida se mu nula na zacatek 8 -> 08
        hourS = (Math.floor(Math.floor(data[i][4] * 0.1) / 10) == 0) ? "0" + Math.floor(data[i][4] * 0.1) : Math.floor(data[i][4] * 0.1);       //pokud je hodina mensi nez 10 tak se prevede na string a prida se mu nula na zacatek 8 -> 08
        minS = (data[i][4] * 0.1 == Math.floor(data[i][4] * 0.1)) ? "00" : "30";                                                                //detekce zda je 00 a nebo 30 minut (15.5 -> 15:30; 15.0 -> 15:00)
        dateS = data[i][0] + "-" + month + "-" + day + "T" + hourS + ":" + minS;                                                                //slozeni roku, mesice, cisla dnu, hodin a minut do ISO formatu pro datum zacatku rezervace
        console.log(minS + ";" + hourS + ";" + dateS);

        hourE = (Math.floor(Math.floor(data[i][5] * 0.1) / 10) == 0) ? "0" + Math.floor(data[i][5] * 0.1) : Math.floor(data[i][5] * 0.1);       //pokud je hodina mensi nez 10 tak se prevede na string a prida se mu nula na zacatek 8 -> 08
        minE = (data[i][5] * 0.1 == Math.floor(data[i][5] * 0.1)) ? "00" : "30";                                                                //detekce zda je 00 a nebo 30 minut (15.5 -> 15:30; 15.0 -> 15:00)
        dateE = data[i][0] + "-" + month + "-" + day + "T" + hourE + ":" + minE;                                                                //slozeni roku, mesice, cisla dnu, hodin a minut do ISO formatu pro datum konce rezervace
        console.log(minE + ";" + hourE + ";" + dateE);

        price += data[i][6];                                                                                                                    //navyseni celkove ceny o cenu aktualni rezervace
        string = ('<div>');
        string += ("<p>Rezervace "+ (i+1) + ":</p>");
        string += ("<p>datum: " + day + "." + month + "." + data[i][0] +"</p>");
        string += ("<p>čas: " + hourS + ":" + minS + " - " + hourE + ":" + minE + "</p>");
        string += ('<input disabled type="number" name="lane-number[]" value="' + data[i][3] + '">');                                          
        string += ('<input disabled type="datetime-local" name="start-date[]" value="' + dateS + '"></input>');                                 
        string += ('<input disabled type="datetime-local" name="end-date[]" value="' + dateE + '"></input>');                                    
        string += ("</div>");
        string += ('<div>');
        string += ("<p>Price:</p>");
        string += ("<p>" +  data[i][6] + " Kč</p>");
        list.append(string);                                                                                                                    //vytvoreni souhrnu jednotlivych rezervaci
    }
    list.append('<div class="summary"><p><b>Celkova cena: ' + price + ' Kč<b></p></div>')
}