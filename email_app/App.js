import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Login, Signup, Getstarted } from "./screens";
import Home from './screens/Home';
import Passrecovery from './screens/Passrecovery';
import SendMail from './components/sendmail';
import Inbox from './components/inbox';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Getstarted'
      >
        <Stack.Screen
          name="Getstarted"
          component={Getstarted}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Passrecovery"
          component={Passrecovery}
          options={{
            headerShown: false
          }}
        />

          <Stack.Screen
          name="Inbox"
          component={Inbox}
          options={{
            headerShown: false
          }}
        />

          <Stack.Screen
          name="SendMail"
          component={SendMail}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}