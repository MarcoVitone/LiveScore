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

const SingleTeam = ({
  isDarkMode,
  rank,
  logo,
  name,
  points,
  totPlay,
  totWin,
  totLose,
  totDraw,
  forGoals,
  againstGoals,
  goalsDiff,
  navigation,
  id,
}) => {
  const backgroundColor = isDarkMode ? Colors.dark : Colors.lighter;
  const color = isDarkMode ? Colors.light : Colors.dark;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.nameContainer}>
        <Text style={[styles.rank, {color}]}>{rank}</Text>
        <Pressable
          style={{flexDirection: 'row'}}
          onPress={() => navigation.navigate('Team', {id})}>
          <Image source={{uri: logo}} style={styles.logo} />
          <Text style={{color}}>{name.slice(0, 11)}</Text>
        </Pressable>
      </View>
      <View style={styles.stands}>
        <Text style={[styles.singleStand, {color}]}>{totPlay}</Text>
        <Text style={[styles.singleStand, {color}]}>{totWin}</Text>
        <Text style={[styles.singleStand, {color}]}>{totDraw}</Text>
        <Text style={[styles.singleStand, {color}]}>{totLose}</Text>
        <Text style={[styles.singleStand, {color}]}>{forGoals}</Text>
        <Text style={[styles.singleStand, {color}]}>{againstGoals}</Text>
        <Text style={[styles.singleStand, {color}]}>{goalsDiff}</Text>
        <Text style={[styles.singleStand, {color, fontWeight: '700'}]}>
          {points}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 1,
    width: WIDTH,
    alignItems: 'center',
    height: 35,
  },
  nameContainer: {
    flexDirection: 'row',
    width: WIDTH / 2.6,
    alignItems: 'center',
  },
  rank: {
    marginHorizontal: 3,
    textAlign: 'right',
    width: 20,
  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 3,
  },
  stands: {
    flexDirection: 'row',
  },
  singleStand: {
    width: WIDTH / 13,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default SingleTeam;
