<template>
  <div>
    <b-container>
      <b-row class="mb-3">
        <b-col xl="3" lg="4" md="4" sm="12">
          <b-form-group>
            <b-form-input
              v-model="filters.general"
              placeholder="Search by name..."
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col
          xl="2"
          lg="4"
          md="4"
          sm="6"
          class="mt-xl-0 mt-lg-0 mt-lg-0 mt-md-0 mt-sm-3 mt-3"
        >
          <b-form-group class="select-country-group">
            <b-form-select v-model="filters.country" :options="data.countries">
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col
          xl="2"
          lg="4"
          md="4"
          sm="6"
          class="mt-xl-0 mt-lg-0 mt-lg-0 mt-md-0 mt-sm-3 mt-3"
        >
          <b-form-group class="select-continent-group">
            <b-form-select
              v-model="filters.continent"
              :options="data.continents"
            >
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col
          xl="5"
          lg="12"
          md="12"
          sm="12"
          cols="12"
          class="
            justify-content-end
            mt-xl-0 mt-lg-0 mt-lg-4 mt-md-4 mt-sm-4 mt-4
          "
        >
          <b-pagination
            v-model="params.page"
            :total-rows="data.meta.total"
            :per-page="data.meta.per_page"
            @input="search"
            first-number
            last-number
          ></b-pagination>
        </b-col>
      </b-row>

      <b-table
        responsive
        borderless
        hover
        small
        :has-provider="true"
        striped
        :fields="table.fields"
        :items="filteredPorts"
        id="ports-table"
        :busy.sync="isBusy"
      >
      </b-table>
    </b-container>
  </div>
</template>

<script>
// Services
import PortsService from "@/services/Ports.service";

export default {
  data() {
    return {
      table: {
        fields: [
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "country", label: "Country" },
          { key: "continent", label: "Continent" },
          { key: "coordinates", label: "Coordinates" },
        ],
        isBusy: false,
      },

      filters: {
        general: "",
        country: "",
        continent: "",
      },

      params: {
        page: 1,
      },

      data: {
        ports: [],
        countries: [],
        continents: [],
        links: {},
        meta: {},
      },
    };
  },
  computed: {
    filteredPorts() {
      return this.filters.general != "" ||
        this.filters.country != "" ||
        this.filters.continent != ""
        ? this.data.ports.filter(
            (item) =>
              (this.filters.general != ""
                ? item.name
                    .toLowerCase()
                    .match(this.filters.general.toLowerCase())
                : item.name) &&
              (this.filters.country != ""
                ? item.country
                    .toLowerCase()
                    .match(this.filters.country.toLowerCase())
                : item.country) &&
              (this.filters.continent != ""
                ? item.continent
                    .toLowerCase()
                    .match(this.filters.continent.toLowerCase())
                : item.continent)
          )
        : this.data.ports;
    },
  },
  methods: {
    async search() {
      this.table.isBusy = true;
      const response = await PortsService.getPorts({
        page: this.params.page,
      });

      this.filters.general = "";
      this.filters.country = "";
      this.filters.continent = "";

      this.data.countries = [];
      this.data.continents = [];

      if (response.status == 200) {
        this.data.ports = response.data.data;
        this.data.links = response.data.links;
        this.data.meta = response.data.meta;

        let arrCountries = new Set();
        let arrContinents = new Set();

        this.data.ports.map((item) => arrCountries.add(item.country));
        this.data.ports.map((item) => arrContinents.add(item.continent));

        this.data.countries = Array.from(arrCountries);
        this.data.continents = Array.from(arrContinents);

        this.data.countries.unshift({ text: "Select country", value: "" });
        this.data.continents.unshift({ text: "Select continent", value: "" });
      }

      this.table.isBusy = false;
    },
  },
  async created() {
    await this.search();
  },
};
</script>

<style lang="scss" >
.justify-content-end {
  display: flex;
  justify-content: end;
}

.select-country-group,
.select-continent-group {
  width: 100% !important;

  select {
    width: 100%;
    height: 38px;
    border-radius: 4px;
    border: 1px rgb(206, 206, 206) solid;
    outline: none;
    padding-left: 7px;
    color: grey;

    option:nth-child(1) {
      color: grey;
    }

    option:hover {
      background: orange !important;
      color: red;
    }
  }
}

.pagination {
  li {
    button {
      background: white;
      color: rgb(96, 96, 96);

      &:hover {
        background: #e6e8ff;
        color: rgb(96, 96, 96);
      }
    }

    background: white;
  }

  .page-item.active .page-link {
    border-color: white !important;
  }

  .page-item.active {
    button {
      background: #243664 !important;
    }
  }
}

#ports-table {
  thead {
    tr {
      color: #041c4c;
    }
  }

  tbody {
    border-top: none !important;
    tr {
      background: white;
      color: black;

      &:hover {
        background-color: rgba(184, 204, 255, 0.2) !important;
      }

      &:nth-of-type(odd) > * {
        color: black;
        background-color: rgba(184, 204, 255, 0.2) !important;

        &:hover {
          color: rgb(45, 45, 45);
        }
      }
    }
  }
}
</style>