"use strict";(self.webpackChunksan_juke_box=self.webpackChunksan_juke_box||[]).push([[696],{6696:(e,i,t)=>{t.r(i),t.d(i,{default:()=>O});var o=t(2738),n=t(7294),r=t(917),a=t(5434),s=t(3049),d=t(8188),c=t(7297),l=t(8709),p=t(5716),g=t(9613),h=t(5155);const m=({selectedIndex:e,choices:i,onChange:t,extraCss:n})=>(0,o.tZ)("div",Object.assign({css:r.iv`
        display: inline-flex;

        & > button {
          display: inline-flex;
          margin: 0;
          padding: 0 1rem;
          height: 2.5rem;
          align-items: center;
          justify-content: center;
          position: relative;
          box-sizing: border-box;
          background-color: transparent;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 1.25rem;
          outline: currentcolor none 0;
          cursor: pointer;
          user-select: none;
          font-size: 0.875rem;
        }

        & > button:not(:last-of-type) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        & > button:not(:first-of-type) {
          margin-left: -1px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        & > button:nth-of-type(${e}) {
          background-color: rgba(75, 216, 101, 0.2);
          color: rgb(0, 89, 16);
          border-color: rgba(0, 0, 0, 0.3);
        }

        ${n}
      `},{children:i.map(((e,i)=>(0,o.tZ)("button",Object.assign({onClick:()=>t(i)},{children:e}),i)))}),void 0),b=({songArr:e,setSongArr:i,sequential:t,setSequential:n,setSelectedSongs:a,playButtonShown:s,setPlayButtonShown:d})=>(0,o.BX)("div",Object.assign({className:"song-select",css:r.iv`
        margin: 3rem 0;

        & > p {
          margin: 0.5rem 0;
        }
      `},{children:[(0,o.BX)("h2",Object.assign({css:r.iv`
          position: relative;
          overflow: hidden;
          padding: 1.5rem 2rem 1.5rem 130px;
          word-break: break-all;
          border-top: 3px solid #000;
          border-radius: 12px 0 0 0;

          & > span {
            font-size: 2rem;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            padding: 3px 20px;
            color: #fff;
            border-radius: 10px 0 20px 10px;
            background: #000;
          }
        `},{children:[(0,o.tZ)("span",{children:"03"},void 0),l.k.songTitle]}),void 0),(0,o.tZ)("p",{children:l.k.song1},void 0),(0,o.BX)("div",Object.assign({css:r.iv`
          display: grid;
          justify-items: center;
          grid-gap: 1rem;
        `},{children:[(0,o.tZ)(m,{selectedIndex:t?2:1,choices:[l.k.songPlayOnce,l.k.songPlaySequential],onChange:e=>n(1===e),extraCss:r.iv`
            margin-left: 36px;
          `},void 0),(0,o.tZ)(g.Container,Object.assign({dragHandleSelector:".drag-handle",lockAxis:"y",onDrop:e=>(({removedIndex:e,addedIndex:i},t)=>{null!==e&&null!==i&&t((t=>{const o=t.splice(e,1)[0];return t.splice(i,0,o),[...t]}))})(e,i)},{children:e.map((({title:i,composer:n,thumbnailUrl:c},l)=>(0,o.tZ)(g.Draggable,{children:(0,o.BX)("div",Object.assign({className:"draggable-item",css:r.iv`
                  display: flex;
                  align-items: center;
                  margin: 0.5rem 0 0.5rem;
                `},{children:[(0,o.tZ)("div",Object.assign({className:"drag-handle",css:r.iv`
                    display: flex;
                    align-items: center;
                    width: 36px;
                    height: 24px;
                    background-color: #f5f5f5;
                    border-radius: 4px;

                    & > svg {
                      width: 100%;
                      height: 1rem;
                    }
                  `},{children:(0,o.tZ)(h.CQm,{},void 0)}),void 0),(0,o.tZ)(u,{title:i,composer:n,thumbnailUrl:c,playButtonShown:s,setPlayButtonShown:d,clickHandler:()=>{a(t?e.slice(l).map((({title:e})=>e)):[i])}},l)]}),void 0)},l)))}),void 0)]}),void 0)]}),void 0),u=({title:e,composer:i,thumbnailUrl:t,clickHandler:a,playButtonShown:s,setPlayButtonShown:d})=>{const c=(0,n.useRef)({});return(0,o.BX)("div",Object.assign({className:"song-item",onClick:()=>{k(c,a,s,d)},onMouseEnter:()=>v(c),onMouseLeave:()=>x(c),css:r.iv`
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
        border-radius: 4px;
        background-color: rgb(255, 255, 255);
        color: rgba(0, 0, 0, 0.87);
        position: relative;
      `},{children:[(0,o.tZ)("div",{className:"record",ref:c,css:r.iv`
          position: absolute;
          width: 320px;
          height: 0;
          top: 0;
          z-index: 1;
          background-image: url("../img/record.png");
          background-size: cover;
          transition: all 0.2s ease-in-out 0s;
        `},void 0),(0,o.tZ)("img",{src:t,alt:`Youtube thumbnail for "${e}"`,draggable:"false",css:r.iv`
          display: block;
          width: 100%;
          max-width: 100%;
          object-fit: cover;
          z-index: 2;
          position: relative;
        `},void 0),(0,o.BX)("div",Object.assign({css:r.iv`
          padding: 1rem;
          position: relative;
          z-index: 2;
          background-color: rgb(255, 255, 255);
        `},{children:[(0,o.tZ)("p",Object.assign({css:r.iv`
            margin: 0 0 0.35em;
            font-size: 1.5rem;
            line-height: 1.3;
            letter-spacing: 0;
          `},{children:e}),void 0),(0,o.tZ)("p",Object.assign({css:r.iv`
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.43;
            color: rgba(0, 0, 0, 0.6);
          `},{children:i}),void 0)]}),void 0)]}),void 0)},v=({current:e})=>{c.o.getState().isTouchDevice||c.o.getState().isSongGridClicked||p.ZP.to(e,{height:320,top:-120,duration:.1,ease:"back.out(1.5)"})},x=({current:e})=>{c.o.getState().isTouchDevice||c.o.getState().isSongGridClicked||p.ZP.to(e,{height:0,top:0,duration:.1})},k=({current:e},i,t,o)=>{c.o.getState().isTouchDevice?(t?p.ZP.to(e,{height:0,top:0,duration:.1}):p.ZP.to(e,{height:320,top:-120,duration:.1,ease:"back.out(1.5)",onComplete:i}),o(!t)):p.ZP.timeline().to(e,{height:320,top:-320,duration:.5,onComplete:i}).set(e,{width:320,height:0,top:0,left:0})},f=[0,320,640,1200].map((e=>`@media (min-width: ${e}px)`)),Z=({onCharaChanged:e})=>(0,o.BX)("div",Object.assign({className:"character-select",css:r.iv`
        margin: 3rem 0;

        & > p {
          margin: 0.5rem 0;
        }
      `},{children:[(0,o.BX)("h2",Object.assign({css:r.iv`
          position: relative;
          overflow: hidden;
          padding: 1.5rem 2rem 1.5rem 130px;
          word-break: break-all;
          border-top: 3px solid #000;
          border-radius: 12px 0 0 0;

          & > span {
            font-size: 2rem;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            padding: 3px 20px;
            color: #fff;
            border-radius: 10px 0 20px 10px;
            background: #000;
          }
        `},{children:[(0,o.tZ)("span",{children:"02"},void 0),l.k.charaTitle]}),void 0),(0,o.tZ)("p",{children:l.k.chara1},void 0),(0,o.tZ)("p",{children:l.k.chara2},void 0),(0,o.tZ)("div",Object.assign({css:r.iv`
          display: grid;
          grid-gap: 1rem;
          margin: 2rem auto;
          justify-content: space-around;

          ${f[0]} {
            grid-template-columns: repeat(1, 1fr);
          }

          ${f[1]} {
            grid-template-columns: repeat(2, 1fr);
            max-width: calc(150px * 2 + 1rem);
          }

          ${f[2]} {
            grid-template-columns: repeat(3, 1fr);
            max-width: calc(150px * 3 + 1rem * 2);
          }
        `},{children:["nendo_miku","nendo_kaito","nendo_meiko","nendo_rin","nendo_len","nendo_luka"].map(((i,t)=>(0,o.BX)("div",Object.assign({className:i,onClick:()=>{c.o.setState({selectedModelNames:[i]}),e()},css:r.iv`
              margin: auto;
              position: relative;
            `},{children:[(0,o.tZ)("img",{src:`../img/${i}.png`,alt:`${i}`,draggable:"false",css:r.iv`
                width: 150px;
                height: 150px;
              `},void 0),c.o.getState().selectedModelNames.includes(i)&&(0,o.tZ)("span",Object.assign({css:r.iv`
                position: absolute;
                inset: auto 0 0 auto;
                font-size: 2rem;
              `},{children:(0,o.tZ)(a.ZSR,{},void 0)}),void 0)]}),t)))}),void 0)]}),void 0),y=(0,n.lazy)((()=>Promise.all([t.e(516),t.e(284)]).then(t.bind(t,1284)))),S=[...s.x].sort((({initialOrder:e},{initialOrder:i})=>e-i)).map((({title:e,composer:i,thumbnailUrl:t})=>({title:e,composer:i,thumbnailUrl:t}))),j=()=>(0,o.tZ)("div",Object.assign({className:"title"},{children:(0,o.tZ)("h1",Object.assign({css:r.iv`
          font-family: "Zen Tokyo Zoo", serif;
          font-size: 10vmin;
          font-weight: normal;
          margin: 0;
        `},{children:"San-Juke Box"}),void 0)}),void 0),w=()=>(0,o.BX)("div",Object.assign({className:"introduction",css:r.iv`
        & > p {
          margin: 0.5rem 0;
        }
      `},{children:[(0,o.tZ)("div",Object.assign({css:r.iv`
          display: grid;
          gap: 0.3rem;
          margin-bottom: 6vmin;

          & > img {
            width: 100%;
            max-width: 300px;
            object-fit: cover;
            margin: auto;
          }
        `},{children:(0,o.tZ)("img",{src:"img/screenshot.jpg",alt:"play demo 1",title:"play demo 1"},void 0)}),void 0),(0,o.tZ)("p",{children:l.k.intro1},void 0),(0,o.tZ)("p",{children:l.k.intro2},void 0),(0,o.tZ)("p",{children:l.k.intro3},void 0),(0,o.tZ)("p",{children:l.k.intro4},void 0),(0,o.BX)("aside",Object.assign({css:r.iv`
          display: flex;
          margin: 1rem 0 0;
          padding: 0.4rem 1rem;
          box-shadow: none;
          border-radius: 4px;
          font-size: 0.88rem;
          color: rgb(1, 67, 97);
          background-color: rgb(229, 246, 253);
        `},{children:[(0,o.tZ)("div",Object.assign({css:r.iv`
            margin-right: 12px;
            padding: 7px 0;
            display: flex;
            font-size: 22px;
            opacity: 0.9;
            color: rgb(3, 169, 244);
          `},{children:(0,o.tZ)(a.eJU,{},void 0)}),void 0),(0,o.BX)("p",Object.assign({css:r.iv`
            margin: 8px 0;
          `},{children:["You can change the language from the button on the top right corner on this page.",(0,o.tZ)("br",{},void 0),"改变语言 / 改變語言 / Changer de langue / Sprache ändern / Ganti BAHASA / 언어 변경 / Tukar bahasa / Mudar idioma / Cambiar idioma / Thay đổi ngôn ngữ"]}),void 0)]}),void 0)]}),void 0),C=({canUseCamera:e,toggleCanUseCamera:i})=>(0,o.BX)("div",Object.assign({className:"notice",css:r.iv`
        margin: 3rem 0;
      `},{children:[(0,o.BX)("h2",Object.assign({css:r.iv`
          position: relative;
          overflow: hidden;
          padding: 1.5rem 2rem 1.5rem 130px;
          word-break: break-all;
          border-top: 3px solid #000;
          border-radius: 12px 0 0 0;

          & > span {
            font-size: 2rem;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            padding: 3px 20px;
            color: #fff;
            border-radius: 10px 0 20px 10px;
            background: #000;
          }
        `},{children:[(0,o.tZ)("span",{children:"01"},void 0),l.k.noticeTitle]}),void 0),(0,o.tZ)("p",{children:l.k.notice1},void 0),(0,o.tZ)("p",{children:l.k.notice2},void 0),(0,o.tZ)("p",{children:l.k.notice3},void 0),(0,o.tZ)("p",{children:l.k.notice4},void 0),(0,o.tZ)("div",Object.assign({css:r.iv`
          margin: 1rem 0;
          border-radius: 10px;
          border: 0.3rem solid rgba(0, 0, 0, 0.7);
          padding: 1rem;
        `},{children:(0,o.tZ)(d.s,{checked:e,onChange:i,label:(0,o.tZ)("span",{children:e?l.k.noticeUseCamera:l.k.noticeNoUseCamera},void 0)},void 0)}),void 0),(0,o.BX)("p",{children:[l.k.notice5a,(0,o.tZ)("b",Object.assign({css:r.iv`
            background: linear-gradient(transparent 50%, yellow);
          `},{children:l.k.notice5b}),void 0),l.k.notice5c]},void 0),(0,o.tZ)("p",{children:l.k.notice6},void 0),(0,o.tZ)("p",{children:l.k.notice7},void 0)]}),void 0),O=({startPlaying:e,appStarted:i})=>{const[t,a]=(0,n.useState)(S),[s,d]=(0,n.useState)(!0),[l,p]=(0,n.useState)(!1),[,g]=(0,n.useState)(!1),[,h]=(0,n.useState)(Math.random()),m=[...new Array(6)].map((()=>(0,n.useRef)())),[u,v]=(0,n.useState)(!1);return(0,n.useEffect)((()=>{const e=()=>document.body.className="";return document.addEventListener("touchend",e,!1),()=>document.removeEventListener("touchend",e,!1)}),[]),(0,o.tZ)("div",Object.assign({className:"container",css:r.iv`
        max-width: 1000px;
        margin: auto;
        padding: 1rem;
        display: ${i?"none":"block"};
      `},{children:(0,o.BX)(n.Suspense,Object.assign({fallback:null},{children:[(0,o.tZ)(j,{},void 0),(0,o.tZ)(w,{},void 0),(0,o.tZ)(C,{canUseCamera:s,toggleCanUseCamera:()=>{const e=!s;d(e),c.o.setState({useCamera:e})}},void 0),(0,o.tZ)(Z,{onCharaChanged:()=>h(Math.random())},void 0),(0,o.tZ)(b,{songArr:t,setSongArr:a,sequential:l,setSequential:p,setSelectedSongs:i=>{c.o.setState({currentSongTitle:i[0],songsQueue:i.slice(1)}),c.o.getState().isTouchDevice?g(!0):e()},refs:m,playButtonShown:u,setPlayButtonShown:v},void 0),(0,o.tZ)(y,{onClick:e,playButtonShown:u},void 0)]}),void 0)}),void 0)}},8188:(e,i,t)=>{t.d(i,{s:()=>r});var o=t(2738),n=t(917);const r=({checked:e,onChange:i,label:t})=>{const r="toggle-"+((e=4)=>[...Array(e)].map((()=>"0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(36*Math.random())])).join(""))(4);return(0,o.BX)("div",Object.assign({css:n.iv`
      display: grid;
      grid-template-columns: 1fr auto;
      cursor: pointer;

      & > label {
        cursor: pointer;
      }
    `},{children:[(0,o.tZ)("label",Object.assign({htmlFor:r},{children:t}),void 0),(0,o.tZ)(a,{id:r,checked:e,onChange:i},void 0)]}),void 0)},a=({id:e,checked:i,onChange:t})=>(0,o.BX)("div",Object.assign({className:"toggle-switch",css:n.iv`
        display: inline-block;
        width: 66px;
        height: 30px;
      `},{children:[(0,o.tZ)("input",{type:"checkbox",id:e,checked:i,onChange:t,css:n.iv`
          display: none;

          &:checked + label {
            background-color: #4bd865;
          }

          &:checked + label:after {
            left: 36px;
          }
        `},void 0),(0,o.tZ)("label",{htmlFor:e,css:n.iv`
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
//# sourceMappingURL=696.chunk.js.map