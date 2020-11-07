import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {BarCodeScanner} from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

export default class TransactionScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      hasCameraPermissions:null,
      scanned:false,
      scannedData:''
    }
  }
  getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    if(status==='granted'){
      this.setState({hasCameraPermissions:true})
    }
    else{
      this.setState({hasCameraPermissions:false})
    }
  }
  afterScan=async({type,data})=>{
    this.setState({scanned:true,scannedData:data})
    console.log(this.state.scannedData)
  }
    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions
      const scanned = this.state.scanned
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Issue or Return</Text>
          <Text>{
            (hasCameraPermissions===true)?
              this.state.scannedData:
              "Camera permission not enabled"
          }</Text>
          <TouchableOpacity style = {styles.button} onPress = 
          {this.getCameraPermissions}>
          <Text style={styles.text}>Scan QR Code</Text>
          </TouchableOpacity>
          <BarCodeScanner onBarCodeScanned={scanned?undefined:this.afterScan}/>
        </View>
      );
      }
    }
  
  const styles = StyleSheet.create({
    button: {
      flex: 1,
      backgroundColor: "lavender",
      alignItems: "center",
      justifyContent: "center",
      borderRadius:150,
      width:80,
      height:80
    },
    text: {
      textAlign: "center",
      fontSize:14
    }
  });