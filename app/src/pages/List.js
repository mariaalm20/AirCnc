import React, {useState, useEffect} from 'react'
import {SafeAreaView,  Image, ScrollView, StyleSheet, Text} from 'react-native'

import socketio from 'socket.io-client'

import AsyncStorage from '@react-native-community/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'

import logo from '../assets/logo.png'
import SpotList from '../components/SpostList'

export default function List({navigation}){
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((user_id) => {
                const socket = socketio('http://192.168.15.11:3334', {
                    query: { user_id }
                })

                socket.on('booking_response', booking => {
                    Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
                })
            })
    },[])
    
    useEffect(()=>{
        AsyncStorage.getItem('techs').then((storageTechs) => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim())
            setTechs(techsArray)
        })
    }, [])


    async function logout() {
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
    }
    
    return(
        <SafeAreaView style = {styles.container}>
             <TouchableOpacity onPress={logout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <ScrollView>
                { techs.map(tech=> <SpotList key={tech} tech={tech} /> )}
            </ScrollView>
        </SafeAreaView>
    )
        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10
    }
})