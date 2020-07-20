module.exports = {
    getDate: function () {
        //find the date for today and display it in long form
        let today = new Date
        let options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long'

        };
        return today.toLocaleDateString("en-US", options);
    },
}