import NavPanel from '../components/NavPanel.jsx';

const BuildNotExistPage = () => (
  <>
    <NavPanel />
    <h1>Нет такой страницы</h1>
  </>
);

export default function Page404() {
  return BuildNotExistPage();
}
