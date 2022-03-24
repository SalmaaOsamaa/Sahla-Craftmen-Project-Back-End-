const Tasker = require('./models/Tasker.model')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/testdb' , () => {
    console.log('hello');
}, e => console.log('not Connected'))
run();
async function run(){
    try {
        const user = await Tasker.create(
            {name : 'kyle',
            task : ["6239d1e3e56bd9d639eb7a28"],
        img : './1.png' , 
        Skills :['skill 1' , 'skill 2'] , 
        About : 'this is the best craftman in website' , 
        workarea : ["6239d1e3e56bd9d639eb7a28"],
        reviews : ["6239d1e3e56bd9d639eb7a28"],
        numberOfReviews : 10 , 
        requestStatus : 'Confirmed', 
        tasks : ["6239d1e3e56bd9d639eb7a28"]
        })
        console.log(user);
    } catch (e) {
        console.log(e.errors);
    }
}
