import firebase from "firebase/app";

export default {
  state: {
    plantLogEntries: [],
    plantDetails: [],
    allPlantDetails: [],
    dashboardNotes: null,
    watchlist: [],
  },

  mutations: {
    addPlantToLog(state, data) {
      state.plantLogEntries = [...state.plantLogEntries, data];
    },
    updatePlantLogEntry(state, data) {
      const plantToUpdate = state.plantLogEntries.find(
        (item) => item.id === data.id
      );
      Object.assign(plantToUpdate, data);
    },
    deletePlantLogEntry(state, data) {
      const filteredPlants = state.plantLogEntries.filter(
        (plant) => plant.id !== data.id
      );
      state.plantLogEntries = filteredPlants;
    },
    addDetailsForDay(state, data) {
      state.plantDetails = data;
    },
    addAllPlantDetails(state, data) {
      state.allPlantDetails.push(data);
    },
    getAllDashboardNotes(state, data) {
      state.dashboardNotes = data;
    },
    getAllWatchlist(state, data) {
      state.watchlist = data === null ? null : data;
    },
    addPlantToWatchlist(state, data) {
      state.watchlist.push(data);
    },
    watchListLoaded(state, data) {
      state.watchListLoaded = data;
    },
    removePlantFromWatchlist(state, data) {
      const filteredPlants = state.watchlist.filter(
        (plant) => plant.id !== data.id
      );
      state.watchlist = filteredPlants;
    },
  },

  actions: {
    async addPlantToLog({ commit }, payload) {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants")
        .doc(payload.id)
        .set({
          ...payload,
          createdAt: new Date(),
        });
      commit("addPlantToLog", payload);
    },

    async getAllPlants({ commit }) {
      const firebasePlantsRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants");
      firebasePlantsRef
        .get()
        .then((querySnapShot) => {
          querySnapShot.forEach((doc) => {
            const plant = doc.data();
            plant.id = doc.id;
            plant.dateAcquired = plant.dateAcquired.toDate();
            commit("addPlantToLog", plant);
          });
        })
        .catch((error) => {
          console.warn("Error getting document:", error);
        });
    },

    async updatePlantEntry({ commit }, payload) {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants")
        .doc(payload.id)
        .update({
          dateAcquired: payload.dateAcquired,
          plantName: payload.plantName,
          plantType: payload.plantType,
        });
      commit("updatePlantLogEntry", payload);
    },

    async deletePlantEntry({ commit }, payload) {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants")
        .doc(payload.id)
        .delete();

      commit("deletePlantLogEntry", payload);
    },

    async getPlantDetailsByDate({ commit }, payload) {
      if (payload === null) {
        commit("addDetailsForDay", null);
      } else {
        const plantDetails = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("plants")
          .doc(payload.id)
          .collection("plant-details")
          .where("dateText", "==", payload.dateText);

        plantDetails.get().then((querySnapShot) => {
          if (querySnapShot.empty) {
            commit("addDetailsForDay", null);
          } else {
            querySnapShot.forEach((doc) => {
              const details = doc.data();
              details.id = doc.id;
              commit("addDetailsForDay", details);
            });
          }
        });
      }
    },

    async getAllPlantDetails({ commit }, payload) {
      if (payload === null) {
        commit("addAllPlantDetails", null);
      } else {
        const allPlantDetails = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("plants")
          .doc(payload.id)
          .collection("plant-details");

        allPlantDetails.get().then((querySnapShot) => {
          if (querySnapShot.empty) {
            commit("addAllPlantDetails", null);
          } else {
            querySnapShot.forEach((doc) => {
              const details = doc.data();
              details.id = doc.id;
              commit("addAllPlantDetails", details);
            });
          }
        });
      }
    },

    async addPlantDetailsEntry({ commit }, payload) {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants")
        .doc(payload.id) // plants id
        .collection("plant-details")
        .add({
          ...payload,
          createdAt: new Date(),
        });
      commit("addDetailsForDay", payload);
      commit("addAllPlantDetails", payload);
    },

    async updateDashboardNotes({ commit }, payload) {
      var docRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("dashboardNotes")
        .doc(payload.id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            doc.update({
              notes: payload.notes,
            });
            commit("updateDashboardNotes", payload);
          } else {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .collection("dashboardNotes")
              .add({
                notes: payload.notes,
                id: payload.id,
              });
            commit("updateDashboardNotes", payload);
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },

    async getDashboardNotes({ commit }) {
      const dashboardRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("dashboardNotes");
      dashboardRef
        .get()
        .then((querySnapShot) => {
          if (querySnapShot.empty) {
            commit("getAllDashboardNotes", null);
          } else {
            querySnapShot.forEach((doc) => {
              const notes = doc.data();
              notes.id = doc.id;
              commit("getAllDashboardNotes", notes);
            });
          }
        })
        .catch((error) => {
          console.warn("Error getting document:", error);
        });
    },

    async getWatchlistPlants({ commit }) {
      const watchlistRef = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants");
      const query = watchlistRef.where("watch", "==", true);
      query
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            commit("getAllWatchlist", null);
          } else {
            const watchlist = [];
            querySnapshot.forEach((doc) => {
              const watchListPlant = doc.data();
              watchListPlant.id = doc.id;
              watchlist.push(watchListPlant);
            });
            commit("getAllWatchlist", watchlist);
          }
        })
        .catch((error) => {
          console.warn("Error getting documents: ", error);
        });
    },

    async togglePlantToWatchlist({ commit }, payload) {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants")
        .doc(payload.id)
        .update({
          watch: payload.watch,
        });
      if (payload.watch) {
        commit("addPlantToWatchlist", payload);
      } else {
        commit("removePlantFromWatchlist", payload);
      }
    },
  },
  getters: {
    plantLogEntries: (state) => state.plantLogEntries,
    plantDetails: (state) => state.plantDetails,
    allPlantDetails: (state) => state.allPlantDetails,
    dashboardNotes: (state) => state.dashboardNotes,
    watchlist: (state) => state.watchlist,
  },
};
