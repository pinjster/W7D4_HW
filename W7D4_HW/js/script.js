//axios.get()

const flash = document.getElementById('flash-msg')
let infoBox = document.getElementById('info-box')

async function getData(s='current'){
    let api = await axios.get(`https://ergast.com/api/f1/${s}/driverStandings.json`)
    .then(function (response){
        flash.innerText = "";
        console.log(response);
        displayRound(response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings)
    }).catch(error => {
        flash.innerText = "This Year/Round does not exist";
    });
}

let submitForm = document.getElementById('year-round-form');
submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let year = document.querySelector('#year-form').value;
    let round = document.querySelector('#round-form').value;
    if(!year && !round){
        getData();
    }
    else if(!round){
        getData(`${year}`)
    }
    else{

        getData(`${year}/${round}`);
    }
})


async function displayRound(data){
    console.log(data);
    infoBox.replaceChildren()
    for(let i = 0; i < 7; i++){
        let displayInfo = document.createElement('div');
        displayInfo.className = "display-info";
        position = document.createElement('p');
        position.innerText = data[i].position
        driver = document.createElement('p');
        driver.innerText = data[i].Driver.givenName + " " + data[i].Driver.familyName
        nationality = document.createElement('p');
        nationality.innerText = data[i].Driver.nationality
        sponsor = document.createElement('p');
        sponsor.innerText = data[i].Constructors[0].name
        points = document.createElement('p');
        points.innerText = data[i].points
        displayInfo.append(position, driver, nationality, sponsor, points);
        console.log(position, driver, nationality, sponsor, points);
        infoBox.append(displayInfo);
    }
}