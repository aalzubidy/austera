import { createStackNavigator } from '@react-navigation/stack';
import SearchPeople from '../../Screens/SearchPeople';

const SearchStackNav = createStackNavigator();

const SearchStack = () => {
  return (
    <SearchStackNav.Navigator initialRouteName='SearchPeople' >
      <SearchStackNav.Screen
        name="SearchPeople"
        component={SearchPeople}
        options={{
          headerShown: false,
          title: 'Find People'
        }}
      />
    </SearchStackNav.Navigator>
  );
}

export default SearchStack;
