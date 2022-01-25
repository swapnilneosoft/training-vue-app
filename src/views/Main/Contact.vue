<template>
  <div id="contact-page" class="container">
    <div class="bg">
      <div class="row">
        <div class="col-sm-12">
          <h2 class="title text-center">Contact <strong>Us</strong></h2>
          <!-- <div id="gmap" class="contact-map"></div> -->
        </div>
      </div>
      <div class="row">
        <div class="col-sm-8">
          <div class="contact-form">
            <h2 class="title text-center">Get In Touch</h2>
            <div class="status alert alert-success" style="display: none"></div>
            <form
              id="main-contact-form"
              class="contact-form row"
              name="contact-form"
              method="post"
              @submit.prevent="submitContact"
            >
              <div class="form-group col-md-6">
                <input
                  type="text"
                  name="name"
                  class="form-control"
                  required="required"
                  placeholder="Name"
                  v-model="contact.name"
                />
              </div>
              <div class="form-group col-md-6">
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  required="required"
                  placeholder="Email"
                  v-model="contact.email"
                />
              </div>
              <div class="form-group col-md-12">
                <input
                  type="text"
                  name="subject"
                  class="form-control"
                  required="required"
                  placeholder="Subject"
                  v-model="contact.subject"
                />
              </div>
              <div class="form-group col-md-12">
                <textarea
                  name="message"
                  id="message"
                  required="required"
                  class="form-control"
                  rows="8"
                  placeholder="Your Message Here"
                  v-model="contact.query"
                ></textarea>
              </div>
              <div class="form-group col-md-12">
                <input
                  type="submit"
                  name="submit"
                  class="btn btn-primary pull-right"
                  value="Submit"
                />
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="contact-info">
            <h2 class="title text-center">Contact Info</h2>
            <address>
              <p>E-Shopper Inc.</p>
              <p>935 W. Webster Ave New Streets Chicago, IL 60614, NY</p>
              <p>Newyork USA</p>
              <p>Mobile: +2346 17 38 93</p>
              <p>Fax: 1-714-252-0026</p>
              <p>Email: info@e-shopper.com</p>
            </address>
            <div class="social-networks">
              <h2 class="title text-center">Social Networking</h2>
              <ul>
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-youtube"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--/#contact-page-->
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios'
export default {
  name: "Contact",
  components: {},
  data() {
    return {
      contact: {
        name: "",
        email: "",
        subject: "",
        query: "",
      },
    };
  },
  methods: {
    async submitContact() {
      await axios
        .post("/feedback", this.contact)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: `We will reach soon !`,
            showConfirmButton: true,
          });
          this.contact.name = "";
          this.contact.email = "";
          this.contact.subject = "";
          this.contact.query = "";
        })
        .catch((err) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `Unable to add feedback try again !`,
            showConfirmButton: false,
            timer: 2500,
          });
        });
    },
  },
};
</script>

<style>
</style>