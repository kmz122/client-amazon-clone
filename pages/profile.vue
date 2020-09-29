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
                  :placeholder="$auth.$state.user.name"
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
                  :placeholder="$auth.$state.user.email"
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
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },

  methods: {
    async onUpdateProfile() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      try {
        // let response = await this.$axios.$put("api/auth/user ", data);
        let response = await this.$axios.$put(
          "https://api-amazon-clone.herokuapp.com/api/auth/user ",
          data
        );

        if (response.sucuess) {
          this.name = "";
          this.email = "";
          this.password = "";

          await this.$auth.fetchUser(); // refetch the api back
        }
      } catch (error) {
        console.log(error);
      }
    },

    async onLogout() {
      await this.$auth.logout();
      this.$router.push("/");
    }
  }
};
</script>
