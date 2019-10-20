import React, {Component } from 'react';
import {View, Text, StyleSheet,Image, TouchableOpacity} from 'react-native'
import {Header, Card, Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Firebase from './Firebase'

import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'

export default class Newuser extends Component{
    static navigationOptions={
        drawerLabel: "Add User",
        drawerIcon: ()=>(
            <Icon name="user-plus"></Icon>
        )
    }
    constructor(props){
        super(props)
        this.state=({photo:null, name: '', email:'', phone: '', message:'', showMessage:false, error :"", showError: false, loading: false})

    }
    openMyDrawer=()=>{
        this.props.navigation.openDrawer();
    }
    callHome=()=>{
        this.props.navigation.navigate("Home")
    }

    clearError=()=>{
        this.setState({showError: false, error: ""})
    }

    saveData=()=>{
        if(this.state.name.trim().length <=0 ){
            this.setState({error: "The name field is required.", showError: true})
            return;
        }
        if(this.state.email.trim().length <=0 ){
            this.setState({error: "The email field is required.", showError: true})
            return;
        }
        if(this.state.phone.trim().length <=0 ){
            this.setState({error: "The phone field is required.", showError: true})
            return;
        }

        Firebase.database().ref("students").push({
            name: this.state.name,
            email: this.state.email,
            phone:this.state.phone,
            photo: this.state.photo.split('/').pop()
        })
        .then(res=>{
            this.setState({showMessage:true, message: "The new user have been created.",photo:'', name: '', email:'', phone:''})

            setTimeout(()=>{
                this.setState({showMessage: false, message: ""}) 
            }, 3000)
        })
        .catch(err=>{
            console.log(err)
        })

        this.uploadImage(this.state.photo)


    }

    uploadImage = async(uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const filename=uri.split("/").pop();
        var ref = Firebase.storage().ref("students").child(filename);
        return ref.put(blob);
      }

    componentDidMount=()=>{
        this.getPermissionAsync();
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          const {status1}=await Permissions.askAsync(Permissions.CAMERA)
          if (status !== 'granted' && status1 !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      }
    pickImage=async()=>{
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
          });
      
          console.log(result);
         
      
          if (!result.cancelled) {
            this.setState({ photo: result.uri });
          }
          
          console.log(filename)
    }

    render(){
        return(
            <View>
                <Header
                    placement="center"
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: ()=>this.openMyDrawer() }}
                    centerComponent={{ text: 'Add User', style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={{ icon: 'home', color: '#fff' ,onPress:()=>this.callHome()}}
                    />
                  {
                      this.state.showError && (
                          <View style={styles.error}>
                              <Text style={{color: "red"}}>{this.state.error}</Text>
                          </View>
                      )
                  }
                  {
                      this.state.showMessage && (
                          <View style={styles.message}>
                              <Text style={{color: "green"}}>{this.state.message}</Text>
                          </View>
                      )
                  }
                <Card>
                    <View style={{marginBottom: 20}}>

                    <View style={{margin: 20, justifyContent:'center', alignItems:'center'}}>
                    {this.state.photo &&
                            <Image source={{ uri: this.state.photo }} style={{ width: 100, height: 100 }} />}
                            <TouchableOpacity onPress={()=>this.pickImage()} style={{justifyContent:'center' , alignItems:'center'}}>
                                <Text><Icon name="camera"></Icon> Choose Image</Text>
                            </TouchableOpacity>
                    </View>

                    <Input 
                    onFocus={()=>this.clearError()}
                    onChangeText={(t)=>this.setState({name: t})}
                    value={this.state.name}
                    label="Name"
                    labelStyle={{fontSize: 12}}
                    returnKeyType="go"
                    rightIcon={
                        <Icon name="user"></Icon>
                    }
                    ></Input>
                    </View>
                   <View style={{marginBottom: 20}}>
                   <Input
                   onFocus={()=>this.clearError()}
                   autoCompleteType="email"
                   autoCapitalize="none"
                    onChangeText={(t)=>this.setState({email: t})}
                    value={this.state.email}
                    label="Email"
                    labelStyle={{fontSize: 12}}
                    returnKeyType="go"
                    keyboardType="email-address"
                    rightIcon={
                        <Icon name="envelope"></Icon>
                    }
                    ></Input>
                   </View>
                    
                   <View style={{marginBottom: 20}}>
                   <Input
                   onFocus={()=>this.clearError()}
                   autoCompleteType="tel"
                    onChangeText={(t)=>this.setState({phone: t})}
                    value={this.state.phone}
                    label="Phone"
                    labelStyle={{fontSize: 12}}
                    returnKeyType="done"
                    keyboardType="number-pad"
                    rightIcon={
                        <Icon name="phone"></Icon>
                    }
                    ></Input>
                   </View>
                   <View>
                       <Button title="Save" onPress={()=>this.saveData()} ></Button>
                   </View>
                </Card>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    error:{
        borderRadius: 5, 
        borderColor: "red", 
        borderWidth: 1, 
        padding: 10,
         marginTop: 10,
          marginRight: 20,
           marginLeft: 20
        },
        message:{
            borderRadius: 5, 
            borderColor: "green", 
            borderWidth: 1, 
            padding: 10,
             marginTop: 10,
              marginRight: 20,
               marginLeft: 20
            }
})