AccountActionsMixin = {
  handleSignOut() {
    Meteor.logout();
  },

  handleSignIn() {
    Meteor.loginWithGoogle();
  }
}
