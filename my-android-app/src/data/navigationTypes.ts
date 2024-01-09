import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined,
  Register: undefined
};

export type StackScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'|'Register' >;