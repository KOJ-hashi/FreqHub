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

if(!row.trim()) return;

let c=row.split(",");

data.push({

name:c[0] || "",

freq:c[1] || "",

category:c[2] || "",

subcategory:c[3] || "",

mode:c[4] || "",

region:c[5] || "",

tags:c[6] || ""

});

});

});

console.log(data);

});


function searchFreq(){

let word=

document
.getElementById("search")
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

result +=`

<div>

<h3>${d.name}</h3>

<p>

${d.freq}

${d.mode}

</p>

<small>

${d.subcategory}

</small>

</div>

<hr>

`;

}

});

if(result===""){

result="見つかりません";

}

document
.getElementById("result")
.innerHTML=result;

}
