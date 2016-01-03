Meteor.publish(null, () => {
  return Meteor.roles.find({});
});

Meteor.publish('styleguide', (slug) => {
  let styleguide = Styleguides.find({slug: slug});
  return [
    styleguide,
    Patterns.find({'styleguide': styleguide.fetch()[0]._id})
  ];
});

Meteor.publish('comments', (pattern) => {
  check(pattern, String);
  return Comments.find({pattern: pattern});
})
