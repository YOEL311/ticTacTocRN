/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';

const App = () => {
  const initTable = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const simple = {
    null: '-',
    true: '❌',
    false: '◯',
  };

  const [table, setTable] = React.useState(initTable);
  const [queue, setQueue] = React.useState(true);
  const [winner, setWinner] = React.useState(false);

  const pressCell = (row, col) => {
    if (winner) {
      return;
    }
    if (table[row][col] !== null) return;

    const newTable = [...table];
    newTable[row][col] = simple[queue];
    setTable(newTable);
    setQueue((old) => !old);
  };

  React.useEffect(() => {
    for (let i = 0; i < 3; i++) {
      const first = table[i][0];
      if (first !== null && first === table[i][1] && first === table[i][2]) {
        setWinner(true);
        break;
      }

      const firstR = table[0][i];
      if (firstR !== null && firstR === table[1][i] && firstR === table[2][i]) {
        setWinner(true);
        break;
      }

      const firstE = table[1][1];
      if (firstE === null) continue;
      if (
        (firstE === table[0][0] && firstE === table[2][2]) ||
        (firstE === table[2][0] && firstE === table[0][2])
      ) {
        setWinner(true);
        break;
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue]);

  return (
    <View style={styles.container}>
      <Text>
        {winner
          ? '🏆 player ' + simple[!queue] + ' win 	🏆'
          : 'play   ' + simple[queue]}
      </Text>
      {table.map((row, indexRow) => {
        return (
          <View key={indexRow} style={styles.rowTable}>
            {row.map((col, indexCol) => {
              return (
                <View style={styles.cell} key={indexCol}>
                  <Button
                    key={`${indexRow} ${indexCol}`}
                    onPress={() => {
                      pressCell(indexRow, indexCol);
                    }}
                    title={table[indexRow][indexCol] || '-'}
                  />
                </View>
              );
            })}
          </View>
        );
      })}
      <View style={styles.restart}>
        <Button
          onPress={() => {
            setTable(initTable);
            setWinner(false);
            // pressCell(indexRow, indexCol);
          }}
          title={'restart'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowTable: {
    flexDirection: 'row',
  },
  cell: {
    height: 30,
    width: 30,
    margin: 10,
  },
  restart: {
    margin: 50,
  },
});

export default App;
