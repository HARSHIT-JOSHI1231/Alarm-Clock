        //Setting up the digital clock
        const displayTime = document.getElementById('clock');
        
        //function for setting up time and update it every second
        function updateTime(){
            var date= new Date();
            const hours = formatTime(date.getHours());
            const minutes = formatTime(date.getMinutes());
            const seconds = formatTime(date.getSeconds());

            let now = `${hours}:${minutes}:${seconds}`;

            displayTime.innerText = now;
            //If alarm_List includes "now then alarm will ring"
                if(alarm_List.includes(now)){
                    ringing(now);
                }
                
        }
        //calls update time every seconds
        setInterval(updateTime,1000);
    
        //function for putting 0 before singal digit of hr, min, sec
        function formatTime(time){
            if(time < 10 && time.length !=2){
                return '0'+ time;
            }
            return time;
        }

        //audio to ring alarm
        const audio = new Audio('assets/alarm.wav');
        audio.loop=true;

        //function to ring the alarm
        function ringing(now){
            audio.play();
            alert(`Wake up!!Its ${now}`);
        }
        //setting up an array for creating a list of alarm
        let alarm_List=[];
        const myList = document.querySelector('#setAlarmList');
        
        const userInput = document.querySelector('.setAlarmTime');

        //for setting Alarm time
        userInput.addEventListener('submit', (e)=>{
            e.preventDefault();
            let new_hours = formatTime(userInput.a_hour.value);
            if(new_hours ==='0'){
                new_hours= '00'
            }
            let new_minutes = formatTime(userInput.a_min.value);
            if(new_minutes === '0'){
                new_minutes= '00'
            }
            let new_seconds = formatTime(userInput.a_sec.value);
            if(new_seconds ==='0'){
                new_seconds= '00'
            }

            const newAlarm = `${new_hours}:${new_minutes}:${new_seconds}`
            if(isNaN(newAlarm)){
                if(!alarm_List.includes(newAlarm)){
                    alarm_List.push(newAlarm);
                    console.log(alarm_List);
                    showNewAlarm(newAlarm);
                }
                else{
                    alert(`Alarm for ${newAlarm} is already set...`);
                }

            }else{
                alert('Invalid Time Enter');
            }

        });


        let alarmTimeout=null;
        //function to stop the alarm
        function clearAlarm(){
            audio.pause();
                clearTimeout(alarmTimeout);
                alert('Alarm Cleared');
        } 

        // function for Adding new Alarms to the list as a new li on webpage
        //also adding a delete button in the list
        function showNewAlarm(newAlarm){
            const html = `
            <li class="time-list">
                <span class="time">${newAlarm}</span>
                <button class="deleteAlarm time-control" onclick = 'remove(this.value)' value = ${newAlarm}>Delete</button>
            </li>
            <br>`;
            myList.innerHTML+=html;
        }
        
        // removes an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
        myList.addEventListener('click',(e)=>{
            if(e.target.classList.contains('deleteAlarm')){
                e.target.parentElement.remove();
            }
        });

        //remove alarm from arraylist
        const remove = (value)=>{
            let newList = alarm_List.filter((time)=> time!=value);
            alarm_List.length=0;  //removes the alarms
            alarm_List.push.apply(alarm_List, newList);
        }
    