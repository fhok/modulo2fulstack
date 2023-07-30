
module.exports = {
  createdDate() {
    return moment().format('DD-MM-YYYY');
  },

  isDateFormat(dateString) {
    console.log('dateString', dateString);
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  },

  
};
