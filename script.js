function truncateWords(text, maxWords) {
  const words = text.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return text;
}

// Function to create and display the cards
function displayCards(data) {
  // Get the container element to hold all the cards
  const cardContainer = document.getElementById('cardContainer');
  new Sortable(cardContainer, {
    animation: 150,
    ghostClass: 'dragged-card',
    swapThreshold: 0.5,
    chosenClass: 'chosen-card',
    emptyInsertThreshold: 10,
    dragClass: 'dragging',
    forceFallback: true,
    fallbackClass: 'fallback-card',
    fallbackOnBody: true,
    swapClass: 'swapping',
  });
  

  // Loop through the data and create a card for each title
  data.forEach(item => {
    const id = item.id;
    const title = item.title;
    const author = item.author;
    const date = item.date;
    const content = item.content;

    // Truncate the content to a specific number of words (e.g., 20 words)
    const truncatedContent = truncateWords(content, 15);

    // Create a new card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Create a card body element and set its content
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.innerHTML = `
        <i class="fas fa-grip-vertical fa-lg" style="color: #000000; margin-left: 10px;"></i>
        <input type="checkbox" class="publish-delete-checkbox" class="form-check-input mt-2" style = "margin-left: 17px;">
        <b class="card-title" style="margin-left: 14px; font-size: 1.5em;">${title}</b><br> 
        <i class="fa-solid fa-user" style="color: #0fb980; margin-left: 78px;"></i>
        <b class="card-author" style="margin-right: 20px; color: #848A95; ">${author}</b>
        <i class="fa-solid fa-calendar-days" style="color: #0fb980;"></i>
        <b class="card-date" style="color: #848A95;">${date}</b>
        <br>
        <p class="card-content" data-full-content="${content}" style="color: #9095A0; margin-left: 78px; font-size: 1.2em;">
          ${truncatedContent}
          <i class="fa-solid fa-eye" style="color: #3e83f5;"></i>
          <a class="read-full-link" style="text-decoration: none;">Read Full</a>
        </p>

        
        
        <div class="floating-buttons">
        <button type="button" class="hashtag-btn" id="hashtag-sport">#Sports</button>
        <button type="button" class="hashtag-btn" id="hashtag-worldwide">#Worldwide</button>
        <button type="button" class="hashtag-btn" id="hashtag-local">#Local</button>
        </div>
      `;

    // Append the card body to the card
    card.appendChild(cardBody);

    // Append the card to the container
    cardContainer.appendChild(card);
  });
}

// Get the "Select All" checkbox element
const selectAllCheckbox = document.getElementById('selectAllCheckbox');

// Add click event listener to "Select All" checkbox
selectAllCheckbox.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('.publish-delete-checkbox');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = selectAllCheckbox.checked;
  });
});


// Add event delegation for the "Read Full" link
cardContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('read-full-link')) {
    const card = event.target.closest('.card'); // Find the closest parent card
    const title = card.querySelector('b.card-title').textContent; // Get the title
    const author = card.querySelector('b.card-author').textContent; // Get the author
    const date = card.querySelector('b.card-date').textContent; // Get the date
    const fullContent = event.target.parentElement.dataset.fullContent;
    openModal(title, author, date, fullContent);
  }
});

function removeCheckedCheckboxes() {
  var checked = document.querySelectorAll(".publish-delete-checkbox:checked");
  checked.forEach((elem) => {
    elem.parentElement.remove(); // Remove the parent element
  });
}

// Function to open the modal and display the full content
function openModal(title, author, date, fullContent) {
  const modal = document.getElementById('myModal');
  const modalTitleElement = document.getElementById('modalTitle');
  const modalAuthorElement = document.getElementById('modalAuthor');
  const modalDateElement = document.getElementById('modalDate');
  const fullContentElement = document.getElementById('fullContent');

  modalTitleElement.textContent = title;
  modalAuthorElement.textContent = author;
  modalDateElement.textContent = date;
  fullContentElement.innerHTML = fullContent;
  modal.style.display = 'block';
}


// Function to close the modal
function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}


// Fetch the JSON data from MOCK_DATA.json
fetch('MOCK_DATA.json')
  .then(response => response.json())
  .then(data => displayCards(data))
  .catch(error => console.error('Error fetching data:', error));
