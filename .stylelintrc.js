export default {
  // 继承推荐规范配置
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recommended-less',
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-recommended-vue'
  ],
  plugins: ['stylelint-less'],
  // 指定不同文件对应的解析器
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html'
    }
  ],
  // 自定义规则
  rules: {
    // 允许 global 、export 、v-deep等伪类
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'export', 'v-deep', 'deep']
      }
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)([-_][a-z0-9]+)*$',
      {
        message: (selector) => `Expected class selector "${selector}" to be kebab-case`
      }
    ]
  }
}
