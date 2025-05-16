import { Text, View, SafeAreaView, StyleSheet, TextInput, Pressable, Image, StatusBar,Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { LoadingModal } from "react-native-loading-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker';
import { SIZES } from "../../Constants/Theme";


const Register = ({navigation}) => {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState('customer')
  const [loading, setLoading] = useState(false);
  const [file, setUserImage] = useState(null)

  const handleChange = (key,value) =>{
    if (key === 'name') {
      setName(value);
    } else if (key === 'password') {
      setPassword(value);
    }else if (key === 'email') {
      setEmail(value);
    }else if (key === 'phone') {
      setPhone(value);
    }
    else if (key === 'confirm') {
      setConfirmPassword(value);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserImage(result.assets[0].uri);
    }
  };

  const handleCreateAccount = async () => {
    try {
      setLoading(true);
      const formData = new FormData()
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      if(file){
        formData.append('file', {
          uri: file,
          name: 'user_image.jpg',
          type: 'image/jpeg',
        });
      }
      if(!file){
        await AsyncStorage.removeItem("userImage")
      }
      const response = await axios.post('https://pharmacy-ordering-server.onrender.com/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        }
      }); 
      if(response.status === 201){
        const {email} = response.data.user;
        const {_id} = response.data.user
        await AsyncStorage.multiSet([
          ['user_id', _id],
          ['email', email],
        ]);
        Alert.alert("Success ✔️","User created succesful")
        navigation.navigate("OTP")
      }
      if(response.status === 208){
        Alert.alert("Warning ⚠️","User already exist")
      }
      if(confirm_password === ''){
        Alert.alert("Warning ⚠️","Password doesnt tally!")
      }
    } catch (error) {
      // Alert.alert("Warning ⚠️", "Something went wrong")
      console.log(error)
      setLoading(false);
     
    }finally {
      setLoading(false); 
    }
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <StatusBar
         backgroundColor="white" 
         barStyle="dark-content" 
      />
       <Pressable style={styles.arrowIconContainer}
       onPress={() => navigation.goBack()} 
       >
         <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
       <View style={styles.itemsContainer}>
       <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Create an account</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
           placeholder='Full Name' 
           style={styles.input}
           onChangeText={(value)=>handleChange('name', value)}
           value={name}
           />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
           placeholder='Email' 
           style={styles.input}
           onChangeText={(value)=>handleChange('email', value)}
           value={email}
           />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
           placeholder='Phone Number' 
           style={styles.input}
           onChangeText={(value)=>handleChange('phone', value)}
           value={phone}
           />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
           placeholder='Password' 
           style={styles.input}
           onChangeText={(value)=>handleChange('password', value)}
           value={password}
           />
          <View style={styles.inputIconContainer}>
           <Feather name="eye" size={24} color="black" style={styles.inputIcon}/>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
           placeholder='Confirm Password' 
           style={styles.input}
           onChangeText={(value)=>handleChange('confirm', value)}
           value={confirm_password}
           />
          <View style={styles.inputIconContainer}>
           <Feather name="eye" size={24} color="black" style={styles.inputIcon}/>
          </View>
        </View>
        <View style={styles.imageContainer}>
                 <Pressable style={styles.imageBtn} onPress={pickImage}>
                   <Text style={styles.imageBtnText}>Choose Image</Text>
                 </Pressable>
                  {file ? (
                 <Image
                  source={{ uri: file }}
                  style={{ width: 100, height: 50 }}
                 />
                  ) : (
                 <Text style={{ paddingLeft: SIZES.width * 0.03 }}>
                   No file chosen
                </Text>
                 )}
            </View>
        <Pressable 
         style={styles.btnContainer}
         onPress={handleCreateAccount}
         >
          <Text style={styles.btnText}>Register</Text>
        </Pressable>
        <Pressable style={styles.googleBtnContainer}>
          <View style={styles.googleTextImgContainer}>
              <Text style={styles.googlebtnText}>Register with Google</Text>
              <Image source={require('../../assets/google.png')}/>
          </View>
        </Pressable>
        <View style={styles.haveAccountContainer}>
           <Text style={styles.haveAccountText}>Already have an account?</Text>
           <Text
            onPress={()=>navigation.navigate("Login")} 
            style={styles.clickHere}>Login</Text>
        </View>
        {loading && <LoadingModal modalVisible={true} />} 
       </View>
       </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#fff',
    height:'100%'
  },
  arrowIconContainer:{
    marginLeft:'7%',
    paddingTop:'5%'
  },
  itemsContainer:{
    alignItems: 'center',
    width:'100%',
    height:'100%',
    paddingTop:'2%'
  },
  headerContainer:{
    display:'flex',
    paddingBottom:'5%'
  },
  headerText:{
    fontSize:20
  },
  inputContainer:{
    margin:'5%',
    width:'80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, 
    paddingHorizontal: 10,
    marginBottom: 10,
    display:'flex',
    flexDirection:'row'
  },
  input:{
    padding:'1%',
    width: '92%',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputIconContainer:{
    alignItems:'center',
    justifyContent:'center'
  },
  haveAccountContainer:{
    alignItems:'center',
    justifyContent:'center',
    paddingTop:'3%',
    paddingBottom:'4%',
    display:'flex',
    flexDirection:'row'
  },
  forgotText:{

  },
  clickHere:{
    color:'blue',
    paddingLeft:'1%'
  },
  btnContainer:{
    backgroundColor:'blue',
    padding:'3%',
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, 
    paddingHorizontal: 10,
    marginBottom: '7%',
    alignItems:'center',
    marginTop:'5%'
  },
  googleBtnContainer:{
    backgroundColor:'white',
    padding:5,
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5, 
    paddingHorizontal: 10,
    marginBottom: 10,
    alignItems:'center'
  },
  googleTextImgContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10
  },
  btnText:{
    color:'white'
  },
  googlebtnText:{
    color:'black'
  },
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: SIZES.height * 0.02,
  },
  imageBtn: {
    backgroundColor: 'darkgray',
    borderRadius: 3,
    padding: SIZES.height * 0.006,
  },
  imageBtnText: {
    color: 'white',
  },
})
export default Register