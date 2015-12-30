Meteor.publish(null, () => {
  return Meteor.roles.find({});
});

Meteor.publish('styleguides', () => {
  return [
    Styleguides.find({}),
    Patterns.find({})
  ];
});
