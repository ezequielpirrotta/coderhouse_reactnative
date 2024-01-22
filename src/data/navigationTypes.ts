import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined
  Register: undefined
};

export type StackScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'|'Register'>;

/**
 * Parametros para la navegacion en el Register
 */
export type RootStackRegisterParamList = {
  MainData: undefined
  UserHome: undefined
  GenderData: undefined
  Interests: undefined
  Pictures: undefined
};

export type StackRegisterScreenProps = NativeStackScreenProps<RootStackRegisterParamList, 'MainData'|'UserHome'|'GenderData'|'Interests'|'Pictures'>;