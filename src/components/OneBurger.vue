<template>


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


    <div>
      {{ burger.name }} {{ burger.kCal }}
    </div>
  </template>
  
  <script>
  export default {
    name: 'OneBurger',
    props: {
      burger: Object
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  burger{
  background: radial-gradient(#ffbe0bff, #fb5607ff, #ff006eff, #8338ecff, #3a86ffff);
    border: 5px solid #8338ecff;  
    border-radius:50px; 
    grid-template-columns: 25% 25% 25% 25%;
    margin-left: 10px;
    margin-right: 10px;
  }
  </style>
  