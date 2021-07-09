import firebase from "firebase/app";

export default {
  state: {
    user: null,
    error: null,
    isUserAuthenticated: false,
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setUserAuth(state, payload) {
      state.isUserAuthenticated = payload;
    },
  },
  actions: {
    initialAuthCheck({ commit }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          commit("setUser", user);
          commit("setUserAuth", true);
        } else {
          commit("setUser", null);
          commit("setUserAuth", false);
        }
      });
    },
    signUpAction({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit("setUser", response.user);
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
    signInAction({ commit }, payload) {
      return firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit("setUser", response.user);
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
    async signOutAction({ commit }) {
      try {
        await firebase.auth().signOut();
        commit("setUser", null);
        commit("setUserAuth", false);
      } catch (err) {
        commit("setError", err.message);
      }
    },
    googleSignInAction({ commit }) {
      let provider = new firebase.auth.GoogleAuthProvider();
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          commit("setUser", result.user);
        })
        .catch((error) => {
          commit("setError", error.message);
        });
    },
  },
  getters: {
    getUser: (state) => state.user,
    isUserAuth: (state) => state.isUserAuthenticated,
    getError: (state) => state.error,
  },
};
