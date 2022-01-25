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
                  <li class="active">Check out</li>
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
                    </tr>
                  </thead>
                  <tbody>
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
                          <span>{{ product.quantity }}</span>
                        </div>
                      </td>
                      <td class="cart_total">
                        <p class="cart_total_price">
                          {{ product.price * product.quantity }}
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td colspan="4">
                        <table>
                          <tr>
                            <td><h4>Apply Coupon</h4></td>
                            <td>
                              <input
                                type="text"
                                v-model="form.coupon.code"
                                class="form-control"
                                :disabled="form.coupon.response"
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                @click="applyCoupon"
                                class="btn btn-default btn-primary"
                                :disabled="form.coupon.response"
                              >
                                Apply
                              </button>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td colspan="1">
                        <table class="table table-condensed total-result">
                          <tr>
                            <td>Cart Sub Total</td>
                            <td>{{ getCartCheckout.total }}</td>
                          </tr>
                          <tr v-if="form.coupon.response">
                            <td>discount</td>
                            <td>
                              -{{ form.coupon.discount
                              }}<span v-if="form.coupon.percentage"
                                >%
                                <small
                                  >will be apply on order amount</small
                                ></span
                              >
                              <span v-else>INR</span>
                            </td>
                          </tr>
                          <tr class="shipping-cost">
                            <td>Shipping Cost</td>
                            <td>
                              {{ getCartCheckout.total >= 500 ? "Free" : "50" }}
                            </td>
                          </tr>
                          <tr v-if="!form.coupon.percentage">
                            <td>Total</td>
                            <td>
                              <span>
                                INR
                                {{
                                  (getCartCheckout.total > 500
                                    ? getCartCheckout.total
                                    : getCartCheckout.total + 50) -
                                    form.coupon.max_discount >
                                  0
                                    ? (getCartCheckout.total > 500
                                        ? getCartCheckout.total
                                        : getCartCheckout.total + 50) -
                                      form.coupon.max_discount
                                    : 0
                                }}
                              </span>
                            </td>
                          </tr>
                          <tr v-else>
                            <td>Total</td>
                            <td>
                              <span
                                >INR
                                {{
                                  getCartCheckout.total > 500
                                    ? getCartCheckout.total
                                    : getCartCheckout.total + 50
                                }}</span
                              >
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- Address -->
              <div class="col-sm-12">
                <p>Select Address</p>
                <section>
                  <div
                    class="row address-row"
                    v-for="add in fetchAuth.user.address"
                    :key="add.id"
                  >
                    <div class="col-sm-1">
                      <input
                        type="radio"
                        v-model="form.address_id"
                        name="add"
                        :value="add.id"
                      />
                    </div>
                    <div class="col-sm-11">
                      {{ add.fullname }}, {{ add.address }}, {{ add.city }},
                      {{ add.state }}, {{ add.pincode }},
                      {{ add.mobile_no }}
                    </div>
                  </div>
                  <router-link
                    style="float: right"
                    to="/profile/manage-address"
                    class="btn btn-primary"
                    >Add new address</router-link
                  >
                </section>
              </div>
              <div class="payment-options">
                <div class="col-sm-2">
                  <h5 class="title">Payment Type</h5>
                </div>
                <div class="col-sm-9">
                  <span>
                    <label
                      ><input
                        type="radio"
                        name="mode"
                        v-model="form.payment_mode"
                        value="0"
                      />
                      Cash On Delivery
                    </label>
                  </span>
                  <span>
                    <label
                      ><input
                        type="radio"
                        name="mode"
                        v-model="form.payment_mode"
                        value="1"
                      />
                      online</label
                    >
                  </span>
                </div>
              </div>
              <div class="col-sm-12 text-center">
                <button
                  type="button"
                  @click="submitOrder"
                  style="width: 50%; padding: 10px; margin: 5px"
                  class="btn btn-primary"
                >
                  Place order (
                  {{
                    (getCartCheckout.total > 500
                      ? getCartCheckout.total
                      : getCartCheckout.total + 50) -
                      form.coupon.max_discount >
                    0
                      ? (getCartCheckout.total > 500
                          ? getCartCheckout.total
                          : getCartCheckout.total + 50) -
                        form.coupon.max_discount
                      : 0
                  }}
                  )
                </button>
              </div>
            </div>
          </section>
          <!--/#cart_items-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Address from "../../components/Profile/components/Address.vue";
import Swal from "sweetalert2";
export default {
  name: "Checkout",
  computed: {
    ...mapGetters(["getCartCheckout", "fetchAuth"]),
  },
  components: {
    Address,
  },
  data() {
    return {
      form: {
        payment_mode: "",
        coupon: {
          id: "",
          code: "",
          response: false,
          percentage: false,
          discount: 0,
          max_discount: 0,
        },
        address_id: null,
      },
    };
  },
  methods: {
    async submitOrder() {
      await this.$store.dispatch("checkoutOrder", this.form);
    },
    async applyCoupon() {
      this.$store.dispatch("changeLoader", true);
      await axios
        .post("/profile/apply-coupon", this.form.coupon)
        .then((res) => {
          console.log(res);
          if (res.data.status == 200) {
            this.$store.dispatch("changeLoader", false);
            this.form.coupon.id = res.data.coupon.id;
            this.form.coupon.code = res.data.coupon.code;
            this.form.coupon.response = true;
            this.form.coupon.percentage =
              res.data.coupon.percentage == 1 ? true : false;
            this.form.coupon.discount = res.data.coupon.discount;
            this.form.coupon.max_discount = res.data.coupon.max_disc;
            Swal.fire({
              position: "top-right",
              icon: "success",
              title: "Coupon has been added",
              timer: 2000,
              closeButtonHtml: true,
            });
          }
          if (res.data.status == 401) {
            this.$store.dispatch("changeLoader", false);
            this.form.coupon.id = "";
            this.form.coupon.code = "";
            this.form.coupon.response = false;
            this.form.coupon.percentage = false;
            this.form.coupon.discount = 0;
            this.form.coupon.max_discount = 0;
            console.log("hi");
            Swal.fire({
              position: "center",
              icon: "error",
              title: `Erro`,
              text: `${res.data.message}`,
              timer: 2000,
              closeButtonHtml: true,
            });
          }
        });
    },
  },
};
</script>

<style>
</style>