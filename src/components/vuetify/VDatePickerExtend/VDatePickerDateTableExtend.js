import { VDatePickerDateTable } from 'vuetify/es5/components/VDatePicker';
import isDateAllowed from 'vuetify/es5/components/VDatePicker/util/isDateAllowed';
export default {
    props: {
        selectedColor: String | Function
    },
    extends: VDatePickerDateTable,
    methods: {
        genButton(value, isFloating, mouseEventType) {
            const isAllowed = isDateAllowed(value, this.min, this.max, this.allowedDates)
            const isSelected = value === this.value || (Array.isArray(this.value) && this.value.indexOf(value) !== -1)
            const isCurrent = value === this.current
            const setColor = isSelected ? this.setBackgroundColor : this.setTextColor
            const color = (isSelected || isCurrent) && ((typeof this.selectedColor === "function" ? this.selectedColor(value) : null) || (this.color || 'accent'))

            return this.$createElement('button', setColor(color, {
                staticClass: 'v-btn',
                'class': this.genButtonClasses(isAllowed, isFloating, isSelected, isCurrent),
                attrs: {
                    type: 'button'
                },
                domProps: {
                    disabled: this.disabled || !isAllowed
                },
                on: this.genButtonEvents(value, isAllowed, mouseEventType)
            }), [
                    this.$createElement('div', {
                        staticClass: 'v-btn__content'
                    }, [this.formatter(value)]),
                    this.genEvents(value)
                ])
        },
    }
}