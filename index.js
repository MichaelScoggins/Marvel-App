// const dotenv = require('dotenv')
// dotenv.config()
// const api_key = process.env.API_KEY
window.onbeforeunload = function () {
  window.scrollTo(0, 0)
}
let arrayOfChars
let addedParam = ""
const initialResults = `http://gateway.marvel.com/v1/public/characters?ts=1&apikey=6a58be9ee5b4b1d1e0e8479c213292af&hash=16a4ffdb28d3a57470a1f0a7edf3411f&limit=100&nameStartsWith=`
const captureInput = (input) => {
  addedParam = input
}
const allPosts = document.getElementById("fetch-body")
window.onload = function () {
  getChars()
  document.body.style.overflow = "hidden"
  // setTimeout(displayStuff, 2000)
}
async function getChars() {
  const response = await fetch(`${initialResults}` + `${addedParam}`)
    .then((res) => res.json())
    .then((chars) => (arrayOfChars = chars.data.results))
  displayStuff()
}
// display styled api content
const displayStuff = function () {
  document.body.style.overflow = "scroll"
  clearChildren()
  arrayOfChars.forEach((character) => {
    const li = document.createElement("LI")
    const div = document.createElement("DIV")
    const thumbnail = document.createElement("IMG")
    div.className = "tooltip"
    const tooltipText = document.createElement("SPAN")
    tooltipText.className = "tooltiptext"
    const comicText = document.createElement("LI")
    comicText.innerHTML = `COMICS: ${character.comics.items.map((x) => x.name)}`
    const seriesText = document.createElement("LI")
    seriesText.innerHTML = `SERIES: ${character.series.items.map(
      (x) => x.name
    )}`
    const storiesText = document.createElement("LI")
    storiesText.innerHTML = `STORIES: ${character.stories.items.map(
      (x) => x.name
    )}`
    const eventsText = document.createElement("LI")
    eventsText.innerHTML = `EVENTS: ${character.events.items.map(
      (x) => x.name
    )}`
    const archivesText = document.createElement("LI")
    archivesText.innerHTML = `OFFICIAL ARCHIVES: ${character.urls.map(
      (x) => `<a href="${x.url}">${x.type}</a>`
    )}`
    comicText.className = "comic-text"
    seriesText.className = "series-text"
    storiesText.className = "stories-text"
    eventsText.className = "events-text"
    archivesText.className = "archives-text"

    tooltipText.innerHTML = `${character.name}. ${character.description}`

    div.appendChild(thumbnail)
    thumbnail.src = `${character.thumbnail.path}.${character.thumbnail.extension}`
    // thumbnail.style.width = "400px"
    thumbnail.addEventListener("click", function () {
      li.append(comicText)
      li.append(seriesText)
      li.append(storiesText)
      li.append(eventsText)
      li.append(archivesText)
    })

    li.appendChild(div)
    div.appendChild(tooltipText)
    allPosts.appendChild(li)
    li.style.listStyleType = "none"
  })

  const tooltip = document.querySelectorAll(".tooltiptext")
  document.addEventListener("mousemove", fn, false)
  function fn(e) {
    for (let i = tooltip.length; i--; ) {
      tooltip[i].style.left = `${e.pageX}px`
      tooltip[i].style.top = `${e.pageY}px`
    }
  }

  const h3portion = " (some details and/or images unavailable)"
  const spanElement = document.createElement("SPAN")
  spanElement.style.color = "red"
  spanElement.innerHTML = h3portion
  h3.innerText = `Click images for Details`
  h3.append(spanElement)
  h3portion.style.color = "red"
}
// displayStuff ends here //

// clears results
const clearChildren = () => {
  const element = document.getElementById("fetch-body")
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}
