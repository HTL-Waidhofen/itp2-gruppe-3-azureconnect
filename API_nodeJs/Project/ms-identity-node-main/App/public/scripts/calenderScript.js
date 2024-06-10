console.log(calendar);

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".arrow");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

document.getElementById("header_selDate").innerHTML = "Termine am " + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li onclick="getDateInformation(id)" id="${i}" class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;

}

renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});


/*
const createAppointmentButton = document.querySelector('.btn-create-appointment');

const appointmentsList = document.querySelector('.appointmentslist');

let formExists = false; 

function addAppointment() {
    if (!formExists) {
        formExists = true;
        const form = document.createElement('form');

        const newAppointment = document.createElement('input');
        newAppointment.type = 'text';
        newAppointment.name = 'appointmentText';

        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Bestätigen';

        form.appendChild(newAppointment);
        form.appendChild(confirmButton);

        appointmentsList.appendChild(form);

        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const appointmentText = newAppointment.value;

            appointmentsList.removeChild(form);
            formExists = false;

            const appointmentDiv = document.createElement('div');
            appointmentDiv.textContent = appointmentText;

            const editButton = document.createElement('button');
            editButton.textContent = 'Bearbeiten';

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Löschen';

            deleteButton.addEventListener('click', function() {
                appointmentsList.removeChild(appointmentDiv);
            });

            editButton.addEventListener('click', function() {
                const editInput = document.createElement('input');
                editInput.type = 'text';
                editInput.value = appointmentText;

                appointmentDiv.textContent = '';
                appointmentDiv.appendChild(editInput);

                const confirmEditButton = document.createElement('button');
                confirmEditButton.textContent = 'Bestätigen';

                appointmentDiv.appendChild(confirmEditButton);

                confirmEditButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    appointmentDiv.textContent = editInput.value;
                    appointmentDiv.appendChild(editButton);
                    appointmentDiv.appendChild(deleteButton);
                });
            });

            appointmentDiv.appendChild(editButton);
            appointmentDiv.appendChild(deleteButton);
            appointmentsList.appendChild(appointmentDiv);
        });
        
    }
}
createAppointmentButton.addEventListener('click', addAppointment);

*/




function getDateInformation(id){
    date.setFullYear(document.getElementById("current-date").innerText.split(" ")[1]);
    let month = document.getElementById("current-date").innerText.split(" ")[0];
    for(var i = 1; i <= months.length; i++){
        if(month == months[i]){
            date.setMonth(i);
            break;
        }
    }
    date.setDate(id);  
    document.getElementById("header_selDate").innerHTML = "Termine am " + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

    
    let returnDate = (document.getElementById("current-date").innerText.split(" ")[1]) + "-" + (date.getMonth()+1) + "-" + date.getDate();

    if(date.getMonth() < 10 && date.getDate() < 10){
        returnDate = (document.getElementById("current-date").innerText.split(" ")[1]) + "-0" + (date.getMonth()+1) + "-0" + date.getDate();
    }
    else if(date.getMonth() < 10){
        returnDate = (document.getElementById("current-date").innerText.split(" ")[1]) + "-0" + (date.getMonth()+1) + "-" + date.getDate();
    }
    else if(date.getDate() < 10){
        returnDate = (document.getElementById("current-date").innerText.split(" ")[1]) + "-" + (date.getMonth()+1) + "-0" + date.getDate();
    }
    
    let foundMatch = false;

    calendar.forEach(c => {
        let appDate = c.start.dateTime;

        if (appDate.substring(0, 10) === returnDate.toString()) {
            document.getElementById('appointmentlist').innerHTML = `
                <div>
                    <h3 class="inline">Betreff</h3>
                    <div class="inline">${c.subject}</div>
                </div>
                <div>
                    <h3 class="inline">Von</h3>
                    <div class="inline">${appDate.substring(11, 16)}</div>
                </div>
                <div>
                    <h3 class="inline">Bis</h3>
                    <div class="inline">${c.end.dateTime.substring(11, 16)}</div>
                </div>
            `;
            foundMatch = true;
            return;
        }
    });
    if (!foundMatch) {
        document.getElementById('appointmentlist').innerHTML = "";
    }
}