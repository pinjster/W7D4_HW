
let audio;

async function getToken(){
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    })
    if(response.ok){
        const data = await response.json();
        return data.access_token;
    } 
    else{
        window.alert('Bad Spotify');
    }
}

//(async () => await console.log(getToken()))()

async function getSong(track, artist){
    const res = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist&limit=5`, {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${await getToken()}`,
            'Content-Type' : 'application/json'
        }
    })
    if(res.ok){
        const data = await res.json();
        //console.log(data.tracks.items[0].preview_url);
        return data.tracks.items[0].preview_url;
    }
    else{
        window.alert('bad request');
    }
}

(async () => console.log(getSong('Dirty Harry', 'Gorillaz')))();

const imgs = document.getElementsByTagName('img');
console.log(imgs);

for(const img of imgs){
    img.addEventListener('click',async (e) => {
        e.defaultPrevented;
        console.log(img.alt);
        const [song, artist] = img.alt.split(' - ');
        console.log(await getSong(song, artist));
        const url = await getSong(song, artist);
        if(audio){
            stopSong();
        }
        playSong(url)
    } )
}

function playSong(url){
    audio = new Audio(url);
    audio.volume = .2;
    audio.play();
}

function stopSong(){
    audio.pause();
}

document.getElementById('stop-btn').addEventListener('click', stopSong)