import { NavPanel } from '../components/NavPanel.jsx'

const BuildNotExistPage = () => (
    <>
      <NavPanel></NavPanel>
      <h1>Нет такой страницы</h1>
    </>
  );

export const Page404 = () => BuildNotExistPage();
