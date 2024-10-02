// Get the search input field, search button, attach button, and file input field
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const attachButton = document.querySelector('.attach-button');
const fileInput = document.querySelector('.file-input');

// Add event listener to attach button to trigger file upload
attachButton.addEventListener('click', () => {
  fileInput.click();
});

// Add event listener to file input field to handle file upload
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);

  // Send the file to the server using AJAX
  // fetch('/upload', {
  //   method: 'POST',
  //   body: formData
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));
});

// Add event listener to search button to handle search functionality
searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    // Use the YouTube API to search for the topic
    const apiKey = 'AIzaSyCWYoEWrSNINinIR4jmUVLByPhOOkBbL5U';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchTerm}&maxResults=9&key=${apiKey}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      const searchResults = data.items;
      const searchResultsList = document.querySelector('.search-results ul');
      searchResultsList.innerHTML = '';
      searchResults.forEach(result => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
            <img src="${result.snippet.thumbnails.default.url}" alt="${result.snippet.title}">
            <h2>${result.snippet.title}</h2>
          </a>
        `;
        searchResultsList.appendChild(listItem);
      });
    })
    .catch(error => console.error(error));
  }
});
