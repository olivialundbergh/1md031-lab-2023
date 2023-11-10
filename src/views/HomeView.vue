// The template
<!--I vue är filosofin att alla filerna ligger i samma fil, men det kan bli stort så man delar upp saker i olika kompontenter-->
<template>
  <!-- Förstärkt "HTML kod", kommentera såhär, Filosofin är att tänka mall--->

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
      />
      <!--En array av burgare, v-bind binder, Här är det som visas, det är som vi skapar vår egna sektion i HTML dokumentet-->
    </div>

    <section class="deliveryInfo" id="theDeliveryInfo">
      <h1>Your delivery information</h1>
      <p>
        <label for="firstName">Your Name</label><br />
        <input
          type="text"
          id="firstName"
          name="firstName"
          required="required"
          placeholder="First & Last name..."
        />
      </p>
      <p>
        <label for="email">E-mail</label><br />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail adress..."
        />
      </p>
      <p>
        <label for="street">Address</label><br />
        <input
          type="text"
          id="street"
          name="street"
          required="required"
          placeholder="Home adress..."
        />
      </p>
      <p>
        <label for="zipCode">ZipCode</label><br />
        <input
          type="number"
          id="zipCode"
          name="zc"
          required="required"
          placeholder="ZipCode..."
        />
      </p>
      <p>
        <label for="additionalInformation">Additional information</label><br />
        <textarea
          id="additionalInformation"
          name="textarea"
          rows="3"
          cols="30"
          placeholder="Put extra info on how to deliver here..."
          maxlength="100"
        ></textarea>
      </p>

      <form>
        <h3>Your gender:</h3>
        <input
          type="radio"
          id="nonDisclosed"
          name="gender"
          value="nonDisclosed"
          checked
        />
        <label for="nonDisclosed">Prefer not to disclose</label><br />
        <input type="radio" id="woman" name="gender" value="Woman" />
        <label for="woman">Woman</label><br />
        <input type="radio" id="man" name="gender" value="Man" />
        <label for="man">Man</label>
      </form>

      <br />
      <h3>Payment choice:</h3>
      <p>
        <label for="payment"> Payment method: </label>
        <select id="payment" name="pmt">
          <option>Klarna</option>
          <option>Swish</option>
          <option selected>Card</option>
          <option>Cash</option>
          <option>Invoice</option>
        </select>
      </p>

      <button type="submit">
        <img src="burger.gif" style="width: 55px" />
        Send info!
      </button>
    </section>
    <h1>About us:</h1>
    <p>
      We are an Uppsala based company, with fast deliveries and happy customers!
    </p>
  </main>

  <hr />
  <br />
  <footer>&copy; Burger Inc. Uppsala 2023</footer>

  <div>
    <div id="map" v-on:click="addOrder">
      <!--v-on = event, då ska det som står " "- hända-->
      click here
    </div>
  </div>
</template>
// End of template

<script>
/* "JavaScript kod" */
import Burger from "../components/OneBurger.vue";
import io from "socket.io-client";

const socket = io(); // läser in socket bibliotek som används för att förenkla användning av websocket

//Här ska burger funktionen ligga
function MenuItem(name, url, gluten, lactose, kcal, meatType) {
  this.name = name; // The *this* keyword refers to the object itself
  this.theUrl = url;
  this.containsGluten = gluten;
  this.containsLactose = lactose;
  this.calories = kcal;
  this.theMeatType = meatType;
}

const burgerArray = [
  new MenuItem("The extra cheesy burger", "hamburger1.png", true, true, 688, "Beef"),
  new MenuItem("The tasty chicken burger", "hamburger2.png", true, true, 712, "Chicken"),
  new MenuItem("The mega deluxe burger", "megaburger.png", true, true, 924, "Beef"),
  new MenuItem("The extremely crispy fries", "frecnh_fries.png", false, false, 99, "Veggie"),
];
console.log(burgerArray);

export default {
  name: "HomeView",
  components: {
    Burger,
  },
  data: function () {
    return {
      burgers: burgerArray, //burgers= samtliga burgare i burgerArray, detta är en loop
    };
  },
  methods: {
    getOrderNumber: function () {
      return Math.floor(Math.random() * 100000);
    },
    addOrder: function (event) {
      var offset = {
        x: event.currentTarget.getBoundingClientRect().left, //var är offseten, hur långt ner och till vänster
        y: event.currentTarget.getBoundingClientRect().top,
      };
      socket.emit(
        "addOrder",
        {
          orderId: this.getOrderNumber(), //slumpar ett nummer
          details: {
            x: event.clientX - 10 - offset.x,
            y: event.clientY - 10 - offset.y,
          }, //var klickade vi på sidan och tar bort 10 ( bubblans radie) och drar bort offseten= positionen!
          orderItems: ["Olivia", "Curry"], // här är det som står, ligger i en array nu men vi antagligen skickar med ett objekt
        } //socket emit skickar "datan", och socket.on mottar
      );
    },
  },
};
</script>

// The styling part
<style>
/** "CSS kod", kommentera såhär */
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
.firstText {
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
  margin:20px;
  padding:30px;
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


footer {
  color: #00173c;
}
#map {
  width: 300px;
  height: 300px;
  background-color: pink;
  background-image: url(../../public/img/polacks.jpg);
}
</style>
//End of styling
