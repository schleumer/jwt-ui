<template lang="pug">
  div
    .row(v-if="!ui.hasError")
      .col-xs-12.text-xs-right
        button.btn.btn-xl.btn-primary SAVE
    .row(v-if="ui.hasError")
      .col-xs-12
        .alert.alert-danger Something is invalid, check your #[b TOKEN] and #[b SECRET]
    .row
      .col-xs-6
        .row
          code-mirror(v-model="ui.token", mode="jwt", ref="token")
      .col-xs-6
        .row
          code-mirror(v-model="ui.header", mode="application/json", ref="header")
        .row
          code-mirror(v-model="ui.payload", mode="application/json", ref="header")
        .row
          input.form-control(placeholder="Secret", v-model="ui.secret")
</template>

<script>
import {jwt} from '../utils';
import CodeMirror from './CodeMirror'

export default {
  name: 'home',
  components: {
    CodeMirror
  },
  data () {
    return {
      ui: {
        secret: '123456',
        token: '',
        header: `{
  "alg": "HS256",
  "typ": "JWT"
}`,
        payload: `{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
        `,
        hasError: false
      }
    }
  },
  mounted() {
      this.updateToken();
  },
  methods: {
    updateDetails() {
      try {
        const parsed = jwt.parse({key: this.ui.secret, token: this.ui.token});
        this.ui.header = JSON.stringify(parsed.header, null, '  ');
        this.ui.payload = JSON.stringify(parsed.payload, null, '  ');
        this.ui.hasError = false;
      } catch (ex) {
        this.ui.hasError = true;
      }
    },
    updateToken() {
      try {
        const payload = JSON.parse(this.ui.payload);
        const header = JSON.parse(this.ui.header);

        this.ui.token = jwt.sign({algo: 'HS512', payload, header, key: this.ui.secret});

        this.ui.hasError = false;
      } catch (ex) {
        console.error(this.ui, ex);
        this.ui.hasError = true;
      }
    }
  },
  watch: {
    'ui.token': function() {
      this.updateDetails();
    },
    'ui.secret': function () {
      this.updateDetails();
    },
    'ui.payload': function (){
      this.updateToken();
    },
    'ui.header': function (){
      this.updateToken();
    }
  }
}
</script>
