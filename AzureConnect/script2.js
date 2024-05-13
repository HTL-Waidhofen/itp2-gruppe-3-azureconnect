
document.addEventListener('DOMContentLoaded', function () {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let currentDay = currentDate.getDate();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    
    function renderCalendar(month, year) {
        const firstDayOfMonth = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startingDay = firstDayOfMonth.getDay();
    
        const calendarBody = document.querySelector('.datepicker-calendar');
    
        const monthSelector = document.querySelector('.month-name');
        monthSelector.textContent = monthNames[month] + ' ' + year;
    
        for (let i = 0; i < startingDay; i++) {
            const blankSpace = document.createElement('button');
            blankSpace.classList.add('date', 'faded');
            calendarBody.appendChild(blankSpace);
        }
    
        for (let i = 1; i <= daysInMonth; i++) {
            const dateButton = document.createElement('button');
            dateButton.classList.add('date');
            dateButton.textContent = i;
            calendarBody.appendChild(dateButton);
    
            if (month === currentMonth && year === currentYear) {
                dateButton.addEventListener('click', function () {
                    showAppointments(i, month, year);
                    // Entferne zuerst die Klasse 'selected-day' von allen Tagen
                    const allDates = document.querySelectorAll('.date');
                    allDates.forEach((date) => {
                        date.classList.remove('selected-day');
                    });
                    // Füge die Klasse 'selected-day' nur zum angeklickten Tag hinzu
                    dateButton.classList.add('selected-day');
                });
                if (i === currentDay) {
                    dateButton.classList.add('current-day');
                    showAppointments(i, month, year);
                }
            } else {
                dateButton.classList.add('faded');
            }
        }
    }
    
    function showAppointments(day, month, year) {
        const appointmentsContainer = document.querySelector('.appointments');
        appointmentsContainer.innerHTML = `<h2 class="headline">Termine am ${day}.${month + 1}.${year}</h2>`;
        
        // Hinzufügen eines Containers für die Termine
        const appointmentList = document.createElement('div');
        appointmentList.classList.add('appointment-list');
        appointmentsContainer.appendChild(appointmentList);
    
        // Hier können weitere Logik implementiert werden, um die Termine für den ausgewählten Tag anzuzeigen
    }
    
    function changeMonth(direction) {
        if (direction === 'next') {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        } else {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
        }
        renderCalendar(currentMonth, currentYear);
    }
    
    renderCalendar(currentMonth, currentYear);
    
    const prevMonthBtn = document.querySelector('.month-selector .arrow:first-child');
    prevMonthBtn.addEventListener('click', function () {
        changeMonth('prev');
    });
    
    const nextMonthBtn = document.querySelector('.month-selector .arrow:last-child');
    nextMonthBtn.addEventListener('click', function () {
        changeMonth('next');
    });
    
    const createAppointmentBtn = document.querySelector('.btn-create-appointment');
    createAppointmentBtn.addEventListener('click', function () {
        createAppointment();
    });
    
    function createAppointment() {
        const appointmentList = document.querySelector('.appointment-list');
        const newAppointment = document.createElement('div');
        newAppointment.textContent = 'Neuer Termin';
        appointmentList.appendChild(newAppointment);
    }
});
