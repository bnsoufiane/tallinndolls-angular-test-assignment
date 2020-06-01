calcSellPrice = (amount, due_date) => {
    const d = new Date(due_date);
    const today = new Date();

    return ((daysBetween(today, d) > 30) ? 0.5 : 0.3) * amount;
};

validateInvoiceRow = (row, rowIndex) => {
    if (row.length !== 3) {
        return 'row ' + rowIndex + ': Incorrect number of columns.<br/>';
    }

    if (isNaN(row[1])) {
        return 'row ' + rowIndex + ': The invoice amount is invalid.<br/>';
    }

    const d = new Date(row[2]);
    if (!d instanceof Date || isNaN(d)) {
        return 'row ' + rowIndex + ': The due date is invalid.<br/>';
    }

    return false;
};

treatAsUTC = (date) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
};

daysBetween = (startDate, endDate) => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
};

module.exports = {
    calcSellPrice,
    validateInvoiceRow
};
