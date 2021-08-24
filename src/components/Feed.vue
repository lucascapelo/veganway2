<template>
<div>
    <Menu/>
<v-container>
    <v-row dense align="center">
        <v-spacer></v-spacer>
    <v-col v-for="card in cards"
    :key="card.title">

        <v-card
            class="mx-auto"
            max-width="344"
        >
            <v-img
            :src="card.src"
            class="white--text align-end"
            height="200px"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
            <v-card-title v-text="card.title"> </v-card-title>

            </v-img>

            

            <v-card-subtitle>                
                feito por:
                
            </v-card-subtitle>

            <v-card-actions>
            <v-btn
                color="orange lighten-2"
                text
            >
                Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
            </v-card-actions>

            <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-card-subtitle>
                    <p class="font-wight-bold">
                        Modo de Preparo:
                    </p>
                </v-card-subtitle>
                <v-card-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dignissimos consectetur molestias placeat debitis ipsum doloremque aliquid modi, pariatur aliquam exercitationem similique consequatur eaque! Veniam ipsum corrupti et maiores quasi?
                </v-card-text>
                <v-card-actions>
                    
                </v-card-actions>
            </div>
            </v-expand-transition>
        </v-card>
        </v-col>
  </v-row>
  </v-container>
  </div>
</template>

<script>
import Menu from "./Menu.vue";
  export default {
      components:{
        Menu
      },
    data: () => ({
      show: false,
      cards: [
        { title: 'Pudim Vegano Gostoso', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 6 },
        { title: 'Pizza Chamichurri', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Hamburguer de Soja', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],
    }),
  }
</script>