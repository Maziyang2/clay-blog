# Maziyang2 的博客：结构与维护说明

这是 Maziyang2 博客的 Sites 项目维护文档，供本人以及后续接手的 AI、GPT、Codex 或其他自动化工具阅读。

根目录的 `README.md` 和 `AGENTS.md` 不会被直接打包进网站。网站有一份经过隐私检查的公开结构说明 `/readme/`，以及供工具读取的 `/.well-known/site-readme.json`。它们不出现在首页、导航或页脚，只通过固定地址和页面头部的 `rel="help"` 被发现。

博客对外公开，但修改权限仍只属于 Maziyang2 及其明确授权的 Sites 协作者。OpenAI Sites 项目源码是维护和发布基准，GitHub 不是必要依赖。公开说明不授予写入权限，所有文档和网页都不能记录密码、Token、API Key、私人邮箱、电话号码、精确住址、内部服务地址或其他隐私信息。

## 当前站点概览

- 框架：Astro 7，静态内容站点。
- 内容：Markdown 文章与随笔。
- 主要页面：首页、随笔、归档、关于、搜索、分类、标签和文章详情。
- 输出：`npm run build` 后生成适配 Sites 的 `dist/client` 与 `dist/server`。
- 托管：OpenAI Sites，项目绑定信息位于 `.openai/hosting.json`。
- 正式域名：`https://blog.maziyang.top`。
- 访问：博客对外公开；管理和发布仍受 Sites 权限控制。
- 数据库与上传：当前未使用 D1、R2 或用户登录。
- 维护基准：OpenAI Sites 项目源码；GitHub 链接只作为可选的页面内容展示。

## 内容归属：必须先读

站点名称和站点作者已经改为 Maziyang2，但仓库中现有内容并不都代表 Maziyang2 原创。

当前约定：

| `ownership` 值 | 含义 | 后续 AI 应如何处理 |
| --- | --- | --- |
| `personal` | 已由用户确认属于 Maziyang2 的原创内容 | 可使用 Maziyang2 作为文章作者 |
| `inherited` | 从原仓库继承，真实作者或授权信息尚未核验 | 不得自动改成 Maziyang2 原创 |
| `example` | 用于演示网站功能的模板内容 | 可在用户要求时删除或替换 |
| `unverified` | 来源暂时无法确认 | 先询问用户，不要猜测作者 |

当前内容分类：

- `src/content/posts/示例/`：`example`。
- `src/content/posts/AI/`：目前为模板示例，标记为 `example`。
- `src/content/posts/技术/`：目前为模板示例，标记为 `example`。
- `src/content/posts/26/06/260609-agent.blog.md`：继承内容，标记为 `inherited`。
- `src/content/notes/` 下现有随笔：继承内容，标记为 `inherited`。

除非用户明确确认，AI 不得把 `inherited`、`example` 或 `unverified` 改为 `personal`，不得为文章编造作者或来源，也不得仅因为站点作者是 Maziyang2 就在文章结构化数据中声明 Maziyang2 是作者。

## 项目结构

```text
clay-blog/
├── AGENTS.md                         # AI 修改入口与强制规则，不直接进入网站
├── README.md                         # 完整结构和维护说明，不直接进入网站
├── .openai/
│   └── hosting.json                  # Sites 项目标识；只保留 project_id、d1、r2
├── public/                           # 原样发布的公开静态资源
│   ├── avatars/                      # 头像和站点图标
│   ├── covers/                       # 文章封面兜底图
│   ├── share/                        # 社交分享封面
│   ├── service-worker.js
│   └── sw.js
├── scripts/
│   └── prepare-sites-build.mjs       # 将 Astro 静态输出整理为 Sites 部署格式
├── src/
│   ├── components/                   # 导航、页脚、音乐、评论、文章摘要等组件
│   ├── content/
│   │   ├── posts/                    # 文章 Markdown；目录和文件名参与 URL
│   │   └── notes/                    # 随笔 Markdown
│   ├── data/
│   │   ├── site.config.json          # 站点身份、GitHub、项目卡片和指定链接
│   │   ├── site-readme.ts            # 站内 README 的机器可读结构数据
│   │   └── github-projects.json      # GitHub API 不可用时的公开项目缓存
│   ├── layouts/
│   │   └── BaseLayout.astro          # HTML、SEO、Open Graph、全站布局
│   ├── lib/
│   │   └── posts.ts                  # 排序、摘要、分类、标签和 URL 工具
│   ├── pages/                        # Astro 路由页面
│   ├── styles/
│   │   └── global.css                # 全站视觉、响应式、深浅主题和动画
│   └── content.config.ts             # 文章与随笔字段校验
├── astro.config.mjs                  # Astro、Markdown 插件和重定向
├── package.json                      # 开发与构建命令
└── package-lock.json                 # 锁定依赖版本，不要随意删除
```

`dist/`、`.astro/` 和 `node_modules/` 都是生成目录，不应手工修改或提交。

## 页面与源码对应关系

| 网站路径 | 主要源码 | 用途 |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | 首页头像、介绍、精选文章和最新文章 |
| `/notes/` | `src/pages/notes.astro` | 随笔列表 |
| `/archive/` | `src/pages/archive.astro` | 年份、分类、标签和全部文章 |
| `/about/` | `src/pages/about.astro` | 个人说明、GitHub 项目和自定义项目组 |
| `/search/` | `src/pages/search.astro` | 站内搜索界面 |
| `/search.json` | `src/pages/search.json.ts` | 构建时生成的搜索索引 |
| `/posts/.../` | `src/pages/posts/[...slug].astro` | 文章详情、目录、相关文章和评论 |
| `/categories/.../` | `src/pages/categories/[category].astro` | 分类页 |
| `/tags/.../` | `src/pages/tags/[tag].astro` | 标签页 |
| `/rss.xml` | `src/pages/rss.xml.ts` | RSS 订阅 |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | 站点地图 |
| `/robots.txt` | `src/pages/robots.txt.ts` | 爬虫规则 |
| `/404.html` | `src/pages/404.astro` | 404 页面 |
| `/readme/` | `src/pages/readme.astro` | 不在导航中显示的公开结构说明 |
| `/.well-known/site-readme.json` | `src/pages/.well-known/site-readme.json.ts` | 供 AI 和工具读取的结构数据 |

导航入口在 `src/components/Nav.astro`，页脚入口在 `src/components/Footer.astro`，全站标题、描述、分享图和结构化数据在 `src/layouts/BaseLayout.astro`。

## 文章字段

文章放在 `src/content/posts/`。建议使用小写英文或简洁中文目录，文件名不要包含第二个点号，避免 URL 被意外规范化。

推荐模板：

```yaml
---
title: "文章标题"
description: "一到两句话的摘要"
date: "2026-08-13"
updated: "2026-08-13"
author: "Maziyang2"
ownership: personal
hidden: false
categories:
  - 技术
tags:
  - Astro
  - 博客
cover: "/covers/example.jpg"
sticky: 0
---
```

字段说明：

| 字段 | 是否必需 | 说明 |
| --- | --- | --- |
| `title` | 是 | 文章标题 |
| `description` | 建议 | 首页、搜索和分享摘要 |
| `date` | 建议 | 发布日期，格式 `YYYY-MM-DD` |
| `updated` | 否 | 最近更新日期 |
| `author` | 原创建议 | 已确认的作者名称；不要猜测 |
| `ownership` | 强烈建议 | `personal`、`inherited`、`example` 或 `unverified` |
| `source` | 转载时建议 | 已核验的原文 URL；必须是完整的 `https://` 地址 |
| `categories` | 否 | 一个或多个分类 |
| `tags` | 否 | 更细粒度的主题标签 |
| `cover` | 否 | `/public` 下的站内路径或可信外链 |
| `sticky` | 否 | 首页精选权重，数字越大越靠前；普通文章用 `0` 或省略 |
| `hidden` | 否 | `true` 时保留 Markdown 和数据，但从整个公开网站的构建结果中排除 |

## 增加文章

1. 在 `src/content/posts/<分类>/` 新建 `.md` 文件。
2. 使用上面的 frontmatter 模板。
3. 如果是 Maziyang2 原创，明确写 `ownership: personal` 和 `author: "Maziyang2"`。
4. 如果来源未确认，写 `ownership: unverified`，不要补写作者。
5. 正文使用 Markdown；站内图片放在 `public/`，引用时从 `/` 开始。
6. 检查文章内链、分类、标签、封面和日期。
7. 执行 `npm run build`，确认生成成功后再发布。

新文章会自动进入首页、归档、分类、标签、搜索、RSS 和站点地图，不需要手动修改这些页面。

## 隐藏文章但保留源码

“隐藏文章”是用户在修改网站时发送给 AI 或维护工具的指令，不是在网站里增加一个访客可以操作的开关。收到指令后，在目标文章的 frontmatter 中增加：

```yaml
hidden: true
```

效果如下：

- Markdown 文件、正文和元数据继续保留在 Sites 项目源码中。
- 重新构建后不生成该文章的公开页面，原文章 URL 不再可用。
- 首页、归档、分类、标签、站内搜索、RSS 和站点地图都不显示该文章。
- 将值改为 `false` 或删除该字段，并重新构建发布，即可恢复显示。

`hidden` 是构建规则，不是访问权限或加密功能。敏感内容不得以“隐藏文章”的方式保留在项目中。

## 删除文章

1. 删除对应 Markdown 文件。
2. 搜索文章路径或文件名，检查其他文章和 `src/data/site.config.json` 是否仍然链接到它。
3. 如果删除的是 `sticky` 文章，确认首页精选区仍然合理。
4. 重新构建，确认没有失效内链。

不要为了“清理示例”一次性删除全部内容，除非用户明确指定要删除哪些文章或目录。

## 移动或重命名文章

文章所在目录和文件名会影响 URL。移动或重命名文件通常会改变公开链接，因此需要：

1. 记录旧 URL 和新 URL。
2. 更新站内文章链接和 `site.config.json` 中的 `article` 字段。
3. 如旧链接已经对外使用，在 `astro.config.mjs` 的 `redirects` 中增加旧地址到新地址的重定向。
4. 重新检查搜索索引、RSS 和站点地图。

## 修改站点身份和常用链接

`src/data/site.config.json` 是最优先的配置入口：

| 需求 | 修改位置 |
| --- | --- |
| 站点名称 | `siteName` |
| 站点描述 | `siteDescription` |
| 默认站点作者 | `siteAuthor` |
| GitHub 用户名 | `githubUser` |
| 导航栏源码链接 | `githubRepo` |
| GitHub 项目卡片图标或文章链接 | `projectOverrides` |
| 自定义项目组、下载项或外部链接 | `projectGroups` |

其他固定链接位置：

| 链接或内容 | 修改位置 |
| --- | --- |
| 首页介绍与首页社交链接 | `src/pages/index.astro` |
| 关于页介绍与社交链接 | `src/pages/about.astro` |
| 顶部导航项目 | `src/components/Nav.astro` |
| 页脚链接与页脚文字 | `src/components/Footer.astro` |
| 音乐播放器默认歌单与接口 | `.env`；默认行为在 `src/components/MusicPlayer.astro` |
| 评论后端 | `.env`；组件为 `CommentsBox.astro` 与 `comments.js` |
| 站点分享标题、描述和图片 | `src/layouts/BaseLayout.astro` 与 `public/share/` |
| URL 重定向 | `astro.config.mjs` |

修改链接时必须同时检查：链接文字、`href`、是否需要新窗口、`rel="noopener noreferrer"`、站内目标是否存在，以及尾部 `/` 是否与当前路由风格一致。

## 修改“关于”页项目结构

关于页包含两类项目：

1. `githubUser` 对应账号的公开非 Fork 仓库，会在构建时从 GitHub API 获取。
2. `projectGroups` 是手工配置的项目组，可放源码、资源或其他指定链接。

`projectOverrides` 可以按仓库名设置：

```jsonc
{
  "HiddenWindow": {
    "icon": "layers",
    "article": "/posts/hiddenwindow/"
  }
}
```

- `icon` 必须使用 `src/components/Icon.astro` 中已存在的名称。
- `article` 必须指向站内现有文章；没有对应文章时不要填写。
- `github-projects.json` 只是网络不可用时的缓存，不是主要配置来源。

## 修改布局、组件和样式

- 改全站颜色、字号、间距、响应式或主题：`src/styles/global.css`。
- 改公共 HTML、SEO、Open Graph 或 JSON-LD：`src/layouts/BaseLayout.astro`。
- 改首页：`src/pages/index.astro`。
- 改导航：`src/components/Nav.astro`。
- 改文章列表行：`src/components/PostSummary.astro`。
- 改页脚：`src/components/Footer.astro`。
- 改文章详情：`src/pages/posts/[...slug].astro`。
- 改 Markdown 解析：`astro.config.mjs` 和 `src/lib/remark-*`、`src/lib/rehype-*`。

修改组件时应保留键盘操作、焦点状态、`aria-label`、触摸操作和移动端布局。站内维护说明只放在 `/readme/` 和机器可读 JSON 中，不要用视觉隐藏文字塞入页面；完整规则保留在根目录 README 与 `AGENTS.md`。

## AI 修改顺序

后续 AI 接手时按以下顺序工作：

1. 先读 `AGENTS.md`、本 README、`.openai/hosting.json` 和目标文件。
2. 检查 Git 状态与远程更新，保留用户未提交的修改。
3. 明确任务属于内容、链接、页面、样式还是发布。
4. 对文章先读取 `ownership`，不要自动认定作者。
5. 只改实现任务所需的文件，不批量重写无关内容。
6. 执行 `npm run build`。
7. 检查生成页面、内链、隐私和差异。
8. 用户要求发布时，复用 `.openai/hosting.json` 中现有 Sites 项目，不创建新项目，也不依赖 GitHub。

## 本地开发与构建

环境要求：Node.js 20.19+ 或 22.12+。

```bash
npm ci
npm run dev
```

本地开发地址通常是 `http://localhost:4321`。

最终验证：

```bash
npm run build
```

构建流程会先生成 Astro 静态站点，再由 `scripts/prepare-sites-build.mjs` 整理为：

```text
dist/
├── client/               # HTML、CSS、JS、图片、RSS 和站点地图
└── server/
    ├── index.js          # Sites Worker 入口
    └── wrangler.json     # 静态资源绑定信息
```

不要手工编辑 `dist/`。源文件发生变化后重新构建即可。

## Sites 发布规则

- `.openai/hosting.json` 已绑定现有站点；不得删除、替换或猜测 `project_id`。
- 不得再次调用“创建站点”来发布这个仓库。
- `.openai/hosting.json` 只允许保存 `project_id`、`d1` 和 `r2`，不得写入 Token 或环境变量。
- 发布前必须构建成功，并确保提交、上传源码和部署包来自同一代码状态。
- 访问权限、公开发布、自定义域名、环境变量和删除操作必须按用户明确指令执行。

## 环境变量与隐私

`.env` 已被 Git 忽略，只能保存在本机。`.env.example` 只能写占位值。

当前可用变量：

| 变量 | 用途 |
| --- | --- |
| `SITE_URL` | 可选的构建时站点地址；不设置时使用 `https://blog.maziyang.top` |
| `PUBLIC_TWIKOO_ENV_ID` | Twikoo 评论后端；不配置时隐藏评论 |
| `PUBLIC_NETEASE_PLAYLIST_ID` | 网易云歌单 ID |
| `PUBLIC_MUSIC_API` | Meting 兼容音乐接口 |

禁止提交：

- GitHub、OpenAI、Cloudflare 或其他服务 Token。
- API Key、密码、Cookie、Session、私有证书。
- 私人邮箱、电话、家庭或办公地址、身份证件信息。
- 私有仓库地址、内网地址、内部服务说明或未公开项目数据。

如果新功能需要敏感变量，应在托管平台的环境变量或 Secret 管理中配置，只在 `.env.example` 留下不含真实值的变量名。

## 发布前检查

- `npm run build` 成功。
- 新增文章有明确的 `ownership`。
- 没有把模板文章错误标成 Maziyang2 原创。
- `hidden` 文章的源码仍然存在，但没有进入任何公开页面或索引。
- 没有提交 `.env`、Token 或个人隐私。
- 文章、项目卡片和导航链接可以对应到现有目标。
- 重命名或移动文章后已处理旧链接。
- 根目录 README、`AGENTS.md` 和源码注释没有被原样复制进 `public/`；站内 `/readme/` 只包含可公开的结构说明。
- `.openai/hosting.json` 仍指向原 Sites 项目。
- Git 差异只包含本次需要的修改。

## 许可证

项目代码沿用仓库中的 MIT License。模板文章、继承文章和外部图片的版权与作者归属需要分别核验；站点所有者身份不等于文章作者身份。
