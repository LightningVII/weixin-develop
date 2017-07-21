function fn1(...args) {
    args.forEach(function (arg) {
        console.log(arg)
    })
}

fn1(1, 2)
fn1(7, 2, 3, 9)


function* doSomething() {
    console.log("start");
    yield;
    console.log("finish")
}

var fn2 = doSomething();

fn2.next();
fn2.next();

function* getStockPrice(stock) {
    while (true) {
        yield Math.random() * 100;
    }
}

var priceGenerator = getStockPrice("IBM");
var limitPrice = 15;
var price = 100;
while (price > limitPrice) {
    price = priceGenerator.next().value;
    console.log(`buying at ${price}`);
}

function getStock() {
    return {
        code: "IBM",
        price: {
            price1: 100,
            price2: 200
        },
        aaa: "aaa"
    }
}

var {code: codex, price: {price1}} = getStock();

console.log(codex);
console.log(price1);

var array = [1, 2, 3, 4];
var [n1, , , n2] = array
console.log(n1)
console.log(n2)


function something([arg1, arg2, ...others]) {
    console.log(arg1)
    console.log(arg2)
    console.log(others)
}
something(array)

var sum = (arg1, arg2) => arg1 + arg2;
console.log(sum(1, 9))

console.log(array.filter(value => value % 2 == 0));

var getStock1 = function (value) {
    this.value = value;
    setInterval(function () {
        console.log(this.value)
    }, 100000)
}

new getStock1("ace1")

var getStock2 = function (value) {
    this.value = value;
    setInterval(() => {
        console.log(this.value)
    }, 100000)
}
new getStock2("ace2")

// 全局污染
var getStock3 = function (value) {
    this.value = value;
    setInterval(function () {
        console.log(this.value)
    }, 100000)
}
getStock3("ace3")

var array2 = [3, 4, 7, 9, 1, 2, 6];

var i = 0;
var newObj = {
    smaller: [],
    bigger: [],
};

for(var i = 0; 2 > i; i++){

    for(var j = 1; array2.length > j; j++){
        if (array2[j] > array2[0]) {
            newObj.bigger.push(array2[j])
        }else if (array2[j] < array2[0]) {
            newObj.smaller.push(array2[j])
        }
    }

    newObj[newObj.smaller.length] = {
        value :array2[0],
        bigger: [],
        smaller: []
    }

    console.log(newObj)
}
    

    // for(var j = 1; newObj.smaller.length > j; j++){
    //     if (newObj.smaller[j] > newObj.smaller[i]) {
    //         newObj[newObj.smaller.length].bigger.push(newObj.smaller[j])
    //     } else if (newObj.smaller[j] < newObj.smaller[i]) {
    //         newObj[newObj.smaller.length].smaller.push(newObj.smaller[j])
    //     }
    // }
    // console.log(newObj)
    // console.log(newObj)



