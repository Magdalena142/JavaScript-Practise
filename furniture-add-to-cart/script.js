// variables and constans
const cartContainer = document.querySelector(".cart-container")
const productList = document.querySelector(".product-list")
const cartList = document.querySelector(".cart-list")
const cartTotalValue = document.getElementById("cart-total-value")
const cartCountInfo = document.getElementById("cart-count-info")

let cartItemID = 1

eventListeners()

// all event listeners
function eventListeners() {
	window.addEventListener("DOMContentLoaded", () => {
		loadJSON()
		loadCart()
	})
	// toogle navbar when toglle button is clicked
	document.querySelector(".navbar-toggler").addEventListener("click", () => {
		document.querySelector(".navbar-collapse").classList.toggle("show-navbar")
	})

	// show/hide cart container
	document.getElementById("cart-btn").addEventListener("click", () => {
		cartContainer.classList.toggle("show-cart-container")
	})

	// add to cart
	productList.addEventListener("click", purchaseProduct)

	// delete from cart
	cartList.addEventListener("click", deleteProduct)
}

// update cart info
function updateCartInfo() {
	let cartInfo = findCartInfo()
	cartCountInfo.textContent = cartInfo.productsCount
	cartTotalValue.textContent = cartInfo.total
}

// load product items content from JSON file
function loadJSON() {
	fetch("furniture.json")
		.then(response => response.json())
		.then(data => {
			let html = ""
			data.forEach(product => {
				html += `
                    <div class = "product-item">
                        <div class = "product-img">
                            <img src = "${product.imgSrc}" alt = "product image">
                            <button type = "button" class = "add-to-cart-btn">
                            <i class = "fas fa-shopping-cart"></i>Add To Cart
                            </button>
                        </div>
                        <div class = "product-content">
                            <h3 class = "product-name">${product.name}</h3>
                            <span class = "product-category">${product.category}</span>
                            <p class = "product-price">$${product.price}</p>
                        </div>
                    </div>
                `
			})
			productList.innerHTML = html
		})
		.catch(error => {
			alert(`User live server or local server`)
			//URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
		})
}

// purchase product from the product list
function purchaseProduct(e) {
	if (e.target.classList.contains("add-to-cart-btn")) {
		let product = e.target.parentElement.parentElement
		getProductInfo(product)
	}
}

// get product info after add to cart button is clicked
function getProductInfo(product) {
	let productInfo = {
		id: cartItemID,
		imgSrc: product.querySelector(".product-img img").src,
		name: product.querySelector(".product-name").textContent,
		categoty: product.querySelector(".product-category").textContent,
		price: product.querySelector(".product-price").textContent,
	}
	cartItemID++ // inreasing id for the cart item list
	addToCartList(productInfo)
	saveProductInStorage(productInfo)
}

// add the selected product to the cart
function addToCartList(product) {
	const cartItem = document.createElement("div")
	cartItem.classList.add("cart-item")
	cartItem.setAttribute("data-id", `${product.id}`)
	cartItem.innerHTML = `
        <img src = "${product.imgSrc}" alt = "product image">
        <div class = "cart-item-info">
            <h3 class = "cart-item-name">${product.name}</h3>
            <span class = "cart-item-category">${product.category}</span>
            <span class = "cart-item-price">${product.price}</span>
        </div>
        <button type = "button" class = "cart-item-del-btn">
            <i class = "fas fa-times"></i>
        </button>
    `
	cartList.appendChild(cartItem)
}

// save product in the local storage
function saveProductInStorage(item) {
	let products = getProductFromStorage()
	products.push(item)
	localStorage.setItem("products", JSON.stringify(products))
	updateCartInfo()
}

//get all the products info if there is any in the local storage
function getProductFromStorage() {
	return localStorage.getItem("products")
		? JSON.parse(localStorage.getItem("products"))
		: []
	// return empty array if there isn't any product info
}

// load carts products
function loadCart() {
	let products = getProductFromStorage()
	if (products.length < 1) {
		cartItemID = 1 // if there is no any product in the local storage
	} else {
		cartItemID = products[products.length - 1].id
		cartItemID++
		// else get the id of the last products and increase it by 1
	}
	products.forEach(products => addToCartList(products))
    // calculate and update UI of cart info
    updateCartInfo()
}

// calculate total price of the cart and other info
function findCartInfo() {
	let products = getProductFromStorage()
	let total = products.reduce((acc, product) => {
		let price = parseFloat(product.price.substr(1)) // removing dollar sign
		return (acc += price)
	}, 0) // adding all the prices - without it the reduce motod starts add from index 1

	return {
		total: total.toFixed(2), //The toFixed() method formats a number using fixed-point notation.
		productsCount: products.length // getting products count
	}
}

// delete product from cart list and local storage
function deleteProduct(e) {
	let cartItem
	if (e.target.tagName === "BUTTON") {
		cartItem = e.target.parentElement
		cartItem.remove() // this removes from DOM only
	} else if (e.target.tagName === "I") {
		cartItem = e.target.parentElement.parentElement
		cartItem.remove() // this removes from DOM only
	}

    let products=getProductFromStorage()
    let updateProducts = products.filer(product =>{
        return product.id !== parseInt(cartItem.id)
    })
    localStorage.setItem('products', JSON.stringify(updateProducts)) // updating the product list afer the deletion
    updateCartInfo()
}
