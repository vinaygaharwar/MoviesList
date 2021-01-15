/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, TextInput,ScrollView,Image,Modal,TouchableHighlight} from 'react-native';

export default function App() {
  const apiurl="http://www.omdbapi.com/?apikey=fce94026";
  const [state, setState]=useState(
    {
      s:"Enter movie..",
      results:[],
      selected:{}
    }
  );

  const search = () =>{
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;
        
      setState(prevState=>{
        return{ ...prevState,results:results}
      })
    })
  }

  const Nextpage= id =>{
    axios(apiurl + "&i=" + id).then(({data})=>{
      let result=data;
      
      setState(prevState=>{
        return{...prevState,selected:result}
      });
    });
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movies List</Text>
      <TextInput
      style={styles.searchbox}
      onChangeText={text=>setState(prevState=>{
        return{...prevState,s: text}
      })}
      onSubmitEditing={search}
      value={state.s}
      />

      <ScrollView style={styles.results}>
        {state.results.map(result=>(
          <TouchableHighlight 
           key={result.imdbID}
            onPress={()=>Nextpage(result.imdbID)}>
          <View style={styles.result} >
            <Image
            source={{ uri: result.Poster}}
            style={{
              width:300,
              height:300
            }}
            
            />
            <Text style={styles.heading}>{result.Title}</Text>
          </View>
          </TouchableHighlight>
        ))}
      </ScrollView>

      <Modal 
      
      visible={(typeof state.selected.Title !="undefined")}>
        <View style={styles.page}>
          <Text style={styles.pagetitle}>{state.selected.Title}</Text>
          <Text style={{marginBottom:20}}>Rating:{state.selected.imdbRating}</Text>
          <Text style={styles.plot}>{state.selected.Plot}</Text>
      
    </View>
    <TouchableHighlight 
    onPress={()=>setState(prevState=>{ 
      return{...prevState,selected:{}}
    })}>
      <Text style={styles.BackBtn}>Back</Text>

    </TouchableHighlight>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor: 'black',
    },
  title:{
    color:'white',
    fontSize:32,
  },
searchbox:{
  color:'black',
  backgroundColor:'white',
  fontSize:20,
  fontWeight:'300',
 padding:20,
 width:'100%',
 marginBottom:40
},
results:{
  flex:1,
},
result:{
  flex:1,
  width:'100%',
  marginBottom:20
},
heading:{
  color:'white',
  fontSize:18,
  fontWeight:'700',
  padding:20,
  backgroundColor:'red'
},
page:{
padding:30
},
pagetitle:{
  fontSize:24,
  fontWeight:'700',
  marginBottom:5
},
plot:{
  color:'black',
  fontSize:22,
  fontWeight:'800'
},
BackBtn:{
  padding:20,
  fontSize:20,
  fontWeight:'700',
  color:'white',
  backgroundColor:'red'
}
});