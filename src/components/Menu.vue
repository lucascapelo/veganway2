<template>
<div>
  <v-navigation-drawer permanent light app height="100%">
    <v-toolbar dark color="light green darken 2">
      <v-text class="h1" v-if="nomeUsuario != ''">{{ nomeUsuario }}</v-text>
      <v-text class="h1" v-else>VeganWay</v-text>
      <v-spacer></v-spacer>
      <v-btn small text @click="dialogLogin = true" v-if="!logado">
        <v-icon>mdi-login</v-icon>
        login
      </v-btn>
      <v-btn small text @click="logout" v-else>
        <v-icon>mdi-login</v-icon>
        sair
      </v-btn> 
    </v-toolbar>

    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon color="grey">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  <!-- DIALOG DE LOGIN -->
  <v-dialog v-model="dialogLogin">
    <v-card color="green lighten-4" >
      <v-container>
        <v-row>
          
          <v-col cols="12">
            <v-row align="center" justify="center" style="height: 300px;">
              <v-card class="ma-3 pa-6" outlined tile>
                <v-form>
                  <v-text-field
                    v-model="emailLogin"
                    :rules="[v => !!v || 'Item is required']"
                    prepend-inner-icon="mdi-account"
                    label="e-mail"
                    required
                  ></v-text-field>

                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="senhaLogin"
                    :rules="senhaRules"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    label="senha"
                    required
                  ></v-text-field>
                </v-form>
                <v-card-actions>
                  <v-btn @click="dialogCadastro=true">cadastrar</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn @click="login" color="green lighten-4">Login</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-snackbar
      v-model="snackbarValidate"
      :timeout="timeout"
      top
      color="red"
    >Usuário ou senha incorretos</v-snackbar>
  </v-dialog>


  <!-- DIALOG CADASTRO -->
  <v-dialog v-model="dialogCadastro">
    <v-card color="green lighten-4" >
      <v-container>
        <v-row>
          
          <v-col cols="12">
            <v-row align="center" justify="center" style="height: 300px;">
              <v-card class="ma-3 pa-6" outlined tile>
                <v-form>
                  <v-text-field
                    v-model="nomeCadastro"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    prepend-inner-icon="mdi-account"
                    label="usuário"
                    required
                  ></v-text-field>

                  <v-spacer></v-spacer>

                  <v-text-field
                    v-model="email"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    prepend-inner-icon="mdi-email-multiple"
                    label="e-mail"
                    required
                  ></v-text-field>

                  <v-spacer></v-spacer>

                  <v-text-field
                    v-model="senha"
                    :rules="senhaRules"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    label="senha"
                    required
                  ></v-text-field>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="cadastro">cadastrar</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import { bancoDados, bancoAuth } from '../firebase/config.js'

export default {
  data: () => ({
    //Cadastro e login
    logado: false,
    nomeUsuario: "",
    nomeCadastro: "",
    email: "",
    senha: "",
    emailLogin: "",
    senhaLogin: "",

    dialogLogin: false,
    dialogCadastro: false,
    items: [
      { title: "Favoritas", icon: "mdi-heart" },
      { title: "Minhas receitas", icon: "mdi-bookmark" }
    ],
    right: null,
    nameRules: [v => !!v || "Usuário é requerido"],
    senhaRules: [v => !!v || "Senha é requerida"]
    }),
  methods: {
  validate() {
    if (this.$refs.form.validate()) {
      this.snackbar = true;
    }
  },
  reset() {
    this.$refs.form.reset();
  },
  resetValidation() {
    this.$refs.form.resetValidation();
  },
    login() {
      if(bancoAuth.currentUser) {
        console.log("ja tava logadoo"+bancoAuth.currentUser) 
      } else {
        console.log('nem ta logadoo')
      }
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
            this.dialogLogin = false
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
    logout() {
    bancoAuth.signOut()
    .then(() => { 
      this.logado = false
      console.log('Logout')
      this.nomeUsuario = ""
    })
    .catch((error) => { console.log(error)} );
    },
    cadastro() {
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
        this.dialogCadastro = false
        this.dialogLogin = false
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage)
      });
    }
  },
  mounted() {
    //detecta se ta logado
    bancoAuth.onAuthStateChanged(user => {
        if (user) {
           console.log("ta logado"+user)
           this.logado = true
           bancoDados.collection("usuarios").doc(user.uid).get()
           .then((doc) => { this.nomeUsuario = doc.data().nome })
           .catch((error) => { console.log(error)} )
        } else {
          this.logado = false
        }
    });
  }
};
</script>