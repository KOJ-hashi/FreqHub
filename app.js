// ======================
// FreqHub script.js
// ======================

const result = document.getElementById("result");

async function loadCategory(category){

    try{

        // data/lists/airport.json 等を読む
        const list = await fetch(
            `data/lists/${category}.json`
        ).then(r=>r.json());

        // 複数CSVを全部読む
        const datas = await Promise.all(

            list.map(name=>

                fetch(
                    `data/${category}/${name}.csv`
                )
                .then(r=>r.text())

            )
        );

        return datas.join("\n");

    }

    catch(err){

        console.error(
            "読み込みエラー:",
            err
        );

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


function createCard(
    category,
    item
){

    if(category==="radio"){

        return`

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
        種別:
        ${item[4]}
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


    if(category==="airport"){

        return`

        <div class="card">

        <h3>${item[0]}</h3>

        <p>
        周波数:
        ${item[1]}
        </p>

        <p>
        空港:
        ${item[2]}
        </p>

        <p>
        種別:
        ${item[3]}
        </p>

        </div>

        `;
    }


    if(category==="rail"){

        return`

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

    return "";

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
