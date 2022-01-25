<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 text-center">
        <div
          v-for="(list, index) in getMyWishlist"
          :key="index"
          class="row"
          style="
            background-color: #f0f0f0;
            padding: 10px;
            border-radius: 10px;
            margin-top: 10px;
          "
        >
          <div class="col-sm-2">{{ index + 1 }}</div>
          <div class="col-sm-3">{{ list.products.name }}</div>
          <div class="col-sm-4">
            <button
              class="btn btn-danger"
              @click="removeWish(list.products.id)"
            >
              Delete
            </button>
          </div>
          <div class="col-sm-3">
            <button
              @click="addCartBtn(list.products.id)"
              class="btn btn-success"
            >
              Move to cart
            </button>
          </div>
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Wishlist",
  data(){
    return{
      wish:null
    }
  },
  computed: {
    ...mapActions(["getWishlistApi"]),
    ...mapGetters(["getMyWishlist"]),
  },
  beforeMount(){
    this.wish = this.getMyWishlist;
  },
  methods: {
    addCartBtn(e) {
      this.$store.dispatch("addTocart", { id: e, quantity: 1 });
      this.$store.dispatch("removeFromWishlist", { id: e });
    },
    removeWish(e) {
      this.$store.dispatch("removeFromWishlist", { id: e });
    },
  },
};
</script>

<style>
</style>