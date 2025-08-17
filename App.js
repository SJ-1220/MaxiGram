import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { hints } from "./hints";
import { colors } from "./colors";

export default function App() {
  const size = 10;
  const [grid, setGrid] = useState(
    Array(size)
      .fill(null)
      .map(() => Array(size).fill(null))
  );
  const [mode, setMode] = useState("yes");
  const cellTouch = (rowIndex, colIndex) => {
    setGrid((grid) => {
      const newGrid = grid.map((row) => [...row]);
      if (mode === "yes") {
        newGrid[rowIndex][colIndex] = "yes";
      } else {
        newGrid[rowIndex][colIndex] = "no";
      }
      return newGrid;
    });
  };
  const modeChange = () => {
    setMode((prevMode) => (prevMode === "yes" ? "no" : "yes"));
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
                          cell === "yes"
                            ? colors.blue
                            : cell === "no"
                            ? colors.red
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
