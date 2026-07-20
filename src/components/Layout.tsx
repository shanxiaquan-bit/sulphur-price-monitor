import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Ticker from './Ticker';
import Footer from './Footer';

/** 全局布局：深色顶栏 + 价格跑马灯 + 内容区 + 页脚（嵌套路由 Outlet 模式） */
export default function Layout() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <Ticker />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
