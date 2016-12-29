import CodeMirror from 'codemirror';
import {JSHINT} from 'jshint';

window.JSHINT = JSHINT;

require('codemirror/mode/css/css');
require('codemirror/mode/javascript/javascript');

require('codemirror/addon/lint/lint');

require('codemirror/addon/lint/javascript-lint');

require('./utils/jsonlint');
require('./utils/codemirror/json-lint');

//require('codemirror/addon/lint/json-lint');
//require('codemirror/addon/lint/css-lint');

CodeMirror.defineMode('jwt', function () {
  function jwtHeader(stream, state) {
    stream.eatWhile(/[^.]/);
    state.cur = firstDot;
    return 'jwt-header';
  }

  function firstDot(stream, state) {
    stream.next();
    state.cur = jwtPayload;
    return 'jwt-dot';
  }

  function jwtPayload(stream, state) {
    stream.eatWhile(/[^.]/);
    state.cur = secondDot;
    return 'jwt-payload';
  }

  function secondDot(stream, state) {
    stream.next();
    state.cur = jwtSignature;
    return 'jwt-dot';
  }

  function jwtSignature(stream) {
    stream.skipToEnd();
    return 'jwt-signature';
  }

  return {
    token: function (stream, state) {
      var cur = state.cur;
      return cur(stream, state);
    },
    startState: function () {
      return {cur: jwtHeader};
    }
  };
});
