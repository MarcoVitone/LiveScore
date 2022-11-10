import {View, StyleSheet, Dimensions, ScrollView, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const WIDTH = Dimensions.get('window').width;

const Statistics = ({homeStatistics, awayStatistics, isDarkMode}) => {
  const color = isDarkMode ? Colors.light : Colors.dark;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.homeContainer}>
        {homeStatistics.map((value, index) => {
          let val = value.value;
          if (val === null) {
            val = 0;
          }
          return (
            <Text style={[styles.text, {color}]} key={index}>
              {val}
            </Text>
          );
        })}
      </View>
      <View style={styles.textStat}>
        <Text style={[styles.text, {color}]}>Tiri in porta</Text>
        <Text style={[styles.text, {color}]}>Tiri furi</Text>
        <Text style={[styles.text, {color}]}>Totale tiri</Text>
        <Text style={[styles.text, {color}]}>Tiri bloccati</Text>
        <Text style={[styles.text, {color}]}>Tiri in area</Text>
        <Text style={[styles.text, {color}]}>Tiri fuori area</Text>
        <Text style={[styles.text, {color}]}>Falli</Text>
        <Text style={[styles.text, {color}]}>Calci d'angolo</Text>
        <Text style={[styles.text, {color}]}>Fuorigioco</Text>
        <Text style={[styles.text, {color}]}>Possesso palla</Text>
        <Text style={[styles.text, {color}]}>Cartellini gialli</Text>
        <Text style={[styles.text, {color}]}>Cartellini rossi</Text>
        <Text style={[styles.text, {color}]}>Salvataggi del portiere</Text>
        <Text style={[styles.text, {color}]}>Passaggi totali</Text>
        <Text style={[styles.text, {color}]}>Passaggi riusciti</Text>
        <Text style={[styles.text, {color}]}>Precisione passaggi</Text>
      </View>
      <View style={styles.awayContainer}>
        {awayStatistics.map((value, index) => {
          let val = value.value;
          if (val === null) {
            val = 0;
          }
          return (
            <Text style={[styles.text, {color}]} key={index}>
              {val}
            </Text>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  homeContainer: {
    alignItems: 'center',
  },
  textStat: {
    alignItems: 'center',
  },
  awayContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginVertical: 3,
  },
});

export default Statistics;
