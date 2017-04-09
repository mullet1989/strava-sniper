<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-html="authorizeButtonHtml"></div>
    <router-link to="/name">Go to name</router-link>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    mounted: function () {
      // GET /someUrl
      this.$http.get('https://strava-in-go.herokuapp.com/')
        .then(response => {
          // get body data
          this.authorizeButtonHtml = response.body;
        }, response => {
          console.log("something went wrong")
        });
    },
    data () {
      return {
        msg: 'Welcome to STRAVA SNIPER',
        authorizeButtonHtml: ""
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
