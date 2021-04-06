import React, {useEffect, useState} from 'react'
import { ActivityIndicator, Alert } from 'react-native';
import {View, StyleSheet, TextInput, ScrollView, Button} from 'react-native';
import { State } from 'react-native-gesture-handler';
import firebase from '../database/firebase'
const UserDetailScreen = (props) => {

    const [user, setUser] = useState();

    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: '',
    }

    const [loading , setLoading] = useState(true)

    const getUserById =  async (id) => {
        const dbRef = firebase.db.collection('users').doc(id)
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
          ...user,
          id: doc.id,
        });
        setLoading(false);
    };

    useEffect(()=> {
        getUserById(props.route.params.userId);
    }, []);

    const handleChangeText = (name, value) => {
      setUser({ ...user, [name]: value});
    };

    const deleteUser = async () =>{
      const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
      await dbRef.delete();
      props.navigation.navigate('UsersList');

    }

    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone
        })
        setUser(initialState)
        props.navigation.navigate('UsersList');
    }

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar usuario', '¿Estás seguro?',[
          {text: 'Si', onPress: ()=> deleteUser()},
          {text: 'No', onPress: ()=> console.log('Cancelado')},
        ])
    }

    if(loading) {
      return (
        <View>
            <ActivityIndicator size="large" color="#9e9e9e" />
        </View>
      );
    }

    return(
      <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Nombre usuario"
          value={user.name} 
          onChangeText={(value) => handleChangeText('name',value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Correo usuario"
          value={user.email}
          onChangeText={(value) => handleChangeText('email',value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
          placeholder="Teléfono usuario"
          value={user.phone}
          onChangeText={(value) => handleChangeText('phone',value)}
        />
      </View>
      <View>
        <Button color="#E37399" title="Actualizar usuario" onPress={() => updateUser()}/>
      </View>
      <View>
        <Button color="#E37399" title="Eliminar usuario" onPress={() => openConfirmationAlert()}/>
      </View>
    </ScrollView>
    )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding : 35
  },
  inputGroup: {
    flex: 1,
    padding:0,
    marginBottom:15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default UserDetailScreen