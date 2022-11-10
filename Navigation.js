import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useColorScheme} from 'react-native';
import {useEffect} from 'react';
import {changeTheme} from './features/dark_mode/darkMode';
import HomeScreen from './screen/HomeScreen';
import SingleMatchScreen from './screen/SingleMatchScreen';
import CoachScreen from './screen/CoachScreen';
import PlayerScreen from './screen/PlayerScreen';
import LeagueScreen from './screen/LeagueScreen';
import TeamScreen from './screen/TeamScreen';
import LeagueStatisticsScreen from './screen/LeagueStatisticsScreen';

const Navigation = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme !== 'light';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTheme(isDarkMode));
  }, [dispatch, isDarkMode]);

  const Stack = createNativeStackNavigator();

  function StackNavigation() {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.dark : Colors.primary,
          },
          headerBackVisible: false,
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Live Score',
            headerTitleAlign: 'center',
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="SingleMatch"
          component={SingleMatchScreen}
          options={{
            title: 'Live Score',
            headerTitleAlign: 'center',
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="Coach"
          component={CoachScreen}
          options={{
            title: 'Live Score',
            headerTitleAlign: 'center',
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            title: 'Live Score',
            headerTitleAlign: 'center',
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="League"
          component={LeagueScreen}
          options={{
            title: 'Live Score',
            headerTitleAlign: 'center',
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="LeagueStatistics"
          component={LeagueStatisticsScreen}
          options={{
            title: 'Live Score',
            headerTitleAlign: 'center',
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="Team"
          component={TeamScreen}
          options={{
            title: 'Live Score',
            headerTitleAlign: 'center',
            headerTintColor: Colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 25,
            },
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Navigation;
