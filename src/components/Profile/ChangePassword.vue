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
            <div class="bill-to" style="padding: 10px; margin-top: 0px">
              <p>Change Password</p>
              <div class="form-one">
                <form>
                  <input
                    type="text"
                    v-model="form.old_password"
                    placeholder="Old password *"
                  />
                </form>
              </div>
              <div class="form-two">
                <form>
                  <input
                    type="text"
                    placeholder="New password *"
                    v-model="form.new_password"
                  />
                  <input
                    type="text"
                    placeholder="Confirm new password *"
                    v-model="form.confirm_new_password"
                  />
                  <button
                    type="button"
                    @click="changePassword"
                    class="form-control btn btn-primary"
                  >
                    Change Password
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
</template>


<script>
import axios from "axios";
import Swal from "sweetalert2";
import Sidebar from '../Sidebar/Profile.vue';

export default {
  name: "ChangePassword",
  components:{
      Sidebar
  },
  data() {
    return {
      form: {
        old_password: "",
        new_password: "",
        confirm_new_password: "",
      },
    };
  },
  methods: {
    async changePassword() {
      await axios
        .post("/profile/change-password", this.form)
        .then((res) => {
            console.log(res)
          if (res.data.status == 200) {
            Swal.fire({
              icon: "success",
              title: `Message:${res.data.message}`,
              showConfirmButton: true,
            });
            this.resetForm;
          }
          if(res.data.status == 403)
          {
            Swal.fire({
              icon: "error",
              title: `Message:${res.data.message}`,
              showConfirmButton: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  resetForm(){
      this.form.old_password='',
      this.form.new_password='',
      this.form.confirm_new_password=''
  }
};
</script>

<style>
</style>