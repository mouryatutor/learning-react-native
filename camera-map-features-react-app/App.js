import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './screens/allplaces';
import AddPlace from './screens/addplace';
import IconButton from './components/ui/iconButton';
import { Colors } from './constants/colors';
import Map from './screens/map';
import { useCallback, useEffect, useState } from 'react';
import { init } from './util/database';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import PlaceDetails from './screens/placesdetails';

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();


export default function App() { 

  const [dbInitialized, setDbInitialized] = useState(false);

    useEffect(() => { 
      init().then(() => { 
        console.log("database initialized");
        setDbInitialized(true);
      }).catch(() => {
        console.log("Database initialization failed");
      });
    },[]);


  const onLayoutRootView = useCallback(async () => {
      if(dbInitialized) {
        await SplashScreen.hideAsync();
      }
  }, [dbInitialized]);


  if(!dbInitialized) {
    return null;
  }



  return (
    <View onLayout={onLayoutRootView} style={{flex: 1}} >
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator  
          screenOptions={{
            headerStyle: {backgroundColor: Colors.primary500},
            headerTintColor: Colors.gray700,
            contentStyle: {backgroundColor: Colors.gray700}
          }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => <IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
            })}
          />
          <Stack.Screen 
            name='AddPlace'
            component={AddPlace}
            options={{
              title: "Add a new place"
            }}
          />
          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{
            title: "Loading Place ..."
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}


