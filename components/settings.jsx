const Settings = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let styleguide = Styleguides.findOne();
    DocHead.setTitle(`${styleguide.name} settings on Patterns`);
    return {
      styleguide: styleguide
    };
  },

  render() {
    let {styleguide} = this.data;
    return (
      <Container>
        <Sidebar>
          <h2>{styleguide.name}</h2>
        </Sidebar>
        <Main>
          <h3>Settings</h3>
          <section className="section">
            <div className="form-group">
              <label>Styleguide name</label>
              <input
                type="text"
                defaultValue={styleguide.name}/>
            </div>
            <div className="form-group">
              <label>URL slug</label>
              <input
                type="url"
                defaultValue={`${Meteor.settings.public.site_url}/${styleguide.slug}`}
                disabled/>
            </div>
            <div className="form-group">
              <label>Stylesheet URL</label>
              <input
                type="url"
                defaultValue={styleguide.stylesheet}/>
            </div>
          </section>
          <section className="section">
            <div className="form-group">
              <button className="negative">Delete styleguide</button>
            </div>
          </section>
        </Main>
      </Container>
    );
  }
});

if(Meteor.isClient) {
  FlowRouter.route('/:slug/settings', {
    subscriptions(params) {
      this.register('styleguide', Meteor.subscribe('styleguide', params.slug));
    },

    action() {
      FlowRouter.subsReady('styleguide', () => {
        ReactLayout.render(Wrapper, {
          content: <Settings/>
        });
      });
    }
  });
}
