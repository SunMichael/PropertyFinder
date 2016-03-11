

'use strict'

var React = require('react-native')

var SearchResult = require('./SearchResult')

var {
  StyleSheet ,
  Text ,
  TextInput ,
  View ,
  TouchableHighlight ,
  Image,
  Component,
  ActivityIndicatorIOS
} = React ;

function urlForQueryAndPage(key,value,pageNumber) {
  var data = {
    country: 'uk' ,
    pertty: '1' ,
    encoding: 'json' ,
    listing_type: 'buy' ,
    action: 'search_listing' ,
    page: pageNumber
  };
  data[key] = value ;

  var queryString = Object.keys(data)
  .map(key => key + '=' + encodeURIComponent(data[key]))
  .join('&');

  return 'http://api.nestoria.co.uk/api?' + queryString ;
};

class SearchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {  //每个react组件都带有一个key-value存储的状态对象
      searchString: 'london' ,
      isLoading: false ,
      message: ''
    };
  }

  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({searchString: event.nativeEvent.text});
    console.log(this.state.searchString);
  }

  _executeQuery(query) {
    console.log(query);
    this.setState({isLoading: true});

    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json.response))
    .catch(error =>
    this.setState({
      isLoading: false ,
      message: 'Something bad happened' + error
    }));

  }

  _handleResponse(response) {    //函数带下划线一般代表私有方法
    this.setState({
      isLoading: false ,
      message: ''
    });
    if (response.application_response_code.substr(0,1) === '1') {
      // console.log('Properties found:' + response.listings.length);
      this.props.navigator.push(
        {
          title: 'Results' ,
          component: SearchResult ,
          passProps: {listings: response.listings}
        }
      )
    }else {
      this.setState({
        message: 'Location not recognized,please try again'
      })
    }
  }


  onSearchPressed() {
    var query = urlForQueryAndPage('place_name',this.state.searchString,1);
    this._executeQuery(query);
  }

  onLocationPressed(){
    console.log('locationing');
    navigator.geolocation.getCurrentPosition(
      location => {
        var search = location.coords.latitude + ',' + location.coords.longitude ;
        this.setState ({searchString: search});
        var query = urlForQueryAndPage('center_point',search,1);
        this._executeQuery(query);
      },
      error => {
        this.setState({
          message: 'there was a problem with obtaining your location:' + error
        });
      }
    );
  }
  render() {
    var spinner = this.state.isLoading ? (<ActivityIndicatorIOS
      hidden = 'true'
      size = 'large' />) : (<View/>);

    return  (<View style = {styles.container}>

    <Text style = {styles.description}>
    Search for houses to buy!
    </Text>

    <Text style = {styles.description}>
    Search by place-name, postcode or search near your location!
    </Text>

    <View style = {styles.flowRight}>
    <TextInput
    style = {styles.searchInput}
    value = {this.state.searchString}
    onChange = {this.onSearchTextChanged.bind(this)}  //这里是代理textinput的onchange，bind（this），相当于delegate = self
    placeholder = 'Search via name or postcode'
    />

    <TouchableHighlight
    style = {styles.button}
    underlayColor = '#99d9f4'
    onPress = {this.onSearchPressed.bind(this)} >
    <Text
    style = {styles.buttonText}>
    GO
    </Text>
    </TouchableHighlight>
    </View>

    <TouchableHighlight style = {styles.button}
    underlayColor = '#99d9f4'
    onPress = {this.onLocationPressed.bind(this)}>
    <Text style = {styles.buttonText}>Location</Text>
    </TouchableHighlight>

    <Image source = {require('image!house')}
    style = {styles.image} />

    {spinner}

    <Text style = {styles.description}>{this.state.message}</Text>

    </View>

);
}
}




var styles = StyleSheet.create({
  description: {
    marginBottom: 10 ,  //本视图向下的间距
    fontSize: 18 ,
    textAlign: 'center' ,
    color: '#656565' ,
    backgroundColor: 'blue'
  },
  container: {
    padding: 40 ,      //子视图与本视图的间距
    marginTop: 85 ,    //本视图对父坐标的顶部距离
    alignItems: 'center' ,
    backgroundColor: 'orange'
  },

   flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18 ,
    color: 'white' ,
    alignSelf: 'center'
  },
  button: {
    height: 36 ,
    flex: 1 ,
    flexDirection: 'row' ,
    backgroundColor: '#48BBEC' ,
    borderColor: '#48BBEC' ,
    borderWidth: 1 ,
    borderRadius: 8 ,
    marginBottom: 10 ,
    alignSelf: 'stretch' ,
    justifyContent: 'center'
  },
  searchInput: {
    height: 36 ,
    padding: 4 ,
    marginRight: 5 ,
    flex: 4 ,
    fontSize: 18 ,
    borderWidth: 1 ,
    borderColor: '#48BBEC' ,
    borderRadius: 8 ,
    color: '#48BBEC'

  },
  image: {
    width: 217 ,
    height: 138
  }

})



module.exports = SearchPage ;
