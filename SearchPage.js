

'use strict'

var React = require('react-native')

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

class SearchPage extends Component {
  render() {
    return <View style = {styles.container}>
    <Text style = {styles.description}>
    Search for houses to buy!
    </Text>
    <Text style = {styles.description}>
    Search by place-name, postcode or search near your location!
    </Text>
    <View style = {styles.flowRight}>
    <TextInput style = {styles.searchInput}
    placeholder = 'Search via name or postcode'
    />

    </View>
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

   }

})


module.exports = SearchPage ;
