<template>
  <section>
    <div class="row address-row" v-for="(add,index) in address" :key="add.id">
      <div class="col-sm-1">{{index+1}}</div>
      <div class="col-sm-10">
          {{add.fullname}},
          {{add.address}},
          {{add.city}},
          {{add.state}},
          {{add.pincode}},
          {{add.mobile_no}}
          
      </div>
      <div class="col-sm-1">
        <a
          class="cart_quantity_delete"
          href="javascript:void(0)"
          @click="removeProduct(product.id)"
          ><i class="fa fa-times"></i
        ></a>
      </div>
    </div>
    
  </section>
</template>

<script>
export default {
  name: "Address",
  props:['address'],
};
</script>

<style>
.address-row {
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 5px;
}
</style>