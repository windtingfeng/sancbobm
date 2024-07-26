module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
     // 检测规则, vue3用：'plugin:vue/vue3-recommended' 
    // 'plugin:vue/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  // 用于解析vue与eslint的规则
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  // 0：关闭，1：警告，2：禁止   或者：off/warn/error
  rules: {
    // 自定义规则配置

    // 这些规则属于避免错误的最佳实践
    
    // 数组的方法除了 forEach 之外，回调函数必须有返回值
    'array-callback-return': 'error',
    // 将 var 定义的变量视为块作用域，禁止在块外使用
    'block-scoped-var': 'error',
    // 禁止函数的循环复杂度超过 20，https://en.wikipedia.org/wiki/Cyclomatic_complexity
    'complexity': [
      'error',
      {
        max: 20
      }
    ],
    // 禁止函数在不同分支返回不同类型的值
    // @off 太严格了
    'consistent-return': 'off',
    // 要求在派生类中调用 super()
    'constructor-super': 'error',
    // @fixable if 后面必须要有 {，除非是单行 if
    'curly': [
      'error',
      'multi-line',
      'consistent'
    ],
    // switch 语句必须有 default
    // @off 太严格了
    'default-case': 'off',
    // @fixable 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
    'dot-location': [
      'error',
      'property'
    ],
    // @fixable 禁止出现 foo['bar']，必须写成 foo.bar
    // @off 当需要写一系列属性的时候，可以更统一
    'dot-notation': 'off',
    // 禁止错误的for循环方向
    'for-direction': 'error',

    // for in 内部必须有 hasOwnProperty
    'guard-for-in': 'off',
    // 禁止使用 alert
    // @off alert 很常用
    'no-alert': 'error',
    // 禁止使用 caller 或 callee
    'no-caller': 'error',
    // switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
    'no-case-declarations': 'error',
    // 禁止在正则表达式中出现形似除法操作符的开头，如 let a = /=foo/
    // @off 有代码高亮的话，在阅读这种代码时，也完全不会产生歧义或理解上的困难
    'no-div-regex': 'off',
    // @fixable 禁止在 else 内使用 return，必须改为提前结束
    // @off else 中使用 return 可以使代码结构更清晰
    'no-else-return': 'off',
    // 禁止空的块语句（比如 catch 语句中的空代码块），允许在 catch 语句中出现空代码块
    'no-empty': ['warn',
      {
        allowEmptyCatch: true
      }
    ],

    // 禁止不必要的括号，仅在函数表达式周围禁止使用不必要的括号
    'no-extra-parens': ['error',
      'functions'
    ],

    // 不允许有空函数，除非是将一个空函数设置为某个项的默认值
    'no-empty-function': [
      'error',
      {
        allow: [
          'functions',
          'arrowFunctions'
        ]
      }
    ],
    // 禁止解构中出现空 {} 或 []
    'no-empty-pattern': 'error',
    // 禁止使用 foo == null 或 foo != null，必须使用 foo === null 或 foo !== null
    // @off foo == null 用于判断 foo 不是 undefined 并且不是 null，比较常用，故允许此写法
    'no-eq-null': 2,
    // 禁止使用 eval
    'no-eval': 'error',
    // 禁止修改原生对象
    'no-extend-native': 'error',
    // @fixable 禁止出现没必要的 bind
    'no-extra-bind': 'error',
    // @fixable 禁止出现没必要的 label
    'no-extra-label': 'error',
    // switch 的 case 内必须有 break, return 或 throw
    'no-fallthrough': 'error',
    // 禁止对全局变量赋值
    'no-global-assign': 'error',
    // @fixable 禁止使用 !! ~ 等难以理解的运算符
    // 仅允许使用 !!
    'no-implicit-coercion': [
      1,
      {
        allow: [
          '!!'
        ]
      }
    ],
    // 禁止在 setTimeout 或 setInterval 中传入字符串，如 setTimeout('alert("Hi!")', 100);
    'no-implied-eval': 'error',
    // 禁止在类之外的地方使用 this
    // @off this 的使用很灵活，事件回调中可以表示当前元素，函数也可以先用 this，等以后被调用的时候再 call
    'no-invalid-this': 'off',
    // 禁止使用特殊空白符（比如全角空格）除非出现在字符串、正则表达式或模板字符串中
    'no-irregular-whitespace': ['error',
      {
        skipStrings: true,
        skipComments: false,
        skipRegExps: true,
        skipTemplates: true
      }
    ],
    // 禁止使用 __iterator__
    'no-iterator': 'error',
    // 禁止使用 label
    'no-labels': 'error',
    // 禁止在循环内的函数中出现循环体条件语句中定义的变量，比如：
    // for (var i = 0; i < 10; i++) {
    //     (function () { return i })();
    // }
    'no-loop-func': 'error',
    // @fixable 禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
    'no-multi-spaces': [
      'error',
      {
        ignoreEOLComments: true,
        exceptions: {
          Property: true,
          BinaryExpression: false,
          VariableDeclarator: true,
          ImportDeclaration: true
        }
      }
    ],
    // 禁止使用 \ 来换行字符串
    'no-multi-str': 'error',
    // 禁止直接 new 一个类而不赋值
    'no-new': 'error',
    // 禁止使用 new Function，比如 let x = new Function("a", "b", "return a + b");
    'no-new-func': 'error',
    // 禁止使用 new 来生成 String, Number 或 Boolean
    'no-new-wrappers': 'error',
    // 禁止使用 0 开头的数字表示八进制数
    'no-octal': 'error',
    // 禁止使用八进制的转义符
    'no-octal-escape': 'error',
    // 禁止对函数的参数重新赋值
    'no-param-reassign': 'error',
    // 禁止使用 __proto__
    'no-proto': 'error',
    // 禁止重复定义变量
    'no-redeclare': 'error',
    // 禁止在 return 语句里赋值
    'no-return-assign': [
      'error',
      'always'
    ],
    // 禁止在 return 语句里使用 await
    'no-return-await': 'error',
    // 禁止出现 location.href = 'javascript:void(0)';
    'no-script-url': 'error',
    // 禁止将自己赋值给自己
    'no-self-assign': 'error',
    // 禁止将自己与自己比较
    'no-self-compare': 'error',
    // 禁止使用逗号操作符
    'no-sequences': 'error',
    // 禁止在数组中出现连续的逗号，如 let foo = [,,]
    'no-sparse-arrays': 'error',
    // 禁止在 super() 之前使用 this/super 关键字
    'no-this-before-super': 'error',
    // 禁止 throw 字面量，必须 throw 一个 Error 对象
    'no-throw-literal': 'error',
    // 禁止在换行符之前出现意外的多行代码
    'no-unexpected-multiline': 'error',
    // 禁止在 finally 块中出现 return、throw、break 或 continue 语句
    'no-unsafe-finally': 'error',
    // 禁止在 return、throw、break 或 continue 语句后还有代码
    'no-unreachable': 'error',
    // 循环内必须对循环条件的变量有修改
    'no-unmodified-loop-condition': 'error',
    // 禁止无用的表达式
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true
      }
    ],
    // @fixable 禁止出现没用的 label
    'no-unused-labels': 'error',
    // 禁止出现没必要的 call 或 apply
    'no-useless-call': 'error',
    // 禁止出现没必要的字符串连接
    'no-useless-concat': 'error',
    // 禁止出现没必要的转义
    // @off 转义可以使代码更易懂
    'no-useless-escape': 'off',
    // @fixable 禁止没必要的 return
    // @off 没必要限制 return
    'no-useless-return': 'off',
    // 禁止使用 void
    'no-void': 'error',
    // 禁止使用 with
    'no-with': 'error',
    // parseInt 必须传入第二个参数
    'radix': 'error',
    // async 函数中必须存在 await 语句
    // @off async function 中没有 await 的写法很常见，比如 koa 的示例中就有这种用法
    'require-await': 'off',
     // 必须使用 isNaN(foo) 而不是 foo === NaN
    'use-isnan': 'error',
     // typeof 表达式比较的对象必须是 'undefined', 'object', 'boolean', 'number', 'string', 'function' 或 'symbol'
    'valid-typeof': 'error',
    // @fixable 立即执行的函数必须符合如下格式 (function () { alert('Hello') })()
    'wrap-iife': [
      'error',
      'inside',
      {
        functionPrototypeMethods: true
      }
    ],
    // @fixable 必须使用 if (foo === 5) 而不是 if (5 === foo)
    'yoda': [
      'error',
      'never',
      {
        onlyEquality: true
      }
    ],

    // 这些规则与变量申明有关
    //
    // 禁止修改使用 const 声明的变量
    'no-const-assign': 'error',
    // 禁止 label 名称与定义过的变量重复
    'no-label-var': 'error',
    // 禁止变量名与上层作用域内的定义过的变量重复
    // @off 很多时候函数的形参和传参是同名的
    'no-shadow': 'off',
    // 禁止使用保留字作为变量名
    'no-shadow-restricted-names': 'error',
    // 禁止使用未定义的变量
    'no-undef': [
      'error',
      {
        typeof: false
      }
    ],
    // @fixable 禁止将 undefined 赋值给变量
    'no-undef-init': 'error',
    // 禁止对 undefined 重新赋值
    'no-undefined': 'error',
    // 定义过的变量必须使用
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true
      }
    ],
    // 变量必须先定义后使用
    'no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        variables: false
      }
    ],
    // 不建议使用 var 关键字
    "no-var": "warn",

    // 以下配置和代码风格有关
    // 单行代码的最大长度为 120
    "max-len": ['warn', {
      "code": 120,
    }],
    // 设置 Vue 单行代码的最大长度为 120
    "vue/max-len": ['warn', {
      "code": 120,
    }],
    "vue/max-attributes-per-line": ['warn', {
      "singleline": {
        "max": 3 // 单行模式下最多几个属性
      },
      "multiline": {
        "max": 1, // 多行模式下每行最多几个属性
      }
    }],
    "vue/html-self-closing": ['warn', {
      "html": {
        "void": "always", // 空标签始终自封闭
        "normal": "never", // 普通标签不自封闭
        "component": "always" // Vue 组件标签始终自封闭
      },
      "svg": "always", // svg 标签始终自封闭
      "math": "always" // math 标签始终自封闭
    }],
  }
};
