var React = require('react')
var request = require('superagent')

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
  renderActivityBoxes: function(){
    return this.state.activities.map(function(activity){
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
            <span className="actor-property">Location: </span>
            <span className="actor-value">USA</span>
            <div>
              <span className="actor-property">Description: </span>
              <span className="actor-value">{activity.actor_description}</span>
            </div>
          </div>
        </div>
        <div className="activity-container">
          <span>
            <img className="social-icon" src="./images/twitter.png"></img>
          </span>
          <span className="activity-message">
            {activity.activity_message}
          </span>
          <div className="activity-attachment">
            <img src={activity.activity_attachment} width="250px" height="250px"></img>
          </div>
          <div className="action-buttons">
            <span className="sentiment">
              <img src="./images/positive.png"/>
            </span>
            <span className="like">
              <img src="./images/not-liked.png"/>
              <div>30</div>
            </span>
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
