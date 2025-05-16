import { SafeAreaView, View, Text, Pressable, TextInput, StyleSheet, StatusBar, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SIZES } from '../../Constants/Theme';
import {useState, useEffect} from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../utils/axiosInstance';


export const AppointmentTime = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false)



  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const handleAppointment = async() => {
    try {
      setLoading(true);
      const id = await AsyncStorage.getItem("doctor_id")
      const profile = await AsyncStorage.getItem("doctor_profile")
      const name = await AsyncStorage.getItem("doctor_name")
      const role = await AsyncStorage.getItem("doctor_role")

      const response = await axiosInstance.post(`/add-appointment`, {
        doctor:id,
        date:date.toLocaleDateString(),
        time:time.toLocaleTimeString(),
        status:false
      });
      if (response.status === 201) {
        Alert.alert('Appointment Successful', 'Your appointmnet has been received.');
        navigation.navigate('AppointmentSuccess'); 
      } 
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
         backgroundColor="white" 
         barStyle="dark-content" 
      />
      <View style={styles.itemsContainer}>
        <View style={styles.inputsContainer}>
            <Text style={styles.header}>Select your appointment time and date below.</Text>
          <Pressable style={styles.inputContainer} onPress={showDatepicker}>
            <TextInput
              placeholder='Select Date'
              style={styles.input}
              editable={false}
              value={date.toLocaleDateString()} 
            />
          </Pressable>
          <Pressable style={styles.inputContainer} onPress={showTimepicker}>
            <TextInput
              placeholder='Select Time'
              style={styles.input}
              editable={false}
              value={time.toLocaleTimeString()}  // Show only time
            />
          </Pressable>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}
        <View style={styles.buttonContainer}>
       <Pressable style={styles.buttonItem}
       onPress={handleAppointment}
       >
         <Text style={styles.btnText}>Book Appointmnet</Text>
       </Pressable>
       </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemsContainer: {
    alignItems: 'center',
    paddingTop: '40%',
  },
  inputContainer: {
    margin: '5%',
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: '3%',
    width: '100%',
  },
  header:{
    paddingBottom:'10%',

  },
  buttonItem:{
    backgroundColor:'blue',
    width:SIZES.width*0.6,
    padding:SIZES.height*0.017,
    borderRadius:10,
    alignItems:'center'
},
buttonContainer:{
    alignItems:'center',
    paddingTop:'20%'
},
btnText:{
    color:'white'
}
});

export default AppointmentTime;