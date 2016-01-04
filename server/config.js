// https://console.developers.google.com
Meteor.startup(() => {
  ServiceConfiguration.configurations.upsert(
    {service: "google"},
    {$set: {
      clientId: Meteor.settings.google.clientId,
      secret: Meteor.settings.google.secret,
      loginStyle: "popup"
    }}
  );
});
