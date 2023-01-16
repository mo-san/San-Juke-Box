"use strict";(self.webpackChunksan_juke_box=self.webpackChunksan_juke_box||[]).push([[3],{1003:(i,e,t)=>{t.r(e),t.d(e,{default:()=>g});var a=t(2738),o=t(7294),n=t(917),r=t(1649),d=t(5434),c=t(8709),l=t(7297),s=t(8188);const h=(0,o.lazy)((()=>t.e(16).then(t.bind(t,5016)))),p=(0,o.lazy)((()=>Promise.all([t.e(193),t.e(625)]).then(t.bind(t,6625)))),g=({onLangSelectorCLicked:i,toggleFps:e})=>{const[t,g]=(0,o.useState)(!1),v=c.k.getAvailableLanguages();return(0,a.BX)(a.HY,{children:[(0,a.tZ)(o.Suspense,Object.assign({fallback:null},{children:(0,a.BX)(h,Object.assign({onClick:function(){g(!0),l.o.setState({isModalWindowOpen:!0})},corner:"topRight"},{children:[(0,a.tZ)(r.rzH,{title:c.k.config},void 0),c.k.config]}),void 0)}),void 0),(0,a.tZ)(o.Suspense,Object.assign({fallback:null},{children:t&&(0,a.BX)(p,Object.assign({close:function(){g(!1),l.o.setState({isModalWindowOpen:!1})}},{children:[(0,a.BX)("div",{children:[(0,a.BX)("h3",{children:[(0,a.tZ)(d.$lZ,{title:"Change Language"},void 0),"Language"]},void 0),(0,a.tZ)("select",Object.assign({name:"language",id:"language",defaultValue:c.k.getLanguage(),onChange:({currentTarget:e})=>i(e.value)},{children:v.map(((i,e)=>(0,a.tZ)("option",Object.assign({value:i},{children:c.k.getString("language",i)}),e)))}),void 0),(0,a.BX)("h3",{children:[(0,a.tZ)(r.rzH,{title:c.k.config},void 0),c.k.config]},void 0),(0,a.tZ)(s.s,{label:c.k.configFps,checked:!1,onChange:e},void 0),(0,a.BX)("div",Object.assign({css:n.iv`
                  display: grid;
                `},{children:[(0,a.tZ)("p",{children:c.k.configFont},void 0),(0,a.tZ)("select",Object.assign({name:"font",id:"font",defaultValue:l.o.getState().fontName,onChange:({currentTarget:i})=>{l.o.setState({fontName:i.value})}},{children:l.o.getState().fontsGoogle.map(((i,e)=>(0,a.tZ)("option",Object.assign({value:i},{children:i}),e)))}),void 0),(0,a.tZ)("p",{children:(0,a.tZ)("a",Object.assign({href:"https://fonts.google.com/?subset=japanese&preview.text=%E3%83%9E%E3%82%B8%E3%82%AB%E3%83%AB%E3%83%9F%E3%83%A9%E3%82%A4&preview.text_type=custom"},{children:"フォントのプレビュー"}),void 0)},void 0)]}),void 0)]},void 0),(0,a.BX)("h3",{children:[(0,a.tZ)(d.$x8,{title:c.k.about},void 0),c.k.infoCredit]},void 0),(0,a.BX)("ul",{children:[(0,a.BX)("li",{children:["ねんどカイトくん ver.1.00 by maebari via piapro (",(0,a.tZ)("a",Object.assign({href:"https://piapro.jp/t/eO5p"},{children:"https://piapro.jp/t/eO5p"}),void 0),")"]},void 0),(0,a.BX)("li",{children:["ねんどレンくん ver.1.00 by maebari via piapro (",(0,a.tZ)("a",Object.assign({href:"https://piapro.jp/t/hmTb"},{children:"https://piapro.jp/t/hmTb"}),void 0),")"]},void 0),(0,a.BX)("li",{children:["ねんどルカさん ver.1.00 by maebari via piapro (",(0,a.tZ)("a",Object.assign({href:"https://piapro.jp/t/3Kkd"},{children:"https://piapro.jp/t/3Kkd"}),void 0),")"]},void 0),(0,a.BX)("li",{children:["ねんどメイコさん ver.1.00 by maebari via piapro (",(0,a.tZ)("a",Object.assign({href:"https://piapro.jp/t/_gcH"},{children:"https://piapro.jp/t/_gcH"}),void 0),")"]},void 0),(0,a.BX)("li",{children:["ねんどミクさん ver.3.00 by maebari via piapro (",(0,a.tZ)("a",Object.assign({href:"https://piapro.jp/t/wyAD"},{children:"https://piapro.jp/t/wyAD"}),void 0),")"]},void 0),(0,a.BX)("li",{children:["ねんどリンちゃん ver.1.20 by maebari via piapro (",(0,a.tZ)("a",Object.assign({href:"https://piapro.jp/t/0aEn"},{children:"https://piapro.jp/t/0aEn"}),void 0),")"]},void 0),(0,a.BX)("li",{children:["BlockMan by Robert Mark [",(0,a.tZ)("a",Object.assign({href:"(https://creativecommons.org/licenses/by/3.0/)"},{children:"CC-BY"}),void 0),"] via ",(0,a.tZ)("a",Object.assign({href:"https://poly.pizza/m/bHcxXYw8lnl"},{children:"Poly Pizza"}),void 0)]},void 0),(0,a.tZ)("li",{children:(0,a.tZ)("a",Object.assign({href:"https://magicalmirai.com/2021/images/index/logo_main_w.svg"},{children:"「マジカルミライ 2021」ロゴ画像"}),void 0)},void 0),(0,a.BX)("li",{children:["レコード盤イラスト: ",(0,a.tZ)("a",Object.assign({href:"https://www.ac-illust.com/main/detail.php?id=126271"},{children:"Illust AC"}),void 0)]},void 0)]},void 0),(0,a.tZ)("hr",{},void 0),(0,a.BX)("p",{children:[c.k.infoCode,(0,a.tZ)("a",Object.assign({href:"https://github.com/mo-san/San-Juke-Box"},{children:"https://github.com/mo-san/San-Juke-Box"}),void 0)]},void 0)]}),void 0)}),void 0)]},void 0)}},8188:(i,e,t)=>{t.d(e,{s:()=>n});var a=t(2738),o=t(917);const n=({checked:i,onChange:e,label:t})=>{const n="toggle-"+((i=4)=>[...Array(i)].map((()=>"0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(36*Math.random())])).join(""))(4);return(0,a.BX)("div",Object.assign({css:o.iv`
      display: grid;
      grid-template-columns: 1fr auto;
      cursor: pointer;

      & > label {
        cursor: pointer;
      }
    `},{children:[(0,a.tZ)("label",Object.assign({htmlFor:n},{children:t}),void 0),(0,a.tZ)(r,{id:n,checked:i,onChange:e},void 0)]}),void 0)},r=({id:i,checked:e,onChange:t})=>(0,a.BX)("div",Object.assign({className:"toggle-switch",css:o.iv`
        display: inline-block;
        width: 66px;
        height: 30px;
      `},{children:[(0,a.tZ)("input",{type:"checkbox",id:i,checked:e,onChange:t,css:o.iv`
          display: none;

          &:checked + label {
            background-color: #4bd865;
          }

          &:checked + label:after {
            left: 36px;
          }
        `},void 0),(0,a.tZ)("label",{htmlFor:i,css:o.iv`
          width: 60px;
          height: 30px;
          background: #ccc;
          position: relative;
          display: inline-block;
          border-radius: 46px;
          transition: 0.4s;
          cursor: pointer;

          &:after {
            content: "";
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 100%;
            top: 0;
            left: 0;
            background: #fff;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
            transition: 0.2s;
          }
        `},void 0)]}),void 0)}}]);
//# sourceMappingURL=3.chunk.js.map