var React = require('react')
var request = require('superagent')

module.exports = React.createClass({
  getInitialState: function(){
    return{
      countryName: "Unknown"
    }
  },
  componentWillMount: function(){
    var lat = this.props.activity.activity_latitude
    var long = this.props.activity.activity_longitude
    if(lat == null || long == null){
      //this.setState({countryName: "Unknown"})
    }else{
      this.getCountry(lat, long)
    }
  },
  render: function(){
    return <span className="actor-value">{this.state.countryName}</span>
  },
  getCountry: function(lat, long){
    var that = this
    request
    .get('http://api.geonames.org/countryCode?lat=' + lat + '&lng=' + long + '&username=laifharwood&type=JSON')
    .end(function(err, res){
      if(err){
        console.log(err)
        //that.setState({countryName: "Unknown"})
      }else{
        var result = JSON.parse(res.text)
        if(result.countryName != null){
          that.setState({countryName: result.countryName})
        }
      }
    })
  }
})
