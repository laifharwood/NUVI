var React = require('react')
var request = require('superagent')
var Country = require('./country')
var Like = require('./like')

module.exports = React.createClass({
  getInitialState: function(){
    return{
      activities: []
    }
  },
  componentWillMount:function(){
    var that = this
    request
    .get('https://nuvi-challenge.herokuapp.com/activities')
    .set('Accept', 'application/json')
    .end(function(err, res){
      if(err){
        console.log(err)
      }else if (res){
        var array = JSON.parse(res.text)
        that.setState({activities: array})
      }
    })
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
  renderActivityBoxes: function(){
    var that = this
    return this.state.activities.map(function(activity, index){
      return <div className="activity-box">
        <div className="activity-box-top">
          <div className="actor-avator">
            <img src={activity.actor_avator} width="50px" height="50px"></img>
          </div>
          <div className="actor-info-container">
            <p className="actor-name">{activity.actor_name}</p>
            <div className="actor-hr"></div>
            <span className="actor-property">Username: </span>
            <span className="actor-value">{activity.actor_username}</span>
            <span className="actor-property">Country: </span>
            <Country activity={activity} key={index}></Country>
            <div>
              <span className="actor-property">Description: </span>
              <span className="actor-value">{activity.actor_description}</span>
            </div>
          </div>
        </div>
        <div className="activity-container">
          <span>
            {that.renderSocialIcon(activity.provider)}
          </span>
          <span className="activity-date">
            {that.formatDate(activity.activity_date)}
          </span>
            {that.renderMessage(activity.activity_message)}
          {that.renderAttachment(activity.activity_attachment)}
          <div className="action-buttons">
            {that.renderSentiment(activity.activity_sentiment)}
            <Like activity={activity}></Like>
            <span className="comment">
              <img src="./images/comment.png"/>
              <div>5</div>
            </span>
        </div>
        <input type="text" className="comment-input" placeholder="Enter Comment"/>
        </div>
      </div>
    })
  },
  render: function(){
    return <div className="main">
      <div className="header">
        <h1 className="title">Social Activities</h1>
        <hr className="top-hr"/>
      </div>
      <div className="dummy"></div>
      <div className="activities-container">
        {this.renderActivityBoxes()}
      </div>
      <span className="stat-box"></span>
    </div>
  }
})
