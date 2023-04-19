var inputEl = document.querySelectorAll('input');

var d = new Date();
var day = d.getDate() < 10 ? `0${d.getDate()}`: d.getDate();
var month = d.getMonth()+ 1 < 10 ? `0${d.getMonth()+1}`: d.getMonth()+1;
var year = d.getFullYear();

$('#day').val(day);
$('#month').val(month);
$('#year').val(year -1);
$('#year').attr({"max": year});
$('form').submit(function(e){
    e.preventDefault();
});
function inputChange(){
    var getYear = $('#year').val();
    var getMonth = $('#month').val() < 10 && $('#month').val()> 0? `0${$('#month').val()}`: $('#month').val();
    $('#month').val(getMonth.slice(-2));
    var getDay = $('#day').val() < 10 && $('#day').val()> 0? `0${$('#day').val()}`: $('#day').val();
    $('#day').val(getDay.slice(-2));
    var daysInMonth = new Date(getYear, getMonth, 0).getDate();
    // if (getDay > daysInMonth) {
    //     $("#day").val(String(daysInMonth));
    // }
    // if (getMonth > 12) {
    //     $("#month").val("12");
    // }
    // if (getYear > year) {
    //     $("#year").val(year);
    // }
    if (getYear === String(year)) {
        if (getMonth === String(month)) {
            $("#day").attr({"max":String(day)});
        } else{
            $('#day').attr({"max":daysInMonth});
        }
        $("#month").attr({"max":String(month)});
    } else{
        $("#month").attr({"max":12});
        $('#day').attr({"max":daysInMonth});
    }
    let invalidInputs = $('form').find(':invalid');
    if (invalidInputs.length > 0) {
        invalidInputs.each(function() {
            let inputId = $(this).attr('id');
            $($('form').find('label[for="'+inputId+'"]')).addClass('invalid');
            if (inputId === "day") {
                inputId = "date";
            } 
            $(this).next().text(`Must be a valid ${inputId}`);
        })   
    } else{
        let inputId = $(this).attr('id');
        $($('form').find('label[for="'+inputId+'"]')).removeClass('invalid');
        $(this).next().text('');
        $('input').removeClass('not-valid');
        $('label').removeClass('invalid');
    }
    checkDates();
}
function checkDates(){
    if ($('#day').val() === '0') {
        $('#day').val('');
        $("#day").next().text('This field is required');
    }
    if ($('#month').val() === '0') {
        $('#month').val('');
        $("#month").next().text('This field is required');
    }
    if ($('#year').val() === '0') {
        $('#year').val('');
        $("#year").next().text('This field is required');
    }
    if($('form').find(':invalid').length < 1){
        $('label').removeClass('invalid');
        $('input').removeClass('not-valid');
        $('#day').next().text('');
        $('#month').next().text('');
        $('#year').next().text('');
    }
}
function submitRequest(){
    let invalidInputs = $('form').find(':invalid');
    var getYear = $('#year').val();
    var getMonth = $('#month').val() < 10 && $('#month').val()> 0? `0${$('#month').val()}`: $('#month').val();
    var daysInMonth = new Date(getYear, getMonth, 0).getDate();
    if (invalidInputs.length > 0) {
        if (year < $('#year').val()) {
            $("#year").next().text('Must be in the past');
        } else if ($('#year').val() === ''){
            $("#year").next().text('This field is required');
        } else if ($('#year').val()< year){
                $("#year").next().text('');
        }
        if (12 < $('#month').val()) {
            $("#month").next().text('Must be a valid month');
        } else if ($('#month').val() === ''){
            $("#month").next().text('This field is required');
        } 
        if (daysInMonth < $('#day').val()) {
            $("#day").next().text('Must be a valid day');
        } else if ($('#day').val() === ''){
            $("#day").next().text('This field is required');
        }  
        $('label').addClass('invalid');
        $('input').addClass('not-valid');
    } else{
        $('label').removeClass('invalid');
        $('input').removeClass('not-valid');
        let birthDate = new Date(`${$('#year').val()}-${$('#month').val()}-${$('#day').val()}`);
        let currentDate = new Date();
        let birthDay = $('#day').val();
        let birthMonth = $('#month').val();
        let birthYear = $('#year').val();
        let daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
        let numberOfDays = currentDate.getDate();
        let numberOfMonth = currentDate.getMonth()+1;
        let numberOfYears = currentDate.getFullYear();
        if (birthDay > numberOfDays) {
            numberOfDays = numberOfDays + daysInMonth;
            numberOfMonth = numberOfMonth - 1;
        } if (birthMonth > numberOfMonth) {
            numberOfMonth = numberOfMonth + 12;
            numberOfYears = numberOfYears - 1;
        }
        var days = numberOfDays - birthDay;
        var months = numberOfMonth - birthMonth;
        var years = numberOfYears - birthYear;

        if (birthDate > currentDate) {
            $('label').addClass('invalid');
            $('input').addClass('not-valid');
            $("#year").next().text('Your date must be in the past');
        } else{
            $('.days').text(days+" ");
            $('.months').text(months+" ");
            $('.years').text(years+" ");
            if (years < 2) {
                $('.container__age-years').text("Year");
            } else{
                $('.container__age-years').text("Years");
            }
            if (months < 2) {
                $('.container__age-months').text("Month");
            } else{
                $('.container__age-months').text("Months");
            }
            if (days < 2) {
                $('.container__age-days').text("Day");
            } else{
                $('.container__age-days').text("Days");
            }
        }
    }
}
inputEl.forEach((inputs)=>inputs.addEventListener("change", inputChange));
inputEl.forEach((inputs)=>inputs.addEventListener("input", inputChange));
$('.btn').click(submitRequest);