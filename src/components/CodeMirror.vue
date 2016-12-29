<template lang="pug">
  div
    div(ref="code")
</template>

<script>
import CodeMirror from 'codemirror';

export default {
  name: 'code-mirror',
  props: {
    mode: {
      type: String,
      required: true
    },
    value: {
      twoWay: true,
      default: ''
    }
  },
  mounted() {
    this.editor = new CodeMirror(this.$refs.code, {
      mode: this.mode,
      lineWrapping: true,
      lint: true
    });

    this.editor.on('change', (a, b, c) => {
        this.$emit('input', this.editor.getValue());
    });

    this.update();
  },
  methods: {
    update(newValue = null) {
      if (this.editor) {
        if (newValue !== null) {
            if (newValue == this.editor.getValue()) {
              return;
            }
        }

        this.editor.setValue(newValue || this.value);
      }
    }
  },
  watch: {
    value(newVal) {
      this.update(newVal);
    }
  },
  beforeDestroy() {
    this.$el.removeChild(this.$refs.code);
  }
}

</script>

<style lang="css">
</style>
