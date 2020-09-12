'use-strict'
// form elements
let per_page;
let searchText;

// pagination elements
let page;
let maxPage;
let dateFrom;
let dateTo;
let pageBtn = $('.pagination--btn');
let pagination = $('.pagination');
let tabs = $('.tabs');
let tableau = $('.display');
let dates = $('#date');
var url;


// give focus to the input field
$('[name="inputField"]').eq(0).focus();

// search
function search() {
  per_page = $('[name="nbByPage"]').eq(0).val();
  searchText = $('[name="inputField"]').eq(0).val();
  page =$('.pagination--number').eq(0).text();
  // launch search
  url = 'IR4.json';
 /* fetch(url)
    .then(response => response.json())
    .then((response) => {
      maxPage =  response.photos.pages;
      if (maxPage === 0) {
        $('.pagination--number').eq(0).text(0);
      } else {
        $('.pagination--number').eq(0).text(1);
      }*/
    
      document.getElementsByClassName('pagination--total')[0].innerHTML = maxPage;
      pagination.css('display', 'block');
      if(!tabs.hasClass('active')) {
        tabs.toggleClass('active');
      }
      tableau.css('display', 'block');
      if(!dates.hasClass('active')) {
        dates.toggleClass('active');
      }
      let currentUrl;
      // empty list of result
      $('#res').empty();
      $('tbody').eq(0).empty();

      
     
        
        // fetch student details
        fetch(url)
            .then(data =>  data.json())
            .then((data) => {
              var tabStudents = data.students;

               // create all elements
              for (var student in tabStudents) {

                  let cell = $(document.createElement('tr'));
                  cell.addClass('table--row');
                  //cell.append(`<td><img class="table--vignette" alt="" src="https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg"/></td>`);
                  cell.append('<td>' + tabStudents[lastname] + '</td>');
                  cell.append('<td>' + tabStudents[firstname] + '</td>');
                  cell.append('<td>IR4</td>');
                  $('tbody').eq(0).append(cell);
              }
            });
        
        $('#res').append(item);
      
    
}

function clear() {
  $('tbody').eq(0).empty();
  $('#res').empty();
  $('[name="nbByPage"]').eq(0).val('10');
  searchText = $('[name="inputField"]').eq(0).val('');
  pagination.css('display', 'none');
  $('.pagination--number').eq(0).text('1');
  if (tabs.hasClass('active')) {
    tabs.toggleClass('active');
  }
  tableau.css('display', 'none');
  if (dates.hasClass('active')) {
    dates.toggleClass('active');
  }
  dateFrom = undefined;
  dateTo = undefined;
  $('[name="dateFrom"]').val('');
  $('[name="dateTo"]').val('');
}

/*$('[name="dateFrom"]').change((e) => {
  dateFrom = e.target.value;
  if ((dateTo && dateFrom) || (!dateTo && !dateFrom)) {
    search()
  }
});

$('[name="dateTo"]').change((e) => {
  dateTo = e.target.value;
  if ((dateTo && dateFrom) || (!dateTo && !dateFrom)) {
    search();
  }
});
*/
// pagination
$('.form').submit((e) => {
  e.preventDefault();
  search();
});

$('.button__inverted').click((e) => {
  e.preventDefault();
  clear();
});

pageBtn.eq(0).click(() => {
  $('.pagination--number').eq(0).text('1');
  search();
});
pageBtn.eq(1).click(() => {
  page = $('.pagination--number').eq(0).text();
  if (page > 1) {
    page--;
  }
  $('.pagination--number').eq(0).text(page);
  search();
});
pageBtn.eq(2).click(() => {
  page = document.getElementsByClassName('pagination--number')[0].innerHTML;
  if(page < maxPage ) {
    page++;
  }
  $('.pagination--number').eq(0).text(page);
  search();
});

pageBtn.eq(3).click(() => {
  $('.pagination--number').eq(0).text(maxPage);
  search();
});

pageBtn.click(() => {
  search();
});

// auto complete
$("#inputField").autocomplete({
  source : function(requete, reponse){
    fetch(`http://infoweb-ens/~jacquin-c/codePostal/codePostalComplete.php?commune=${$('#inputField').val()}`)
      .then(data => data.json())
      .then((data) => {
        let res = new Array();
        for (let item of data) {
          if (!res.includes(item.Ville)) {
            res.push(item.Ville);
          }
        }
        reponse(res.splice(0, 5));
       })
      .catch(error => console.log(error));
  },
  select: function( event, ui ) {
  },
  minLength: 3,
  maxResults: 5,
}); 

// dialog
/*$('#dialog').dialog({
  autoOpen: false,
  height: 620,
  width: 350,
  modal: true,
});*/

// sort table

function sortColumn(table, column, index) {
  let asc = true;

  if (column.attr('data-sort') === 'true') {
    asc = false;
  }

  column.attr('data-sort', asc.toString());

  table.find('tbody tr')
       .sort((a, b) => {
        const first = $(asc ? a : b);
        const second = $(asc ? b : a);

        return (first.text().toLowerCase() > second.text().toLowerCase());
      })
       .appendTo(table.find('tbody'));
}

const table = $('#table');

table.find('thead tr th:not(:first-child)').each((index, column) =>
  $(column).click(() => sortColumn(table, $(column), index + 1))
);


// tabs

$('.tabs--btn').eq(0).toggleClass('active');
$('[class^="tab-"]').eq(0).toggleClass('active');

$('.tabs--btn').click((e) => {
  if (!$(e.target).hasClass('active')) {
    $('.tabs--btn').toggleClass('active');
    $('[class^="tab-"]').toggleClass('active');
  }
}); 