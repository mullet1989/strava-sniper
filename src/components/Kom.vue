<template>
  <div style="margin-bottom: 50px;">
    <h1>{{ msg }}</h1>
    <div style="text-align: left; margin: 0 10%;">
      <table>
        <tr>
          <th>
          </th>
          <th>
            Name
          </th>
          <th>
            Type
          </th>
          <th>
            Date
          </th>
        </tr>
        <tr v-for="(kom, index) in koms" :class="index%2 == 0 ? 'redB' : ''">
            <td>
              <input :id="kom.name" type="checkbox" :name="kom.name" :value="kom.segment.id" v-model="checkedKoms"/>
            </td>
            <td>
              <label :for="kom.name">{{ kom.name }}</label>
            </td>
            <td>
              <label :for="kom.name">
                <span v-if="kom.segment.activity_type === 'Run'" class="app-icon icon-run icon-dark icon-lg"></span>
                <span v-else class="app-icon icon-ride icon-dark icon-lg"></span>
              </label>
            </td>
            <td>
              <label :for="kom.name">{{ new Date(kom.start_date_local).toLocaleDateString() }}</label>
            </td>
          </tr>
      </table>
    </div>
    <router-link class="btn btn-primary btn-sm" to="/confirm">Next</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Kom',
    mounted: function () {
      var storeKoms = this.$store.getters.getAllKoms;
      this.checkedKoms = this.$store.getters.getKoms;
      if (storeKoms.length) {
        this.koms = storeKoms;
        return;
      }
      this.getKoms();
    },
    methods: {
      getKoms: function () {
        var that = this;
        this.$http.get("http://localhost:4000/koms").then(response => {
          that.koms = response.body;
          this.$store.commit("saveAllKoms", response.body);
        })
      }
    },
    data () {
      return {
        msg: 'Choose your KOMs to track',
        koms: [],
        checkedKoms: [],
      }
    },
    watch: {
      checkedKoms: function (val) {
        this.$store.commit("saveKoms", val)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  table {
    width: 100%;
  }
</style>
