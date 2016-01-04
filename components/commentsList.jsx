const CSSTransitionGroup = React.addons.CSSTransitionGroup;

CommentsList = React.createClass({
  mixins: [ReactMeteorData],

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

  getInitialState() {
    return {
      comments: false
    };
  },

  handleToggleComments() {
    this.setState({comments: !this.state.comments});
  },

  render() {
    let {loading, comments, currentUser} = this.data;
    let commentCount = comments.length;

    if(loading) {
      return <Loading/>;
    }

    return (
      <div className="comments section">
        <button className="full-width" onClick={this.handleToggleComments}>
          {commentCount > 0 ? `${commentCount} comment${commentCount > 1 ? 's' : ''}` : 'Comment'}
        </button>
        {this.state.comments ?
          <span>
            <CSSTransitionGroup transitionName="comment">
              {comments.map((comment, i) => {
                return (
                  <SingleComment
                    key={i}
                    comment={comment}
                    id={comment._id}
                    currentUser={currentUser}/>
                );
              })}
            </CSSTransitionGroup>
            <NewComment
              currentUser={currentUser}
              patternId={this.props.patternId}/>
          </span>
        : null}
      </div>
    );
  }
});
