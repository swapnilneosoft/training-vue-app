<template>
  <div>
    <Slider />
    <section>
      <div class="container">
        <div class="row">
          <!-- Side bar -->
          <Sidebar />
          <MainHome />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from "../components/Slider/Slider.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
import MainHome from "../components/MainPage/Home.vue";
export default {
  name: "Home",
  components: {
    Slider,
    Sidebar,
    MainHome,
  },
};
</script>
