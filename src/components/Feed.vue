
<template>
  <!-- // Formatar Documento shift+alt+f -->
  <div>
    <Menu />
    <v-container>
      <v-row dense>
        <div class="cards"></div>
        <v-col
          v-for="card in cards"
          :key="card.nome"
          class="text-align-right"
          xl="4"
          offset-xl="8"
          cols="4"
        >
          <v-row justify="center">
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
                <v-btn icon v-bind="card.id" @click="show = !show" color="orange lighten-2">
                  <v-icon>{{
                    show ? "mdi-chevron-up" : "mdi-chevron-up"
                  }}</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>

              <!-- <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>
                  <v-card-subtitle>
                    <p class="font-wight-bold">Modo de Preparo:</p>
                  </v-card-subtitle>
                  <v-card-text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta dignissimos consectetur molestias placeat debitis
                    ipsum doloremque aliquid modi, pariatur aliquam
                    exercitationem similique consequatur eaque! Veniam ipsum
                    corrupti et maiores quasi?
                  </v-card-text>
                  <v-card-actions> </v-card-actions>
                </div>
              </v-expand-transition> -->
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
import { bancoDados } from '../firebase/config.js'

export default {
  components: {
    Menu,
  },
//   data: () => ({
  data: () => ({  
    dialog: false,
    cardId: null,
    cards: []
    /*cards: [
      {
        id: "1",
        title: "Pudim Vegano Gostoso",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/01/receitas-veganas-04.jpg",
        flex: 6,
        usuario: "user.nome",
      },
      {
        title: "Pizza Chamichurri",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/01/receitas-veganas-02-1.jpg",
        flex: 6,
        usuario: "user.nome",
        id: "2",
      },
      {
        title: "Hamburguer de Soja",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/02/receitas-veganas.jpg",
        flex: 6,
        usuario: "user.nome",
        id: "3",
      },
      {
        id: "4",
        title: "Pudim Vegano Gostoso",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/01/receitas-veganas-04.jpg",
        flex: 6,
        usuario: "user.nome",
      },
      {
        title: "Pizza Chamichurri",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/01/receitas-veganas-02-1.jpg",
        flex: 6,
        usuario: "user.nome",
        id: "5",
      },
      {
        title: "Hamburguer de Soja",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/02/receitas-veganas.jpg",
        flex: 6,
        usuario: "user.nome",
        id: "6",
      },
      {
        id: "7",
        title: "Pudim Vegano Gostoso",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/01/receitas-veganas-04.jpg",
        flex: 6,
        usuario: "user.nome",
      },
      {
        title: "Pizza Chamichurri",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/01/receitas-veganas-02-1.jpg",
        flex: 6,
        usuario: "user.nome",
        id: "8",
      },
      {
        title: "Hamburguer de Soja",
        src: "https://www.dicasdemulher.com.br/wp-content/uploads/2016/02/receitas-veganas.jpg",
        flex: 6,
        usuario: "user.nome",
        id: "9",
      },
    ],*/
  }),
  created() {
    bancoDados.collection("receitas").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.cards.push(
          {
            title: doc.data().titulo,
            src: doc.data().img,
            flex: 6,
            usuario: doc.data().usuario,
            id: doc.id
          })
      });
    });
  }
};
</script>