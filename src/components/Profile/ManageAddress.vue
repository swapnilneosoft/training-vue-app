<template>
  <div id="contact-page" class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">Manage Address</h2>
        </div>
      </div>
      <div class="row">
        <!-- Side bar  -->
        <Sidebar />
        <!-- Sidebar ends her -->
        <div class="col-sm-9">
          <div class="contact-info">
            <Address :address="fetchAuth.user.address" />
            <div class="bill-to" style="padding: 10px; margin-top: 100px">
              <p>Add New Address</p>
              <div class="form-one">
                <form>
                  <input
                    type="text"
                    v-model="address.fullname"
                    placeholder="Full Name *"
                  />
                  <input
                    type="text"
                    placeholder="Mobile Phone *"
                    v-model="address.mobile_no"
                  />

                  <p>Address lines</p>
                  <textarea
                    name="message"
                    placeholder="Notes about your order, Special Notes for Delivery"
                    rows="5"
                    v-model="address.address"
                  ></textarea>
                </form>
              </div>
              <div class="form-two">
                <form>
                  <input
                    type="text"
                    placeholder="State *"
                    v-model="address.state"
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    v-model="address.city"
                  />
                  <input
                    type="text"
                    placeholder="Zip / Postal Code *"
                    v-model="address.pincode"
                  />
                  <button
                    type="button"
                    @click="submitAddress"
                    class="form-control btn btn-primary"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
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
import Address from "./components/Address.vue";
import { mapGetters } from "vuex";

export default {
  name: "ManageAddress",
  computed: {
    ...mapGetters(["fetchAuth"]),
  },
  components: {
    Sidebar,
    Address,
  },
  data() {
    return {
      address: {
        fullname: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
        mobile_no: "",
      },
    };
  },
  methods: {
    async submitAddress() {
      console.log("hji");
      this.$store.dispatch("changeLoader", true);
      await axios.post("/profile/add-address", this.address).then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          Swal.fire({
            icon: "success",
            title: `Address has been added !`,
            showConfirmButton: true,
          });
          this.address.fullname = "";
          this.address.address = "";
          this.address.state = "";
          this.address.city = "";
          this.address.pincode = "";
          this.address.mobile_no = "";
          this.$store.dispatch("attempt", localStorage.getItem("token"));
        }
        if (res.data.status == 401) {
          Swal.fire({
            icon: "error",
            title: `All fields are mandatory <br>    Code : ${res.data.status} `,
            showConfirmButton: true,
          });
        }
      });
      
        this.$$store.dispatch("changeLoader", false);
    },
  },
};
</script>

<style>
</style>