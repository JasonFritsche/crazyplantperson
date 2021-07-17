import { shallowMount, createLocalVue } from "@vue/test-utils";
import UserDashboard from "../../src/views/user/UserDashboard.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Actions.vue", () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      updateDashboardNotes: jest.fn(),
      getDashboardNotes: jest.fn(),
      getWatchlistPlants: jest.fn(),
    };
    getters = {
      dashboardNotes: () => ({ notes: "hello worlllld", id: 123 }),
      watchlist: () => [],
    };
    store = new Vuex.Store({
      actions,
      getters,
    });
  });

  it('dispatches "updateDashboardNotes"', () => {
    const wrapper = shallowMount(UserDashboard, { store, localVue });
    wrapper.vm.submitNotes();
    expect(actions.updateDashboardNotes).toHaveBeenCalled();
  });
});
