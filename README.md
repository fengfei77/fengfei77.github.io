# 冯斐 · 个人主页

皮肤科医师个人主页，纯静态站点（HTML + CSS + 原生 JS），无构建步骤、无第三方依赖。
内容取自《冯斐 - 皮肤科医师 - 简历.docx》，面向临床与学术交流：个人简介、教育背景、
规范化培训、临床技能、科研能力与成果、证书与资质、联系方式。

## 目录结构

```
个人站/
├─ index.html            # 页面结构与全部文字内容（改文字只需改这个文件）
├─ assets/
│  ├─ css/style.css      # 样式：配色变量、版式、响应式、打印样式
│  ├─ js/main.js         # 导航折叠、滚动高亮、渐显动画、打印按钮、页脚年份
│  ├─ img/portrait.jpg   # 证件照（从简历 docx 中提取，640×894）
│  └─ qr/                # 二维码（qr-site.svg / qr-site.png）
├─ tools/                # 二维码生成脚本
├─ preview/              # 版式预览图（desktop.png / mobile.png），部署时可不上传
├─ .nojekyll             # 让 GitHub Pages 跳过 Jekyll 处理
└─ README.md
```

## 本地预览

直接双击 `index.html`。若要与线上环境一致，可在本目录启动静态服务：

```powershell
npx serve .
# 或
python -m http.server 8080
```

## 修改站点内容

文字全在 `index.html` 里，图片在 `assets/img/`，配色在 `assets/css/style.css` 顶部。
三种改法，按省事程度排列：

### 1. 直接说需求（最快）

把「哪一段原文 → 改成什么」告诉我，我改完、验证后给你上传命令。

### 2. 本地改 + 一条命令发布（长期推荐）

```powershell
# 1. 用记事本或 VS Code 打开 index.html，搜索要改的句子并修改，保存
# 2. 在个人站目录执行：
.\tools\publish.ps1 "把个人简介第二段补上科研方向"
```

- 首次执行会弹出 GitHub 登录窗口，登录一次即可，之后不再问；
- 脚本会自动提交并推送，约 1 分钟后线上生效；
- 复查：`node tools/check_site.js "https://fengfei77.github.io/"`

> **第一次推送前**：线上仓库最初是用网页上传建的，提交历史和本地这份不同，
> 直接推会被拒绝（`rejected / non-fast-forward`）。先执行一次强制推送即可，只改历史、不动文件：
>
> ```powershell
> git push -u origin main --force
> ```
>
> 之后再用 `publish.ps1` 就正常了。

### 3. 在 GitHub 网页上直接改（不碰本地文件）

仓库里打开 `index.html` → 右上角铅笔图标 → 改 → **Commit changes**，1 分钟后生效。
适合只改一句话。注意：网页改完，本地这份就和线上不一致了，下次用方式 2 之前先 `git pull`。

### 常见修改点

| 想改什么 | 去哪里找 |
| --- | --- |
| 姓名 / 英文名 / 职称 | `index.html` 搜 `hero-name`、`hero-title` 附近 |
| 单位、科室、现居 | 搜 `hero-affil`、`profile-list` |
| 个人简介、研究方向、技能描述 | 搜对应小标题文字，如 `个人简介`、`临床技能` |
| 联系方式（邮箱、电话） | 搜 `mailto:`、`tel:` |
| 证件照 | 替换 `assets/img/portrait.jpg`（保持约 3:4） |
| 配色 | `assets/css/style.css` 顶部 `--accent`、`--gold` |
| 二维码 | 只有换域名才需要重新生成，见下方「二维码」一节 |

改完不需要重新生成二维码——地址没变，二维码就一直有效。

## 内容与来源

| 区块 | 简历中的对应内容 |
| --- | --- |
| 首屏 / 职业档案卡 | 姓名、专业方向、学历、单位、邮箱、电话、现居 |
| 数据条 | 第一作者 SCI 2 篇、北大核心 1 篇、参与发表 3 篇、2027 规培结业 |
| 01 个人简介 | 「个人简介」一段，扩展为履历、临床、科研三段 |
| 02 教育背景 | 天津医科大学（硕士）、中国医科大学（本科） |
| 03 规范化培训 | 新桥医院皮肤科规培（2024.09—2027.09）及三条职责 |
| 04 临床技能 | 临床诊疗、皮肤外科、激光与治疗、工具语言 |
| 05 科研能力与成果 | 临床研究、基础与生信、学术写作；论文数量 |
| 06 证书与资质 | 学位证、毕业证、执业医师资格证、规培证 |
| 07 联系方式 | 邮箱、电话、现居、专业方向、所在科室 |

简历中的**性别、年龄、政治面貌**未放到公开网页上，避免公开个人信息；
如需保留可在 `index.html` 首屏 `.hero-affil` 或职业档案卡中自行加行。

**注意隐私**：页面上公开了手机号与邮箱，如不希望被搜索引擎收录，可删除 `.profile-list`
与 `#contact` 中的电话行，或给站点加访问限制。

## 补充论文清单

`index.html` 的「05 科研能力与成果」末尾有一段被注释掉的论文列表模板，填入题目与期刊后，
删除包裹它的 `<!--` 与 `-->` 即可显示。样式（`.pub-list` / `.pub-item` / `.pub-year` 等）
已在 CSS 中保留，无需改动。

## 打印 / 存为 PDF

首屏的「打印 / 存为 PDF」按钮调用浏览器打印，样式表里已写好 `@page A4` 与打印规则：
隐藏导航与按钮、去掉区块底色、缩小字号与间距，输出约 4 页。

## 二维码

`assets/qr/` 下两个文件，内容相同，按用途选用：

| 文件 | 用途 |
| --- | --- |
| `qr-site.svg` | 矢量，印刷/排版首选（含 4 模块安静区，`shape-rendering: crispEdges`） |
| `qr-site.png` | 1184×1184，每模块 32px，用于文档、PPT、微信 |

当前编码地址为 **https://fengfei77.github.io/**（线上站点，仓库已改名为 `<用户名>.github.io`）。

更换地址时重新生成：

```powershell
node tools/fetch_qr.js "https://fengfei77.github.io/" assets/qr
python tools/make_qr_assets.py --url "https://fengfei77.github.io/"
```

`fetch_qr.js` 从二维码服务取回 `_raw.svg` / `_raw.png`；`make_qr_assets.py` 解析模块坐标、
做结构自检（三个定位图案、水平与垂直定时图案），再输出带安静区的干净 SVG 与 PNG，
`--url` 写入 SVG 的 `<desc>`。

> 每次生成都用「服务输出图逐格比对」验证：当前版本 443 个暗模块与参考图完全一致。
> 若只想换图不想跑脚本，也可以直接把新的 SVG 覆盖同名文件。

## 线上状态与检查

站点地址：https://fengfei77.github.io/

部署后跑一次冒烟检查（首页、样式、脚本、证件照、二维码，并核对二维码指向的地址）：

```powershell
node tools/check_site.js "https://fengfei77.github.io/"
```

## 定制要点

- **配色**：`style.css` 顶部 `:root` 的 `--accent`（深青绿）、`--gold`（编号/时间）、`--bg-alt`（交替底色）。
- **字体**：全部使用系统中文字体栈（标题思源宋体/宋体，正文苹方/微软雅黑），不加载外部资源。
- **照片**：`assets/img/portrait.jpg`，卡片中按 104×145 显示（`object-fit: cover`），换图保持 3:4 左右比例即可。
- **导航项**：7 个锚点，与页面 `id` 一一对应（`#about` `#education` `#training` `#skills` `#research` `#credentials` `#contact`）。

## 部署（GitHub Pages）

纯静态站，零构建。目录已初始化为 git 仓库（分支 `main`），并带 `.nojekyll`。

免费子域名 = `https://<用户名>.github.io`，**用户名就是网址**，注册时想好。

### 方式一：网页上传（不用装 git）

1. 注册 GitHub，记住用户名（如 `fengfei`）；
2. New repository → 仓库名填 `<用户名>.github.io` → 选 **Public** → Create；
3. Add file → Upload files，把 `index.html` 和整个 `assets/` 文件夹拖进去（`README.md`、`.nojekyll` 一并上传）→ Commit changes；
4. Settings → Pages → Source 选 **Deploy from a branch**，Branch 选 `main`、目录 `/ (root)` → Save；
5. 等 1–2 分钟，访问 `https://<用户名>.github.io`。

也可以直接上传 `个人站-GitHub-Pages.zip` 解压后的内容（压缩包只含上线所需文件，`preview/` 与 `tools/` 不在其中）。

### 方式二：命令行推送

```powershell
cd D:\softspace\个人站
git remote add origin https://github.com/<用户名>/<用户名>.github.io.git
git push -u origin main
```

首次推送会弹出浏览器登录 GitHub，授权一次即可。推送后在 Settings → Pages 里把分支设为 `main`。

> 仓库名若不用 `<用户名>.github.io`，网址会变成 `https://<用户名>.github.io/<仓库名>/`。
> 站内所有资源都是相对路径，放在子路径下同样能正常显示，只是网址长一些。

### 上线之后

- 用真实地址重新生成二维码：

  ```powershell
  node tools/fetch_qr.js "https://<用户名>.github.io" assets/qr
  python tools/make_qr_assets.py
  ```

- 想绑自有域名：仓库根目录加 `CNAME` 文件（内容一行域名），DNS 里给域名加 CNAME 指向 `<用户名>.github.io`，Pages 设置里填域名并勾选 Enforce HTTPS。
- 国内访问 GitHub Pages 速度不稳定；对国内访客为主的情况，建议后续换国内托管（阿里云 OSS / 腾讯云 COS / 备案服务器）。

本站无任何外部字体、脚本或 CDN 依赖，国内加载不依赖被墙资源。

## 检查记录

- 1440 / 1024 / 820 / 500 四个宽度渲染截图核对版式；
- 500–1440 共 7 档宽度实测无横向溢出；
- 关闭 JavaScript 时内容完整显示；尊重 `prefers-reduced-motion`；
- 移动端导航支持 `Esc` 关闭与外部点击关闭；
- 打印样式导出 PDF 约 4 页；
- 二维码输出逐格比对参考图一致（427/427 模块）。
