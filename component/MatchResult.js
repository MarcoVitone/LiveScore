import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const WIDTH = Dimensions.get('window').width;

const MatchResult = ({
  homeId,
  awayId,
  homeTeam,
  homeLogo,
  homeResult,
  awayTeam,
  awayLogo,
  awayResult,
  homeHalfResult,
  awayHalfResult,
  elapsed,
  isDarkMode,
  navigation,
}) => {
  const leftParenthesis = '(';
  const rightParenthesis = ')';
  let homeColor, awayColor, homeColorDark, awayColorDark;
  if (homeResult > awayResult) {
    homeColor = '#1F1F1F';
    homeColorDark = Colors.white;
    awayColor = '#6c6c6c';
    awayColorDark = Colors.mid;
  } else if (homeResult < awayResult) {
    awayColor = '#1F1F1F';
    awayColorDark = Colors.white;
    homeColor = '#6c6c6c';
    homeColorDark = Colors.mid;
  } else {
    awayColor = '#6c6c6c';
    homeColor = '#6c6c6c';
    homeColorDark = Colors.mid;
    awayColorDark = Colors.mid;
  }

  const teamColor = isDarkMode ? Colors.white : Colors.dark;
  const homeWinColor = isDarkMode ? homeColorDark : homeColor;
  const awayWinColor = isDarkMode ? awayColorDark : awayColor;
  const color = isDarkMode ? Colors.light : Colors.dark;

  return (
    <View style={styles.resultContainer}>
      <Pressable onPress={() => navigation.navigate('Team', {id: homeId})}>
        <View style={styles.team}>
          <Text style={[styles.teamText, {color: teamColor}]}>{homeTeam}</Text>
          <Image style={styles.teamLogo} source={{uri: homeLogo}} />
        </View>
      </Pressable>
      <View style={styles.results}>
        <View style={styles.finalResult}>
          <Text style={[styles.homeFulltimeResults, {color: homeWinColor}]}>
            {homeResult}
          </Text>
          <Text style={[styles.divider, {color}]}> - </Text>
          <Text style={[styles.awayFulltimeResults, {color: awayWinColor}]}>
            {awayResult}
          </Text>
        </View>
        <Text style={[styles.halftimeResults, {color}]}>
          {leftParenthesis}
          {homeHalfResult} - {awayHalfResult}
          {rightParenthesis}
        </Text>
        <Text style={[styles.elapsed, {color}]}>{elapsed}'</Text>
      </View>
      <Pressable onPress={() => navigation.navigate('Team', {id: awayId})}>
        <View style={styles.team}>
          <Text style={[styles.teamText, {color: teamColor}]}>{awayTeam}</Text>
          <Image style={styles.teamLogo} source={{uri: awayLogo}} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginVertical: 15,
  },
  team: {
    width: WIDTH / 3,
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
  },
  teamText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F1F1F',
    flexWrap: 'wrap',
  },
  teamLogo: {
    width: 80,
    height: 80,
    marginTop: 20,
  },
  results: {
    width: WIDTH / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalResult: {
    flexDirection: 'row',
  },
  divider: {
    fontSize: 40,
    fontWeight: '700',
  },
  homeFulltimeResults: {
    fontSize: 40,
    fontWeight: '700',
  },
  awayFulltimeResults: {fontSize: 40, fontWeight: '700'},
  halftimeResults: {
    fontSize: 22,
    fontWeight: '500',
  },
  elapsed: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default MatchResult;
