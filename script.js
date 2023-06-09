const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('#new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-PT-WEB-PT-A';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch (APIURL);
        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};


const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(
          APIURL,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: 'Rufus',
              breed: 'Irish Setter',
            }),
          }
        );
        const result = await response.json();
        console.log(result);
      } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
    };
    

    const removePlayer = async (playerId) => {
        fetch(APIURL, {
            method: 'DELETE',
          });
          try {
            const response = await fetch(
              APIURL/1,
              {
                method: 'DELETE',
              }
            );
            const result = await response.json();
            console.log(result);
        } catch (err) {
            console.error(
                `Whoops, trouble removing player #${playerId} from the roster!`,
                err
            );
        }
    };

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        let playerContainerHTML = ''; // String to store the HTML for all players
        
        // Loop through the playerList and generate HTML for each player
        playerList.forEach((player) => {
            // Create a string of HTML for each player
            const playerHTML = `
                <div class="player-card">
                    <h3>${player.name}</h3>
                    <p>Breed: ${player.breed}</p>
                    <button class="details-btn" data-player-id="${player.id}">See details</button>
                    <button class="remove-btn" data-player-id="${player.id}">Remove from roster</button>
                </div>
            `;
            
            // Append the playerHTML to the playerContainerHTML
            playerContainerHTML += playerHTML;
        });
        
        // Add the playerContainerHTML to the playerContainer in the DOM
        playerContainer.innerHTML = playerContainerHTML;
        
        // Add event listeners to the buttons in each player card
        const detailsButtons = document.querySelectorAll('.details-btn');
        detailsButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const playerId = event.target.dataset.playerId;
                fetchSinglePlayer(playerId);
            });
        });
        
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const playerId = event.target.dataset.playerId;
                removePlayer(playerId);
            });
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();