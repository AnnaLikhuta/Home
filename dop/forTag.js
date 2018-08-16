

var wrapH1=buildWrapper('H1');
var wrapP=buildWrapper('P');

var objChar={
    '&':    '&amp;',
    ' –':	'&ndash;',
    '\"':	'&quot;',
    '‹':	'&lsaquo;',
    '›'	: '&rsaquo;',
   '«' :	'&laquo;',
   '»':	'&raquo;',
    '\' \'' :'&ensp;',
    '\'': '&apos;',
    '<'	:'&lt;',
    '>'	:'&gt;',
    '}'	:'&#125;',
    '{':'&#123;'
    
}


 function buildWrapper(tag){

    return function (text){
     text=text.split('');

     for(var i=0; i<=text.length-1; i++){
        if  (  text[i] in objChar){
            text[i]=objChar[text[i]];
        }

     }
      
     text=text.join('');
        return '<'+tag+'> '+text+'</'+tag+'>';
    }



 }

console.log(wrapH1('Вкусные M&M\'s')) ;
//console.log(wrapP('abc')) ;
