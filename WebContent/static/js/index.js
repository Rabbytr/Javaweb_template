$(document).ready(function(){
  $('.modal-wrapper').hide();
  //绑定 提问 事件
  $('#putquestion').click(function(){
    $('.modal-wrapper').show();
  });
  $('.modal-wrapper').click(function(e){
    var popup = $(".modal");
    if (!popup.is(e.target) && popup.has(e.target).length == 0) {
      $('.modal-wrapper').hide();
    }
  });
  // end 提问事件代码



});
