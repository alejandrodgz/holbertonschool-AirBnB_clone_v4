

let amenities = {};
$(() => {
  $('.amenities input').change(function () {
    amenities = {};
    $.each($("input:checked"), function () {
      amenities[$(this).val()] = $(this).attr("name");
    });
    $(".amenities h4").text(Object.values(amenities).join(", "));
  });
});

let states = {};
$(() => {
  $('.locations h2 input').change(function () {
    states = {};
    $.each($("input:checked"), function () {
      states[$(this).val()] = $(this).attr("name");
    });
    $(".locations h4").text(Object.values(states).join(", "));
  });
});

let cities = {};
$(() => {
  $('.locations .popover ul li ul li').change(function () {
    cities = {};
    $.each($("input:checked"), function () {
      cities[$(this).val()] = $(this).attr("name");
    });
  });
});


$.ajax({
  method: 'GET',
  url: 'http://127.0.0.1:5001/api/v1/status/',
  success: function (input) {
    if (input.status === "OK") {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    };
  }
});

$.ajax({
  type: "POST",
  url: 'http://127.0.0.1:5001/api/v1/places_search/',
  data: JSON.stringify({}),
  dataType: 'json',
  contentType: 'application/json',
  success: function (input) {
    $.each(input, function (i, place) {
      let article = '<article>' +
      '<div class="title_box">' +
      '<h2>' + place.name + '</h2>' +
      '<div class="price_by_night">$' + place.price_by_night + '</div>' +
      '</div>' +
      '<div class="information">' +
      '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? "s" : "") + '</div>' +
      '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? "s" : "") + '</div>' +
      '<div class="number_bathrooms">' + place.number_bathrooms + " Bathroom" + (place.number_bathrooms != 1 ? "s" : "") + '</div>' + '</div>' +
      '</div>' +
      '<div class="description">' +
      place.description +
      '</div>' +
      '<h3>reviews</h3>';
      
      $.ajax({
        type: "GET",
        url: 'http://127.0.0.1:5001/api/v1/places/' + place.id + '/reviews',
        success: function (input) {
          article += "<div class ='reviews_p'>"
          $.each(input, function (j, review) {
            article += '<p>' + review.text + '</p>';
          });
          article += '</div>';
          article += '</article>';
          $('section.places').append(article);
          $('.reviews_p').hide();
        }
      });
    });
  }
});

$(() => {
  $('button').click(function () {
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data: JSON.stringify({
        "amenities": Object.keys(amenities),
        "cities": Object.keys(cities),
        "states": Object.keys(states)
      }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (input) {
        $.each(input, function (i, place) {
          let article = '<article>' +
          '<div class="title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">$' + place.price_by_night + '</div>' +
          '</div>' +
          '<div class="information">' +
          '<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest != 1 ? "s" : "") + '</div>' +
          '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? "s" : "") + '</div>' +
          '<div class="number_bathrooms">' + place.number_bathrooms + " Bathroom" + (place.number_bathrooms != 1 ? "s" : "") + '</div>' + '</div>' +
          '</div>' +
          '<div class="description">' +
          place.description +
          '</div>' +
          '<h3>reviews</h3>';
          
          $.ajax({
            type: "GET",
            url: 'http://127.0.0.1:5001/api/v1/places/' + place.id + '/reviews',
            success: function (input) {
              article += "<div class ='reviews_p'>"
              $.each(input, function (j, review) {
                article += '<p>' + review.text + '</p>';
              });
              article += '</div>';
              article += '</article>';
              $('section.places').append(article);
              $('.reviews_p').hide();
            }
          });
        });
      }
    })
  });
});

$(()=>{$('div.placesh1').on('click','#span_id', function(){
    $(".reviews_p").toggle();
    $(this).text($(this).text() == 'show' ? 'hide' : 'show');
  });
});




















