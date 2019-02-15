<template>
  <v-form>
    <v-container>
      <h1 class="text-md-center">Họ và tên</h1>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="message1"
            label="Vui lòng nhập Họ"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
          <v-text-field
            v-model="message2"
            label="Vui lòng nhập Tên"
            clearable
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-card color="cyan">
        <v-card-text>
          <h2 class="text-md-center">Tên của bạn là:<p>{{message1 + message2}}</p></h2>
        </v-card-text>
      </v-card>
      <h1 class="text-md-center">Danh sách sinh viên</h1>
      <!-- table -->
      <v-data-table
        :headers="headers"
        :items="desserts"
        class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.class }}</td>
        <td class="text-xs-right">{{ props.item.skill }}</td>
      </template>
    </v-data-table>
      <v-layout justify-left>
        <v-btn
          color="blue"
          dark
          @click="dialog = true"
        >
          Thêm Sinh viên
        </v-btn>
        <v-dialog v-model="dialog" max-width="500px">
      <v-form ref="form" lazy-validation>
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout column wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="newItem.name"
                    :rules="[v => !!v || 'Tên sinh viên không được để trống']"
                    label="Tên sinh viên"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="newItem.class"
                    :rules="[v => !!v || 'Lớp không được để trống']"
                    label="Lớp"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-combobox
                  v-model="newItem.skill"
                    :items="items"
                    label="Chọn kỹ năng của bạn"
                    multiple
                    chips
                  >
                    <template
                      slot="selection"
                      slot-scope="data"
                    >
                      <v-chip
                        :key="JSON.stringify(data.item)"
                        :selected="data.selected"
                        :disabled="data.disabled"
                        class="v-chip--select-multi"
                        @input="data.parent.selectItem(data.item)"
                      >
                        <v-avatar
                          class="accent white--text"
                          v-text="data.item.slice(0, 1).toUpperCase()"
                        ></v-avatar>
                        {{ data.item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <!-- button save -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="default" flat @click="close">Cancel</v-btn>
            <v-btn color="primary" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
  export default {
    props: {
    data: Array,
    add: Function
    },
    data () {
      return {
        items: [
          'PHP Laravel',
          'NodeJs',
          'Java',
          'Ruby on Rails'
        ],
        message1: 'Tôn Quốc Việt',
        message2: 'K21TPM4',
        newItem: {
        name: '',
        class: '',
        skill: ''
        },
        dialog: false,
        menu: false,
        headers: [
          {
            text: 'Họ và tên',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Lớp', value: 'class' },
          { text: 'Địa chỉ', value: 'skill' }
        ],
        desserts: [
          {
            name: 'Tôn Quốc Việt',
            class: 'K21TPM4',
            skill: 'NodeJs',
          },
          {
            name: 'Ice cream sandwich',
            class: 'K21TPM2',
            skill: 'Ruby on Rails'
          },
        ]
      }
    },
    methods: {
    close() {
      this.dialog = false;
    },
    save() {
      if (this.$refs.form.validate()) {
        this.add(this.newItem.name, this.newItem.class, this.newItem.skill);
        this.dialog = false;
        setTimeout(() => {
          this.newItem = {
            name: '',
            class: '',
            skill: ''
          };
          this.$refs.form.resetValidation();
        }, 300)
      }
    }
  }
  }
</script>

