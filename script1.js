var date = new Date();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

var table = document.getElementById("calendar");

function renderCalendar() {
	setHeaders();
	getCalendar();
}

function getCalendar() {
	var month = date.getMonth();
	var year = date.getFullYear();
	
	var first_day = new Date(months[month] + " " + 1 + " " + year).toDateString().substring(0, 3);
	var day_no = days.indexOf(first_day);
	var total_days = new Date(year, month + 1, 0).getDate();
	
	getWeekDayNames();
	var count = getFirstRowDates(day_no, total_days);
	getRemainingDates(total_days, count);
}

function getRemainingDates(total_days, count) {
	for (var i = 0; i <= 4; i++) {
		var tr = document.createElement("tr");
		for (var j = 0; j <= 6; j++) {
			if (count > total_days) {
				table.appendChild(tr);
				return table;
			}
			var td = document.createElement("td");
			td.innerHTML = count;
			count++;
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

function getFirstRowDates(day_no, total_days) {
	var tr = document.createElement("tr")
	var i;
	for (i = 0; i < 6; i++) {
		if (i == day_no) {
			break;
		}
		var td = document.createElement("td");
		td.innerHTML = "";
		tr.appendChild(td);
	}
	
	var count = 1;
	for (; i <= 6; i++) {
		var td = document.createElement("td");
		td.innerHTML = count;
		count++;
		tr.appendChild(td);
	}
	table.appendChild(tr);
	return count;
}

function getWeekDayNames() {
	var tr = document.createElement("tr");

	for (var i = 0; i < 7; i++) {
		var td = document.createElement("td");
		td.innerHTML = days[i];
		tr.appendChild(td);
	}
	table.appendChild(tr);
}

function setHeaders() {
	document.getElementById("current_month").innerHTML = months[date.getMonth()];
	document.getElementById("current_date_stamp").innerHTML = date.toDateString();
}

function refreshCalendar(token) {
	if (token == 'prev') {
		date.setMonth(date.getMonth() - 1);
	}
	if (token == 'next') {
		date.setMonth(date.getMonth() + 1);
	}
	document.getElementById("calendar").innerHTML = "";
	renderCalendar();
}