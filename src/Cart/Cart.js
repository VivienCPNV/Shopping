"use strict";

const UpdateCartException = require("./UpdateCartException.js");
const EmptyCartException = require("./EmptyCartException.js");
const MultipleCurrenciesException = require("./MultipleCurrenciesException");
const CartItem = require("../CartItem/CartItem.js");

module.exports = class Cart {
    #cartItems;
    #currency = "CHF";

    constructor(items = []) {
        this.add(items);
    }

    get items () {
        if (!Array.isArray(this.#cartItems)) {
            throw new EmptyCartException();
        }
        return this.#cartItems;
    }

    get total () {
        let total = 0;
        this.items.forEach((item) => {
            total += item.price * item.quantity;
        })
        return total;
    }

    get currency () {
        return this.#currency;
    }

    count (distinct = false) {
        let itemCount = 0;
        this.items.forEach((item) => {
            itemCount += (distinct) ? 1 : item.quantity;
        })
        return itemCount;
    }

    add (items) {
        if(!Array.isArray(this.#cartItems)) {
            this.#cartItems = Array();
        }
        if(Array.isArray(items)) {
            if(!this.#cartItems.length && items.length) {
                this.#currency = items[0].currency;
            }
            items.forEach((item) => {
                if(!(item instanceof CartItem)) {
                    throw new UpdateCartException();
                } else {
                    if(item.currency != this.#currency) {
                        throw new MultipleCurrenciesException();
                    }
                    this.#cartItems.push(item);
                }
            })
        } else {
            throw new UpdateCartException();
        }
    }
}