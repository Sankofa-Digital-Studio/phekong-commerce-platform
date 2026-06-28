import type { ShellLocale } from "../shell/translations";

export const trainingLandingCopy = {
  en: {
    foundation: "Public commerce foundation",
    heroTitle: "A calm shell built for trust, clarity and growth.",
    heroBody:
      "The shell is the reusable frame around every public M1 page. It handles identity, navigation, accessibility, responsive behaviour and global states, while each page owns only its unique content.",
    exploreShell: "Explore the shell",
    previewError: "Preview global error",
    futureNote:
      "Future booking and transaction actions remain visual prompts only until their approved milestone.",
    heroVisualAria: "Abstract premium wellness visual placeholder",
    publicReady: "Public experience ready",
    publicReadySub: "Responsive shell · accessible navigation · reusable states",
    shellOwns: "What the shell owns",
    shellOwnsBody:
      "Anything repeated across routes belongs here. Route-specific products, stories and forms remain outside the shell.",
    anatomy: [
      ["01 · IDENTITY", "Brand and orientation", "Logo, project identity, active route, page title context and stable visual language."],
      ["02 · NAVIGATION", "Desktop and mobile movement", "Keyboard-safe navigation, mobile drawer, active states, skip link and predictable focus order."],
      ["03 · SYSTEM STATES", "Loading and failure handling", "Global loading, route errors, unavailable content and recovery actions with no leaked technical detail."],
      ["04 · TRUST FOOTER", "Contact and compliance", "Contact channels, policy links, location context, ownership and a stable end to every public route."],
    ],
    stateLab: "Shell state laboratory",
    stateLabBody:
      "These are shell-owned states. Teams should not redesign them separately on every page.",
    stateControlsAria: "Preview shell states",
    states: {
      ready: ["Ready", "Ready state", "The route content renders inside the shared shell."],
      loading: ["Loading", "Loading content", "Please wait while this section becomes available."],
      empty: ["Empty", "Nothing to show yet", "The page remains composed and offers a clear next action."],
      error: ["Error", "We could not load this page", "No technical details are exposed. The user receives a safe recovery path."],
    },
    returnHome: "Return home",
    tryAgain: "Try again",
    reviewAria: "Shell review notes",
    reviewChecklist: "Review checklist",
    reviewItems: [
      "Mobile and desktop navigation use one information architecture.",
      "The shell contains no checkout, authentication or booking logic in M1.",
      "Loading, empty and error states are reusable.",
      "Penpot approves the visual rules; Storybook proves component behaviour.",
    ],
  },
  zh: {
    foundation: "公共商业基础",
    heroTitle: "一个为信任、清晰与成长而构建的沉稳外壳。",
    heroBody:
      "该外壳是所有 M1 公共页面的可复用框架。它负责品牌识别、导航、无障碍、响应式行为和全局状态，而每个页面只负责自身独有的内容。",
    exploreShell: "查看应用外壳",
    previewError: "预览全局错误",
    futureNote: "预约和交易操作在获得相应里程碑批准前，仅作为视觉提示展示。",
    heroVisualAria: "高端健康主题抽象视觉占位图",
    publicReady: "公共体验已准备就绪",
    publicReadySub: "响应式外壳 · 无障碍导航 · 可复用状态",
    shellOwns: "外壳负责什么",
    shellOwnsBody:
      "所有跨路由重复出现的内容都属于外壳。特定页面的产品、故事和表单应保留在外壳之外。",
    anatomy: [
      ["01 · 品牌识别", "品牌与方向感", "标志、项目身份、当前路由、页面标题语境和稳定的视觉语言。"],
      ["02 · 导航", "桌面端与移动端流转", "支持键盘的导航、移动抽屉、激活状态、跳转链接和可预测的焦点顺序。"],
      ["03 · 系统状态", "加载与失败处理", "全局加载、路由错误、内容不可用和恢复操作，不暴露技术细节。"],
      ["04 · 信任页脚", "联系与合规", "联系渠道、政策链接、位置语境、所有权信息，以及每条公共路由稳定的结束区域。"],
    ],
    stateLab: "外壳状态实验室",
    stateLabBody: "这些状态由外壳统一管理。团队不应在每个页面中重复设计。",
    stateControlsAria: "预览外壳状态",
    states: {
      ready: ["就绪", "就绪状态", "路由内容在共享外壳中正常呈现。"],
      loading: ["加载中", "正在加载内容", "请稍候，此部分内容正在准备中。"],
      empty: ["空状态", "暂无内容", "页面保持完整结构，并提供清晰的下一步操作。"],
      error: ["错误", "无法加载此页面", "不会暴露技术细节，用户会获得安全的恢复路径。"],
    },
    returnHome: "返回首页",
    tryAgain: "重试",
    reviewAria: "外壳审查说明",
    reviewChecklist: "审查清单",
    reviewItems: [
      "移动端和桌面端导航采用同一套信息架构。",
      "M1 外壳不包含结账、身份验证或预约逻辑。",
      "加载、空状态和错误状态均可复用。",
      "Penpot 批准视觉规则，Storybook 验证组件行为。",
    ],
  },
} as const satisfies Record<ShellLocale, object>;

export type TrainingLandingCopy = (typeof trainingLandingCopy)[ShellLocale];
export type TrainingShellState = "ready" | "loading" | "empty" | "error";
