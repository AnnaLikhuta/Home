
var elem= document.getElementById('forImage')
var elemImg= elem.getElementsByTagName('img');
var draggedBall={};

function setPosition(elemImg){ //задать начальное позиционирование
    for(var i=0; i<=elemImg.length-1; i++){
        elemImg[i].style.position='relative';
      
    } 
}
setPosition(elemImg);
var draggedBall={};

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

  



