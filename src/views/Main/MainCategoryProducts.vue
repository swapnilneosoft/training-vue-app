<template>
   <div>
    <section>
      <div class="container">
        <div class="row">
          
          <CategoryProducts />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Slider from '../../components/Slider/Slider.vue';
  import CategoryProducts from "../../components/MainPage/CatergoryProducts.vue";
export default {
name:"MainCategoryProducts",
components:{
  CategoryProducts,
  Slider,

}

}
</script>

<style>

</style>