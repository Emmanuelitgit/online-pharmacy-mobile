import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState(null); 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  const [quantity, setQuantity] = useState(1); 



  const handleQuantityIncrement = async () => {
    setQuantity((prev)=> quantity+1)
  };

  const handleQuantityDecrement = async () => {
    setQuantity((prev)=>quantity-1)
  };

  const login = async (email, password) => {
    try {
      setLoading(true);

      const response = await axios.post('https://pharmacy-ordering-server.onrender.com/login', {
        email,
        password,
      });
      if (response.status === 200) {
        const { name, email: userEmail, file, phone } = response.data.user;
        const { refreshToken, token } = response.data;

        const userData = {
          name,
          email: userEmail,
          phone: phone.toString(),
          token,
          refreshToken,
          file: file || null,
        };

        await AsyncStorage.multiSet([
          ['userName', name],
          ['userEmail', email],
          ['refreshToken', refreshToken],
          ['token', token],
          ['phone', phone.toString()],
        ]); 

        setUser(userData);
        setIsLoggedIn(true);

        Alert.alert('Success ✔️', 'Logged in successfully');
      }
    } catch (error) {
      console.error('Login Error:', error);

      if (error.response) {
        if (error.response.status === 404) {
          Alert.alert('Not Found ⚠️', 'Incorrect password or username');
        } else if (error.response.status === 401) {
          Alert.alert('Unauthorized ⚠️', 'Please make sure to be verified');
        } else {
          Alert.alert('Error', 'Something went wrong. Please try again.');
        }
      } else {
        Alert.alert('Error', 'Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await AsyncStorage.multiRemove(
        [
        'userName', 
        'userEmail', 
        'refreshToken', 
        'token', 
        'phone',
        'product_id',
        'price',
        'location',
        'quantity'
      ]);

      setUser(null);
      setIsLoggedIn(false);

      Alert.alert('Success ✔️', 'Logged out successfully');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductFilter = (cat) =>{
    const data = products.filter((item)=> item.cat === cat)
    if(data){
      setFilteredProducts(data)
    }else{
      setFilteredProducts(products)
    }
}

const handleViewAllProducts = () =>{
  setFilteredProducts(products)
}

useEffect(() => {
  const getProducts = async () => {
    if (!isLoggedIn) {
      console.log('User not logged in. Skipping product fetch.');
      return;
    }

    try {
      const response = await axiosInstance.get('/all-medicine');
      console.log('Products response:', response);
      if (response.status === 200) {
        const { medicines } = response.data;
        console.log('Medicines fetched:', medicines);
        setProducts(medicines);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized access while fetching products.');
      }
    }
  };
  getProducts();
}, [isLoggedIn]);


  return (
    <AuthContext.Provider
      value={{
        loading,
        isLoggedIn,
        login,
        logout,
        handleProductFilter,
        filteredProducts,
        products,
        handleViewAllProducts,
        quantity,
        handleQuantityIncrement,
        handleQuantityDecrement
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};