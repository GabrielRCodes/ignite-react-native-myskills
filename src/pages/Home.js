import React, {
  useState,
} from "react"; /* Sempre importar o react nos projetos */
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";

// Poucos elementos = ScrollView
// Muitos elementos = FlatList

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

export function Home() {
  const [newSkill, setNewSkill] = useState(""); // Armazenar a nova skill
  const [mySkills, setMySkills] = useState([]); // Armazenar todas as skills

  // handle = É utilizado quando a função é disparada por uma interação do usuário
  // EX => Quando o usuário clicar em algo

  function handleAddSkill() {
    setMySkills((oldState) => [...oldState, newSkill]);
    //setMySkills([...mySkills, newSkill]);
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Gabriel</Text>
        <TextInput
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />

        <Button onPress={handleAddSkill} />

        <Text style={[styles.title, { marginVertical: 30 }]}>My Skills</Text>

        <FlatList
          data={mySkills} // Coleção de dados obrigatória
          keyExtractor={(item) => item} // Cada item é a própria chave
          renderItem={({ item }) => (
            <SkillCard skill={item} /> // Chaves têm que estar na hierarquia direta e não no componente
          )} // Mostra o que será renderizado (Desestruturado)
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1F1e25",
    color: "#fff",
    fontSize: 18,
    padding: 15,
    marginTop: 30,
    borderRadius: 7,
  },
});
