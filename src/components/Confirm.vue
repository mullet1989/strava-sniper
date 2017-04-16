<template>
  <div>
    <div>
      {{ msg }}
    </div>
    <form v-on:submit.prevent>
      <input v-model="email" type="text"/> <br>
      <div style="margin: 10px;">How often would you like to be notified?</div>
      <input type="radio" v-model="frequency" value="daily" id="daily"><label for="daily">Daily</label> <br>
      <input type="radio" v-model="frequency" value="weekly" id="weekly" checked><label for="weekly">Weekly</label> <br>
      <input type="radio" v-model="frequency" value="monthly" id="monthly"><label for="monthly">Monthly</label> <br>
      <input class="btn btn-primary btn-sm" v-on:click="submitForm" type="submit">
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
        console.log("hello world");
      }
    },
    data () {
      return {
        msg: 'Please enter the email address to which you would like to notified',
        email: "",
        frequency: ""
      }
    }
  }
</script>

<style scoped>
  /*input[type=text] {*/
    /*height: 20px;*/
    /*padding: 5px;*/
    /*margin: 10px;*/
    /*width: 50%;*/
  /*}*/

  /*input[type=submit] {*/
    /*color: #ffffff;*/
    /*background-color: #fc4c02;*/
    /*border-color: #fc4c02;*/
    /*font-size: 13px;*/
    /*white-space: normal;*/
    /*padding: 5px 50px;*/
    /*margin: 10px;*/
  /*}*/

</style>

