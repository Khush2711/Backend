function getCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based
    var year = currentDate.getFullYear();

    // Ensure day and month have two digits
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    var formattedDate = day + '-' + month + '-' + year;
    return formattedDate;
}


const currentDate = getCurrentDate();

module.exports = {currentDate};