<template>
  <div @click="getAllReceitas">asfrefrfferf</div>
</template>

<script>
import { bancoDados } from '../firebase/config.js'

export default {
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
    }
  }
}
</script>

<style>

</style>
