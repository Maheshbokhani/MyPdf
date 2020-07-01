
import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  TextInput
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
export default class App extends Component {
  state = {
    filePath: '',
    name: '',
    surname:'',
    email:''
  };
  constructor(props) {
    super(props);
  }

  askPermission() {
    var that = this;
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'CameraExample App External Storage Write Permission',
            message:
              'CameraExample App needs access to Storage data in your SD Card ',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //If WRITE_EXTERNAL_STORAGE Permission is granted
          //changing the state to show Create PDF option
          that.createPDF();
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    //Calling the External Write permission function
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      this.createPDF();
    }
  }

  async createPDF() {
    let options = {
      //Content to print
      html:
        '<h1 style="text-align: center;"><strong>'+this.state.name+'</strong></h1><p style="text-align: center;">'+this.state.surname+'</p><p style="text-align: center;">'+this.state.email+'</p><p style="text-align: center;"><strong>MDB Group</strong></p>',
      //File Name
      fileName: 'MDB',
      //File directory
      directory: 'docs/MDB Group',
    };
    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    this.setState({ filePath: file.filePath });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          style={{ width: '80%', 
          height: 40,backgroundColor:'white',marginTop:20,color:'blue' }}
          placeholder={'Name'}
          placeholderTextColor={'blue'}
          //autoFocus={true}
          returnKeyType='done'
          value={this.state.name}
          onChangeText={(t) => { this.setState({ name: t }) }}
        />
        <TextInput
          style={{ width: '80%', height: 40,backgroundColor:'white',color:'blue',marginTop:20 }}
         //autoFocus={true}
         placeholder={'Surname'}
         placeholderTextColor={'blue'}
          returnKeyType='done'
          value={this.state.surname}
          onChangeText={(t) => { this.setState({ surname: t }) }}
        />

        <TextInput
          style={{ width: '80%', height: 40,backgroundColor:'white',color:'blue',marginTop:20  }}
          //autoFocus={true}
          returnKeyType='done'
          placeholder={'Email'}
          placeholderTextColor={'blue'}
          value={this.state.email}
          onChangeText={(t) => { this.setState({ email: t }) }}
        />
        <TouchableOpacity onPress={this.askPermission.bind(this)}>
          <View>
            <Text style={styles.text}>Create PDF</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.text1}>{this.state.filePath}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop:30,
    alignItems: 'center',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 16,
    width:150,
    backgroundColor: 'blue',
    height:30,
    borderRadius:30,
    paddingTop:3
  },
  text1:{
    fontSize:12,
    color: 'white',
    marginTop:20
  },
  ImageStyle: {
    height: 100,
    width: 100,
    resizeMode: 'stretch',
  },
});