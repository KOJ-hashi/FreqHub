let data=[];

async function loadCSV(file){

const response =
await fetch(file);

const buffer =
await response.arrayBuffer();

const decoder =
new TextDecoder("utf-8");

const text =
decoder.decode(buffer);

return text;

}

Promise.all([

loadCSV("data/KOJ.csv"),
loadCSV("data/HND.csv")

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
rows[i].split(",");

let obj={};

headers.forEach((h,index)=>{

obj[h]=
(values[index]||"")
.trim();

});

data.push(obj);

}

});

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
Object.values(d)
.join(" ")
.toUpperCase();

if(text.includes(word)){

result += `

<h3>${d.name}</h3>

<p>

${d.freq}
${d.mode}

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
.getElementById(
"result"
).innerHTML=

result||"見つかりません";

}
