import {
  ScrollView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {fetchCoaches, resetError} from '../features/matches/matchesSlice';

const WIDTH = Dimensions.get('window').width;

const CoachScreen = ({route}) => {
  const {id} = route.params;
  const isDarkMode = useSelector(state => state.darkMode.isDark);
  const isLoading = useSelector(state => state.matches.isLoading);
  const error = useSelector(state => state.matches.error);
  const data = useSelector(state => state.matches.coach);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
    dispatch(fetchCoaches(id));
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
      {data.firstname && (
        <>
          <View style={styles.coach}>
            <Image source={{uri: data?.photo}} style={styles.coachImage} />
            <View style={styles.nameContainer}>
              <Text style={styles.coachName}>
                {data?.firstname}
                {data?.lastname}
              </Text>
              <Text style={styles.actualTeam}>
                Squadra attuale: {data?.team?.name}
              </Text>
            </View>
          </View>
          <View style={styles.info}>
            <Text style={styles.coachInfo}>Anni: {data?.age}</Text>
            <Text style={styles.coachInfo}>
              Anno di nascita:
              {data?.birth?.date.split('-').reverse().join('-')}
            </Text>
            <Text style={styles.coachInfo}>
              Nazionalità: {data?.nationality}
            </Text>
          </View>
          <View>
            <Text style={styles.career}>Carriera</Text>
            <ScrollView contentContainerStyle={styles.scrollCareerContainer}>
              {data?.career?.map((team, index) => {
                return (
                  <View style={styles.careerContainer} key={index}>
                    <Image source={{uri: team.team.logo}} style={styles.logo} />
                    <View>
                      <Text style={styles.careerTeamInfo}>
                        {team.team.name}
                      </Text>
                      <View>
                        <Text style={styles.careerInfo}>
                          Inizio: {team.start.split('-').reverse().join('-')}
                        </Text>
                        <Text style={styles.careerInfo}>
                          Fine: {team.end?.split('-').reverse().join('-')}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
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
    flex: 2,
    padding: 15,
  },
  coach: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coachImage: {
    width: WIDTH / 3,
    height: WIDTH / 3,
  },
  nameContainer: {
    width: WIDTH / 2,
  },
  coachName: {
    fontSize: 22,
    fontWeight: '700',
    flexWrap: 'wrap',
  },
  actualTeam: {
    fontSize: 18,
    fontWeight: '600',
  },
  info: {
    marginTop: 15,
  },
  coachInfo: {
    fontSize: 16,
  },
  career: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  scrollCareerContainer: {
    paddingBottom: 300,
  },
  careerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logo: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  careerTeamInfo: {
    fontSize: 17,
    fontWeight: '500',
    paddingVertical: 1,
  },
  careerInfo: {
    fontSize: 15,
    fontWeight: '400',
    paddingVertical: 1,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CoachScreen;
