// export const transformPropValueStr = ({ propName, value, context }) => {
//   const { bindScript, ThisContext, EnvScope, ownProps } = context;
//   try {
//     if (propName === 'style' && !_.isPlainObject(value)) {
//       return undefined;
//     } else if (_.isString(value)) {
//       if ([value.indexOf('::') > -1].some(Boolean)) {
//         const [valueRef] = value.split('::').reverse();
//         return bindScript(valueRef, { props: ownProps });
//       } else if ([/^\S*\bon[A-Z]\w+/.test(propName)].every(Boolean)) {
//         return bindScript(value);
//       } else if ([/\$\{(\'|\")?\w.+\}(\'|\")?/.test(value)].every(Boolean)) {
//         return bindScript(`\`${value}\``);
//       } else if ([/^\S*\bthis.\b(state\.|props\.)\w.\S+\S$/.test(value)].some(Boolean)) {
//         return bindScript(value) || value;
//       } else {
//         return bindScript(`\`${value}\``);
//       }
//     } else if (_.isFunction(value)) {
//       console.log(value);
//       return value(EnvScope, ThisContext);
//     } else {
//       return value;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
