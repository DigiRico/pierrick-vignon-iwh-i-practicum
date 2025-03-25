const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const TOKEN = process.env.HUBSPOT_TOKEN;

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here
app.get('/', async (req, res) => {
    const records = await getBike();
    res.render('homepage', { title: 'Bike', records });
    //console.log(records)
});

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 

* * App.get sample
app.get('/contacts', async (req, res) => {
    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });      
    } catch (error) {
        console.error(error);
    }
});

* * App.post sample
app.post('/update', async (req, res) => {
    const update = {
        properties: {
            "favorite_book": req.body.newVal
        }
    }

    const email = req.query.email;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});
*/

async function getBike() {
    const response = await axios.get("https://api.hubapi.com/crm/v3/objects/bikes?limit=100&properties=bike_name&properties=bike_model&properties=bike_date", {
        headers: {'Authorization': 'Bearer ' + TOKEN},
    });
    return response.data.results
}

async function createBikeRecord(bike_name, bike_model, bike_date) {
    const payload = {
        properties: {
            "bike_name": bike_name,
            "bike_model": bike_model,
            "bike_date": bike_date
          }
    }
    const headers = {
        'Authorization': 'Bearer ' + TOKEN, 
        'Content-type': 'application/json'
    }
    try {
        await axios.post("https://api.hubapi.com/crm/v3/objects/bikes", payload, {headers});
        res.redirect('back');
    } catch(err) {
        console.error(err)
    }
};

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));