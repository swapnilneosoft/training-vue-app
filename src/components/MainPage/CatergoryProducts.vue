<template>
  <div class="container">
      <div class="row" style="padding:10px">
          <router-link to="/"> <button class="btn btn-primary" >Back</button></router-link>
      </div>
    <div class="row">
       
      <div v-if="this.getCategoryWiseProduct.length > 0">
        <single-product
          v-for="prod in this.getCategoryWiseProduct"
          :key="prod.id"
          :product="prod"
        />
      </div>
      <div v-else>
         <div class="row">
             <div class="text-center text-secondary " style="color:#f0f0f0">
                 <h2> NO PRODUCT FOUND</h2>
             </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SingleProduct from "../Product/SingleProduct.vue";
export default {
  components: { SingleProduct },
  name: "CategoryProducts",
  computed: {
    ...mapGetters(["getCategoryWiseProduct"]),
  },
  methods: {
    ...mapActions(["categoryWiseProductApi"]),
  },
  data() {
    return {
      param: {
        category_id: "",
        sub_category_id: "",
      },
    };
  },
  beforeCreate() {},
  async beforeMount() {
    this.param.category_id = this.$route.params.id;
    this.param.sub_category_id = this.$route.query.subcat;
    await this.categoryWiseProductApi(this.param);
  },
};
</script>

<style>
</style>