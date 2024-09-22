//set up imports and vars
import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import pixabayLogo from '/logo.svg'
const apiKey = import.meta.env.VITE_API_KEY;

//build the initial page/single page app
document.querySelector('#app').innerHTML = `
  <div>
  <div>
  <h1>Pixabay App</h1>
  <p>What are you looking for?</p>
  <input type="text"> <button>Go</button>
  </div>

  <div class="imageDiv">
  <a href ="" id="getImage" target="_blank">Get Image</a>
  <img src="" alt= ""/>
  </div>

  <button id="prev">&lt;- Previous</button>&nbsp;<button id="next">Next -&gt;</button>

  <div class="logoBar">
  <a href="https://pixabay.com/" style="margin:3px 15px 5px 0;font-size:12px;line-height:1.7;color:#555;display:block;float:left;padding:9px 12px 6px;border:1px solid #ccc">
  <i style="display:block;width:68px;height:18px;overflow:hidden"><img src="${pixabayLogo}" style="width:94px"></i> Free Images
  </a>
  <a href="https://vitejs.dev" target="_blank">
  <img src="${viteLogo}" class="logo" alt="Vite logo" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
  <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
  </a>
  </div>
</div>
`

//dom vars
const button = document.querySelector('button')
const image = document.querySelector('img')
const next = document.querySelector('#next')
const prev = document.querySelector('#prev')
const imageButton = document.querySelector('#getImage')
const searchTerm = document.querySelector('input')
//setup vars
let arrayCount = 0
let page = 1

//event listeners on buttons
button.addEventListener('click', clearArrayCount)

next.addEventListener('click', function(){
  arrayCount++

  getImage()
})

prev.addEventListener('click', function(){
  arrayCount--
  if(arrayCount >= 0){
  getImage()
  }
  if (arrayCount < 0){
    next.style.display = "none"
    imageButton.style.display = "none"
    prev.style.display = "none"
    image.style.display = "none"
  }
})

function clearArrayCount(){
  arrayCount = 0
  page = 1
  getImage()
}


function getImage(){
  image.src = ""
  image.style.display = "block"
  next.style.display = "inline-block"
  imageButton.style.display = "block"
  if(arrayCount > 0) {
  prev.style.display = "inline-block"
  }
  fetch(`https://pixabay.com/api/?key=${apiKey}&q=${searchTerm.value}&page=${page}&per_page=50`)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    image.src=data.hits[arrayCount].webformatURL
    console.log(arrayCount)
    imageButton.href = data.hits[arrayCount].pageURL
  })
  .catch(err => console.error('Error', err))
}
