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
};

export default register;
