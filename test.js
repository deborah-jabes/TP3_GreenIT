// Variable to hold the students
var dataArr = {};
// Load the students once, on page-load.
$(function() { 
    $.getJSON("IR4.json").done(function(data) {
        window.dataArr = data.pages;
    }).fail(function(data) {
        console.log('no results found');
    });
});
// Respond to any input change, and show first few matches
$("#search").on('keypress keyup change input', function() { 
    var arrival = $(this).val().toLowerCase();
    $('#matches').text(!arrival.length ? '' : 
        dataArr.filter(function(place) {
            // look for the entry with a matching `code` value
            return (place.title.toLowerCase().indexOf(arrival) !== -1);
        }).map(function(place) {
            // get titles of matches
            return students[firstname];
        }).join('\n')); // create one text with a line per matched title
});
// submit button is not needed really