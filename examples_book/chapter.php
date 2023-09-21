<?php    
	$no = isset($_GET['no']) ? $_GET['no'] : '';
	
	if( empty($no) ){
		$no = 2;
	}
?>

<html lang="th">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta name="description" content="ตัวอย่างโค้ดในหนังสือ 'เสียดายไม่ได้อ่าน JavaScript'">
	<meta name="viewport" content="width=device-width, initial-scale=1">
		
	<title>กำลังโหลด ...</title>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai&display=swap" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
		
	<!--https://web.wurfl.io/#wurfl-js-->
	<script type='text/javascript' src="//wurfl.io/wurfl.js"></script>
	
	<link href="readme_md.css?v=5173" rel="stylesheet" >  
	<script src="runcode.js?v=1231"></script>
			
</head>
<body>	
	
	<div class="header">
		<!--<div id="headline" class="headline">${headline}</div>-->
		<div id="headline" class="headline"></div>
	</div>
	<div><img id="statusLoading" class='rotate' src='process.png'></div>
	
	<!--<div id="main" class="main">${allLines}</div>-->	
	<div id="main" class="main"></div>
	
	<div class="ads">			
		<!--<a href="https://www.mebmarket.com/web/index.php?action=BookDetails&data=YToyOntzOjc6InVzZXJfaWQiO3M6NzoiMTcyNTQ4MyI7czo3OiJib29rX2lkIjtzOjY6IjE1Njg1NCI7fQ" target="_blank"><img src="https://cdn-local.mebmarket.com/meb/server1/156854/Thumbnail/book_detail_large.gif" width="100%">-->
		<a href="https://www.mebmarket.com/web/index.php?action=BookDetails&data=YToyOntzOjc6InVzZXJfaWQiO3M6NzoiMTcyNTQ4MyI7czo3OiJib29rX2lkIjtzOjY6IjE1Njg1NCI7fQ" target="_blank">
		<img class="img-ads" src="promotion_cover_book_156854.png" width=200>
		<br><p style="text-align:center;">เล่มนี้ลดราคา 4-23 ต.ค </p><a/>
	</div>	
	
	<div id="bottom-ads" class="sale">
		<strong>สามารถซื้อ ebook ฉบับเต็มได้ที่ลิงก์นี้</strong><br>
		<iframe class="iframe_seller_link" width="430" height="220" src="https://www.mebmarket.com/embed.php?seller_link=YToyOntzOjc6InVzZXJfaWQiO3M6NzoiMTcyNTQ4MyI7czo3OiJib29rX2lkIjtzOjY6IjE1Njg1NCI7fQ" frameborder="0"></iframe>
	</div>	
	
	<div class="group-menu">
		<span class="btn-menu">บทอื่น</span><br>
		<div class="main-menu">	
		  <a class="link-chap text-reset" href="chapter01.html">บทที่ 1 แนะนำ</a><br>
		  <a class="link-chap text-reset" href="chapter02.html">บทที่ 2 รันจาวาสคริปต์อย่างง่าย</a><br>
          <a class="link-chap text-reset" href="chapter03.html">บทที่ 3 ทบทวนมาตรฐานเก่า</a><br>
		  <a class="link-chap text-reset" href="chapter04.html">บทที่ 4 ทบทวนประโยคคำสั่งเบื้องต้น</a><br>
          <a class="link-chap text-reset" href="chapter05.html">บทที่ 5 ทบทวนอ็อบเจ็กต์</a><br>
          <a class="link-chap text-reset" href="chapter06.html">บทที่ 6 ทบทวน Regex</a><br>
		  <a class="link-chap text-reset" href="chapter07.html">บทที่ 7 ทบทวน HTML DOM</a><br>
          <a class="link-chap text-reset" href="chapter08.html">บทที่ 8 ฟีเจอร์ใหม่ของตัวเลข สตริง และ regex</a><br>
		  <a class="link-chap text-reset" href="chapter09.html">บทที่ 9 การประกาศตัวแปร และการกำหนดค่า</a><br>
          <a class="link-chap text-reset" href="chapter10.html">บทที่ 10 ฟังก์ชั่น</a><br>
          <a class="link-chap text-reset" href="chapter11.html">บทที่ 11 เทมเพลตสตริง</a><br>
		  <a class="link-chap text-reset" href="chapter12.html">บทที่ 12 ซิมโบล</a><br>
          <a class="link-chap text-reset" href="chapter13.html">บทที่ 13 ฟีเจอร์ใหม่ของอ็อบเจ็กต์</a><br>
          <a class="link-chap text-reset" href="chapter14.html">บทที่ 14 คลาส</a><br>
          <a class="link-chap text-reset" href="chapter15.html">บทที่ 15 คอลเลคชั่น</a><br>
		  <a class="link-chap text-reset" href="chapter16.html">บทที่ 16 อิเทอเรเตอร์ และเจนเนอเรเตอร์</a><br>
		  <a class="link-chap text-reset" href="chapter17.html">บทที่ 17 เมต้าโปรแกรมมิ่ง</a><br>
          <a class="link-chap text-reset" href="chapter18.html">บทที่ 18 พรอมิส</a><br>
          <a class="link-chap text-reset" href="chapter19.html">บทที่ 19 การใช้งาน async กับ await</a><br>
          <a class="link-chap text-reset" href="chapter20.html">บทที่ 20 มอดูล</a><br>		  
		  <a class="link-chap text-reset" href="https://www.mebmarket.com/web/index.php?action=BookDetails&data=YToyOntzOjc6InVzZXJfaWQiO3M6NzoiMTcyNTQ4MyI7czo3OiJib29rX2lkIjtzOjY6IjI0OTQwOCI7fQ">พื้นฐาน Node.js</a><br>
		  <a class="link-chap text-reset" href="Chap08.htm">พื้นฐาน React</a><br>
		  <a class="link-chap text-reset" href="https://github.com/adminho/javascript/tree/master/examples_book/Appendix_B" target="_blank">ภาคผนวก ข</a><br>
		  <a class="link-chap text-reset" href="https://github.com/adminho/javascript/blob/master/examples_book/json.php" target="_blank">ไฟล์ json.php</a><br>		  
		  <a class="link-chap text-reset" href="https://github.com/adminho/javascript/blob/master/examples_book/README.md">Github</a><br>					
		</div>		
	</div>
	
	<div class="footer"><strong>แนะนำเปิดบนคอมพิวเตอร์ตั้งโต๊ะ หรือโน๊ตบุค </strong></div>
	<script src="init_page.js?v=5.6"></script>
	<script>
		let no = <?php echo $no; ?>;				
		//let url = `chapter${no.toString().padStart(2,'0')}.html`;
		let alink = document.getElementsByClassName("link-chap")[no];
		includeHTML(alink);
		//window.location.replace(url);
		
	</script>
</body>
</html>