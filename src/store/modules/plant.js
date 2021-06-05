import firebase from "firebase/app";

export default {
  state: {
    plantLogEntries: [],
    plantDetails: [],
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
  },
  actions: {
    async addPlantToLog({ commit }, payload) {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants")
        .add({
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
        console.log(payload);
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

    async addPlantDetailsEntry({ commit }, payload) {
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection("plants")
        .doc(payload.plantDetailsId) // plants id
        .collection("plant-details")
        .add({
          ...payload.form,
          createdAt: new Date(),
        });
      commit("addDetailsForDay", payload);
    },
  },
  getters: {
    plantLogEntries: (state) => state.plantLogEntries,
    plantDetails: (state) => state.plantDetails,
  },
};