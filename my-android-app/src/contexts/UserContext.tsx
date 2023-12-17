import React, { useState, createContext, useEffect, PropsWithChildren }from "react";
import { User, UserContextType } from '../data/objectTypes';
import { Alert } from "react-native";

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({children}: PropsWithChildren) => {
   const [user, setUser] = useState<User|undefined>()
   const [isLoading, setIsLoading] = useState(true)

   useEffect(()=>{
      const fetchData = async () => {
         try {

            const response = await fetch('https://randomuser.me/api/?inc=gender,login,id,name,location,dob,cell,picture,nat&noinfo');
            const result = await response.json()
            let newUser: User = {
               id: result.results[0].id.value,
               username: result.results[0].login.username,
               password: result.results[0].login.password,
               matches: [],
               pictures: [result.results[0].picture.thumbnail],
               age: 20,
               location: result.results[0].location.city,
               interests: ['musica','correr'],
               filter: {ageRange: [20,30]}
            }
            return newUser
         }
         catch(error) {
            console.error('Error fetching user data:', error);
            throw error;
         }
      }
      fetchData()
      .then(async (newUser) => {
         setUser(newUser);
         setIsLoading(false);
      })
      .catch((error) => {
         // Handle error appropriately, e.g., show an alert
         Alert.alert('Error', 'Failed to fetch user data');
      });
   },[])
   useEffect(() => {
      console.log(user);
   }, [user]);

   const updateUser = (newUser: User) => {
      setUser(newUser)
   }
   return (
      <UserContext.Provider value={{ 
         user,
         updateUser,
         isLoading
       }}>
         {children}
      </UserContext.Provider>
   )
}

export default UserContextProvider;