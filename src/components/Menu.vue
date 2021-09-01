<template>
<div>
  <v-navigation-drawer permanent light app height="100%">
    <v-toolbar dark color="light green darken 2">
      <v-text class="h1">VeganWay</v-text>
      <v-spacer></v-spacer>
      <v-btn small text @click="dialogLogin = true">
        <v-icon>mdi-login</v-icon>
        login
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
                  <v-select
                    v-model="usuario"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    prepend-inner-icon="mdi-account"
                    label="Usuário"
                    required
                  ></v-select>

                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="senha"
                    :rules="senhaRules"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    label="Senha"
                    required
                  ></v-text-field>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="login">Login</v-btn>
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
</div>
</template>

<script>
export default {
  data() {
    return {
      dialogLogin: false,
      dialogCadastro: false,
      items: [
        { title: "Favoritas", icon: "mdi-heart" },
        { title: "Minhas receitas", icon: "mdi-bookmark" },
      ],
      right: null,
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
      let user = "";
      if (
        (this.usuario === "Sindico" || this.usuario === "Conselho") &&
        this.senha === "paq2240"
      ) {
        user = "sindico";
        this.$emit("meuLogin", { user });
      }
      if (this.usuario === "Porteiro" && this.senha === "portaria") {
        user = "porteiro";
        this.$emit("meuLogin", { user });
      } else {
        this.snackbarValidate = true;
        this.senha = null;
      }
    }
  } 
    };
    
  },
};
</script>