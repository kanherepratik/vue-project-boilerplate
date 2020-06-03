import Vue from 'vue';

/**
 *Register common components at global level
 *
 */
const register = (): void => {
  const requireComponent = require.context('./components', false, /\.vue$/);
  requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
    Vue.component(componentName, componentConfig.default || componentConfig);
  });

  const requireComponent2 = require.context('./common/components', false, /\.vue$/);
  requireComponent2.keys().forEach((fileName) => {
    const componentConfig2 = requireComponent2(fileName);
    const componentName2 = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
    Vue.component(componentName2, componentConfig2.default || componentConfig2);
  });
};

export default register;
