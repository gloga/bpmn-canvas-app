function interactions (){
  var eventTriggers = document.querySelectorAll('.element');

  eventTriggers.forEach(function(trigger){
    trigger.addEventListener('click', function(){
      this.classList.toggle('selected');
      getSiblings(this).forEach(function (sibling) {
        sibling.classList.remove('selected');
      });
    });
  });

  var canvas = document.querySelector('canvas');
  canvas.addEventListener('click', function () {
    eventTriggers.forEach(function(trigger){
      trigger.classList.remove('selected');
    });
  });
}
