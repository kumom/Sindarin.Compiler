// Based on: https://github.com/rpkilby/vue-nonreactive/blob/master/vue-nonreactive.js
import Vue from "vue";

const Observer = new Vue().$data.__ob__.constructor;

export default function nonreactive(value) {
  if (value && (typeof value === "object" || Array.isArray(value))) {
    // Set dummy observer on value
    value.__ob__ = new Observer({});
  }
  return value;
}
