function nascondiAnnunciEliminati() {
  chrome.storage.local.get('annunciEliminati', data => {
    const annunciEliminati = data.annunciEliminati || [];
    const annunci = document.querySelectorAll('.items__item.item-card.item-card--small');
    annunci.forEach(annuncio => {
      const href = annuncio.querySelector('a').getAttribute('href');
      const id = href.split('/').pop().split('.')[0];
      if (annunciEliminati.includes(id)) {
        annuncio.style.display = 'none';
      }
    });
  });
}

// Funzione per nascondere un annuncio in base al suo ID
function nascondiAnnuncio(id) {
  const annunci = document.querySelectorAll('.items__item.item-card.item-card--small');
  annunci.forEach(annuncio => {
    const href = annuncio.querySelector('a').getAttribute('href');
    if (href.includes(id)) {
      annuncio.style.display = 'none';
    }
  });
}

// Aggiungi un bottone "Elimina" a ciascun annuncio
function aggiungiBottoniElimina() {
  const annunci = document.querySelectorAll('.items__item.item-card.item-card--small');
  annunci.forEach(annuncio => {
    const href = annuncio.querySelector('a').getAttribute('href');
    const id = href.split('/').pop().split('.')[0]; // Estrai l'ID dall'href
    const bottone = document.createElement('button');
    bottone.innerHTML = '<div style="color:white; display: flex; flex-direction: row; gap:5px;">' +
      '<svg height="24" width="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 55.883 55.883" xml:space="preserve" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#ffffff;" d="M47.942,6.143h-8.041V4.572c0-3.609-7.229-4.572-11.5-4.572h-0.918c-4.271,0-11.5,0.963-11.5,4.572 v1.571H7.942c-3.645,0-6.5,1.953-6.5,4.447s2.856,4.447,6.5,4.447h2.521v29.346c0,6.341,5.159,11.5,11.5,11.5H33.92 c6.341,0,11.5-5.159,11.5-11.5V15.037h2.521c3.645,0,6.5-1.953,6.5-4.447C54.442,8.096,51.586,6.143,47.942,6.143z M18.983,4.723 C19.497,4.168,22.414,3,27.483,3h0.918c5.069,0,7.986,1.168,8.5,1.723v1.42H18.983V4.723z M42.42,44.383c0,4.687-3.813,8.5-8.5,8.5 H21.963c-4.686,0-8.5-3.813-8.5-8.5V15.037H42.42C42.42,15.037,42.42,44.383,42.42,44.383z M47.942,12.037h-2.521H10.463H7.942 c-2.137,0-3.5-0.95-3.5-1.447s1.363-1.447,3.5-1.447h9.541h20.918h9.541c2.137,0,3.5,0.95,3.5,1.447 C51.442,11.087,50.078,12.037,47.942,12.037z"></path> <path style="fill:#ffffff;" d="M18.8,46.893c0.828,0,1.5-0.671,1.5-1.5v-25.5c0-0.829-0.672-1.5-1.5-1.5s-1.5,0.671-1.5,1.5v25.5 C17.3,46.222,17.972,46.893,18.8,46.893z"></path> <path style="fill:#ffffff;" d="M27.717,46.893c0.828,0,1.5-0.671,1.5-1.5v-25.5c0-0.829-0.672-1.5-1.5-1.5s-1.5,0.671-1.5,1.5v25.5 C26.217,46.222,26.889,46.893,27.717,46.893z"></path> <path style="fill:#ffffff;" d="M36.634,46.893c0.828,0,1.5-0.671,1.5-1.5v-25.5c0-0.829-0.672-1.5-1.5-1.5s-1.5,0.671-1.5,1.5v25.5 C35.134,46.222,35.806,46.893,36.634,46.893z"></path> </g> </g></svg>' +
      ' <span style="color:white">Elimina</span></div>';
    bottone.className = 'elimina-button';
    // bottone.textContent = 'Elimina'
    bottone.addEventListener('click', (event) => {
      event.stopPropagation();
      nascondiAnnuncio(id);
      // Salva l'ID dell'annuncio eliminato nello storage dell'estensione
      chrome.storage.local.get('annunciEliminati', data => {
        const annunciEliminati = data.annunciEliminati || [];
        annunciEliminati.push(id);
        chrome.storage.local.set({ 'annunciEliminati': annunciEliminati });
      });
    });
    bottone.style.borderRadius = '4px'; // Bordi arrotondati
    bottone.style.padding = '8px'; // Aggiungi spazio interno
    bottone.style.backgroundColor = '#f44336'; // Colore di sfondo
    bottone.style.color = '#fff'; // Colore del testo
    bottone.style.border = 'none'; // Rimuovi il bordo
    bottone.style.cursor = 'pointer'; // Cambia il cursore al passaggio
    // bottone.style.position = 'absolute';
    // bottone.style.bottom = '1px';
    // bottone.style.right = '1px';


    annuncio.appendChild(bottone);
    //
    // // Iniettare il bottone nel div specificato
    // const containerDiv = annuncio.querySelector('.SmallCard-module_container__d5-ZC');
    // containerDiv.appendChild(bottone);


  });
}


// Aggiungi un listener per gestire il cambio di pagina
document.querySelector('.pagination-container').addEventListener('click', function(event) {
  // Verifica se il click è avvenuto su un bottone di navigazione
  if (event.target.tagName === 'BUTTON') {
    console.log(event.target.tagName)

    setTimeout(()=>{
      // Dopo il cambio di pagina, esegui nuovamente il controllo e nascondi gli annunci eliminati
      nascondiAnnunciEliminati();
      aggiungiBottoniElimina();
    }, 3000)

  }
});


aggiungiBottoniElimina();
nascondiAnnunciEliminati();
