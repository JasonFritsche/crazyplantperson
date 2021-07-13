<template>
  <v-container>
    <v-row>
      <v-col class="d-flex justify-center">
        <PageHeader
          >{{
            selectedPlantInfo === null
              ? "loading..."
              : selectedPlantInfo.plantName
          }}
          Details</PageHeader
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="7">
        <vc-date-picker
          v-model="selectedDate"
          is-expanded
          @dayclick="onDayClick"
          :is-dark="$vuetify.theme.dark"
          :attributes="attrs"
        />
      </v-col>
      <v-col cols="12" md="5">
        <template>
          <v-form ref="form" v-if="detailsForm">
            <v-container>
              <v-row>
                <v-col cols="4" md="4">
                  <v-checkbox
                    v-model="detailsForm.didPrune"
                    :label="`Did You Prune Today?`"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4" md="4">
                  <v-checkbox
                    v-model="detailsForm.didFeed"
                    :label="`Did You Feed Today?`"
                  ></v-checkbox>
                </v-col>
                <v-col cols="4" md="4">
                  <v-checkbox
                    v-model="detailsForm.didWater"
                    :label="`Did You Water Today?`"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    name="miscnotes"
                    v-model="detailsForm.miscNotes"
                    filled
                    no-resize
                    rows="3"
                    label="Misc. Notes"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <v-btn class="mt-2" @click="submitPlantDetails()" color="accent">{{
              submitButtonText
            }}</v-btn>
          </v-form>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getDateTextFormat, dateStringToDate } from "@/utils/DateUtil.js";
import PageHeader from "@/components/PageHeader.vue";
export default {
  name: "PlantDetailsDatePicker",
  components: {
    PageHeader,
  },
  data() {
    return {
      selectedDate: new Date(),
      detailsForm: {
        didFeed: false,
        didPrune: false,
        didWater: false,
        miscNotes: "",
      },
      formReady: false,
      submitButtonText: "Update",
      attrs: [],
    };
  },
  computed: {
    ...mapGetters(["plantDetails", "allPlantDetails", "selectedPlantInfo"]),
  },
  mounted() {
    this.$store.dispatch("getAllPlantDetails", {
      id: this.$route.params.id,
    });
    this.$store.dispatch("getPlantDetailsByDate", {
      id: this.$route.params.id,
      dateText: getDateTextFormat(this.selectedDate),
    });
    this.detailsForm;
    this.formReady = true;
  },
  watch: {
    plantDetails: function () {
      if (this.plantDetails) {
        this.detailsForm = this.plantDetails;
      }
      this.formReady = true;
    },
    allPlantDetails: function () {
      if (this.allPlantDetails.length) {
        const filteredDetails = this.allPlantDetails.filter(
          (details) => details !== null
        );
        const dates = filteredDetails.map((detail) =>
          dateStringToDate(detail.dateText)
        );
        this.attrs = [
          {
            highlight: {
              color: "purple",
              fillMode: "light",
            },
            dates: dates,
          },
        ];
      }
    },
  },
  methods: {
    ...mapActions(["addPlantDetailsEntry"]),
    onDayClick: function () {
      this.detailsForm = {
        didFeed: false,
        didPrune: false,
        didWater: false,
        miscNotes: "",
      };
      this.$store.dispatch("getPlantDetailsByDate", {
        id: this.$route.params.id,
        dateText:
          this.selectedDate !== null
            ? getDateTextFormat(this.selectedDate)
            : null,
      });
    },
    submitPlantDetails: function () {
      this.addPlantDetailsEntry({
        ...this.detailsForm,
        dateText: getDateTextFormat(this.selectedDate),
        id: this.$route.params.id,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
