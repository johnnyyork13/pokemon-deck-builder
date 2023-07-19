//28a09ffa-8ba8-4297-b7b3-e9be96bc4508
//https://api.pokemontcg.io/v2/cards

const pokeImg = document.getElementById('pokeImg');
const submitBtn = document.getElementById('submitBtn');
const textBox = document.getElementById('textBox');

async function getAllData() {
    const allData = "https://api.pokemontcg.io/v2/sets";
    const res = await fetch(allData);
    const data = await res.json();
    console.log(data);
}

async function loadCard(id) {
    const url = `https://api.pokemontcg.io/v2/cards/swsh45-${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    pokeImg.src = data.data.images.small;
}

getAllData();

submitBtn.addEventListener('click', function() {
    loadCard(textBox.value);
})