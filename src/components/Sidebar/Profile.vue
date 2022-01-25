<template>
  <div class="col-sm-3" id="profileSidebar">
    <div class="row">
      <ul >
        <li>
          <router-link to="/profile" class="active">Profile</router-link>
        </li>
        <li>
          <router-link to="/profile/change-password"> Change Password </router-link>
        </li>
        <li>
          <router-link to="/profile/my-orders"> My Orders </router-link>
        </li>
        <li>
          <router-link to="/profile/manage-address"> Manage Addresses </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:"Profile",    
};
</script>

<style scoped>
#profileSidebar{
  background-color: #FE980F;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
}
#profileSidebar ul li{
  padding: 5px;
  border-radius: 5px;
  margin-right: 30px;
  margin-top: 2px;
}
#profileSidebar ul li :hover{
  padding: 5px;
  color: #FE980F;
  background-color: #fff;
  width: 100%;
}
.active{
  padding: 5px;
  background-color: #FE980F;
}
#profileSidebar ul li a{
  color: #fff;
}


</style>