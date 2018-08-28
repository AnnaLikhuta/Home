
var  buttElem=document.getElementById('buttElem');
window.onload=restoreInfo;
var aa;
var bb;


var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='LIKHUTA_DYN_FORM_AJAX';


function updateReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
}

function restoreInfo() {
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );
}

function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error); 
    else if ( callresult.result!="" ) {
        var info=JSON.parse(callresult.result); 
          aa=info.arr1;
          bb=info.arr2;
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}


// запуск конструктора формы
buttElem.onclick=function(){
  createForm(aa);
  createForm(bb);
  
}

var i=0; // глобальный счетчик для формы
function createForm (forForm){  

function createFormBasic (){ //создать форму основу

  var elemForm= document.createElement('form');
        var nameForm='nameForm'+i+'';
         elemForm.name=nameForm;
         document.body.appendChild(elemForm);
         i++; 
         return nameForm;
}
var nameForm =createFormBasic();

function getFormElem(obj){ // перебираем элементы  вызываем нужную функцию
  var objLabel;
  var objName;
  var objVariant;
for (var i=0; i<=obj.length-1; i++){
objLabel= obj[i].label;
objName = obj[i].name;

switch (obj[i].kind){
  case 'longtext':{
     forLongtextElem (objLabel, objName);
    break;
  }
  case 'number':{
    forNumberElem(objLabel, objName);
    break;
  }
  case 'shorttext':{
    forEmailElem(objLabel, objName);
    break;

  }
  case 'combo':{
    objVariant = obj[i].variants; 
  forComboElem(objLabel, objVariant);
    break;
  }
  case 'radio':{
    objVariant = obj[i].variants;
    forRadioElem(objLabel, objVariant);
    break;
  }
  case 'check':{
    forCheckElem(objLabel, objName);
    break;
  }
  case 'memo':{
    forMemoElem(objLabel, objName);
    break;

  }
  case 'submit' :{
    forSubmit(objLabel);
    break;
  }
  
  
  default: break;
}

}

}





function abc(label){ // создать label, input
  var elemInput = document.createElement('input');
  var elemLabel = document.createElement('label');
  elemLabel.appendChild( document.createTextNode(' '+ label+'' ));  // здесь для текста доcтуп
  var elem = document.createElement('p');
  elem.appendChild(elemLabel).appendChild(elemInput);
  document[nameForm].appendChild(elem);
  return elemInput;

}
 function forLongtextElem (label, name){
  var elemInput = abc(label);
    elemInput.name=name;
    elemInput.type='text';

 }

 function forNumberElem(label, name){
  var elemInput = abc(label);
  elemInput.name=name;
  elemInput.type='number';
  elemInput.min='0';
  }
  function forEmailElem(label, name){ 
    var elemInput = abc(label);
    elemInput.name=name;
    elemInput.type='email';

  }


 function forComboElem (label, arrVar){
   
   //console.log(arrVar);
   var selectElem = document.createElement('select');
    var labelElem = document.createElement('label');
    var optionElem;
    labelElem.appendChild(document.createTextNode(label));
    for(var i=0; i<=arrVar.length-1; i++){  
      
     optionElem = document.createElement('option');
     optionElem.value=i+1;
    
    optionElem.appendChild(document.createTextNode(arrVar[i].text));
    labelElem.appendChild(selectElem).appendChild(optionElem);
    
    }
     document[nameForm].appendChild(labelElem);

   // document.getElementById('elemForm').appendChild(labelElem);

 }

 function forRadioElem(label, arrVar){
  var elemInput;
  var spanElem;
  var elemLabel = document.createElement('label');
  elemLabel.appendChild( document.createTextNode(label));  // здесь для текста доcтуп
  
  for( var i=0; i<=arrVar.length-1; i++){
    elemInput = document.createElement('input')
    elemInput.type='radio';
    elemInput.name='abc';
    elemInput.value=i+1;
    spanElem = document.createElement('span');
  spanElem.appendChild(document.createTextNode(arrVar[i].text));
  
  elemLabel.appendChild(elemInput);
  elemLabel.appendChild(spanElem);
  }
  var elem = document.createElement('p');
  elem.appendChild(elemLabel);
  document[nameForm].appendChild(elem);

  }

  function forCheckElem(label, name){
    var elemInput = abc(label);
    elemInput.name=name;
    elemInput.type='checkbox';

  }

  function forMemoElem(label, name){
    var elemInput = document.createElement('textarea');
    var elemLabel = document.createElement('label');
    elemLabel.appendChild( document.createTextNode(label));  // здесь для текста доcтуп
    var elem = document.createElement('p');
    elem.appendChild(elemLabel).appendChild(elemInput);
    document[nameForm].appendChild(elem);
    elemInput.name=name;
    

  }

  function forSubmit (label){
    var elemInput = abc(label);
    elemInput.type='submit';
   

  }
 
  getFormElem(forForm);


}
