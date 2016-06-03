var React = require('react')
var Country = require('./country')
var Like = require('./like')

module.exports = React.createClass({
  getInitialState: function(){
    return{
      showCommentInput: false,
      numberOfComments: this.props.activity.activity_comments,
      src: './images/comment.png'
    }
  },
  renderSocialIcon: function(provider){
    var src = ''
    if(provider == "facebook"){
      src = './images/facebook.png'
    }else if(provider == "twitter"){
      src = './images/twitter.png'
    }else if(provider == "instagram"){
      src = './images/instagram.png'
    }else if(provider == "tumblr"){
      src = './images/tumblr.png'
    }
    return <img className="social-icon" src={src}></img>
  },
  formatDate: function(date){
    var year = date.substring(2, 4)
    var monthNumber = parseInt(date.substring(5, 7))
    var day = date.substring(8)
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var monthName = monthNames[monthNumber]
    if(day.indexOf("0") == 0){
      day = day.substring(1)
    }
    return monthName + " " + day + " " + year
  },
  renderMessage: function(message){
    if(message.indexOf('http') > 0){
      return null
    }else{
      return <div className="activity-message">{message}</div>
    }
  },
  renderAttachment: function(src){
    if(src == null){
      return null
    }else{
      return <div className="activity-attachment">
        <img src={src} width="250px" height="250px"></img>
      </div>
    }
  },
  renderSentiment: function(sentiment){
    var src = ''
    if(sentiment == -1){
      src = './images/negative.png'
    }else if(sentiment == 0){
      src = './images/neutral.png'
    }else if(sentiment == 1){
      src = './images/positive.png'
    }
    return <span className="sentiment">
      <img src={src}/>
    </span>
  },
  showCommentInput: function(){
    this.setState({showCommentInput: !this.state.showCommentInput})
  },
  postComment: function(e){
    e.preventDefault()
    this.setState({numberOfComments: this.state.numberOfComments + 1, src: './images/commented.png', showCommentInput: false})
  },
  render: function(){
    return <div className="activity-box">
      <div className="activity-box-top">
        <div className="actor-avator">
          <img src={this.props.activity.actor_avator} width="50px" height="50px"></img>
        </div>
        <div className="actor-info-container">
          <p className="actor-name">{this.props.activity.actor_name}</p>
          <div className="actor-hr"></div>
          <span className="actor-property">Username: </span>
          <span className="actor-value">{this.props.activity.actor_username}</span>
          <span className="actor-property">Country: </span>
          <Country activity={this.props.activity}></Country>
          <div>
            <span className="actor-property">Description: </span>
            <span className="actor-value">{this.props.activity.actor_description}</span>
          </div>
        </div>
      </div>
      <div className="activity-container">
        <span>
          {this.renderSocialIcon(this.props.activity.provider)}
        </span>
        <span className="activity-date">
          {this.formatDate(this.props.activity.activity_date)}
        </span>
          {this.renderMessage(this.props.activity.activity_message)}
        {this.renderAttachment(this.props.activity.activity_attachment)}
        <div className="action-buttons">
          {this.renderSentiment(this.props.activity.activity_sentiment)}
          <Like activity={this.props.activity}></Like>
          <span className="comment">
            <img src={this.state.src} onClick={this.showCommentInput}/>
            <div className="like-label">{this.state.numberOfComments}</div>
          </span>
      </div>
      {(this.state.showCommentInput) ? <form onSubmit={this.postComment}><input type="text" className="comment-input" placeholder="Enter Comment"/></form> : null}
      </div>
    </div>
  }
})
