<template>
  <div>
    <div>
      {{ msg }}
    </div>
    <input v-model="email" type="text"/>
  </div>
</template>

<script>
  export default {
    name: 'confirm',
    mounted: function () {
      console.log(this.$route.params);
    },
    data () {
      return {
        msg: 'Please enter the email address to which you would like to notified',
        email: ""
      }
    }
  }
</script>

