<template>
  <portal-target name="destination">
    <!--
    This component can be located anwhere in your App.
    The slot content of the above portal component will be rendered here.
    -->
  </portal-target>
</template>

<script lang="ts">
import Vue from 'vue';
import { PortalTarget } from 'portal-vue';

// local interface for data properties
interface IAppDialogData {}

export default Vue.extend({
  name: 'AppDialog',
  components: {
    'portal-target': PortalTarget,
  },
  data: (): IAppDialogData => ({}),
  computed: {},
  methods: {},
});
</script>
