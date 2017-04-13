<template>
  <div>
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
        <tr v-for="kom in koms">
          <td>
            <input :id="kom.name" type="checkbox" :name="kom.name" :value="kom.segment.id" v-model="checkedKoms"/>
          </td>
          <td>
            <label :for="kom.name">{{ kom.name }}</label>
          </td>
          <td>
            <label :for="kom.name">{{ kom.segment.activity_type }}</label>
          </td>
          <td>
            <label :for="kom.name">{{ kom.start_date_local }}</label>
          </td>
        </tr>
      </table>
    </div>
    <router-link to="/confirm">Next</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Kom',
    mounted: function () {
      this.getKoms();
    },
    methods: {
      getKoms: function () {
        var that = this;
        this.$http.get("http://localhost:4000/koms").then(response => {
          that.koms = response.body;
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
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  a {
    color: #42b983;
  }
</style>
