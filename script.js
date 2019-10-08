var date = new Date();

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

var table;

function renderCalendar() {
	setHeaders();
	getCalendar();
	setInputs();
}

function setInputs() {
	var select = document.getElementById("year_dropdown");
	select.innerHTML = "";
	var option = document.createElement("option");
	option.setAttribute("readonly", true);
	option.innerHTML = "select";
	select.appendChild(option);
	for (var i = 2000; i < 2500; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", i);
		option.innerHTML = i;
		select.appendChild(option);
		if (i == date.getFullYear()) {
			option.setAttribute("selected", true);
		}
	}
	
	var monthSelect = document.getElementById("month_dropdown");
	monthSelect.innerHTML = "";
	var option = document.createElement("option");
	option.setAttribute("readonly", true);
	option.innerHTML = "select";
	monthSelect.appendChild(option);
	for (var i = 0; i < months.length; i++) {
		var option = document.createElement("option");
		option.setAttribute("value", i);
		option.innerHTML = months[i];
		monthSelect.appendChild(option);
		if (i == date.getMonth()) {
			option.setAttribute("selected", true);
		}
	}
}

function setCalendar() {
	var year = document.getElementById("year_dropdown").value;
	var month = document.getElementById("month_dropdown").value;
	date.setFullYear(year);
	date.setMonth(month);
	document.getElementById("calendar").innerHTML = "";
	setInputs();
	renderCalendar();
}

function setToday() {
	var tdy = new Date();
	document.getElementById("year_dropdown").value = tdy.getFullYear();
	document.getElementById("month_dropdown").value = tdy.getMonth();
	setCalendar();
}

function setTasks() {
	document.getElementById("remainders").innerHTML = "<p>Select a date to show tasks and remainders</p>";
}

function getCalendar() {
	setTasks()
	
	var month = date.getMonth();
	var year = date.getFullYear();
	
	var first_day = new Date(months[month] + " " + 1 + " " + year).toDateString().substring(0, 3);
	var day_no = days.indexOf(first_day);
	var total_days = new Date(year, month + 1, 0).getDate();
	
	table = document.getElementById("calendar");
	
	getWeekDayNames();
	var count = getFirstRowDates(day_no, total_days, month, year);
	getRemainingDates(total_days, count);
}

function getRemainingDates(total_days, count) {
	var k = 1;
	for (var i = 0; i <= 4; i++) {
		var tr = document.createElement("tr");
		var j;
		for (j = 0; j <= 6; j++) {
			if (count > total_days) {
				// add the below lines to not show the next month dates
				
				/* 
				* table.appendChild(tr);
				* return table;
				*/
				break;
			}
			var td = getCell(td, count, "current");
			count++;
			tr.appendChild(td);
		}
		// remove the below for loop to not show the next month dates
		for (; j <= 6; j++, k++) {
			var td = getCell(td, k, "next");
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

function getFirstRowDates(day_no, total_days, month, year) {
	var tr = document.createElement("tr");
	
	var prev_month_last_date = new Date(year, month, 0).getDate();
	var day = date.getDay();
	var prev_month_display_dates = 0;
	for (var i = day; i > 0; i--) {
		var td = getCell(td, prev_month_last_date - i + 1, "prev");
		tr.appendChild(td);
		prev_month_display_dates++;
	}
	
	var count = 1;
	for (var i = 0; i < 7 - prev_month_display_dates; i++) {
		
		var td = getCell(td, count, "current");
		count++;
		tr.appendChild(td);
		
	}
	table.appendChild(tr);
	return count;
}

function getCell(td, count, token) {
	var today = new Date();
	var month;
	
	var td = document.createElement("td");
	td.innerHTML = count;
	
	switch(token) {
		case "prev":
			td.className = "prev_next-month-date";
			month = date.getMonth() - 1;
			break;
		case "current":
			if (date.getMonth() == today.getMonth()) {
				if (count == today.getDate()) {
					if (today.getDay() == 0) {
					td.className = "active-holiday-date";
				}else {
					td.className = "today-date";
				}
				} else {
					td.className = "current-month-date";
				}
				
			} else {
				td.className = "refreshed-month-date";
			}
			month = date.getMonth();			
			break;
		case "next":
			td.className = "prev_next-month-date";
			month = date.getMonth() + 1;
			break;
		default:
			td.className = "date";
			break;
	}
	
	if (count == 31) {
		var tasks = "Apurva Birthday, Shopping";
		var container = document.createElement("div");
		td.classList.add("has-task");
		container.innerHTML = "1";
		container.setAttribute("data-remainder", tasks);
		td.appendChild(container);
	}
	
	td.addEventListener("click", function() {
		document.getElementById("remainders").innerHTML = "";
		var els = document.querySelectorAll('.active-date');
		for (var i = 0; i < els.length; i++) {
			els[i].classList.remove('active-date')
		}
		var els1 = document.querySelectorAll('.active-holiday-date');
		for (var i = 0; i < els1.length; i++) {
			els1[i].classList.remove('active-holiday-date')
		}
		td.className = "active-date";
		if (new Date(months[month] + " " + count + " " + date.getFullYear()).getDay() == 0) {
			td.className = "active-holiday-date";
		}
		if (token == "current") {
			// alert(new Date(months[month] + " " + count + " " + date.getFullYear()).toDateString());
		} else {
			refreshCalendar(token);
		}
		if (td.children.length > 0) {
			td.classList.add("has-task");
			var p = document.createElement("marquee");
			p.innerHTML = td.children[0]['dataset']['remainder'];
			document.getElementById("remainders").appendChild(p);
		} else {
			var p = document.createElement("marquee");
			p.innerHTML = "No Tasks";
			document.getElementById("remainders").appendChild(p);
		}
		
	});
	
	td.addEventListener("mouseenter", function() {
		var els = document.querySelectorAll('.hover-date');
		for (var i = 0; i < els.length; i++) {
			els[i].classList.remove('hover-date')
		}
		var els1 = document.querySelectorAll('.hover-holiday-date');
		for (var i = 0; i < els1.length; i++) {
			els1[i].classList.remove('hover-holiday-date')
		}
		td.classList.add("hover-date");
		if (new Date(months[month] + " " + count + " " + date.getFullYear()).getDay() == 0) {
			td.classList.add("hover-holiday-date");
		}
	});
	
	td.addEventListener("mouseleave", function() {
		var els = document.querySelectorAll('.hover-date');
		for (var i = 0; i < els.length; i++) {
			els[i].classList.remove('hover-date')
		}
		var els1 = document.querySelectorAll('.hover-holiday-date');
		for (var i = 0; i < els1.length; i++) {
			els1[i].classList.remove('hover-holiday-date')
		}
	});
		
	return td;
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
	document.getElementById("current_month_year").innerHTML = months[date.getMonth()] + " " + date.getFullYear();
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