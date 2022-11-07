const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "4fb92d580fmsh29489d65e968a28p1565bbjsncea4009bc4b4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

let songTitles = [];

let uniqueAlbums = document.querySelector(".unique-albums");
let search = document.querySelector(".search");
let searchButton = document.querySelector(".search-button");
let searchedText = document.querySelector(".searched-text");
searchButton.addEventListener("click", () => {
  let searchedValue = search.value;
  searchedText.innerHTML = `This is what you searched for: ${searchedValue}`;
  let container = document.querySelector(".row");
  search.value = "";
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchedValue}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let renderedAlbums = [];
      let dataArray = response.data;
      for (let data of dataArray) {
        container.innerHTML += `
      <div class="col-sm-6 col-md-4 col-xl-3 mt-2">
      
      <div class="card">
                                    <img src=${data.album.cover_medium} class="card-img-top" alt="...">
                                    <div class="card-body">
                                      <h5 class="card-title">Album: ${data.album.title}</h5>
                                      <p class="card-text">Artist: ${data.artist.name}</p>
                                      <p class="card-text">Song: ${data.title}</p>
                                      <a href="#" class="btn btn-primary">Listen Now</a>
                                    </div>
                                  </div>
                                  </div>
                                  </div>
                                  
                                  `;
        songTitles.push(data.title);

        if (!renderedAlbums.includes(data.album.title)) {
          renderedAlbums.push(data.album.title);
        }
        let numberOfUniqueAlbums = renderedAlbums.length;
        uniqueAlbums.innerText = `We have found ${numberOfUniqueAlbums} unique albums`;
      }
    })
    .catch((err) => console.error(err));
  container.innerHTML = "";

  console.log(songTitles);
});

// let modalBody = document.querySelector(".modal-body");
// let ul = document.createElement("ul");
// let newLi = document.createElement("li");

// for (let songTitle of songTitles) {
//   newLi.innerText = songTitle;
// }
// ul.appendChild(newLi);

// console.log(ul);

// modalBody.innerHTML = ul;
