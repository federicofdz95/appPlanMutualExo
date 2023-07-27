import React from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const Loading = () => {
  return (
    <>
        <ActivityIndicator style={{textAlign:'center',width: vw(100),}} size="small" color="#0000ff" />
    </>
  )
}

export default Loading