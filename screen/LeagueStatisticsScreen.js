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
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchLeagueTopScorers,
  fetchLeagueTopAssists,
  fetchLeagueTopRedCard,
  fetchLeagueTopYellowCard,
  resetError,
} from '../features/matches/matchesSlice';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SinglePlayerStatistics from '../component/SinglePlayerStatistics';

const WIDTH = Dimensions.get('window').width;

const LeagueStatisticsScreen = ({route, navigation}) => {
  const {id} = route.params;
  const isDarkMode = useSelector(state => state.darkMode.isDark);
  const isLoading = useSelector(state => state.matches.isLoading);
  const error = useSelector(state => state.matches.error);
  const topScorers = useSelector(state => state.matches.topScorers);
  const topAssists = useSelector(state => state.matches.topAssists);
  const topRedCard = useSelector(state => state.matches.topRedCard);
  const topYellowCard = useSelector(state => state.matches.topYellowCard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
    dispatch(fetchLeagueTopScorers(id));
    dispatch(fetchLeagueTopAssists(id));
    dispatch(fetchLeagueTopRedCard(id));
    dispatch(fetchLeagueTopYellowCard(id));
  }, [dispatch]);

  const backgroundColor = isDarkMode ? Colors.darker : Colors.light;
  const color = isDarkMode ? Colors.light : Colors.dark;
  return error ? (
    <View style={[styles.errorContainer, {backgroundColor}]}>
      <Text style={[styles.errorText, {color}]}>
        Ops! Qualcosa è andato storto!!
      </Text>
    </View>
  ) : !isLoading ? (
    <ScrollView style={[styles.container, {backgroundColor}]}>
      <View style={{width: WIDTH, paddingHorizontal: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>
          Gol
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Giocatore</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Gol</Text>
        </View>
      </View>
      {topScorers?.length > 0 &&
        topScorers?.slice(0, 10).map((value, index) => {
          return (
            <SinglePlayerStatistics
              key={index}
              id={value?.player?.id}
              isDarkMode={isDarkMode}
              index={index + 1}
              photo={value?.player?.photo}
              name={value?.player?.name}
              logo={value?.statistics[0]?.team?.logo}
              teamName={value?.statistics[0]?.team?.name}
              score={value?.statistics[0]?.goals?.total}
              navigation={navigation}
            />
          );
        })}
      <View style={{width: WIDTH, paddingHorizontal: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>
          Assist
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Giocatore</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Assist</Text>
        </View>
      </View>
      {topAssists?.length > 0 &&
        topAssists?.slice(0, 10).map((value, index) => {
          return (
            <SinglePlayerStatistics
              key={index}
              id={value?.player?.id}
              isDarkMode={isDarkMode}
              index={index + 1}
              photo={value?.player?.photo}
              name={value?.player?.name}
              logo={value?.statistics[0]?.team?.logo}
              teamName={value?.statistics[0]?.team?.name}
              score={value?.statistics[0]?.goals?.assists}
              navigation={navigation}
            />
          );
        })}
      <View style={{width: WIDTH, paddingHorizontal: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>
          Ammonizioni
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Giocatore</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Ammonizioni</Text>
        </View>
      </View>
      {topYellowCard?.length > 0 &&
        topYellowCard?.slice(0, 10).map((value, index) => {
          return (
            <SinglePlayerStatistics
              key={index}
              id={value?.player?.id}
              isDarkMode={isDarkMode}
              index={index + 1}
              photo={value?.player?.photo}
              name={value?.player?.name}
              logo={value?.statistics[0]?.team?.logo}
              teamName={value?.statistics[0]?.team?.name}
              score={value?.statistics[0]?.cards?.yellow}
              navigation={navigation}
            />
          );
        })}
      <View style={{width: WIDTH, paddingHorizontal: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 5}}>
          Espulsioni
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Giocatore</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Espulsioni</Text>
        </View>
      </View>
      {topRedCard?.length > 0 &&
        topRedCard?.slice(0, 10).map((value, index) => {
          return (
            <SinglePlayerStatistics
              key={index}
              id={value?.player?.id}
              isDarkMode={isDarkMode}
              index={index + 1}
              photo={value?.player?.photo}
              name={value?.player?.name}
              logo={value?.statistics[0]?.team?.logo}
              teamName={value?.statistics[0]?.team?.name}
              score={value?.statistics[0]?.cards?.red}
              navigation={navigation}
            />
          );
        })}
    </ScrollView>
  ) : (
    <ActivityIndicator
      color="#e307df"
      size="large"
      style={styles.activityIndicator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    marginVertical: 3,
  },
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    flexDirection: 'row',
    width: WIDTH,
    alignItems: 'center',
  },
  groupContainer: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'flex-end',
  },
  nameContainer: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leagueName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  logo: {
    width: 60,
    height: 60,
  },
  statisticsContainer: {
    width: WIDTH,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
  },
  statisticsText: {
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 10,
  },
  group: {
    fontSize: 16,
    fontWeight: '700',
  },
  stands: {
    flexDirection: 'row',
  },
  singleStand: {
    width: WIDTH / 13,
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LeagueStatisticsScreen;
