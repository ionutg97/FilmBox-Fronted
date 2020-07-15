import React from "react";
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getAllComm, saveComment, getNumberComm, deleteComm} from '../actions/Action';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
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
        currentNumberCommCount: 0,
        comments: []
      };
    }

    componentDidMount () {
      
      this.props.getProfile();
      this.props.getAllComm(this.props.idMovie);
      //console.log("all comments", this.props.idMovie)
      this.pullingMethod();
    }
    
    render () {
      getAllComm(this.props.idMovie);
      this.state.comments = this._getComments();
      //console.log("render comm", this.state.comments)
      let commentNodes;
      let buttonText = 'Show Comments';
      
      if (this.state.showComments) {
        buttonText = 'Hide Comments';
        commentNodes = <div className="comment-list">{ this.state.comments}</div>;
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
            {
                this._getCommentsTitle( this.state.comments.length)
            }
          </CommentCount>
          {commentNodes}
        </CommentBox>  
      );
    } // end render
    
    _addComment(idUser, content) {
      const comment = {
        id: this.props.comments.length + 1,
        idUser,
        content
      };
      this.setState({ comments: this.props.comments.concat([comment]) }); 
    }
    
    _handleClick() {
      this.setState({
        showComments: !this.state.showComments
      });
    }
    
    _getComments() {   
      if(this.props.comments ){
        //console.log("comment",this.props.comments)
      return this.props.comments.map((comment) => { 
        return (
          <CommentClass 
            idUser={comment.idUser}
            content={comment.content}
            id={comment.id} />
        ); 
      });
    }
    }
    
    _getCommentsTitle(commentCount) {
      this.state.currentNumberCommCount=commentCount;
      if (this.state.currentNumberCommCount === 0) {
        return 'No comments yet';
      } else if (this.state.currentNumberCommCount === 1) {
        return "1 comment";
      } else {
        return `${this.state.currentNumberCommCount} comments`;
      }
    }

    pullingMethod=()=>{
      console.log("pulling method")
      let currentNumberComm= this.props.numberComm;
     // clearTimeout(this.pullingMethod())
      this.props.getNumberComm(this.props.idMovie);
      if(this.state.currentNumberCommCount != currentNumberComm)
      {
        //console.log("equals verify",this.state.currentNumberCommCount," ",currentNumberComm)
        this.state.currentNumberCommCount = currentNumberComm;
        this.props.getAllComm(this.props.idMovie);
        clearTimeout(this.pullingMethod())
      }
      setTimeout(this.pullingMethod, 10000);
    }
  } // end CommentBox component
  
  class CommentaryForm extends React.Component {
    render() {
      //console.log("props",this.props.name)
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
    constructor() {
      super();
    }
    render () {
      return(
        <Comment>
          <p className="comment-header">{this.props.idUser}</p>
          <CommentBody>- {this.props.content}</CommentBody>
          <CommentFooter>
            {this.displayDeleteOption()}
          </CommentFooter>
        </Comment>
      );
    }

    deleteComment = (idComm) => {
      deleteComm(idComm);
      getAllComm(this.props.idMovie);
    }

    displayDeleteOption =()=>{
      
      if(localStorage.getItem("role")==="admin")
        return(<CommentFooterDelete href="#"  onClick={()=>{this.deleteComment(this.props.id)}}>Delete Comment</CommentFooterDelete>)
      else
        return null;
    }

  }
  
  const mapStateToProps = state => ({
    idMovie: state.notification.notification.idMovie,
    name: state.login.login.name,
    comments: state.dashboardMovie.dashboardMovie.comments,  
    numberComm: state.dashboardMovie.dashboardMovie.numberComm
  });

  const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(getProfile()),
    getAllComm: (idMovie) => dispatch(getAllComm(idMovie)),
    getNumberComm: (idMovie) =>dispatch(getNumberComm(idMovie))   
  });

  export default connect(mapStateToProps,mapDispatchToProps)(CommentaryBox);
