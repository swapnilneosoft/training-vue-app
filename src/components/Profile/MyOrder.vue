<template>
  <div id="contact-page" class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">My Orders</h2>
        </div>
      </div>
      <div class="row">
        <!-- Side bar  -->
        <Sidebar />
        <!-- Sidebar ends her -->
        <div class="col-sm-9">
          <div
            class="row"
            style="margin-top: 5px; padding: 10px; background-color: #000;color:white;"
          >
            <div class="col-sm-1">#</div>
            <div class="col-sm-3">Order Id</div>
            <div class="col-sm-3">Amount</div>
            <div class="col-sm-2">Status</div>
            <div class="col-sm-3">
              Action
            </div>
          </div>
         <div style="height:600px;overflow-y:scroll;overflow-x:hidden">
            <Order
            v-for="(orders, index) in myorders"
            :key="index"
            :sr="index"
            :order="orders"
          />
         </div>
        </div>
      </div>
    </div>

    <br /><br />
  </div>
  <!--/#contact-page-->
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import Sidebar from "../Sidebar/Profile.vue";
import Order from "./components/Order.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ManageAddress",
  computed: {
    ...mapGetters(["fetchAuth", "getMyOrders"]),
    ...mapActions(["myOrders"]),
  },
  components: {
    Sidebar,
    Order,
  },
  data() {
    return {
      myorders: null,
    };
  },
  methods: {},
  beforeCreate() {
    this.$store.dispatch("myOrders");
  },
  mounted() {
    this.myorders = this.getMyOrders;
  },
};
</script>

<style>
</style>