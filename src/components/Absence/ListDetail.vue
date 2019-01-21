<template>
  <v-layout >
    <v-flex xs12>
      <!-- start who are absence -->
      <v-card class="title-card-view-full">
        <h3>Who are absencing ?</h3>
      </v-card>
      <template >
        <v-card v-for="item in items" :key="item.id">
          <v-list two-line>
              <v-list-tile>
                <v-list-tile-avatar>
                  <img :src="item.avatar ">
                </v-list-tile-avatar>
                <v-list-tile-sub-title>
                  <span class="name-abcence-customer">{{ item.name }}</span>
                  <v-layout >
                    <v-icon class="icon-date-start">date_range</v-icon>
                    <span class="date-layout">{{ item.date_start }}</span>
                    <v-icon class="icon-date-end">date_range</v-icon>
                    <span  class="date-layout">{{ item.date_end }}</span>
                  </v-layout>
                  <v-layout>
                    <span class="date-off">1 day ago</span> | <span class="ml-3">LeeSin Jr</span>
                  </v-layout>
                </v-list-tile-sub-title>
              </v-list-tile>
          </v-list>
        </v-card>
      </template>
      <v-card class="title-card" >
        <span class="view-full-absence">View full</span>
        <h3 class="title-absencing">Who are absencing ?</h3>
      </v-card>
      <!-- end who are absence -->
      <!-- start upcoming absence -->
      <template>
        <v-card v-for="item in absences" :key="item.id">
          <v-list two-line>
              <v-list-tile
                avatar
              >
                <v-list-tile-avatar>
                  <img :src="item.avatar ">
                </v-list-tile-avatar>

                <v-list-tile-sub-title>
                  <span class="name-abcence-customer">{{ item.name }}</span>
                  <v-layout >
                    <v-icon class="icon-date-start">date_range</v-icon>
                    <span class="date-layout">{{ item.date_start }}</span>
                    <v-icon class="icon-date-end">date_range</v-icon>
                    <span  class="date-layout">{{ item.date_end }}</span>
                  </v-layout>
                  <v-layout>
                    <span class="date-off">1 day ago</span> | <span class="ml-3">LeeSin Jr</span>
                  </v-layout>
                </v-list-tile-sub-title>
              </v-list-tile>
          </v-list>
        </v-card>
      </template>
      <v-card class="title-card-view-full">
        <span class="view-full-absence">View full</span>
      </v-card>
      <!-- end upcoming absence -->
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    data () {
      return {
        items: [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            name: 'Ông nội',
            date_start: '25 Agust 1995',
            date_end: '25 May 1995',
            description: 'Style hơi chuối xí :D ',
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            name: 'Cha',
            date_start: '25 Agust 1995',
            date_end: '25 May 1995',
            description: 'Style hơi chuối xí :D ',
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            name: 'Con',
            date_start: '25 Agust 1995',
            date_end: '25 May 1995',
            description: 'Style hơi chuối xí :D ',
          },
        ],
        absences: [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            name: 'Ông nội',
            date_start: '25 Agust 1995',
            date_end: '25 May 1995',
            description: 'Style hơi chuối xí :D ',
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            name: 'Cha',
            date_start: '25 Agust 1995',
            date_end: '25 May 1995',
            description: 'Style hơi chuối xí :D ',
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            name: 'Con',
            date_start: '25 Agust 1995',
            date_end: '25 May 1995',
            description: 'Style hơi chuối xí :D ',
          },
        ]
      }
    }
  }
</script>
<style>
  .title-absencing{
    padding-top:80px
  }
  .view-full-absence{
    color: blue !important;
    float: right;
    margin-right: 10px;
  }
  .name-abcence-customer{
    font-weight: bold;
    color:#000000	;
  }
  .title-card{
    padding-left: 10px !important;
    height: 150px;
    line-height: 60px;
  }
  .title-card-view-full{
    padding-left: 10px !important;
    height: 50px;
    line-height: 60px;
  }
  .date-layout{
    font-size: 13px !important;
    padding-top: 3px;
  }
  .date-off{
    margin-right: 10px;
    color: #FF0000;
  }
  .icon-date-start{
    margin-right: 5px;
    font-size: 15px !important;
  }
  .icon-date-end{
    margin-left: 40px;
    margin-right: 5px;
    margin-top: 3px;
    font-size: 15px !important;
  }
  .title-upcoming{
    height: 100px;
    padding-left: 10px;
    line-height: 100px;
  }
</style>