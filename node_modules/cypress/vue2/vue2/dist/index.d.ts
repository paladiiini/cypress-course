/// <reference types="cypress" />

import Vue, { ComponentOptions as ComponentOptions$1, FunctionalComponentOptions, Component } from 'vue';

type Prop<T> = { (): T } | { new(...args: never[]): T & object } | { new(...args: string[]): Function }

type PropType<T> = Prop<T> | Prop<T>[];

type PropValidator<T> = PropOptions<T> | PropType<T>;

interface PropOptions<T=any> {
  type?: PropType<T>;
  required?: boolean;
  default?: T | null | undefined | (() => T | null | undefined);
  validator?(value: T): boolean;
}

type RecordPropsDefinition<T> = {
  [K in keyof T]: PropValidator<T[K]>
}
type ArrayPropsDefinition<T> = (keyof T)[];
type PropsDefinition<T> = ArrayPropsDefinition<T> | RecordPropsDefinition<T>;

type DefaultProps = Record<string, any>;

/**
 * Utility type to declare an extended Vue constructor
 */
type VueClass<V extends Vue> = (new (...args: any[]) => V) & typeof Vue

/**
 * Utility type for a selector
 */
type Selector = string | Component

/**
 * Utility type for ref options object that can be used as a Selector
 */
type RefSelector = {
  ref: string
}

/**
 * Utility type for name options object that can be used as a Selector
 */
type NameSelector = {
  name: string
}

/**
 * Base class of Wrapper and WrapperArray
 * It has common methods on both Wrapper and WrapperArray
 */
interface BaseWrapper {
  contains (selector: Selector): boolean
  exists (): boolean
  isVisible (): boolean

  attributes(): { [name: string]: string }
  attributes(key: string): string | void
  classes(): Array<string>
  classes(className: string): boolean
  props(): { [name: string]: any }
  props(key: string): any | void
  overview(): void

  is (selector: Selector): boolean
  isEmpty (): boolean
  isVueInstance (): boolean

  setData (data: object): Promise<void> | void
  setMethods (data: object): void
  setProps (props: object): Promise<void> | void

  setValue (value: any): Promise<void> | void
  setChecked (checked?: boolean): Promise<void> | void
  setSelected (): Promise<void> | void

  trigger (eventName: string, options?: object): Promise<void> | void
  destroy (): void
  selector: Selector | void
}

interface Wrapper<V extends Vue | null, el extends Element = Element> extends BaseWrapper {
  readonly vm: V
  readonly element: el
  readonly options: WrapperOptions

  get<R extends Vue> (selector: VueClass<R>): Wrapper<R>
  get<R extends Vue> (selector: ComponentOptions$1<R>): Wrapper<R>
  get<Props = DefaultProps, PropDefs = PropsDefinition<Props>>(selector: FunctionalComponentOptions<Props, PropDefs>): Wrapper<Vue>
  get<el extends Element>(selector: string): Wrapper<Vue, el>
  get (selector: RefSelector): Wrapper<Vue>
  get (selector: NameSelector): Wrapper<Vue>

  getComponent<R extends Vue> (selector: VueClass<R>): Wrapper<R>
  getComponent<R extends Vue> (selector: ComponentOptions$1<R>): Wrapper<R>
  getComponent<Props = DefaultProps, PropDefs = PropsDefinition<Props>>(selector: FunctionalComponentOptions<Props, PropDefs>): Wrapper<Vue>
  getComponent (selector: RefSelector): Wrapper<Vue>
  getComponent (selector: NameSelector): Wrapper<Vue>

  find<R extends Vue> (selector: VueClass<R>): Wrapper<R>
  find<R extends Vue> (selector: ComponentOptions$1<R>): Wrapper<R>
  find<Props = DefaultProps, PropDefs = PropsDefinition<Props>>(selector: FunctionalComponentOptions<Props, PropDefs>): Wrapper<Vue>
  find<el extends Element>(selector: string): Wrapper<Vue, el>
  find (selector: RefSelector): Wrapper<Vue>
  find (selector: NameSelector): Wrapper<Vue>

  findAll<R extends Vue> (selector: VueClass<R>): WrapperArray<R>
  findAll<R extends Vue> (selector: ComponentOptions$1<R>): WrapperArray<R>
  findAll<Props = DefaultProps, PropDefs = PropsDefinition<Props>>(selector: FunctionalComponentOptions<Props, PropDefs>): WrapperArray<Vue>
  findAll (selector: string): WrapperArray<Vue>
  findAll (selector: RefSelector): WrapperArray<Vue>
  findAll (selector: NameSelector): WrapperArray<Vue>

  findComponent<R extends Vue> (selector: VueClass<R>): Wrapper<R>
  findComponent<R extends Vue> (selector: ComponentOptions$1<R>): Wrapper<R>
  findComponent<Props = DefaultProps, PropDefs = PropsDefinition<Props>>(selector: FunctionalComponentOptions<Props, PropDefs>): Wrapper<Vue>
  findComponent (selector: RefSelector): Wrapper<Vue>
  findComponent (selector: NameSelector): Wrapper<Vue>

  findAllComponents<R extends Vue> (selector: VueClass<R>): WrapperArray<R>
  findAllComponents<R extends Vue> (selector: ComponentOptions$1<R>): WrapperArray<R>
  findAllComponents<Props = DefaultProps, PropDefs = PropsDefinition<Props>>(selector: FunctionalComponentOptions<Props, PropDefs>): WrapperArray<Vue>
  findAllComponents(selector: RefSelector): WrapperArray<Vue>
  findAllComponents(selector: NameSelector): WrapperArray<Vue>

  html (): string
  text (): string
  name (): string

  emitted (): { [name: string]: Array<Array<any>>|undefined }
  emitted (event: string): Array<any>|undefined
  emittedByOrder (): Array<{ name: string, args: Array<any> }>
}

interface WrapperArray<V extends Vue> extends BaseWrapper {
  readonly length: number;
  readonly wrappers: Array<Wrapper<V>>;

  at(index: number): Wrapper<V>;
  filter(
    predicate: (
      value: Wrapper<V>,
      index: number,
      array: Wrapper<V>[]
    ) => any
  ): WrapperArray<Vue>;
}

interface WrapperOptions {
  attachedToDocument?: boolean
}

interface VueTestUtilsConfigOptions {
  stubs: Record<string, Component | boolean | string>
  mocks: Record<string, any>
  methods: Record<string, Function>
  provide?: Record<string, any>,
  showDeprecationWarnings?: boolean
  deprecationWarningHandler?: Function
}

/**
 * Type for component passed to "mount"
 *
 * @interface VueComponent
 * @example
 *  import Hello from './Hello.vue'
 *         ^^^^^ this type
 *  mount(Hello)
 */
declare type VueComponent = Vue.ComponentOptions<any> | Vue.VueConstructor;
/**
 * Options to pass to the component when creating it, like
 * props.
 *
 * @interface ComponentOptions
 */
declare type ComponentOptions = Record<string, unknown>;
declare type VueLocalComponents = Record<string, VueComponent>;
declare type VueFilters = {
    [key: string]: (value: string) => string;
};
declare type VueDirectives = {
    [key: string]: Function | Object;
};
declare type VueMixin = unknown;
declare type VueMixins = VueMixin | VueMixin[];
declare type VuePluginOptions = unknown;
declare type VuePlugin = unknown | [unknown, VuePluginOptions];
/**
 * A single Vue plugin or a list of plugins to register
 */
declare type VuePlugins = VuePlugin[];
/**
 * Additional Vue services to register while mounting the component, like
 * local components, plugins, etc.
 *
 * @interface MountOptionsExtensions
 * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
 */
interface MountOptionsExtensions {
    /**
     * Extra local components
     *
     * @memberof MountOptionsExtensions
     * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
     * @example
     *  import Hello from './Hello.vue'
     *  // imagine Hello needs AppComponent
     *  // that it uses in its template like <app-component ... />
     *  // during testing we can replace it with a mock component
     *  const appComponent = ...
     *  const components = {
     *    'app-component': appComponent
     *  },
     *  mount(Hello, { extensions: { components }})
     */
    components?: VueLocalComponents;
    /**
     * Optional Vue filters to install while mounting the component
     *
     * @memberof MountOptionsExtensions
     * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
     * @example
     *  const filters = {
     *    reverse: (s) => s.split('').reverse().join(''),
     *  }
     *  mount(Hello, { extensions: { filters }})
     */
    filters?: VueFilters;
    /**
     * Optional Vue mixin(s) to install when mounting the component
     *
     * @memberof MountOptionsExtensions
     * @alias mixins
     * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
     */
    mixin?: VueMixins;
    /**
     * Optional Vue mixin(s) to install when mounting the component
     *
     * @memberof MountOptionsExtensions
     * @alias mixin
     * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
     */
    mixins?: VueMixins;
    /**
     * A single plugin or multiple plugins.
     *
     * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
     * @alias plugins
     * @memberof MountOptionsExtensions
     */
    use?: VuePlugins;
    /**
     * A single plugin or multiple plugins.
     *
     * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
     * @alias use
     * @memberof MountOptionsExtensions
     */
    plugins?: VuePlugins;
    /**
     * Optional Vue directives to install while mounting the component
     *
     * @memberof MountOptionsExtensions
     * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
     * @example
     *  const directives = {
     *    custom: {
     *        name: 'custom',
     *        bind (el, binding) {
     *          el.dataset['custom'] = binding.value
     *        },
     *        unbind (el) {
     *          el.removeAttribute('data-custom')
     *        },
     *    },
     *  }
     *  mount(Hello, { extensions: { directives }})
     */
    directives?: VueDirectives;
}
/**
 * Options controlling how the component is going to be mounted,
 * including global Vue plugins and extensions.
 *
 * @interface MountOptions
 */
interface MountOptions {
    /**
     * Vue instance to use.
     *
     * @deprecated
     * @memberof MountOptions
     */
    vue: unknown;
    /**
     * Extra Vue plugins, mixins, local components to register while
     * mounting this component
     *
     * @memberof MountOptions
     * @see https://github.com/cypress-io/cypress/tree/develop/npm/vue#examples
     */
    extensions: MountOptionsExtensions;
}
/**
 * Utility type for union of options passed to "mount(..., options)"
 */
declare type MountOptionsArgument = Partial<ComponentOptions & MountOptions & VueTestUtilsConfigOptions>;
declare global {
    namespace Cypress {
        interface Cypress {
            /**
             * Mounted Vue instance is available under Cypress.vue
             * @memberof Cypress
             * @example
             *  mount(Greeting)
             *  .then(() => {
             *    Cypress.vue.message = 'Hello There'
             *  })
             *  // new message is displayed
             *  cy.contains('Hello There').should('be.visible')
             */
            vue: Vue;
            vueWrapper: Wrapper<Vue>;
        }
    }
}
/**
 * Mounts a Vue component inside Cypress browser.
 * @param {VueComponent} component imported from Vue file
 * @param {MountOptionsArgument} optionsOrProps used to pass options to component being mounted
 * @returns {Cypress.Chainable<{wrapper: Wrapper<T>, component: T}
 * @example
 * import { mount } from '@cypress/vue'
 * import { Stepper } from './Stepper.vue'
 *
 * it('mounts', () => {
 *   cy.mount(Stepper)
 *   cy.get('[data-cy=increment]').click()
 *   cy.get('[data-cy=counter]').should('have.text', '1')
 * })
 * @see {@link https://on.cypress.io/mounting-vue} for more details.
 *
 */
declare const mount: (component: VueComponent, optionsOrProps?: MountOptionsArgument) => Cypress.Chainable<{
    wrapper: Wrapper<Vue, Element>;
    component: Wrapper<Vue, Element>['vm'];
}>;
/**
 * Helper function for mounting a component quickly in test hooks.
 * @example
 *  import {mountCallback} from '@cypress/vue2'
 *  beforeEach(mountVue(component, options))
 *
 * Removed as of Cypress 11.0.0.
 * @see https://on.cypress.io/migration-11-0-0-component-testing-updates
 */
declare const mountCallback: (component: VueComponent, options?: MountOptionsArgument) => () => void;

export { mount, mountCallback };
