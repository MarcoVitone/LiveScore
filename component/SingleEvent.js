import {View, Text, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SingleEvent = ({
  type,
  playerName,
  timeElapsed,
  detail,
  assist,
  isDarkMode,
  alignItems,
}) => {
  const color = isDarkMode ? Colors.light : Colors.dark;
  let event;

  if (type === 'subst') {
    if (alignItems !== 'flex-end') {
      event = (
        <>
          <View style={styles.iconContainer}>
            <FontAwesome name="exchange" size={26} color="#31b800" />
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>Dentro {assist}</Text>
            <Text style={[styles.assistName, {color}]}>Fuori {playerName}</Text>
          </View>
        </>
      );
    } else {
      event = (
        <>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>Dentro {assist}</Text>
            <Text style={[styles.assistName, {color}]}>Fuori {playerName}</Text>
          </View>
          <View style={styles.iconContainer}>
            <FontAwesome name="exchange" size={26} color="#31b800" />
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
        </>
      );
    }
  } else if (type === 'Goal') {
    if (alignItems !== 'flex-end') {
      event = (
        <>
          <View style={styles.iconContainer}>
            <Ionicons
              name="ios-football"
              size={26}
              color={detail === 'Own Goal' ? '#ff0008' : Colors.black}
            />
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>{playerName}</Text>
            <Text style={[styles.assistName, {color}]}>{assist}</Text>
          </View>
        </>
      );
    } else {
      event = (
        <>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>{playerName}</Text>
            <Text style={[styles.assistName, {color}]}>{assist}</Text>
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="ios-football"
              size={26}
              color={detail === 'Own Goal' ? '#ff0008' : Colors.black}
            />
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
        </>
      );
    }
  } else if (detail === 'Yellow Card') {
    if (alignItems !== 'flex-end') {
      event = (
        <>
          <View style={styles.iconContainer}>
            <View style={styles.yellowCard}></View>
            <MaterialCommunityIcons
              name="card"
              size={26}
              color="#ffff00"
              style={styles.yellowCard}
            />
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>{playerName}</Text>
          </View>
        </>
      );
    } else {
      event = (
        <>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>{playerName}</Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="card"
              size={26}
              color="#ffff00"
              style={styles.yellowCard}
            />
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
        </>
      );
    }
  } else if (detail === 'Red Card') {
    if (alignItems !== 'flex-end') {
      event = (
        <>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="card"
              size={26}
              color="#ff0000"
              style={styles.redCard}
            />
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>{playerName}</Text>
            <Text style={[styles.assistName, {color}]}>{assist}</Text>
          </View>
        </>
      );
    } else {
      event = (
        <>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>{playerName}</Text>
            <Text style={[styles.assistName, {color}]}>{assist}</Text>
          </View>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="card"
              size={26}
              color="#ff0000"
              style={styles.redCard}
            />
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
        </>
      );
    }
  } else if (type === 'Var') {
    if (alignItems !== 'flex-end') {
      event = (
        <>
          <View style={styles.iconContainer}>
            <View>
              <Feather name="monitor" size={26} color={Colors.primary} />
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 9,
                  fontWeight: '600',
                  color: Colors.primary,
                  top: 5,
                  right: 4,
                }}>
                VAR
              </Text>
            </View>
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>{playerName}</Text>
            <Text style={[styles.assistName, {color}]}>{detail}</Text>
          </View>
        </>
      );
    } else {
      event = (
        <>
          <View style={styles.playerContainer}>
            <Text style={[styles.playerName, {color}]}>{playerName}</Text>
            <Text style={[styles.assistName, {color}]}>{detail}</Text>
          </View>
          <View style={styles.iconContainer}>
            <View>
              <Feather name="monitor" size={26} color={Colors.primary} />
              <Text
                style={{
                  position: 'absolute',
                  fontSize: 9,
                  fontWeight: '600',
                  color: Colors.primary,
                  top: 5,
                  right: 4,
                }}>
                VAR
              </Text>
            </View>
            <Text style={[styles.time, {color}]}>{timeElapsed}'</Text>
          </View>
        </>
      );
    }
  }

  return <View style={styles.container}>{event}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 3,
    height: 50,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowCard: {
    transform: [{rotate: '90deg'}],
    marginRight: 3,
  },
  redCard: {
    transform: [{rotate: '90deg'}],
    marginRight: 3,
  },
  goal: {
    marginRight: 3,
  },
  substitution: {
    marginRight: 3,
  },
  var: {
    width: 20,
    height: 20,
    marginRight: 3,
  },
  playerName: {
    fontWeight: '600',
    paddingBottom: 2,
  },
  assistName: {
    fontSize: 12,
  },
  time: {
    paddingHorizontal: 3,
  },
});

export default SingleEvent;
