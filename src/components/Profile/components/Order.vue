<template>
    <div class="row"  style="margin-top:5px;padding:10px;background-color:#f0f0f0">
      <div class="col-sm-1">{{sr+1}}</div>
      <div class="col-sm-3">{{order.order_id}}</div>
      <div class="col-sm-3">{{order.amount}}</div>
      <div class="col-sm-2">{{order.order_status}}</div>
      <div class="col-sm-3">
          <!-- <button class="btn btn-success">Preview</button> -->
          <router-link :to="`/order/payment?order=${order.order_id}`" v-if="order.payment_status == 0" class="btn btn-info" style="margin-left:5px">Pay now</router-link>
          <button v-else disabled class="btn btn-success">Paid</button>
      </div>
    </div>
</template>

<script>
export default {
  name: "Order",
  props:['order','sr']
};
</script>

<style>
</style>