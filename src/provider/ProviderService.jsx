import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = createContext();

import registerUser from '../api/Register'
import loginUsers from '../api/LoginAuth'

function AuthProvider({ children }) {

    const [deviceNew, setDeviceNew] = useState(false);
    const [authentication, setAuthentication] = useState(false);
    const [account, setAccount] = useState(null)

    const SetDevice = async () => {
        setDeviceNew(true);
        try {
            await AsyncStorage.setItem("deviceNew", "false");
        } catch (e) {}
    };

    const checkDeviceStatus = async () => {
        try {
            const value = await AsyncStorage.getItem("deviceNew");

            if (value == "false") {
            	setDeviceNew(true)
            }else{
            	setDeviceNew(false)
            	await AsyncStorage.setItem("deviceNew", "true");
            }
        } catch (e) {
            console.error("Gagal membaca status device:", e);
        }
    };


    const register = async (userData) => {
    	const result = await registerUser(userData)
    	return result
    }

    const loginUser = async(userData) => {
    	const result = await loginUsers(userData)
    	if (result.status) {
    		const users = JSON.stringify(result.data.users);
    		setAccount(users)
    		await AsyncStorage.setItem('acounts', users);
    		setAuthentication(true)
    	}
    	return result
    }

    const logoutUser = async () => {
    	try{
    		await AsyncStorage.removeItem('acounts')
    		setAuthentication(false)
    		setAccount(null)
    		return true
    	}catch(er){
    		return false
    	}
    }

     const checkAuthentication = async () => {
        try {
            const storedUser = await AsyncStorage.getItem("acounts");
            if (storedUser) {
                setAuthentication(true);
                setUser(JSON.parse(storedUser));
                setAccount(storedUser)
            } else {
                setAuthentication(false);
            }
        } catch (e) {
            console.error("Gagal membaca data autentikasi:", e);
        }
    };

    useEffect(() => {
    	checkDeviceStatus()
    	checkAuthentication()
    }, []);

    return (
        <AuthContext.Provider
            value={{
                SetDevice,
                deviceNew,
                authentication,
                register,
                loginUser,
                logoutUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
