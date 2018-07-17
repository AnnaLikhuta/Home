//когда кликаешь  по мячу, то срабатывает mousedown -> dragstart-> dragend
// а вот mouseup  нет. по нему хочу увидеть конечные координаты картинки 
// после перемещения
// кликаешь по пустому участку - есть mousedown->  mouseup
// пол логике должно получаться,только вот не получется 



var elem= document.getElementById('forImage')
var elemImg= elem.getElementsByTagName('img');
var draggedBall={};

function setPosition(elemImg){ //задать начальное позиционирование
    for(var i=0; i<=elemImg.length-1; i++){
        elemImg[i].style.position='relative';
      
    } 
}
setPosition(elemImg);


document.addEventListener('mouseup',mouseUp,false )
document.addEventListener('mousedown',mouseDown,false )
document.addEventListener('dragstart',dragStart, false )
document.addEventListener('dragend', dragEnd,false)
document.ondragover=dragOver; 

document.body.addEventListener('drop', function (EO) {
       EO.preventDefault();
});



function dragStart(EO){
    EO=EO||window.event;
   // EO.preventDefault();
     console.log('dragStart');
  draggedBall.target=EO.target;

}

function dragEnd(EO){
    EO=EO||window.event;
   EO.preventDefault();
      console.log('dragEnd ');
   // console.log(draggedBall);
    /* EO.target.style.left=draggedBall.coordinX+'px';
    EO.target.style.top=draggedBall.coordinY+'px';*/
   elem.appendChild(draggedBall.target); 

}

function dragOver(EO){
    EO=EO||window.event;
    EO.preventDefault();
    
}


function mouseDown (EO){ // при нажатии кнопки мыши
    EO=EO||window.event;
    //EO.preventDefault();
    //запомнить смещение относительно нажатия на картинку
   draggedBall.coordinX=EO.clientX;
   draggedBall.coordinY=EO.clientY;
    console.log('нажатии мыши')
    console.log(draggedBall);

}

function mouseUp(EO){ //отпускание кнопки мыши
    EO=EO||window.event;
    //EO.preventDefault();
    console.log('отпускание мыши')
    console.log(draggedBall)
    

}
-----------------------------------------------------
  
// вторая попытка реализации

var elem= document.getElementById('forImage')
var elemImg= elem.getElementsByTagName('img');

function setPosition(elemImg){ //задать начальное позиционирование
    for(var i=0; i<=elemImg.length-1; i++){
        elemImg[i].style.position='relative';
       // elemImg[i].onmousedown= onMouseDown    
    } 
}
setPosition(elemImg);
var draggedBall={};
document.addEventListener('mousedown', onMouseDown, false);

document.addEventListener('mouseup', onMouseUp, false);
document.addEventListener('mousemove', onMouseMove, false);


function onMouseDown(EO){
    EO=EO||window.event;
    draggedBall={}
    draggedBall.target=EO.target;
 
     draggedBall.shiftX= EO.pageX-getCoords(draggedBall.target).left;
     draggedBall.shiftY= EO.pageY-getCoords(draggedBall.target).top;
          console.log( draggedBall)
         // draggedBall.target.style.position = 'fixed';
         elem.appendChild( draggedBall.target);
         onMouseMove(EO);
         return draggedBall;
}

function onMouseMove(EO){
    EO=EO||window.event;
    console.log( draggedBall);
   // EO.preventDefault();
  // console.log( draggedBall)
   // draggedBall.target.style.left= EO.pageX-draggedBall.shiftX+ 'px';
  //  draggedBall.target.style.top= EO.pageY-draggedBall.shiftY+ 'px';
  EO.target.style.left= EO.pageX-draggedBall.shiftX+ 'px';
  EO.target.style.top= EO.pageY-draggedBall.shiftY+ 'px';
}

function onMouseUp(EO){
    EO=EO||window.event;
   
    draggedBall={};
    document.onmousemove=null;
    document.onmouseup=null;
   //document.removeEventListener('mousemove', onMouseMove, false);
  // document.removeEventListener('mouseup', onMouseUp, false);
   

}


function getCoords(elem) {   // кроме IE8-
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
  
  


