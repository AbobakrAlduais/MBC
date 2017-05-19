import React, { Component } from 'react';
import style from './style';


class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {title:'',author: '', content: '' };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAuthorChange = this.handleAuthorChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }
  handleAuthorChange(e) {
    this.setState({ author: e.target.value });
  }

  handleTextChange(e) {
    this.setState({ content: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let title = this.state.title.trim();
    let author = this.state.author.trim();
    let content = this.state.content.trim();
    if (!content || !author || !title) {
      return;
    }
    this.props.onArticleSubmit({title: title, author: author, content: content });
    this.setState({ title:'', author: '', content: '' });
  }
  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>

         <input
          type='text'
          placeholder='Article Title...'
          style={ style.FormAuthor}
          value={ this.state.title }
          onChange={ this.handleTitleChange } />
        <input
          type='text'
          placeholder='Your name...'
          style={ style.FormAuthor}
          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Add Article...'
          style={ style.FormText}
          value={ this.state.content }
          onChange={ this.handleTextChange } />
        <input
          type='submit'
          style={ style.FormPost }
          value='Post'/>
      </form>
    )
  }
}














export default ArticleForm;