import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";

export interface LocaleStrings extends LocalizedStringsMethods {
  language: string;
  about: string;
  config: string;

  intro1: string;
  intro2: string;
  intro3: string;
  intro4: string;
  intro5: string;

  noticeTitle: string;
  notice1: string;
  notice2: string;
  notice3: string;
  notice4: string;
  noticeUseCamera: string;
  noticeNoUseCamera: string;
  notice5a: string;
  notice5b: string;
  notice5c: string;
  notice6: string;
  notice7: string;

  charaTitle: string;
  chara1: string;
  chara2: string;

  songTitle: string;
  song1: string;
  songPlayOnce: string;
  songPlaySequential: string;

  home: string;
  play: string;
  pause: string;
  stop: string;
  next: string;

  configFps: string;
  configFont: string;
  infoCredit: string;
  infoCode: string;
}

export const locales: LocaleStrings = new LocalizedStrings({
  zhcn: {
    language: "中文(簡体) (Chinese Simplified)",
    about: "关于这个应用程序",
    config: "设置",

    intro1: "这是一个有Vocaloid人物为你唱歌的点唱机。",
    intro2: "选择一首需要的歌曲，角色就会唱歌。",
    intro3: "准备好你的相机，在屏幕前挥动你的手。",
    intro4: "握住你的手，一个笔电就会出来。",
    intro5: "你挥舞得越多，效果可能就越华丽。",

    noticeTitle: "你使用相机吗？",
    notice1: "这个应用程序也可以使用相机图像来享受。 但由于某些原因，它在Chrome中不起作用。 它在刚开发出来的时候曾经是有效的。 然而，我们已经确认，它在火狐浏览器中是有效的。",
    notice2: "这些图像只在设备中处理，不会被发送到外部世界。",
    notice3: "根据你所使用的设备，图像识别过程可能非常缓慢。",
    notice4: "如果是这种情况，请取消勾选下面的方框。 相反，你可以用鼠标或触摸来挥舞笔灯。",
    noticeUseCamera: "使用相机",
    noticeNoUseCamera: "请勿使用相机",
    notice5a: "如果你可以选择相机的分辨率，请使用分辨率尽可能",
    notice5b: "低",
    notice5c: "的相机。 这将极大地提高处理速度。",
    notice6: "例如，在我的环境中，全高清（1920x1080）的速度只有7fps，1280x720的速度是15fps（约2倍），640x480的速度是20fps（约3倍）。",
    notice7: "除了速度加快之外，当房间很亮并且你站在一个普通的背景前时，识别的准确性会好一些。",

    charaTitle: "你想让谁来为你唱歌？",
    chara1: "* 如果你改变了角色，声音就不会改变。",
    chara2: "** 请左右摇晃灯光。如果你来回摇晃它，它将不能被正确识别。",

    songTitle: "你想让我唱什么？",
    song1: "点击你想听的歌曲。 你也可以从那里连续播放歌曲。 你可以通过轻击左边的旋钮重新安排歌曲的顺序。",
    songPlayOnce: "播放一首歌曲",
    songPlaySequential: "连续播放",

    home: "顶页",
    play: "再生",
    pause: "暂停",
    stop: "停止",
    next: "下一首歌",

    configFps: "显示FPS",
    configFont: "字体",
    infoCredit: "使用的材料",
    infoCode: "源代码可以在Github上找到。",
  },

  zhtw: {
    language: "中文(繁体) (Chinese Traditional)",
    about: "關於這個應用",
    config: "配置",

    intro1: "這是一個有Vocaloid人物爲你唱歌的點唱機。",
    intro2: "選擇一首需要的歌曲，角色就會唱歌。",
    intro3: "準備好你的相機，在屏幕前揮動你的手。",
    intro4: "握住你的手，一個筆電就會出來。",
    intro5: "你揮舞得越多，效果可能就越華麗。",

    noticeTitle: "你使用相機嗎？",
    notice1: "這個應用程序也可以使用相機圖像來享受。 但由於某些原因，它在Chrome中不起作用。 它在剛開發出來的時候曾經是有效的。 然而，我們已經確認，它在火狐瀏覽器中是有效的。",
    notice2: "這些圖像只在設備中處理，不會被髮送到外部世界。",
    notice3: "根據你所使用的設備，圖像識別過程可能非常緩慢。",
    notice4: "如果是這種情況，請取消勾選下面的方框。 相反，你可以用鼠標或觸摸來揮舞筆燈。",
    noticeUseCamera: "使用相機",
    noticeNoUseCamera: "請勿使用相機",
    notice5a: "如果你可以選擇相機的分辨率，請使用分辨率儘可能",
    notice5b: "低",
    notice5c: "的相機。 這將極大地提高處理速度。",
    notice6: "作為參考，在作者的環境下，全高清（1920x1080）的速度只有7fps，但1280x720是15fps（快2倍），640x480是20fps（快3倍）。",
    notice7: "除了速度加快之外，當房間很亮並且你站在一個普通的背景前時，識別的準確性會好一些。",

    charaTitle: "你想讓誰來爲你唱歌？",
    chara1: "* 如果你改變了角色，聲音就不會改變。",
    chara2: "** 請左右搖晃燈光。如果你來回搖晃它，它將不能被正確識別。",

    songTitle: "你想讓我唱什麼？",
    song1: "單擊（點按）您要收聽的歌曲。您也可以從那首歌曲連續播放。可以使用左側的旋鈕對歌曲順序進行排序。",
    songPlayOnce: "播放一首歌曲",
    songPlaySequential: "連續播放",

    home: "頂頁",
    play: "再生",
    pause: "暫停",
    stop: "停止",
    next: "下一首歌",

    configFps: "顯示FPS",
    configFont: "字體",
    infoCredit: "使用的材料",
    infoCode: "源代碼可以在Github上找到。",
  },

  en: {
    language: "English",
    about: "About this App",
    config: "Config",

    intro1: "This is a jukebox with Vocaloid characters singing for you.",
    intro2: "Select a song to request and the character will sing it.",
    intro3: "Get your camera ready and wave your hands in front of the screen.",
    intro4: "Hold your hand and a penlight will come out.",
    intro5: "The more you wave, the flashier the effect may be.",

    noticeTitle: "Use the camera?",
    notice1: "This app can also be enjoyed using the camera image. However, for some reason, it doesn't work in Chrome. It used to work when it was first developed. However, I have confirmed that it works in Firefox.",
    notice2: "The video will be processed only within this device and will not be transmitted to the outside world.",
    notice3: "Also, depending on your device, the operation may become extremely slow due to the image recognition process.",
    notice4: "If this is the case, please uncheck the following checkbox. Instead, you can wield the penlight with mouse or touch.",
    noticeUseCamera: "Use the camera",
    noticeNoUseCamera: "Do not use the camera",
    notice5a: "If you can choose the resolution of the camera, set the resolution as",
    notice5b: " LOW ",
    notice5c: "as possible. It will improve the processing speed considerably.",
    notice6: "For reference, in the author's environment, only 7fps on full HD (1920x1080) setting, but 15fps on 1280x720 (about 2x faster), and 20fps on 640x480 (about 3x faster).",
    notice7: "Apart from the speedup, the recognition accuracy will be a bit better when the room is brighter and you are standing in front of a plain background.",

    charaTitle: "Who do you want to sing for you?",
    chara1: "* Changing the character will not change the singing voice.",
    chara2: "** Please swing the lights left and right (or also up and down), instead of back and forth.",

    songTitle: "Which do you want it to sing?",
    song1: "Click (tap) on the song you want to listen to. You can also start playing continuously from that song. The order of the songs can be rearranged with the knob on the left.",
    songPlayOnce: "Play one",
    songPlaySequential: "Play continuously",

    home: "Home",
    play: "Play",
    pause: "Pause",
    stop: "Stop",
    next: "Next",

    configFps: "Show FPS",
    configFont: "Font",
    infoCredit: "Materials used",
    infoCode: "The source code is available on: ",
  },

  fr: {
    language: "français (French)",
    about: "A propos de cette application",
    config: "settings",

    intro1: "Il s'agit d'un jukebox avec des personnages Vocaloid qui chantent pour vous.",
    intro2: "Sélectionnez une chanson à demander et le personnage la chantera.",
    intro3: "Préparez votre caméra et agitez vos mains devant l'écran.",
    intro4: "Tenez votre main et une lampe de poche en sortira.",
    intro5: "Plus vous agitez les mains, plus l'effet est flashy.",

    noticeTitle: "Utilisez-vous un appareil photo ?",
    notice1: "Vous pouvez également profiter de cette application en utilisant l'image de la caméra. Mais pour une raison quelconque, ça ne fonctionne pas dans Chrome. Il fonctionnait lorsqu'il a été développé pour la première fois. Cependant, nous avons confirmé qu'il fonctionne dans Firefox.",
    notice2: "Les images ne sont traitées que dans l'appareil et ne sont pas envoyées au monde extérieur.",
    notice3: "Selon l'appareil que vous utilisez, le processus de reconnaissance des images peut être extrêmement lent.",
    notice4: "Si tel est le cas, veuillez décocher la case ci-dessous. Au lieu de cela, vous pouvez manier la lampe à stylo avec la souris ou le toucher.",
    noticeUseCamera: "Utiliser l'appareil photo",
    noticeNoUseCamera: "N'utilisez pas l'appareil photo",
    notice5a: "Si vous pouvez choisir la résolution de votre appareil photo, utilisez un appareil avec la résolution",
    notice5b: " la plus basse ",
    notice5c: "possible. Cela améliorera considérablement la vitesse de traitement.",
    notice6: "Par exemple, dans mon environnement, la vitesse n'était que de 7fps en Full HD (1920x1080), 15fps en 1280x720 (environ 2 fois plus rapide) et 20fps en 640x480 (environ 3 fois plus rapide).",
    notice7: "Outre l'accélération, la précision de la reconnaissance est un peu meilleure lorsque la pièce est lumineuse et que vous vous trouvez devant un fond uni.",

    charaTitle: "Qui voulez-vous voir chanter pour vous ?",
    chara1: "* Si vous changez le personnage, la voix ne changera pas.",
    chara2: "** Veuillez secouer la lumière de gauche à droite. Si vous le secouez d'avant en arrière, il ne sera pas reconnu correctement.",

    songTitle: "Que veux-tu que je chante ?",
    song1: "Cliquez (tapez) sur la chanson que vous voulez écouter. Vous pouvez également lire la chanson en continu à partir de là. Vous pouvez réorganiser l'ordre des chansons en appuyant sur le bouton de gauche.",
    songPlayOnce: "Jouer une chanson",
    songPlaySequential: "Lecture en continu",

    home: "Haut de page",
    play: "Jouer",
    pause: "Pause",
    stop: "Stop",
    next: "Chanson suivante",

    configFps: "Montrer FPS",
    configFont: "Polices de caractères",
    infoCredit: "Matériaux utilisés",
    infoCode: "Le code source est disponible sur Github:",
  },

  de: {
    language: "Deutsch (German)",
    about: "Über diese Anwendung",
    config: "Einstellungen",

    intro1: "Dies ist eine Jukebox mit Vocaloid-Charakteren, die für dich singen.",
    intro2: "Wähle einen Song aus, den du dir wünschst, und die Figur wird ihn singen.",
    intro3: "Halten Sie Ihre Kamera bereit und winken Sie mit den Händen vor dem Bildschirm.",
    intro4: "Wenn du deine Hand hältst, leuchtet ein Stift auf.",
    intro5: "Je mehr du winkst, desto auffälliger wird der Effekt sein.",

    noticeTitle: "Benutzen Sie eine Kamera?",
    notice1: "Diese App kann auch über das Kamerabild genutzt werden. Aber aus irgendeinem Grund funktioniert es in Chrome nicht. Als es entwickelt wurde, hat es funktioniert. Wir haben jedoch bestätigt, dass es in Firefox funktioniert.",
    notice2: "Die Bilder werden nur im Gerät verarbeitet und nicht an die Außenwelt gesendet.",
    notice3: "Je nach verwendetem Gerät kann der Bilderkennungsprozess extrem langsam sein.",
    notice4: "Wenn dies der Fall ist, deaktivieren Sie bitte das nachstehende Kästchen. Stattdessen können Sie die Stiftlampe mit der Maus oder per Touch bedienen.",
    noticeUseCamera: "Verwenden Sie die Kamera",
    noticeNoUseCamera: "Benutzen Sie die Kamera nicht",
    notice5a: "Wenn Sie die Auflösung Ihrer Kamera wählen können, verwenden Sie eine Kamera mit der",
    notice5b: " niedrigstmöglichen ",
    notice5c: "Auflösung. Dadurch wird die Verarbeitungsgeschwindigkeit erheblich gesteigert.",
    notice6: "In meiner Umgebung betrug die Geschwindigkeit z. B. nur 7 fps in Full HD (1920x1080), 15 fps in 1280x720 (etwa 2 mal schneller) und 20 fps in 640x480 (etwa 3 mal schneller).",
    notice7: "Abgesehen von der Geschwindigkeitssteigerung ist die Erkennungsgenauigkeit etwas besser, wenn der Raum hell ist und Sie vor einem einfarbigen Hintergrund stehen.",

    charaTitle: "Wer soll für dich singen?",
    chara1: "* Wenn Sie den Charakter ändern, ändert sich die Stimme nicht.",
    chara2: "** Bitte schütteln Sie das Licht nach links und rechts. Wenn Sie es hin und her schütteln, wird es nicht richtig erkannt.",

    songTitle: "Was soll ich singen?",
    song1: "Klicken (tippen) Sie auf das Lied, das Sie anhören möchten. Von dort aus können Sie das Lied auch kontinuierlich abspielen. Sie können die Reihenfolge der Lieder ändern, indem Sie auf den linken Knopf tippen.",
    songPlayOnce: "Einen Song abspielen",
    songPlaySequential: "Kontinuierlich abspielen",

    home: "Obere Seite",
    play: "Spielen",
    pause: "Pause",
    stop: "Stopp",
    next: "Nächster Song",

    configFps: "FPS anzeigen",
    configFont: "Schriftarten",
    infoCredit: "Verwendete Materialien",
    infoCode: "Der Quellcode ist auf Github verfügbar:",
  },

  id: {
    language: "Bahasa Indonesia (Indonesian)",
    about: "Tentang aplikasi ini",
    config: "Konfigurasi",

    intro1: "Jukebox yang dinyanyikan oleh karakter Vocaloid.",
    intro2: "Saat Anda memilih (meminta) sebuah lagu, karakter akan bernyanyi.",
    intro3: "Ambil kamera Anda dan lambaikan tangan Anda di depan layar.",
    intro4: "Ketika Anda memegang tangan Anda, senter akan keluar.",
    intro5: "Semakin banyak Anda mengocoknya, semakin mencolok produksinya.",

    noticeTitle: "Apakah Anda menggunakan kamera?",
    notice1: "Aplikasi ini juga dapat dinikmati menggunakan rekaman kamera. Namun, itu tidak berfungsi di Chrome karena alasan tertentu. Itu bekerja pada awal pengembangan. Namun, saya telah mengkonfirmasi bahwa itu berfungsi dengan Firefox.",
    notice2: "Video hanya diproses di dalam perangkat ini dan tidak dikirim ke luar.",
    notice3: "Juga, tergantung pada terminal yang Anda gunakan, operasi mungkin menjadi sangat berat karena pemrosesan pengenalan gambar.",
    notice4: "Dalam kasus seperti itu, kosongkan kotak centang di bawah ini. Sebagai gantinya, Anda dapat mengayunkan senter dengan mouse atau sentuhan. ",
    noticeUseCamera: "Gunakan kamera",
    noticeNoUseCamera: "Jangan gunakan kamera",
    notice5a: "Jika Anda dapat memilih resolusi kamera, gunakan yang memiliki resolusi",
    notice5b: " serendah ",
    notice5c: "mungkin. Kecepatan pemrosesan meningkat secara signifikan.",
    notice6: "Sebagai referensi, di lingkungan penulis, full HD (1920x1080) hanya menghasilkan 7fps, tetapi 1280x720 adalah 15fps (sekitar 2 kali lebih cepat) dan 640x480 adalah 20fps (sekitar 3 kali lebih cepat).",
    notice7: "Selain mempercepat, mencerahkan ruangan dan memproyeksikannya di depan latar belakang polos akan sedikit meningkatkan akurasi pengenalan.",

    charaTitle: "Siapa yang ingin kamu nyanyikan?",
    chara1: "* Suara nyanyian tidak berubah meskipun karakternya diubah.",
    chara2: "** Kocok lampu kiri dan kanan. Saya tidak bisa mengenali ayunan maju mundur dengan baik ...",

    songTitle: "Apa yang kamu ingin aku nyanyikan?",
    song1: "Klik (ketuk) lagu yang ingin Anda dengarkan. Anda juga dapat bermain terus menerus dari lagu itu. Urutan lagu dapat diurutkan dengan tombol di sebelah kiri.",
    songPlayOnce: "Mainkan satu lagu",
    songPlaySequential: "Pemutaran terus menerus",

    home: "kembali",
    play: "reproduksi",
    pause: "berhenti sebentar",
    stop: "Berhenti",
    next: "Lagu berikutnya",

    configFps: "Tunjukkan FPS",
    configFont: "fon",
    infoCredit: "Bahan yang digunakan",
    infoCode: "Kode sumber tersedia di Github: ",
  },

  ja: {
    language: "日本語 (Japanese)",
    about: "このアプリについて",
    config: "設定",

    intro1: "ボカロキャラクターが歌ってくれるジュークボックスです",
    intro2: "楽曲を選択(リクエスト)するとキャラクターが歌います",
    intro3: "カメラを用意して、画面の前で手を振ってみてね",
    intro4: "手をにぎるとペンライトが出てきます",
    intro5: "たくさん振るほど演出が派手になるかも?",

    noticeTitle: "カメラを使いますか?",
    notice1: "このアプリはカメラ映像を使用して楽しむこともできます。ただ、なぜかChromeでは動きません。開発当初は動いていたんですが。ただし、Firefoxでなら動くことを確認しています。",
    notice2: "その映像はこの端末内でのみ処理され、外部に送信されることはありません。",
    notice3: "また、お使いの端末によっては、画像認識処理のため、動作が極端に重くなることがあります。",
    notice4: "そういった場合には以下のチェックボックスをオフにしてください。代わりに、マウスやタッチでペンライトを振れます。",
    noticeUseCamera: "カメラを使用する",
    noticeNoUseCamera: "カメラを使用しない",
    notice5a: "もしカメラの解像度が選べる場合は、できるだけ解像度が",
    notice5b: "低い",
    notice5c: "カメラを使ってください。かなり処理速度が改善されます。",
    notice6: "参考までに作者の環境では、フルHD(1920x1080)では7fpsしか出ないところが、1280x720で15fps(約2倍高速化)、640x480で20fps(約3倍高速化)となりました。",
    notice7: "高速化とは別ですが、部屋を明るくして、無地の背景の前で映すと、認識精度がちょっと良くなります。",

    charaTitle: "誰に歌ってほしい?",
    chara1: "* キャラクターを変更しても歌声は変わりません",
    chara2: "** ライトは左右に振ってください。 前後の振りはうまく認識できません…",

    songTitle: "何を歌ってほしい?",
    song1: "聴きたい曲をクリック(タップ)してください。その曲から連続再生することもできます。曲順は、左側のつまみで並べ替えられます。",
    songPlayOnce: "一曲再生",
    songPlaySequential: "連続再生",

    home: "戻る",
    play: "再生",
    pause: "一時停止",
    stop: "停止",
    next: "次の曲",

    configFps: "FPSを表示する",
    configFont: "フォント: ",
    infoCredit: "使用した素材",
    infoCode: "ソースコードはGithubで公開しています: ",
  },

  ko: {
    language: "한국어 (Korean)",
    about: "이 어플에 대해서",
    config: "설정",

    intro1: "보컬로이드 캐릭터가 불러주는 주크박스입니다.",
    intro2: "악곡을 선택(요청)하면 캐릭터가 부릅니다.",
    intro3: "카메라 준비해서 화면 앞에서 손 흔들어봐.",
    intro4: "손을 잡으면 응원봉이 나와요.",
    intro5: "많이 흔들수록 연출이 화려해질지도?",

    noticeTitle: "카메라를 사용하시겠습니까?",
    notice1: "이 응용 프로그램은 카메라 영상을 사용하여 즐길 수 있습니다. 다만 왜 Chrome에서는 동작하지 않습니다. 개발 당초는 움직이고 있었다 데요. 그러나 Firefox에서라면 움직이는 지 확인합니다.",
    notice2: "해당 영상은 이 단말내에서만 처리되며 외부로 송신되는 일은 없습니다.",
    notice3: "또, 사용의 단말에 따라서는, 화상 인식 처리 때문에, 동작이 극단적으로 무거워지는 일이 있습니다.",
    notice4: "그런 경우에는 다음의 체크 박스를 해제하십시오. 대신 마우스와 터치 펜 라이트를 흔들립니다. ",
    noticeUseCamera: "카메라를 사용하다",
    noticeNoUseCamera: "카메라를 사용하지 않는다",
    notice5a: "만약 카메라의 해상도를 선택할 수 있다면, 가능한 한 해상도가",
    notice5b: " 낮은 ",
    notice5c: "카메라를 사용해 주세요. 꽤 처리 속도가 개선됩니다.",
    notice6: "참고로 작자의 환경에서는 풀HD(1920x1080)로는 7fps밖에 나오지 않는데 1280x720으로 15fps(약 2배 고속화), 640x480으로 20fps(약 3배 고속화)가 되었습니다.",
    notice7: "고속화와는 다르지만, 방을 밝게 하고, 무늬가 없는 배경 앞에서 비추면, 인식 정도가 조금 좋아집니다.",

    charaTitle: "누가 불러줬으면 좋겠어?",
    chara1: "* 캐릭터를 변경해도 노랫소리는 변하지 않습니다",
    chara2: "** 라이트는 좌우로 흔들어 주세요. 앞뒤의 척은 잘 인식하지 못합니다...",

    songTitle: "뭘 불러줬으면 좋겠어?",
    song1: "듣고 싶은 곡을 클릭(탭)해 주세요.그 곡부터 연속 재생할 수도 있어요곡의 순서는 왼쪽 손잡이로 정렬됩니다.",
    songPlayOnce: "일곡재생",
    songPlaySequential: "연속 재생",

    home: "되돌아가다",
    play: "재생",
    pause: "일시 정지",
    stop: "정지",
    next: "다음 곡",

    configFps: "FPS보기",
    configFont: "글꼴",
    infoCredit: "사용한 소재",
    infoCode: "소스 코드는 Github에 공개하고 있습니다: ",
  },

  ms: {
    language: "bahasa Melayu (Malay)",
    about: "Mengenai aplikasi ini",
    config: "Konfigurasi",

    intro1: "Jukebox yang dinyanyikan oleh watak Vocaloid.",
    intro2: "Apabila anda memilih (meminta) lagu, watak akan menyanyi.",
    intro3: "Dapatkan kamera anda dan gerakkan tangan anda di hadapan skrin.",
    intro4: "Apabila anda memegang tangan anda, lampu suluh akan keluar.",
    intro5: "Semakin anda menggoyangkannya, semakin menyerlah pengeluarannya.",

    noticeTitle: "Adakah anda menggunakan kamera?",
    notice1: "Aplikasi ini juga dapat dinikmati dengan menggunakan rakaman kamera. Walau bagaimanapun, ia tidak berfungsi di Chrome kerana sebab tertentu. Ia berfungsi pada awal pembangunan. Walau bagaimanapun, saya telah mengesahkan bahawa ia berfungsi dengan Firefox.",
    notice2: "Video diproses hanya dalam peranti ini dan tidak dihantar ke luar.",
    notice3: "Juga, bergantung pada terminal yang anda gunakan, operasi mungkin menjadi sangat berat kerana proses pengecaman gambar.",
    notice4: "Sekiranya berlaku, kosongkan kotak pilihan di bawah. Sebagai gantinya, anda boleh mengayunkan lampu senter dengan tetikus atau sentuhan anda. ",
    noticeUseCamera: "Gunakan kamera",
    noticeNoUseCamera: "Jangan gunakan kamera",
    notice5a: "Sekiranya anda dapat memilih resolusi kamera, gunakan resolusi dengan resolusi",
    notice5b: " serendah ",
    notice5c: "mungkin. Kelajuan pemprosesan meningkat dengan ketara.",
    notice6: "Sebagai rujukan, dalam persekitaran pengarang, HD penuh (1920x1080) hanya menghasilkan 7fps, tetapi 1280x720 adalah 15fps (kira-kira 2 kali lebih cepat) dan 640x480 adalah 20fps (kira-kira 3 kali lebih pantas).",
    notice7: "Selain mempercepat, mencerahkan ruangan dan memproyeksikannya di depan latar belakang yang sederhana akan meningkatkan ketepatan pengecaman sedikit.",

    charaTitle: "Siapa yang anda mahu nyanyikan?",
    chara1: "* Suara menyanyi tidak berubah walaupun wataknya berubah.",
    chara2: "** Goncangkan cahaya ke kiri dan kanan. Saya tidak dapat mengenali ayunan bolak-balik dengan baik ...",

    songTitle: "Apa yang anda mahu saya menyanyi",
    song1: "Klik (ketuk) lagu yang ingin anda dengarkan. Anda juga boleh bermain secara berterusan dari lagu itu. Urutan lagu boleh disusun dengan tombol di sebelah kiri.",
    songPlayOnce: "Mainkan satu lagu",
    songPlaySequential: "Main balik berterusan",

    home: "kembali",
    play: "pembiakan semula",
    pause: "berhenti seketika",
    stop: "Berhenti",
    next: "Lagu seterusnya",

    configFps: "Tunjukkan FPS",
    configFont: "fon",
    infoCredit: "Bahan yang digunakan",
    infoCode: "Kod sumber terdapat di Github:",
  },

  pt: {
    language: "português (Portuguese)",
    about: "Sobre este aplicativo",
    config: "settings",

    intro1: "Esta é uma jukebox com personagens vocaloides cantando para você.",
    intro2: "Selecione uma canção (pedido) e o personagem a cantará.",
    intro3: "Prepare sua câmera e acene com as mãos na frente da tela.",
    intro4: "Segure sua mão e o candeeiro sairá.",
    intro5: "Quanto mais você acenar, mais vistoso será o efeito.",

    noticeTitle: "Você usa uma câmera?",
    notice1: "Este aplicativo também pode ser apreciado usando a imagem da câmera. Mas por alguma razão não funciona no cromo. Costumava funcionar quando foi desenvolvido pela primeira vez. No entanto, confirmamos que ela funciona no Firefox.",
    notice2: "O vídeo só é processado dentro deste dispositivo e não é transmitido para o mundo exterior.",
    notice3: "Além disso, dependendo de seu dispositivo, o processo de reconhecimento de imagem pode causar uma extrema lentidão no funcionamento.",
    notice4: "Se este for o caso, por favor desmarque a caixa abaixo. Ao invés disso, você pode empunhar o candeeiro com o mouse ou tocar.",
    noticeUseCamera: "Use a câmera",
    noticeNoUseCamera: "Não usar a câmera",
    notice5a: "Se você tiver a escolha de resoluções de câmera, use a câmera com a",
    notice5b: " menor resolução ",
    notice5c: "possível. Melhorará consideravelmente a velocidade de processamento",
    notice6: "Para referência, em meu ambiente, o Full HD (1920x1080) é apenas 7fps, 1280x720 é 15fps (cerca de 2 vezes mais rápido), 640x480 é 20fps (cerca de 3 vezes mais rápido).",
    notice7: "Além da aceleração, a precisão do reconhecimento é um pouco melhor se você iluminar a sala e ficar na frente de um fundo liso.",

    charaTitle: "Quem você quer cantar para você?",
    chara1: "* Mudar o personagem não muda a voz que canta",
    chara2: "** Por favor, balance a luz para a esquerda ou para a direita. Se você o balançar para frente e para trás, ele não será reconhecido corretamente.",

    songTitle: "O que você quer que eu cante?",
    song1: "Clique (toque) na música que você quer ouvir. Você pode tocar a canção continuamente a partir daí. Você pode reorganizar a ordem das músicas usando o botão da esquerda.",
    songPlayOnce: "Toque uma música",
    songPlaySequential: "Jogue continuamente",

    home: "Página superior",
    play: "Reproduzir",
    pause: "Pausa",
    stop: "Parar",
    next: "Próxima canção",

    configFps: "Mostrar FPS",
    configFont: "Fontes",
    infoCredit: "Materiais utilizados",
    infoCode: "O código fonte está disponível no Github:",
  },

  es: {
    language: "español (Spanish)",
    about: "Sobre esta aplicación",
    config: "ajustes",

    intro1: "Este es un jukebox con personajes Vocaloid que cantan para ti.",
    intro2: "Selecciona una canción para pedirla y el personaje la cantará.",
    intro3: "Prepara tu cámara y agita las manos frente a la pantalla.",
    intro4: "Mantén la mano y saldrá una linterna.",
    intro5: "Cuanto más agites, más llamativo será el efecto.",

    noticeTitle: "¿Utilizas la cámara?",
    notice1: "Esta aplicación también se puede disfrutar utilizando la imagen de la cámara. Pero por alguna razón no funciona en Chrome. Solía funcionar cuando se desarrolló por primera vez. Sin embargo, hemos confirmado que funciona en Firefox.",
    notice2: "El vídeo se procesará sólo dentro de este dispositivo y no se transmitirá al mundo exterior.",
    notice3: "Además, dependiendo de tu dispositivo, el funcionamiento puede volverse extremadamente lento debido al proceso de reconocimiento de la imagen.",
    notice4: "Si este es el caso, por favor desmarque la casilla de abajo. En cambio, puedes manejar la linterna con el ratón o con el tacto.",
    noticeUseCamera: "Utilizar la cámara",
    noticeNoUseCamera: "No utilizar la cámara",
    notice5a: "Si puede elegir la resolución de la cámara, establezca la resolución",
    notice5b: " más baja ",
    notice5c: "posible. Esto mejorará considerablemente la velocidad de procesamiento.",
    notice6: "Como referencia, en el entorno del autor, sólo 7fps en la configuración Full HD (1920x1080), pero 15fps en 1280x720 (aproximadamente 2 veces más rápido), y 20fps en 640x480 (aproximadamente 3x más rápido).",
    notice7: "Aparte del aumento de velocidad, la precisión del reconocimiento será un poco mejor cuando la habitación sea más luminosa y estés delante de un fondo liso.",

    charaTitle: "¿Quién quieres que cante para ti?",
    chara1: "* El cambio de personaje no cambiará la voz del cantante.",
    chara2: "** Por favor, mueva las luces a la izquierda y a la derecha (o también arriba y abajo), en lugar de hacia adelante y hacia atrás.",

    songTitle: "¿Qué quieres que cante?",
    song1: "Haz clic (toca) en la canción que quieras escuchar. También puede empezar a tocar continuamente desde esa canción. El orden de las canciones se puede reorganizar con el mando de la izquierda.",
    songPlayOnce: "Reproducir una",
    songPlaySequential: "Reproducir continuamente",

    home: "Inicio de la página",
    play: "Juega a",
    pause: "Pausa",
    stop: "Detener",
    next: "Siguiente canción",

    configFps: "Mostrar FPS",
    configFont: "Fuentes",
    infoCredit: "Materiales utilizados",
    infoCode: "El código fuente está disponible en Github:",
  },

  vi: {
    language: "Tiếng Việt (Vietnamese)",
    about: "Về ứng dụng này",
    config: "Cấu hình",

    intro1: "Một máy hát tự động được hát bởi các nhân vật Vocaloid.",
    intro2: "Khi bạn chọn (yêu cầu) một bài hát, nhân vật sẽ hát.",
    intro3: "Lấy máy ảnh của bạn và vẫy tay trước màn hình.",
    intro4: "Khi bạn cầm tay, đèn bút sẽ bật ra.",
    intro5: "Bạn càng lắc nó, sản xuất có thể càng hào nhoáng hơn.",

    noticeTitle: "Bạn có sử dụng máy ảnh không?",
    notice1: "Ứng dụng này cũng có thể được thưởng thức bằng cách sử dụng cảnh quay camera. Tuy nhiên, nó không hoạt động trong Chrome vì một số lý do. Nó đã hoạt động khi bắt đầu phát triển. Tuy nhiên, tôi đã xác nhận rằng nó hoạt động với Firefox.",
    notice2: "Video chỉ được xử lý trong thiết bị này và không được gửi ra bên ngoài.",
    notice3: "Ngoài ra, tùy thuộc vào thiết bị đầu cuối bạn đang sử dụng, hoạt động có thể trở nên cực kỳ nặng nề do xử lý nhận dạng hình ảnh.",
    notice4: "Trong trường hợp như vậy, hãy bỏ chọn các hộp kiểm bên dưới. Thay vào đó, bạn có thể xoay đèn bằng chuột hoặc chạm. ",
    noticeUseCamera: "Sử dụng máy ảnh",
    noticeNoUseCamera: "Không sử dụng máy ảnh",
    notice5a: "Nếu bạn có thể chọn độ phân giải của máy ảnh, hãy sử dụng máy ảnh có độ phân giải",
    notice5b: " thấp nhất ",
    notice5c: "có thể. Tốc độ xử lý được cải thiện đáng kể.",
    notice6: "Để tham khảo, trong môi trường của tác giả, full HD (1920x1080) chỉ xuất ra 7fps, nhưng 1280x720 là 15fps (nhanh hơn khoảng 2 lần) và 640x480 là 20fps (nhanh hơn khoảng 3 lần).",
    notice7: "Ngoài việc tăng tốc độ, việc làm sáng căn phòng và chiếu nó trước nền đơn giản sẽ cải thiện một chút độ chính xác nhận dạng.",

    charaTitle: "Bạn muốn hát ai?",
    chara1: "* Giọng hát không thay đổi kể cả khi thay đổi nhân vật.",
    chara2: "** Lắc đèn trái và phải. Tôi không thể nhận ra được những cái xích đu qua lại hay qua lại ...",

    songTitle: "Bạn muốn tôi hát gì",
    song1: "Bấm (chạm) vào bài hát bạn muốn nghe. Bạn cũng có thể chơi liên tục từ bài hát đó. Thứ tự bài hát có thể được sắp xếp bằng núm xoay bên trái.",
    songPlayOnce: "Chơi một bài hát",
    songPlaySequential: "Phát lại liên tục",

    home: "trở lại",
    play: "sinh sản",
    pause: "tạm ngừng",
    stop: "Ngừng lại",
    next: "Bài hát tiếp theo",

    configFps: "Chương FPS",
    configFont: "nét chữ",
    infoCredit: "Vật liệu đã sử dụng",
    infoCode: "Mã nguồn có sẵn trên Github:",
  },
});
