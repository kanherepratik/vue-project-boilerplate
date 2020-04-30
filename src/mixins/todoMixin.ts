import Vue from 'vue';

interface IMixinData {
  mixinMessage: string;
} // local interface for data properties

export default Vue.extend({
  data: (): IMixinData => ({
    mixinMessage: 'this came from MyMixin!',
  }),
  created() {
    console.log('MyMixin.created()');
  },
  mounted() {
    console.log('MyMixin.mounted()');
  },
  computed: {},
  methods: {
    mixinOutput(text: string): void {
      console.log(`mixin says: ${text}`);
    },
  },
});
