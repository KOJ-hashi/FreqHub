const data=[

{

name:"鹿児島TWR01",

freq:"118.2",

mode:"AM",

tags:"鹿児島 KOJ RJFK"

},

{

name:"鹿児島APP01",

freq:"126.0",

mode:"AM",

tags:"鹿児島 KOJ RJFK"

},

{

name:"羽田TWR01",

freq:"118.1",

mode:"AM",

tags:"羽田 HND RJTT"

}

];


function searchFreq(){

let word=

document
.getElementById(
"search"
)
.value
.toUpperCase();

let result="";

data.forEach(d=>{

if(

d.tags
.toUpperCase()
.includes(word)

||

d.name
.toUpperCase()
.includes(word)

){

result +=

`
<div>

<h3>${d.name}</h3>

<p>

${d.freq}

${d.mode}

</p>

</div>

<hr>

`;

}

});

if(result===""){

result="見つかりません";

}

document
.getElementById(
"result"
)

.innerHTML=result;

}
