
(function(){
  'use strict';

  $(document).ready(function(){
    alert('the doc is ready');
    $('.info').click(sellAsset);
  });

  function sellAsset(){
    //debugger;
    var id     = $(this).closest('.mainDiv').attr('data-gambler-id'),
        asset =$(this).children('.name').text(),
        type   = 'delete',
        url    ='/gamblers/' + id + '/assets/' + name;

    console.log(id, asset);

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $gambler = $('.mainDiv[data-gambler-id='+ data.id + ']'),
          $asset = $('.name:contains(' + data.name + ')').closest('assests');
      $gambler.find('.cash').text('$' + data.cash.toFixed(2));
      if(data.isDivorced){
        $gambler.find('.spouse').addClass('divorce').text('divorced');
      }
      console.log($asset);
      $asset.fadeOut(1000);
    }});
  }

})();
