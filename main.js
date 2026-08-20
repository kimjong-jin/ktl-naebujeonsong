const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000, height: 800,
    title: '전송',
    webPreferences: {
      webSecurity: false,   // file:// → KTL/Supabase 교차출처 요청 허용(내부 전용 도구)
      contextIsolation: true,
    },
  });
  Menu.setApplicationMenu(null);           // 메뉴바 제거(앱처럼)
  win.loadFile(path.join(__dirname, '내부전송.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
