// VARIABLES
let row_data = document.querySelector(".row_all")
let list = document.querySelector(".ul_list")
let massiv = []
let card = []
let search = []
let startNumber = 0
let intervalNumber = 6
let pointNumber = 6
let prevButton = document.querySelector(".prev")
let nextButton = document.querySelector(".next")
let badg = document.querySelector(".badge")
let word = document.querySelector(".word")
let my_row = document.querySelector(".my_row")
let select = document.querySelector(".select_category")
// GET ALL INFO
fetch('https://dummyjson.com/products')
  .then(ress => ress.json())
  .then(ress => {
    ress.products.map(item => {
      massiv.push({ ...item, count: 1 })
    })
    DrawFunc()
    Pagination()
  })
  .catch(err => err.json())

// SEARCH SECTION
async function Search() {
  let response = await fetch(`https://dummyjson.com/products/search?q=${word.value}`)
    .then(ress => ress.json())
    .then(ress => {
      RenderSearch(ress.products)
      console.log(ress.products);
    })
    .catch(err => err.json())
}

// FILTER CATEGORY
fetch('https://dummyjson.com/products/categories')
.then(ress => ress.json())
.then(ress => {
  CategoryDraw(ress)
})
.catch(err => err.json())


async function changeItem(value){
  let response = await fetch(`https://dummyjson.com/products/category/${value}`)
  .then(ress => ress.json())
  .then(ress => {
    RenderSearch(ress.products)
  })
}

// PAGINATION
function Pagination() {
  let array = []
  let k = 1
  for (let i = 1; i <= massiv.length; i++) {
    let li = document.createElement("li")
    if (i % 6 == 0) {
      array.push(k)
      li.textContent = k
      li.classList.add('page')
      if (k == 1) {
        li.classList.add('active')
        prevButton.setAttribute('disabled', '')
      }
      li.setAttribute('onclick', `Count(${k})`)
      k++
      list.appendChild(li)
    }
  }
}

// PAGINATION NUMBERS
function Count(son, nimadir) {
  row_data.innerHTML = ''
  if (son == 1) {
    prevButton.setAttribute('disabled', '')
    startNumber = 0
    intervalNumber = 6
    console.log(startNumber, intervalNumber, son, 'bular son == 1 niki');
  } else if (son == pointNumber) {
    startNumber = massiv.length - pointNumber
    intervalNumber = massiv.length
    console.log(startNumber, intervalNumber, son, 'bular son == 5 niki');
  } else {
    intervalNumber = son * pointNumber - 1
    startNumber = intervalNumber - pointNumber
    console.log(startNumber, intervalNumber, son, 'bular elseniki niki');
  }

  for (let i = 0; i < document.querySelectorAll(".page").length; i++) {
    if (document.querySelectorAll(".page")[i].classList[1]) {
      prevButton.removeAttribute('disabled')
      document.querySelectorAll(".page")[i].classList.remove('active')
      document.querySelectorAll(".page")[son - 1].classList.add('active')
    }
  }

  DrawFunc(massiv)
}

// PREVIOUS AND NEXT PAGINATION NUMBERS
nextButton.addEventListener('click', () => {
  prevButton.removeAttribute('disabled')

  if (intervalNumber === massiv.length - 1) {
    nextButton.setAttribute('disabled', '')
    role = 1
  }
  else {
    startNumber += pointNumber
    intervalNumber += pointNumber
  }
  Count(Math.ceil(intervalNumber / pointNumber), role)
  DrawFunc(massiv)
})

prevButton.addEventListener('click', () => {
  nextButton.removeAttribute('disabled')

  if (intervalNumber === startNumber) {
    prevButton.setAttribute('disabled', '')
  } else {
    startNumber -= pointNumber
    intervalNumber -= pointNumber
  }
  Count(Math.ceil(intervalNumber / pointNumber))
  DrawFunc(massiv)
})

// DRAW DATA 
function DrawFunc() {
  row_data.innerHTML = ''
  massiv.map((item, index) => {
    if (index >= startNumber && index < intervalNumber) {
      let col_3 = document.createElement("div")
      col_3.classList.add("col-4", 'my-3')

      let card = document.createElement('div')
      card.classList.add("card", 'shadow')

      let img_phone = document.createElement("img")
      img_phone.src = item.thumbnail

      let name = document.createElement('h4')
      name.textContent = item.title
      name.classList.add('px-3', 'pt-2')

      let description = document.createElement("p")
      description.textContent = item.description
      description.classList.add('px-3', 'text-truncate')

      let price_item = document.createElement('button')
      price_item.classList.add('btn', 'btn-primary', 'm-2', 'fw-bold')
      price_item.textContent = "Buy now"
      price_item.setAttribute('onclick', `AddCard(${index})`)

      card.appendChild(img_phone)
      card.appendChild(name)
      card.appendChild(description)
      card.appendChild(price_item)
      col_3.appendChild(card)
      row_data.appendChild(col_3)
    }
  })
}

function AddCard(i) {
  let son = 0
  let aniqraqam = 0
  if (card.length == 0) {
    card.push(massiv[i])
  } else {
    card.map((item, index) => {
      if (item.title == massiv[i].title) {
        son++
        aniqraqam = index
      }
    })

    if (son == 1) {
      card[aniqraqam].count = card[aniqraqam].count + 1
    } else {
      card.push(massiv[i])
    }
  }
  badg.textContent = card.length
  DrawFunc(massiv)
}

function Card() {
  row_data.innerHTML = ''
  document.querySelector(".pag").innerHTML = ""
  my_row.innerHTML = ""
  card.map((item, index) => {
    let col_3 = document.createElement("div")
    col_3.classList.add("col-4", 'my-3')

    let card = document.createElement('div')
    card.classList.add("card", 'shadow')

    let img_phone = document.createElement("img")
    img_phone.src = item.thumbnail

    let name = document.createElement('h4')
    name.textContent = item.title
    name.classList.add('px-3', 'pt-2')

    let description = document.createElement("p")
    description.textContent = item.description
    description.classList.add('px-3', 'text-truncate')

    let piece = document.createElement('h4')
    piece.textContent = "Piece: " + item.count
    piece.classList.add('ms-2')

    let price_item = document.createElement('button')
    price_item.classList.add('btn', 'btn-danger', 'm-2', 'fw-bold')
    price_item.textContent = "Delete"
    price_item.setAttribute('onclick', `Delete(${index})`)

    card.appendChild(img_phone)
    card.appendChild(name)
    card.appendChild(description)
    card.appendChild(piece)
    card.appendChild(price_item)
    col_3.appendChild(card)
    row_data.appendChild(col_3)
  })
}

function Render(card) {
  row_data.innerHTML = ''
  document.querySelector(".pag").innerHTML = ""
  card.map((item, index) => {
    let col_3 = document.createElement("div")
    col_3.classList.add("col-4", 'my-3')

    let card = document.createElement('div')
    card.classList.add("card", 'shadow')

    let img_phone = document.createElement("img")
    img_phone.src = item.thumbnail

    let name = document.createElement('h4')
    name.textContent = item.title
    name.classList.add('px-3', 'pt-2')

    let description = document.createElement("p")
    description.textContent = item.description
    description.classList.add('px-3', 'text-truncate')

    let piece = document.createElement('h4')
    piece.textContent = "Piece: " + item.count
    piece.classList.add('ms-2')

    let price_item = document.createElement('button')
    price_item.classList.add('btn', 'btn-danger', 'm-2', 'fw-bold')
    price_item.textContent = "Delete"
    price_item.setAttribute('onclick', `Delete(${index})`)

    card.appendChild(img_phone)
    card.appendChild(name)
    card.appendChild(description)
    card.appendChild(piece)
    card.appendChild(price_item)
    col_3.appendChild(card)
    row_data.appendChild(col_3)
  })
}

function RenderSearch(card) {
  row_data.innerHTML = ''
  document.querySelector(".pag").innerHTML = ""
  my_row.innerHTML = ""
  card.map((item, index) => {
    let col_3 = document.createElement("div")
    col_3.classList.add("col-4", 'my-3')

    let card = document.createElement('div')
    card.classList.add("card", 'shadow')

    let img_phone = document.createElement("img")
    img_phone.src = item.thumbnail

    let name = document.createElement('h4')
    name.textContent = item.title
    name.classList.add('px-3', 'pt-2')

    let description = document.createElement("p")
    description.textContent = item.description
    description.classList.add('px-3', 'text-truncate')

    let piece = document.createElement('h4')
    piece.textContent = "Piece: " + item.count
    piece.classList.add('ms-2')

    let price_item = document.createElement('button')
    price_item.classList.add('btn', 'btn-primary', 'm-2', 'fw-bold')
    price_item.textContent = "Buy now"
    price_item.setAttribute('onclick', `AddCard(${index})`)

    card.appendChild(img_phone)
    card.appendChild(name)
    card.appendChild(description)
    card.appendChild(piece)
    card.appendChild(price_item)
    col_3.appendChild(card)
    row_data.appendChild(col_3)
  })
}

function Delete(a) {
  row_data.innerHTML = ''
  card.splice(a, 1)
  Render(card)
}

document.querySelector(".bi-house-fill").addEventListener('click', () => {
  location.reload()
})

function CategoryDraw(point){
  point.map((item, index) => {
    let option = document.createElement('option')
    option.textContent = item
    select.appendChild(option)
  })
}