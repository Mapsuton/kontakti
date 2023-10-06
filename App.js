import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts(data);
        console.log(data[1]);
      }
    }
  }


  return (
    <View style={styles.container} >
      <FlatList 
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
      <View style={styles.list}>
      <Text>{item.firstName} {item.lastName} {item?.phoneNumbers[0]?.number} </Text>
      </View>}
      data={contacts}
      />
      <Button style={styles.button} title="Get contacts" onPress={getContacts}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%',
    marginTop: 5,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

