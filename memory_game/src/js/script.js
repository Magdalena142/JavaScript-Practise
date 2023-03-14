//Grab a couple of things
const section = document.querySelector("section")
const playerLivesCount = document.querySelector("span")
let playerLives = 10

//Link text
playerLivesCount.textContent = playerLives

//We generate the object
const getData = () => [
	{ imgSrc: "../dist/img/beatles.jpeg", id: 1, name: "beatles" },
	{ imgSrc: "../dist/img/blink182.jpeg", id: 2, name: "blink 182" },
	{ imgSrc: "../dist/img/fkatwigs.jpeg", id: 3, name: "fka twigs" },
	{ imgSrc: "../dist/img/fleetwood.jpeg", id: 4, name: "fleetwood" },
	{ imgSrc: "../dist/img/joy-division.jpeg", id: 5, name: "joy division" },
	{ imgSrc: "../dist/img/ledzep.jpeg", id: 6, name: "lep zeppelin" },
	{ imgSrc: "../dist/img/metallica.jpeg", id: 7, name: "metallica" },
	{ imgSrc: "../dist/img/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
	{ imgSrc: "../dist/img/beatles.jpeg", id: 9, name: "beatles" },
	{ imgSrc: "../dist/img/blink182.jpeg", id: 10, name: "blink 182" },
	{ imgSrc: "../dist/img/fkatwigs.jpeg", id: 11, name: "fka twigs" },
	{ imgSrc: "../dist/img/fleetwood.jpeg", id: 12, name: "fleetwood" },
	{ imgSrc: "../dist/img/joy-division.jpeg", id: 13, name: "joy division" },
	{ imgSrc: "../dist/img/ledzep.jpeg", id: 14, name: "led zeppelin" },
	{ imgSrc: "../dist/img/metallica.jpeg", id: 15, name: "metallica" },
	{ imgSrc: "../dist/img/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
]

//Randomize
const randomize = () => {
	const cardData = getData()
	cardData.sort(() => Math.random() - 0.5)
	return cardData
}

//Card Generator Function
const cardGenerator = () => {
	const cardData = randomize()
	//Generate thr HTML
	cardData.forEach(item => {
		const card = document.createElement("div")
		const face = document.createElement("img")
		const back = document.createElement("div")
		card.classList = "card"
		face.classList = "face"
		back.classList = "back"
		//Attach the info to the cards
		face.src = item.imgSrc
		card.setAttribute("name", item.name)
		//Attach the cards to the section
		section.appendChild(card)
		card.appendChild(face)
		card.appendChild(back)

		card.addEventListener("click", e => {
			card.classList.toggle("toggleCard")
			checkCard(e)
		})
	})
}
//Check Cards
const checkCard = e => {
	const clickedCard = e.target
	clickedCard.classList.add("flipped")
	const flippedCards = document.querySelectorAll(".flipped")
    const toggleCards=document.querySelectorAll('.toggleCard')
	//Logic
	if (flippedCards.length === 2) {
		if (
			flippedCards[0].getAttribute("name") ===
			flippedCards[1].getAttribute("name")
		) {
			flippedCards.forEach(card => {
				card.classList.remove("flipped")
				card.style.pointerEvents = "none"
			})
		} else {
			flippedCards.forEach(card => {
				card.classList.remove("flipped")
				setTimeout(() => card.classList.remove("toggleCard"), 1000)
			})
			playerLives--
			playerLivesCount.textContent = playerLives
			if (playerLives === 0) {
				restart("Try again")
			}
		}
	}
    //Run a check ti see if we won the game
    if(toggleCards.lenght===16){
        restart('you won')
    }
}

//Restart
const restart = () => {
	let cardData = randomize()
	let faces = document.querySelectorAll(".face")
	let cards = document.querySelectorAll(".card")
	section.style.pointerEvents = "none"
	cardData.forEach((item, index) => {
		cards[index].classList.remove("toggleCard")
		//Randomize
		setTimeout(() => {
			cards[index].style.pointerEvents = "all"
			faces[index].src = item.imgSrc
			cards[index].setAttribute("name", item.name)
			section.style.pointerEvents = "all"
		}, 1000)
	})
	playerLives = 10
	playerLivesCount.textContent = playerLives
	setTimeout(() => window.alert(text), 100)
}

cardGenerator()
