<template>
  <CardWrapper headertext="Sign In">
    <v-form ref="form" v-model="isValid" @keyup.enter.native="validate()">
      <v-text-field
        label="email"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        label="password"
        v-model="password"
        :error-messages="getError"
        :rules="passwordRules"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
      ></v-text-field>
      <v-hover>
        <v-btn
          block
          elevation="4"
          class="mt-2"
          @click="validate()"
          color="secondaryTwo"
          ><v-icon color="fontOne">mdi-email</v-icon> Sign In</v-btn
        >
      </v-hover>
      <v-hover>
        <v-btn
          block
          outlined
          elevation="4"
          class="mt-2"
          @click="googleSignin"
          color="fontTwo"
          ><v-img
            max-height="24"
            max-width="24"
            src="@/assets/search.png"
          ></v-img
          >&nbsp; Sign In With Google</v-btn
        >
      </v-hover>
    </v-form>
    <hr class="mt-5" />
    <v-card-actions class="mt-2 justify-end">
      <p class="body-2 pt-1 mr-6">Need an account?</p>
      <v-btn class="ml-1" @click="redirectToRegister()" color="secondaryTwo">
        Register
      </v-btn>
    </v-card-actions>
  </CardWrapper>
</template>
<script>
import CardWrapper from "../components/CardWrapper";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Login",
  components: { CardWrapper },
  data() {
    return {
      isValid: false,
      email: null,
      password: null,
      showPassword: false,
      emailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+/.test(value) || "Please enter a valid email address",
      ],
      passwordRules: [
        (value) =>
          !!value || "Oops...looks like you forgot to enter a password",
      ],
      firebaseError: "",
    };
  },
  computed: {
    ...mapGetters(["getUser", "getError"]),
  },
  methods: {
    ...mapActions(["signInAction", "googleSignInAction"]),
    async validate() {
      const isFormValid = this.$refs.form.validate();
      if (isFormValid) {
        await this.signInAction({ email: this.email, password: this.password });
        if (!this.getError) {
          this.$store.commit("setUserAuth", true);
          this.$router.push({ path: "/home/dashboard" });
        }
      }
    },
    redirectToRegister() {
      this.$router.push({ path: "/register" });
    },
    async googleSignin() {
      await this.googleSignInAction();
      if (!this.getError) {
        this.$store.commit("setUserAuth", true);
        this.$router.push({ path: "/home/dashboard" });
      }
    },
  },
};
</script>
