// ======================
// FreqHub script.js
// ======================

async function loadCategory(category){

    try{

        const list = await fetch(
            `data/lists/${category}.json`
        ).then(r=>r.json());

        const datas = await Promise.all(

            list.map(async(name)=>{

                const text=
                await fetch(
                    `data/${category}/${name}.csv`
                )
                .then(r=>r.text());

                const lines=text
                .split("\n");

                // 最初のCSV以外はヘッダー削除
                return lines
                    .slice(1)
                    .join("\n");

            })

        );

        return datas.join("\n");

    }

    catch(err){

        console.log(err);

        return "";

    }

}
async function search(){

    result.innerHTML =
    "<p>検索中...</p>";

    const keyword =
    document
    .getElementById("searchBox")
    .value
    .toLowerCase()
    .trim();

    const category =
    document
    .getElementById("categorySelect")
    .value;

    const csv =
    await loadCategory(category);

    const lines =
    csv
    .split("\n")
    .filter(
        line=>line.trim()!=""
    );

    let html="";

    for(let line of lines){

        // ヘッダー行飛ばし
        if(
            line.startsWith("name")
        )
        continue;

        const item =
        line.split(",");

        const joined =
        item
        .join(" ")
        .toLowerCase();

        if(
            joined.includes(keyword)
        ){

            html += createCard(
                category,
                item
            );

        }

    }

    if(html===""){

        html=`
        <div class="card">
        データなし
        </div>
        `;

    }

    result.innerHTML=html;

}


function createCard(category,item){

    // AIR
   if(category==="airport"){

return `
<div class="card">

<h3>${item[0]}</h3>

<p>
周波数:
${item[1]} MHz
</p>

<p>
名称:
${item[2]}
</p>

<p>
種別:
${item[3]}
</p>

</div>
`;
}


    // RADIO
    if(category==="radio"){

        return `
        <div class="card">

        <h3>${item[0]}</h3>

        <p>
        周波数:
        ${item[1]}
        </p>

        <p>
        バンド:
        ${item[2]}
        </p>

        <p>
        地域:
        ${item[3]}
        </p>

        <p>
        コールサイン:
        ${item[5]}
        </p>

        <p>
        系列:
        ${item[6]}
        </p>

        </div>
        `;
    }


    // RAIL
    if(category==="rail"){

        return `
        <div class="card">

        <h3>${item[0]}</h3>

        <p>
        周波数:
        ${item[1]}
        </p>

        <p>
        会社:
        ${item[2]}
        </p>

        </div>
        `;
    }

}

// Enterでも検索
document
.getElementById(
"searchBox"
)
.addEventListener(
"keypress",
function(e){

if(e.key==="Enter"){

search();

}

}
);


// 起動時空表示
result.innerHTML=
`
<div class="card">
上の欄から検索
</div>
`;
