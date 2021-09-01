<template>
  <div> 
    <div v-if="logado">Olá {{ nomeUsuario }}</div>
    <v-form ref="cadastro">
    <h2>Cadastrar</h2>
    <v-text-field label="nome" v-model="nomeCadastro"></v-text-field>
    <v-text-field label="e-mail" v-model="email"></v-text-field>
    <v-text-field label="senha" v-model="senha" type="password"></v-text-field>
    <v-btn color="blue darken-1" text @click="cadastrar">Cadastrar</v-btn>
    </v-form>

    <v-form ref="login">
    <h2>Login</h2>
    <v-text-field label="e-mail" v-model="emailLogin"></v-text-field>
    <v-text-field label="senha" v-model="senhaLogin" type="password"></v-text-field>
    <v-btn color="blue darken-1" text @click="login">Login</v-btn>
    </v-form>
    <v-btn color="blue darken-1" text @click="sair">Sair</v-btn>
  </div>
</template>

<script>
import { bancoDados, bancoAuth } from '../firebase/config.js'

export default {
  data: () => ({
    logado: false,
    nomeUsuario: "",
    nomeCadastro: "",
    email: "",
    senha: "",
    emailLogin: "",
    senhaLogin: "",
  }),
  methods: {
    cadastrar() {
      console.log(this.email)
      console.log(this.senha)
      bancoAuth.createUserWithEmailAndPassword(this.email, this.senha)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user)
        bancoDados.collection("usuarios").doc(user.uid).set( { nome: this.nomeCadastro } );
        this.logado = true
        this.nomeUsuario = this.nomeCadastro
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage)
      });
    },
    login() {
      //bancoAuth.setPersistence(bancoPersistance)
      bancoAuth.signInWithEmailAndPassword(this.emailLogin, this.senhaLogin)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        this.logado = true
        console.log(user.uid);
        bancoDados.collection("usuarios").doc(user.uid).get()
          .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            this.nomeUsuario = doc.data().nome
          } else {
            console.log("No such document!");
          }
        }).catch((error) => {
        console.log("Error getting document:", error);
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage)
      });
    },
    sair() {
    bancoAuth.signOut()
    .then(() => { 
      this.logado = false
      console.log('Logout') })
    .catch((error) => { console.log(error)} );
    }
  },
  created() {
    if(this.logado) {
      console.log("ATUAL USUARIO"+bancoAuth.currentUser.uid)
    } else {
      console.log('deslogado')
    }
  }
}
</script>

<style>

</style>