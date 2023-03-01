"use strict";

const InvalidArticleIdException = require("./InvalidArticleIdException.js");
const InvalidQuantityException = require("./InvalidQuantityException.js");
const InvalidPriceException = require("./InvalidPriceException.js");
const InvalidCurrencyException = require("./InvalidCurrencyException.js");

module.exports = class CartItem {

    //region private attributes
    #articleId;
    #name;
    #quantity;
    #price;
    #currency;
    //endregion private attributes

    //region public methods
    constructor(articleId, name, quantity, price, currency = "CHF") {
        if (articleId < 1) {
            throw new InvalidArticleIdException();
        }
        this.#articleId = articleId;
        this.quantity = quantity;
        this.price = price;
        this.#name = name;
        if(!currency.match(/^[A-Z]{3}/)) {
            throw new InvalidCurrencyException();
        }
        this.#currency = currency;
    }

    get articleId() {
        return this.#articleId;
    }

    get name() {
        return this.#name;
    }

    get quantity() {
        return this.#quantity;
    }

    set quantity(value) {
        if (value < 1) {
            throw new InvalidQuantityException();
        }
        this.#quantity = value;
    }

    get price() {
        return this.#price;
    }

    get currency() {
        return this.#currency;
    }
    set price(value) {
        if (value < 10) {
            throw new InvalidPriceException();
        }
        this.#price = value;
    }

    get total() {
        return this.#price * this.quantity;
    }
    //endregion public methods

    //region private methods
    //endregion private methods
}



