import React from "react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getAllComm,saveComment} from '../actions/Action';
import {getProfile} from '../../login/action/Action';

import {CommentFooterDelete,CommentFooter,CommentBody,
    Comment,CommentReveal,CommentCount,CommentFormAction,
    CommentFormField,CommentForm,CommentBox,ButtonComm, Input, Textarea
} from '../componets/CommentBoxStyledFile';

class CommentaryBox extends React.Component {
    constructor() {
      super();
      
      this.state = {
        showComments: false,
        comments: [
          {id: 1, author: "landiggity", body: "This is my first comment on this forum so don't be a dick"},
          {id: 2, author: "scarlett-jo", body: "That's a mighty fine comment you've got there my good looking fellow..."},
          {id: 3, author: "rosco", body: "What is the meaning of all of this 'React' mumbo-jumbo?"}
        ]
      };
    }

    componentDidMount () {
      this.props.getProfile();
    }
    
    render () {
      getAllComm(this.props.idMovie);
      const comments = this._getComments();
      let commentNodes;
      let buttonText = 'Show Comments';
      
      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{comments}</div>;
      }
      
      return(
        <CommentBox>
          <h2>Join the Discussion!</h2>
          <CommentaryForm 
            addComment={this._addComment.bind(this)}
            name={this.props.name} 
            idMovie={this.props.idMovie}
          />
          <CommentReveal onClick={this._handleClick.bind(this)}>
            {buttonText}
          </CommentReveal>
          <h3>Comments</h3>
          <CommentCount>
            {this._getCommentsTitle(comments.length)}
          </CommentCount>
          {commentNodes}
        </CommentBox>  
      );
    } // end render
    
    _addComment(author, body) {
      const comment = {
        id: this.state.comments.length + 1,
        author,
        body
      };
      this.setState({ comments: this.state.comments.concat([comment]) }); // *new array references help React stay fast, so concat works better than push here.
    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    _getComments() {    
      return this.state.comments.map((comment) => { 
        return (
          <CommentClass 
            author={comment.author} 
            body={comment.body} 
            key={comment.id} />
        ); 
      });
    }
    
    _getCommentsTitle(commentCount) {
      if (commentCount === 0) {
        return 'No comments yet';
      } else if (commentCount === 1) {
        return "1 comment";
      } else {
        return `${commentCount} comments`;
      }
    }
  } // end CommentBox component
  
  class CommentaryForm extends React.Component {
    render() {
      console.log("props",this.props.name)
      return (
        <CommentForm onSubmit={this._handleSubmit.bind(this)}>
          <CommentFormField>
            <Input placeholder={this.props.name} readonly ref={(input) => this._author = this.props.name} defaultValue={this.props.name}></Input><br />
            <Textarea placeholder="Comment" rows="4" required ref={(textarea) => this._body = textarea}></Textarea>
          </CommentFormField>
          <CommentFormAction>
            <button type="submit">Post Comment</button>
          </CommentFormAction>
        </CommentForm>
      );
    } // end render
    
    _handleSubmit = (event)=> { 
      event.preventDefault();   // prevents page from reloading on submit
      let author = this._author;
      let body = this._body;
      saveComment(body.value,localStorage.getItem("loggedUserId"),this.props.idMovie)
      this.props.addComment(author.value, body.value);
      body.value="";
    }
  } // end CommentForm component
  
  class CommentClass extends React.Component {
    render () {
      return(
        <Comment>
          <p className="comment-header">{this.props.author}</p>
          <CommentBody>- {this.props.body}</CommentBody>
          <CommentFooter>
            <CommentFooterDelete href="#"  onClick={this._deleteComment}>Delete Comment</CommentFooterDelete>
          </CommentFooter>
        </Comment>
      );
    }
    _deleteComment() {
      alert("-- DELETE Comment Functionality COMMING SOON...");
    }
  }
  
  const mapStateToProps = state => ({
    idMovie: state.notification.notification.idMovie,
    name: state.login.login.name
  });

  const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(getProfile())    
});

  export default connect(mapStateToProps,mapDispatchToProps)(CommentaryBox);
