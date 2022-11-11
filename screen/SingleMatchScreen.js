import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSingleMatch} from '../features/matches/singleMatchSlice';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MatchResult from '../component/MatchResult';
import MatchEvents from '../component/MatchEvents';
import Statistics from '../component/Statistics';
import HomeLineup from '../component/HomeLineup';
import AwayLineup from '../component/AwayLineup';

const WIDTH = Dimensions.get('window').width;

const SingleMatchScreen = ({route, navigation}) => {
  const {id} = route.params;
  const isDarkMode = useSelector(state => state.darkMode.isDark);
  const isLoading = useSelector(state => state.singleMatch.isLoading);
  const error = useSelector(state => state.singleMatch.error);
  const data = useSelector(state => state.singleMatch.singleMatch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleMatch(id));
  }, [dispatch]);

  const homeTeam = data?.teams?.home?.name;
  const awayTeam = data?.teams?.away?.name;

  let homeStatistics,
    awayStatistics = [];
  if (data?.statistics?.length > 0) {
    homeStatistics = data?.statistics[0]?.statistics;
    awayStatistics = data?.statistics[1]?.statistics;
  }

  let homeLineup,
    awayLineup = {};
  if (data?.lineups?.length > 1) {
    homeLineup = data?.lineups[0];
    awayLineup = data?.lineups[1];
  }
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
      {data?.league && (
        <>
          <Pressable
            onPress={() =>
              navigation.navigate('League', {id: data?.league?.id})
            }>
            <View style={styles.logoContainer}>
              <Image
                resizeMode={'center'}
                style={styles.logo}
                source={{uri: data?.league?.logo}}
              />
              <Text style={[styles.league, {color}]}>
                {data?.league?.name} - {data?.league?.round}
              </Text>
            </View>
          </Pressable>
          <MatchResult
            homeId={data?.teams?.home?.id}
            awayId={data?.teams?.away?.id}
            homeTeam={data?.teams?.home?.name}
            homeLogo={data?.teams?.home?.logo}
            homeResult={data?.score?.fulltime?.home}
            awayTeam={data?.teams?.away?.name}
            awayLogo={data?.teams?.away?.logo}
            awayResult={data?.score?.fulltime?.away}
            homeHalfResult={data?.score?.halftime?.home}
            awayHalfResult={data?.score?.halftime?.away}
            elapsed={data?.fixture?.status?.elapsed}
            isDarkMode={isDarkMode}
            navigation={navigation}
          />
          <View style={styles.referee}>
            <Text style={{color}}>Arbitro</Text>
            <Text style={{color}}>{data?.fixture?.referee}</Text>
          </View>
          <ScrollView
            horizontal={true}
            disableIntervalMomentum={true}
            snapToInterval={WIDTH}
            showsHorizontalScrollIndicator={true}
            persistentScrollbar={true}>
            <ScrollView>
              <MatchEvents
                events={data?.events}
                isDarkMode={isDarkMode}
                homeTeam={homeTeam}
                awayTeam={awayTeam}
              />
            </ScrollView>
            {homeStatistics && awayStatistics ? (
              <Statistics
                homeStatistics={homeStatistics}
                awayStatistics={awayStatistics}
                isDarkMode={isDarkMode}
              />
            ) : null}
            {homeLineup && awayLineup ? (
              <>
                <HomeLineup
                  homeLineup={homeLineup}
                  navigation={navigation}
                  isDarkMode={isDarkMode}
                />
                <AwayLineup
                  awayLineup={awayLineup}
                  navigation={navigation}
                  isDarkMode={isDarkMode}
                />
              </>
            ) : null}
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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  logo: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  league: {
    fontSize: 15,
  },
  referee: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SingleMatchScreen;
