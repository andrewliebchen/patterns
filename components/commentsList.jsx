const CSSTransitionGroup = React.addons.CSSTransitionGroup;

CommentsList = React.createClass({
  mixins: [ReactMeteorData],

  propTypes: {
    patternId: React.PropTypes.string,
    currentUser: React.PropTypes.object
  },

  getMeteorData() {
    let commentsSub = Meteor.subscribe('comments', this.props.patternId);
    return {
      loading: !commentsSub.ready(),
      comments: Comments.find({pattern: this.props.patternId}).fetch()
    };
  },

  handleKeyUp(event) {
    if(event.keyCode === 13) {
      Meteor.call('newComment', {
        text: event.target.value,
        created_at: Date.now(),
        created_by: Meteor.user()._id,
        parent: this.props.patternId
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
                  currentUser={this.props.currentUser}/>
              );
            })}
          </CSSTransitionGroup>
        : <div className="comments__no-content">Doh, no comments yet</div>}
        <div className="comment comment__new">
          {this.props.currentUser ?
            <span>
              <input
                onKeyUp={this.handleKeyUp}
                ref="commentInput"/>
              {/*<Avatar user={this.props.currentUser} size="small"/>*/}
            </span>
          :
            <button className="full-width">
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
