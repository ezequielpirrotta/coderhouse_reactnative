import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined
  RegisterNavigator: undefined
};

export type StackScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'|'RegisterNavigator'>;

/**
 * Parametros para la navegacion en el Register
 */
export type RootStackRegisterParamList = {
  MainData: undefined
  UserHome: undefined
  GenderData: undefined
  Preferences: undefined
  Bio: undefined
  Pictures: undefined
  Register: undefined
};

export type StackRegisterScreenProps = NativeStackScreenProps<RootStackRegisterParamList, 
  'MainData'|'UserHome'|'GenderData'|'Preferences'|'Bio'|'Pictures'|'Register'>;