//var ball = document.getElementById('ball');

var elem= document.getElementById('forImage')
var elemImg= elem.getElementsByTagName('img');

function setPosition(elemImg){
    var coords=[];
    //задать начальное позиционирование
    for(var i=0; i<=elemImg.length-1; i++){
       
         coords[i]= getCoords(elemImg[i]);
         elemImg[i].onmousedown = onMouseDown;
            }
            // с обычным циклом работает.
            // а можно ли его через foreach реализовать ?

   for(var j=0; j<=coords.length-1; j++) {
      elemImg[j].style.position='absolute';
     elemImg[j].style.left=coords[j].left+'px';
       elemImg[j].style.top=coords[j].top+'px';
       } 
      
    } 

setPosition(elemImg);
var ball=null;

function onMouseDown(EO) {
    ball=EO.target;
    var coords = getCoords(ball);

    var shiftX = EO.pageX - coords.left;
    var shiftY = EO.pageY - coords.top;

    document.body.appendChild(ball);
    moveAt(EO);

    ball.style.zIndex = 1000; // над другими элементами


  function moveAt(EO) {
    ball.style.left = EO.pageX - shiftX + 'px';
    ball.style.top = EO.pageY - shiftY + 'px';
  }

    document.onmousemove = function(EO) {
      moveAt(EO);
    };
    
     ball.onmouseup = function() { //когда закончилось перетаскивание
    document.onmousemove = null;
    ball.onmouseup = null;
    ball=null;
  };
 }

function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

document.ondragstart = function() {
  return false;
};