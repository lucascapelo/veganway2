
<template>
  <!-- // Formatar Documento shift+alt+f -->
  <div>
    <Menu />
    <v-toolbar flat dark color="grey lighten-4">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!-- DIALOG DE ADC RECEITA -->
        <v-row justify="center">
          <v-dialog
            max-width="600px"
            v-model="dialogAddReceita"
            persistent
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ma-2"
                fab
                color="light orange"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark> mdi-plus </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-toolbar dark color="light green darken 2">
                <v-btn icon dark @click="dialogAddReceita = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Adicionar uma receita nova</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
            </v-card>
            <v-card>
              <v-card-title>
                <span class="text-h6">Preencha os campos abaixo:</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Nome da receita*"
                        v-model="titulo"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select
                        :items="[
                          'Doces',
                          'Bebidas',
                          'Massas',
                          'Refeições',
                          'Saladas',
                          'Salgados',
                          'Sopas',
                        ]"
                        v-model="categoria"
                        label="Categoria"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        label="Ingredientes"
                        hint="teste"
                        v-model="tempIngredientes"
                      ></v-textarea>
                      <small>*Escreva um ingrediente por linha</small>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        label="Modo de preparo"
                        hint="Descreva detalhadamente o modo de preparo da sua receita"
                        v-model="modoPreparo"
                        required
                      ></v-textarea>
                    </v-col>
                    <v-btn small>
                      <input type="file" @change="onFileSelected" />
                      <v-icon>mdi-upload</v-icon> </v-btn
                    ><br />
                  </v-row>
                </v-container>

                <small>*campo obrigatório</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn fab color="light green darken 2" dark @click="cadastrar">
                  <v-icon dark> mdi-plus </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
        <!-- <v-btn fab dark color="light green darken 2">
          <v-icon dark> mdi-plus </v-icon>
        </v-btn> -->
      </v-toolbar-items>
    </v-toolbar>

    <v-card color="grey lighten-4">
      <v-container>
      <v-row>
        <div class="cards"></div>
        <v-col
          v-for="card in cards"
          :key="card.nome"
          class="text-align-right"
          xl="4"
          offset-xl="8"
          cols="4"
        >
          <v-row justify="end">
            <v-card class="ma-6" max-width="344">
              <v-img
                :src="card.src"
                class="white--text align-end"
                height="200px"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title v-text="card.title"> </v-card-title>
              </v-img>

              <v-card-subtitle>Feito por: {{ card.usuario }} </v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="orange" text @click="abrirReceita(card)">
                  ver receita
                  <v-icon>mdi-chevron-up</v-icon>
                </v-btn>

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    </v-card>
    <!-- ABRIR DIALOG DE RECEITA -->
    <v-row justify="center">
      <v-dialog
        v-model="dialogReceita"
        max-width="500"
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card max-width="500">
          <v-toolbar dark color="orange">
            <v-btn icon dark @click="dialogReceita = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title></v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-img width="500" v-if="this.Cardfoto" :src="this.Cardfoto"></v-img>
          <v-card-title>{{ this.Cardtitulo }}</v-card-title>
          <v-card-subtitle> Por: {{ this.Cardusuario }}</v-card-subtitle>
          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>

              <div class="grey--text ms-4">4.5 (413)</div>
            </v-row>
            <!-- INFORMAÇÕES SOBRE A RECEITA -->
            <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-card-title>Ingredientes:</v-card-title>
                <ul>
                  <li v-for="receitas in CardtempIngredientes" :key="receitas"> {{receitas}} </li>
                </ul>
              </v-col>
              
              
              <v-col cols="12">
                <v-card-title>Modo de Preparo:</v-card-title>
                <v-card-text>{{this.CardmodoPreparo}}</v-card-text>
              </v-col>

              <v-col cols="12">
                <div style="margin-bottom: 20px"><h3>Comentários</h3></div>
                <div style="margin-bottom: 10px" v-for="comment in comentarios" :key="comment">
                  <h4>{{ comment.usuario }}</h4>
                  <p>{{ comment.texto }}</p>
                </div>
              </v-col>

              <v-col cols="12">
                <v-textarea label="O que você achou dessa receita?" outlined v-model="comentario"></v-textarea>
                <v-btn @click="comentar">comentar</v-btn>
              </v-col>                         
              
            </v-row>
          </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
// import { bancoDados } from "../firebase/config.js";
import { bancoDados, bancoStorage, bancoAuth } from "../firebase/config.js";

export default {
  components: {
    Menu,
  },
  //   data: () => ({
  data: () => ({
    dialogAddReceita: false,
    dialogReceita: false,
    cardId: null,
    cards: [],
    comentarios: [],
    comentario: "",

    //intes da receita
    titulo: "",
    usuario: "",
    foto: null,
    categoria: "",
    tempIngredientes: "",
    ingredientes: [],
    modoPreparo: "",
    selectedFile: null,
    Cardtitulo: "",
    Cardusuario: "",
    Cardfoto: null,
    Cardcategoria: "",
    CardtempIngredientes: "",
    CardmodoPreparo: "",
  }),
  created() {
    bancoDados
      .collection("receitas")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.cards.push({
            title: doc.data().titulo,
            src: doc.data().img,
            flex: 6,
            usuario: doc.data().usuario,
            id: doc.id,
            ingredientes: doc.data().ingredientes,
            texto: doc.data().texto,
            categoria: doc.data().categoria,
          });
        });
      });
  },
  methods: {
    abrirReceita(card) {
      this.dialogReceita = true;

      //printa
      console.log(card.id);
      console.log(card.usuario);
      console.log(card.src);
      console.log(card.texto);
      console.log(card.categoria);
      console.log(card.title);
      console.log(card.ingredientes);
      
      //salva
      this.cardId = card.id;
      this.Cardtitulo = card.title;
      this.Cardusuario = card.usuario;
      this.Cardfoto = card.src;
      this.Cardcategoria = card.categoria;
      this.CardtempIngredientes = card.ingredientes;
      this.CardmodoPreparo = card.texto;

      //carrega os comentários
      this.comentarios = []
      bancoDados.collection("comentarios").where("receita", "==", this.cardId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data())
          this.comentarios.push( { id: doc.id, receita: doc.data().receita, usuario: doc.data().usuario, texto: doc.data().texto } )
          console.log(this.comentarios)
        });
      })
      .catch((error) => console.log(error));
    },
    getReceita() {
      bancoDados.collection("receitas").doc("ao2TaSCKc7BrhZExpqMR").get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    },
    getAllReceitas() {
      bancoDados.collection("receitas").get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
        });
    },
    cadastrar() {
      this.dialogAddReceita = false;
      this.ingredientes = this.tempIngredientes.split("\n");

      //pega nome de usuário no banco se estiver logado
      if(bancoAuth.currentUser) {
        bancoDados.collection("usuarios").doc(bancoAuth.currentUser.uid).get()
        .then((doc) => { 
          if (doc.exists) this.usuario = doc.data().nome
        })
      }

      if (this.usuario === "") this.usuario = "Anônimo";

      //printa
      console.log(this.titulo);
      console.log(this.usuario);
      console.log(this.foto);
      console.log(this.categoria);
      console.log(this.ingredientes);
      console.log(this.modoPreparo);

      //add no banco
      bancoDados.collection("receitas").add({
        titulo: this.titulo,
        usuario: this.usuario,
        texto: this.modoPreparo,
        categoria: this.categoria,
        ingredientes: this.ingredientes,
        img: this.foto,
      })
      .then((docRef) => {
        //adiciona no card
        this.cards.push({
        title: this.titulo,
        src: this.foto,
        flex: 6,
        usuario: this.usuario,
        id: docRef.id,
        ingredientes: this.ingredientes,
        texto: this.modoPreparo,
        categoria: this.categoria
        });
        console.log("docRef: "+docRef.id);
      })
      .catch((error) => { console.log(error)});
      console.log("Adicionado com sucesso");
    },
    comentar() {
      if (this.usuario === "") this.usuario = "Anônimo"

      //pega nome de usuário no banco se estiver logado
      if(bancoAuth.currentUser) {
        bancoDados.collection("usuarios").doc(bancoAuth.currentUser.uid).get()
        .then((doc) => { 
          if (doc.exists) this.usuario = doc.data().nome
        })
      }

      bancoDados.collection("comentarios").add({
        receita: this.cardId,
        usuario: this.usuario,
        texto: this.comentario
      })
      .then((docRef) => {
        this.comentarios.push({
          id: docRef.id,
          receita: this.cardId,
          usuario: this.usuario,
          texto: this.comentario
        });
        this.comentario = ""
      })
      .catch((error) => { console.log(error) })
    },
    onFileSelected(event) {
      const self = this;
      this.selectedFile = event.target.files[0];
      var storageRef = bancoStorage.ref();
      var mountainImagesRef = storageRef.child(this.selectedFile.name);
      mountainImagesRef.put(this.selectedFile).then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log("File available at", downloadURL);
          self.foto = downloadURL;
        });
        console.log("Uploaded a blob or file!");
        console.log(self.foto);
      });

      console.log("arquivo selecionado");
    },
  },
  mounted() {
    //detecta se ta logado
    bancoAuth.onAuthStateChanged(user => {
        if (user) {
           console.log("ta logado"+user)
           this.logado = true
           bancoDados.collection("usuarios").doc(user.uid).get()
           .then((doc) => { this.usuario = doc.data().nome })
           .catch((error) => { console.log(error)} )
        } else {
          this.logado = false
          this.usuario = ""
        }
    });
  }
};
</script>