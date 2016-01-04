NewComment = React.createClass({
  mixins: [AccountActionsMixin],

  propTypes: {
    currentUser: React.PropTypes.object,
    patternId: React.PropTypes.string
  },

  handleKeyUp(event) {
    if(event.keyCode === 13) {
      Meteor.call('newComment', {
        text: event.target.value,
        created_at: Date.now(),
        created_by: this.props.currentUser._id,
        patternId: this.props.patternId
      }, (error, success) => {
        if(error) {
          console.error(error);
        }
      });
    }
  },

  render() {
    return (
      <div className="comment comment__new">
        {this.props.currentUser ?
          <span>
            <input
              onKeyUp={this.handleKeyUp}
              ref="commentInput"/>
            <Avatar user={this.props.currentUser} size="small"/>
          </span>
        :
          <button className="full-width" onClick={this.handleSignIn}>
            Sign in with Google to comment
          </button>
        }
      </div>
    );
  }
});

if(Meteor.isServer) {
  Meteor.methods({
    newComment(args) {
      check(args, {
        text: String,
        created_at: Number,
        created_by: String,
        patternId: String
      });

      return Comments.insert(args);
    }
  });
}
