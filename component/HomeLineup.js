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

const HomeLineup = ({homeLineup, navigation, isDarkMode}) => {
  const colorTitle = isDarkMode ? Colors.white : Colors.black;
  const color = isDarkMode ? Colors.light : Colors.dark;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {homeLineup ? (
        <>
          <View style={styles.coachContainer}>
            <Text style={[styles.playerText, {color}]}>Allenatore</Text>
            <Pressable
              style={styles.coach}
              onPress={() =>
                navigation.navigate('Coach', {id: homeLineup?.coach?.id})
              }>
              <Image
                source={{uri: homeLineup?.coach?.photo}}
                style={styles.photo}
              />
              <Text style={[styles.playerText, {color}]}>
                {homeLineup?.coach?.name}
              </Text>
            </Pressable>
          </View>
          <View>
            <Text style={[styles.module, {color}]}>
              Modulo: {homeLineup?.formation}
            </Text>
          </View>
          <View>
            <Text style={[styles.staRes, {color: colorTitle}]}>Titolari</Text>
            {homeLineup?.startXI?.map((player, index) => {
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
            {homeLineup?.substitutes?.map((player, index) => {
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
    paddingLeft: 20,
    paddingVertical: 15,
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
  },
});

export default HomeLineup;
