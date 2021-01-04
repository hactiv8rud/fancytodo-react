function formatDueDate(due_date) {
  let months = [];
      months[1] = "January";
      months[2] = "February";
      months[3] = "March";
      months[4] = "April";
      months[5] = "May";
      months[6] = "June";
      months[7] = "July";
      months[8] = "August";
      months[9] = "September";
      months[10] = "October";
      months[11] = "November";
      months[12] = "December";
  
let weekday = [];
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  
  let d = new Date(due_date),	// Convert the passed timestamp to milliseconds
  yyyy = d.getFullYear(),
  mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
  dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
  date,
  day = d.getDay();

  let monthName = months[Number(mm)];
  let dayName = weekday[day];
  date= `${dayName}, ${dd} ${monthName} ${yyyy}`;

  return date;
}

export default formatDueDate;
