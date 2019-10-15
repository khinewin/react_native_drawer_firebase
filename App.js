import React, {Component } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {createAppContainer} from 'react-navigation'
import Users from './views/Users'
import Newuser from './views/Newuser'
import Home from './views/Home'
import Edit from './views/Edit'

import {createDrawerNavigator} from 'react-navigation-drawer'

export default class App extends Component{

    render(){

        const AppDrawer=createDrawerNavigator({
            Home: {
                screen: Home
            },
            Users:{
                screen: Users
            },
            Newuser : {
                screen: Newuser
            },
            Edit :{
                screen: Edit
            }
           
        },{
            initialRouteName: "Home"
        })

        const AppContainer=createAppContainer(AppDrawer)

        return(
           <AppContainer></AppContainer>
        )
    }
}