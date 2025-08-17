import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { hints } from "./hints";
import { colors } from "./colors";
import { solution } from "./solution";

export default function App() {
  const [size, setSize] = useState(10);
  const [life, setLife] = useState(3);
  const [grid, setGrid] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );
  const [mode, setMode] = useState("yes");
  const [endEasy, setEndEasy] = useState(false);
  const [endNormal, setEndNormal] = useState(false);
  const [endHard, setEndHard] = useState(false);
  const [endExtraHard, setEndExtraHard] = useState(false);
  const [modeEmoji, setModeEmoji] = useState("⭕");
  useEffect(() => {
    setGrid(
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(null))
    );
    setLife(3);
  }, [size]);
  useEffect(() => {
    if (life <= 0) {
      gameOver();
    }
  }, [life]);
  const cellTouch = (rowIndex, colIndex) => {
    setGrid((grid) => {
      if (
        grid[rowIndex][colIndex] !== "" &&
        grid[rowIndex][colIndex] !== null &&
        grid[rowIndex][colIndex] !== undefined
      ) {
        return grid;
      }
      const newGrid = grid.map((row) => [...row]);
      if (mode === "yes") {
        if (solution[size][rowIndex][colIndex] === 1) {
          newGrid[rowIndex][colIndex] = "blue";
        } else {
          newGrid[rowIndex][colIndex] = "redDark";
          setLife((prevlife) => prevlife - 1);
        }
      } else {
        if (solution[size][rowIndex][colIndex] === 0) {
          newGrid[rowIndex][colIndex] = "red";
        } else {
          newGrid[rowIndex][colIndex] = "blueDark";
          setLife((prevlife) => prevlife - 1);
        }
      }
      if (isGameClear(newGrid)) {
        gameClear();
      }
      return newGrid;
    });
  };
  const modeChange = () => {
    setMode((prevMode) => (prevMode === "yes" ? "no" : "yes"));
    setModeEmoji((prevEmoji) => (prevEmoji === "⭕" ? "❌" : "⭕"));
  };
  const isGameClear = (grid) => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (
          grid[row][col] === null ||
          grid[row][col] === undefined ||
          grid[row][col] === ""
        ) {
          return false;
        }
      }
    }
    if (size === 5) {
      setEndEasy(true);
    }
    if (size === 10) {
      setEndNormal(true);
    }
    if (size === 15) {
      setEndHard(true);
    }
    if (size === 30) {
      setEndExtraHard(true);
    }
    return true;
  };
  const levelEasy = () => {
    setSize(5);
  };
  const levelNormal = () => {
    setSize(10);
  };
  const levelHard = () => {
    setSize(15);
  };
  const levelSuparHard = () => {
    setSize(30);
  };
  const gameClear = () => {
    alert("Congratulations! You have cleared the game!");
  };
  const gameOver = () => {
    setLife(3);
    setGrid(
      Array(size)
        .fill(null)
        .map(() => Array(size).fill(null))
    );
    alert("Game Over! Better luck next time!");
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={{ fontSize: 28, marginTop: 30 }}>
          This is {size}X{size} MaxiGram
        </Text>
      </View>
      {/* 전체 힌트와 표 */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{ flex: 1 }}
      >
        {/* 위 힌트 */}
        <View style={{ flexDirection: "row", marginLeft: 5 * size }}>
          {hints[size].row.map((i, hintRowIndex) => (
            <View key={hintRowIndex} style={styles.hintRow}>
              <View>
                {hints[size].row[hintRowIndex].map((i, hintRowIndexIndex) => (
                  <Text key={hintRowIndexIndex}>
                    {hints[size].row[hintRowIndex][hintRowIndexIndex]}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
        {/* 왼쪽 힌트와 표 */}
        <View style={{ flexDirection: "row" }}>
          {/* 왼쪽 힌트 */}
          <View>
            <View>
              {hints[size].col.map((i, hintColIndex) => (
                <View
                  key={hintColIndex}
                  style={[styles.hintCol, { width: 5 * size }]}
                >
                  <View style={{ flexDirection: "row" }}>
                    {hints[size].col[hintColIndex].map(
                      (i, hintColIndexIndex) => (
                        <Text
                          key={hintColIndexIndex}
                          style={{ marginRight: 3 }}
                        >
                          {hints[size].col[hintColIndex][hintColIndexIndex]}
                        </Text>
                      )
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
          {/* 표 */}
          <View>
            {grid.map((gridRow, hintRowIndex) => (
              <View key={hintRowIndex} style={{ flexDirection: "row" }}>
                {gridRow.map((cell, rowColIndex) => (
                  <TouchableOpacity
                    key={rowColIndex}
                    style={[
                      styles.cell,
                      {
                        backgroundColor:
                          cell === "blue"
                            ? colors.blue
                            : cell === "blueDark"
                            ? colors.blueDark
                            : cell === "red"
                            ? colors.red
                            : cell === "redDark"
                            ? colors.redDark
                            : "#fff",
                      },
                    ]}
                    onPress={() => cellTouch(hintRowIndex, rowColIndex)}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={modeChange} style={styles.mode}>
          <Text style={{ marginRight: 5 }}>MODE :</Text>
          <View>
            <Text>{modeEmoji}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            width: 250,
            alignSelf: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: colors.red,
            }}
          />
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: life <= 1 ? "#000" : colors.red,
            }}
          />
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: life <= 2 ? "#000" : colors.red,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: 300,
            justifyContent: "space-between",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: endEasy ? colors.yellow : "#fff",
              borderRadius: 20,
            }}
            onPress={levelEasy}
          >
            <Text>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: endNormal ? colors.yellow : "#fff",
              borderRadius: 20,
            }}
            onPress={levelNormal}
          >
            <Text>Normal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: endHard ? colors.yellow : "#fff",
              borderRadius: 20,
            }}
            onPress={levelHard}
          >
            <Text>Hard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 5,
              backgroundColor: endExtraHard ? colors.yellow : "#fff",
              borderRadius: 20,
            }}
            onPress={levelSuparHard}
          >
            <Text>SUPAR HARD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    height: 100,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 30,
  },
  cell: {
    width: 30,
    height: 30,
    borderColor: "#000",
    borderWidth: 1,
  },
  hintRow: {
    alignItems: "center",
    width: 30,
  },
  hintCol: { height: 30, justifyContent: "center" },
  mode: {
    width: 110,
    height: 30,
    marginTop: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  footer: {
    height: 170,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: 30,
  },
});
