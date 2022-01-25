<template>
  <div id="contact-page" class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">Profile</h2>
        </div>
      </div>
      <div class="row">
          <!-- Side bar  -->
            <Sidebar />
        <!-- Sidebar ends her -->
        <div class="col-sm-9">
          <div class="contact-info">
            <address>
              <h5>{{fetchAuth.user.email}}</h5>
            <p>
                {{fetchAuth.user.firstname + ' ' + fetchAuth.user.lastname}}
            </p>
            </address>  
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/#contact-page-->
</template>

<script>
import Swal from "sweetalert2";
import Sidebar from '../../components/Sidebar/Profile.vue';
import { mapGetters } from 'vuex';
export default {
  name: "Contact",
  computed:{
    ...mapGetters(['fetchAuth']),
  },
  components: {
      Sidebar
  },
  data() {
    return {
      
    };
  },
  methods: {
  },
};
</script>

<style>
</style>