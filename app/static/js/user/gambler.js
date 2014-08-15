
(function(){
  'use strict';

  $(document).ready(function(){
    alert('the doc is ready');
    $('.info').click(sellAsset);
  });

  function sellAsset(){
    var id     = $(this).closest('.mainDiv').attr('data-gambler-id'),
        asset =$(this).children('.name').text();
    console.log(id, asset);
  }

})();
