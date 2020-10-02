<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="test-align: center">Profile Page</h2>

            <a href="#" @click="onLogout">Logout</a>
            <form action>
              <!-- Name -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Name</label>
                <input
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="name"
                  :placeholder="loggedInUser.name"
                />
              </div>

              <!-- Email -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Email</label>
                <input
                  type="email"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="email"
                  :placeholder="loggedInUser.email"
                />
              </div>

              <!-- Password -->
              <div class="a-spacing-top-medium">
                <label style="margin-bottom: 0px">Password</label>
                <input
                  type="password"
                  class="a-input-text"
                  style="width: 100%"
                  v-model="password"
                  v-on:keyup.enter="onUpdateProfile"
                />
              </div>

              <!-- Button -->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button-inner">
                    <span class="a-button-text" @click="onUpdateProfile"
                      >Update Profile</span
                    >
                  </span>
                </span>
              </div>

              <br />
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  computed: {
    ...mapGetters(["isAuthenticated", "loggedInUser"]),
  },

  methods: {
    async onUpdateProfile() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password,
        };

        // let response = await this.$axios.$put("api/auth/user ", data);
        let response = await this.$axios.$put("/api/auth/user ", data);

        if (response.success) {
          this.name = "";
          this.email = "";
          this.password = "";

          await this.$auth.fetchUser(); // refetch the api back
          this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    },

    onLogout() {
      this.$auth.logout();
      this.$router.push("/");
    },
  },
};
</script>
