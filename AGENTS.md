# AI / GPT 维护入口

本文件适用于整个 Sites 项目源码。站内公开结构说明位于 `/readme/`，对应源码是 `src/pages/readme.astro`，机器可读版本来自 `src/data/site-readme.ts`；站内版本是主要维护说明。

## 权限边界

- 博客对外公开，但修改权限只属于 Maziyang2 及其明确授权的 Sites 协作者。
- 公开 README 只提供结构说明，不代表任何写入授权。
- OpenAI Sites 项目源码是维护和发布基准，GitHub 不是必要依赖；现有 GitHub 地址只视为可选的页面内容链接。
- 不得提交密码、Token、API Key、Cookie、Session、私有证书、私人联系方式、精确住址、证件信息、内网地址或未公开项目资料。

## 内容规则

- 新增或修改文章前先读取 `ownership`。
- 只有用户确认后才能使用 `ownership: personal`；不得把 `inherited`、`example` 或 `unverified` 自动改成 Maziyang2 原创。
- “隐藏文章”是用户在修改网站时发给 AI 的指令，不是要在网站中增加访客开关。
- 收到“隐藏某篇文章”指令时，在目标 Markdown 的 frontmatter 中设置 `hidden: true`，保留 Sites 项目中的源码与数据，但让构建结果排除文章页面、首页、归档、分类、标签、搜索、RSS 和站点地图中的相关内容。
- 重新显示时删除 `hidden` 或改为 `false`。除非用户明确说“删除”，否则不得删除 Markdown 源文件。

## 主要修改入口

- 文章：`src/content/posts/`
- 随笔：`src/content/notes/`
- 字段规则：`src/content.config.ts`
- 站点身份与项目链接：`src/data/site.config.json`
- 首页：`src/pages/index.astro`
- 关于页：`src/pages/about.astro`
- 导航与页脚：`src/components/Nav.astro`、`src/components/Footer.astro`
- 全站布局与 SEO：`src/layouts/BaseLayout.astro`
- 全站样式：`src/styles/global.css`
- 重定向：`astro.config.mjs`

## 修改与发布

1. 检查 Git 状态并保留用户已有改动。
2. 只修改当前任务需要的文件；文章移动或改名时处理旧 URL 和所有引用。
3. 同步更新站内 `/readme/`、`src/data/site-readme.ts` 与根目录 `README.md` 中受影响的结构说明。
4. 运行 `npm run build`，检查链接、生成页面、隐私和 Git 差异。
5. 发布时复用 `.openai/hosting.json` 绑定的现有 Sites 项目，不创建新站点、不依赖 GitHub，也不把临时凭据写入项目。
