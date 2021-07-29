<template>
  <CardWrapper headertext="Register">
    <v-form ref="form" v-model="isValid">
      <v-text-field
        label="email"
        v-model="email"
        :rules="emailRules"
        required
        @keyup="validateForm"
      ></v-text-field>
      <v-text-field
        label="password"
        v-model="password"
        :rules="passwordRules"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
        required
        @keyup="validateForm"
      ></v-text-field>
      <v-text-field
        label="re-enter password"
        v-model="reenterPassword"
        :rules="reenterPasswordRules"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showReenterPassword ? 'text' : 'password'"
        @click:append="showReenterPassword = !showReenterPassword"
        required
        @keyup="validateForm"
      ></v-text-field>
      <v-card-actions class="mt-2 justify-end">
        <v-btn @click="signup()" :disabled="!validated" color="accent"
          >Create Account</v-btn
        >
      </v-card-actions>
    </v-form>
  </CardWrapper>
</template>
<script>
import CardWrapper from "../components/CardWrapper";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Register",
  components: { CardWrapper },
  data() {
    return {
      isValid: false,
      validated: false,
      email: null,
      password: null,
      reenterPassword: null,
      showPassword: false,
      showReenterPassword: false,
      emailRules: [
        (value) => !!value || "E-mail is required",
        (value) =>
          (value && /.+@.+/.test(value)) ||
          "Please enter a valid email address",
      ],
      passwordRules: [
        (value) =>
          !!value || "Oops...looks like you forgot to enter a password",
        (value) =>
          (value && value.length > 7) ||
          "password must be at least 8 characters long",
        (value) =>
          (value && /(?=.*[a-z])/.test(value)) ||
          "Password must contain at least 1 lowercase character (a-z)",
        (value) =>
          (value && /(?=.*[A-Z])/.test(value)) ||
          "Password must contain at least 1 uppercase character (A-Z)",
        (value) =>
          (value && /(?=.*\d)/.test(value)) ||
          "Password must contain at least 1 digit",
        (value) =>
          (value && /(?=.*[-+_!@#$%^&*.,?])/.test(value)) ||
          "Password must contain at least 1 special character",
      ],
      reenterPasswordRules: [
        (value) => !!value || "Please verify your password",
        (value) =>
          (value && value === this.password) || "Password does not match",
      ],
      firebaseError: "",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  watch: {
    getUser: function () {
      console.log(this.getUser);
    },
  },
  methods: {
    ...mapActions(["signUpAction"]),
    signup() {
      this.signUpAction({ email: this.email, password: this.password });
    },
    isFormValid() {
      return this.isValid === true;
    },
    validateForm() {
      setTimeout(() => {
        const valid = this.$refs.form.validate();
        this.isValid = valid;
        this.validated = valid;
      }, 600);
    },
  },
};
</script>
