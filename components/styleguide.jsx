Styleguide = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let styleguide = Styleguides.findOne();
    DocHead.setTitle(`${styleguide.name} on Patterns`);
    return {
      styleguide: styleguide,
      patterns: Patterns.find({}).fetch()
    };
  },

  render() {
    let {styleguide, patterns} = this.data;
    return (
      <Container>
        <Sidebar styleguide={styleguide._id}/>
        <Main>
          <PatternList
            patterns={patterns}
            stylesheet={styleguide.stylesheet}/>
        </Main>
      </Container>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/:slug', {
    subscriptions(params) {
      this.register('styleguide', Meteor.subscribe('styleguide', params.slug));
    },

    action() {
      FlowRouter.subsReady('styleguide', () => {
        ReactLayout.render(Wrapper, {
          content: <Styleguide/>
        });
      });
    }
  });
}
