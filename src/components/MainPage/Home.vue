<template>
  <div class="col-sm-9 padding-right">
    <div class="features_items">
      <!--features_items-->
      <h2 class="title text-center">Features Items</h2>
      <div class="col-sm-4" v-for="(product) in getInitIndexApi.product" :key="product.id">
        <div class="product-image-wrapper">
          <div class="single-products">
            <div class="productinfo text-center">
              <img :src="product.images[0]" alt="" />
              <h2>${{product.price}}</h2>
              <p>{{product.name}}</p>
              <button @click="addCartBtn(product.id)"  class="btn btn-default add-to-cart"
                ><i class="fa fa-shopping-cart"></i>Add to cart</button
              >
            </div>
          </div>
          <div class="choose">
            <ul class="nav nav-pills nav-justified">
              <li>
                <a href="javascript::void(0)" @click="addToWishlist(product.id)"><i class="fa fa-plus-square"></i>Add to wishlist</a>
              </li>
            <li>
              <router-link :to="'/product/preview/'+product.id">Preview</router-link>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--features_items-->

   
    <!--/recommended_items-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name:"Home",
  computed:{
    ...mapGetters(['getInitIndexApi'])
  },
  beforeMount(){
    console.log(this.getInitIndexApi.product);
  },
  methods:{
    addCartBtn(e){
        this.$store.dispatch('addTocart',{id:e,quantity:1});
    },
    addToWishlist(id)
    {
      this.$store.dispatch("addWishlist", { id: id });
    }
    
  }
};
</script>

<style>
</style>