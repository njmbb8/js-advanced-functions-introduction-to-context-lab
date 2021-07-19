function createEmployeeRecord(args) {
    return {
        firstName: args[0],
        familyName: args[1],
        title: args[2],
        payPerHour: args[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(args){
    const arr = args.map((employeeRecord) => createEmployeeRecord(employeeRecord))
    return arr;
}

function createTimeInEvent(employeeRecord, dateStamp){
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, -5)
    });

    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, -5)
    })

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    let clockInTime;
    let clockOutTime;
    employeeRecord.timeInEvents.map(function(timeInEvent){
        if(timeInEvent.date === date){
            clockInTime = timeInEvent.hour;
        }
    })

    employeeRecord.timeOutEvents.map(function(timeOutEvent) {
        if(timeOutEvent.date === date){
            clockOutTime = timeOutEvent.hour;
        }
    })

    return Math.abs(clockInTime - clockOutTime)/100;
}

function wagesEarnedOnDate(employeeRecord, date){
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
}

function allWagesFor(employeeRecord) {
    const total = employeeRecord.timeInEvents.reduce(function(totalWages, currentDate){
        totalWages += wagesEarnedOnDate(employeeRecord, currentDate.date)
        return totalWages;
    }, 0);
    return total; 
}

function findEmployeeByFirstName(srcArray, firstName){
    let match;
    srcArray.forEach(function(employeeRecord){
        if(employeeRecord.firstName === firstName){
            match = employeeRecord;
        }
    })
    return match;
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, current) => total += allWagesFor(current), 0);
}