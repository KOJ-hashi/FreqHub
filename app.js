let data=[];

Promise.all([

fetch("data/KOJ.csv").then(r=>r.text()),
fetch("data/HND.csv").then(r=>r.text())

])

.then(files=>{

files.forEach(csv=>{

let rows=csv.trim().split("\n");

let headers=
rows[0]
.split(",")
.map(x=>x.trim());

for(let i=1;i<rows.length;i++){

let values=
rows[i]
.split(",");

let obj={};

headers.forEach((h,index)=>{

obj[h.trim()] =
(values[index]||"").trim();

});

data.push(obj);

}

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

let text=

(d.tags||"")
+(d.name||"");

if(
text.toUpperCase()
.includes(word)
){

result +=`

<h3>${d.name}</h3>

<p>
${d.freq}
${d.mode||""}
</p>

<p>
${d.subcategory||""}
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
