<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-center align-center pb-5 mt-6">
          <h1
            class="text headline fontOne--text"
            :style="{ 'font-size': headingFontSize }"
          >
            CrazyPlantPerson
          </h1>
        </v-col>
      </v-row>
      <div class="pt-11"></div>
      <v-row>
        <v-col class="d-flex justify-center align-center">
          <div>
            <p
              class="text mt-2"
              :style="{
                'font-size': $vuetify.breakpoint.xs ? '1.3rem' : '1.85rem',
              }"
            >
              Take the guesswork out of taking care of your plants. <br />Your
              plants will thank you.
            </p>
          </div>
        </v-col>
        <v-col
          ><v-img
            src="@/assets/plant-water-lady.png"
            max-height="600"
            max-width="490"
          ></v-img
        ></v-col>
      </v-row>
      <div class="pt-16"></div>
      <v-row>
        <v-col order="1">
          <h2 class="text-h3 d-flex justify-center align-center fontOne--text">
            Features
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div>
            <v-img
              src="@/assets/plant-lady-2.png"
              max-height="600"
              max-width="460"
            ></v-img>
          </div>
        </v-col>
        <v-col order="2" class="d-flex justify-center align-center">
          <div>
            <h2 class="text-h4 d-flex justify-start fontOne--text">Calendar</h2>
            <p class="body-1 mt-2">
              Easily track your all of your plants with our calendar based
              journal. Each of your plants will have their own calendar where
              you can keep a full history of your plant.
            </p>
          </div>
        </v-col>
      </v-row>
      <div class="pt-16"></div>
      <v-row>
        <v-col
          order="2"
          order-sm="1"
          class="d-flex justify-center align-center"
        >
          <div>
            <h2 class="text-h4 d-flex justify-start fontOne--text">
              Dashboard
            </h2>
            <p class="body-1 mt-2">
              We give you the tools and insights that you need.
            </p>
            <ul>
              <li>
                Create and update a watchlist of plants to keep a close eye on.
              </li>
              <li>Add helpful notes for yourself.</li>
            </ul>
          </div>
        </v-col>
        <v-col order="1" order-sm="2">
          <div>
            <v-img
              src="@/assets/plant-lady-1.png"
              max-height="600"
              max-width="460"
            ></v-img>
          </div>
        </v-col>
      </v-row>
      <div class="mt-16"></div>
      <v-row>
        <v-col order-sm="2" order-md="1" xs="12" lg="6">
          <div>
            <v-img
              src="@/assets/sleeping-cactus.png"
              max-height="480"
              max-width="260"
            ></v-img>
          </div>
        </v-col>
        <v-col
          xs="12"
          lg="6"
          order-sm="1"
          order-md="2"
          class="d-flex justify-center align-center pt-6"
        >
          <div>
            <p class="mt-2">
              <strong class="text-h3 red--text text--lighten-1">"</strong>
              <span class="quote-text">
                The lesson I have thoroughly learnt, and wish to pass on to
                others, is to know the enduring happiness that the love of a
                garden gives. </span
              ><span class="text-h3 red--text text--lighten-1">"</span>
            </p>
            <h6 class="text-h6 d-flex justify-start fontOne--text">
              Gertrude Jekyll
            </h6>
          </div>
        </v-col>
      </v-row>
      <div class="pb-16"></div>
    </v-container>
    <div class="pt-16"></div>
    <v-footer color="primary darken-1">
      <v-row justify="center">
        <v-col class="d-flex justify-center align-center mt-1">
          <p>CrazyPlantPerson</p>
        </v-col>
        <v-col class="primary darken-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} <strong>JasonFritsche</strong>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {};
  },
  computed: {
    headingFontSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "2.2em !important";
        case "sm":
          return "2.9em !important";
        case "md":
          return "4.5em !important";
        default:
          return "5.5em !important";
      }
    },
  },
  methods: {
    register() {
      this.$router.push({
        name: "register",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Karla:ital,wght@1,500&display=swap");
.headline {
  text-shadow: -2px 5px 6px darken(#d4d4d4, 15);
  transition: 0.3s;
}
.headline:hover {
  cursor: default;
  text-shadow: -2px 7px 7px darken(#d4d4d4, 35);
}
.spacer {
  margin-top: 10rem;
}
.quote-text {
  font-family: "Karla", sans-serif;
  font-size: 1.5rem;
}
ul {
  li {
    list-style: none;
    margin-bottom: 10px;
  }
}
</style>
