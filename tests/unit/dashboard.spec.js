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

  it("submits notes on submit button click", async () => {
    const wrapper = shallowMount(UserDashboard, { store, localVue });
    wrapper.vm.notesText = "hello world!";
    const submitNotesBtn = wrapper.find(".submit-notes-btn");
    await submitNotesBtn.trigger("click");
    expect(wrapper.vm.notesText).toContain("hello world!");
  });

  // TODO: Figure this one out
  // it("Clears notes on clear button click", async () => {
  //   const wrapper = shallowMount(UserDashboard, { store, localVue });
  //   wrapper.setData({
  //     notesText: "updated",
  //   });
  //   const clearNotesBtn = wrapper.find(".clear-notes-btn");
  //   await clearNotesBtn.trigger("click");
  //   expect(wrapper.vm.notesText).toEqual("");
  // });

  it("renders the PageHeader markup", () => {
    const wrapper = shallowMount(UserDashboard, { store, localVue });
    expect(wrapper.html()).toContain("Your Dashboard");
  });
});
