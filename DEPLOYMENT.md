# 网站发布指南

当前网站是纯静态站点，不需要服务器端程序、数据库或构建步骤。发布时只需要上传以下内容：

- `index.html`
- `assets/`
- `.nojekyll`
- 其余说明文件可选

## 方案一：苏州大学/学院服务器（正式官网首选）

适合使用学校官方域名和备案体系，例如由学院网站管理员分配一个目录或子域名。

1. 联系苏州大学能源学院网站管理员，申请静态网页目录或子域名。
2. 将 `huang-lab-site` 文件夹中的全部文件上传到网站根目录。
3. 保持 `assets/css`、`assets/js`、`assets/images` 的相对目录结构不变。
4. 确保服务器默认首页配置为 `index.html`。
5. 开通 HTTPS，并校内测试电脑和手机访问。

这是最适合作为正式课题组官网的方式，但需要学院管理员审核和分配域名。

## 方案二：GitHub Pages（免费，适合先上线）

1. 注册/登录 GitHub。
2. 新建仓库，例如 `huang-lab-site`。
3. 上传本站全部文件到仓库根目录。
4. 打开仓库 `Settings` → `Pages`。
5. 在 `Build and deployment` 中选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. 保存后等待 1–3 分钟。
7. 网站地址通常为：

   `https://你的用户名.github.io/huang-lab-site/`

注意：中国大陆访问 GitHub Pages 的速度可能不稳定。正式官网建议使用学校服务器和学校域名。

## 方案三：Netlify Drop（最快，无需本地环境）

1. 打开 `https://app.netlify.com/drop`。
2. 将整个 `huang-lab-site` 文件夹或压缩包拖入页面。
3. 等待上传完成，会自动生成 HTTPS 地址。
4. 可在站点设置中修改名称或绑定自定义域名。

此方式适合快速预览和对外展示，但长期使用仍建议绑定正式域名。

## 发布前检查

- 确认 21 篇论文链接均可打开。
- 确认团队成员姓名、照片和年级已补齐。
- 确认邮箱和办公地址正确。
- 确认学校名称、职称和荣誉信息准确。
- 如需国内访问更稳定，建议将 Google Fonts 替换为本地字体文件或系统字体。

## 当前发布包

`huang-lab-site-reference-style.zip`