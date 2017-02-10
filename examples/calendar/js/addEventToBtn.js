
let default_year = new Date().getFullYear();
let default_num_sym = 10;

let calendar = new MyCalendar("calendar_one");
calendar.display();

let monthList = $('#monthList');
let yearList = $( "#yearList");
let systemList = $("#sytemNumList");

// set dropdow list for a month
let monthArray = ["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"];
for( let i = 0; i<monthArray.length; i++)
{
	$('#monthList').append($('<option>', {
		value: i,
		text: monthArray[i]
	}));
}
monthList.change(function() {
	calendar.setMonth(this.value);
	calendar.display();
});
monthList.val(calendar.getDate().getMonth());

// set dropdow list for a year
for( let y=1950; y<3000; y++){
	yearList.append($('<option>', {
		value: y,
		text: y
	}));
}
yearList.val(default_year); // show default value

yearList.change(function() {
		calendar.setYear(this.value);
		calendar.display();	
});

// set dropdow list for a system number
systemList.change(function() {	
	calendar.setNumberSystem(this.value);
	calendar.display();	
});
systemList.val(default_num_sym); // show default value
