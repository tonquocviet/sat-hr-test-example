<template>
  <div class="text-xs-center">
    <v-dialog :value="isShow" @input="$emit('closeDialog')" width="1200">
      <v-card v-if="absenceDetail">
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
                            <v-btn
                              @click="approveRequest"
                              :disabled="absenceDetail.status === 'approved' ? true : false "
                              color="success"
                            >
                              <span>Approve</span>
                              <v-progress-circular
                                v-if="isApproving"
                                class="ml-2"
                                indeterminate
                              ></v-progress-circular>
                            </v-btn>
                            <v-btn color="error">Reject</v-btn>
                            <v-btn color="primary">Reassign</v-btn>
                            <v-btn>Request Information</v-btn>
                          </v-flex>
                        </v-card>
                      </v-flex>
                      <v-flex xs12>
                        <v-layout row style="height: 130px;">
                          <v-flex xs6>
                            <CardCountAbsence
                              :startDate="absenceDetail.startDate"
                              :endDate="absenceDetail.endDate"
                            />
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
                                    <v-card-text>{{absenceDetail.leaveDescription}}</v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-card>
                          </v-flex>
                          <v-flex xs6>
                            <v-layout column style="height: 200px">
                              <PolicyAlert :dataApproved="dataApproved"/>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-layout column>
                        <InputComment @onComment="onComment" :avatar="absenceDetail"/>
                      </v-layout>

                      <v-layout>
                        <ListComment :itemsComment="itemsComment" :absenceDetail="absenceDetail"/>
                      </v-layout>
                    </v-layout>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm3>
              <v-layout column>
                <v-flex justify-center align-center d-flex style="flex-direction: column">
                  <div class="v-image-user-2">
                    <UserAvatar
                      :imageUrl="(absenceDetail.avatar||{}).imageUrl"
                      :name="absenceDetail.employeeName"
                      class="user-img"
                      :imgActive="imgActive"
                    />
                  </div>
                  <span class="headline font-weight-bold">{{absenceDetail.employeeName}}</span>
                  <span class="body-1">12 Tickets</span>
                  <hr class="my-2" size="1" color="#E7EAED" width="80%">
                  <v-chip class="headline white black--text" disabled label>Absen Detail</v-chip>
                  <span class="body-1">Created</span>
                  <span>Jan 24th, 8:15am</span>
                  <span class="my-2">Category</span>
                  <LeaveTypeChip :leaveType="absenceDetail.leaveType.name"/>
                  <hr class="my-3" size="1" color="#E7EAED" width="80%">
                  <v-chip class="my-1 headline white black--text" disabled label>HR Approvers</v-chip>

                  <v-layout row wrap class="ml-2">
                    <v-flex v-for="item in dataHRCard" :key="item.id">
                      <CardHRApprover :item="item"/>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="infoSnackbar" :bottom="true" :left="true" :timeout="6000">
      {{ savedMessage }}
      <v-btn color="primary" flat @click="infoSnackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import CardCountAbsence from "../../cards/CardCountAbsence";
import PolicyAlert from "../../alerts/PolicyAlert";
import InputComment from "./InputComment";
import ListComment from "./ListComment";
import UserAvatar from "../../avatars/Avatar";
import CardHRApprover from "./CardHRApprover";
import LeaveTypeChip from "../../chips/LeaveTypeChip";
import { dataHRCard, itemsComment, dataApproved } from "../data";
export default {
  components: {
    UserAvatar,
    CardCountAbsence,
    PolicyAlert,
    InputComment,
    ListComment,
    CardHRApprover,
    LeaveTypeChip
  },
  props: {
    isShow: Boolean,
    apiAbsence: Object,
    absenceDetail: Object,
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
    },
    approveRequest() {
      this.isApproving = true;
      this.$http
        .post(`${this.apiAbsence.approveRequest}`, {
          id: this.absenceDetail.id
        })
        .then(() => {
          this.isApproving = false;
          this.$emit("updatedAbsenceDetail");
          this.infoSnackbar = true;
          this.savedMessage = "Approve success !!";
        })
        .catch(() => {
          this.isApproving = false;
          this.infoSnackbar = true;
          this.savedMessage = "Approve failed !!";
        });
    }
  },
  data() {
    return {
      description: "",
      typeComment: 1,
      typeId: 4,
      imgActive: true,
      infoSnackbar: false,
      savedMessage: "",
      isApproving: false
    };
  }
};
</script>
<style scoped>
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
