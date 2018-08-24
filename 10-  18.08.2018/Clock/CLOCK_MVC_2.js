
  // настройка, инициализация первого комплекта

  // создаём все три компонента
  
  var clock1=new ClockModel('Нью-Йорк');
  var view1=new ClockViewWebPage();
  var controller1=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem1=document.getElementById('Clock1Container');
  clock1.start(view1);
  view1.start(clock1,containerElem1);
  controller1.start(clock1,containerElem1);

  // инициируем первичное отображение Model во View

  clock1.updateView();



    // настройка, второй

  // создаём все три компонента
  var clock2=new ClockModel('Лондон');
  var view2=new ClockViewWebPage();
  var controller2=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem2=document.getElementById('Clock2Container');
  clock2.start(view2);
  view2.start(clock2,containerElem2);
  controller2.start(clock2,containerElem2);

  // инициируем первичное отображение Model во View
  clock2.updateView();

      // настройка, третий

  // создаём все три компонента
  var clock3=new ClockModel('Берлин');
  var view3=new ClockViewSVGPage();
  var controller3=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem3=document.getElementById('Clock3Container');
  clock3.start(view3);
  view3.start(clock3,containerElem3);
  controller3.start(clock3,containerElem3);

  // инициируем первичное отображение Model во View
  clock3.updateView();


      // настройка, четвертый

  // создаём все три компонента
  var clock4=new ClockModel('Минск');
  var view4=new ClockViewSVGPage();
  var controller4=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem4=document.getElementById('Clock4Container');
  clock4.start(view4);
  view4.start(clock4,containerElem4);
  controller4.start(clock4,containerElem4);

  // инициируем первичное отображение Model во View
  clock4.updateView();


        // настройка, пятый
      
  // создаём все три компонента
  var clock5=new ClockModel('Токио');
  var view5=new ClockViewCanvasPage();
  var controller5=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem5=document.getElementById('Clock5Container');
  clock5.start(view5);
  view5.start(clock5,containerElem5);
  controller5.start(clock5,containerElem5);

  // инициируем первичное отображение Model во View
  clock5.updateView();

        // настройка, шестой
        
  // создаём все три компонента
  var clock6=new ClockModel('Владивосток');
  var view6=new ClockViewCanvasPage();
  var controller6=new ClockControllerButtons();

  // увязываем компоненты друг с другом
  // указываем компонентам, в каком DOM им работать
  var containerElem6=document.getElementById('Clock6Container');
  clock6.start(view6);
  view6.start(clock6,containerElem6);
  controller6.start(clock6,containerElem6);

  // инициируем первичное отображение Model во View
  clock6.updateView();

  
