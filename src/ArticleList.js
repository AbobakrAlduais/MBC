import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Article from './Article';
import style from './style';

class ArticleList extends Component {
	//get ID for the article when click
	handleClick = (id,event) => {
		    ReactDOM.render(
		  <Article ViewArticleUrl='http://localhost:4000/article/view'
		  id={id} 
		  pollInterval={2000}/>,
		  document.getElementById('root')
		);
	}

	render() {
		let Articles = this.props.data.map(article => {
			return (
				<div 
				key={ article['_id'] }
				onClick={this.handleClick.bind(this,article['_id'])}>
				{ article.title } 
				</div>
				)
		})
		return (
			<div  style={ style.articleList }>
			{ Articles}
			</div>
			)
	}
}
export default ArticleList;