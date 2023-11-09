// The template

<template> <!-- "HTML kod", kommentera såhär-->

<div class="topPage"> 
    <header>Burger Inc. Uppsala</header> 
    <img class="stars" src="the_Stars.gif">  
</div>


<main>
    <section class="firstText">
        <h1> Select your order below </h1>
        <p>Here you can choose what burgers you want delivered, and any addons to the food </p>
    </section>
 

<section burgerSection>
<div class="wrapper">

    <div class="burger">
        <h2> The extra cheesy burger</h2>
        <img src="hamburger1.png" style="height: 250px" alt="The cheese burger" title="The cheesy burger">
        <p>Contains: </p>

        <section class="foodContent">
        <ul class="foodInfo" id="theFoodInfo">
            <li>Gluten</li>
            <li>Dairy</li>
            <li>688 Kcal</li>
        </ul>
        </section>
    </div>


    <div class="burger">
        <h2>The tasty chicken burger</h2>
        <img src="betterhamburger2.png" style="height: 250px" alt="The chicken burger" title="The chicken burger">
        <p>Contains: </p>

        <section class="foodContent">   
        <ul class="foodInfo">
            <li>Gluten</li>
            <li>Dairy</li>
            <li>712 Kcal</li>
        </ul>
        </section>
    </div>

    <div class="burger" >
        <h2>The mega deluxe burger</h2>
        <img src="megaburger.png" style="height:250px" alt="The deluxe burger" title="The deluxe burger">
        <p>Contains:</p>

        <section class="foodContent">
        <ul class="foodInfo">
            <li>Gluten</li>
            <li>Dairy</li>
            <li>924 Kcal</li>
        </ul>
        </section>
    </div>

    <div class="burger">
        <h2> The very crispy fries</h2>
        <img src="frecnh_fries.png" style="height: 250px" alt="The french fries" title="The fries">
        <p>Contains: </p>

        <section class="foodContent">
        <ul class="foodInfo">
            <li>Gluten</li>
            <li>99 Kcal</li>
            <li>Potato</li>
        </ul>
        </section>
    </div>
</div>
</section>


<section class="deliveryInfo" id="theDeliveryInfo">
    <h1> Your delivery information </h1>
    <p>
        <label for="firstname">Your Name</label><br>
        <input type="text" id="firstname" name="firstname" required="required" placeholder="First & Last name...">
    </p>
    <p>
        <label for="email">E-mail</label><br>
        <input type="email" id="amail" name="email" placeholder="E-mail adress...">
    </p>
    <p>
        <label for="street">Address</label><br>
        <input type="text" id="street" name="street" required="required" placeholder="Home adress...">
    </p>
    <p>
        <label for="zipcode">ZipCode</label><br>
        <input type="number" id="zipcode" name="zc" required="required" placeholder="ZipCode..." > 
    </p>
    <p>
        <label for="additionalInformation">Additional information</label><br>
        <textarea id="additionalInformation" name="textarea" rows="3" cols="30" placeholder="Put extra info on how to deliever here..."
        maxlength="100"></textarea>
    </p>

<form>
    <h3> Your gender: </h3>
    <input type="radio" id="nonDiscolsed" name="gender" value="nonDiscolsed" checked>
        <label for="nonDiscolsed">Prefer not to disclose</label><br>
    <input type="radio" id="woman" name="gender" value="Woman">
        <label for="woman">Woman</label><br>
    <input type="radio" id="man" name="gender" value="Man">
        <label for="man">Man</label>
</form>
        
<br><h3> Payment choice: </h3>
<p>
    <label for="payment"> Payment method: </label>
    <select id="payment" name="pmt">
        <option>Klarna</option>
        <option>Swish</option>
        <option selected >Card</option>
        <option>Cash</option>
        <option>Invoice</option>
    </select>
 </p>

 <button type="submit">
    <img src="burger.gif"  style="width: 55px;">
    Send info!  
</button>
 </section>
<h1> About us: </h1>
<p> We are an Uppsala based company, with fast deliveries and happy customers! </p>
</main>

<hr> <br> 
<footer> 
    &copy; Burger Inc. Uppsala 2023
</footer>

<div>
    <div>
      <h1>Burgers</h1>
      <Burger v-for="burger in burgers"
              v-bind:burger="burger" 
              v-bind:key="burger.name"/>
    </div>
    <div id="map" v-on:click="addOrder">
      click here
    </div>
  </div>



</template>
// End of template

<script> /* "JavaScript kod", kommentera såhär */
import Burger from '../components/OneBurger.vue'
import io from 'socket.io-client'


const socket = io();

//Här ska burger funkttionen ligga
function MenuItem(name, url, gluten, lactose, kcal) {
    this.name = name; // The *this* keyword refers to the object itself
    this.theUrl = url;
    this.containsGluten = gluten;
    this.containsLactose = lactose;
    this.calories = kcal;
}
const burgerArray = [
  new MenuItem("The extra cheesy burger", "hamburger1.png",true, true, 688), 
  new MenuItem("The tasty chicken burger", "betterhamburger2.png", true, true, 712),
  new MenuItem("The mega deluxe burger", "megaburger.png", true , true, 924),
  new MenuItem("The very crispy fries", "frecnh_fries.png", true, false, 99)
];
console.log(burgerArray)



export default {
  name: 'HomeView',
  components: {
    Burger
  },
  data: function () {
    return {
      burgers: burgerArray
    }
  },
  methods: {
    getOrderNumber: function () {
      return Math.floor(Math.random()*100000);
    },
    addOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      socket.emit("addOrder", { orderId: this.getOrderNumber(),
                                details: { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y },
                                orderItems: ["Beans", "Curry"]
                              }
                 );
    }
  }
}
</script>

// The styling part
<style> /** "CSS kod", kommentera såhär */
@import url('https://fonts.googleapis.com/css2?family=Bungee+Inline&display=swap');

body{
    font-size: 16px;
}

header{        /*Huvudtitel*/
    position: absolute;
    margin: 0 auto;
    color: #ff006eff;
    text-align: center; 
    top: 8%; 
    left: 0; 
    right: 0;
    z-index: 2;  /*ChatGPT singe "margin-top did not work*/
    font-size: 7em; 
}

.stars{
    width:100%;
    height: 250px;
    opacity: 0.8;
}

.deliveryInfo,.firstText{
    background-color: #FFFACD; 
    border: 5px solid #8338ecff; 
    border-radius:50px; 
    padding-left: 50px; 
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
 }

 h1{
    font-size:  2.5em;
 }

 h2, h3{
    font-size: 1.8em;
 }

.burger p{
    color: #00173C;
}

body{
    font-family: 'Bungee Inline', sans-serif;
    color:#ffbe0bff;
    background-color:#A2D6F9;
}

p, ul, label{
    font-size: 1.5em;
    
}

::placeholder{  
    font-size: 11.5pt;
    color: #00173C;
    opacity: 0.7;
}

.wrapper{
    display: grid;
    background: radial-gradient(#ffbe0bff, #fb5607ff, #ff006eff, #8338ecff, #3a86ffff);
    border: 5px solid #8338ecff;  
    border-radius:50px; 
    grid-template-columns: 25% 25% 25% 25%;
    margin-left: 10px;
    margin-right: 10px;
}

.burger{
    text-align: center;
}

#theDeliveryInfo{      /*Information sektion*/
    background:linear-gradient(180deg, #8338ecff , #ff006eff, #fb5607ff, #ffbe0bff);
    color:#00173C;
}

li::marker {         /*Listmarkörer*/
    content: "✔";
    color: hsl(217, 100%, 12%);
    text-align: center;
}


button {      /* The button*/
    padding: 2px 12px 2px 12px;
    margin-top: 5px;
    margin-bottom: 7px;
    font-family: 'Bungee Inline', sans-serif;
    font-size: 20pt;
    color: black;
      } 
      button > img, /*this part selects the img as a direct child of the button*/
      button > span { /*this part selects the span as a direct child of the button*/
        vertical-align: middle;  /* Add this to align vertically */
      }    

button:hover {      /*När man håller på the button*/
    background: linear-gradient(225deg, #ffbe0bff, #fb5607ff, #ff006eff, #8338ecff, #3a86ffff);
    cursor:grab;

 }
 hr{        /* "Horizontal line"*/
    background: linear-gradient(90deg, #ffbe0bff, #fb5607ff, #ff006eff, #8338ecff, #3a86ffff);
    height: 5px;
    border:none;
    margin: 0;
 }

 .foodInfo{
    list-style-position: inside;
    font-weight: bold;
 }


 footer{
    color:  #00173C;
 }
  #map {
    width: 300px;
    height: 300px;
    background-color: pink;
  }
</style>
//End of styling