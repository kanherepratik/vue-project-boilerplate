<template>
  <div>
    <div v-if="!formSchema.length">
      <spinner-component />
    </div>
    <div v-else>
      <div v-for="container of formSchema" :key="container.id">
        <div v-if="!container.children">{{container.label}}: {{formData[container.id]}}</div>
        <div v-else>
          <span @click="onEdit(container.id)">EDIT</span>
          <div v-for="subcontainer of container.children" :key="subcontainer.id">
            <div
              v-if="!subcontainer['children']"
            >{{subcontainer['label']}}: {{formData[subcontainer.id]}}</div>
            <div
              v-for="component of subcontainer['children']"
              :key="component.id"
            >{{component.label}}: {{formData[component.id]}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IContainerSchema } from './shared/interfaces';

@Component
export default class FormSummary extends Vue {
  @Prop() private formSchema!: IContainerSchema[];
  @Prop() private formData!: { [key: string]: any };

  private onEdit(containerId: string): void {
    this.$emit('edit', containerId);
  }
}
</script>