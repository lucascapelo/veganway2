<template>
  <!--<div @click="getAllReceitas">asfrefrfferf</div>-->
  <v-form ref="form">
    <v-text-field label="Título da receita" v-model="titulo"></v-text-field>
    <v-select :items="['Doces', 'Bebidas', 'Massas', 'Refeições', 'Saladas', 'Salgados', 'Sopas']" v-model="categoria" label="Categoria"></v-select>
    <label>Um ingrediente por linha</label>
    <v-textarea label="Ingredientes" v-model="tempIngredientes"></v-textarea>
    <v-textarea label="Modo de Preparo" v-model="modoPreparo"></v-textarea>
    <v-btn small>
      <input type="file" @change="onFileSelected" />
      <v-icon>mdi-upload</v-icon>
    </v-btn><br>
    <v-btn color="blue darken-1" text @click="cadastrar">Cadastrar</v-btn>
  </v-form>
</template>

<script>
import { bancoDados, bancoStorage } from '../firebase/config.js'

export default {
  data: () => ({
    //cadastro
    titulo: "",
    usuario: "",
    foto: null,
    categoria: "",
    tempIngredientes: "",
    ingredientes: [],
    modoPreparo: "",
    selectedFile: null
  }),
  methods: {
    getReceita() {
      bancoDados.collection("receitas").doc("ao2TaSCKc7BrhZExpqMR").get()
        .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
        // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch((error) => {
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
      this.ingredientes = this.tempIngredientes.split("\n")
      if (this.usuario === "" ) this.usuario = "VeganWay"

      //printa
      console.log(this.titulo)
      console.log(this.usuario)
      console.log(this.foto)
      console.log(this.categoria)
      console.log(this.ingredientes)
      console.log(this.modoPreparo)

      //add no banco
      bancoDados.collection("receitas").add({
        titulo: this.titulo,
        usuario: this.usuario,
        texto: this.modoPreparo,
        categoria: this.categoria,
        ingredientes: this.ingredientes,
        img: this.foto
      })
      console.log('Adicionado com sucesso')
      this.$refs.form.reset();
    },
    onFileSelected(event) {
      const self = this;
      this.selectedFile = event.target.files[0];
      var storageRef = bancoStorage.ref();
      var mountainImagesRef = storageRef.child(this.selectedFile.name);
      mountainImagesRef.put(this.selectedFile).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log("File available at", downloadURL);
          self.foto = downloadURL;
        });
        console.log("Uploaded a blob or file!");
        console.log(self.foto);
      });

      console.log('arquivo selecionado')
    }
  }
}
</script>

<style>

</style>
