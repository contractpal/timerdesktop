var hour = 0;
var min = 0;
var sec = 0;
var hourlt = "0";
var minlt = "0";
var seclt = "0";
var intervalId;
var name;
var recentJobs = ["filler"];
var oldtr = [];

//This gets todays date and displays it in mm/dd/yyyy format
function getCurrentDate()
{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth();
    var yyyy = today.getFullYear();
    //If the number is less than 10, put a zero so it still taks up the same amount of space
    if (dd < 10)
        {
            dd = "0" + dd;
        }
    if (mm < 10)
        {
            mm = "0" + mm;
        }
    document.getElementById("currentDate").innerHTML = mm + "/" + dd + "/" + yyyy;
}

//This starts the timer and keeps track of the interval so that I can stop the timer.
//I disable the buttons that would start a new timer on top of this one so we don't have multiple running at once
function startTimer()
{
    intervalId = setInterval(Timer, 1000);
    document.getElementById("startButton").disabled = true;
    document.getElementById("submitNewJob").disabled = true;
    document.getElementById("newJob").disabled = true;
    document.getElementById("stopButton").disabled = false;
}

//This adds a second every second, if 60 seconds pass, minutes go up one, if 60 minutes pass, hours go up one
function Timer(){
    sec++;
    if (sec == 60)
        {
            sec = 0;
            min ++;
        }
    if (min == 60)
        {
            hour++;
            min = 0;
        }
    //Find out if numbers are double digit or not, so we can always display two digits
    if (sec < 10)
        {
            seclt = "0";
        }
    else
        {
            seclt = "";
        }
    if (min < 10)
        {
            minlt = "0";
        }
    else
        {
            minlt = "";
        }
    if (hour < 10)
        {
            hourlt = "0";
        }
    else
        {
            hourlt = "";
        }
    document.getElementById("timerHour").innerHTML = hourlt + hour + ":";
    document.getElementById("timerMinute").innerHTML = minlt + min + ":";
    document.getElementById("timerSecond").innerHTML = seclt + sec;
}

//Stop the timer and allow the user to do functions that would start a timer again
function stopTimer(){
    clearInterval(intervalId);
    document.getElementById("startButton").disabled = false;
    document.getElementById("submitNewJob").disabled = false;
    document.getElementById("newJob").disabled = false;
    document.getElementById("stopButton").disabled = true;
}

//Allow the users to change their name by making the fields and buttons visible
function changeName(){
    document.getElementById("changeName").style.display = "none";
    document.getElementById("saveName").style.display = "";
    document.getElementById("nameField").disabled = false;
}

//Save the name and make the fields and buttons invisible again
function saveName(){
    document.getElementById("changeName").style.display = "";
    document.getElementById("saveName").style.display = "none";
    document.getElementById("nameField").disabled = true;
    name = document.getElementById("nameField").innerHTML;
}

//Make it so the fields needed to add a new job are visible
function addNewJob(){
    document.getElementById("newJobRowOne").style.display = "";
    document.getElementById("newJobRowTwo").style.display = "";
    document.getElementById("startButton").disabled = true;
}


//Create the new job and add the old job to the recent jobs list
function createJob(){
    //Do this if the limit of the recent jobs has not been reached
    if(recentJobs.length < 5)
        {
            //this means this the the first element added to the array, so take it out and replace it
            if(recentJobs[0] == "filler")
                {
                    recentJobs[0] = document.getElementById("activeJobName").innerHTML;
                }
            //this means that the array has already been added to, so just tack this on the end
            else
                {
                    recentJobs.push(document.getElementById("activeJobName").innerHTML);
                }
            //Create a new row in the table
            var tr = document.createElement("tr");
            //Create three td elements and a button
            var tdName = document.createElement("td");
            var tdTime = document.createElement("td");
            var tdButton = document.createElement("td");
            var button = document.createElement("input");
            //set up the attributes of the button
            button.setAttribute("type", "button");
            button.setAttribute("value", "Start");
            //add a listener that will keep track of where the name of the old job is
            button.addEventListener("click", function(){startOldJob(recentJobs.length);});
            //Add the button to the td
            tdButton.appendChild(button);
            //Get the current time and name of the job before we replace it
            tdName.innerHTML = document.getElementById("activeJobName").innerHTML;
            tdTime.innerHTML = document.getElementById("timerHour").innerHTML + ":" + document.getElementById("timerMinute").innerHTML + ":" + document.getElementById("timerSecond").innerHTML;
            //Add the td's to the tr we made
            tr.appendChild(tdName);
            tr.appendChild(tdTime);
            tr.appendChild(tdButton);
            //This is to keep track of the tr's so we can delete them when we have more than 5
            oldtr.push(tr);
            //Add the tr to the document
            document.getElementById("recentJobs").appendChild(tr);
            //replace the job with the new one, and make the adding job stuff disappear
            document.getElementById("activeJobName").innerHTML = document.getElementById("newJobName").value;
            document.getElementById("newJobRowOne").style.display = "none";
            document.getElementById("newJobRowTwo").style.display = "none";
            //Parse the time worked into hours and minutes to ensure that its all set up right
            hour = parseInt(document.getElementById("timeAlreadyWorked").value);
            if (hour == 0)
            {
                min = (parseFloat(document.getElementById("timeAlreadyWorked").value) * 60);
            }
            else
            {
                min = (parseFloat(document.getElementById("timeAlreadyWorked").value) % parseInt(document.getElementById("timeAlreadyWorked").value)) * 60;
            }
            //Set the seconds to zero so it doesn't carry over any time from the last job
            sec = 0;
            //Start the timer for a new job
            startTimer();
        }
    //This means that the recent job table is already full
    else{
        //This takes out the job that was added the longest time ago
        document.getElementById("recentJobs").removeChild(oldtr[0]);
        //This goes through and moves all the newer elements into higher positions to replace
        for(var i = 0; i < 4; i++)
            {
                recentJobs[i] = recentJobs[i+1];
                oldtr[i] = oldtr[i+1];
            }
        //now add the job that is about to change out
        recentJobs[4] = document.getElementById("activeJobName").innerHTML;
        var tr = document.createElement("tr");
        var tdName = document.createElement("td");
        var tdTime = document.createElement("td");
        var tdButton = document.createElement("td");
        var button = document.createElement("input");
        button.setAttribute("type", "button");
        button.setAttribute("value", "Start");
        button.addEventListener("click", function(){startOldJob(recentJobs.length);});
        tdButton.appendChild(button);
        tdName.innerHTML = document.getElementById("activeJobName").innerHTML;
        tdTime.innerHTML = document.getElementById("timerHour").innerHTML + ":" + document.getElementById("timerMinute").innerHTML + ":" + document.getElementById("timerSecond").innerHTML;
        tr.appendChild(tdName);
        tr.appendChild(tdTime);
        tr.appendChild(tdButton);
        //put the new tr in the same position as the spot that is now empty
        oldtr[4]=tr;
        document.getElementById("recentJobs").appendChild(tr);
        document.getElementById("activeJobName").innerHTML = document.getElementById("newJobName").value;
        document.getElementById("newJobRowOne").style.display = "none";
        document.getElementById("newJobRowTwo").style.display = "none";
        hour = parseInt(document.getElementById("timeAlreadyWorked").value);
        if (hour == 0)
        {
            min = (parseFloat(document.getElementById("timeAlreadyWorked").value) * 60);
        }
        else
        {
            min = (parseFloat(document.getElementById("timeAlreadyWorked").value) % parseInt(document.getElementById("timeAlreadyWorked").value)) * 60;
        }
        startTimer();
        sec = 0;
    }
}

//This is how you start a new job
function startOldJob(index){
    //Stop the timer that is currenly running
    stopTimer(intervalId);
    //Create a new job with the name of the job you want to use
    createJob();
    hour = 0;
    min = 0;
    sec = 0;
    document.getElementById("activeJobName").innerHTML = recentJobs[index - 1];
    console.log(recentJobs);
}