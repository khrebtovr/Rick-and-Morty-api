async function getCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json(); 
    return data.results;
  }
  
  function createName(name,id) {
    const characterName = document.createElement('a');
    // characterName.href = `/details.html?id=${id}`;
    characterName.textContent = `Name: ${name}`;
    return characterName;
  }

  function createImage(imageUrl) {
    const characterImage = document.createElement('img');
    characterImage.src = imageUrl;
    return characterImage;
  }

  function createStatus(status) {
    const characterStatus = document.createElement('p');
    characterStatus.textContent = `Status: ${status}`;
    return characterStatus;
  }
  function createLinkEpisodes(id){
    const characterEpisodes= document.createElement('a');
    characterEpisodes.classList.add('link-episodes');
    characterEpisodes.href = `/details.html?id=${id}`;
    characterEpisodes.textContent = `Episodes`;
    return characterEpisodes;
  }

  function createButton(){
    const characterButton = document.createElement('button');
    characterButton.textContent = 'About the character';
    characterButton.classList.add('character-button')
    return characterButton;
  }

  function createId(card, id){
    card.setAttribute('id', id);
  }

  function createCharacterCard({ image, name, status, id }) {
    // const { image, name, status } = character
    const characterCard = document.createElement('div');
    characterCard.classList.add('card');
  
    const characterImage = createImage(image);
    const characterName = createName(name);
    const characterStatus = createStatus(status);
    const characterEpisodes = createLinkEpisodes(id);
    createId(characterCard, id);

    characterCard.append(characterImage, characterName, characterStatus, characterEpisodes ,createButton());
    return characterCard;
  }
  
  async function renderCharactersCards() {
    const charactersCards = document.createElement('div');
    charactersCards.classList.add('gallery');
    const characters = await getCharacters();
  
    for (let i = 0; i < characters.length; i++) {
      const characterCard = createCharacterCard(characters[i]);
      charactersCards.appendChild(characterCard);
    }
    const root = document.getElementById('root');
    root.appendChild(charactersCards);
  }
  

  async function mainFunc() {
    await renderCharactersCards();
    const buttons = document.querySelectorAll('.character-button');
    const modalOuter = document.querySelector('.modal-outer');
    const closeModalButton = document.querySelector('.close-modal');
    const modalInner = document.querySelector('.modal-inner');
    
    function openModal(event) {
      const card = event.target.closest('.card');
      const cardImage = card.querySelector('img').src;
      const cardName = card.querySelector('a').textContent;
      const cardStatus = card.querySelector('p').textContent;
      const modalImage = modalInner.querySelector('img');

      modalImage.src = cardImage;
      const detailsName = modalInner.querySelector('.details').querySelector('.details-name');
      const detailsStatus = modalInner.querySelector('.details').querySelector('.details-status');
      detailsName.innerHTML = cardName;
      detailsStatus.innerHTML = cardStatus;
      modalOuter.classList.add('open');
    }
    function closeModal(){
      modalOuter.classList.remove('open');
  }

    function closeModalFromOverlay(event){
      const isClickExactlyOnOuter = !event.target.closest('.modal-inner');
      if(isClickExactlyOnOuter) modalOuter.classList.remove('open');
    }
    function closeModalByEsc(event){
      if(event.key === "Escape") {
          closeModal();
      }
    }
    buttons.forEach(button => button.addEventListener('click', openModal));

    modalOuter.addEventListener('click', closeModalFromOverlay);
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('keydown', closeModal);
  }

mainFunc()

