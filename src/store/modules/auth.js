import firebase from "firebase/app";

export default {
  state: {
    user: null,
    error: null,
  },
  mutations: {
    LOGIN: (state, user) => (state.user = user),
    LOGOUT: (state) => (state.user = null),
    SETUSER(state, payload) {
      state.user = payload;
    },
    SETERROR(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    signUpAction({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit("SETUSER", response.user);
        })
        .catch((error) => {
          commit("SETERROR", error.message);
        });
    },
    signInAction({ commit }, payload) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit("SETUSER", response.user);
        })
        .catch((error) => {
          commit("SETERROR", error.message);
        });
    },
    async signOutAction({ commit }) {
      try {
        await firebase.auth().signOut();
        commit("SETUSER", null);
      } catch (err) {
        commit("SETERROR", err.message);
      }
    },
    googleSignInAction({ commit }) {
      let provider = new firebase.auth.GoogleAuthProvider();
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          commit("SETUSER", result.user);
        })
        .catch((error) => {
          commit("SETERROR", error.message);
        });
    },
  },
  getters: {
    getUser: (state) => state.user,
    isAuthenticated: (state) =>
      typeof state.user === "object" && state.user !== null,
    getError: (state) => state.error,
  },
};
