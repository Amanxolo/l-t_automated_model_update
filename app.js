const express = require('express')
const app = express()
const { exec } = require('child_process');
// const axios = require('axios');

const path = require('path')
const bodyParser = require("body-parser");
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.static(__dirname + '/public'))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

// app.get('/predictions', async (req, res) => {
//     try {
//         // Make HTTP request to Python server
//         const response = await axios.get('http://127.0.0.1:5000/get_df');
//         const df = response.data; // DataFrame received from the Python server

//         // Send df variable as JSON response
//         res.json(df);
//     } catch (error) {
//         console.error('Error fetching df:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });




app.get('/execute-notebook', (req, res) => {

    
    const executedNotebookPath1 = path.join(__dirname, 'models', 'Tweets-Scraping-software.ipynb_executed.ipynb');  // ADDED
    const executedNotebookPath2 = path.join(__dirname, 'models', 'L&T_Sentiment_Analysis_Final.ipynb_executed.ipynb'); // ADDED
    const data = path.join(__dirname, 'models', 'data.json'); // ADDED

    // ADDED
    fs.unlink(data, (err) => {
        if (err) {
            console.error(`Error deleting executed notebook: ${err}`);
            return;
        }
        console.log('Executed notebook deleted successfully!');
    });

    // ADDED
    fs.unlink(executedNotebookPath1, (err) => {
        if (err) {
            console.error(`Error deleting executed notebook: ${err}`);
            return;
        }
        console.log('Executed notebook deleted successfully!');
    });

    //ADDED
    fs.unlink(executedNotebookPath2, (err) => {
        if (err) {
            console.error(`Error deleting executed notebook: ${err}`);
            return;
        }
        console.log('Executed notebook deleted successfully!');
    });

    //OLD STUFF BUT SEE RESPONSE

    const notebookPath1 = path.join(__dirname, 'models', 'Tweets-Scraping-software.ipynb');
    const notebookPath2 = path.join(__dirname, 'models', 'L&T_Sentiment_Analysis_Final.ipynb');
    // Execute the Jupyter Notebook using nbconvert command
    exec(`jupyter nbconvert --execute "${notebookPath1}" --to notebook --output "${notebookPath1}_executed.ipynb"`, (error, stdout, stderr) => {
        
        // Notebook executed successfully, no output to return
    });
    exec(`jupyter nbconvert --execute "${notebookPath2}" --to notebook --output "${notebookPath2}_executed.ipynb"`, (error, stdout, stderr) => {
        
        // Notebook executed successfully, no output to return
    });
    

    //ADDED
    setTimeout(() => {
        var hoteljsonFile = require(path.join(__dirname,'models','data.json')); // path of your json file

        res.json(hoteljsonFile);
    }, 60000); // Delay of 5000 milliseconds (60 seconds)

});
app.listen(9000, () => console.log('Visit localhost:9000'))
