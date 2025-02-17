import { NavPanel } from '../components/navPanel.jsx'

const BuildNotExistPage = () => (
    <>
      <NavPanel></NavPanel>
      <h1>Нет такой страницы</h1>
    </>
  );

export const Page404 = () => BuildNotExistPage();
