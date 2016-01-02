const Settings = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let styleguide = Styleguides.findOne();
    DocHead.setTitle(`${styleguide.name} settings on Patterns`);
    return {
      styleguide: styleguide
    };
  },

  handleSave(event) {
    event.preventDefault();
    let name = ReactDOM.findDOMNode(this.refs.name).value;
    let stylesheet = ReactDOM.findDOMNode(this.refs.stylesheet).value;
    Meteor.call('updateStyleguide', {
      id: this.data.styleguide._id,
      name: name,
      stylesheet: stylesheet
    }, (error, success) => {
      if(success) {
        Session.set('alert', 'Boom! Styleguide updated')
      }
    });
  },

  handleDelete() {
    if(window.confirm('Are you sure you want to delete this styleguide?')) {
      Meteor.call('deleteStyleguide', this.data.styleguide._id, (error, success) => {
        if(success) {
          Session.set('alert', 'Poof! Styleguide deleted');
        }
      });
    }
  },

  render() {
    let {styleguide} = this.data;
    return (
      <Container>
        <Sidebar styleguide={styleguide._id}/>
        <Main>
          <header className="section__header">
            <h3>Settings</h3>
          </header>
          <form className="section">
            <div className="form-group">
              <label>Styleguide name</label>
              <input
                type="text"
                defaultValue={styleguide.name}
                ref="name"/>
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
                defaultValue={styleguide.stylesheet}
                ref="stylesheet"/>
            </div>
            <button type="submit" onClick={this.handleSave}>Save settings</button>
          </form>
          <section className="section">
            <header className="section__header">
              <h3>Danger zone!</h3>
            </header>
            <div className="form-group">
              <p>Delete styleguide and patterns. Careful, this action can't be undone!</p>
              <button className="negative" onClick={this.handleDelete}>Delete styleguide</button>
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

if(Meteor.isServer) {
  Meteor.methods({
    updateStyleguide(args) {
      check(args, {
        id: String,
        name: String,
        stylesheet: String
      });

      return Styleguides.update(args.id, {
        $set: {
          name: args.name,
          stylesheet: args.stylesheet
        }
      })
    },

    deleteStyleguide(id) {
      check(id, String);
      return [
        Styleguides.remove(id),
        Patterns.remove({styleguide: id})
      ];
    }
  });
}
