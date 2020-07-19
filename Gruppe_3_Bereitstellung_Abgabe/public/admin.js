document.addEventListener('DOMContentLoaded', () =>{
    getData()
    getNotification()
});

async function getData() {
    const response = await fetch('/getSFTWPOOLData');
    const data = await response.json();

    // console.log(data)
    loadHTML(data);

}


async function getNotification(){
    const response = await fetch('/getNotificationData')
    const data = await response.json();

    loadNotification(data);
}



document.getElementById('btn').addEventListener('click', insertData);

async function insertData(){
    const name = document.getElementById('sftwname').value;
    const beschreibung = document.getElementById('sftwbeschreibung').value;
    const link = document.getElementById('sftwlink').value;
    let software = {
        SoftwareName: name,
        Beschreibung: beschreibung,
        Link: link
    }
   
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(software)
    };

    const response = await fetch('/insert', options);
    const data = await response.json();
}





function loadHTML(data){
    const tbody = document.getElementById('data-table');
    let tbodyHTML = "";

    if(data.length === 0){
        tbody.innerHTML = "<tr><td class='no-dat' colspan='5'> No Data</td></tr>"
        return;
    }

    for(item of data) {
        tbodyHTML += "<tr>";
        tbodyHTML += `<td>${item.ID}</td>`
        tbodyHTML += `<td>${item.SOFTWARENAME}</td>`;
        tbodyHTML += `<td>${item.SOFTWARE_BESCHREIBUNG}</td>`;
        tbodyHTML += `<td>${item.SOFTWARELINK}</td>`;
        tbodyHTML += `<td><button class="delete-row-btn" data-id=${item.ID}>Delete</td>`;
        tbodyHTML += "</tr>";
    }

    tbody.innerHTML = tbodyHTML;
}


function loadNotification(data){
    const tbody = document.getElementById('notification-table');
    let tbodyHTML = "";

    if(data.length === 0){
        tbody.innerHTML = "<tr><td class='no-dat' colspan='5'> No Data</td></tr>"
        return;
    }

    for(item of data) {
        tbodyHTML += "<tr>";
        tbodyHTML += `<td>${item.ID}</td>`
        tbodyHTML += `<td>${item.GROUP_NAME}</td>`;
        tbodyHTML += `<td>${item.BESCHREIBUNGS_TEXT}</td>`;
        tbodyHTML += `<td><button class="delete-row-btn" data-id=${item.ID}>Erledigt</td>`;
        tbodyHTML += "</tr>";
    }

    tbody.innerHTML = tbodyHTML;
}


document.getElementById('data-table').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRow(event.target.dataset.id);
    }
});

document.getElementById('notification-table').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteNoctificationRow(event.target.dataset.id);
    }
});

async function deleteNoctificationRow(id){

    const deleteOption = {
        
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json"
            },
    };

    const response = await fetch('/deleteNotification/' + id, deleteOption);
    const data = await response.json();

    console.log(data);
}
