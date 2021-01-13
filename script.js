$(document).ready(function() {
    
    for (var i = 9; i <18 ; i++) {
        var conversion =  moment(i, 'HH').format('h a')
        $(".container").append(
            '<div id="'+i+'" class="row time-block"><div class="col-md-1 hour">'+conversion+'</div><textarea class="col-md-10 description"></textarea><button class="btn saveBtn col-md-1"><i class="fas fa-piggy-bank"></i></button></div>')
        var text = localStorage.getItem(i);
        $("#"+ i + " .description").val(text)//finding the description HTML element and then setting the value
        }


    // event listener to the save button 
  $(".saveBtn").on("click", function() {

    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    // save in localStorage
    localStorage.setItem(time, value);
    
    
  });

  function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();

    // loop over time blocks
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id"));

      // check if we've moved past this time
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } 
      else if (blockHour === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } 
      else {
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  hourUpdater();

  // determines past or present (every 15 seconds, it will run the function for Hours Updater)
  var interval = setInterval(hourUpdater, 15000);

  // current date 
  $("#currentDay").text(moment().format("[Today is] dddd, MMMM Do YYYY")); 
})