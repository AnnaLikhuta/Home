  // controller

  function ClockControllerButtons() {
    var myModel = null; // с какой моделью работаем
    var myField = null; // внутри какого элемента DOM наша вёрстка
    var runCheckbox = null; // чекбокс "бег"
    var self=this;

    self.start=function(model,field) {
        myModel=model;
        myField=field;

        var startBt=myField.querySelector('.startBt');
        startBt.addEventListener('click',self.startClock);

        var stopBt=myField.querySelector('.stopBt');
        stopBt.addEventListener('click',self.stopClock);
    }
    self.startClock=function(){
      if(myModel.isStage==2){
        myModel.isStage=1;
        myModel.startTimer();
       // console.log('ha')

      }
    }

    self.stopClock=function(){
      if(myModel.isStage==0 || myModel.isStage==1 ){
        myModel.isStage=2;
        myModel.stopTimer();
        console.log('ha')

      }
    }

}
