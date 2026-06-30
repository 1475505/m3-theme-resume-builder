# M3 Theme Resume Builder

基于 Material Design 3 (Material You) 设计系统的简历构建器。支持 HCT 色彩动态生成、实时预览编辑、明暗主题切换和 Puppeteer A4 PDF 导出。

## 技术栈

| 类别 | 选型 | 说明 |
|------|------|------|
| 框架 | Nuxt 3 + Vue 3 + TypeScript | SSR/SSG 支持，Server Route 提供 API 端点 |
| 样式 | Plain CSS + CSS Custom Properties | 全量 M3 Design Token，无预处理器依赖 |
| 色彩 | @material/material-color-utilities v0.3 | HCT (Hue-Chroma-Tone) 算法生成 30+ M3 色板角色 |
| 字体 | Roboto + Noto Sans SC | Latin + CJK 双语覆盖 |
| 图标 | Material Symbols Outlined | Google 官方图标库 |
| PDF | Puppeteer v24 | Headless Chrome 渲染精确 A4 输出 |
| 数据 | JSON Resume 兼容格式 | 标准化简历数据结构 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器 (默认 http://localhost:3000)
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
m3-theme-resume-builder/
├── DESIGN.md                  # Google Stitch 标准设计系统文档
├── RESEARCH.md                # 技术调研文档（M3 分析、竞品对比、架构建议）
├── prototype.html             # 原始单文件 HTML 原型（参考实现）
│
├── nuxt.config.ts             # Nuxt 配置（字体、Material Web 兼容、Nitro preset）
├── package.json               # 依赖与脚本
├── tsconfig.json              # TypeScript 配置（extends .nuxt/tsconfig.json）
│
├── app.vue                    # 根组件（仅 <NuxtPage />）
├── pages/
│   └── index.vue              # 主页面：分屏布局（编辑器 + A4 预览 + 工具栏）
│
├── components/
│   ├── Toolbar.vue            # 顶部浮动工具栏（主题色板、明暗切换、PDF 导出）
│   ├── EditorPanel.vue        # 左侧编辑器面板（手风琴折叠分区表单）
│   ├── ResumePage.vue         # A4 页面容器（包裹所有简历段落组件）
│   ├── ResumeHeader.vue       # 简历头部（姓名、职位、联系方式）
│   ├── SummarySection.vue     # 专业概述段落
│   ├── SkillsSection.vue      # 专业技能段落（列表视图 / 卡片视图双模式）
│   ├── WorkExperience.vue     # 工作经历段落（公司、职位、亮点列表）
│   ├── ProjectsSection.vue    # 项目经历段落（项目卡片、技术栈 chip）
│   └── EducationSection.vue   # 教育背景段落
│
├── composables/
│   ├── useTheme.ts            # 主题管理：HCT 色彩生成、CSS 变量注入、明暗切换
│   └── useResume.ts           # 数据管理：简历状态、CRUD 操作、JSON 导入/导出
│
├── data/
│   └── resume.ts              # 简历数据定义 + 类型接口 + 示例数据（陈明远）
│
├── assets/
│   └── css/
│       └── global.css         # 全局样式：M3 Token、组件样式、响应式、打印样式
│
└── server/
    └── api/
        └── export-pdf.post.ts # Puppeteer PDF 导出 API (POST /api/export-pdf)
```

## 核心功能

### 分屏编辑
左侧 380px 编辑器面板采用手风琴折叠分区，包含基本信息、专业概述、专业技能、工作经历、项目经历、教育背景六个可展开编辑区域。右侧 A4 纸实时预览，编辑器修改即时同步到预览。

### HCT 动态主题
通过 `@material/material-color-utilities` 的 `SchemeTonalSpot` 算法，从用户选择的 seed color 动态生成完整的 M3 色板（30+ 颜色角色）。提供 5 种预设主题色：

| 名称 | Hex | 说明 |
|------|-----|------|
| 紫罗兰 | `#6750A4` | M3 默认基线色 |
| 深海蓝 | `#2563EB` | 冷色调 |
| 青松绿 | `#0D9488` | 青绿色调 |
| 翡翠绿 | `#2D8659` | 自然绿色调 |
| 琥珀橙 | `#C2610C` | 暖色调 |

### 明暗模式
Light / Dark 双主题，通过 `SchemeTonalSpot` 的 `isDark` 参数生成对应的暗色色板，全量 CSS 变量实时过渡。

### 技能视图切换
专业技能段落支持「列表视图」和「卡片视图」两种展示形式，可在预览中一键切换。

### PDF 导出
通过 Nuxt Server Route (`POST /api/export-pdf`) 调用 Puppeteer，捕获当前预览的 DOM 和计算后的 CSS 变量，在 Headless Chrome 中渲染精确 A4 页面并返回 PDF 文件。浏览器打印 (`window.print()`) 作为 fallback。

### JSON 导入/导出
编辑器底部提供 JSON Resume 兼容格式的数据导入和导出按钮，支持本地文件读写。

## 运维文档

### 环境要求

- **Node.js**: >= 18.x（推荐 20.x LTS）
- **npm**: >= 9.x
- **系统依赖**: Puppeteer 需要 Chromium 运行环境。Linux 服务器可能需要安装额外依赖：
  ```bash
  # Debian/Ubuntu
  sudo apt-get install -y chromium-browser
  # 或使用 Puppeteer 内置下载（默认行为）
  ```

### 开发

```bash
npm run dev
```

开发服务器启动后访问 `http://localhost:3000`，支持 HMR 热更新。Nuxt DevTools 可通过 `Shift + Option + D` 打开。

### 构建与部署

```bash
# 生产构建（输出到 .output/ 目录）
npm run build

# 启动生产服务器
node .output/server/index.mjs
```

Nitro preset 为 `node-server`，构建产物为独立 Node.js 服务。部署方式：

- **直接部署**: 将 `.output/` 目录上传至服务器，运行 `node .output/server/index.mjs`
- **Docker**: 基于 `node:20-alpine` 镜像，注意安装 Puppeteer 所需的 Chromium 依赖
- **Serverless**: 需调整为对应平台的 Nitro preset（如 `vercel`、`cloudflare-pages`）

### 环境变量

当前版本无外部环境变量依赖。如需配置 Puppeteer 的 Chromium 路径，可通过环境变量：

```bash
PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

### 端口配置

```bash
# 开发服务器
npm run dev -- --port 3200

# 生产服务器
PORT=8080 node .output/server/index.mjs
```

### 已知限制

- Puppeteer PDF 导出在生产环境需要服务器安装 Chromium 运行依赖
- 简历数据当前存储在内存中（`useResume` composable），刷新页面后重置为示例数据。后续可接入 LocalStorage 或后端持久化
- 技能数据在编辑器中为只读展示，完整编辑需修改 `data/resume.ts` 源文件

### 故障排查

| 问题 | 可能原因 | 解决方案 |
|------|---------|---------|
| PDF 导出失败 | Chromium 缺少系统依赖 | 安装 libX11、libXcomposite 等，或设置 `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` 并指定本地 Chromium |
| 页面空白 | SSR 水合失败 | 检查浏览器控制台错误，确认 `composables/` 中的 `import.meta.client` 守卫 |
| 主题色不生效 | CSS 变量未注入 | 确认 `useTheme()` 在组件中至少调用一次触发初始化 |
| TypeScript 报错 | tsconfig 路径错误 | 运行 `npx nuxt prepare` 重新生成 `.nuxt/tsconfig.json` |

## 设计系统

项目的视觉规范记录在 [DESIGN.md](./DESIGN.md) 中，遵循 Google Stitch 标准，包含完整的 YAML frontmatter（colors、typography、rounded、spacing、components）和 10 个 markdown 章节。可通过 linter 验证：

```bash
npx @google/design.md lint DESIGN.md
```

## 相关文档

- [DESIGN.md](./DESIGN.md) — M3 设计系统规范（Google Stitch 标准）
- [RESEARCH.md](./RESEARCH.md) — 技术调研报告（M3 分析、PDF 方案对比、竞品分析）
- [prototype.html](./prototype.html) — 单文件 HTML 原型（参考实现，HSL 近似色彩）

## License

MIT
