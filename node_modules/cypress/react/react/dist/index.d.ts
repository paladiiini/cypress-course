/// <reference types="cypress" />

import * as React from 'react';
import React__default from 'react';
import * as react_dom from 'react-dom';

interface UnmountArgs {
    log: boolean;
    boundComponentMessage?: string;
}
declare type MountOptions = Partial<MountReactComponentOptions>;
interface MountReactComponentOptions {
    ReactDom: typeof react_dom;
    /**
     * Log the mounting command into Cypress Command Log,
     * true by default.
     */
    log: boolean;
    /**
     * Render component in React [strict mode](https://reactjs.org/docs/strict-mode.html)
     * It activates additional checks and warnings for child components.
     */
    strict: boolean;
}
interface InternalMountOptions {
    reactDom: typeof react_dom;
    render: (reactComponent: ReturnType<typeof React__default.createElement>, el: HTMLElement, reactDomToUse: typeof react_dom) => void;
    unmount: (options: UnmountArgs) => void;
    cleanup: () => boolean;
}
interface MountReturn {
    /**
     * The component that was rendered.
     */
    component: React__default.ReactNode;
    /**
     * Rerenders the specified component with new props. This allows testing of components that store state (`setState`)
     * or have asynchronous updates (`useEffect`, `useLayoutEffect`).
     */
    rerender: (component: React__default.ReactNode) => globalThis.Cypress.Chainable<MountReturn>;
    /**
     * Removes the mounted component.
     *
     * Removed as of Cypress 11.0.0.
     * @see https://on.cypress.io/migration-11-0-0-component-testing-updates
     */
    unmount: (payload: UnmountArgs) => void;
}

/**
 * Create an `mount` function. Performs all the non-React-version specific
 * behavior related to mounting. The React-version-specific code
 * is injected. This helps us to maintain a consistent public API
 * and handle breaking changes in React's rendering API.
 *
 * This is designed to be consumed by `npm/react{16,17,18}`, and other React adapters,
 * or people writing adapters for third-party, custom adapters.
 */
declare const makeMountFn: (type: 'mount' | 'rerender', jsx: React.ReactNode, options?: MountOptions, rerenderKey?: string, internalMountOptions?: InternalMountOptions) => globalThis.Cypress.Chainable<MountReturn>;
/**
 * Create an `unmount` function. Performs all the non-React-version specific
 * behavior related to unmounting.
 *
 * This is designed to be consumed by `npm/react{16,17,18}`, and other React adapters,
 * or people writing adapters for third-party, custom adapters.
 *
 * @param {UnmountArgs} options used during unmounting
 */
declare const makeUnmountFn: (options: UnmountArgs) => Cypress.Chainable<undefined>;
declare const createMount: (defaultOptions: MountOptions) => (element: React.ReactElement, options?: MountOptions) => Cypress.Chainable<MountReturn>;

/**
 * Gets the root element used to mount the component.
 * @returns {HTMLElement} The root element
 * @throws {Error} If the root element is not found
 */
declare const getContainerEl: () => HTMLElement;

/**
 * Mounts a React component into the DOM.
 * @param jsx {React.ReactNode} The React component to mount.
 * @param options {MountOptions} [options={}] options to pass to the mount function.
 * @param rerenderKey {string} [rerenderKey] A key to use to force a rerender.
 * @see {@link https://on.cypress.io/mounting-react} for more details.
 * @example
 * import { mount } from '@cypress/react'
 * import { Stepper } from './Stepper'
 *
 * it('mounts', () => {
 *   mount(<StepperComponent />)
 *   cy.get('[data-cy=increment]').click()
 *   cy.get('[data-cy=counter]').should('have.text', '1')
 * }
 */
declare function mount(jsx: React__default.ReactNode, options?: MountOptions, rerenderKey?: string): Cypress.Chainable<MountReturn>;
/**
 * Removed as of Cypress 11.0.0.
 * @see https://on.cypress.io/migration-11-0-0-component-testing-updates
 */
declare function unmount(options?: {
    log: boolean;
}): void;

/**
 * Mounts a React hook function in a test component for testing.
 * Removed as of Cypress 11.0.0.
 * @see https://on.cypress.io/migration-11-0-0-component-testing-updates
 */
declare const mountHook: <T>(hookFn: (...args: any[]) => T) => void;

export { InternalMountOptions, MountOptions, MountReactComponentOptions, MountReturn, UnmountArgs, createMount, getContainerEl, makeMountFn, makeUnmountFn, mount, mountHook, unmount };
