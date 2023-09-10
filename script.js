// Replace with your own Google Sheets API credentials JSON file.
const CLIENT_ID = 'YOUR_CLIENT_ID.json';
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

// Function to initialize the API client.
function initClient() {
    gapi.client.init({
        'apiKey': CLIENT_ID,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        'clientId': CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/spreadsheets',
    }).then(function () {
        // API client is initialized, you can now use it.
    });
}

// Function to submit data to Google Sheets.
function submitData() {
    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;

    // Authenticate and load the API client.
    gapi.load('client', initClient);

    // Submit data to Google Sheets.
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1', // Change this to match your sheet name.
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            values: [[name, phone]]
        }
    }).then(function(response) {
        console.log('Data submitted successfully:', response);
        alert('Data submitted successfully!');
    }, function(error) {
        console.error('Error submitting data:', error);
        alert('Error submitting data. Please try again later.');
    });
}
