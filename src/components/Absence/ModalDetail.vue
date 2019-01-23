<template>
  <div class="text-xs-center">
    <v-dialog v-model="modal.isShowmodal" width="1200">
      <v-card v-if="itemDetail">
        <v-container grid-list-md text-xs-center>
          <v-layout row>
            <v-flex d-flex xs12 sm9>
              <v-layout row>
                <v-flex d-flex>
                  <v-card tile flat>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <v-card color="primary">
                          <v-flex right>
                            <v-btn color="primary">Approve</v-btn>
                            <v-btn color="primary">Reject</v-btn>
                            <v-btn color="primary">Reassign</v-btn>
                            <v-btn color="primary">Request Information</v-btn>
                          </v-flex>
                        </v-card>
                      </v-flex>
                      <v-flex xs12>
                        <v-layout row style="height: 130px;">
                          <v-flex xs6>
                            <div class="elevation-1">
                              <div style="height: 117px" class="text-xs-center pl-3 pr-3 pt-2 pb-2">
                                <v-layout>
                                  <v-flex xs3>
                                    <h3>{{formatMonth(itemDetail.startDate)}}</h3>
                                    <h1>{{formatDate(itemDetail.startDate)}}</h1>
                                    <h3 class="grey--text">{{formatDay(itemDetail.startDate)}}</h3>
                                  </v-flex>
                                  <v-flex xs6 class="user-date-arrow">
                                    <v-layout class="justify-center">
                                      <v-icon size="67" color="orange darken-2">arrow_right_alt</v-icon>
                                      <h4
                                        style="position: absolute;bottom: 0px;"
                                      >{{countDay(itemDetail.startDate, itemDetail.endDate)}} days anhual leave</h4>
                                    </v-layout>
                                  </v-flex>
                                  <v-flex xs3>
                                    <h3>{{formatMonth(itemDetail.endDate)}}</h3>
                                    <h1>{{formatDate(itemDetail.endDate)}}</h1>
                                    <h3 class="grey--text">{{formatDay(itemDetail.endDate)}}</h3>
                                  </v-flex>
                                </v-layout>
                              </div>
                            </div>
                          </v-flex>
                          <v-flex xs6>
                            <v-textarea
                              solo
                              light
                              name="input-7-4"
                              label="Reason"
                              v-model="description"
                            ></v-textarea>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12>
                        <v-layout row>
                          <v-flex xs6>
                            <v-card dark color="secondary">
                              <v-expansion-panel light>
                                <v-expansion-panel-content>
                                  <div slot="header">Absence Policy Group</div>
                                  <v-card>
                                    <v-card-text>{{itemDetail.leaveDescription}}</v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-card>
                          </v-flex>
                          <v-flex xs6>
                            <v-layout column style="height: 200px">
                              <v-layout row justify-center align-center>
                                <v-flex xs1>
                                  <v-icon color="black">error</v-icon>
                                </v-flex>
                                <v-flex xs10>
                                  <div class="elevation-1">
                                    <div
                                      class="text-xs-left pl-3 pr-3 pt-2 pb-2"
                                      style="height: 50px"
                                    >On May 28, there's a shortage of iOS developer</div>
                                  </div>
                                </v-flex>
                              </v-layout>
                              <v-layout row justify-center align-center>
                                <v-flex xs1>
                                  <v-icon color="error">cancel</v-icon>
                                </v-flex>
                                <v-flex xs10>
                                  <div class="elevation-1">
                                    <div
                                      class="text-xs-left pl-3 pr-3 pt-2 pb-2"
                                      style="height: 50px"
                                    >On May 25, there's a shortage of project B</div>
                                  </div>
                                </v-flex>
                              </v-layout>
                              <v-layout row justify-center align-center>
                                <v-flex xs1>
                                  <v-icon color="success">check_circle</v-icon>
                                </v-flex>
                                <v-flex xs10>
                                  <div class="elevation-1">
                                    <div
                                      class="text-xs-left pl-3 pr-3 pt-2 pb-2"
                                      style="height: 50px"
                                    >You're within your Casual Leave qoute, which will reduce to 10 days</div>
                                  </div>
                                </v-flex>
                              </v-layout>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-flex xs12>
                        <v-layout row>
                          <v-flex xs0>
                            <v-list-tile-avatar style="margin-top: 10px;">
                              <div class="v-image-user">
                                <user-avatar
                                  :imageUrl="(itemDetail.avatar||{}).imageUrl"
                                  :name="itemDetail.employeeName"
                                  width="unset"
                                />
                              </div>
                            </v-list-tile-avatar>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field
                              style="height: 50px"
                              v-model="comment"
                              outline
                              label="comment"
                              type="text"
                            >
                              <v-fade-transition slot="append">
                                <v-progress-circular
                                  v-if="loading"
                                  size="24"
                                  color="info"
                                  indeterminate
                                ></v-progress-circular>
                                <v-btn flat icon>
                                  <v-icon>attach_file</v-icon>
                                </v-btn>
                              </v-fade-transition>
                              <v-menu slot="append-outer" style="top: -12px" offset-y></v-menu>
                            </v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-flex>
                        <v-flex xs3 right style="height: 50px">
                          <v-checkbox color="primary" label="Mark Public" v-model="checkbox"></v-checkbox>
                        </v-flex>
                      </v-flex>

                      <v-flex xs12>
                        <v-layout row style="height: 40px;">
                          <v-layout row>
                            <v-flex xs0>
                              <v-list-tile-avatar>
                                <div class="v-image-user">
                                  <user-avatar
                                    :imageUrl="(itemDetail.avatar||{}).imageUrl"
                                    :name="itemDetail.employeeName"
                                    width="unset"
                                  />
                                </div>
                              </v-list-tile-avatar>
                            </v-flex>
                            <v-flex xs12>
                              <v-list-tile style="position: absolute; left: 35px">
                                <span class="body-1">
                                  <a>
                                    <u>John Mayers</u>
                                  </a> replied on
                                  <b>May 27th, 2017 at 7:42am</b>
                                </span>
                              </v-list-tile>
                            </v-flex>
                          </v-layout>
                          <v-flex xs1>
                            <v-btn flat icon>
                              <v-icon size="20">settings</v-icon>
                            </v-btn>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-flex xs12>
                        <div class="v-comment">
                          <div class="text-xs-left ml-2 mt-2">
                            <span class="caption">{{itemDetail.leaveDescription}}</span>
                          </div>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex d-flex xs12 sm3>
              <!-- <v-card> -->
              <v-layout column>
                <v-flex xs12 class="v-button-close-modal">
                  <v-btn flat icon color="dark" @click="modal.isShowmodal = false">
                    <v-icon>remove_circle_outline</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex justify-center align-center d-flex style="flex-direction: column">
                  <div class="v-image-user-2">
                    <user-avatar
                      :imageUrl="(itemDetail.avatar||{}).imageUrl"
                      :name="itemDetail.employeeName"
                      class="user-img"
                      :imgActive="imgActive"
                    />
                  </div>
                  <span class="headline font-weight-bold">{{itemDetail.employeeName}}</span>
                  <span class="body-1">12 Tickets</span>
                  <hr class="my-2" size="1" color="#E7EAED" width="80%">
                  <v-chip class="headline" label>Absen Detail</v-chip>
                  <span class="body-1">Created</span>
                  <span>Jan 24th, 8:15am</span>
                  <span class="my-2">Category</span>
                  <v-chip color="primary" text-color="white">Photobok</v-chip>
                  <hr class="my-3" size="1" color="#E7EAED" width="80%">
                  <v-chip class="my-1 headline" label>HR Approvers</v-chip>

                  <v-layout row wrap class="ml-2">
                    <v-flex v-for="item in dataHRCard" :key="item.id">
                      <v-card width="120" height="110">
                        <v-list-tile-avatar class="v-card-image">
                          <div class="v-image-user">
                            <user-avatar
                              :imageUrl="(item.avatar||{}).imageUrl"
                              :name="item.employeeName"
                              width="unset"
                            />
                          </div>
                        </v-list-tile-avatar>
                        <span class="body-2">{{item.employeeName}}</span>
                        <v-btn
                          class="mt-3"
                          position
                          absolute
                          flat
                          icon
                          :color="item.color"
                          style="margin-left: -15px"
                        >
                          <v-icon>{{item.icon}}</v-icon>
                        </v-btn>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <!-- </v-card> -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
import UserAvatar from "../avatars/Avatar";
import { dataHRCard } from "./fakeData";
export default {
  components: {
    UserAvatar
  },
  props: {
    modal: Object,
    itemDetail: Object,
    dataHRCard: {
      type: Array,
      default: () => dataHRCard
    }
  },
  data() {
    return {
      description: "",
      comment: "",
      typeComment: 1,
      typeId: 4,
      imgActive: true,
      loading: false,
      checkbox: false
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD");
    },
    formatDay(date) {
      return moment(date).format("ddd");
    },
    formatMonth(date) {
      return moment(date).format("MMM");
    },
    formatDateTime(date) {
      return moment(date).format("DD MMM");
    },
    countDay(startDate, endDate) {
      const start = moment(startDate);
      const end = moment(endDate);
      return end.diff(start, "days");
    }
  }
};
</script>
<style>
.v-comment {
  border-radius: 5px;
  background-color: #f3f3f5;
}
.v-button-close-modal {
  height: 20px;
  position: absolute;
  right: 0px;
  display: flex;
}
.v-card-image {
  justify-content: center;
  align-items: center;
  height: 60px;
}
.v-image-user {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  background: grey;
  justify-content: center;
  align-items: center;
}
.v-image-user-2 {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  display: flex;
  background: steelblue;
  justify-content: center;
  align-items: center;
}
.user-img {
  justify-content: center;
}
</style>
