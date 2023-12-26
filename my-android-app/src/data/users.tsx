import {User} from './objectTypes'
import uuid from 'react-native-uuid';


export const users: User[] = [
   {
      id: String(uuid.v4()),
      name: 'Pepito Gonzales',
      username: "alguien",
      password: "alguienpass",
      age: 52,
      location: 'Ciudad1',
      gender: 'Hombre',
      sex: 'M',
      pictures: ['../../assets/favicon.png'],
      likes: [],
      matches: [],
      interests: ['musica','correr'],
      filter: {ageRange: [20,30]}
   },
   {
      id: String(uuid.v4()),
      name: 'Maria Gonzales',
      username: "alguien",
      password: "alguienpass",
      age: 40,
      location: 'Ciudad1',
      gender: 'Hombre',
      sex: 'F',
      pictures: ['../../assets/favicon.png'],
      likes: [],
      matches: [],
      interests: ['musica','correr'],
      filter: {ageRange: [20,30]}
   },
   {
      id: String(uuid.v4()),
      name: 'Pepita Gonzales',
      username: "alguien",
      password: "alguienpass",
      age: 35,
      location: 'Ciudad1',
      gender: 'Mujer',
      sex: 'M',
      pictures: ['../../assets/favicon.png'],
      likes: [],
      matches: [],
      interests: ['musica','correr'],
      filter: {ageRange: [20,30]}
   }
]