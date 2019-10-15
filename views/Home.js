import React, {Component } from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {Header, Card} from 'react-native-elements'

export default class Home extends Component{
    static navigationOptions={
        drawerLabel:"Home",
        drawerIcon:()=>(
            <Icon name="home"></Icon>
        )
    }
    constructor(props){
        super(props)
    }
    openMyDrawer=()=>{
        this.props.navigation.openDrawer();
    }
    callHome=()=>{
        this.props.navigation.navigate("Home")
    }
    render(){
        return(
            <View>
                <Header
                    placement="center"
                    leftComponent={{ icon: 'menu', color: '#fff' ,onPress: ()=>this.openMyDrawer()}}
                    centerComponent={{ text: 'My Awesome App', style: { color: '#fff' , fontSize: 20,} }}
                    />
                <View style={styles.container}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate("Newuser")}>
                        <Card>
                            <Text>
                                <Icon color="royalblue" size={14} name="user-plus"></Icon>
                            </Text>
                            <Text style={styles.cartText}>
                                Add User
                            </Text>
                        </Card>
                    </TouchableOpacity>
                    
                    <TouchableOpacity  onPress={()=>this.props.navigation.navigate("Users")}>
                        <Card>
                            <Text>
                                <Icon color="royalblue" size={14} name="users"></Icon>
                            </Text>
                            <Text style={styles.cartText}>
                                Users
                            </Text>
                        </Card>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        padding: 20
    },
    
    cartText:{
        fontSize: 14,
        color: "royalblue",
        marginTop: 20,
    },
    

})