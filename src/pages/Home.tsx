import React, {
  useEffect,
  useState,
} from "react"; /* Sempre importar o react nos projetos */ // useNomeDoHook //
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";

// Poucos elementos = ScrollView
// Muitos elementos = FlatList

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
} // Interfaces sempre fora de funções

export function Home() {
  const [newSkill, setNewSkill] = useState(""); // Armazenar a nova skill
  const [mySkills, setMySkills] = useState<SkillData[]>([]); // Armazenar todas as skills
  const [gretting, setGretting] = useState("");

  // handle = É utilizado quando a função é disparada por uma interação do usuário
  // EX => Quando o usuário clicar em algo

  function handleAddSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills((oldState) => [...oldState, data]);
    //setMySkills([...mySkills, newSkill]);
  }
  // Spread Operator (...), para não incluir um vetor dentro de outro vetor, mas sim trazer apenas os elementos.
  // EX:
  // Sem Spread Operator
  // [[React Native, TypeScript], JavaScript]
  // Com Spread Operator
  // [React Native, TypeScript, JavaScript]

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGretting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting("Good afternoon");
    } else {
      setGretting("Good night");
    }
  }, []);

  // UseEffect = Função
  // Primeiro parâmetro: () => {}
  // -- Arrow Function
  // Separação: ,
  // Segundo parâmetro: []
  // -- Array de dependência, fica ouvindo as dependências
  // -- Ao deixar vazio, o useEffect será feito quando a interface carregar, sempre

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, Gabriel</Text>

        <Text style={styles.greetings}>{gretting}</Text>

        <TextInput
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
        />

        <Button 
          onPress={handleAddSkill} 
          activeOpacity={0.7}
          title="Add"
        />

        <Text style={[styles.title, { marginVertical: 30 }]}>My Skills</Text>

        <FlatList
          data={mySkills} // Coleção de dados obrigatória
          keyExtractor={(item) => item.id} // Cada item é a própria chave
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
  greetings: {
    color: "#fff",
  },
});
