import express from "express";
import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';

// call imports
const app = express();
//to use the information typed from user
app.use(express.urlencoded({
    extended: true
}));
//for better understanding of dirname https://stackoverflow.com/questions/8131344/what-is-the-difference-between-dirname-and-in-node-js
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

//display the index.html as response
app.get('/', function (req, res) {
    //by using __dirname you call the directory where the code is located + the file you want to show.
    res.sendFile(__dirname + "/index.html");
})


//posting the results of the calculation
app.post('/', function (req, res) {
    let weight = parseFloat(req.body.weight);
    let height = parseFloat(req.body.height);
    
    let result = Math.floor(weight / ( height * height ));
    
    if ( result < 18.5 ){
        res.send("Your BMI is " + result + ". You're underweight according to the BMI.");
    } else if ( result < 25 ) {
        res.send("Your BMI is " + result + ". You're on your normal weight according to the BMI.");
    } else if ( result < 30 ) {
        res.send("Your BMI is " + result + ". You're overweight according to the BMI.");
    } else if ( result < 35 ) {
        res.send("Your BMI is " + result + ". You're obese according to the BMI.");
    } else if ( result >= 35 ) {
        res.send("Your BMI is " + result + ". You're extremely obese according to the BMI.");
    } else {
        res.send("Incorrect input. Please try again.")
    }

})


//creating the server instance
app.listen(3000, function () {
    console.log("Server has started on port 3000.");
});