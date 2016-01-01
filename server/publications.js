Meteor.publish(null, () => {
  return Meteor.roles.find({});
});

Meteor.publish('styleguide', (slug) => {
  let styleguide = Styleguides.find({slug: slug});
  return [
    styleguide,
    Patterns.find({parent: styleguide.fetch()._id})
  ];
});
