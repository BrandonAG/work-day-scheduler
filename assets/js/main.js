function displayDate() {
    $("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));
}

function updateSchedule() {
    for (var h = 9; h <= 17; h++) {
        console.log(h);
        $(".container").append('<div class="row"></div>');
        $(".row").last().append('<div class="col-1 hour">' + moment(h, "HH").format("h a") + '</div>');
        $(".row").last().append('<textarea class="col-10 description future">Enter Value</textarea>');
        $(".row").last().append('<button class="col-1 saveBtn"><i class="fas fa-save"></i></button>');
        // $(".saveBtn").last().append('<i class="fas fa-save"></i>');
    }
}

displayDate()
updateSchedule()