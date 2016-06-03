var React = require('react')

module.exports = React.createClass({
  getInitialState: function(){
    return{
      liked: false,
      numberOfLikes: this.props.activity.activity_likes,
      src: './images/not-liked.png'
    }
  },
  liker: function(){
    var liked = !this.state.liked
    var numberOfLikes = this.state.numberOfLikes
    if(liked){
      this.setState({liked: liked, src: './images/liked.png', numberOfLikes: numberOfLikes + 1})
    }else{
      this.setState({liked: liked, src: './images/not-liked.png', numberOfLikes: numberOfLikes - 1})
    }
  },
  render: function(){
    return <span className="like">
      <img onClick={this.liker} className="like-img" src={this.state.src} ></img>
      <div className="like-label">{this.state.numberOfLikes}</div>
    </span>
  }
})
