<template>
  <div class="app-stepper">
    <div class="top">
      <div class="steps-wrapper">
        <template v-if="topButtons">
          <div v-if="currentStepIndex > 0" class="stepper-button-top previous" @click="previousStep()">
            <button class="icons">&larr;</button>
          </div>
        </template>
        <template v-for="(step, index) in steps">
          <div :class="['step', isStepActive(index) ? 'activated' : 'deactivated']" :key="index">
            <div class="circle">
              <i class="icons">
                {{ step.completed ? 'done' : step.icon }}
              </i>
            </div>
            <div class="step-title">
              <h4>{{ step.title }}</h4>
              <h5 class="step-subtitle">{{ step.subtitle }}</h5>
            </div>
          </div>
        </template>
        <div
          v-if="topButtons"
          :class="['stepper-button-top next', !canContinue ? 'deactivated' : '']"
          @click="nextStep()"
        >
          <button class="icons">&rarr;</button>
        </div>
      </div>
    </div>
    <div class="content">
      <!--If keep alive-->
      <keep-alive v-if="keepAlive">
        <component :is="steps[currentStepIndex].component" @can-continue="proceed" @change-next="nextStep"></component>
      </keep-alive>
      <!--If not show component and destroy it in each step change-->
      <component
        v-else
        :is="steps[currentStepIndex].component"
        @can-continue="proceed"
        @change-next="nextStep"
      ></component>
    </div>
    <div :class="['bottom', currentStepIndex > 0 ? '' : 'only-next']">
      <div v-if="currentStepIndex > 0" class="stepper-button previous" @click="previousStep()">
        <button class="icons">back</button>
      </div>
      <div :class="['stepper-button next', !canContinue ? 'deactivated' : '']" @click="nextStep()">
        <button v-if="!finalStep" class="icons">next</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { IStepperStep, IInitStepperStep } from '../shared/interfaces';

/**
 * Stepper Component
 *
 * Props -
 * 1. Steps {IStepperStep} Array of objects of type IStepperStep
 * 2. keepAlive {Boolean} This will launch the component in keep-alive way
 * 3. topButtons {Boolean} It is to show the back and next button at the top as well
 *
 * Events (Triggered by the Stepper)
 * 1. completed-step-index {number}: In data it has completed step index
 * 2. active-step-index {number}: In data it has completed step index
 * 3. stepper-finished
 * 4. clicking-back
 *
 * Events (Listened by the Stepper which are triggered by step component)
 * 1. can-continue {Boolean}: This event will activate the next step button
 * 2. change-next: This will move the stepper to next step
 */

export default Vue.extend({
  name: 'AppStepper',
  props: {
    topButtons: {
      type: Boolean,
      default: false,
    },
    /**
     * Array of objects of type IStepperStep
     */
    steps: {
      type: Array as () => Array<IStepperStep>,
    },
    /**
     * This will launch the component in keep-alive way
     */
    keepAlive: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentStepIndex: 0,
      initSteps: [] as IInitStepperStep[],
      previousStepIndex: -1,
      canContinue: false,
      finalStep: false,
    };
  },
  created(): void {
    this.init();
  },
  methods: {
    /**
     * This method use to know whether the stepper is active or not
     * Using which special css is getting applied on that stepper
     * @param {number} index It refers the step index
     */
    isStepActive(index: number): boolean {
      if (this.currentStepIndex === index) {
        return true;
      }
      return false;
    },
    /**
     * @param {number} index It refers the step index
     * @param {boolean} back It refers whether the step to activate is next step or previous step
     */
    activateStep(index: number, back = false): void {
      if (this.steps[index]) {
        this.previousStepIndex = this.currentStepIndex;
        this.currentStepIndex = index;
        // Check if the current step is last step.
        if (index + 1 === this.steps.length) {
          this.finalStep = true;
        } else {
          this.finalStep = false;
        }
        // If the User has stepped to next step then only fire 'completed-step' event
        if (!back) {
          /**
           * It gets fire when user move to next step with completed step index
           */
          this.$emit('completed-step-index', this.previousStepIndex);
        }
      }
      /**
       * If fires the currently active step index
       */
      this.$emit('active-step-index', this.currentStepIndex);
    },
    /**
     * Moves the stepper to next step
     * Note: The step will change only if can-continue event has been emitted fot it.
     */
    nextStep(): void {
      if (this.initSteps[this.currentStepIndex].completed) {
        if (this.finalStep) {
          this.$emit('stepper-finished');
          return;
        }
        const currentIndex = this.currentStepIndex + 1;
        this.activateStep(currentIndex);
      }
      this.canContinue = this.initSteps[this.currentStepIndex].completed;
    },
    /**
     * Moves the stepper to previous step
     */
    previousStep(): void {
      this.$emit('clicking-back');
      const currentIndex = this.currentStepIndex - 1;
      if (currentIndex >= 0) {
        this.activateStep(currentIndex, true);
      }
    },
    /**
     * Used to set the canCantinue flag for the current active step
     */
    proceed(canContinueFlag: boolean): void {
      this.canContinue = canContinueFlag;
      this.initSteps[this.currentStepIndex].completed = canContinueFlag;
      if (this.finalStep) {
        this.$emit('stepper-finished');
      }
    },
    init(): void {
      // Initiate stepper
      this.activateStep(0);
      this.initSteps = this.steps.map((step) => {
        return {
          name: step.name,
          completed: step.completed || false,
        };
      });
    },
  },
});
</script>

<style scoped>
.divider-line {
  border-bottom: 1px solid #ccc;
  height: 2px;
  position: absolute;
}
.steps-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 95%;
  left: 0;
  padding: 2% 4%;
}
.content {
  border: 1px solid #000000;
  padding: 20px;
}
.step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
