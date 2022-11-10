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

const Matches = ({match, navigation, isDarkMode}) => {
  const time = new Date(match.fixture.date);
  const hours = '0' + time.getHours();
  const minutes = '0' + time.getMinutes();
  const formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);
  const backgroundColor = isDarkMode ? Colors.dark : Colors.white;
  const textColor = isDarkMode ? Colors.lighter : Colors.darker;

  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={() =>
        navigation.navigate('SingleMatch', {id: match.fixture.id})
      }>
      <View style={styles.teamsContainer}>
        <View style={styles.home}>
          <Text style={[styles.homeText, {color: textColor}]}>
            {match.teams?.home?.name.slice(0, 20)}
          </Text>
        </View>
        <View style={styles.score}>
          <Image style={styles.logo} source={{uri: match.teams?.home?.logo}} />
          <Text style={[styles.scoreText, {color: textColor}]}>
            {match.goals?.home} - {match.goals?.away}
          </Text>
          <Image style={styles.logo} source={{uri: match.teams?.away?.logo}} />
        </View>
        <View style={styles.away}>
          <Text style={[, {color: textColor}]}>
            {match.teams?.away?.name.slice(0, 20)}
          </Text>
        </View>
      </View>
      <View style={styles.time}>
        <Text style={[styles.timeText, {color: textColor}]}>
          {formattedTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    height: WIDTH / 4.5,
    justifyContent: 'center',
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
  time: {
    marginTop: 10,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
  home: {
    width: '35%',
    justifyContent: 'center',
  },
  homeText: {
    textAlign: 'right',
    fontSize: 16,
  },
  score: {
    width: '30%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  away: {
    width: '35%',
    justifyContent: 'center',
  },
  awayText: {
    textAlign: 'left',
    fontSize: 16,
  },
});
export default Matches;
