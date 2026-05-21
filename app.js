let data=[];

Promise.all([

fetch("data/KOJ.csv")
.then(r=>r.text()),

fetch("data/HND.csv")
.then(r=>r.text())

])

.then(files=>{

files.forEach(csv=>{

let rows=csv.split("\n");

rows.shift();

rows.forEach(row=>{

let c=row.split(",");

data.push({

name:c[0],

freq:c[1],

category:c[2],

subcategory:c[3],

mode:c[4],

region:c[5],

tags:c[6]

});

});

});

});


function searchFreq(){

let word=
document
.getElementById(
"search"
).value;

let html="";

data.forEach(d=>{

if(

d.tags.includes(word)

||

d.name.includes(word)

){

html+=`

<hr>

${d.name}

<br>

${d.freq}

${d.mode}

`;

}

});

document
.getElementById(
"result"
)

.innerHTML=html;

}
