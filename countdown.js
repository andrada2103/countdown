        var timeinterval; // Variabila pentru intervalul de timp global

        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.now();
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            console.log('Time remaining:', t);
            console.log('Days:', days);
            console.log('Hours:', hours);
            console.log('Minutes:', minutes);
            console.log('Seconds:', seconds);
            debugger;
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(id, endtime) {
            var clock = document.getElementById('clockdiv');
            console.log(clock);
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            console.log(daysSpan, hoursSpan, minutesSpan, secondsSpan);
            if (!daysSpan || !hoursSpan || !minutesSpan || !secondsSpan) {
                console.error("One or more clock elements not found.");
                return;
            }

            function updateClock() {
                var t = getTimeRemaining(endtime);
                if (t.days > 0) {
            daysSpan.innerHTML = t.days;
                 } else {
            daysSpan.innerHTML = "0"; // Setăm la 0 dacă nu mai sunt zile
        }

                daysSpan.innerHTML = t.days;
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
                console.log("Days:", t.days);
                console.log("Hours:", t.hours);
                console.log("Minutes:", t.minutes);
                console.log("Seconds:", t.seconds);

                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }

            updateClock();
            timeinterval = setInterval(updateClock, 1000); // Definim timeinterval global
        }

        function startCountDown() {
            var dateInput = document.getElementById('dateInput').value;
            var timeInput = document.getElementById('timeInput').value;

            console.log("Date input:", dateInput);
            console.log("Time input:", timeInput);

            // Verificăm dacă ambele câmpuri au fost completate
            if (!dateInput || !timeInput) {
                console.error("Please provide both date and time.");
                return;
            }

            // Verificăm dacă data și ora introduse sunt în formatul corect
            var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            var timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

            if (!dateRegex.test(dateInput) || !timeRegex.test(timeInput)) {
                console.error("Invalid date or time format.");
                return;
            }

            // Concatenăm data și ora pentru a forma o singură dată
            var dateTimeInput = dateInput + 'T' + timeInput;
            var deadline = new Date(dateTimeInput);

            console.log("Parsed deadline:", deadline);
            initializeClock('clockdiv', deadline);
        }