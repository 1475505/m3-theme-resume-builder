# AGENTS.md — 项目约定与架构规则

本文档定义 M3 Resume Builder 项目的编码标准、架构边界和工作流约定。所有 AI agent 和开发者应遵循以下规范。

## 技术栈约束

- **框架**: Nuxt 3 + Vue 3 (Composition API) + TypeScript
- **样式**: Plain CSS + CSS Custom Properties。禁止使用 SCSS/Less/Tailwind 等预处理器或 utility 框架
- **色彩**: 必须通过 `@material/material-color-utilities` v0.3 的 HCT 算法生成，禁止硬编码颜色值（DESIGN.md 中的 M3 baseline 值除外）
- **字体**: Roboto (Latin) + Noto Sans SC (CJK)，通过 Google Fonts CDN 加载
- **图标**: Material Symbols Outlined，通过 Google Fonts CDN 加载
- **PDF**: Puppeteer，通过 Nuxt Server Route 调用

## 目录结构约定

```
m3-theme-resume-builder/
├── DESIGN.md              # 设计系统文档（权威视觉规范来源）
├── RESEARCH.md            # 技术调研（只读参考，不修改）
├── prototype.html         # HTML 原型（只读参考，不修改）
├── app.vue                # 根组件，仅包含 <NuxtPage />
├── pages/                 # Nuxt 页面路由
│   └── index.vue          # 唯一页面，组装布局 + 编排组件
├── components/            # Vue 组件（Nuxt 自动导入）
│   ├── Toolbar.vue        # 工具栏（主题色、明暗、PDF 导出）
│   ├── EditorPanel.vue    # 编辑器面板（表单 + JSON 导入导出）
│   ├── ResumePage.vue     # A4 页面容器（仅做布局包裹）
│   ├── ResumeHeader.vue   # 简历头部
│   ├── SummarySection.vue # 专业概述
│   ├── SkillsSection.vue  # 专业技能（列表/卡片双视图）
│   ├── WorkExperience.vue # 工作经历
│   ├── ProjectsSection.vue# 项目经历
│   └── EducationSection.vue# 教育背景
├── composables/           # 组合式函数（Nuxt 自动导入）
│   ├── useTheme.ts        # 主题管理（全局单例状态）
│   └── useResume.ts       # 简历数据管理（全局单例状态）
├── data/
│   └── resume.ts          # 数据结构定义 + 示例数据
├── assets/css/
│   └── global.css         # 全局样式（M3 Token + 组件样式 + 响应式 + 打印）
└── server/api/
    └── export-pdf.post.ts # PDF 导出 Server Route
```

### 文件添加规则

- 新增页面 → `pages/` 目录，文件名即路由
- 新增 UI 组件 → `components/` 目录，PascalCase 命名
- 新增业务逻辑 → `composables/` 目录，`use` 前缀命名
- 新增服务端 API → `server/api/` 目录，文件名 + HTTP 方法后缀（如 `.post.ts`）
- 新增数据类型 → `data/` 目录，export interface + export data

## 架构规则

### 状态管理

项目使用 composable 模块级 `ref` 实现全局单例状态（非 Pinia），原因：状态简单，仅主题和数据两个模块。

- `useTheme()` — 主题色和明暗模式，状态在模块顶层 `ref` 中，所有调用者共享
- `useResume()` — 简历数据，同上

新增状态模块时遵循相同模式：模块顶层定义 `ref`，函数返回 readonly 引用 + mutation 方法。

### 主题系统

```
用户选择 seed color
  → useTheme.setSeedColor(hex)
  → SchemeTonalSpot(Hct.fromInt(argbFromHex(hex)), isDark, 0)
  → 遍历 34 个颜色角色
  → document.body.style.setProperty('--md-*', hexFromArgb(value))
  → CSS transition 自动过渡
```

CSS 变量命名规范：`--md-{role}`，对应 M3 色板角色（如 `--md-primary`、`--md-surface-container-high`）。新增颜色角色时必须同步更新 `useTheme.ts` 的 `cssVarMap` 和 `ThemeColors` 接口。

### 组件通信

- 简历数据通过 `useResume()` 的 `data` ref 向下传递（props）
- 编辑器通过 `useResume()` 的 mutation 方法修改数据
- 主题通过 `useTheme()` 直接操作 DOM CSS 变量，无需 props 传递
- PDF 导出通过事件 `@export-pdf` 从 Toolbar 冒泡到 `pages/index.vue`

### 样式约定

- 所有颜色使用 `var(--md-*)` CSS 变量，禁止硬编码
- 间距使用 `var(--sp-*)` 变量（2/4/6/8/10/12/16/20/24/32/48px）
- 圆角使用 `var(--md-shape-*)` 变量（xs/sm/md/lg/xl/full）
- 阴影使用 `var(--md-elevation-*)` 变量（1/2/3）
- 过渡动画：颜色变化 `.35s ease`，交互反馈 `.2s ease`
- 所有带颜色的元素必须添加 `transition` 属性以支持主题切换动画

### PDF 导出流程

```
用户点击「导出 PDF」
  → Toolbar emit('export-pdf')
  → pages/index.vue handleExportPDF()
  → 捕获 #resume-page innerHTML + 当前 CSS 变量
  → 组装完整 HTML 文档（含字体、样式）
  → POST /api/export-pdf { html }
  → Puppeteer setContent → page.pdf({ format: 'A4' })
  → 返回 ArrayBuffer → Blob → 下载
  → 失败时 fallback 到 window.print()
```

## 编码标准

### TypeScript

- 组件使用 `<script setup lang="ts">`
- 数据类型集中定义在 `data/resume.ts`，export interface
- composable 返回类型由 TS 自动推导，无需显式标注
- 避免使用 `any`，必要时用 `as` 类型断言

### Vue 组件

- 文件名 PascalCase（如 `SkillsSection.vue`）
- Nuxt 自动导入，无需手动 import 组件
- props 使用 `defineProps<{ ... }>()` 泛型语法
- 事件使用 `defineEmits<{ (e: 'name', payload: Type): void }>()`
- 组件内 ref 命名：camelCase，避免与 DOM API 冲突

### CSS

- 所有样式集中在 `assets/css/global.css`
- 组件不写 `<style>` 块（全局样式统一管理）
- BEM 风格命名：`.block-element--modifier`（如 `.skill-proficiency--expert`）
- 响应式断点：1200px（编辑器收窄）、860px（切换为移动端布局）
- 打印样式：隐藏工具栏和编辑器，A4 精确尺寸，`break-inside: avoid`

### Git 约定

- Commit message 格式：`<type>: <description>`
- Type 可选：`feat`、`fix`、`style`、`refactor`、`docs`、`chore`
- 示例：`feat: add dark mode toggle to toolbar`

## 设计系统维护

DESIGN.md 是视觉规范的权威来源。修改视觉规则时：

1. 先更新 DESIGN.md 中对应的 token 定义
2. 运行 `npx @google/design.md lint DESIGN.md` 验证格式
3. 再更新 `global.css` 中的 CSS 变量和组件样式
4. 如涉及新增颜色角色，同步更新 `composables/useTheme.ts`

### DESIGN.md 格式约束（Google Stitch 标准）

- YAML frontmatter 仅允许以下顶层类别：`colors`、`typography`、`rounded`、`spacing`、`components`
- `colors` 值必须为 CSS hex/rgb/oklch，禁止描述性文本
- `components` 子 token 仅限：`backgroundColor`、`textColor`、`typography`、`rounded`、`padding`、`size`、`height`、`width`
- `elevation` 和 `motion` 不属于 YAML frontmatter，记录在 markdown body 中

## 构建与验证

```bash
# 类型检查（通过 Nuxt 构建隐式执行）
npm run build

# 设计文档 lint
npx @google/design.md lint DESIGN.md

# 开发验证
npm run dev
# 访问 http://localhost:3000 检查：
# 1. 编辑器表单正常渲染并可编辑
# 2. A4 预览实时同步
# 3. 主题色切换正常（5 种预设色）
# 4. 明暗模式切换正常
# 5. 技能视图切换正常（列表 ↔ 卡片）
# 6. PDF 导出正常（或 fallback 到打印）
# 7. JSON 导入/导出正常
```
