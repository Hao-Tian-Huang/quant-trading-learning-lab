# 量化交易入門實驗室

**Quant Trading Learning Lab** 是一個繁體中文入門教學網站，為有程式基礎的學生介紹量化交易策略與回測。第一版以移動平均線交叉策略說明策略條件，並用瀏覽器生成的假設資料示範回測思路。

> 本網站僅供學習使用。互動圖表是合成的教學資料，不代表真實市場績效，也不構成投資建議。

## 頁面

- `dist/index.html`：首頁和主題導覽
- `dist/pages/moving-average-crossover.html`：移動平均線交叉策略與互動示意圖
- `dist/pages/backtesting-process.html`：回測流程、績效指標與常見偏誤

## 專案規則

請先閱讀 [`AGENTS.md`](AGENTS.md)。之後新增頁面時，依照固定教學架構撰寫，補上來源，更新網站導覽和本頁清單，並檢查手機版與連結。

## 本機預覽

直接以瀏覽器開啟 `dist/index.html` 即可；網站使用原生 HTML、CSS、JavaScript，不需安裝套件或啟動伺服器。

## GitHub Pages

`.github/workflows/pages.yml` 會在推送至 `main` 分支後，將 `dist/` 發佈到 GitHub Pages。第一次發佈時，請在 Repository 的 **Settings → Pages** 將建置來源設為 **GitHub Actions**。成功後，工作流程會顯示實際網站網址。

## 檔案結構

```text
AGENTS.md
README.md
.github/workflows/pages.yml
dist/
  index.html
  pages/
  assets/
```


## 自行上傳與發佈

1. 從 GitHub 建立新的 Repository；若要讓老師能直接檢視，選擇 Public。
2. 將本專案的所有檔案（包括隱藏的 `.github` 資料夾）放在 Repository 根目錄，推送到 `main` 分支。
3. 在 Repository 的 **Settings → Pages**，將 Build and deployment 的 Source 選為 **GitHub Actions**。
4. 推送 `main` 後，`.github/workflows/pages.yml` 會自動把 `dist/` 發佈到 GitHub Pages。到 **Actions** 查看工作流程完成狀態，再由 **Settings → Pages** 複製公開網址。
5. 提交作業時填入專案簡介、Repository 網址、Pages 網址，並簡述 `AGENTS.md` 如何規定 AI 新增頁面時的內容架構、來源、檔案位置與檢查步驟。
