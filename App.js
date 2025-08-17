import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { hints } from "./hints";
import { colors } from "./colors";
import { solution } from "./solution";

export default function App() {
  const size = 10;
  const [life, setLife] = useState(3);
  const [grid, setGrid] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );
  const [mode, setMode] = useState("yes");
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
        if (solution[rowIndex][colIndex] === 1) {
          newGrid[rowIndex][colIndex] = "blue";
        } else {
          newGrid[rowIndex][colIndex] = "redDark";
          setLife((prevlife) => prevlife - 1);
        }
      } else {
        if (solution[rowIndex][colIndex] === 0) {
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
  };
  const isGameClear = (grid) => {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (
          grid[row][col] === null ||
          grid[row][col] === undefined ||
          grid[row][col] === ""
        ) {
          return false;
        }
      }
    }
    return true;
  };
  const gameClear = () => {
    alert("Congratulations! You have cleared the game!");
  };
  const gameOver = () => {
    alert("Game Over! Better luck next time!");
  };
  return (
    <View style={styles.container}>
      <Text>
        This is {size}X{size} NonoGram
      </Text>
      <StatusBar style="auto" />
      <View>
        {/* 위 힌트 */}
        <View style={{ flexDirection: "row", marginLeft: 5 * size }}>
          {hints.row.map((i, hintRowIndex) => (
            <View
              key={hintRowIndex}
              style={[styles.hintRow, { width: 3 * size }]}
            >
              <View>
                {hints.row[hintRowIndex].map((i, hintRowIndexIndex) => (
                  <Text key={hintRowIndexIndex}>
                    {hints.row[hintRowIndex][hintRowIndexIndex]}
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
              {hints.col.map((i, hintColIndex) => (
                <View
                  key={hintColIndex}
                  style={[styles.hintCol, { width: 5 * size }]}
                >
                  <View style={{ flexDirection: "row" }}>
                    {hints.col[hintColIndex].map((i, hintColIndexIndex) => (
                      <Text key={hintColIndexIndex} style={{ marginRight: 3 }}>
                        {hints.col[hintColIndex][hintColIndexIndex]}
                      </Text>
                    ))}
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
        <View style={styles.mode}>
          <Text style={{ marginRight: 5 }}>MODE :</Text>
          <TouchableOpacity onPress={modeChange}>
            <Text style={{ textTransform: "uppercase" }}>{mode}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>Life Left : {life}</Text>
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
  cell: {
    width: 30,
    height: 30,
    borderColor: "#000",
    borderWidth: 1,
  },
  hintRow: {
    alignItems: "center",
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
  },
});
