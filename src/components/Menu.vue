<template>
  
    <v-navigation-drawer permanent color="light green darken 2" dark app height="100%">
      <v-list-item>
        
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            VeganWay
          </v-list-item-title>
          <v-list-item-subtitle link>
            
              <v-icon>mdi-login</v-icon>
              Fazer Login
           
            
          </v-list-item-subtitle>
        </v-list-item-content>
        
      </v-list-item>

      <v-divider></v-divider>
      <v-card light>
      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon color="grey">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-card>
    </v-navigation-drawer>
  
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Favoritas', icon: 'mdi-heart' },
          { title: 'Minhas receitas', icon: 'mdi-bookmark' },
          
        ],
        right: null,
      }
    },
  }
</script>