import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const WIDTH = Dimensions.get('window').width;

const AwayLineup = ({awayLineup, navigation, isDarkMode}) => {
  const colorTitle = isDarkMode ? Colors.white : Colors.black;
  const color = isDarkMode ? Colors.light : Colors.dark;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {awayLineup ? (
        <>
          <View style={styles.coachContainer}>
            <Text style={[styles.playerText, {color}]}>Allenatore</Text>
            <Pressable
              style={styles.coach}
              onPress={() =>
                navigation.navigate('Coach', {id: awayLineup?.coach?.id})
              }>
              <Image
                source={{uri: awayLineup?.coach?.photo}}
                style={styles.photo}
              />
              <Text style={[styles.playerText, {color}]}>
                {awayLineup?.coach?.name}
              </Text>
            </Pressable>
          </View>
          <View>
            <Text style={[styles.module, {color}]}>
              Modulo: {awayLineup?.formation}
            </Text>
          </View>
          <View>
            <Text style={[styles.staRes, {color: colorTitle}]}>Titolari</Text>
            {awayLineup?.startXI?.map((player, index) => {
              return (
                <Pressable
                  key={index}
                  style={styles.playerContainer}
                  onPress={() =>
                    navigation.navigate('Player', {id: player?.player?.id})
                  }>
                  <Text style={[styles.playerNumber, {color}]}>
                    {player?.player?.number}
                  </Text>
                  <Text style={[styles.playerText, {color}]}>
                    {player?.player?.name}
                  </Text>
                </Pressable>
              );
            })}
            <Text style={[styles.staRes, {color: colorTitle}]}>Riserve</Text>
            {awayLineup?.substitutes?.map((player, index) => {
              return (
                <Pressable
                  key={index}
                  style={styles.playerContainer}
                  onPress={() =>
                    navigation.navigate('Player', {id: player?.player?.id})
                  }>
                  <Text style={[styles.playerNumber, {color}]}>
                    {player?.player?.number}
                  </Text>
                  <Text style={[styles.playerText, {color}]}>
                    {player?.player?.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    marginVertical: 10,
    paddingVertical: 15,
    paddingLeft: 20,
  },
  coachContainer: {
    justifyContent: 'center',
  },
  coach: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  module: {
    fontSize: 16,
    paddingVertical: 10,
  },
  staRes: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  playerContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  playerNumber: {
    fontSize: 16,
    fontWeight: '600',
    width: 30,
  },
  playerText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
});

export default AwayLineup;
