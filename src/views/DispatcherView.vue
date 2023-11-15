<template>
  <!-- HTML koden-->

  <!-- I template kommenterar man såhär, som i HTML-->

  <!-- Kommentera med command shift 7  -->
  <section class="dispatchStyle">
  <div id="orders">
    <div id="orderList">
      <!-- <div v-for="(order, key) in orders" v-bind:key="'order' + key">
   {{ key }}: {{ order.orderItems.join("\n ") }} 
   {{ "testing:" }}{{JSON.stringify(order.orderItems) }} -->
  
   <dic v-for="(order, index) in orders" :key="index">
    <section id="aCustomerOrder">
    #{{ order.orderId }}: {{getName(order) }}:  {{order.orderItems}}
    <section> {{remainingInfo(order)}} </section>
    <hr class="smaller">
  </section>
   </dic>


      <button class="clearButton" v-on:click="clearQueue">Clear Queue</button>
    </div>
    <div
      id="dots"
      v-bind:style="{
        background: 'url(' + require('../../public/img/polacks.jpg') + ')',
      }"
    >
      <div
        v-for="(order, key) in orders"
        v-bind:style="{
          left: order.details.x + 'px',
          top: order.details.y + 'px',
        }"
        v-bind:key="'dots' + key"
      >
        {{ key }}
      </div>
    </div>
  </div>
</section>
</template>

<script>
// "JavaScript koden" /** Kommenterar stycken såhär */
import io from "socket.io-client"; //hej
const socket = io();

export default {
  name: "DispatcherView",
  data: function () {
    return {
      orders: null,
    };
  },
  created: function () {
    socket.on("currentQueue", (data) => (this.orders = data.orders));
  },
  methods: {
    clearQueue: function () {
      socket.emit("clearQueue");
    },
    getName: function(order){
    return order.givenInfo[0];
  },
  remainingInfo: function(order){
    return ((order.givenInfo).splice(1,3)).join(",  ")
  }
  
  },
 

};
</script>

<style>
/* "CSS kod" */
.smaller{
  height:2px;
}
#orderList {
  top: 1em;
  left: 1em;
  position: absolute;
  z-index: 2;
  color: black;
  background: rgba(255, 255, 255, 0.5);
  padding: 1em;
}
#dots {
  position: relative;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  width: 1920px;
  height: 1078px;
  cursor: crosshair;
}

#dots div {
  position: absolute;
  background: black;
  color: white;
  border-radius: 10px;
  width: 22px;
  height: 22px;
  text-align: center;
}
.dispatchStyle, .clearButton{
  font-weight: bolder;
  font-size: 20px;
  font-family: 'Times New Roman', Times, serif;
}

#aCustomerOrder{
  margin:20px;

}
</style>
