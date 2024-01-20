export declare const ROOT_SELECTOR = "[data-cy-root]";
/**
 * Gets the root element used to mount the component.
 * @returns {HTMLElement} The root element
 * @throws {Error} If the root element is not found
 */
export declare const getContainerEl: () => HTMLElement;
export declare function checkForRemovedStyleOptions(mountingOptions: Record<string, any>): void;
/**
 * Utility function to register CT side effects and run cleanup code during the "test:before:run" Cypress hook
 * @param optionalCallback Callback to be called before the next test runs
 */
export declare function setupHooks(optionalCallback?: Function): void;
/**
 * Remove any style or extra link elements from the iframe placeholder
 * left from any previous test
 *
 * Removed as of Cypress 11.0.0
 * @see https://on.cypress.io/migration-11-0-0-component-testing-updates
 */
export declare function cleanupStyles(): void;
/**
 * Additional styles to inject into the document.
 * A component might need 3rd party libraries from CDN,
 * local CSS files and custom styles.
 *
 * Removed as of Cypress 11.0.0.
 * @see https://on.cypress.io/migration-11-0-0-component-testing-updates
 */
export declare type StyleOptions = unknown;
/**
 * Injects custom style text or CSS file or 3rd party style resources
 * into the given document.
 *
 * Removed as of Cypress 11.0.0.
 * @see https://on.cypress.io/migration-11-0-0-component-testing-updates
 */
export declare const injectStylesBeforeElement: (options: Partial<StyleOptions & {
    log: boolean;
}>, document: Document, el: HTMLElement | null) => void;
