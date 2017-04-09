<template>
  <div>
    <h1>{{ msg }}</h1>
    <span>{{ koms }}</span>
    <router-link to="/">Home</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Kom',
    mounted: function() {
      this.getKoms();
    },
    methods: {
      getKoms: function() {
        var that = this;
        this.$http.get("http://localhost:4000/koms").then(response => {
          that.koms = response;
        })
      }
    },
    data () {
      return {
        msg: 'Please choose your segments',
        koms: []
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

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
