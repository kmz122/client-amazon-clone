<template>
  <div>
    <header class="nav-opt-sprite nav-locate-us nav-lang-en nav-ssl nav-unrec">
      <div class="continer-fluid desktop-nav">
        <div class="row">
          <div class="col-sm-2">
            <div class="logo-area">
              <nuxt-link to="/">
                <img src="/img/logo.png" alt="logo" class="img-fluid" />
              </nuxt-link>
            </div>
          </div>
          <!-- Search bar -->
          <div class="col-sm-6 pt-0">
            <Search />
          </div>

          <div class="col-sm-4"></div>
        </div>
        <div class="row">
          <!-- Delivery -->
          <!-- Have to check with v-if bcs without login there is no homepage -->
          <div class="col-xl-2 col-lg-2 col-md-2 col-sm-2 pl-2">
            <div class="nav-global-location">
              <nuxt-link
                to="/address"
                class="nav-a nav-a-2"
                v-if="isAuthenticated"
              >
                <div class="nav-sprite" id="nav-packard-glow-loc-icon"></div>
                <div
                  id="glow-ingress-block"
                  v-if="loggedInUser && loggedInUser.address"
                >
                  <span class="nav-line-1" id="glow-ingress-line1"
                    >Deliver to</span
                  >
                  <span
                    v-if="loggedInUser.address"
                    class="nav-line-2"
                    id="glow-ingress-line2"
                    >{{ loggedInUser.address.city }},
                    {{ loggedInUser.address.country }}</span
                  >
                </div>

                <div v-else id="glow-ingress-block">
                  <span class="nav-line-1" id="glow-ingress-line1"
                    >Deliver to</span
                  >
                  <span class="nav-line-2" id="glow-ingress-line2">
                    Add Your Address
                  </span>
                </div>
              </nuxt-link>

              <nuxt-link to="/signup" class="nav-a nav-a-2" v-else>
                <div class="nav-sprite" id="nav-packard-glow-loc-icon"></div>
                <div id="glow-ingress-block">
                  <span class="nav-line-1" id="glow-ingress-line1"
                    >Deliver to</span
                  >
                  <span class="nav-line-2" id="glow-ingress-line2">
                    Add Your Address
                  </span>
                </div>
              </nuxt-link>
            </div>
          </div>
          <!-- Shopping -->
          <div class="col-xl-6 col-lg-5 col-md-4 col-sm-6 p-0">
            <div class="nav-fill">
              <div class="nav-shop">
                <nuxt-link
                  class="nav-a nav-a-2 nav-single-row-link"
                  to="/history"
                >
                  <span class="nav-line-2">
                    Browsing history
                    <span
                      class="nav-icon nav-arrow"
                      style="visibility: visible"
                    ></span>
                  </span>
                </nuxt-link>
              </div>

              <div class="nav-xshop-container">
                <div class="nav-xshop">
                  <nuxt-link to="/todayDeals" class="nav-a"
                    >Today's deals</nuxt-link
                  >
                  <nuxt-link to="/yourAmazon" class="nav-a"
                    >Your amazon.com</nuxt-link
                  >
                  <nuxt-link to="/giftCard" class="nav-a">Gift cards</nuxt-link>
                  <nuxt-link to="/registry" class="nav-a">Registry</nuxt-link>
                  <nuxt-link to="/sell" class="nav-a">Sell</nuxt-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Accounts, orders and cart-->
          <div class="col-xl-4 col-lg-5 col-md-6 col-sm-4 p-0">
            <div class="nav-tools">
              <a
                href="#"
                id="icp-nav-flyout"
                class="nav-a nav-a-2 icp-link-style-2"
              >
                <span class="icp-nav-link-inner">
                  <span class="nav-line-1">
                    <span class="icp-nav-globe-img-2"></span>
                    <span class="icp-nav-language">EN</span>
                  </span>

                  <span class="nav-line-2">
                    &nbsp;
                    <span
                      class="nav-icon nav-arrow"
                      style="visibility: visible"
                    ></span>
                  </span>
                </span>
              </a>
              <span class="icp-nav-link-border"></span>

              <template v-if="isAuthenticated">
                <nuxt-link
                  to="/profile"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello,</span>
                  <span class="nav-line-2">{{ loggedInUser.name }}</span>
                </nuxt-link>
              </template>

              <template v-else>
                <nuxt-link
                  to="/signup"
                  class="nav-a nav-a-2"
                  id="nav-link-accountList"
                  tabindex="0"
                >
                  <span class="nav-line-1">Hello, Sign in</span>
                  <span class="nav-line-2">
                    Account &amp; Lists
                    <span
                      class="nav-icon nav-arrow"
                      style="visibility: visible"
                    ></span>
                  </span>
                </nuxt-link>
              </template>

              <nuxt-link class="nav-a nav-a-2 nav-single-row-link" to="/orders">
                <span class="nav-line-1"></span>
                <span class="nav-line-2">Orders</span>
              </nuxt-link>

              <nuxt-link class="nav-a nav-a-2" id="nav-cart" to="/cart">
                <span aria-hidden="true" class="nav-line-1"></span>
                <span aria-hidden="true" class="nav-line-2"></span>
                <span class="nav-cart-icon nav-sprite"></span>
                <span
                  id="nav-cart-count"
                  aria-hidden="true"
                  class="nav-cart-count nav-cart-0"
                  >{{ getCartLenght }}</span
                >
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "~/components/Search";

export default {
  components: {
    Search,
  },

  computed: {
    ...mapGetters(["getCartLenght", "isAuthenticated", "loggedInUser"]),
  },
};
</script>
