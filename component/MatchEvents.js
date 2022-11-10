import {View, StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SingleEvent from './SingleEvent';

const WIDTH = Dimensions.get('window').width;

const MatchEvents = ({events, homeTeam, awayTeam, isDarkMode}) => {
  const backgroundColor = isDarkMode ? Colors.dark : Colors.light;

  return (
    <View contentContainerStyle={styles.container}>
      {[...events]?.reverse().map((value, index) => {
        let alignItems;
        if (value?.team?.name === homeTeam) {
          alignItems = 'flex-start';
        } else if (value?.team?.name === awayTeam) {
          alignItems = 'flex-end';
        }
        return (
          <View
            key={index}
            style={[styles.eventContainer, {alignItems, backgroundColor}]}>
            <SingleEvent
              type={value?.type}
              playerName={value?.player?.name}
              timeElapsed={value?.time?.elapsed}
              detail={value?.detail}
              assist={value?.assist?.name}
              isDarkMode={isDarkMode}
              alignItems={alignItems}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  eventContainer: {
    width: WIDTH,
    marginBottom: 3,
    paddingHorizontal: 10,
  },
});

export default MatchEvents;
