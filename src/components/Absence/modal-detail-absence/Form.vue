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
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-card color="primary">
                          <v-flex right v-if="!isViewOnly">
                            <v-btn
                              @click="approveRequest"
                              :disabled="!checkDueDate || absenceDetail.status === 'approved'"
                              color="success"
                            >
                              <span>Approve</span>
                              <v-progress-circular v-if="isApproving" class="ml-2" indeterminate></v-progress-circular>
                            </v-btn>
                            <v-btn
                              @click="rejectRequest"
                              :disabled="!checkDueDate || absenceDetail.status === 'rejected'"
                              color="error"
                            >
                              <span>Reject</span>
                              <v-progress-circular v-if="isRejecting" class="ml-2" indeterminate></v-progress-circular>
                            </v-btn>
                            <v-btn :disabled="!checkDueDate" color="primary">Reassign</v-btn>
                            <v-btn :disabled="!checkDueDate">Request Information</v-btn>
                          </v-flex>
                          <v-flex right v-else>
                            <v-btn :disabled="absenceDetail.status !== 'approved'" color="success">
                              <span>Approve</span>
                            </v-btn>
                            <v-btn :disabled="absenceDetail.status !== 'rejected'" color="error">
                              <span>Reject</span>
                            </v-btn>
                            <v-btn disabled color="primary">Reassign</v-btn>
                            <v-btn disabled>Request Information</v-btn>
                          </v-flex>
                        </v-card>
                      </v-flex>
                      <v-flex xs12>
                        <v-layout row style="height: 130px;">
                          <v-flex xs6>
                            <div class="elevation-1">
                              <div style="height: 117px" class="text-xs-center pl-3 pr-3 pt-2 pb-2">
                                <AbsenceInfoCard :leaveData="absenceDetail.leaveData"/>
                              </div>
                            </div>
                          </v-flex>
                          <v-flex xs6>
                            <v-textarea
                              solo
                              light
                              disabled
                              name="input-7-4"
                              label="Reason for absence"
                              v-model="absenceDetail.leaveReason"
                            ></v-textarea>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                      <v-flex xs12>
                        <div v-if="isFetchingPolicies" class="text-xs-center">
                          <v-progress-circular :size="40" color="primary" indeterminate></v-progress-circular>
                        </div>
                        <v-layout v-else row>
                          <v-flex xs6>
                            <v-card dark color="secondary">
                              <v-expansion-panel light>
                                <v-expansion-panel-content
                                  v-for="item in dataPolicies.policies"
                                  :key="item.id"
                                >
                                  <div slot="header">{{ item.name }}</div>
                                  <v-card>
                                    <v-card-text>{{item.description}}</v-card-text>
                                  </v-card>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-card>
                          </v-flex>
                          <v-flex xs6>
                            <v-layout column style="height: 200px">
                              <PolicyAlert :dataAlerts="dataPolicies.alerts"/>
                            </v-layout>
                          </v-flex>
                        </v-layout>
                      </v-flex>

                      <v-flex xs12>
                        <InputComment @onComment="onComment" :avatar="absenceDetail"/>
                      </v-flex>
                      <v-flex v-if="isFetchingComments" xs12 class="text-xs-center">
                        <v-progress-circular :size="40" color="primary" indeterminate></v-progress-circular>
                      </v-flex>
                      <v-layout
                        v-else
                        xs12
                        wrap
                        column
                        v-for="item in dataCommentAbsence"
                        :key="item.id"
                        class="showComment"
                      >
                        <ListComment
                          :comment="item"
                          :itemsComment="itemsComment"
                          :absenceDetail="absenceDetail"
                        />
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
                      avatarSize="100px"
                    />
                  </div>
                  <span class="headline font-weight-bold">{{absenceDetail.employeeName}}</span>
                  <span class="body-1">12 Tickets</span>
                  <hr class="my-2" size="1" color="#E7EAED" width="80%">
                  <v-chip class="headline white black--text" disabled label>Absence Detail</v-chip>
                  <span class="body-1">Submitted</span>
                  <span>{{changeDateSubmitted}}</span>
                  <span class="my-2">Category</span>
                  <LeaveTypeChip :leaveType="absenceDetail.leaveType.name"/>
                  <hr class="my-3" size="1" color="#E7EAED" width="80%">
                  <v-chip class="my-1 headline white black--text" disabled label>HR Approvers</v-chip>

                  <v-layout row wrap class="ml-2">
                    <div class="text-xs-center" v-if="isHRCard">
                      <v-progress-circular :size="40" color="primary" indeterminate></v-progress-circular>
                    </div>
                    <v-flex v-else v-for="(item,index) in dataHRCard" :key="index">
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
import AbsenceInfoCard from "../../cards/AbsenceInfoCard";
import PolicyAlert from "../../alerts/PolicyAlert";
import InputComment from "./InputComment";
import ListComment from "./ListComment";
import UserAvatar from "../../avatars/Avatar";
import CardHRApprover from "./CardHRApprover";
import LeaveTypeChip from "../../chips/LeaveTypeChip";
import { itemsComment, dataApproved } from "../data";
import moment from "moment";

export default {
  components: {
    UserAvatar,
    AbsenceInfoCard,
    PolicyAlert,
    InputComment,
    ListComment,
    CardHRApprover,
    LeaveTypeChip
  },
  props: {
    isShow: Boolean,
    absenceDetail: Object,
    dataApproved: {
      type: Array,
      default: () => dataApproved
    },
    itemsComment: {
      type: Array,
      default: () => itemsComment
    },
    isViewOnly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onComment(comment) {
      this.$emit("onComment", comment);
    },
    getPoliciesRequest() {
      this.isFetchingPolicies = true;
      const { id } = this.absenceDetail;
      const url = this.apiAbsence.getAbsencePolicies(id);
      this.$http.get(url).then(res => {
        this.isFetchingPolicies = false;
        this.dataPolicies = res.data;
      });
    },
    getHRCardRequest() {
      this.isHRCard = true;
      const { id } = this.absenceDetail;
      const url = this.apiAbsence.getAbsenceHRApprovers(id);
      this.$http.get(url).then(res => {
        this.isHRCard = false;
        this.dataHRCard = res.data;
      });
    },
    getCommentAbsence() {
      this.isFetchingComments = true;
      const { id } = this.absenceDetail;
      const url = this.apiAbsence.getCommentAbsence(id);
      this.$http.get(url).then(res => {
        this.isFetchingComments = false;
        this.dataCommentAbsence = res.data;
      });
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
    },
    rejectRequest() {
      this.isRejecting = true;
      this.$http
        .post(`${this.apiAbsence.rejectRequest}`, {
          id: this.absenceDetail.id
        })
        .then(() => {
          this.isRejecting = false;
          this.$emit("updatedAbsenceDetail");
          this.infoSnackbar = true;
          this.savedMessage = "Reject success !!";
        })
        .catch(() => {
          this.isRejecting = false;
          this.infoSnackbar = true;
          this.savedMessage = "Reject failed !!";
        });
    }
  },
  computed: {
    changeDateSubmitted() {
      return (
        moment(this.absenceDetail.submittedDate).format("MMM D, YYYY ") +
        "at " +
        moment(this.absenceDetail.submittedDate).format("hh:mm:ss A")
      );
    },
    checkDueDate() {
      return moment(this.absenceDetail.dueDate) >= moment();
    }
  },
  data() {
    return {
      leaveReason: "",
      typeComment: 1,
      typeId: 4,
      dataHRCard: [],
      dataCommentAbsence: [],
      isHRCard: false,
      infoSnackbar: false,
      savedMessage: "",
      isApproving: false,
      dataPolicies: {},
      isFetchingPolicies: false,
      isRejecting: false,
      isFetchingComments: false
    };
  },
  watch: {
    isShow(val) {
      if (val) {
        this.getPoliciesRequest();
        this.getHRCardRequest();
        this.getCommentAbsence();
      }
    }
  }
};
</script>
<style scoped>
.showComment {
  width: 100%;
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
