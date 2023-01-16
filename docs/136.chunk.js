"use strict";(self.webpackChunksan_juke_box=self.webpackChunksan_juke_box||[]).push([[136],{7136:(e,t,i)=>{i.r(t),i.d(t,{default:()=>w});var n,r,o,a,s=i(2738),d=i(7294),l=i(917),u=i(155),c=i(7172),h=i(5716),g=i(3049),p=i(7297),f=function(e,t,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof t?e!==t||!n:!t.has(e))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(e):n?n.value:t.get(e)};class y{constructor(e){this.currentFurigana="",this.queue=[],this.queueFlag=[],this.onAppReady=e=>{if(!e.songUrl){const e=p.o.getState().currentSongTitle,t=g.x.find((t=>t.title===e));this.currentSongData=t,this.player.createFromSongUrl(t.videoUrl,{video:t.video})}},this.onVideoReady=()=>{if(!this.player.video.firstChar)return;const{furigana:e,words:t}=this.currentSongData,i=[];let n=0,r=this.player.video.firstChar;for(;r;)r.index=n,r.letter=r.text,i.push([r.startTime,r]),r=r.next,n+=1;i.forEach((([n,r],o)=>{const a=t.findIndex((e=>e===o)),s=t[a+1]-t[a];r.furigana=e.filter((({position:e})=>t[a]<=e&&e<t[a+1])).map((({text:e})=>e)).join("　");for(let e=1;e<s;e++)r.letter+=i[o+e][1].letter,i[o+e][1].letter=""})),this.queue=i,this.queueFlag=new Array(i.length).fill(!1),p.o.setState({lyricChars:new Map(i)})},this.stop=()=>{this.player.requestStop()},this.seek=e=>{this.player.requestMediaSeek(this.player.video.duration*(e.clientX/e.currentTarget.clientWidth))},this.playOrPause=()=>{this.player.video&&(this.player.isPlaying?this.player.requestPause():this.player.requestPlay())},n.set(this,(async e=>{const t=this.player.findBeat(e);if(!t)return;let i;i="First Note"===p.o.getState().currentSongTitle?Math.round(6e4/t.duration/3):"その心に灯る色は"===p.o.getState().currentSongTitle?Math.round(6e4/t.duration/2):Math.round(6e4/t.duration),i!==this.currentBpm&&(this.currentBpm=i)})),r.set(this,(async e=>{const t=this.player.video.findChar(e);if(!t)return;const i=p.o.getState().lyricChars?.get(t.startTime);i&&(""!==i.letter&&(this.currentLetter=i),i.furigana&&(this.currentFurigana=i.furigana))})),o.set(this,(e=>{const t=p.o.getState().refKonvaLayer;if(!t)return;const i=t.getChildren((t=>t.name()===`Text-${e}`))[0];h.ZP.timeline().set(i,{x:1.2*window.innerWidth,y:1.2*window.innerHeight}).to(i,{x:.8*window.innerWidth,y:.2*window.innerHeight}).to(i,{x:.6*window.innerWidth,y:.33*window.innerHeight,duration:1}).to(i,{y:.5*window.innerHeight,duration:1}).to(i,{y:.8*window.innerHeight,duration:1}).to(i,{y:-100})})),a.set(this,(e=>{if(0===this.queue.length)return;if(1===this.queue.length)return this.queue[0][1].index;let t=0;for(let i=0;i<this.queue.length-1;i++){const n=this.queue[i][1],r=this.queue[i+1][1];if(Math.abs(n.startTime-e)-Math.abs(r.startTime-e)<=0){t=n.index;break}}return this.queueFlag[t]?void 0:(this.queueFlag[t]=!0,t)})),this.onTimeUpdate=e=>{f(this,n,"f").call(this,e),f(this,r,"f").call(this,e);const t=f(this,a,"f").call(this,e);t&&f(this,o,"f").call(this,t)},this.player=new c.J5({app:{token:e},mediaElement:document.querySelector("#media"),mediaBannerPosition:"bottom left"}),this.player.addListener({onAppReady:this.onAppReady,onVideoReady:this.onVideoReady})}}n=new WeakMap,r=new WeakMap,o=new WeakMap,a=new WeakMap;var v=i(5796),m=i(8709);const w=()=>{const[e,t]=(0,d.useState)(!1),[i,n]=(0,d.useState)(!1),[r,o]=(0,d.useState)(Math.random()),a=(0,p.o)((e=>e.isModalWindowOpen)),c=(0,d.useRef)({});return p.o.setState({refTextAlive:c}),(0,d.useEffect)((()=>function(e,t){e.current&&(e.current=void 0);const i=new y(p.o.getState().token);e.current=i,i.player.addListener({onTimerReady:()=>{t(!0)},onTimeUpdate:e=>{(e=>{const t=p.o.getState().selectedModelNames[0];document.querySelector(".seekbar-container").style.backgroundImage=`linear-gradient(90deg, ${p.o.getState().seekBarColors[t]} ${e}%, rgb(240, 240, 240) ${e}%)`})(e/i.player.video.duration*100),i.onTimeUpdate(e)},onPlay:()=>{const{selectedModelNames:e}=p.o.getState();for(const t of e)v.M.findMotion(t,"スクワット").stop(),v.M.findMotion(t,"スクワット").play(),v.M.findMotion(t,"スクワット").fadeIn(1)},onPause:()=>{const{selectedModelNames:e}=p.o.getState();for(const t of e)v.M.findMotion(t,"スクワット").fadeOut(1)},onStop:()=>{const{selectedModelNames:e}=p.o.getState();for(const t of e)v.M.findMotion(t,"スクワット").fadeOut(1);i.currentBpm=void 0,i.currentLetter=void 0,i.currentFurigana=""}})}(c,n)),[r]),(0,s.BX)(s.HY,{children:[(0,s.BX)("div",Object.assign({css:l.iv`
          position: fixed;
          left: 0;
          top: 50%;
          background: rgba(0, 0, 0, 0.8);
          color: rgb(255, 255, 255);
          padding: 10px 16px;
          align-items: center;
        `},{children:[(0,s.BX)("div",{children:["BPM: ",(0,s.tZ)("span",{id:"BPM"},void 0)]},void 0),(0,s.BX)("div",{children:["♪: ",(0,s.tZ)("span",{id:"Letter"},void 0)]},void 0),(0,s.BX)("div",{children:["♫: ",(0,s.tZ)("span",{id:"Furigana"},void 0)]},void 0)]}),void 0),(0,s.BX)("div",Object.assign({className:"player-control",css:l.iv`
          display: ${i?"grid":"none"};
          grid-template-columns: repeat(3, 1fr);
          position: fixed;
          bottom: 5rem;
          left: 0;
          background: rgba(0, 0, 0, 0.8);
          color: rgb(255, 255, 255);
          padding: 1rem;
          align-items: center;

          & button {
            padding: 0.5rem;
            display: block;
            width: 100%;
          }

          & button svg {
            width: 2rem;
            height: 2rem;
          }
        `},{children:[(0,s.tZ)("button",Object.assign({className:"start-pause",onClick:()=>{c.current.playOrPause(),t(!e)}},{children:e?(0,s.BX)(s.HY,{children:[(0,s.tZ)(u.tnh,{},void 0),m.k.pause]},void 0):(0,s.BX)(s.HY,{children:[(0,s.tZ)(u.Z7H,{},void 0),m.k.play]},void 0)}),void 0),(0,s.BX)("button",Object.assign({className:"stop",disabled:!e,onClick:()=>{c.current.stop(),t(!1)}},{children:[(0,s.tZ)(u.Wcw,{},void 0),m.k.stop]}),void 0),(0,s.BX)("button",Object.assign({className:"next",onClick:function(){0!==p.o.getState().songsQueue.length&&(p.o.setState((({songsQueue:e})=>({currentSongTitle:e[0],songsQueue:e.slice(1)}))),t(!1),o(Math.random()))}},{children:[(0,s.tZ)(u.tSz,{},void 0),m.k.next]}),void 0)]}),void 0),(0,s.tZ)("div",{className:"seekbar-container",onClick:c.current.seek,css:l.iv`
          display: ${a?"none":"block"};
          background-color: rgb(240, 240, 240);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          border-radius: 8px;
        `},void 0)]},void 0)}}}]);
//# sourceMappingURL=136.chunk.js.map