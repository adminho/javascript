//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "grey";
ctx.font = GAME_FONTS;

//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

function setAssetReady()
{
	this.ready = true;
}

//Display Preloading
ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);

var gameloop, facing, currX, currY, charX, charY, isMoving;
var colorCmd = "grey"

function preloading()
{	
	if (charImage.ready)
	{
		clearInterval(preloader);
		
		//Initialise game
		facing = "E"; //N = North, E = East, S = South, W = West
		isMoving = false;
		
		gameloop = setInterval(update, TIME_PER_FRAME);			
		document.addEventListener("keydown",keyDownHandler, false);	
		document.addEventListener("keyup",keyUpHandler, false);	
	}
}

//------------
//Key Handlers
//------------
function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if (keyPressed == "W")
	{		
		facing = "N";
		isMoving = true;
	}
	else if (keyPressed == "D")
	{	
		facing = "E";
		isMoving = true;		
	}
	else if (keyPressed == "S")
	{	
		facing = "S";
		isMoving = true;		
	}
	else if (keyPressed == "A")
	{	
		facing = "W";
		isMoving = true;		
	}
}

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
	
	if ((keyPressed == "W") || (keyPressed == "A") || 
		(keyPressed == "S") || (keyPressed == "D"))
	{
		isMoving = false;
	}
}

//------------
//Game Loop
//------------
charX = CHAR_START_X;
charY = CHAR_START_Y;

currX = IMAGE_START_X;
currY = IMAGE_START_EAST_Y;


function update()
{		
	//Clear Canvas
	//ctx.fillStyle = "grey";
	ctx.fillStyle = colorCmd;
	ctx.fillRect(0, 0, stage.width, stage.height);	
	
	if (isMoving)
	{
		if (facing == "N")
		{
			charY -= CHAR_SPEED;
			currY = IMAGE_START_NORTH_Y;
		}
		else if (facing == "E")
		{
			charX += CHAR_SPEED;
			currY = IMAGE_START_EAST_Y;
		}
		else if (facing == "S")
		{
			charY += CHAR_SPEED;
			currY = IMAGE_START_SOUTH_Y;
		}
		else if (facing == "W")
		{
			charX -= CHAR_SPEED;
			currY = IMAGE_START_WEST_Y;
		}
		
		currX += CHAR_WIDTH;
		
		if (currX >= SPRITE_WIDTH)
			currX = 0;
	}
	
	//Draw Image
	ctx.drawImage(charImage,currX,currY,CHAR_WIDTH,CHAR_HEIGHT,
					charX,charY,CHAR_WIDTH,CHAR_HEIGHT);

}

function largestIndex(array){
  var counter = 1;
  var max = 0;

  for(counter; counter < array.length; counter++){
    if(array[max] < array[counter]){
        max = counter;
    }
  }
  
  if (array[max] < 0)
 	return -1;
  else 
	return max;

}


function controlGameBySpeech(textMsg)
{	
	indexGrey = textMsg.indexOf("สีเทา")
	indexGreen = textMsg.indexOf("สีเขียว")
	indexBlue = textMsg.indexOf("สีน้ำเงิน")
	indexRed = textMsg.indexOf("สีแดง")
	indexYellow = textMsg.indexOf("สีเหลือง")
	indexBlack = textMsg.indexOf("สีดำ")
	
	allIndex = [indexGrey, indexGreen, indexBlue, indexRed, indexYellow, indexBlack];
	var indexCmd = largestIndex(allIndex);
	
	if (indexCmd == 0)	
	{
		colorCmd = "grey";		
		isMoving = false;
	}
	else if (indexCmd == 1)	
	{
		colorCmd = "green";		
		isMoving = false;
	}
	else if (indexCmd == 2)	
	{
		colorCmd = "blue";		
		isMoving = false;
	}
	else if (indexCmd == 3)	
	{
		colorCmd = "red";		
		isMoving = false;
	} 
	else if (indexCmd == 4)	
	{
		colorCmd = "yellow";		
		isMoving = false;
	}
	else if (indexCmd == 5)	
	{
		colorCmd = "black";
		isMoving = false;
	}	
	
	indexUp = textMsg.indexOf("บน")
	indexRight = textMsg.indexOf("ขวา")
	indexDown = textMsg.indexOf("ล่าง")
	indexLeft = textMsg.indexOf("ซ้าย")
	indexStop = textMsg.indexOf("หยุด")
	
	allIndex = [indexUp, indexRight, indexDown, indexLeft, indexStop];
	var indexCmd = largestIndex(allIndex);

	//if (checkCmdInMsg("บน", textMsg))	
	if (indexCmd == 0)
	{
		//charY -= CHAR_SPEED;
		//currY = IMAGE_START_NORTH_Y;
		facing = "N"
		isMoving = true;
	}
	//else if (checkCmdInMsg("ขวา", textMsg))
	else if (indexCmd == 1)
	{
		//charX += CHAR_SPEED;
		//currY = IMAGE_START_EAST_Y;
		facing = "E"
		isMoving = true;
	}
	//else if (checkCmdInMsg("ล่าง", textMsg))
	else if (indexCmd == 2)
	{
		//charY += CHAR_SPEED;
		//currY = IMAGE_START_SOUTH_Y;
		facing = "S"
		isMoving = true;
	}
	//else if (checkCmdInMsg("ซ้าย", textMsg))
	else if (indexCmd == 3)
	{
		//charX -= CHAR_SPEED;
		//currY = IMAGE_START_WEST_Y;
		facing = "W"
		isMoving = true;
	} 
	//else if (checkCmdInMsg("หยุด", textMsg)) 
	else if (indexCmd == 4)
	{ 
		isMoving = false;
	} 
	
	ctx.fillStyle = colorCmd;
	ctx.fillRect(0, 0, stage.width, stage.height);	
	
	//Draw Image
	ctx.drawImage(charImage,currX,currY,CHAR_WIDTH,CHAR_HEIGHT,
					charX,charY,CHAR_WIDTH,CHAR_HEIGHT);
	
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var recognition = new SpeechRecognition()
// recognition.lang = 'th-TH'
//recognition.interimResults = false
recognition.interimResults = true // เมื่อเรากำลังพูดอยู่ API ก็จะส่งข้อความที่มันวิเคราะห์ได้ ณ ขณะนั้นเป็น result แม้เรายังพูดไม่จบประโยค
//recognition.maxAlternatives = 1
recognition.continuous = true; // ต่อเนื่องไปเรื่อยๆ 
recognition.lang = 'th-TH'
recognition.start(); // เริ่มบันทึกเสียง
var final_transcript = ""
var start_timestamp;
  
recognition.onspeechend = function() {
 // recognition.stop(); // เมื่อพูดจบ ให้ปิดการบันทึกเสียง
}

recognition.onstart = function() {
    //start_img.src = 'images/mic-animate.gif';
	showInfo('info_speak_now');
	//record_button.style.display = 'inline-block';
  };
recognition.onend = function() {
  //start_img.src = 'images/mic.gif';
  start_img.src = "https://www.google.com/intl/en/chrome/assets/common/images/content/mic.gif";
  showInfo('info_finish');
  //console.log('Speech recognition service disconnected');
  //start_button.style.display = 'inline-block';
  //record_button.style.display = 'none';  
}

recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      //start_img.src = 'images/mic.gif';
	  showInfo('info_no_speech');
    }
    if (event.error == 'audio-capture') {
      //start_img.src = 'images/mic.gif';
	  showInfo('info_no_microphone');
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
		showInfo('info_blocked');
      } else {
		showInfo('info_denied');
      }    
    }
  };

recognition.onresult = function(event) {
  var interim_transcript = '';
  if (typeof(event.results) == 'undefined') {
     recognition.onend = null;
     recognition.stop();
	 showInfo('info_upgrade');
     return;
  }

  for (var i = event.resultIndex; i < event.results.length; ++i) {	
	  var speechRecognitionAlternative = event.results[i][0];
	  textMsg = speechRecognitionAlternative.transcript;	  
	  //console.log(textMsg , " ,confidence:", speechRecognitionAlternative.confidence)  
      if (event.results[i].isFinal) {
        //final_transcript += event.results[i][0].transcript + '&nbsp';	
		//final_transcript += textMsg + '&nbsp';					
		//controlGameBySpeech(textMsg);		
      } else { 
		//interim_transcript +=  event.results[i][0].transcript;
		//interim_transcript += textMsg;				
      }	
	  controlGameBySpeech(textMsg);		
	  final_span.innerHTML = linebreak(textMsg);
      //interim_span.innerHTML = linebreak(interim_transcript);
	}	
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}

/*
var langs =
[['Afrikaans',       ['af-ZA']],
 ['አማርኛ',           ['am-ET']],
 ['Azərbaycanca',    ['az-AZ']],
 ['বাংলা',            ['bn-BD', 'বাংলাদেশ'],
                     ['bn-IN', 'ভারত']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Dansk',           ['da-DK']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-KE', 'Kenya'],
                     ['en-TZ', 'Tanzania'],
                     ['en-GH', 'Ghana'],
                     ['en-NZ', 'New Zealand'],
                     ['en-NG', 'Nigeria'],
                     ['en-ZA', 'South Africa'],
                     ['en-PH', 'Philippines'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Filipino',        ['fil-PH']],
 ['Français',        ['fr-FR']],
 ['Basa Jawa',       ['jv-ID']],
 ['Galego',          ['gl-ES']],
 ['ગુજરાતી',           ['gu-IN']],
 ['Hrvatski',        ['hr-HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['ಕನ್ನಡ',             ['kn-IN']],
 ['ភាសាខ្មែរ',          ['km-KH']],
 ['Latviešu',        ['lv-LV']],
 ['Lietuvių',        ['lt-LT']],
 ['മലയാളം',          ['ml-IN']],
 ['मराठी',             ['mr-IN']],
 ['Magyar',          ['hu-HU']],
 ['ລາວ',              ['lo-LA']],
 ['Nederlands',      ['nl-NL']],
 ['नेपाली भाषा',        ['ne-NP']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['සිංහල',          ['si-LK']],
 ['Slovenščina',     ['sl-SI']],
 ['Basa Sunda',      ['su-ID']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Kiswahili',       ['sw-TZ', 'Tanzania'],
                     ['sw-KE', 'Kenya']],
 ['ქართული',       ['ka-GE']],
 ['Հայերեն',          ['hy-AM']],
 ['தமிழ்',            ['ta-IN', 'இந்தியா'],
                     ['ta-SG', 'சிங்கப்பூர்'],
                     ['ta-LK', 'இலங்கை'],
                     ['ta-MY', 'மலேசியா']],
 ['తెలుగు',           ['te-IN']],
 ['Tiếng Việt',      ['vi-VN']],
 ['Türkçe',          ['tr-TR']],
 ['اُردُو',            ['ur-PK', 'پاکستان'],
                     ['ur-IN', 'بھارت']],
 ['Ελληνικά',         ['el-GR']],
 ['български',         ['bg-BG']],
 ['Pусский',          ['ru-RU']],
 ['Српски',           ['sr-RS']],
 ['Українська',        ['uk-UA']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['हिन्दी',             ['hi-IN']],
 ['ภาษาไทย',         ['th-TH']]];

*/