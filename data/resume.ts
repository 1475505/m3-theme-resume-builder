/**
 * Resume data — component-based section format
 * Sample: 陈明远 (Chen Mingyuan)
 */

export interface Contact {
  icon: string
  text: string
  href?: string
}

export interface Skill {
  name: string
  proficiency: 'expert' | 'proficient' | 'familiar'
  years: number
  description: string
}

export interface SkillGroup {
  category: string
  icon: string
  description: string
  skills: Skill[]
}

export interface Job {
  company: string
  department: string
  role: string
  introduction: string
  startDate: string
  endDate: string
  highlights: string[]
}

export interface Project {
  name: string
  stars: string
  role: string
  introduction: string
  link: string
  description: string
  stack: string[]
}

export interface Education {
  school: string
  major: string
  degree: string
  startDate: string
  endDate: string
  detail: string
}

export type SectionType = 'summary' | 'skills' | 'experience' | 'projects' | 'education' | 'custom'

export interface ResumeSectionBase {
  id: string
  type: SectionType
  title: string
  hiddenFields?: string[]
}

/**
 * Per-section-type field definitions that can be toggled visible/hidden.
 * Each entry: { key (data field name), label (Chinese display label) }
 */
export const sectionToggleableFields: Record<SectionType, { key: string; label: string }[]> = {
  summary: [],
  skills: [
    { key: 'proficiency', label: '熟练度' },
    { key: 'years', label: '年限' },
    { key: 'description', label: '描述' },
  ],
  experience: [
    { key: 'introduction', label: '介绍' },
    { key: 'role', label: '职位' },
    { key: 'date', label: '时间' },
    { key: 'highlights', label: '亮点' },
  ],
  projects: [
    { key: 'introduction', label: '介绍' },
    { key: 'stars', label: 'Stars' },
    { key: 'role', label: '角色' },
    { key: 'link', label: '链接' },
    { key: 'description', label: '描述' },
    { key: 'stack', label: '技术栈' },
  ],
  education: [
    { key: 'date', label: '时间' },
    { key: 'detail', label: '详情' },
  ],
  custom: [],
}

export interface SummarySection extends ResumeSectionBase {
  type: 'summary'
  text: string
}

export interface SkillsSection extends ResumeSectionBase {
  type: 'skills'
  view: 'list' | 'cards'
  cardColumns?: number
  groups: SkillGroup[]
}

export interface ExperienceSection extends ResumeSectionBase {
  type: 'experience'
  items: Job[]
}

export interface ProjectsSection extends ResumeSectionBase {
  type: 'projects'
  items: Project[]
}

export interface EducationSection extends ResumeSectionBase {
  type: 'education'
  items: Education[]
}

export interface CustomSection extends ResumeSectionBase {
  type: 'custom'
  text: string
}

export type ResumeSection =
  | SummarySection
  | SkillsSection
  | ExperienceSection
  | ProjectsSection
  | EducationSection
  | CustomSection

export interface ResumeData {
  basics: {
    name: string
    title: string
    contacts: Contact[]
  }
  sections: ResumeSection[]
}

const sectionIds = {
  summary: () => `summary-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  skills: () => `skills-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  experience: () => `experience-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  projects: () => `projects-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  education: () => `education-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  custom: () => `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
}

export function createSummarySection(title = '专业概述', text = ''): SummarySection {
  return { id: sectionIds.summary(), type: 'summary', title, text }
}

export function createSkillsSection(title = '专业技能', groups: SkillGroup[] = [], view: 'list' | 'cards' = 'list', cardColumns = 2): SkillsSection {
  return { id: sectionIds.skills(), type: 'skills', title, view, cardColumns, groups }
}

export function createExperienceSection(title = '工作经历', items: Job[] = []): ExperienceSection {
  return { id: sectionIds.experience(), type: 'experience', title, items }
}

export function createProjectsSection(title = '项目经历', items: Project[] = []): ProjectsSection {
  return { id: sectionIds.projects(), type: 'projects', title, items }
}

export function createEducationSection(title = '教育背景', items: Education[] = []): EducationSection {
  return { id: sectionIds.education(), type: 'education', title, items }
}

export function createCustomSection(title = '自定义', text = ''): CustomSection {
  return { id: sectionIds.custom(), type: 'custom', title, text }
}

export function createEmptyJob(): Job {
  return {
    company: '',
    department: '',
    role: '',
    introduction: '',
    startDate: '',
    endDate: '',
    highlights: [''],
  }
}

export function createEmptyProject(): Project {
  return {
    name: '',
    stars: '',
    role: '',
    introduction: '',
    link: '',
    description: '',
    stack: [],
  }
}

export function createEmptyEducation(): Education {
  return {
    school: '',
    major: '',
    degree: '',
    startDate: '',
    endDate: '',
    detail: '',
  }
}

export function createEmptySkillGroup(): SkillGroup {
  return {
    category: '新分类',
    icon: 'star',
    description: '',
    skills: [],
  }
}

export function createEmptySkill(): Skill {
  return {
    name: '新技能',
    proficiency: 'familiar',
    years: 0,
    description: '',
  }
}

/** Check if a job has no meaningful content */
export function isJobEmpty(job: Job): boolean {
  return (
    !job.company?.trim() &&
    !job.role?.trim() &&
    !job.introduction?.trim() &&
    !job.startDate?.trim() &&
    !job.endDate?.trim() &&
    (!job.highlights || job.highlights.every(h => !h.trim())) &&
    (!job.stack || job.stack.length === 0)
  )
}

/** Check if a project has no meaningful content */
export function isProjectEmpty(project: Project): boolean {
  return (
    !project.name?.trim() &&
    !project.role?.trim() &&
    !project.introduction?.trim() &&
    !project.link?.trim() &&
    !project.description?.trim() &&
    !project.stars?.trim() &&
    (!project.highlights || project.highlights.every(h => !h.trim())) &&
    (!project.stack || project.stack.length === 0)
  )
}

/** Check if an education entry has no meaningful content */
export function isEducationEmpty(edu: Education): boolean {
  return (
    !edu.school?.trim() &&
    !edu.major?.trim() &&
    !edu.degree?.trim() &&
    !edu.detail?.trim() &&
    !edu.startDate?.trim() &&
    !edu.endDate?.trim()
  )
}

/** Check if a skill has no meaningful content */
export function isSkillEmpty(skill: Skill): boolean {
  return !skill.name?.trim() && !skill.description?.trim()
}

/** Check if a skill group has no meaningful content */
export function isSkillGroupEmpty(group: SkillGroup): boolean {
  return (
    !group.category?.trim() &&
    !group.description?.trim() &&
    (!group.skills || group.skills.every(s => isSkillEmpty(s)))
  )
}

/** Check if a section has no meaningful content (title + body both empty) */
export function isSectionEmpty(section: ResumeSection): boolean {
  const titleEmpty = !section.title?.trim()
  switch (section.type) {
    case 'summary':
      return titleEmpty && !section.text?.trim()
    case 'skills':
      return titleEmpty && (!section.groups || section.groups.every(g => isSkillGroupEmpty(g)))
    case 'experience':
      return titleEmpty && (!section.items || section.items.every(j => isJobEmpty(j)))
    case 'projects':
      return titleEmpty && (!section.items || section.items.every(p => isProjectEmpty(p)))
    case 'education':
      return titleEmpty && (!section.items || section.items.every(e => isEducationEmpty(e)))
    case 'custom':
      return titleEmpty && !section.text?.trim()
    default:
      return titleEmpty
  }
}

export const resumeData: ResumeData = {
  basics: {
    name: '陈明远',
    title: '高级后端工程师 · 5 年',
    contacts: [
      { icon: 'phone', text: '181-8888-6666' },
      { icon: 'mail', text: 'mingyuan.chen@gmail.com' },
      { icon: 'location_on', text: '北京' },
      { icon: 'github', text: 'github.com/chenmydev', href: '#' },
      { icon: 'article', text: 'mingyuan.dev', href: '#' },
    ],
  },

  sections: [
    createSummarySection('专业概述', '5 年后端开发经验，专注于高并发分布式系统设计与实现。曾主导日均千万级请求的核心系统架构优化，具备从 0 到 1 搭建中间件平台的完整经验。活跃开源贡献者，个人项目累计获得 3,500+ GitHub Stars。擅长使用 Go 和 Java 构建云原生微服务，对系统性能调优和可观测性有深入实践。'),
    createSkillsSection('专业技能', [
      {
        category: '编程语言',
        icon: 'terminal',
        description: '主力语言 Go 与 Java，擅长高并发后端开发与系统架构设计',
        skills: [
          { name: 'Go', proficiency: 'expert', years: 4, description: '自研高性能 RPC 框架与分布式调度平台，单节点吞吐 50 万 QPS' },
          { name: 'Java', proficiency: 'expert', years: 5, description: 'Spring Boot / Dubbo 体系，主导阿里云中间件治理平台开发' },
          { name: 'Python', proficiency: 'proficient', years: 3, description: '运维自动化脚本、数据分析与压测工具开发' },
          { name: 'TypeScript', proficiency: 'familiar', years: 1, description: '内部工具前端与配置中心 Web 管理界面开发' },
        ],
      },
      {
        category: '数据库 & 中间件',
        icon: 'database',
        description: '关系型与 NoSQL 均有深入实践，擅长性能调优与架构设计',
        skills: [
          { name: 'MySQL', proficiency: 'expert', years: 5, description: '千万级分库分表方案设计，慢查询优化与索引治理经验丰富' },
          { name: 'Redis', proficiency: 'expert', years: 4, description: '多级缓存架构设计与分布式锁方案，P99 延迟优化 8 倍' },
          { name: 'Kafka', proficiency: 'proficient', years: 3, description: '异步解耦与数据管道建设，支撑日均数十万条消息吞吐' },
        ],
      },
      {
        category: '微服务 & 基础设施',
        icon: 'cloud',
        description: '完整云原生实践经验，从服务治理到可观测性体系搭建',
        skills: [
          { name: 'Dubbo + Nacos', proficiency: 'proficient', years: 2, description: '微服务治理平台核心开发，服务注册发现与配置动态管理' },
          { name: 'Kubernetes', proficiency: 'proficient', years: 2, description: '容器编排与 Helm Chart 部署，管理生产集群 50+ 服务' },
          { name: 'Prometheus + Grafana', proficiency: 'proficient', years: 3, description: '可观测性体系搭建，自定义仪表盘与告警规则设计' },
          { name: 'ELK Stack', proficiency: 'familiar', years: 2, description: '日志采集与链路追踪，线上问题快速定位与根因分析' },
        ],
      },
    ]),
    createExperienceSection('工作经历', [
      {
        company: '字节跳动 · 基础架构部',
        department: '',
        role: '高级后端工程师',
        introduction: '负责推荐系统核心链路的架构设计与性能优化，主导分布式任务调度平台从 0 到 1 的建设。',
        startDate: '2022.03',
        endDate: '至今',
        highlights: [
          '主导推荐系统核心链路性能优化，引入多级缓存架构与连接池治理，P99 延迟从 1200ms 降至 150ms，QPS 提升 3 倍',
          '设计并落地分布式任务调度平台，基于 Go + etcd 实现，日均处理 2000 万+ 任务，SLA 99.99%',
          '推动 Go 微服务最佳实践在团队落地，统一错误码与链路追踪规范，线上故障率降低 60%',
        ],
      },
      {
        company: '阿里云 · 中间件团队',
        department: '',
        role: '后端工程师',
        introduction: '参与企业级微服务治理平台研发，负责分布式限流组件与核心服务启动流程优化。',
        startDate: '2020.07',
        endDate: '2022.02',
        highlights: [
          '参与企业级微服务治理平台开发，基于 Dubbo + Nacos 实现服务注册发现与配置动态管理',
          '独立完成分布式限流组件研发，采用滑动窗口 + Redis 预扣减方案，支撑全公司 API 网关日均 5 亿次调用',
          '优化核心服务启动流程，通过懒加载与并行初始化将冷启动时间从 180s 缩短至 45s',
        ],
      },
    ]),
    createProjectsSection('项目经历', [
      {
        name: 'go-fast-rpc',
        stars: '2.3k',
        role: '核心维护者',
        introduction: '高性能 RPC 框架，支持服务发现、负载均衡和熔断降级。',
        link: 'github.com/chenmydev/go-fast-rpc',
        description:
          '高性能 RPC 框架，支持服务发现、负载均衡和熔断降级。采用自研序列化协议，较 gRPC 在特定场景下吞吐量提升 40%，已在多家企业生产环境落地。单节点吞吐量达 50 万 QPS。',
        stack: ['Go', 'Protobuf', 'etcd', 'Netpoll'],
      },
      {
        name: 'distributed-conf',
        stars: '1.2k',
        role: '作者',
        introduction: '分布式配置中心，基于 Raft 共识算法实现配置强一致性。',
        link: 'github.com/chenmydev/distributed-conf',
        description:
          '分布式配置中心，基于 Raft 共识算法实现配置强一致性。支持配置版本管理与灰度发布，内置 Web 管理界面与完整的权限控制体系，已获 Apache 2.0 开源许可。',
        stack: ['Java', 'Raft', 'RocksDB', 'Vue.js'],
      },
    ]),
    createEducationSection('教育背景', [
      {
        school: '北京大学 · 计算机科学与技术 · 硕士',
        major: '计算机科学与技术',
        degree: '硕士',
        startDate: '2018.09',
        endDate: '2020.06',
        detail: '研究方向：分布式系统 ｜ 发表 SCI 论文 2 篇 ｜ GPA 3.8/4.0',
      },
    ]),
  ],
}
