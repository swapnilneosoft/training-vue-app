<template>
  <div>
    <section>
      <div class="container">
        <div class="row">
          <section id="cart_items">
            <div class="container">
              <div class="breadcrumbs">
                <ol class="breadcrumb">
                  <li><router-link to="/">Home</router-link></li>
                  <li class="active">Shopping Cart</li>
                </ol>
              </div>
              <!--/breadcrums-->

              <div class="review-payment">
                <h2>Review & Payment</h2>
              </div>

              <div class="table-responsive cart_info">
                <table class="table table-condensed">
                  <thead>
                    <tr class="cart_menu">
                      <td class="image">Item</td>
                      <td class="description"></td>
                      <td class="price">Price</td>
                      <td class="quantity">Quantity</td>
                      <td class="total">Total</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody v-if="getCartCheckout.total > 0">
                    <tr
                      v-for="(product, index) in getCartCheckout.products"
                      :key="index"
                    >
                      <td class="cart_product">
                        <a href=""
                          ><img
                            v-if="product.image[0] != null"
                            :src="product.image[0].image"
                            alt=""
                            width="150px" />
                          <img
                            src="/assets/images/shop/dummy.jpg"
                            v-else
                            alt=""
                            width="150px"
                        /></a>
                      </td>
                      <td class="cart_description">
                        <h4>
                          <a href="#">{{ product.name }}</a>
                        </h4>
                      </td>
                      <td class="cart_price">
                        <p>INR {{ product.price }}</p>
                      </td>
                      <td class="cart_quantity">
                        <div class="cart_quantity_button">
                          <a
                            class="cart_quantity_up"
                            href="javascript:void(0)"
                            @click="addQuantity(product.id)"
                          >
                            +
                          </a>
                          <input
                            class="cart_quantity_input"
                            type="text"
                            name="quantity"
                            :value="product.quantity"
                            autocomplete="off"
                            size="2"
                            disabled
                          />
                          <a
                            class="cart_quantity_down"
                            href="javascript:void(0)"
                            @click="minusQuantity(product.id)"
                          >
                            -
                          </a>
                        </div>
                      </td>
                      <td class="cart_total">
                        <p class="cart_total_price">
                          {{ product.price * product.quantity }}
                        </p>
                      </td>
                      <td class="cart_delete">
                        <a
                          class="cart_quantity_delete"
                          href="javascript:void(0)"
                          @click="removeProduct(product.id)"
                          ><i class="fa fa-times"></i
                        ></a>
                      </td>
                    </tr>

                    <tr>
                      <td colspan="4">&nbsp;</td>
                      <td colspan="2">
                        <table class="table table-condensed total-result">
                          <tr>
                            <td>Cart Sub Total</td>
                            <td>INR {{ getCartCheckout.total }}</td>
                          </tr>
                          <tr>
                            <td>Exo Tax</td>
                            <td>$0</td>
                          </tr>
                          <tr class="shipping-cost">
                            <td>Shipping Cost</td>
                            <td>{{getCartCheckout.total >= 500 ? 'Free' : '50'}}</td>
                          </tr>
                          <tr>
                            <td>Total</td>
                            <td>
                              <span>INR {{getCartCheckout.total > 500 ? getCartCheckout.total : getCartCheckout.total+50}}</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                      <tr>
                        
                        <td colspan="6" class="text-center"><h1 style="color:#f0f0f0">Cart is Empty.</h1> </td>
                      </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <!--/#cart_items-->


          <section id="do_action">
            <div class="container">
              <router-link to="/order/checkout" class="btn btn-primary"  style="float:right">Checkout ( INR {{getCartCheckout.total > 500 ? getCartCheckout.total : getCartCheckout.total+50}} ) </router-link>
            </div>
          </section>
          <!--/#do_action-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  computed: {
    ...mapGetters(["getCartCheckout"]),
  },
  components: {},
  async beforeMount() {
    await this.$store.dispatch("cartCheckOut");

  },
  methods: {
    async addQuantity(id) {
      await this.$store.dispatch("addProductQuantity", id);
    },
    async minusQuantity(id) {
      await this.$store.dispatch("minusProductQuantity", id);
    },
    async removeProduct(id) {
      await this.$store.dispatch("removeProductFromCart", id);
    },
  },
};
</script>

<style>
</style>