import React, { useState, createContext, useEffect, PropsWithChildren }from "react";
import { User, UserContextType } from '../data/objectTypes';

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider = ({children}: PropsWithChildren) => {
   const [user, setUser] = useState<User>( {
      id: 'ldksfjslkfj-lkj4l5h345j',
      username: "Mariano",
      password: "MM",
      matches: [{userId: 'ldksfjslkfj-lkj4l5h345j'}],
      age: 20,
      location: 'Ciudad1',
      interests: ['musica','correr'],
      filter: {ageRange: [20,30]}
   })
   
   const updateUser = (newUser: User) => {
      setUser(newUser)
      console.log(user)
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