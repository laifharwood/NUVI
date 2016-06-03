var React = require('react')
var request = require('superagent')
var Activity = require('./activity')
//var Stats = require('./stats')

module.exports = React.createClass({
  getInitialState: function(){
    return{
      activities: [],
      positive: 0,
      negative: 0,
      neutral: 0
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
        var stats = that.calculatePercentages(array)
        that.setState({activities: array, positive: stats.positive, negative: stats.negative, neutral: stats.neutral})
      }
    })
  },
  calculatePercentages: function(activities){
    var numberOfPositive = 0
    var numberOfNegative = 0
    var numberOfNeutral = 0
    //console.log(this.state.activities.length)
    activities.map(function(activity){
      //console.log(activity.activity_sentiment)
      if(activity.activity_sentiment == 0){
        numberOfNeutral = numberOfNeutral + 1
      }else if(activity.activity_sentiment == 1){
        numberOfPositive = numberOfPositive + 1
      }else if(activity.activity_sentiment == -1){
        numberOfNegative = numberOfNegative + 1
      }
    })
    var total = numberOfNegative + numberOfPositive + numberOfNeutral
    var percentNegative = Math.ceil(numberOfNegative/total * 100)
    var percentPositive = Math.ceil(numberOfPositive/total * 100)
    var percentNeutral = Math.ceil(numberOfNeutral/total * 100)
    console.log(percentNegative)
    console.log(percentPositive)
    console.log(percentNeutral)
    return {negative: percentNegative, positive: percentPositive, neutral: percentNeutral}
  },
  renderActivityBoxes: function(){
    var that = this
    return this.state.activities.map(function(activity, index){
      return <Activity activity={activity}>
      </Activity>
    })
  },
  render: function(){
    return <div className="main">
      <div className="header">
        <h1 className="title">Social Activities</h1>
        <hr className="top-hr"/>
      </div>
      <span className="stat-box">
        <div className="sentiment-result positive-result">{this.state.positive}%</div>
        <div className="sentiment-result negative-result">{this.state.negative}%</div>
        <div className="sentiment-result neutral-result">{this.state.neutral}%</div>
      </span>
      <div className="dummy"></div>
        <div className="activities-container">
          {this.renderActivityBoxes()}
        </div>
    </div>
  }
})
