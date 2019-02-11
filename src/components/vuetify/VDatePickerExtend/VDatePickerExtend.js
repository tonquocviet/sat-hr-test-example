import { VDatePicker } from 'vuetify/es5/components/VDatePicker';
import { pad } from 'vuetify/es5/components/VDatePicker/util';
import VDatePickerDateTable from './VDatePickerDateTableExtend';
export default {
    props: {
        selectedColor: String | Function
    },
    extends: VDatePicker,
    methods: {
        genDateTable() {
            return this.$createElement(VDatePickerDateTable, {
                props: {
                    allowedDates: this.allowedDates,
                    color: this.color,
                    selectedColor: this.selectedColor,
                    current: this.current,
                    dark: this.dark,
                    disabled: this.disabled,
                    events: this.events,
                    eventColor: this.eventColor,
                    firstDayOfWeek: this.firstDayOfWeek,
                    format: this.dayFormat,
                    light: this.light,
                    locale: this.locale,
                    min: this.min,
                    max: this.max,
                    readonly: this.readonly,
                    scrollable: this.scrollable,
                    showWeek: this.showWeek,
                    tableDate: `${pad(this.tableYear, 4)}-${pad(this.tableMonth + 1)}`,
                    value: this.value,
                    weekdayFormat: this.weekdayFormat
                },
                ref: 'table',
                on: {
                    input: this.dateClick,
                    tableDate: value => this.tableDate = value,
                    'click:date': value => this.$emit('click:date', value),
                    'dblclick:date': value => this.$emit('dblclick:date', value)
                }
            })
        },
    }
}