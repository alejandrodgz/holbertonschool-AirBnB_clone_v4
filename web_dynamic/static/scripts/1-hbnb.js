$(()=>{
    $('.amenities input').change(function() {
        var days = {};
        $.each($("input:checked"), function(){
          days[$(this).val()] = $(this).attr("name");
        });
        $(".amenities h4").text(Object.values(days).join(", "));
    });
});
