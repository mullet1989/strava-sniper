<template>

  <div>

    <div id="permission_div" v-show="showPermissionDiv">
      <h4>You are currently not subscribed</h4>
      <p id="token" :style="{ 'color': permissionColor }">{{ tokenContent }}</p>
      <!--<button class="mdl-button mdl-js-button mdl-button&#45;&#45;raised mdl-button&#45;&#45;colored"-->
      <!--v-on:click="appRequestPermission">Request Permission-->
      <!--</button>-->
    </div>


    <div style="margin: 20px;">
      <span>Please enter the email address to which you would like to notified</span>
      <form v-on:submit.prevent>
        <input v-model="email" type="text" placeholder="email" style="margin: 5px; padding: 5px;"/>
        <div style="margin-top: 20px;">
          <span>How often would you like to be notified?</span>
          <div style="margin-top: 20px;">
            <input type="radio" v-model="frequency" value="daily" id="daily"><label for="daily">Daily</label> <br>
            <input type="radio" v-model="frequency" value="weekly" id="weekly" checked><label
            for="weekly">Weekly</label>
            <br>
            <input type="radio" v-model="frequency" value="monthly" id="monthly"><label for="monthly">Monthly</label>
            <br>
            <input class="btn btn-primary btn-sm" v-on:click="submitForm" type="submit"
                   style="min-width: 40%; margin: 20px;">
          </div>
        </div>
      </form>
    </div>


    <main class="mdl-layout__content mdl-color--grey-100">
      <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">

        <!-- Container for the Table of content -->
        <div
          class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop">
          <div class="mdl-card__supporting-text mdl-color-text--grey-600">
            <!-- div to display the generated Instance ID token -->
            <div id="token_div" style="display: none;">
              <h4>Instance ID Token</h4>
              <p id="token" style="word-break: break-all;"></p>
              <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                      v-on:click="deleteToken">Delete Token
              </button>
            </div>

            <!-- div to display messages received by this app. -->
            <ul id="messages">
              <li v-for="message in messageContent">
                {{ message }}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'confirm',
    mounted: function () {
      const that = this;
      this.$data.messaging = firebase.messaging();
      this.$data.messaging.onTokenRefresh(function () {
        this.$data.messaging.getToken()
          .then(function (refreshedToken) {
            console.log('Token refreshed.');
            that.setTokenSentToServer(false);
            that.sendTokenToServer(refreshedToken);
            that.resetUI();
          })
          .catch(function (err) {
            console.log('Unable to retrieve refreshed token ', err);
            that.tokenContent = `Unable to retrieve refreshed token , ${err}`;
          });
      });
      this.$data.messaging.onMessage(function (payload) {
        console.log("Message received. ", payload);
        that.messageContent.push(payload);
      });
      this.resetUI();
    },
    watch: {
      frequency: function (val) {
        this.appRequestPermission();
      }
    },
    methods: {
      submitForm() {
        const that = this;
        this.$http.post("http://localhost:4000/confirm", {
          "email": this.email,
          "frequency": this.frequency,
        }).then(response => {
          console.log(response);
          that.messageContent.push(response);
        })
      },
      deleteToken() {
        const that = this;
        this.$data.messaging.getToken()
          .then(function (currentToken) {
            that.messaging.deleteToken(currentToken)
              .then(function () {
                console.log('Token deleted.');
                that.setTokenSentToServer(false);
                that.resetUI();
              })
              .catch(function (err) {
                console.log('Unable to delete token. ', err);
              });
          })
          .catch(function (err) {
            console.log('Error retrieving Instance ID token. ', err);
            that.tokenContent = `Error retrieving Instance ID token. ${err}`;
          });
      },
      resetUI() {
        const that = this;
        this.messageContent = [];
        this.tokenContent = "loading...";
        this.$data.messaging.getToken()
          .then(function (currentToken) {
            if (currentToken) {
              that.sendTokenToServer(currentToken);
              that.updateUIForPushEnabled(currentToken);
            } else {
              // Show permission request.
              console.log('No Instance ID token available. Request permission to generate one.');
              // Show permission UI.
              that.updateUIForPushPermissionRequired();
              that.setTokenSentToServer(false);
            }
          })
          .catch(function (err) {
            console.log('An error occurred while retrieving token. ', err);
            that.tokenContent = `Error retrieving Instance ID token.  ${err.message}`;
            that.setTokenSentToServer(false);
          });
      },
      updateUIForPushPermissionRequired() {
        this.showTokenDiv = false;
        this.showPermissionDiv = true;
      },
      updateUIForPushEnabled(currentToken) {
        this.showTokenDiv = true;
        this.showPermissionDiv = false;
        this.tokenContent = currentToken;
      },
      appRequestPermission: function () {
        console.log('Requesting permission...');
        const that = this;
        this.$data.messaging.requestPermission()
          .then(function () {
            console.log('Notification permission granted.');
            that.resetUI();
          })
          .catch(function (err) {
            console.log('Unable to get permission to notify.', err);
          });
      },
      sendTokenToServer(currentToken) {
        if (!this.isTokenSentToServer()) {
          console.log('Sending token to server...');
          this.$http.post("http://localhost:4000/token", {
            "token": currentToken
          }).then(response => {
            console.log("success!");
          }, reponse => {
            console.log("error");
          });
          this.setTokenSentToServer(true);
        } else {
          console.log('Token already sent to server so won\'t send it again ' +
            'unless it changes');
        }
      },
      isTokenSentToServer() {
        if (window.localStorage.getItem('sentToServer') == 1) {
          return true;
        }
        return false;
      },
      setTokenSentToServer(sent) {
        window.localStorage.setItem('sentToServer', sent ? 1 : 0);
      },
    },
    data: () => {
      return {
        email: "",
        frequency: "",
        messaging: {},
        tokenDivId: 'token_div',
        showTokenDiv: false,
        tokenContent: "",
        permissionDivId: 'permission_div',
        showPermissionDiv: true,
        permissionColor: "red",
        messageContent: [],
      }
    }
  }
</script>

