import {
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useEffect, useState, useMemo, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {competition} from '../competition';
import {getAllMatches, fetchAllMatches} from '../features/matches/matchesSlice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Matches from '../component/Matches';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const HomeScreen = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isOpen, setIsOpen] = useState(competition.map(() => false));
  const isDarkMode = useSelector(state => state.darkMode.isDark);
  const error = useSelector(state => state.matches.error);
  const isLoading = useSelector(state => state.matches.isLoading);
  const data = useSelector(getAllMatches);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMatches(date));
  }, [dispatch, date]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = useCallback(
    dateChoosen => {
      setDate(dateChoosen.toISOString().split('T')[0]);
      hideDatePicker();
      setIsOpen(competition.map(() => false));
    },
    [setDate, setIsOpen],
  );
  const matches = useMemo(
    () =>
      data.response?.filter(value => {
        return competition.indexOf(value.league.id) >= 1;
      }),
    [data.response],
  );

  const findLeagues = competition.map(value =>
    matches?.find(val => {
      return value === val.league.id;
    }),
  );

  let leagues = findLeagues?.filter(value => value !== undefined);

  const colorBackground = isDarkMode ? Colors.darker : Colors.lighter;
  const backgroundColor = isDarkMode ? Colors.dark : Colors.white;
  const textColor = isDarkMode ? Colors.lighter : Colors.darker;

  return error ? (
    <View style={[styles.errorContainer, {backgroundColor: colorBackground}]}>
      <Text style={[styles.errorText, {color: textColor}]}>
        Ops! Qualcosa è andato storto!!
      </Text>
    </View>
  ) : !isLoading ? (
    <View style={[styles.container, {backgroundColor: colorBackground}]}>
      {matches && (
        <>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.calendar}
              onPress={() => showDatePicker()}>
              <MaterialCommunityIcons
                name="calendar-blank"
                size={40}
                color={isDarkMode ? Colors.dark : Colors.primary}
                style={styles.calendarIcon}
              />
              <Text
                style={[
                  styles.date,
                  {color: isDarkMode ? Colors.lighter : '#ff0022'},
                ]}>
                {date.slice(-2)}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <ScrollView>
            {leagues?.map((val, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsOpen(prevState =>
                        prevState.map((item, idx) =>
                          idx === index ? !item : item,
                        ),
                      );
                    }}
                    style={[
                      styles.leagueContainer,
                      {backgroundColor, color: textColor},
                    ]}>
                    <View style={styles.leagueTextContainer}>
                      <Image
                        source={{uri: val?.league?.logo}}
                        style={styles.logo}
                        resizeMode="center"
                      />
                      <Text style={styles.leagueName}>{val?.league?.name}</Text>
                    </View>
                    {isOpen[index] ? (
                      <AntDesign
                        name="up"
                        size={20}
                        color={textColor}
                        style={styles.arrow}
                      />
                    ) : (
                      <AntDesign
                        name="down"
                        size={20}
                        color={textColor}
                        style={styles.arrow}
                      />
                    )}
                  </TouchableOpacity>
                  <View>
                    {isOpen[index] &&
                      matches?.map(
                        (match, index) =>
                          match?.league?.id === val?.league?.id && (
                            <Matches
                              key={index}
                              match={match}
                              navigation={navigation}
                              isDarkMode={isDarkMode}
                            />
                          ),
                      )}
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </>
      )}
    </View>
  ) : (
    <ActivityIndicator
      size="large"
      color="#e307df"
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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    height: HEIGHT / 15,
  },
  calendar: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderBottomColor: '#000',
    top: 10,
    right: 10,
  },
  calendarIcon: {
    position: 'relative',
    top: 10,
  },
  date: {
    position: 'relative',
    bottom: 20,
    right: 2,
    fontSize: 14,
    marginTop: 4,
    fontWeight: '600',
    marginRight: 10,
  },
  leagueContainer: {
    flexDirection: 'row',
    width: WIDTH,
    height: WIDTH / 4.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  leagueTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: 8,
  },
  leagueName: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
  },
  arrow: {
    marginRight: 8,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
