const mongoose = require('mongoose');
/* const password = require('./password.js'); */
const password = 'UMegFECG3rLW3AU9';


const db = `mongodb+srv://Lorenzo-Pachioli:${password}@cluster0.afsld.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(db)
.then(() => console.log('Connected'))
.catch(error => console.error(error))



