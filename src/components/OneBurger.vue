<template>
  <div>
    <h1 class="name">{{ burger.name }}</h1>
    <img v-bind:src="burger.theUrl" :title="burger.name" :alt="burger.name" />
    <div class="foodInfo">
      <ul>
        <li>{{ burger.theMeatType }}</li>
        <li v-if="burger.containsLactose">Dairy</li>
        <li v-if="burger.containsGluten">Gluten</li>
        <li>{{ burger.calories }} kCal</li>
      </ul>
    </div>
    <section class="theButtons">
      <button v-on:click="increaseAmount">+</button>
      <button v-on:click="decreaseAmount">-</button>
      <p v-if="amountOrdered">{{ amountOrdered }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "OneBurger",
  props: {
    burger: Object,
  },
  data: function () {
    return {
      amountOrdered: 0,
    };
  },

  methods: {
    glutenCheck(gluten) {
      // Not used
      if (gluten) return "Gluten";
      else return "No Gluten";
    },
    lactoseCheck(lactose) {
      // Not used
      if (lactose) return "Dairy";
      else return "No Dairy";
    },
    increaseAmount() {
      this.amountOrdered++;
      this.$emit("orderedBurger", {
        name: this.burger.name,
        amount: this.amountOrdered,
      });
    },
    decreaseAmount() {
      if (this.amountOrdered > 0) {
        this.amountOrdered--;
        this.$emit("orderedBurger", {
          name: this.burger.name,
          amount: this.amountOrdered,
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
burger {
  text-align: center;
  padding: 2%;
}
img {
  width: 85%;
}
h1 {
  text-align: center;
  padding: 8px;
  font-size: 35px;
}
.foodInfo {
  list-style-position: inside;
  font-weight: bold;
  text-align: center;
  margin-left: -70px;
}
.theButtons {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
}

button {
  text-align: center;
  width: 45px;
  height: 45px;
  margin: 2px;
}
</style>
