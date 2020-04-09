import React, { useState, useEffect } from "react";

import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function App() {
  const [repos, setRepos] = useState([]);

  async function getRepos() {
   const {data} = await api.get('repositories');
   setRepos(data);
  }

  useEffect(() => {
    getRepos();
  }, []);

  async function handleLikeRepository(id) {
   const {data} = await api.post(`/repositories/${id}/like`);
    
    const newRepo = repos.map(repo => {
      if (repo.id === id) {
        repo.likes = data.likes;
      }
      return repo;
    });

    setRepos(newRepo);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repos}
          keyExtractor={repo => repo.id}
          renderItem={({item: repo}) => (
            <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repo.title}</Text>

          <View style={styles.techsContainer}>
            {repo.techs.map(tech => (
              <Text style={styles.tech} key={Math.random(1, 100).toString()}>
                {tech}
              </Text>
            ))}
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={`repository-likes-${repo.id}`}
            >
              {repo.likes} {repo.likes > 0 ? 'curtidas' : 'curtida'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repo.id)}
            testID={`like-button-${repo.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
