# M3 风格简历构建器 - 调研报告

## 一、项目定位

构建一个参考 Google Material Design 3 (M3) 设计风格的程序员简历生成工具，面向中国互联网行业的求职场景。核心理念是 **数据与展示分离** + **M3 设计系统驱动的主题化** + **高质量 PDF 输出**。

---

## 二、Material Design 3 设计体系

### 2.1 设计哲学演进

M3（Material You）是 Google 设计系统的第三代，核心转变是从「标准化」走向「个性化」。

M1（2014）引入纸墨隐喻和海拔概念；M2（2018）加入主题定制和品牌表达；M3（2021+）通过 Dynamic Color、色调海拔、更丰富的表面层级来实现情感化的用户体验。

M3 的五个核心原则：Personal（个性化色彩）、Adaptive（自适应布局）、Expressive（表达性设计）、Accessible by Default（默认可访问）、Inclusive（包容性）。

### 2.2 色彩系统（简历工具的核心）

M3 色彩系统基于 HCT 色彩空间，由 5 组关键色（Primary、Secondary、Tertiary、Neutral、Neutral Variant）各生成一组从 tone 0（纯黑）到 tone 100（纯白）的色调面板。

**色彩角色到色调的映射关系（Light/Dark）：**

| 色彩角色 | Light 主题 | Dark 主题 | 简历中的应用场景 |
|---------|-----------|----------|----------------|
| primary | tone 40 | tone 80 | 姓名、章节标题、链接 |
| onPrimary | white | tone 20 | primary 色上的文字 |
| primaryContainer | tone 90 | tone 30 | 技能标签背景、高亮区域 |
| onPrimaryContainer | tone 10 | tone 90 | 标签上的文字 |
| secondary | tone 40 | tone 80 | 次要信息（日期、地点） |
| secondaryContainer | tone 90 | tone 30 | 项目卡片背景 |
| surface | neutral 98 | neutral 6 | 简历主背景 |
| onSurface | neutral 10 | neutral 90 | 正文文字 |
| surfaceVariant | neutral_variant 90 | neutral_variant 30 | 分隔区域背景 |
| onSurfaceVariant | neutral_variant 30 | neutral_variant 80 | 次要正文、描述文字 |
| surfaceContainer | neutral 94 | neutral 12 | 卡片/区块容器背景 |
| surfaceContainerHigh | neutral 92 | neutral 17 | 高强调容器 |
| outline | neutral_variant 50 | neutral_variant 60 | 边框、分割线 |
| outlineVariant | neutral_variant 80 | neutral_variant 30 | 次要边框 |

**Baseline 紫色主题示例值：**

```
Light:  primary=#6750A4  surface=#FFFBFE  onSurface=#1C1B1F
Dark:   primary=#D0BCFF  surface=#1C1B1F  onSurface=#E6E1E5
```

**简历工具的色彩策略：** 用户选择一个 Seed Color（种子色），通过 M3 算法自动生成完整配色方案。推荐为程序员简历预设几个专业的种子色：深蓝(#2563EB)、深青(#0d9488)、暗紫(#6750A4)、墨灰(#374151)。

### 2.3 字体排版

M3 定义了 5 类 x 3 尺寸 = 15 种文字样式，简历工具中需要用到的映射：

| M3 样式 | 字号 | 字重 | 字间距 | 简历中的用途 |
|--------|------|------|--------|------------|
| displaySmall | 36px | 400 | 0 | 姓名（大号展示） |
| headlineSmall | 24px | 400 | 0 | 一级标题（「工作经历」等） |
| titleLarge | 22px | 600 | 0 | 公司名/项目名 |
| titleMedium | 16px | 500 | 0.15px | 职位/角色 |
| titleSmall | 14px | 500 | 0.1px | 时间段、地点 |
| bodyLarge | 16px | 400 | 0.5px | 正文（偏大，适合阅读） |
| bodyMedium | 14px | 400 | 0.25px | 正文（简历主体） |
| bodySmall | 12px | 400 | 0.4px | 脚注、补充信息 |
| labelLarge | 14px | 500 | 0.1px | 技能标签文字 |
| labelMedium | 12px | 500 | 0.5px | 小标签、状态标记 |
| labelSmall | 11px | 500 | 0.5px | 极小标注 |

**中英文字体推荐：**
- 英文：Roboto（M3 默认）、Inter（现代科技感）
- 中文：思源黑体 / Noto Sans CJK（现代清晰）、苹方 PingFang SC（macOS 原生）

### 2.4 形状系统

| 形状 Token | 圆角值 | 简历中的用途 |
|-----------|--------|------------|
| none | 0px | 全宽分割线 |
| extraSmall | 4px | 小标签、tooltip |
| small | 8px | 技能标签 Chip |
| medium | 12px | 项目卡片、区块容器 |
| large | 16px | 大卡片、侧栏面板 |
| extraLarge | 28px | 头部区域卡片 |
| full | 圆形 | 头像、图标按钮 |

### 2.5 海拔系统与表面层级

M3 的海拔创新在于「色调海拔」——用 primary 色的半透明叠加代替传统阴影：

| Level | 海拔值 | 简历用途 |
|-------|-------|--------|
| 0 | 0dp | 基础表面（简历底色） |
| 1 | 1dp | 微浮起元素（卡片） |
| 2 | 3dp | 项目卡片、技能区域 |
| 3 | 6dp | 头部信息区 |

表面层级从浅到深（Light 主题）：surfaceContainerLowest → surface → surfaceContainerLow → surfaceContainer → surfaceContainerHigh → surfaceContainerHighest

### 2.6 间距系统

基于 4dp 网格，简历排版常用间距：

| Token | 值 | 用途 |
|-------|---|------|
| space4 | 4px | 图标与文字间距 |
| space8 | 8px | 紧凑内边距、列表项间距 |
| space12 | 12px | 卡片内边距（紧凑） |
| space16 | 16px | 标准页面边距、卡片边距 |
| space24 | 24px | 章节间距 |
| space32 | 32px | 大章节分隔 |

### 2.7 组件参考

**卡片（简历区块）：**
- Elevated Card：surfaceContainerLow 底色 + 1dp 海拔 + 12dp 圆角 → 适合「工作经历」等主要区块
- Outlined Card：surface 底色 + 1dp outline 边框 + 12dp 圆角 → 适合「项目经历」等次要区块
- Filled Card：surfaceContainerHighest 底色 → 适合「技能矩阵」等强调区块

**Chips（技能标签）：**
- Assist Chip：32dp 高 + 8dp 圆角 + labelLarge 字体 → 适合技术栈标签
- Filter Chip：选中态用 secondaryContainer → 适合技能分类筛选

**Divider：** 1dp + outlineVariant 色 → 章节间分割线

---

## 三、前端技术方案

### 3.1 M3 Design Token 转 CSS

M3 Token 体系分三层：Reference Tokens（原始色调面板）、System Tokens（语义角色如 `--md-sys-color-primary`）、Component Tokens（组件级覆盖）。

**CSS Custom Properties 命名规范：**

```css
:root {
  /* System Color Tokens */
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-on-primary-container: #21005D;
  --md-sys-color-secondary: #625B71;
  --md-sys-color-surface: #FFFBFE;
  --md-sys-color-on-surface: #1C1B1F;
  --md-sys-color-surface-container: #F2EFF3;
  --md-sys-color-outline: #79747E;
  --md-sys-color-outline-variant: #CAC4D0;
  /* ... 更多角色 ... */

  /* Typography Tokens */
  --md-sys-typescale-body-medium-size: 14px;
  --md-sys-typescale-body-medium-weight: 400;
  --md-sys-typescale-body-medium-line-height: 20px;
  --md-sys-typescale-body-medium-tracking: 0.25px;

  /* Shape Tokens */
  --md-sys-shape-medium: 12px;
  --md-sys-shape-small: 8px;

  /* Elevation */
  --md-sys-elevation-1: 1dp;
  --md-sys-elevation-2: 3dp;
}
```

### 3.2 主题生成方案

**Material Theme Builder** 是官方工具，输入一个种子色即可生成完整 M3 配色。

- 在线工具：https://material-foundation.github.io/material-theme-builder/
- npm 编程方案：`@material/material-color-utilities`（HCT 算法包）
- 导出格式：CSS（`--md-sys-color-*` 变量）、JSON、Figma Tokens

**编程式主题生成示例：**

```typescript
import { argbFromHex, themeFromSourceColor, applyTheme } from '@material/material-color-utilities';

const theme = themeFromSourceColor(argbFromHex('#2563EB'));
// theme.schemes.light.primary → 自动计算的 primary 色
// theme.schemes.dark.primary → dark 模式 primary
```

### 3.3 推荐技术栈

| 层级 | 技术选型 | 理由 |
|------|---------|------|
| 框架 | **Next.js + TypeScript** | SSR + API Routes（可托管 Puppeteer）+ 完整 React 生态 |
| 样式 | **Plain CSS + M3 Custom Properties** | 打印保真度最高、零运行时开销、@media print 完美支持 |
| M3 组件 | **Material Web (@material/web)** 或自建 | 官方 Web Components，但已进入维护模式；简历渲染建议自建轻量组件 |
| 主题生成 | **@material/material-color-utilities** | 用户选色后程序化生成完整方案 |
| 编辑器 UI | **React + M3 CSS Variables** | 表单编辑器使用 M3 组件 |
| PDF 导出 | **Puppeteer（API Route）** | 像素级精确渲染、完整 CSS 支持包括 @page |
| 数据格式 | **JSON Resume 标准** | 标准化数据、社区生态、导入导出兼容 |
| 字体 | **Roboto + Noto Sans CJK** | M3 默认英文 + 最佳中文渲染 |

### 3.4 PDF 导出方案对比

| 方案 | 质量 | 可部署性 | 适合场景 |
|------|------|---------|---------|
| Puppeteer (server-side) | 最高 | 需服务端 | 正式产品 |
| react-pdf | 中上 | 纯客户端 | SPA 应用 |
| jsPDF + html2canvas | 中 | 纯客户端 | 快速原型 |
| CSS @media print | 依赖浏览器 | 零依赖 | 最低成本 |

**关键 CSS 技术：**

```css
@page {
  size: 210mm 297mm;  /* A4 */
  margin: 0;
}

@media print {
  .no-print { display: none; }
  .resume-section { break-inside: avoid; }
  * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
}
```

### 3.5 竞品参考

| 工具 | 亮点 | 可借鉴 |
|------|------|--------|
| Reactive Resume (30k+ stars) | 最全面的开源方案，React + NestJS | 多模板架构、实时预览 UX |
| OpenResume (7.4k+ stars) | 最简洁，Next.js + ATS 优先 | ATS 兼容性设计、轻量部署 |
| RenderCV | YAML → LaTeX/Typst，版本控制友好 | 数据驱动、CI/CD 集成 |
| JSON Resume | 标准化 schema，社区生态 | 数据格式标准、主题市场 |

---

## 四、程序员简历结构（中国互联网）

### 4.1 标准章节顺序

1. **个人信息** — 姓名、电话、邮箱、GitHub、博客、所在城市
2. **专业技能** — 按领域分类 + 熟练度标注（精通/熟练/熟悉/了解）
3. **工作经历** — 倒序，公司 + 职位 + 时间 + 量化成果
4. **项目经历** — STAR 方法描述，突出技术挑战和量化结果
5. **教育背景** — 学校 + 专业 + 学位 + 毕业年份
6. **开源/博客**（可选）— GitHub 项目、技术文章

### 4.2 中国科技行业特殊性

**个人信息：** 照片常见但不强制（外企除外）；年龄/出生年常见；避免 QQ 邮箱；城市级别即可。

**技能分类体系：**
```
编程语言:   Java (熟练), Python (熟悉), Go (了解)
后端框架:   Spring Boot, Spring Cloud, Gin
前端技术:   React, Vue.js, TypeScript
数据库:    MySQL, Redis, MongoDB, TiDB
消息队列:   Kafka, RocketMQ
微服务:    Dubbo, gRPC, Nacos
容器化:    Docker, Kubernetes, Helm
监控运维:   Prometheus, Grafana, ELK
```

**熟练度系统：** 精通（深度理解，可从零设计）→ 熟练（日常使用，能解决复杂问题）→ 熟悉（项目中使用过，理解原理）→ 了解（知道概念，有限实操）。注意：声称「精通」会面临最严格的面试追问。

**BAT 侧重点：** 系统规模、分布式架构、高并发高可用经验。
**字节跳动侧重：** 算法基础、Go 语言、海量 DAU 经验。
**创业公司侧重：** 全栈能力、自驱力、开源贡献。

### 4.3 简历设计趋势

对程序员来说，**极简设计远优于花哨设计**。单栏布局、ATS 友好、黑白 + 一个强调色、清晰排版、6-10 秒快速扫描。

---

## 五、产品架构建议

### 5.1 数据层

采用 JSON Resume 标准或扩展的自定义 schema，支持：
- JSON/YAML 数据文件（Git 版本控制友好）
- 导入：从 JSON Resume / LinkedIn / 现有简历 PDF 解析
- 导出：JSON 数据文件、PDF、HTML

### 5.2 展示层

M3 主题驱动的模板系统：
- 用户选择 Seed Color → 自动生成完整 M3 配色
- 预设专业种子色（深蓝、深青、暗紫、墨灰）
- 支持 Light / Dark 模式
- 模板可切换，数据不丢失
- 所有模板 ATS 兼容

### 5.3 交互流程

```
编辑面板（左）              实时预览（右）
┌──────────────────┐    ┌──────────────────┐
│  [个人信息表单]    │    │  ┌──────────────┐ │
│  [技能管理]       │ →  │  │  M3 简历预览  │ │
│  [工作经历]       │    │  │  (实时更新)   │ │
│  [项目经历]       │    │  │              │ │
│  [教育背景]       │    │  └──────────────┘ │
│  [主题/颜色选择]   │    │                  │
│  [模板切换]       │    │  [导出 PDF]       │
└──────────────────┘    └──────────────────┘
```

### 5.4 M3 简历模板设计思路

**模板 A — Elevated（海拔卡片式）：**
- surface 背景 + Elevated Card 承载各章节
- primary 色用于姓名和章节标题
- 技能区域用 Chip 组件展示
- 分割线用 outlineVariant 色

**模板 B — Outlined（边框简约式）：**
- surface 背景 + Outlined Card 区分区块
- 更紧凑的排版，适合一页简历
- primary 色仅用于链接和重点标记

**模板 C — Filled（填充强调式）：**
- surfaceContainerLow 背景 + Filled Card 做区块
- 头部区域用 primaryContainer 背景突出
- 适合需要视觉冲击的场景

---

## 六、关键结论

1. **M3 作为简历设计系统是完全可行的**——其色彩角色、字体排版、形状和间距系统天然适合结构化的文档排版
2. **技术栈推荐 Next.js + TypeScript + Plain CSS + M3 CSS Variables + Puppeteer**
3. **数据与展示分离是核心架构**——JSON 数据源 + 可换模板 + PDF 输出
4. **种子色驱动主题** 是差异化亮点——用户选一个颜色，M3 算法自动配齐全部色彩
5. **面向中国市场的本地化**——中文字体、个人信息字段、技能分类体系、照片支持

---

## 参考来源

- [Material Design 3 官方文档](https://m3.material.io/)
- [Material Theme Builder](https://material-foundation.github.io/material-theme-builder/)
- [Material Color Utilities (npm)](https://www.npmjs.com/package/@material/material-color-utilities)
- [JSON Resume Standard](https://jsonresume.org/schema)
- [Reactive Resume](https://rxresu.me/)
- [OpenResume](https://github.com/xitanggg/open-resume)
- [RenderCV](https://github.com/rendercv/rendercv)
- [Tech Interview Handbook - Resume Guide](https://www.techinterviewhandbook.org/resume/)
