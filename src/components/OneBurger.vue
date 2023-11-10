<template>
  <div>
    <h1 class="name">{{ burger.name }}</h1>
    <img v-bind:src="burger.theUrl" alt=burger.name>

    <div class="foodInfo">
      <ul>
        <li>{{ glutenCheck(burger.containsGluten) }}</li>
        <li>{{ lactoseCheck(burger.containsLactose) }}</li>
        <li>{{ burger.theMeatType }}</li>
        <li>{{ burger.calories }} kCal</li>
      </ul>
    </div>
  </div>
</template>



<script>
export default {
  name: "OneBurger",
  props: {
    burger: Object,
  },
  methods: {
    glutenCheck(gluten) {
      if (gluten) return "Gluten";
      else return "No Gluten";
    },
    lactoseCheck(lactose) {
      if (lactose) return "Dairy";
      else return "No Dairy";
    },
    getPublicImageUrl(relativePath) {
      // eslint-disable-next-line no-undef
      return process.env.BASE_URL + relativePath;
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

</style>
