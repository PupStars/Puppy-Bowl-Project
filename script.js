// Fetch and display all puppy players
async function fetchPlayers() {
    try {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/players');
      const result = await response.json();
  
      if (result.success) {
        const players = result.data.players;
        const playersContainer = document.getElementById('players-container');
  
        // Clear the players container
        playersContainer.innerHTML = '';
  
        // Render each player
        players.forEach(player => {
          const playerCard = createPlayerCard(player);
          playersContainer.appendChild(playerCard);
        });
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  // Helper function to create a player card element
  function createPlayerCard(player) {
    const card = document.createElement('div');
    card.classList.add('player-card');
  
    const image = document.createElement('img');
    image.src = player.imageUrl;
    image.alt = player.name;
    card.appendChild(image);
  
    const name = document.createElement('h2');
    name.textContent = player.name;
    card.appendChild(name);
  
    const breed = document.createElement('p');
    breed.textContent = `Breed: ${player.breed}`;
    card.appendChild(breed);
  
    const status = document.createElement('p');
    status.textContent = `Status: ${player.status}`;
    card.appendChild(status);
  
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removePlayer(player.id));
    card.appendChild(removeButton);
  
    return card;
  }
  
  // Add a new player
  async function addPlayer(event) {
    event.preventDefault();
  
    const form = document.getElementById('add-player-form');
    const nameInput = document.getElementById('name');
    const breedInput = document.getElementById('breed');
    const imageUrlInput = document.getElementById('imageUrl');
  
    const player = {
      name: nameInput.value,
      breed: breedInput.value,
      imageUrl: imageUrlInput.value
    };
  
    try {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(player),
      });
      const result = await response.json();
  
      if (result.success) {
        nameInput.value = '';
        breedInput.value = '';
        imageUrlInput.value = '';
  
        // Fetch and display the updated list of players
        fetchPlayers();
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  // Remove a player
  async function removePlayer(playerId) {
    try {
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2302-acc-pt-web-pt-a/players/${playerId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
  
      if (result.success) {
        // Fetch and display the updated list of players
        fetchPlayers();
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  // Fetch and display initial list of players
  fetchPlayers();
  
  // Add event listener to the form
  const addPlayerForm = document.getElementById('add-player-form');
  addPlayerForm.addEventListener('submit', addPlayer);
  