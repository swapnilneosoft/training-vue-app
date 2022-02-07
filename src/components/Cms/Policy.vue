<template>
  <div class="container">
      <h2>Policy</h2>
    <div class="row">
      <div class="col-sm-10">
        <h5>
          {{ privacy }}
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Policy",
  data() {
    return {
      privacy: "",
    };
  },
  mounted() {
    axios.get("/privacy-policy").then((res) => {
      console.log(res.data.policy);
      this.privacy = res.data.policy;
    });
  },
};
</script>

<style>
</style>