// var parser = require('esprima');
import { Type } from 'js-yaml';

function resolveJavascriptFunction(data) {
  if (data === null) return false;

  try {
    // var source = '(' + data + ')',
    //   ast = parser.parse(source, { range: true, jsx: true });
    // if (
    //   ast.type !== 'Program' ||
    //   ast.body.length !== 1 ||
    //   ast.body[0].type !== 'ExpressionStatement' ||
    //   (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
    //     ast.body[0].expression.type !== 'StaticMemberExpression' &&
    //     ast.body[0].expression.type !== 'MemberExpression' &&
    //     ast.body[0].expression.type !== 'FunctionExpression')
    // ) {
    //   return false;
    // }

    return true;
  } catch (err) {
    return false;
  }
}

function constructJavascriptFunction(data) {
  /*jslint evil:true*/
  var source = '(' + data + ')';
  // var ast = parser.parse(source, { range: true, jsx: true }),
  //   params = [],
  //   body;
  // if (
  //   ast.type !== 'Program' ||
  //   ast.body.length !== 1 ||
  //   ast.body[0].type !== 'ExpressionStatement' ||
  //   (ast.body[0].expression.type !== 'ArrowFunctionExpression' &&
  //     ast.body[0].expression.type !== 'StaticMemberExpression' &&
  //     ast.body[0].expression.type !== 'MemberExpression' &&
  //     ast.body[0].expression.type !== 'FunctionExpression')
  // ) {
  //   throw new Error('Failed to resolve function');
  // }

  const bindFunc = function (code) {
    return function (scope, context) {
      const sandbox = new Function(Object.keys(scope).join(','), `return ${code}`);
      const scopedSandbox = sandbox.apply(context, Object.values(scope));
      return scopedSandbox && scopedSandbox.bind ? scopedSandbox.bind(context) : scopedSandbox;
    };
  };

  return bindFunc(source);
}

function representJavascriptFunction(object /*, style*/) {
  return object.toString();
}

function isFunction(object) {
  return Object.prototype.toString.call(object) === '[object Function]';
}

export default [
  new Type('tag:yaml.org,2002:js', {
    kind: 'scalar',
    resolve: resolveJavascriptFunction,
    construct: constructJavascriptFunction,
    predicate: isFunction,
    represent: representJavascriptFunction,
  }),
];
