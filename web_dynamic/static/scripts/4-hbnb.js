

let amenities = {};
$(()=>{
  $('.amenities input').change(function() {
      amenities = {};
      $.each($("input:checked"), function(){
        amenities[$(this).val()] = $(this).attr("name");
      });
      $(".amenities h4").text(Object.values(amenities).join(", "));
  });
});

$.ajax({
  method: 'GET',
  url: 'http://127.0.0.1:5001/api/v1/status/',
  success: function(input) {
    if(input.status === "OK"){
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
  success: function(input) {
      $.each(input, function(i, place) {
        $('section.places').append('<article>' +
        '<div class="title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">$' + place.price_by_night + '</div>' +
        '</div>' +
        '<div class="information">' +
          '<div class="max_guest">' + place.max_guest + ' Guest'+ (place.max_guest != 1 ? "s" : "") + '</div>' +
                '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? "s" : "") + '</div>' +
                '<div class="number_bathrooms">' + place.number_bathrooms + " Bathroom" + (place.number_bathrooms != 1 ? "s" : "") + '</div>' + '</div>' +
        '</div>' +
              '<div class="description">' +
          place.description +
              '</div>'+
      '</article>');
    });
  },
});

$(()=>{$('button').click(function() {
$.ajax({
  type: "POST",
  url: 'http://127.0.0.1:5001/api/v1/places_search/',
  data: JSON.stringify({"amenities": Object.keys(amenities)}),
  dataType: 'json',
  contentType: 'application/json',
  success: function(input) {
      $('section.places article').remove();
      $.each(input, function(i, place) {
        $('section.places').append('<article>' +
        '<div class="title_box">' +
          '<h2>' + place.name + '</h2>' +
          '<div class="price_by_night">$' + place.price_by_night + '</div>' +
        '</div>' +
        '<div class="information">' +
          '<div class="max_guest">' + place.max_guest + ' Guest'+ (place.max_guest != 1 ? "s" : "") + '</div>' +
                '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms != 1 ? "s" : "") + '</div>' +
                '<div class="number_bathrooms">' + place.number_bathrooms + " Bathroom" + (place.number_bathrooms != 1 ? "s" : "") + '</div>' + '</div>' +
        '</div>' +
              '<div class="description">' +
          place.description +
              '</div>'+
      '</article>');
    });
  },
})
});
});


  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  