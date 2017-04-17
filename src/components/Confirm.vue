<template>
  <div>
    <div>
      Please enter the email address to which you would like to notified
    </div>
    <form v-on:submit.prevent>
      <input v-model="email" type="text"/> <br>
      <div style="margin: 10px;">How often would you like to be notified?</div>
      <div>
        <input type="radio" v-model="frequency" value="daily" id="daily"><label for="daily">Daily</label> <br>
        <input type="radio" v-model="frequency" value="weekly" id="weekly" checked><label for="weekly">Weekly</label>
        <br>
        <input type="radio" v-model="frequency" value="monthly" id="monthly"><label for="monthly">Monthly</label> <br>
        <input class="btn btn-primary btn-sm" v-on:click="submitForm" type="submit">
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'confirm',
    mounted: function () {
    },
    methods: {
      submitForm() {
        this.$http.post("http://localhost:4000/confirm", {
          "email": this.email,
          "frequency": this.frequency,
          "koms": this.$store.getters.getKoms,
        }).then(response => {
            console.log(response.bodyText);
        })
      }
    },
    data () {
      return {
        email: "",
        frequency: ""
      }
    }
  }
</script>

<style scoped>
  .frequency {
    text-align: left;
  }
</style>

