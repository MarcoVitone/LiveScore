import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  fetchTeamInfo,
  fetchTeamMatches,
  resetError,
} from '../features/matches/matchesSlice';
import TeamMatches from '../component/TeamMatches';

const WIDTH = Dimensions.get('window').width;
const TeamScreen = ({route, navigation}) => {
  const {id} = route.params;
  const isDarkMode = useSelector(state => state.darkMode.isDark);
  const error = useSelector(state => state.matches.error);
  const isLoading = useSelector(state => state.matches.isLoading);
  const data = useSelector(state => state.matches.teamInfo);
  const matches = useSelector(state => state.matches.teamMatches);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
    dispatch(fetchTeamInfo(id));
    dispatch(fetchTeamMatches(id));
  }, [dispatch]);

  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;
  const color = isDarkMode ? Colors.light : Colors.dark;

  return error ? (
    <View style={[styles.errorContainer, {backgroundColor}]}>
      <Text style={[styles.errorText, {color}]}>
        Ops! Qualcosa è andato storto!!
      </Text>
    </View>
  ) : !isLoading ? (
    <View style={[styles.container, {backgroundColor}]}>
      {data?.team && (
        <>
          <View style={styles.nameContainer}>
            <Image source={{uri: data?.team?.logo}} style={styles.logo} />
            <Text style={[styles.teamName, {color}]}>{data?.team?.name}</Text>
          </View>
          <ScrollView>
            <View style={styles.stadiumContainer}>
              <Text style={[styles.title, {color}]}>Stadio</Text>
              <Text style={[styles.stadiumName, {color}]}>
                {data?.venue?.name}
              </Text>
              <Text style={[styles.info, {color}]}>
                Indirizzo: {data?.venue?.address}
              </Text>
              <Text style={[styles.info, {color}]}>
                Città: {data?.venue?.city}
              </Text>
              <Text style={[styles.info, {color}]}>
                Capienza: {data?.venue?.capacity}
              </Text>
              <Image source={{uri: data?.venue?.image}} style={styles.image} />
            </View>
            <View style={styles.matchesContainer}>
              {matches?.length > 0 &&
                matches?.map((match, index) => {
                  return (
                    <TeamMatches
                      key={index}
                      match={match}
                      navigation={navigation}
                      isDarkMode={isDarkMode}
                    />
                  );
                })}
            </View>
          </ScrollView>
        </>
      )}
    </View>
  ) : (
    <ActivityIndicator
      color="#e307df"
      size="large"
      style={styles.activityIndicator}
    />
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 5,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingBottom: 5,
  },
  logo: {
    width: WIDTH / 3,
    height: WIDTH / 3,
  },
  teamName: {
    fontSize: 30,
    fontWeight: '700',
  },
  stadiumContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  stadiumName: {
    fontSize: 22,
    fontWeight: '500',
    marginVertical: 10,
  },
  info: {
    paddingVertical: 3,
    fontSize: 16,
  },
  image: {
    width: WIDTH - 10,
    height: WIDTH / 2,
  },
  leagueName: {
    fontSize: 20,
    paddingVertical: 6,
  },
  matchesContainer: {
    paddingTop: 20,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TeamScreen;
