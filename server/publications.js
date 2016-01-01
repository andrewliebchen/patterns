Meteor.publish(null, () => {
  return Meteor.roles.find({});
});

Meteor.publish('styleguides', (slug) => {
  let styleguide = Styleguides.find({slug: slug});
  return [
    styleguide,
    Patterns.find({parent: styleguide.fetch()._id})
  ];
});
