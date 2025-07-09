const board = document.getElementById('game-board');
const resultarea = document.getElementById('result-area');
const firstButton = document.getElementById('first-button');

const tarot = {
    '世界':['「達成」や「完成」を意味するカード<br>これまで頑張ってきたことが実を結び、<br>さらなる高みへ進む道しるべとなる',
           '「達成」や「完成」を意味するカード<br>想い人との関係はとても良好で、<br>心の距離はさらに縮まるだろう',
           '「達成」や「完成」を意味するカード<br>一日を通して満足感を得られそう<br>いい結果や評価が得られやすい日<br>自然体で過ごすことで運が味方する'
           ], 
    '死神':['「終わり」と「始まり」を意味するカード<br>古い感情を手放すことで<br>新たな人間関係が築ける！<br>今は再スタートの時です',
            '「終わり」と「始まり」を意味するカード<br>思い切った挑戦が可能に！<br>失敗や悪習慣を断ち切ろう！',
           '「終わり」と「始まり」を意味するカード<br>執着を手放すと吉！<br>思い切った選択や切り替えに最適な一日に！'
        ], 
    '運命の輪':['「チャンス」や「流れの変化」を表すカード<br>偶然の出会いで一気に流れが良いほうに！<br>長いものには巻かれましょう',
               '「チャンス」や「流れの変化」を表すカード<br>チャンスが訪れるタイミング！<br>予期せぬきっかけで道が開けるでしょう',
               '「チャンス」や「流れの変化」を表すカード<br>思わぬラッキーやチャンスが舞い込む可能性大！<br>直感で生きる一日を！'
            ], 
    '星':['「希望」や「癒し」を象徴するカード<br>希望を持ち相手を信じることが大切',
          '「希望」や「癒し」を象徴するカード<br>目標を信じて努力を続ければ、確実に近づける',
          '「希望」や「癒し」を象徴するカード<br>穏やかで希望に満ちた一日に！<br>自然と前向きになりそう'
        ],
    '月':['「不安」や「幻想」、「誤解」を象徴するカード<br>誤解や感情の不一致で不安が生まれやすいかも<br>決めつけずに丁寧な対話を心がけて！',
          '「不安」や「幻想」、「誤解」を象徴するカード<br>見えないリスクが潜んでいる可能性<br>計画と情報収集を忘れずに',
          '「不安」や「幻想」、「誤解」を象徴するカード<br>感情の波に流れやすい日。自分の気持ちに素直に'
        ],
    '教皇':['「伝統」や「信頼」「道徳」を意味するカード<br>信頼できる相手の助言が関係改善のヒントに！<br>大事な人の言葉に耳を傾けて',
            '「伝統」や「信頼」「道徳」を意味するカード<br>無理せず地道な行動が成功のカギに！',
            '「伝統」や「信頼」「道徳」を意味するカード<br>落ち着きと誠実さが評価される日！<br>丁寧さが重要です'
        ],
    '魔術師':['「創造力」や「チャンスの到来」のカード<br>コミュニケーション能力が高まり相手との距離が縮まるでしょう！自分からどんどん話しかけよう',
            '「創造力」や「チャンスの到来」のカード<br>アイデアと行動がうまくかみ合い物事が順調に<br>スタート！今が行動の時です',
            '「創造力」や「チャンスの到来」のカード<br>やる気に満ちた行動がツキを呼ぶ！<br>チャレンジ精神を忘れずに'
        ],
    '恋人':['「選択」や「心の結びつき」を表すカード<br>心がつながる瞬間が訪れるかも！<br>本音で向き合うのが良い関係への第一歩に',
            '「選択」や「心の結びつき」を表すカード<br>自分の「好き」が道を開く！<br>情熱と直感を信じよう',
            '「選択」や「心の結びつき」を表すカード<br>素直な出会いがありそうな日。<br>人とかかわる時間を大切に'
        ]
};
let cards = [];
let lock = false;

// シャッフル関数
function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame(levelData){
    board.innerHTML = "";              // 画面クリア
    cards = [...levelData];            // 占いカードをセット
    shuffle(cards);                    // シャッフル
    lock = false;

    // カードを1枚ずつ作成
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = '❓';        // 裏面にしておく
        card.dataset.emoji = emoji;
        card.dataset.index = index;

        card.addEventListener('click', () => {
            if (lock) return;
            lock = true;               // 一度だけめくれるようにする

            card.textContent = emoji; // 表にする

            // 他のカードを全て非表示にする（占いは1回きり）
            setTimeout(() => {
                resultarea.innerHTML = "";
                const result = document.createElement('h3');
                result.textContent = `あなたの運命は…『${emoji}』！`;
                const means = tarot[emoji];
                const randomIndex = Math.floor(Math.random()*means.length);
                const mean = means[randomIndex];

                const resultText = document.createElement('p');
                resultText.innerHTML = mean;
                
                resultarea.appendChild(result);
                resultarea.appendChild(resultText);
            }, 1000);
        });

        board.appendChild(card);
    });
}

// ボタンを押したら占い開始
firstButton.addEventListener("click", () => {
    startGame(Object.keys(tarot));
});
