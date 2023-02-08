/**
 * @file      cart.test.js
 * @brief     This class is designed to test the behaviour of a cart.
 * @author    Created by Nicolas.GLASSEY
 * @version   13-02-2022 - original (dedicated to RIA1)
 * @version   08-03-2022 - update
 */

let Cart = require('../Cart/Cart.js');
const CartItem = require("../CartItem/CartItem.js");
const EmptyCartException = require("../Cart/EmptyCartException.js");
const UpdateCartException = require("../Cart/UpdateCartException.js");

test('items_NominalCase_GetItems', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27", 1,10);
    let cartItem2= new CartItem(2,"Iphone 28",2,20);
    let expectedItems = [cartItem1, cartItem2];
    let actualItems = null;
    let cart = new Cart(expectedItems);

    //when
    actualItems = cart.items;

    //then
    for (let i = 0 ; i <= expectedItems.length ; i++)
    {
        expect(expectedItems[i]).toEqual(actualItems[i]);
    }
})

test('items_EmptyCart_ThrowException', () => {
    //given
    let cart = new Cart(null);

    //when
    //Event triggered by th assertion

    //then
    expect(() => cart.items).toThrow(EmptyCartException);
})

test('total_NominalCase_GetsSum', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27",1,10);
    let cartItem2= new CartItem(2,"Iphone 28",2,20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let totalPriceExpected = 50;

    //when
    //Event triggered by th assertion

    //then
    expect(totalPriceExpected).toEqual(cart.total);
})

test('total_EmptyCart_ThrowException', () => {
    //given
    let cart = new Cart(null);

    //when
    //Event triggered by th assertion

    //then
    expect(() => cart.total).toThrow(EmptyCartException);
})

test('count_OnlySingleQuantityProduct_GetsNumberOfItems', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27",1,10);
    let cartItem2= new CartItem(2,"Iphone 28", 1,20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 2;

    //when
    //Event triggered by th assertion

    //then
    expect(countExpected).toEqual(cart.count());
})

test('count_MixSingleAndMultipleQuantityProduct_GetsNumberOfItems', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27",1,10);
    let cartItem2= new CartItem(2,"Iphone 28", 2,20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 3;

    //when
    //Event triggered by th assertion

    //then
    expect(countExpected).toEqual(cart.count());
})

test('count_MixSingleAndMultipleQuantityProductDistinct_GetsNumberOfItems', () => {
    //given
    let cartItem1 = new CartItem(1,"Iphone 27",1,10);
    let cartItem2= new CartItem(2,"Iphone 28", 2,20);
    let items = [cartItem1, cartItem2];
    let cart = new Cart(items);
    let countExpected = 2;

    //when
    //Event triggered by th assertion

    //then
    expect(countExpected).toEqual(cart.count(true));
})

test('count_EmptyCart_ThrowException', () => {
    //given
    let cart = new Cart(null);

    //when
    //Event triggered by th assertion

    //then
    expect(() => cart.count()).toThrow(EmptyCartException);
})

test('add_EmptyCartAddFirstSingleCartItem_GetsUpdatedNumberOfItems', () => {
    //given
    let cart = new Cart(null);
    let expectedTotalPrice = 10;
    let cartItem1 = new CartItem(1,"Iphone 27",1,expectedTotalPrice);
    let items = [cartItem1];

    //when
    cart.add(items);

    //then
    expect(expectedTotalPrice).toEqual(cart.total);
})

test('add_EmptyCartEmptyItemsToAdd_ThrowException', () => {
    //given
    let cart = new Cart(null);
    let items = null;

    //when
    expect(() => cart.add(items)).toThrow(UpdateCartException);

    //then
    //Exception is thrown
})