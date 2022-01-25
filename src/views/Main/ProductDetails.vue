<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <div class="col-sm-9 padding-right">
            <div class="product-details">
              <!--product-details-->
              <div class="col-sm-5">
                <div class="view-product">
                  <img :src="product.images[0]" alt="" />
                  <h3>ZOOM</h3>
                </div>
                <div
                  id="similar-product"
                  class="carousel slide"
                  data-ride="carousel"
                >
                  <!-- Wrapper for slides -->
                  <div class="carousel-inner">
                    <div class="item active">
                      <a
                        href="#"
                        v-for="(image, index) in product.images"
                        :key="index"
                        ><img :src="image" alt="" width="25%"
                      /></a>
                    </div>
                  </div>

                  <!-- Controls -->
                  <a
                    class="left item-control"
                    href="#similar-product"
                    data-slide="prev"
                  >
                    <i class="fa fa-angle-left"></i>
                  </a>
                  <a
                    class="right item-control"
                    href="#similar-product"
                    data-slide="next"
                  >
                    <i class="fa fa-angle-right"></i>
                  </a>
                </div>
              </div>
              <div class="col-sm-7">
                <div class="product-information">
                  <!--/product-information-->
                  <img
                    src="/assets/images/product-details/new.jpg"
                    class="newarrival"
                    alt=""
                  />
                  <h2>{{ product.name }}</h2>
                  <img src="/assets/images/product-details/rating.png" alt="" />
                  <span>
                    <span>INR {{ product.price }}</span>
                    <label>Quantity:</label>
                    <input v-model="quantity" type="text" value="1" />
                    <button
                      @click="addCartBtn(product.id)"
                      class="btn btn-fefault cart"
                      v-if="product.quantity > 0"
                    >
                      <i class="fa fa-shopping-cart"></i>Add to cart
                    </button>
                    <button v-else>Out Of Stock</button>
                  </span>
                  <p>
                    <b>Availability:</b>
                    {{ product.quantity > 0 ? "In Stock" : "Out of stock" }}
                  </p>
                  <a href=""
                    ><img
                      src="/assets/images/product-details/share.png"
                      class="share img-responsive"
                      alt=""
                  /></a>
                </div>
                <!--/product-information-->
              </div>
            </div>
            <!--/product-details-->

            <div class="category-tab shop-details-tab">
              <!--category-tab-->
              <div class="col-sm-12">
                <ul class="nav nav-tabs">
                  <li class="active">
                    <a href="#details" data-toggle="tab">Details</a>
                  </li>
                </ul>
              </div>
              <div class="tab-content">
                <div class="tab-pane fade active in" id="details">
                  <div v-for="(attr,index) in product.assoc_attributes" :key="index" class="row" style="border:1px solid #f0f0f0;padding:5px;margin:5px">
                    <div class="col-sm-6" style="text-align:center; background-color:#f0f0f0;padding:10px;border:1px solid #f0f0f0">{{attr.attr_name}}</div>
                    <div class="col-sm-6 " style="text-align:center;padding:10px">{{attr.attr_description}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!--/category-tab-->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar/Sidebar.vue";
import CategoryProducts from "../../components/MainPage/CatergoryProducts.vue";
import { mapGetters } from "vuex";
export default {
  name: "MainCategoryProducts",
  components: {
    CategoryProducts,
    Sidebar,
  },
  computed: mapGetters(["getProductDetails"]),

  data() {
    return {
      product_id: this.$route.params.id,
      quantity: 1,
      product: {},
    };
  },
  beforeMount() {},
  async mounted() {
    const res = await this.$store.dispatch("productDetails", this.product_id);
    this.product = this.getProductDetails;
  },
  created() {},
  methods: {
    addCartBtn(e) {
      this.$store.dispatch("addTocart", { id: e, quantity: this.quantity });
    },
  },
};
</script>

<style>
</style>