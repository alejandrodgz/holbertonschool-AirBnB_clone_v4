
$(()=>{
    $('.amenities input').change(function() {
        var days = {};
        $.each($("input:checked"), function(){
          days[$(this).val()] = $(this).attr("name");
        });
        $(".amenities h4").text(Object.values(days).join(", "));
    });
});

$.ajax({
  type: 'GET',
  url: 'http://127.0.0.1:5001/api/v1/status/',
  success: function(input) {
    if(input.status === "OK"){
      $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      };
  }
});
