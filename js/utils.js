let selInstrument, selKey, selScale;
$(function () {
    app.instruments.forEach(function (ins) {
        $("#instrumentsMenu").append(`<a id="ddiInstrument${ins.name}" class="dropdown-item" href="#">${ins.name}</a>`);
    });

    $("#instrumentsMenu").on("click", "a", function () {
        buildInstrument(this);
    });

    app.notes.forEach(function (k) {
        $("#keysMenu").append(`<a id="ddiKey${k.name}" class="dropdown-item" href="#">${k.name}</a>`);
    });

    $("#keysMenu").on("click", "a", function () {
        //Set selected Key and format dropdown
        $("#keysMenu").children().removeClass("active");
        $(this).addClass("active");
        $("#btnKeys").text($(this).text());
        selKey = app.notes.find(element => element.name === $(this).text());
        buildNoteControls()
        toggleNoteDisplay();
    });

    $("#selCapo").on("change", "", function () {
        let idInstr = `ddiInstrument${selInstrument.name}`
        let elem = $(`a[id='${idInstr}']`);
        buildInstrument(elem);
    });

    $("#selDisplayFrom").on("change", "", function () {
        toggleNoteDisplay();
    });
    $("#selDisplayTo").on("change", "", function () {
        toggleNoteDisplay();
    });

    app.scales.forEach(function (k) {
        $("#scalesMenu").append(`<a id="ddiScale${k.name}" class="dropdown-item" href="#">${k.name}</a>`);
    });

    $("#scalesMenu").on("click", "a", function () {
        //Set selected Scale and format dropdown
        $("#scalesMenu").children().removeClass("active");
        $(this).addClass("active");
        $("#btnScales").text($(this).text());
        selScale = app.scales.find(element => element.name === $(this).text());
        buildNoteControls()
        toggleNoteDisplay();
    });
});

function toggleNoteDisplay() {
    if (!selInstrument || !selKey || !selScale) {
        return;
    }
    let displayFrom = Number(selDisplayFrom.value);
    let displayTo = Number(selDisplayTo.value);

    //remove all classes associated with showing a note
    $('div[id^="noteStringFret"]').removeClass("showNote");
    $('div[id^="noteStringFret"]').removeClass("hideNote");
    $('div[id^="noteStringFret"]').removeClass("highlightNote");

    let notesToShow = getScaleNotes();

    //Iterate fretboard and c if note is in the scale
    for (let f = 0; f <= selInstrument.frets; f++) {
        for (let s = selInstrument.strings; s > 0; s--) {
            let elem = $(`#noteStringFret_${s}_${f}`);
            notesToShow.find(element => element.name === elem.text()) ? elem.addClass("showNote") : elem.addClass("hideNote")
        }
    }

    //highlight note/chord
    if ($("input:checked")) {
        for (let f = 0; f <= selInstrument.frets; f++) {
            for (let s = selInstrument.strings; s > 0; s--) {
                let elem = $(`#noteStringFret_${s}_${f}`);
                const note = $("input:checked").attr("note");

                hlNote(note, elem)

                if ($("input:checked").attr("chord") === 'true') {
                    const rootIndex = notesToShow.findIndex(element => element.name === note)
                    hlNote(notesToShow[(rootIndex + 2) % notesToShow.length].name, elem);
                    hlNote(notesToShow[(rootIndex + 4) % notesToShow.length].name, elem);
                }
            }
        }
    }

    // Only show notes in display from to
    for (let f = 1; f <= selInstrument.frets; f++) {
        for (let s = selInstrument.strings; s > 0; s--) {
            if( (displayFrom > 0 || displayTo > 0) && (f < displayFrom  || f > displayTo) ){
                let elem = $(`#noteStringFret_${s}_${f}`);
                elem.removeClass("showNote");
                elem.removeClass("highlightNote");
                elem.addClass("hideNote");
            }
        }
    }
}

function buildNoteControls() {
    let notesToShow = getScaleNotes();

    //build notes in the scale
    $("#scaleNotes").empty();
    for (let n = 0; n <= notesToShow.length - 1; n++) {
        $("#scaleNotes").append(`<div id="scaleNote${n}" class="col">${notesToShow[n].name}${createRadioButtonsForScaleNote(notesToShow[n].name, n)}</div>`);
    }

    $('input[name="hlNoteChord"]').on("click", function () {
        toggleNoteDisplay();
    });
}

function createRadioButtonsForScaleNote(noteName, scaleDegreeIndex) {
    return `<div class="form-check">
                <input class="form-check-input" type="radio" name="hlNoteChord" id="radioNote${noteName}" note="${noteName}" chord="false">
                <label class="form-check-label" for="radioNote${noteName}">
                    note
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="hlNoteChord" id="radioChord${noteName}" note="${noteName}" chord="true">
                <label class="form-check-label" for="radioChord${noteName}">
                    ${getChordName(scaleDegreeIndex)}
                </label>
            </div>`;
}

function getScaleNotes() {
    let scaleNotes = [];
    if (!selInstrument || !selKey || !selScale) {
    }
    else {
        //add the key note
        scaleNotes.push(app.notes.find(element => element.name === selKey.name));

        //add the interval note from the last note
        selScale.intervals.forEach(function callbackFn(currentValue, index, array) {
            let lastNoteVal = scaleNotes[scaleNotes.length - 1].value;
            let nextNoteVal = (lastNoteVal + currentValue) % 12;
            scaleNotes.push(app.notes.find(element => element.value === nextNoteVal));
        });
    }
    return scaleNotes;
}

function hlNote(note, elem) {
    if (note === elem.text()) {
        elem.addClass("highlightNote")
    }
}

function buildInstrument(instr) {
    //Set selected insturment and format dropdown
    $("#instrumentsMenu").children().removeClass("active");
    $(instr).addClass("active");
    $("#btnInstruments").text($(instr).text());
    selInstrument = app.instruments.find(element => element.name === $(instr).text());
    let capo = Number(selCapo.value);

    //build fretboard for selected instrument
    $("#fretBoard").empty();
    for (let f = 0; f <= selInstrument.frets - capo; f++) {
        $("#fretBoard").append(`<div id="fret${f}" class="row"></div>`);

        //build the strings for the selected instrument
        for (let s = selInstrument.strings; s > 0; s--) {
            let frettedNoteValue = (app.notes.find(element => element.name === selInstrument.stringTunings[s - 1]).value + capo + f) % 12;
            let frettedNoteName = app.notes.find(element => element.value === frettedNoteValue).name;
            $(`#fret${f}`).append(`<div id="noteStringFret_${s}_${f}" class="col ${f === 0 ? "nut showNote" : "fret showNote"}">${frettedNoteName}</div>`);
        }
    }
    buildNoteControls();
    toggleNoteDisplay();
}

function getChordName(scaleDegreeIndex){
    if (selScale.chords){
        return selScale.chords[scaleDegreeIndex] + ' chord';
    }
    return 'chord';
}