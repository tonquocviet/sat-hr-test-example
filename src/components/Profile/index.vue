<template>
  <div class="px-3 py-3">
    <v-layout row wrap class="date-absence-header">
      <v-flex sm12 md3>
        <UserAvatar
          imageUrl="https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png"
          name="Vuong Phan"
          width="unset"
          justifyContent="flex-start"
          avatarSize="250px"
          class="user-img"
        />
      </v-flex>
      <v-flex sm12 md9>
        <h2>Deavax Leave</h2>
        <v-layout row wrap>
          <v-flex md3 class="px-1 py-1">
            <v-card style="border-top:7px solid blue;border-radius:6px">
              <v-card-title>
                <div style="width:100%">
                  <h3>A Leave Of Absence</h3>
                  <span class="font-weight-bold display-1 blue--text">7/7</span>
                  <br>
                  <b>Absence</b>
                  <br>
                  <v-layout>
                    <v-flex xs6 class="grey--text">Number</v-flex>
                    <v-flex xs6 class="grey--text text-xs-right">2</v-flex>
                  </v-layout>
                </div>
              </v-card-title>
              <v-card-actions class="px-0">
                <v-btn flat color="blue">
                  <span>ADJUST</span>
                  <v-icon size="15">arrow_forward</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex md3 class="px-1 py-1">
            <v-card style="border-top:7px solid green;border-radius:6px">
              <v-card-title>
                <div style="width:100%">
                  <h3>A Leave Of Absence</h3>
                  <span class="font-weight-bold display-1 green--text">16/16</span>
                  <br>
                  <b>Absence</b>
                  <br>
                  <v-layout>
                    <v-flex xs6 class="grey--text">Number</v-flex>
                    <v-flex xs6 class="grey--text text-xs-right">2</v-flex>
                  </v-layout>
                </div>
              </v-card-title>
              <v-card-actions class="px-0">
                <v-btn flat color="green">
                  <span>ADJUST</span>
                  <v-icon size="15">arrow_forward</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex md3 class="px-1 py-1">
            <v-card style="border-top:7px solid red;border-radius:6px">
              <v-card-title>
                <div style="width:100%">
                  <h3>A Leave Of Absence</h3>
                  <span class="font-weight-bold display-1 red--text">7/7</span>
                  <br>
                  <b>Absence</b>
                  <br>
                  <v-layout>
                    <v-flex xs6 class="grey--text">Number</v-flex>
                    <v-flex xs6 class="grey--text text-xs-right">2</v-flex>
                  </v-layout>
                </div>
              </v-card-title>
              <v-card-actions class="px-0">
                <v-btn flat color="red">
                  <span>ADJUST</span>
                  <v-icon size="15">arrow_forward</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex md3 class="px-1 py-1">
            <v-card style="border-top:7px solid purple;border-radius:6px">
              <v-card-title>
                <div style="width:100%">
                  <h3>A Leave Of Absence</h3>
                  <span class="grey--text">Absence</span>
                  <br>
                  <span class="grey--text">Absence</span>
                  <br>
                  <span class="grey--text">Absence</span>
                  <br>
                  <span class="grey--text">Absence</span>
                </div>
              </v-card-title>
              <v-card-actions class="px-0">
                <v-btn flat color="purple">
                  <span>ADJUST</span>
                  <v-icon size="15">arrow_forward</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-5">
      <v-flex sm5 xs12>
        <v-card>
          <v-date-picker 
            v-model="dates"
            multiple
            width="100%"
          ></v-date-picker>
        </v-card>
      </v-flex>
      <v-flex xs12 sm7 >
        <v-layout row wrap class="scroll-year-absence px-3 mt-3">
          <v-flex  v-for=" item in years" :key="item.id" class="xs12 sm6 md4 month-absence  mt-4 h-100" @click="changeMonth(item)">
            <v-card  class="mt-3 ml-3 card-date-of-month">
              <v-date-picker 
                v-model="item.dates"
                multiple
                no-title
                disabled
                width="100%"
              ></v-date-picker>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout column class="date-absence-footer">
      <h3 class="mt-3">Upcoming leaves</h3>
      <v-card v-for="item in items" :key="item.id" class="mt-3">
        <v-layout class="py-4">
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">Today</h4>
            <h3>{{ item.day }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">First name</h4>
            <h3>{{ item.first_name }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">Last name</h4>
            <h3>{{ item.last_name }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">Status</h4>
            <h3 v-if="item.status == 'success'" class="success--text">{{ item.status }}</h3>
            <h3 v-if="item.status == 'pending'" class="orange--text">{{ item.status }}</h3>
            <h3 v-if="item.status == 'error'" class="error--text">{{ item.status }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">Address</h4>
            <h3>{{ item.address }}</h3>
          </v-flex>
          <v-flex xs2 v-if="item.status == 'pending'">
            <v-layout class="primary--text text-uppercase py-3">
              <h3>view</h3>
              <v-icon>trending_flat</v-icon>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>

      <h3 class="mt-5">Past leaves</h3>
      <v-card v-for="item in items" :key="item.id" class="mt-3">
        <v-layout class="py-4">
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">Today</h4>
            <h3>{{ item.day }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">First name</h4>
            <h3>{{ item.first_name }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">Last name</h4>
            <h3>{{ item.last_name }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">Status</h4>
            <h3 v-if="item.status == 'success'" class="success--text">{{ item.status }}</h3>
            <h3 v-if="item.status == 'pending'" class="orange--text">{{ item.status }}</h3>
            <h3 v-if="item.status == 'error'" class="error--text">{{ item.status }}</h3>
          </v-flex>
          <v-flex xs2 column text-md-left class="pl-3">
            <h4 class="primary--text">Address</h4>
            <h3>{{ item.address }}</h3>
          </v-flex>
          <v-flex xs2 v-if="item.status == 'pending'">
            <v-layout class="primary--text text-uppercase py-3">
              <h3>view</h3>
              <v-icon>trending_flat</v-icon>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </div>
</template>

<script>
import UserAvatar from "../avatars/Avatar";

export default {
  components: {
    UserAvatar
  },
  data() {
    return {
      dates: [],
      years: [
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
        {
          dates: ["2019-01-01", "2019-01-03", "2019-01-05"]
        },
        {
          dates: ["2019-01-02", "2019-01-04", "2019-01-06"]
        },
        {
          dates: ["2019-01-15", "2019-01-14", "2019-01-13"]
        },
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
        {
          dates: ["2019-01-25", "2019-01-24", "2019-01-23"]
        },
      ],
      items: [
        {
          last_name: "Phong JR",
          day: "25 Aug, Sun",
          first_name: "Nguyễn",
          status: "success",
          address: "Duy Sơn"
        },
        {
          last_name: "Phong JR",
          day: "25 Aug, Sun",
          first_name: "Nguyễn",
          status: "pending",
          address: "Duy Sơn"
        },
        {
          last_name: "Phong JR",
          day: "25 Aug, Sun",
          first_name: "Nguyễn",
          status: "error",
          address: "Duy Sơn"
        }
      ],
    };
  },
  methods: {
    changeMonth(item){
      this.dates = item.dates;
    }
  }
};
</script>

<style scopes>
.scroll-year-absence {
 background: #ececec59;
 height: 145px;
 overflow: auto;
}
.scroll-year-absence::-webkit-scrollbar-track {
 background-color: #ececec59;
}

.scroll-year-absence::-webkit-scrollbar {
 width: 3px;
 background-color: #ececec59;
}

.scroll-year-absence::-webkit-scrollbar-thumb {
 background-color: #000000;
 border: 1px solid #ececec59;
}
.month-absence{
  cursor: pointer;
}
.scroll-year-absence{
  height:360px;
  overflow-x:auto;
}
@media only screen and (max-width: 960px) {
  .user-img {
    justify-content: center !important;
  }
} 
@media only screen and (max-width: 868px) {
  .card-date-of-month {
    margin-left: 5px !important;
  }
}     
</style>

