<template>
  <div>
    
    <div>
      <Navbar />

      <router-view />
      <Footer />
    </div>
    <div v-if="getLoader" class="loader-box">
      <Loader  />
      
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Footer/Footer.vue";
import store from "@/store";
import Loader from "./components/loader/Loader.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  computed: mapGetters(["getLoader"]),
  components: {
    Navbar,
    Footer,
    Loader,
  },

  beforeCreate() {
    this.$store.dispatch("initIndexApi");
  },
};
</script>
<style>
.loader-box {
  position: absolute;
  top: 290px;
  left: 45%;
  right: 0px;
  bottom: 0px;
  position: fixed;
  padding: 20px;
  width: 150px;
}
</style>
