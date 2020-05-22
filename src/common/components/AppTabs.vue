<template>
  <div class="app-tabs">
    <div class="tabs-wrapper">
      <div
        v-for="(tab, index) in tabs"
        :class="['tab-button', { 'active-tab': index === activeTabIndex }]"
        :key="index"
        @click="changeTab(index)"
      >
        {{ tab.title }}
      </div>
    </div>
    <div class="content">
      <!--If keep alive-->
      <keep-alive v-if="keepAliveData">
        <component :is="tabs[activeTabIndex].component"></component>
      </keep-alive>
      <!--If not show component and destroy it in each tab change-->
      <component v-else :is="tabs[activeTabIndex].component"></component>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IAppTab } from '../shared/interfaces';

export default Vue.extend({
  name: 'AppTabs',
  props: {
    tabs: {
      type: Array as () => Array<IAppTab>,
    },
    keepAlive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      activeTabIndex: 0,
      keepAliveData: this.keepAlive,
    };
  },
  created(): void {
    this.activeTabIndex = this.getInitActiveTab();
  },
  methods: {
    /**
     * It is used to change the tab
     * @param {number} index It refers the tab index
     */
    changeTab(index: number): void {
      this.activeTabIndex = index;
      this.$emit('tab-changed', this.activeTabIndex);
    },
    /**
     * This method can be used by container component to get the active tab index
     */
    getActiveTab(): number {
      return this.activeTabIndex;
    },
    /**
     * It returns the first tab which have the status active in the tabs props
     */
    getInitActiveTab(): number {
      return this.tabs.findIndex((tab) => tab.active) || 0;
    },
  },
});
</script>

<style scoped>
.tabs-wrapper {
  display: flex;
}
.tab-button {
  display: flex;
  padding: 10px;
  margin: 5px;
  border: 1px solid #000000;
}
.active-tab {
  color: red;
}
.content {
  padding: 20px;
  border: 1px solid #000000;
}
</style>
