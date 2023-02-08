"use strict";

const UpdateCartException = require("./UpdateCartException.js");
const EmptyCartException = require("./EmptyCartException.js");
const CartItem = require("../CartItem/CartItem.js");

module.exports = class Cart {
    #cartItems = Array();

    constructor(items) {
        this.#cartItems = items;
    }

    get items () {
        if (!Array.isArray(this.#cartItems)) {
            throw new EmptyCartException();
        }
        return this.#cartItems;
    }

    get total () {
        if (!Array.isArray(this.#cartItems)) {
            throw new EmptyCartException();
        }
        let total = 0;
        this.#cartItems.forEach((item) => {
            total += item.price * item.quantity;
        })
        return total;
    }

    count (distinct = false) {
        if (!Array.isArray(this.#cartItems)) {
            throw new EmptyCartException();
        }
        let itemCount = 0;
        this.#cartItems.forEach((item) => {
            itemCount += (distinct) ? 1 : item.quantity;
        })
        return itemCount;
    }

    add (items) {
        if(!Array.isArray(this.#cartItems)) {
            this.#cartItems = Array();
        }
        if(Array.isArray(items)) {
            items.forEach((item) => {
                if(!(item instanceof CartItem)) {
                    throw new UpdateCartException();
                } else {
                    this.#cartItems.push(item);
                }
            })
        } else {
            throw new UpdateCartException();
        }
    }
}