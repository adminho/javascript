/*<!-- Adapt from http://www.w3schools.com/howto/howto_css_calendar.asp */
const mapMonth = new Map();	// 	ES6
mapMonth.set(0, "January");
mapMonth.set(1, "February");
mapMonth.set(2, "March");
mapMonth.set(3, "April");
mapMonth.set(4, "May");
mapMonth.set(5, "June");
mapMonth.set(6, "July");
mapMonth.set(7, "August");
mapMonth.set(8, "September");
mapMonth.set(9, "October");
mapMonth.set(10, "November");
mapMonth.set(11, "December");

const weekDayMap = new Map(); // 	ES6
weekDayMap.set(0, "Su");
weekDayMap.set(1, "Mo");
weekDayMap.set(2, "Tu");
weekDayMap.set(3, "We");
weekDayMap.set(4, "Th");
weekDayMap.set(5, "Fr");
weekDayMap.set(6, "Sa");

class MyCalendar{	// 	ES6
	constructor(id) {
		this.num_sytem = 10; // default
		this.date = new Date;
		this.date.setDate(1);
		this.div = $(`#${id}`);
		this.div.empty();					
	}
	
	////////////////////////////////////
	//---------- private ------------//
	_pad(value, size) {
		let num_sytem = this.num_sytem;
		var s = Number(value).toString(num_sytem);
		while (s.length < size)
			s = "0" + s;
			
		if(num_sytem == 16) 
			s = "0x" + s
		
		return s;
	}
	
	_convertNum(num) {
		return this.num_sytem!=10 ? this._pad(num, 2) : num;
	}

	_convertMonth(num) {
		return this.num_sytem!=10 ? this._pad(num+1, 2) : mapMonth.get(num);	
	}

	_convertWeekdays(num) {
		return this.num_sytem!=10 ? this._pad(num+1, 2) : weekDayMap.get(num)
	}
	
	_getDateInfo(date){			
		let begin_day = new Date (date.getFullYear(), date.getMonth(), 1);
		let begin_day_date = begin_day.getDay();

		let end_day = new Date (date.getFullYear(), date.getMonth()+1, 1);
		let count_day = (end_day - begin_day)/1000/60/60/24;
	
		return {begin_day_date, count_day};	 
	}
	////////////////////////////////////

	////////////////////////////////////
	//---------- public --------------//
	getDate(){
		return this.date;
	}
	
	setMonth(m){
		this.date.setMonth(m);  // January is 0, February is 1, ....December is 11
	}

	setYear(y){
		this.date.setFullYear(y);
	}

	setNumberSystem(numSytem){
		this.num_sytem = numSytem;
	}
	
	setMonthYear(month, year){
		this.setMonth(month);
		this.setYear(year);
	}
	
	getFormatedYear(){
		return this._convertNum(this.date.getFullYear())
	}
	
	display(isShowYear=true){ // default parameter
		// clear old calendar
		let div = this.div;
		div.empty();
		this.div.html(templateCal);	
		
		let year = div.find("h1.year"); 
		let month = div.find("div.month ul"); 
		let weekdays = div.find("ul.weekdays"); 
		let days = div.find("ul.days"); 
		
		let date = this.date;	
		
		// with out header of a year or not
		isShowYear ? year.html(this.getFormatedYear()) :{} ;
		
		month.append(`<li style="text-align:center">${this._convertMonth(date.getMonth())}</li>`);

		let {begin_day_date,count_day} = this._getDateInfo(date);
		for( let i =0; i< 7; i++)
			weekdays.append(`<li>${this._convertWeekdays(i)}</li>\n`);
		
		for( let i =0; i< begin_day_date; i++)	// free space
			days.append(`<li></li>\n`);
	
		for( let i =0; i< count_day; i++)
			days.append(`<li>${this._convertNum(i + 1)}</li>\n`);
	
	}//end method
}//end class