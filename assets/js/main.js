var savedSchedule = {};

// Grab existing schedule from local storage
function checkLocalStorage() {
    if (localStorage.getItem("todolist") === null) {
        savedSchedule = {};
    }
    else {
        savedSchedule = JSON.parse(localStorage.getItem("todolist"));
        console.log(savedSchedule)
    }
}

// Update current date and display in header
function displayDate() {
    $("#currentDay").text(moment().format("dddd, MMMM D, YYYY"));
}

// Populate the days work schedule
function updateSchedule() {
    for (var h = 9; h <= 17; h++) {
        $(".container").append('<div class="row"></div>');
        var hourContent = $('<div>');
        hourContent.addClass("col-1 hour");
        hourContent.text(moment(h, "HH").format("h a"));
        $(".row").last().append(hourContent);
        var descriptionContent = $('<textarea>');
        var due;
        if (moment().format("HH") > h) {
            due = "past";
        }
        else if (moment().format("HH") < h) {
            due = "future";
        }
        else {
            due = "present";
        }
        descriptionContent.addClass("col-10 description " + due);
        descriptionContent.attr("task-hour", h);
        if (h in savedSchedule) {
            descriptionContent.text(savedSchedule[h]);
        }
        $(".row").last().append(descriptionContent);
        var saveContent = $('<button>');
        saveContent.addClass("col-1 saveBtn");
        saveContent.attr("save-hour", h);
        saveContent.html('<i class="fas fa-save"></i>');
        $(".row").last().append(saveContent);
    }
}

// Save edited task descriptions to local storage
function saveSchedule() {
    $(document).on('click', '.saveBtn', function() {
        var hourNumber = $(this).attr('save-hour');
        var taskDescription = $('[task-hour="' + hourNumber + '"]').val();
        if (taskDescription === "") {
            delete savedSchedule[hourNumber.toString()];
        }
        else {
            savedSchedule[hourNumber.toString()] = taskDescription;
        }
        console.log(savedSchedule);
        console.log(JSON.stringify(savedSchedule))
        localStorage.setItem('todolist', JSON.stringify(savedSchedule));
    });
}

displayDate()
checkLocalStorage()
updateSchedule()
saveSchedule()