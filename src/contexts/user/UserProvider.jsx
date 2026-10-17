import { useEffect, useState } from 'react';

import { UserContext } from "./UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { useSecureState } from '../../hooks/useSecureState';

export default function UserProvider({
    children,
}) {
    const [state, setState] = useSecureState('user', null);

    useEffect(() => {
        loadUser();
    }, []);

    const loginHandler = async (user,accessToken) => {
        const newState = {
            ...user,
            accessToken
        };

        await setState(newState);
    };

    // const saveUser = async (userData) => {
    //     try {
            

    //         setState(userData);
    //     } catch (error) {
    //         console.error('Failed to save user data to SecureStore', error);
    //     }
    // }

    // const loadUser = async () => {
    //     try {
    //         const userDataString = await SecureStore.getItemAsync('user');
            
    //         if (userDataString) {
    //             const userData = JSON.parse(userDataString);
    //             setState(userData);
    //         }
    //     } catch (error) {
    //         console.error('Failed to load user data from SecureStore', error);
    //     }
    // }

    const logout = () => {
        setState(null);
    };

    const contextData = {
        isAuthenticated: !!state,
        user: state,
        login: loginHandler,
        logout,
    };

    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    );
}
