import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import style from './style';
import AllArticls from './AllArticls';


class Article extends Component {
	constructor(props) {
		super(props);
		this.state = { data: {},user: '', comment: '' };
    	this.handleUserChange = this.handleUserChange.bind(this);
    	this.handleCommentChange = this.handleCommentChange.bind(this);
    	this.handleViewArticle = this.handleViewArticle.bind(this);
    	this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    	this.handleDeletArticle = this.handleDeletArticle.bind(this);
    	this.handleEditArticle = this.handleEditArticle.bind(this);
    }


    handleViewArticle() {
    	axios.get(`${this.props.ViewArticleUrl}/${this.props.id}`)
    	.then(res => {
    		this.setState({ data: res.data });

    	})
    	.catch(err => {
    		console.error(err);
    	});
    }
    componentDidMount() {
    	this.handleViewArticle();
    	setTimeout(this.handleViewArticle, this.props.pollInterval);
    }

    componentWillUnmount(){
   // use intervalId from the state to clear the interval
   clearInterval(this.state.intervalId);
   }
    handleSubmit(e) {
    	e.preventDefault();
    	ReactDOM.render(
    		<AllArticls 
    		postArticlesurl='http://localhost:4000/article/create'
    		getArticlesurl='http://localhost:4000/articles/view'
    		pollInterval={5000}/>,
    		document.getElementById('root')
    		);

    }
  /////////////Add Comments//////////////////
  handleUserChange(e) {
  	this.setState({ user: e.target.value });
  }

  handleCommentChange(e) {
  	this.setState({ comment: e.target.value });
  }
  handleCommentSubmit(e) {
  	e.preventDefault();
  	let user = this.state.user.trim();
  	let comment = this.state.comment.trim();

  	axios.post('http://localhost:4000/comment/create',{author:user,text:comment,article_id:this.state.data._id})
  	.catch(err => {
  		console.error(err);
  	});

  	this.setState({user: '', comment: '' });
  } 

  /////////////////delet article//////////////////
  handleDeletArticle(e){
  	let url = 'http://localhost:4000/article/delete'
  	axios.delete(`${url}/${this.state.data._id}`)
      .then(res => {
        console.log('Article deleted');
      })
      .catch(err => {
        console.error(err);
      });

  }

  //////////////Edit Article///////////////////
  handleEditArticle(e){
  	e.preventDefault();
  	console.log("edit")

  } 

  render() {
  	let arr = [];
  	let comments
  	 arr = this.state.data.comment
  	if(arr){
  	 comments = arr.map(comment=>{
  		 	return(
  		 		<div key={comment['_id']}>{comment.author}: {comment.text}</div>
  		 		)
  		 })
  	}

  	return (
  	<div >
  		<form style={ style.commentForm } onSubmit={ this.handleSubmit }>
	  		<input
	  		type='submit'
	  		style={ style.FormPost }
	  		value='Home'/>
  		</form>

  		<form style={ style.commentForm } onSubmit={ this.handleDeletArticle }>
	  		<input
	  		type='submit'
	  		style={ style.FormDelet }
	  		value='Delet'/>
  		</form>
  		<form style={ style.commentForm } onSubmit={ this.handleEditArticle }>
	  		<input
	  		type='submit'
	  		style={ style.FormDelet }
	  		value='Edit'/>
  		</form>
  		
  		<h1 style={ style.title }>{this.state.data.title}</h1>
  		<h3>{this.state.data.author}</h3>
  		{this.state.data.content}

  		<form style={ style.commentForm } onSubmit={ this.handleCommentSubmit }>
	  		<input
	  		type='text'
	  		placeholder='Your name...'
	  		style={ style.FormAuthor}
	  		value={ this.state.user }
	  		onChange={ this.handleUserChange } />
	  		<input
	  		type='text'
	  		placeholder='comment...'
	  		style={ style.FormComment}
	  		value={ this.state.comment }
	  		onChange={ this.handleCommentChange } />
	  		<input
	  		type='submit'
	  		style={ style.FormPost }
	  		value='comment'/>
  		 </form>

			<div  style={ style.articleList }>
			<h3>Comments</h3>
			{ comments}
			<form style={ style.commentForm } onSubmit={ this.handleEditArticle }>
	  		<input
	  		type='submit'
	  		style={ style.FormDelet }
	  		value='Edit'/>
  		</form>
			</div>
			

  		
  	</div>




  		)
  }

}

export default Article;
