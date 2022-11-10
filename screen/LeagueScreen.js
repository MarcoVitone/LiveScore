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
  fetchLeagueStandings,
  resetError,
} from '../features/matches/matchesSlice';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SingleTeam from '../component/SingleTeam';

const WIDTH = Dimensions.get('window').width;

const LeagueScreen = ({route, navigation}) => {
  const {id} = route.params;
  const isDarkMode = useSelector(state => state.darkMode.isDark);
  const isLoading = useSelector(state => state.matches.isLoading);
  const error = useSelector(state => state.matches.error);
  const data = useSelector(state => state.matches.standings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
    dispatch(fetchLeagueStandings(id));
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
    <View style={[styles.container, {backgroundColor}]}>
      {data?.league && (
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.descriptionContainer}>
            <View style={styles.nameContainer}>
              <Text style={[styles.leagueName, {color}]}>
                {data?.league?.name}
              </Text>
              <Image
                source={{uri: data?.league?.logo}}
                style={styles.logo}
                resizeMode="center"
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.statisticsContainer}
            onPress={() => navigation.navigate('LeagueStatistics', {id: id})}>
            <Text style={[styles.statisticsText, {color}]}>
              Statistiche Calciatori
            </Text>
          </TouchableOpacity>
          <View style={{marginBottom: 10}}>
            {data?.league?.standings?.flatMap((value, index) => {
              return (
                <View key={index}>
                  <View style={styles.groupContainer}>
                    <View style={{width: WIDTH / 2.6}}>
                      <Text style={[styles.group, {color}]}>
                        {value[0].group !== data?.league?.name
                          ? value[0].group
                          : null}
                      </Text>
                    </View>
                    <View style={styles.stands}>
                      <Text style={[styles.singleStand, {color}]}>PG</Text>
                      <Text style={[styles.singleStand, {color}]}>V</Text>
                      <Text style={[styles.singleStand, {color}]}>P</Text>
                      <Text style={[styles.singleStand, {color}]}>S</Text>
                      <Text style={[styles.singleStand, {color}]}>GF</Text>
                      <Text style={[styles.singleStand, {color}]}>GS</Text>
                      <Text style={[styles.singleStand, {color}]}>DR</Text>
                      <Text style={[styles.singleStand, {color}]}>Pt</Text>
                    </View>
                  </View>
                  {value.map(team => {
                    return (
                      <SingleTeam
                        key={team.team.name}
                        isDarkMode={isDarkMode}
                        rank={team.rank}
                        logo={team.team.logo}
                        name={team.team.name}
                        points={team.points}
                        totPlay={team.all.played}
                        totWin={team.all?.win}
                        totDraw={team.all.draw}
                        totLose={team.all.lose}
                        forGoals={team.all.goals.for}
                        againstGoals={team.all.goals.against}
                        goalsDiff={team.goalsDiff}
                        navigation={navigation}
                        id={team?.team?.id}
                      />
                    );
                  })}
                </View>
              );
            })}
          </View>
        </ScrollView>
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

export default LeagueScreen;
