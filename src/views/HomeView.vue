// The template
<template>
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

<script>
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
<style>
  #map {
    width: 300px;
    height: 300px;
    background-color: pink;
  }
</style>
//End of styling