<template>
  <div class="registerPage">
    <div class="container">
      <div class="row">
        <div class="col-sm-4"></div>
        <div class="col-sm-4">
          <div class="text-center">
            <nuxt-link to="/">
              <img src="/img/logo-black.png" />
            </nuxt-link>
          </div>

          <form class="mt-4">
            <div class="a-box a-spacing-extra-large">
              <div class="a-box-inner">
                <h1 class="a-spacing-small">Create account</h1>
                <!-- Your Name -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label"
                    >Your name</label
                  >

                  <input
                    type="text"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    id="ap-customer-name"
                    v-model="name"
                  />
                </div>

                <!-- Email -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label"
                    >Email</label
                  >

                  <input
                    type="email"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    id="ap-customer-name"
                    v-model="email"
                  />
                </div>

                <!-- Password -->
                <div class="a-row a-spacing-base">
                  <label for="ap_customer_name" class="a-form-label"
                    >Password</label
                  >

                  <input
                    type="password"
                    class="a-input-text form-control auth-autofocus auth-required-field auth-contact-verification-request-info"
                    id="ap-customer-name"
                    v-model="password"
                  />
                </div>
                <div class="a-alert-container">
                  <div class="a-alert-content">
                    Password must be at least 8 characters
                  </div>
                </div>
                <!-- Button -->
                <div class="a-row a-spacing-extra-large mb-4">
                  <span class="a-button-primary">
                    <span class="a-button-inner">
                      <span class="a-button-text" @click="onSingup"
                        >Create your amazon account</span
                      >
                    </span>
                  </span>
                  <div class="a-row a-spacing-top-medium a-size-small">
                    <b>
                      By creating an account, you agree to Amazon's
                      <a href="#">Conditions of use</a> and
                      <a href="#">Privacy Notice</a>
                    </b>
                  </div>
                </div>
                <hr />
                <div class="a-row">
                  <b>
                    Already have an account?
                    <nuxt-link to="/login" class="a-link-emphasis"
                      >Sign in</nuxt-link
                    >
                  </b>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: "guest",
  layout: "none",

  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },

  methods: {
    async onSingup() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        };

        // let response = await this.$axios.$post("/api/auth/signup", data);
        let response = await this.$axios.$post(
          "https://api-amazon-clone.herokuapp.com/api/auth/signup",
          data
        );

        console.log(response);
        console.log("response step is finished!");

        if (response.sucess) {
          console.log(
            "axios post is working, and store email&pswd and call the loginWith"
          );
          this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password
            }
          });

          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
        console.log("Above is error for auth");
      }
    }
  }
};
</script>
