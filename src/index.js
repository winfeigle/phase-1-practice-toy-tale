let addToy = false;
const form = document.querySelector('form.add-toy-form')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//EVENT LISTENERS
form.addEventListener('submit', handleSubmit)


//EVENT HANDLERS
function handleSubmit(e){
    e.preventDefault()
    let newToyObject = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    
    renderOneToy(newToyObject)
    postToy(newToyObject)
}



//RENDER ONE TOY
function renderOneToy(toy){
  //Build toy card
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `
  //Adding an event listener for the like button, within the same function that creates it (renderOneToy).
  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes += 1
    card.querySelector('p').textContent = `${toy.likes} Likes`
    patchLikes(toy)
  })

  document.querySelector('#toy-collection').appendChild(card)
}


//FETCH REQUESTS
//=======================================
//GET REQUEST
function getAllToys(){
  fetch(`http://localhost:3000/toys`)
    .then(res => res.json())
    .then(toys => toys.forEach(toy => renderOneToy(toy)))
}
getAllToys()


//POST REQUEST
function postToy(newToyObject){
  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type':'application/json',
      Accept:'application/json'
    },
    body: JSON.stringify(newToyObject)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}

// PATCH REQUEST
function patchLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
}