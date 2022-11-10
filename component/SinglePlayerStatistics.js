import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const WIDTH = Dimensions.get('window').width;

export default function SinglePlayerStatistics({
  id,
  isDarkMode,
  index,
  photo,
  name,
  logo,
  teamName,
  score,
  navigation,
}) {
  const backgroundColor = isDarkMode ? Colors.dark : Colors.lighter;
  const color = isDarkMode ? Colors.light : Colors.dark;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <TouchableOpacity
        style={styles.playerContainer}
        onPress={() => navigation.navigate('Player', {id})}>
        <View style={styles.positionContainer}>
          <Text style={[styles.position, {color}]}>{index}</Text>
        </View>
        <View style={styles.playerInfo}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: photo}}
              style={styles.photo}
              resizeMode="center"
            />
            <View style={styles.nameContainer}>
              <Text style={[styles.name, {color}]}>{name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={styles.logo}
                  source={{uri: logo}}
                  resizeMode="center"
                />
                <Text style={[styles.teamName, {color}]}>{teamName}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, {color}]}>{score}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: WIDTH / 4,
    paddingHorizontal: 10,
    marginBottom: 4,
    justifyContent: 'center',
  },
  playerContainer: {
    width: WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  positionContainer: {
    width: WIDTH * 0.1,
    justifyContent: 'center',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: WIDTH * 0.8,
  },
  position: {
    fontSize: 18,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  nameContainer: {
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  teamName: {
    fontSize: 14,
  },
  scoreContainer: {
    width: WIDTH * 0.1,
    alignContent: 'center',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
