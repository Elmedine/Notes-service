console.log("js ready");

var cartObj = {
	removeButtonEl: document.querySelector('.qt-minus'),
    addButtonEl: document.querySelector('.qt-plus'),
    summaryEl: document.querySelector('.full-price span'),
    quantityEl: document.querySelector('.qt'),
    productPrice: Number(document.querySelector('.price span').innerText),
    cartQuantity: 0,

	removeAllEl: document.querySelector(".remove-all"),
	subTotalEl: document.querySelector(".subtotal span"),
	taxEl: document.querySelector(".tax span"),
	totalEl: document.querySelector(".total span"),
    tax: 0.05,
	storage: window.localStorage,
	
	init() {
		const cartQuantityFromStorage = this.readStorage("cartQuantity");
		const priceFromStorage = this.readStorage("cartQuantity");

		if (cartQuantityFromStorage) {
			this.cartQuantity = `${cartQuantityFromStorage}`;
		}
		this.addEventListeners();
		this.updateFields();
	},

	updateCartQuantity() {
		this.quantityEl.innerText = this.cartQuantity;
	},
    
	addQuantity() {
		cartObj.cartQuantity++;
		cartObj.setStorage("cartQuantity", cartObj.cartQuantity);
		cartObj.updateFields();
	},

	removeQuantity() {
		console.error("decrease quantity by 1...");
		if (cartObj.cartQuantity === 0) return;
		cartObj.cartQuantity--;
		cartObj.setStorage("cartQuantity", cartObj.cartQuantity);
		cartObj.updateFields();
	},

	updateFields() {
		cartObj.updateCartQuantity();
		cartObj.updateCartPrice();
		cartObj.updateSubTotal();
		cartObj.updateTax();
		cartObj.updateTotal();
	},

	updateCartPrice() {
		this.summaryEl.innerText = (this.cartQuantity * this.productPrice).toFixed(2);
	},

	updateTotal() {
		this.totalEl.innerText = (this.cartQuantity * this.productPrice).toFixed(2);
	},

	updateSubTotal() {
		var subTotal = this.cartQuantity * this.productPrice - 5 - this.cartQuantity * this.productPrice * this.tax;
		if (subTotal < 0) this.subTotalEl.innerText = "0";
		else {
			this.subTotalEl.innerText = ( this.cartQuantity * this.productPrice - 5 - this.cartQuantity * this.productPrice * this.tax ).toFixed(2);
		}
	},

	updateTax() {
		this.taxEl.innerText = ( this.cartQuantity * this.productPrice * this.tax ).toFixed(2);
	},

	addEventListeners() {
		this.addButtonEl.addEventListener("click", cartObj.addQuantity);
		this.removeButtonEl.addEventListener("click", cartObj.removeQuantity);
		this.removeAllEl.addEventListener("click", cartObj.removeAll);
	},
    
	setStorage(key, value) {
		if (value) 
        {
			cartObj.storage[key] = value;
		} else 
        {
			cartObj.storage.removeItem(key);
		}
	},

	readStorage(data) {
		return this.storage[data];
	},

	removeAll() {
		cartObj.cartQuantity = 0;
		cartObj.storage.removeItem("cartQuantity");
		cartObj.updateFields();
	},
};

cartObj.init();