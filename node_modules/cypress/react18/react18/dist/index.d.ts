/// <reference types="cypress" />

/// <reference types="cypress" />
import React__default from 'react';
import * as react_dom from 'react-dom';

/**
 * Gets the root element used to mount the component.
 * @returns {HTMLElement} The root element
 * @throws {Error} If the root element is not found
 */
declare const getContainerEl: () => HTMLElement;

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
 * Mounts a React component into the DOM.
 * @param {import('react').JSX.Element} jsx The React component to mount.
 * @param {MountOptions} options Options to pass to the mount function.
 * @param {string} rerenderKey A key to use to force a rerender.
 *
 * @example
 * import { mount } from '@cypress/react'
 * import { Stepper } from './Stepper'
 *
 * it('mounts', () => {
 *   mount(<StepperComponent />)
 *   cy.get('[data-cy=increment]').click()
 *   cy.get('[data-cy=counter]').should('have.text', '1')
 * }
 *
 * @see {@link https://on.cypress.io/mounting-react} for more details.
 *
 * @returns {Cypress.Chainable<MountReturn>} The mounted component.
 */
declare function mount(jsx: React__default.ReactNode, options?: MountOptions, rerenderKey?: string): Cypress.Chainable<MountReturn>;
/**
 * Removed as of Cypress 11.0.0.
 * @see https://on.cypress.io/migration-11-0-0-component-testing-updates
 */
declare function unmount(options?: UnmountArgs): void;

export { MountOptions, MountReturn, getContainerEl, mount, unmount };
