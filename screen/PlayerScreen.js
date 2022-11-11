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
import {fetchPlayers} from '../features/matches/playerSlice';

const WIDTH = Dimensions.get('window').width;

const PlayerScreen = ({route}) => {
  const {id} = route.params;
  const isDarkMode = useSelector(state => state.darkMode.isDark);
  const isLoading = useSelector(state => state.player.isLoading);
  const error = useSelector(state => state.player.error);
  const data = useSelector(state => state.player.player);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlayers(id));
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
      {data.player && (
        <>
          <View>
            <View style={styles.player}>
              <Image
                source={{uri: data?.player?.photo}}
                style={styles.playerImage}
              />
              <View style={styles.nameContainer}>
                <Text style={[styles.playerName, {color}]}>
                  {data?.player?.firstname}
                </Text>
                <Text style={[styles.playerName, {color}]}>
                  {data?.player?.lastname}
                </Text>
                <Text style={{color}}>{data?.player?.name}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <Text style={[[styles.playerInfo, {color}], {color}]}>
                Anni: {data?.player?.age}
              </Text>
              <Text style={[styles.playerInfo, {color}]}>
                Anno di nascita:{' '}
                {data?.player?.birth?.date.split('-').reverse().join('-')}
              </Text>
              <Text style={[styles.playerInfo, {color}]}>
                Luogo di nascita: {data?.player?.birth?.place}
              </Text>
              <Text style={[styles.playerInfo, {color}]}>
                Nazionalità: {data?.player?.nationality}
              </Text>
              <Text style={[styles.playerInfo, {color}]}>
                Altezza: {data?.player?.height}
              </Text>
              <Text style={[styles.playerInfo, {color}]}>
                Peso: {data?.player?.weight}
              </Text>
            </View>
          </View>
          <Text style={[styles.stat, {color}]}>Statistiche</Text>
          <ScrollView contentContainerStyle={styles.scroll}>
            {data?.statistics?.map((stat, index) => {
              return (
                <View key={index} style={styles.statContainer}>
                  <View style={styles.team}>
                    <Image source={{uri: stat.team.logo}} style={styles.logo} />
                    <Text style={[styles.teamText, {color}]}>
                      {stat.team.name}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.leagueContainer}>
                      <Image source={{uri: stat.league.logo}} />
                      <Text style={[styles.league, {color}]}>
                        {stat.league.name} {stat.league.season}
                      </Text>
                    </View>
                    <View style={styles.seasonStatContainer}>
                      <Text style={[styles.singleStat, {color}]}>
                        Presenze: {stat.games.appearences}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Titolare: {stat.games.lineup}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Minuti giocati: {stat.games.minutes}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Entrato: {stat.substitutes.in}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Sostituito: {stat.substitutes.out}
                      </Text>
                    </View>
                    <View style={styles.seasonStatContainer}>
                      <Text style={[styles.singleStat, {color}]}>
                        Tiri totali: {stat.shots.total}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Tiri in porta: {stat.shots.on}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Goal: {stat.goals.total}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Goal subiti: {stat.goals.conceded}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Assist: {stat.goals.assists}
                      </Text>
                    </View>
                    <View style={styles.seasonStatContainer}>
                      <Text style={[styles.singleStat, {color}]}>
                        Passaggi totali: {stat.passes.total}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Passaggi chiave: {stat.passes.key}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Precisione passaggi: {stat.passes.accurancy}
                      </Text>
                    </View>
                    <View style={styles.seasonStatContainer}>
                      <Text style={[styles.singleStat, {color}]}>
                        Duelli totali: {stat.duels.total}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Duelli vinti: {stat.duels.won}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Dribling provati: {stat.dribbles.attempts}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Dribling vinti: {stat.dribbles.success}
                      </Text>
                    </View>
                    <View style={styles.seasonStatContainer}>
                      <Text style={[styles.singleStat, {color}]}>
                        Falli ricevuti: {stat.fouls.drawn}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Falli fatti: {stat.fouls.committed}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Cartellini gialli: {stat.cards.yellow}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Cartelli rossi: {stat.cards.red}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Rigori segnati: {stat.penalty.scored}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Rigori sbagliati: {stat.penalty.missed}
                      </Text>
                      <Text style={[styles.singleStat, {color}]}>
                        Rigori parati: {stat.penalty.saved}
                      </Text>
                    </View>
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
      color="#e307df"
      size="large"
      style={styles.activityIndicator}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  player: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerImage: {
    width: WIDTH / 3,
    height: WIDTH / 3,
  },
  stat: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  nameContainer: {
    width: WIDTH / 2,
  },
  playerName: {
    fontSize: 22,
    fontWeight: '700',
    flexWrap: 'wrap',
  },
  info: {
    marginTop: 15,
  },
  playerInfo: {
    fontSize: 16,
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 34,
    height: 34,
    marginRight: 10,
  },
  teamText: {
    fontSize: 20,
    fontWeight: '600',
  },
  statContainer: {
    marginVertical: 15,
  },
  leagueContainer: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  league: {
    fontSize: 17,
    fontWeight: '600',
  },
  seasonStatContainer: {
    marginVertical: 5,
  },
  singleStat: {
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

export default PlayerScreen;
