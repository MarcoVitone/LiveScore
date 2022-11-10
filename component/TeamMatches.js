import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const WIDTH = Dimensions.get('window').width;

const TeamMatches = ({match, navigation, isDarkMode}) => {
  const backgroundColor = isDarkMode ? Colors.dark : Colors.white;
  const textColor = isDarkMode ? Colors.lighter : Colors.darker;
  const d = new Date(match?.fixture?.timestamp * 1000);
  const date =
    ('0' + d.getDate()).slice(-2) +
    '/' +
    ('0' + (d.getMonth() + 1)).slice(-2) +
    '/' +
    d.getFullYear();

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={() =>
        navigation.navigate('SingleMatch', {id: match.fixture.id})
      }>
      <View style={styles.date}>
        <Text>{date.split('T')[0]}</Text>
        <Text>{match?.league?.name}</Text>
      </View>
      <View style={styles.teamsContainer}>
        <View style={styles.teamContainer}>
          <Image
            style={styles.logo}
            source={{uri: match?.teams?.home?.logo}}
            resizeMode={'center'}
          />
          <Text style={[styles.teamText, {color: textColor}]}>
            {match?.teams?.home?.name.slice(0, 16)}
          </Text>
          <Text style={[styles.scoreText, {color: textColor}]}>
            {match?.goals?.home}
          </Text>
        </View>
        <View style={styles.teamContainer}>
          <Image
            style={styles.logo}
            source={{uri: match?.teams?.away?.logo}}
            resizeMode={'center'}
          />
          <Text style={[styles.teamText, {color: textColor}]}>
            {match?.teams?.away?.name.slice(0, 16)}
          </Text>
          <Text style={[styles.scoreText, {color: textColor}]}>
            {match?.goals?.away}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: WIDTH,
    height: WIDTH / 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginBottom: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  date: {
    width: WIDTH / 4.5,
    paddingVertical: 5,
  },
  teamsContainer: {
    width: WIDTH / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamContainer: {
    flexDirection: 'row',
    paddingVertical: 2,
  },
  logo: {
    width: '20%',
    height: 28,
  },
  teamText: {
    width: '60%',
    fontSize: 16,
  },
  scoreText: {
    width: '10%',
    textAlign: 'right',
  },
});
export default TeamMatches;
