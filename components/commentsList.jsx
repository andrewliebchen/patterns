const CSSTransitionGroup = React.addons.CSSTransitionGroup;

CommentsList = React.createClass({
  mixins: [ReactMeteorData, AccountActionsMixin],

  propTypes: {
    patternId: React.PropTypes.string
  },

  getMeteorData() {
    let commentsSub = Meteor.subscribe('comments', this.props.patternId);
    return {
      loading: !commentsSub.ready(),
      comments: Comments.find({patternId: this.props.patternId}).fetch(),
      currentUser: Meteor.user()
    };
  },

  handleKeyUp(event) {
    if(event.keyCode === 13) {
      Meteor.call('newComment', {
        text: event.target.value,
        created_at: Date.now(),
        created_by: Meteor.user()._id,
        patternId: this.props.patternId
      }, (error, success) => {
        if(error) {
          console.log(error);
        }
      });
    }
  },

  render() {
    if(this.data.loading) {
      return <Loading/>;
    }

    return (
      <div className="comments section">
        {this.data.comments.length > 0 ?
          <CSSTransitionGroup transitionName="comment">
            {this.data.comments.map((comment, i) => {
              return (
                <SingleComment
                  key={i}
                  comment={comment}
                  id={comment._id}
                  currentUser={this.data.currentUser}/>
              );
            })}
          </CSSTransitionGroup>
        : <div className="comments__no-content">Doh, no comments yet</div>}
        <div className="comment comment__new">
          {this.data.currentUser ?
            <span>
              <input
                onKeyUp={this.handleKeyUp}
                ref="commentInput"/>
              <Avatar user={this.data.currentUser} size="small"/>
            </span>
          :
            <button className="full-width" onClick={this.handleSignIn}>
              Sign in with Google to comment
            </button>
          }
        </div>
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
