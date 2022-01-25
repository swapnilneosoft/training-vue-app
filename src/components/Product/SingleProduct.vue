<template>
  <div>
    <div class="col-sm-3">
      <div class="product-image-wrapper">
        <div class="single-products">
          <div class="productinfo text-center">
            <img :src="product.images[0]" alt="" />
            <h2>${{ product.price }}</h2>
            <p>{{ product.name }}</p>
            <button @click="addCartBtn(product.id)"  class="btn btn-default add-to-cart"
                ><i class="fa fa-shopping-cart"></i>Add to cart</button
              >
          </div>
        </div>
        <div class="choose">
          <ul class="nav nav-pills nav-justified">
            <li>
              <a href="#"><i class="fa fa-plus-square"></i>Add to wishlist</a>
            </li>
            <li>
              <router-link :to="'/product/preview/'+product.id">Preview</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleProduct",
  props: ["product"],
  methods: {
    addCartBtn(e) {
      this.$store.dispatch("addTocart", { id: e, quantity: 1 });
    },
  },
};
</script>

<style>
</style>