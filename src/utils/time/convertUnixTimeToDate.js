export const convertUnixTimeToDate = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000);

    // Get the day, month, and year from the date object
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const year = date.getFullYear().toString().substr(-2);

    // Concatenate the day, month, and year into a date string in the "dd/mm/yy" format
    const dateString = `${day}/${month}/${year}`;
    return dateString;
}