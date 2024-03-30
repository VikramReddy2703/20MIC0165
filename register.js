const axios = require('axios');
const data = {
    companyName: 'Vikram Reddy',
    clientID: '2e8920e7-6218-4de7-adaa-cba4bf7bccd2',
    clientSecret: 'qveIrdkatSXhxYhT',
    ownerName: 'Vikram S',
    ownerEmail: 'vikramreddy2703@gmail.com',
    rollNo: '20MIC0165'
};
axios.post('http://20.244.56.144/test/auth', data)
  .then(response => {
    console.log("API Response Status:", response.status);
    console.log("API Response Data:", response.data);
  })
  .catch(error => {
    console.error("Error:", error); 
  });


