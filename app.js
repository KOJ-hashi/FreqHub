let data=[];

Promise.all([

fetch("data/KOJ.csv").then(r=>r.text()),
fetch("data/HND.csv").then(r=>r.text())

])

.then(files=>{

files.forEach(csv=>{

let rows=
csv
.replace(/\r/g,"")
.trim()
.split("\n");

let headers=
rows[0]
.split(",")
.map(x=>x.trim());

for(let i=1;i<rows.length;i++){

if(!rows[i]) continue;

let values=
rows[i]
.split(",");

let obj={};

headers.forEach((h,index)=>{

obj[h]=
(values[index]||"")
.trim();

});

data.push(obj);

}

});

console.log(data);
console.log(data[0]);

});

function searchFreq(){

let word=
document
.getElementById("search")
.value
.toUpperCase()
.trim();

let result="";

data.forEach(d=>{

let text = `
${d.airport||""}
${d.name||""}
${d.tags||""}
${d.region||""}
`
.toUpperCase();

if(text.includes(word)){

result +=`

<h3>${d.name}</h3>

<p>
${d.freq} ${d.mode}
</p>

<p>
${d.airport}
${d.subcategory}
</p>

<hr>

`;

}

});

document
.getElementById("result")
.innerHTML=

result||"見つかりません";

}
