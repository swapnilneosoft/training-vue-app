<template>
  <section id="" style="margin: 50px">
    <!--form-->
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-sm-offset-1">
          <div class="login-form">
            <!--login form-->
            <h2>Login to your account</h2>
            <form @submit.prevent="loginSubmit" action="#">
              <input type="email" v-model="login.email" placeholder="email" />
              <input
                type="text"
                v-model="login.password"
                placeholder="Email Address"
              />
              <span>
                <input type="checkbox" class="checkbox" />
                Keep me signed in
              </span>
              <button type="submit" class="btn btn-default">Login</button>
            </form>
          </div>
          <!--/login form-->
        </div>
        <div class="col-sm-1">
          <h2 class="or">OR</h2>
        </div>
        <div class="col-sm-4">
          <div class="signup-form">
            <!--sign up form-->
            <h2>New User Signup!</h2>
            <form @submit.prevent="registerSubmit" action="#">
              <input
                type="text"
                v-model="register.firstname"
                placeholder="First Name"
              />
              <input
                type="text"
                v-model="register.lastname"
                placeholder="Last Name"
              />
              <input
                type="email"
                v-model="register.email"
                placeholder="Email Address"
              />
              <input
                type="password"
                v-model="register.password"
                placeholder="Password"
              />
              <input
                type="password"
                v-model="register.confirm_password"
                placeholder="Confirm Password"
              />
              <button type="submit" class="btn btn-default">Signup</button>
            </form>
          </div>
          <!--/sign up form-->
        </div>
      </div>
    </div>
  </section>
  <!--/form-->
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "Login",
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        password: "",
        confirm_password: "",
        firstname: "",
        lastname: "",
      },
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    async loginSubmit() {
      await this.loginUser(this.login);
    },

    async registerSubmit() {
      await axios
        .post("/register", this.register)
        .then((response) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `User Registered successfully , Please log in !`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.resetForm();
        }).catch((err) => {
          alert("unable to register")
        });
    },
  },
};
</script>

<style>
</style>