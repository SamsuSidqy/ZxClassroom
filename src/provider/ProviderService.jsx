import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AuthContext = createContext();

import registerUser from '../api/Register'
import loginUsers from '../api/LoginAuth'
import ListKelas from '../api/ListKelas'
import ListTugas from '../api/ListTugas'
import CreateKelas from '../api/CreateKelas'
import JoinKelas from '../api/JoinKelas'
import CreateTugas from '../api/CreateTugas'
import ListPeopleKelas from '../api/ListPeopleKelas'
import DetailTugas from '../api/DetailTugas'
import CreateAnnounce from '../api/CreateAnnounce'
import KirimTugas from '../api/KirimTugas'
import MyAsigsments from '../api/MyAsigsments'
import TeacherAsigsment from '../api/TeacherAsigsment'
import UpdateKelas from '../api/UpdateKelas'
import DetailKelas from '../api/DetailKelas'
import UpdateUsers from '../api/UpdateProfile'
import ListPesan from '../api/PesanList'

function AuthProvider({ children }) {

    const [deviceNew, setDeviceNew] = useState(false);
    const [authentication, setAuthentication] = useState(false);
    const [account, setAccount] = useState(null)
    const [refreshGlobal, setRefreshGlobal] = useState(false);

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
    		await AsyncStorage.setItem('acounts', users);
    		setAccount(result.data.users)
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
                setAccount(JSON.parse(storedUser))
            } else {
                setAuthentication(false);
            }
        } catch (e) {
            console.error("Gagal membaca data autentikasi:", e);
        }
    };

    const ListKelasData = async () => {
    	try{
    		const storedUser = await AsyncStorage.getItem('acounts');
        	const userObj = storedUser ? JSON.parse(storedUser) : {};

        	const result = await ListKelas(userObj.token,userObj.refresh_token)
        	return result
    	}catch(er){
    		return false
    	}
    }

    const ListTugasData = async(id_kelas) => {
    	try{
    		const storedUser = await AsyncStorage.getItem('acounts');
        	const userObj = storedUser ? JSON.parse(storedUser) : {};
    		const result = await ListTugas(userObj.token,userObj.refresh_token,id_kelas)
    		return result
    	}catch(er){
    		return false
    	}
    }

    const BuatKelas = async(data) => {
    	try{
    		const storedUser = await AsyncStorage.getItem('acounts');
        	const userObj = storedUser ? JSON.parse(storedUser) : {};
    		const result = await CreateKelas(userObj.token,userObj.refresh_token,data)
    		return result
    	}catch(er){
    		console.log(false)
    	}
    }

    const IkutKelas = async(data) => {
    	try{
    		const storedUser = await AsyncStorage.getItem('acounts');
        	const userObj = storedUser ? JSON.parse(storedUser) : {};
    		const result = await JoinKelas(userObj.token,userObj.refresh_token,data)
    		return result
    	}catch(er){
    		console.log(false)
    	}
    }

    const BuatTugas = async(form) => {
    	try{
    		const storedUser = await AsyncStorage.getItem('acounts');
        	const userObj = storedUser ? JSON.parse(storedUser) : {};
    		const result = await CreateTugas(userObj.token,userObj.refresh_token,form)
    		return result
    	}catch(er){
    		console.log(er)
    	}
    }

    const BuatPengumuman = async(form) => {
        try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await CreateAnnounce(userObj.token,userObj.refresh_token,form)
            return result
        }catch(er){
            console.log(er)
        }
    }

    const ListKelasPeople = async(kodeKelas) => {
        try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await ListPeopleKelas(userObj.token,userObj.refresh_token,kodeKelas)
            return result
        }catch(er){
            return false
        }
    }

    const TugasDetail = async(idKelas) => {
        try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await DetailTugas(userObj.token,userObj.refresh_token,idKelas)
            return result
        }catch(er){
            return false
        }
    }

    const TugasKirim = async(form) => {
        try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await KirimTugas(userObj.token,userObj.refresh_token,form)
            console.log(result)
            return result
        }catch(er){
            return false
            console.log(er)
        }
    }

    const MyAsigsment = async(idKelas) => {
        try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await MyAsigsments(userObj.token,userObj.refresh_token,idKelas)
            return result
        }catch(er){
            return false
            console.log(er)
        }
    }

    const TeacherAsigsments = async(idKelas) => {
         try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await TeacherAsigsment(userObj.token,userObj.refresh_token,idKelas)
            return result
        }catch(er){
            return false
            console.log(er)
        }
    }

    const KelasUpdate = async(data,kode) => {
        try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await UpdateKelas(userObj.token,userObj.refresh_token,data,kode)
            return result
        }catch(er){
            return false
            console.log(false)
        }
    }

    const UpdateProfile = async(body) => {
        try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await UpdateUsers(userObj.token,userObj.refresh_token,body)
            if (result.status) {
                setAccount(result.data.data)
                await AsyncStorage.setItem('acounts', JSON.stringify(result.data.data));
            }
            return result
        }catch(er){
            console.log(er)
            return false
        }
    }

    const KelasDetail = async(idKelas) => {
         try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await DetailKelas(userObj.token,userObj.refresh_token,idKelas)
            return result
        }catch(er){
            return null
            console.log(er)
        }
    }

    const PesanList = async(room) => {
         try{
            const storedUser = await AsyncStorage.getItem('acounts');
            const userObj = storedUser ? JSON.parse(storedUser) : {};
            const result = await ListPesan(userObj.token,userObj.refresh_token,room)
            return result
        }catch(er){
            return null
            console.log(er)
        }
    }
    

    useEffect(() => {
    	checkDeviceStatus()
    	checkAuthentication()
    }, []);

    return (
        <AuthContext.Provider
            value={{
                SetDevice,
                deviceNew,
                account,
                authentication,
                register,
                loginUser,
                logoutUser,
                ListKelasData,
                ListTugasData,
                BuatKelas,
                IkutKelas,
                BuatTugas,
                ListKelasPeople,
                TugasDetail,
                BuatPengumuman,
                TugasKirim,
                MyAsigsment,
                TeacherAsigsments,
                KelasUpdate,
                KelasDetail,
                UpdateProfile,
                PesanList
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
