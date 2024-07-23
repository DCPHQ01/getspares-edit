/**
 *
 *
 *
 *
 * This is a TypeScript module that exports an object named `paths`. This object contains a set of methods that return strings representing specific routes in a web application. These methods are used throughout the application to maintain consistency and avoid hardcoding of route paths.
 *
 * For example, the method `toDashboard` when called, returns the string `"/dashboard"`. This is represented in the code as follows:
 *
 * ```typescript
 * toDashboard: () => "/dashboard",
 * ```
 *
 * Some methods in the `paths` object take parameters. For instance, the `toMailTo` method takes an `email` parameter and returns a string that represents a `mailto:` link. This is represented in the code as follows:
 *
 * ```typescript
 * toMailTo: (email: string) => `mailto:${email}`,
 * ```
 *
 * Similarly, the `toCategoryProducts` method takes a `urlType` parameter and returns a string that represents a route to a specific category of products. This is represented in the code as follows:
 *
 * ```typescript
 * toCategoryProducts: (urlType: string) => `/category/products/${urlType}`,
 * ```
 *
 * The methods in the `paths` object are documented using JSDoc comments. These comments provide a description of what each method does, the parameters it takes (if any), and what it returns. For example, the `toDashboard` method has a JSDoc comment that describes it as a function that returns the route to the dashboard page. This is represented in the code as follows:
 *
 * ```typescript
 * /**
 *  * Returns the route to the dashboard page.
 *  * @function toDashboard
 *  * @memberof paths
 *  * @returns {string} - "/dashboard"
 *
 * toDashboard: () => "/dashboard",
*
```
 *
 * In summary, the `
paths` object provides a centralized way to manage and use route paths in the application, making the code more maintainable and less prone to errors.
 */
export const paths = {
  toReusableMobileNav: () => "/reusables/mobileNav",
  toAddProductDashboard: () => "/addProductDashboard/basicInfo",
  toModalPageVendor: () => "/modalPage/vendor",
  toCart: () => "/cart",
  toForgotPassword: () => "/forgot-password",
  toModalPage: () => "/modalPage",
  toMailTo: (email: string) => `mailto:${email}`,
  toDashboardActorsBuyer: () => "/dashboard/actors/buyer/:id",
  toAddProductDashboardDetails: () => "/addProductDashboard/details",
  toAddProductDashboardAddImages: () => "/addProductDashboard/addImages",
  toAddProductDashboardSpecifications: () =>
    "/addProductDashboard/specifications",
  toAddProductDashboardBasicInfo: () => "/addProductDashboard/basicInfo",
  toAdmin: () => "/admin/overview",
  toSignUp: () => "/signup",
  toVerifyEmail: () => "/verify-email",
  toCategoryProducts: (urlType: string) => `/category/products/${urlType}`,
  toVendorDashboard: () => "/dashboard/vendor/overview",
  toBuyerDashboard: () => "/dashboard/buyer/overview",
  toAgentDashboard: () => "/dashboard/agent/overview",
  toHome: () => "/",
  toLogin: () => "/login",
  toResetNewPassword: () => "/new-password",
  toCheckout: () => "/cart/checkout",
};
