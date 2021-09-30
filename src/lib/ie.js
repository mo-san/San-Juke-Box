var userAgent = window.navigator.userAgent.toLowerCase();

if (userAgent.indexOf("msie") !== -1 || userAgent.indexOf("trident") !== -1) {
  document.getElementById("ie").insertAdjacentHTML("afterbegin",
"<p>お越しいただきありがとうございます。このメッセージが表示されているということは、 Internet Explorer (インターネット エクスプローラー) というブラウザソフトでご覧になっているようです。</p>"
  + "<p>誠に申し訳ございませんが、このソフトは、このウェブサイトを表示するのに必要な機能を満たしていないため、 保証対象外とさせていただきます。</p>"
  + "<p>代わりに、 後継ソフトかつウィンドウズ標準搭載である、Microsoft Edge (マイクロソフト エッジ) で開き直すか、 あるいは他社製品の Google Chrome (グーグル クローム) などをお使いいただくようお願い申し上げます。</p>"
  + "<p><a id='edge' href=''>Microsoft Edge で開き直す</a></p>"
  + "<p><a href='https://www.google.com/intl/ja_jp/chrome/'>Google Chrome の製品ページ</a></p>"
  );
  document.getElementById("ie").style.display = "block";
  document.getElementById("edge").setAttribute("href", "microsoft-edge:" + location.href);
}
