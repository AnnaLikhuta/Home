 //описать константы
 
 
 var mainArea=document.createElement('div');

var buttonStart=document.createElement('input');
buttonStart.type='button'
buttonStart.value='ПУСК';
buttonStart.style.marginLeft='20px';
mainArea.appendChild(buttonStart);



var countElem=document.createElement('div');
countElem.style.display='inline-block';
countElem.style.marginLeft='15px'
countElem.style.width='400px';
countElem.style.textAlign='center';


var leftScore=document.createElement('span');
leftScore.id='leftScore';
leftScore.style.textAlign='center';

var rightScore=document.createElement('span');
rightScore.id='rightScore';


countElem.appendChild(leftScore);
var text=document.createTextNode('text node');
countElem.appendChild(text);
countElem.appendChild(rightScore);
mainArea.appendChild(countElem)


var gameField=document.createElement('div');
gameField.id='gameField';
gameField.style.height='300px';
gameField.style.width='500px';
gameField.style.backgroundColor='aqua';
gameField.style.margin='20px';
gameField.style.position='relative';
mainArea.appendChild(gameField);

var ball=document.createElement('div');
ball.id='ball';
ball.style.width='40px';
ball.style.height='40px';
ball.style.borderRadius='50%';
ball.style.borderColor='black';
ball.style.backgroundColor='magenta';
ball.style.position='absolute';
ball.style.left='50%'
ball.style.bottom='50%'
gameField.appendChild(ball);

var leftRacket=document.createElement('div');
leftRacket.id='leftRacket';
leftRacket.style.width='10px';
leftRacket.style.height='80px';
leftRacket.style.borderColor='black';
leftRacket.style.backgroundColor='yellow';
leftRacket.style.position='absolute';
leftRacket.style.left='0%'
leftRacket.style.bottom='50%'
gameField.appendChild(leftRacket);

var rightRacket=document.createElement('div');
rightRacket.id='rightRacket';
rightRacket.style.width='10px';
rightRacket.style.height='80px';
//rightRacket.style.border='1px solid black';
rightRacket.style.backgroundColor='green';
rightRacket.style.position='absolute';
rightRacket.style.right='0%'
rightRacket.style.bottom='50%'
gameField.appendChild(rightRacket);


document.body.appendChild(mainArea)


//движение мяча





//движение  боковых панелей




//система подсчета очков




// остановить мяч


// запуск