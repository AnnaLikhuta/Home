
  // model

  function ClockModel(city) {
    var self=this; // в таймере this ссылается на свой контекст. через self спасаем
    self.city=city;
      self.objCity={
        'Нью-Йорк':-5,
        'Лондон': 0,
        'Берлин':1,
        'Минск':3,
        'Токио':9,
        'Владивосток':10
      }
      var myView = null;
      self.start=function(view) {
          myView=view;
      }
      // 0 - часы идут
      //1 - нажата кнопка стартю часы идут
      //2 - нажата кнопка стоп. часы не идут
      self.isStage=0;

      self.updateView=function() {
          // при любых изменениях модели попадаем сюда
          // представление может быть любым,
          // лишь бы имело метод update()
          if ( myView )
              myView.update();
      };
self.timeCity=self.objCity[city];
self.timer=function(){
    self.objDate= self.formatDateTime(self.timeCity);
   // self.positionForClock= self.mathPositionClock( self.objDate);
    self.updateView();
  }

     // узнать текущее время
    self.objDate= self.formatDateTime();
    //вызов таймера
    self.timer();

    self.startTimer=function(){
        if(self.isStage==0 || self.isStage==1){
        self.timerId= setInterval(self.timer,100);
        }
      }

      self.startTimer(); 

    // остановить таймер  
    self.stopTimer=function(){
     if(self.isStage==2 ){
      clearInterval(self.timerId);
     }
    }

// end model
  };
  // узнать текущее время
  ClockModel.prototype.formatDateTime= function (a) {
    
   // по Гринвичу
     var dt =new Date();
     
     var year=dt.getUTCFullYear();
     var month=dt.getUTCMonth()+1;
     var day=dt.getUTCDate();
     var hours=dt.getUTCHours()+a;
     var minutes=dt.getUTCMinutes();
     var seconds=dt.getUTCSeconds();
     
    //console.log('ha-ha')
    return {
        countDay: day,          // вернуть объект в цифрах,чтобы использовать для расчета
        countHours: hours,
        countMinutes: minutes,
        countSeconds: seconds,
        countMonths: month,
        countYear: year
        
    }
   
}
