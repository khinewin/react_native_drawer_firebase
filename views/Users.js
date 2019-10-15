import React, {Component } from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Header, Card, Button} from 'react-native-elements'
import Firebase from './Firebase'

export default class Users extends Component{

    static navigationOptions={
        drawerLabel: "Users",
        drawerIcon:()=>(
            <Icon name="users"></Icon>
        )
    }
    constructor(props){
        super(props)
        this.state=({users: [], loading: false, message:'', showMessage:false})
    }
    componentDidMount=()=>{
        this.fetchUsers();
    }

    fetchUsers=()=>{
        Firebase.database().ref("students").once('value')
        .then((users)=>{
           const data=[]
           const u=users.val();
           for(let i in u){
                data.unshift({
                    id: i,
                    name: u[i].name,
                    email: u[i].email,
                    phone: u[i].phone
                })
           }
           this.setState({users: data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onRefresh=()=>{
        this.fetchUsers();
    }

    openMyDrawer=()=>{
        this.props.navigation.openDrawer();
    }
    callHome=()=>{
        this.props.navigation.navigate("Home")
    }
    deleteUser=(id)=>{
        Firebase.database().ref("students/" + id).remove()
        .then((res)=>{
            this.setState({message: "The selected user have been deleted.", showMessage: true})
            this.fetchUsers();
            setTimeout(()=>{
                this.setState({message:'', showMessage:false})
            }, 3000)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    confirmDelete=(id)=>{
        Alert.alert(
            "Warning !",
            "This will delete the selected user",
            [
                {text: "Cancel", style: "cancel"},
                {text: "Confirm", style: "destructive", onPress:()=>this.deleteUser(id)}
            ]
        )
    }
    render(){
        return(
            <View>
                <Header
                    placement="center"
                    leftComponent={{ icon: 'menu', color: '#fff' ,onPress: ()=>this.openMyDrawer()}}
                    centerComponent={{ text: 'Users', style: { color: '#fff' , fontSize: 20} }}
                    rightComponent={{ icon: 'home', color: '#fff' ,onPress:()=>this.callHome()}}
                    />
                     {
                      this.state.showMessage && (
                          <View style={styles.message}>
                              <Text style={{color: "green"}}>{this.state.message}</Text>
                          </View>
                      )
                  }
                <FlatList
                style={{marginTop: 10,marginBottom: 80}}
                keyExtractor={(i)=>i.id}
                data={this.state.users}
                refreshing={this.state.loading}
                onRefresh={()=>this.onRefresh()}
                renderItem={(user)=>{
                    return(
                        <View style={styles.myList}>
                            <View>
                                <Text style={styles.myListText}><Icon name="user"></Icon> {user.item.name}</Text>
                                <Text style={styles.myListText}><Icon name="envelope"></Icon> {user.item.email}</Text>
                                <Text style={styles.myListText}><Icon name="phone"></Icon> {user.item.phone}</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{margin: 5, width: "50%"}}>
                                    <Button
                                    
                                    onPress={()=>this.props.navigation.navigate("Edit", {user: user.item})}
                                   type="outline"
                                    icon={
                                        <Icon name="edit" color="#69a2ff"></Icon>
                                    }></Button>
                                </View>
                                <View style={{margin: 5, width: "50%"}}>
                                    <Button 
                                    
                                    onPress={()=>this.confirmDelete(user.item.id)}
                                    type="outline"
                                    icon={
                                        <Icon color="#ff0000" name="trash"></Icon>
                                    }>

                                    </Button>
                                </View>
                            </View>
                        </View>
                    )
                }}
                ></FlatList>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    myList:{
        borderWidth: 1,
        borderColor: "royalblue",
        padding: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        borderRadius: 10,
    },
    myListText:{
        padding: 5
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