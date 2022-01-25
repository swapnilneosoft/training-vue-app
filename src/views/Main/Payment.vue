<template>
  <div>
    <div ref="paypal"></div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import router from "../../router";
export default {
  name: "Payment",
  mounted: function () {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AaDWUtRD5AXclf1Mcu6JgvMp-l1zL0KFsCwXIohYITSJ-eVkijy_ESlTm7r6wq67soLrV0dnUnNr4khi";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  data() {
    return {
      loaded: false,
      response: "",
      success: false,
      product: null,
    };
  },
  async created() {
    var id = { id: this.$route.query.order };
    await axios.post("/profile/get-order-details", id).then((res) => {
      if (res.data.status == 200) {
        this.product = res.data.order;
        return "";
      }
      if (res.data.status == 403) {
        Swal.fire({
          position: "center",
          icon: "error",
          heightAuto: true,
          title: `${res.data.message}`,
          timer: 2500,
        });
        setTimeout(function () {
          router.push("/");
        }, 3000);
      }
    });
    console.log(this.product);
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: "this.product.description",
                  amount: {
                    currency_code: "USD",
                    value: this.product.amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            this.$store.dispatch("changeLoader", true);

            const order = await actions.order.capture();
            this.paidFor = true;
            this.response = order;

            console.log(order);

            await axios
              .post("/profile/confirm-payment", {
                order_id: this.product.id,
                payment_id: order.id,
              })
              .then((res) => {
                console.log(res);
                if (res.data.status == 200) {
                  this.$store.dispatch("changeLoader", false);
                  localStorage.removeItem("cart");
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    heightAuto: true,
                    title: `Payment Successfull !`,
                    text: `${res.data.message}`,
                    timer: 2500,
                  });
                  setTimeout(function () {
                    router.push("/");
                  }, 3000);
                  return "";
                }
                if (res.data.status == 403) {
                  this.$store.dispatch("changeLoader", false);

                  Swal.fire({
                    position: "center",
                    icon: "error",
                    heightAuto: true,
                    title: `Payment failed !`,
                    text: `${res.data.message}`,
                    timer: 2500,
                  });
                  return "";
                }

                this.$store.dispatch("changeLoader", true);
              });
          },
          onError: (err) => {
            this.$store.dispatch("changeLoader", false);

            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>

<style>
</style>