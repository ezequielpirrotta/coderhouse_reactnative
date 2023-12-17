import React, { useState, createContext, useEffect, PropsWithChildren }from "react";
import { User, UserContextType } from '../data/objectTypes';

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({children}: PropsWithChildren) => {
   const [user, setUser] = useState<User|undefined>()
   useEffect(()=>{
      const fetchData = async () => {

         const response = await fetch(
            'https://randomuser.me/api/?inc=gender,login,id,name,location,dob,cell,picture,nat&noinfo'
         );
         
         const result = (await response.json()).result
         let newUser: User = {
            id: result.id.value,
            username: result.login.username,
            password: result.login.password,
            matches: [],
            pictures: [result.picture.thumbnail],
            age: 20,
            location: result.location.city,
            interests: ['musica','correr'],
            filter: {ageRange: [20,30]}
         }
         setUser(newUser);
      }
      fetchData()
      console.log(user)
   },[])
   
   const updateUser = (newUser: User) => {
      setUser(newUser)
   }
   return (
      <UserContext.Provider value={{ 
         user,
         updateUser
       }}>
         {children}
      </UserContext.Provider>
   )
}

export default UserContextProvider;