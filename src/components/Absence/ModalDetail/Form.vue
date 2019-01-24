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
                            <card-count-absence :itemDetail="itemDetail"/>
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
                              <card-approved :dataApproved="dataApproved"/>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-layout column>
                        <input-comment @onComment="onComment" :avatar="itemDetail"/>
                      </v-layout>

                      <v-layout>
                        <list-comment :itemsComment="itemsComment" :itemDetail="itemDetail"/>
                      </v-layout>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm3>
              <!-- <v-card> -->
              <v-layout column>
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
                      <card-h-r-approved :item="item"/>
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
import CardCountAbsence from "../../cards/CardCountAbsence";
import CardApproved from "./CardApproved";
import InputComment from "./InputComment";
import ListComment from "./ListComment";
import UserAvatar from "../../avatars/Avatar";
import CardHRApproved from "./CardHRApproved";
import { dataHRCard, itemsComment, dataApproved } from "../fakeData";
export default {
  components: {
    UserAvatar,
    CardCountAbsence,
    CardApproved,
    InputComment,
    ListComment,
    CardHRApproved
  },
  props: {
    modal: Object,
    itemDetail: Object,
    dataHRCard: {
      type: Array,
      default: () => dataHRCard
    },
    dataApproved: {
      type: Array,
      default: () => dataApproved
    },
    itemsComment: {
      type: Array,
      default: () => itemsComment
    }
  },
  methods: {
    onComment(comment) {
      this.$emit("onComment", comment);
    }
  },
  data() {
    return {
      description: "",
      typeComment: 1,
      typeId: 4,
      imgActive: true
    };
  }
};
</script>
<style>
.v-button-close-modal {
  height: 20px;
  position: absolute;
  right: 0px;
  display: flex;
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