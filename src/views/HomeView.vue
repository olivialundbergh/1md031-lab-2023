<template>
  <div class="topPage">
    <header>Burger Inc. Uppsala</header>
    <img class="stars" src="the_Stars.gif" />
  </div>

  <main>
    <section class="firstText">
      <h1>Select your order below</h1>
      <p>
        Here you can choose what burgers you want delivered, and any addons to
        the food
      </p>
    </section>

    <div class="wrapper">
      <Burger
        v-for="burger in burgers"
        v-bind:burger="burger"
        v-bind:key="burger.name"
        v-on:orderedBurger="addToOrder($event)"
      />
    </div>

    <section class="receipt">
      <h1>Your chosen order:</h1>
      <p v-for="(amount, name) in orderedBurgers" :key="name">
        {{ name }}:  {{ amount }}
      </p>
      <h4>Total amount of items: {{ calculateAmount() }}</h4>
    </section>

    <section class="deliveryInfo" id="theDeliveryInfo">
      <h1>Your delivery information</h1> 
      <p>
        <label for="firstName">Your Name</label><br />
        <input
          type="text"
          id="firstName"
          v-model="firstName"
          required="required"
          placeholder="First & Last name..."
        />
      </p>
      <p>
        <label for="email">E-mail</label><br />
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="E-mail adress..."
        />
      </p>

     <!-- <p>
        <label for="street">Address</label><br />
        <input
          type="text"
          id="street"
          v-model="street"
          required="required"
          placeholder="Home adress..."
        />
      </p>
      <p>
        <label for="zipCode">ZipCode</label><br />
        <input
          type="number"
          id="zipCode"
          v-model="zc"
          required="required"
          placeholder="ZipCode..."
        />
      </p>-->
      <!-- <p>
        <label for="additionalInformation">Additional information</label><br />
        <textarea
          id="additionalInformation"
          v-model="textarea"
          rows="3"
          cols="30"
          placeholder="Put extra info on how to deliver here..."
          maxlength="100"
        ></textarea>
      </p> -->

      <form>
        <h3>Your gender:</h3>
        <input
          type="radio"
          id="nonDisclosed"
          value="nonDisclosed"
          v-model="picked"
        />
        <label for="nonDisclosed">Prefer not to disclose</label><br />
        <input type="radio" id="woman" value="woman" v-model="picked" />
        <label for="woman">Woman</label><br />
        <input type="radio" id="man" value="Man" v-model="picked" />
        <label for="man">Man</label>
      </form>

      <br />
      <h3>Payment choice:</h3>
      <p>
        <label for="payment"> Payment method: </label>

        <select id="payment" v-model="selected">
          <option>Klarna</option>
          <option>Swish</option>
          <option>Card</option>
          <option>Cash</option>
          <option>Invoice</option>
        </select>
      </p>
      <div>
        <br />

        <h3>Click on your location:</h3>
        <section class="scrollable">
          <div
            id="map"
            v-on:click="setLocation"
            v-bind:style="{
              background:
                'url(' + require('../../public/img/polacks.jpg') + ')',
            }"
          >
            <div
              v-bind:style="{
                left: this.location.x + 'px',
                top: this.location.y + 'px',
              }"
            >
              T
            </div>
          </div>
        </section>
      </div>

      <br />
      <button v-on:click="sendInformation">
        <img src="burger.gif" style="width: 55px" />
        Send info!
      </button>
    </section>
    <section class="theEndPage">
      <h1>About us:</h1>
      <p>
        We are an Uppsala based company, with fast deliveries and happy
        customers!
      </p>
    </section>
  </main>

  <hr />
  <br />
  <footer>&copy; Burger Inc. Uppsala 2023</footer>
</template>
// End of template

<script>
/* "JavaScript kod" */

import menu from "../assets/menu.json";
import Burger from "../components/OneBurger.vue";
import io from "socket.io-client";

const socket = io(); // läser in socket bibliotek som används för att förenkla användning av websocket

/*function MenuItem(name, url, gluten, lactose, kcal, meatType) {
  this.name = name; // The *this* keyword refers to the object itself
  this.theUrl = url;
  this.containsGluten = gluten;
  this.containsLactose = lactose;
  this.calories = kcal;
  this.theMeatType = meatType;
}*/

/**const burgerArray = [
  new MenuItem("The extra cheesy burger", "hamburger1.png", true, true, 688, "Beef"),
  new MenuItem("The tasty chicken burger", "hamburger2.png", true, true, 712, "Chicken"),
  new MenuItem("The mega deluxe burger", "megaburger.png", true, true, 924, "Beef"),
  new MenuItem("The extremely crispy fries", "frecnh_fries.png", false, false, 99, "Veggie"),
];
console.log(burgerArray);*/

export default {
  name: "HomeView",
  components: {
    Burger,
  },
  data: function () {
    return {
      burgers: menu, //burgers= samtliga burgare i burgerArray, detta är en loop
      picked: "nonDisclosed",
      orderedBurgers: {},
      customerInfo: [],
      selected: "Card",
      queNumber: 0,
      location: { x: 0, y: 0 },
    };
  },

  methods: {
    getOrderNumber: function () {
      return (this.queNumber += 1);
    },
    formInformation: function () {
      this.customerInfo=[this.firstName, this.email, this.picked, this.selected]
      console.log(this.customerInfo)
     return this.customerInfo
    
    },
    addToOrder: function (event) {
      this.orderedBurgers[event.name] = event.amount;
      return event.amount;
    },
    calculateAmount: function () {
      let sum = 0;
      for (let amount of Object.values(this.orderedBurgers)) {
        //ChatGPT
        sum += amount;
      }
      return sum;
    },
    addOrder: function (event) {
      var offset = {
        x: event.currentTarget.getBoundingClientRect().left,
      };
      socket.emit(
        "addOrder",
        {
          orderId: this.getOrderNumber(), 
          details: {
            x: event.clientX - 10 - offset.x,
            y: event.clientY - 10 - offset.y,
          },
          orderItems: [this.firstName, this.orderedBurgers], // här är det som står, ligger i en array nu men vi antagligen skickar med ett objekt
        } 
      );
      this.location.x=event.clientX - 10 - offset.x,
      this.location.y=event.clientY - 10 - offset.y
    },

    setLocation: function(){
      var offset = {
        x: event.currentTarget.getBoundingClientRect().left, 
        y: event.currentTarget.getBoundingClientRect().top,
      };
      this.location={x:event.clientX - 10 - offset.x,
        y:event.clientY - 10 - offset.y}
    },
    sendInformation:function(){
     
      socket.emit(
        "addOrder",
        {
          orderId: this.getOrderNumber(), 
          details: {x: this.location.x, y:this.location.y,},
          orderItems: [this.orderedBurgers],
          givenInfo:  this.formInformation(), 
    
        } 
      
      );
    }
    //** <p v-for="(amount, name) in orderedBurgers" :key="name">{{ name }}: {{ amount }} */

  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap");

body {
  font-size: 16px;
}

header {
  /*Huvudtitel*/
  position: absolute;
  margin: 0 auto;
  color: #ff006eff;
  text-align: center;
  top: 8%;
  left: 0;
  right: 0;
  z-index: 2; /*ChatGPT singe "margin-top did not work*/
  font-size: 7em;
}

.stars {
  width: 100%;
  height: 250px;
  opacity: 0.8;
}

.deliveryInfo,
.firstText,
.receipt {
  background-color: #fffacd;
  border: 5px solid #8338ecff;
  border-radius: 50px;
  padding-left: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 10px;
  margin-right: 10px;
}

h4 {
  color: #8338ecff;
  font-size: 25px;
}

h1 {
  font-size: 2.5em;
}

h2,
h3 {
  font-size: 1.8em;
}

.burger p {
  color: #00173c;
}

body {
  font-family: "Bungee Inline", sans-serif;
  color: #ffbe0bff;
  background-color: #a2d6f9;
}

p,
ul,
label {
  font-size: 1.5em;
}

::placeholder {
  font-size: 11.5pt;
  color: #00173c;
  opacity: 0.7;
}

.wrapper {
  display: grid;
  background: radial-gradient(
    #ffbe0bff,
    #fb5607ff,
    #ff006eff,
    #8338ecff,
    #3a86ffff
  );
  border: 5px solid #8338ecff;
  border-radius: 50px;
  grid-template-columns: 25% 25% 25% 25%;
  /*margin-left: 15px;
  margin-right: 15px;**/
  margin: 20px;
  padding: 30px;
  height: 52em;
}

.burger {
  text-align: center;
}

#theDeliveryInfo {
  /*Information sektion*/
  background: linear-gradient(
    180deg,
    #8338ecff,
    #ff006eff,
    #fb5607ff,
    #ffbe0bff
  );
  color: #00173c;
}
label {
  font-size: 20px;
}

li::marker {
  /*Listmarkörer*/
  content: "✔";
  color: hsl(217, 100%, 12%);
  text-align: center;
}

button {
  /* The button*/
  padding: 2px 12px 2px 12px;
  margin-top: 5px;
  margin-bottom: 7px;
  font-family: "Bungee Inline", sans-serif;
  font-size: 20pt;
  color: black;
}
button > img, /*this part selects the img as a direct child of the button*/
      button > span {
  /*this part selects the span as a direct child of the button*/
  vertical-align: middle; /* Add this to align vertically */
}

button:hover {
  /*När man håller på the button*/
  background: linear-gradient(
    225deg,
    #ffbe0bff,
    #fb5607ff,
    #ff006eff,
    #8338ecff,
    #3a86ffff
  );
  cursor: grab;
}
hr {
  /* "Horizontal line"*/
  background: linear-gradient(
    90deg,
    #ffbe0bff,
    #fb5607ff,
    #ff006eff,
    #8338ecff,
    #3a86ffff
  );
  height: 5px;
  border: none;
  margin: 0;
}
/*
#map,
.scrollable {
  margin: 0;
  padding: 0;
}*/

.scrollable {
  width: 95%;
  height: 500px;
  overflow: scroll;
}

#map {
  position: relative;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  width: 1920px;
  height: 1078px;
  cursor: crosshair;
}

#map div {
  position: absolute;
  background: #00173c;
  color: white;
  border-radius: 100px;
  width: 21px;
  height: 21px;
  text-align: center;
}

.theEndPage,
footer {
  color: #00173c;
}
</style>
//End of styling
