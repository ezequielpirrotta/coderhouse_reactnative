import React, { useState, createContext, useEffect, PropsWithChildren }from "react";
import { User, UserContextType } from '../data/objectTypes';

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({children}: PropsWithChildren) => {
   const [user, setUser] = useState<User>()
   useEffect(()=>{
      const newUser = {
         id: 'ldksfjslkfj-lkj4l5h345j',
         username: "Mariano",
         password: "MM",
         matches: [],
         age: 20,
         location: 'Ciudad1',
         interests: ['musica','correr']
      }
      setUser(newUser)
   })
   const updateUser = (user: User | undefined) => {
      setUser(user)
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