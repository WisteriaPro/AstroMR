//<script language="JavaScript" type="text/javascript" src="../xycoordinate.js"></script>
// ＝＝＝＝＝Ｘ－Ｙ軸系ＣＡＮＶＡＳ＝＝＝＝＝　作成者　木暮仁
// ＨＴＭＬ５のＣＡＮＶＡＳ関連のJavaScript関数は、左上が原点でｙが増加すると下に下がる。
// ここでは、数学系の処理を容易にするために、画素数 cw*ch の物理的CANVASを、
// 左下 (xmin,ymin)、右上 (xmax,ymax) の仮想WINDOWとして取り扱えるようにしたものである。
//
// ●重要！！
// Chrome, Firefox, Safari で動作確認済
// ＩＥ９ではCANVASをサポートしているが、なぜか「 ctx. が定義されていない」とエラーになる。
// 　　ぜひ解決方法を教えてください！
// 
// 利用条件（それぞれの関数を呼び出す以前に）
// １　cw,ch (HTMLのcanvasタグで設定したcanvasのwidthとheight）を定義して、
//   　setCanvas関数を呼び出しておくこと。
// ２　xmin, xmax, ymin, ymax を定義しておくこと
//
// 留意事項
// １　縦・横の比率が崩されないためには、xmax-xmin：ymax-ymin＝cw：ch の利率にするのが望ましい。
// ２　点表示などのキザミ幅は、画素との対応が適切なほうが画像が鮮明になる。
// 　　そのためにはxmax+xmin, ymax-ymin とcw, chが整数比にするのがよい。
//     例えば、cw = 400なのにxmin=10,xmax=27(xmax+xmin=37) などとするのは不適切である。
// 　　また、dx = (xmax+xmin)/cw*整数 とするとよい。
// ３　pointsizeやlinewidthなど、点の大きさや線の太さに関する変数の値は、画素数であり、
// 　　xminなどの仮想WINDOWの値には無関係である。
//
// 記述例
// <!DOCTYPE html>
// <head>
// <meta content="text/html; charset=UTF-8" http-equiv=Content-Type></meta> UTF-8が望ましい
// <script language="JavaScript" type="text/javascript" src="xycoordinate.js"></script>
// <script type="text/javascript">
// function test() {
//     cw = 400;  ch = 400;
//     setCanvas("canvas1", "black");
//     xmin = -40; xmax = 40;  ymin = -40; ymax = 40;
//     drawPoint(20,10, "red", 6);
//     drawLine(-20,-10, 15,25, "yellow", 2);
//  }
//  </script>
// </html>
// <body>
// <form name="iform">
//  :
// <input type="button" value="実行" onclick="test()" />
// <canvas id="canvas1" width="400" height="400" />
// 　　　canvas1 は setCanvasのCANVAS名、widthとheightの値は、cwとchの値に一致させる
// ：

  //======================================================================
  //グローバル変数

  var cw, ch;
  var xmin, xmax, ymin, ymax;

  //======================================================================
  //ＣＡＮＶＡＳの定義
  function setCanvas(canvasname, backcolor) {
    //描画コンテキストの取得
    canvas = document.getElementById(canvasname);
    if ( ! canvas || ! canvas.getContext ) {
      return false;
    }
    /* 2Dコンテキスト */
    ctx = canvas.getContext('2d');
    //CANVASを黒く塗りつぶす
    ctx.fillStyle = backcolor;
    ctx.fillRect(0,0,cw,ch);
  }
     //例
     //●重要！　cw = 400; ch = 400;  これを記述しておく必要あり
     //setCanvas("canvas1", "black");  canvas1はidで与えたcanvas名
     //ＨＴＭＬでは
     //<canvas id="canvas1" width="400" height="400" style="background-color:blue;">
     //<p class="red">ここに矩形が表示されない場合は、<br />
     //「オプション表示」を許可にしてください。</p>
     //</canvas>

  //========================================================================
  //画面全体を消す（１つの色で塗りつぶす）
  function clearScreen(fillcolor) {
    ctx.fillStyle = fillcolor; 
    ctx.beginPath();
    ctx.fillRect(0,0, cw,ch);
    ctx.stroke();
  }
     //例　画面全体（背景色）を赤にする
     // drawRect("red");

  //========================================================================
  //直線を引く
  function drawLine(x0,y0, x1,y1, linecolor,linewidth) {
    var cx0,cy0,cx1,cy1;
    cx0 = (x0-xmin)/(xmax-xmin)*cw;
    cy0 = (ymax-y0)/(ymax-ymin)*ch;
    cx1 = (x1-xmin)/(xmax-xmin)*cw;
    cy1 = (ymax-y1)/(ymax-ymin)*ch;
    ctx.strokeStyle = linecolor; //線の色 #xxxxxx でも red でもよい
    ctx.lineWidth = linewidth;   // 線の太さ 1, 2など
    ctx.beginPath();
    ctx.moveTo(cx0,cy0);
    ctx.lineTo(cx1,cy1);
    ctx.stroke();
    ctx.closePath();
  }
     //例
     //Ｘ軸　  drawLine(0,ymin, 0,ymax, "aqua", 1);

  //========================================================================
  //点に色をつける。
  function drawPoint(x,y, pointcolor, pointsize) {
    var cx, cy, d;
    cx =  (x-xmin)/(xmax-xmin)*cw;
    cy = (ymax-y)/(ymax-ymin)*ch;
    d = Math.floor((pointsize + 1)/2);
    ctx.fillStyle = pointcolor;
    ctx.fillRect(cx-d, cy-d, pointsize, pointsize);
  }
     //例：pointsizeは画素数。の矩形）
     // drawPoint(x,y, "white", 4);


  //========================================================================
  //矩形を描く
  function drawRect(x0,y0, x1,y1, linecolor, linewidth, fillcolor) {
    var cx0, cy0, cx1,cy1, w, h;
    cx0 = (x0-xmin)/(xmax-xmin)*cw;
    cy0 = (ymax-y0)/(ymax-ymin)*ch;
    cx1 = (x1-xmin)/(xmax-xmin)*cw;
    cy1 = (ymax-y1)/(ymax-ymin)*ch;
    w = cx1-cx0;
    h = cy1-cy0;
    ctx.strokeStyle = linecolor; // 枠線の色
    ctx.lineWidth = linewidth;   // 線の太さ
    if (fillcolor!="none") ctx.fillStyle = fillcolor; 
　　　　　//塗りつぶし（塗らないときは"none"）
    ctx.beginPath();
    ctx.rect(cx0, cy0, w,h);
    if (fillcolor != "none") ctx.fill();
    ctx.stroke();
  }
     //例　(5,8)-(10,20)を対角線とした矩形の枠線を青の２の太さにして、その内部を赤にする
     // drawRect(5,8, 10,20, "blue", 2, "red");

  //========================================================================
  //円を描く
  function drawCircle(x,y, r, linecolor, linewidth, fillcolor) {
    var cx, cy;
    cx = (x-xmin)/(xmax-xmin)*cw;
    cy = (ymax-y)/(ymax-ymin)*ch;
    cr = r*cw/(xmax-xmin);
    ctx.strokeStyle = linecolor; //枠線の色は白
    ctx.lineWidth = linewidth;   // 線の太さ
    if (fillcolor!="none") ctx.fillStyle = fillcolor; 
　　　　　//塗りつぶし（塗らないときは"none"）
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, 2*Math.PI, false);
    if (fillcolor != "none") ctx.fill();
    ctx.stroke();
  }
     //例　原点中心、半径１、線は白、内部は灰色
     // drawCircle(0,0, 1, "white", 2, "gray");

  //========================================================================
  //三角形を描く
  function drawTri(x0,y0, x1,y1, x2,y2, linecolor, linewidth, fillcolor) {
    var cx0, cy0, cx1,cy1, cx2,cy2;
    cx0 = (x0-xmin)/(xmax-xmin)*cw;
    cy0 = (ymax-y0)/(ymax-ymin)*ch;
    cx1 = (x1-xmin)/(xmax-xmin)*cw;
    cy1 = (ymax-y1)/(ymax-ymin)*ch;
    cx2 = (x2-xmin)/(xmax-xmin)*cw;
    cy2 = (ymax-y2)/(ymax-ymin)*ch;

    ctx.strokeStyle = linecolor; // 枠線の色
    ctx.lineWidth = linewidth;   // 線の太さ
    if (fillcolor!="none") ctx.fillStyle = fillcolor; 
　　　　　//塗りつぶし（塗らないときは"none"）
    ctx.beginPath();
    ctx.moveTo(cx0, cy0);
    ctx.lineTo(cx1, cy1);
    ctx.lineTo(cx2, cy2);
    ctx.closePath();
    if (fillcolor != "none") ctx.fill();
    ctx.stroke();
  }
     //例　(10,5)-(20,10)-(30,5)を頂点とする三角形の枠線を青の２の太さにして、その内部を赤にする
     // drawTri(10,5, 20,10, 30,5, "blue", 2, "red");
     // 多角形は三角形を組み合わせせて表現できるとして割愛した

  //========================================================================
  //時間を遅らせる（他言語のSleepやWaitの機能）
  function sleep(time) {
      var d1 = new Date().getTime();
      var d2 = new Date().getTime();
      alert("２回目以降「このページ～」にチェックを入れてください");
      while( d2 < d1 + time ){
          d2 = new Date().getTime();
      }
  }
  // これはGoogle Chrome以外では使わないでください。
  // その場合でもalertを外すと、うまく動きません。